import { ServiceCentre } from '../models/ServiceCentre.js';

export const getServiceCentres = async (req, res, next) => {
  try {
    const { city, brand, search } = req.query;
    const filter = {};

    if (city) {
      filter.city = { $regex: city.trim(), $options: 'i' };
    }
    if (brand) {
      filter.supportedBrands = { $in: [new RegExp(brand.trim(), 'i')] };
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { supportedBrands: { $in: [new RegExp(search.trim(), 'i')] } }
      ];
    }

    const centres = await ServiceCentre.find(filter).sort({ isAuthorizedOEM: -1, rating: -1 });

    res.status(200).json({
      success: true,
      count: centres.length,
      data: centres
    });
  } catch (err) {
    next(err);
  }
};

export const createServiceCentre = async (req, res, next) => {
  try {
    const { name, city, address, phone, email, supportedBrands, isAuthorizedOEM, timings } = req.body;

    const centre = await ServiceCentre.create({
      name,
      city,
      address,
      phone,
      email,
      supportedBrands: Array.isArray(supportedBrands) ? supportedBrands : [supportedBrands],
      isAuthorizedOEM,
      timings
    });

    res.status(201).json({
      success: true,
      data: centre
    });
  } catch (err) {
    next(err);
  }
};
