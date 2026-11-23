import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AuditLog } from '../models/AuditLog.js';

const signToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fixtrail_secure_dev_jwt_key_2026_x8941';
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  };

  res.cookie('fixtrail_token', token, cookieOptions);

  return res.status(statusCode).json({
    success: true,
    message,
    token,
    user: user.toSafeObject ? user.toSafeObject() : user
  });
};

export const register = async (req, res, next) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: fullName, username, email, and password.'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.'
      });
    }

    // Check if user exists
    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });

    if (existing) {
      const field = existing.email === email.toLowerCase() ? 'Email' : 'Username';
      return res.status(409).json({
        success: false,
        message: `${field} is already registered. Please sign in or use another ${field.toLowerCase()}.`
      });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      passwordHash: password,
      role: 'user',
      reputationPoints: 10 // Welcome bonus
    });

    await AuditLog.create({
      actorId: user._id,
      action: 'USER_REGISTER',
      resourceType: 'User',
      resourceId: user._id.toString(),
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return sendTokenResponse(user, 201, res, 'Account created successfully.');
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your email/username and password.'
      });
    }

    const identifier = emailOrUsername.trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }]
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your username/email and password.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please check your username/email and password.'
      });
    }

    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false });

    await AuditLog.create({
      actorId: user._id,
      action: 'USER_LOGIN',
      resourceType: 'User',
      resourceId: user._id.toString(),
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    return sendTokenResponse(user, 200, res, 'Signed in successfully.');
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res.cookie('fixtrail_token', 'none', {
    expires: new Date(Date.now() + 1000),
    httpOnly: true
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.'
  });
};

export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};
