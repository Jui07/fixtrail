import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  LayoutDashboard,
  PlusCircle,
  Laptop,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
  AlertCircle,
  Smartphone
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add Device Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [nickname, setNickname] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseYear, setPurchaseYear] = useState(new Date().getFullYear());
  const [osVersion, setOsVersion] = useState('');
  const [registering, setRegistering] = useState(false);
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadDashboard = async () => {
      try {
        const [devRes, modRes] = await Promise.all([
          api.get('/devices/user-devices'),
          api.get('/devices/models')
        ]);
        if (devRes.success) setDevices(devRes.data);
        if (modRes.success) setModels(modRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, [isAuthenticated]);

  const handleRegisterDevice = async (e) => {
    e.preventDefault();
    if (!selectedModelId) {
      setModalError('Please select a device model.');
      return;
    }

    setRegistering(true);
    setModalError('');
    try {
      const res = await api.post('/devices/user-devices', {
        modelId: selectedModelId,
        nickname: nickname.trim() || undefined,
        serialNumber: serialNumber.trim() || undefined,
        purchaseYear: parseInt(purchaseYear) || undefined,
        osVersion: osVersion.trim() || undefined
      });

      if (res.success) {
        setDevices((prev) => [res.data, ...prev]);
        setShowAddModal(false);
        setNickname('');
        setSerialNumber('');
        setSelectedModelId('');
      }
    } catch (err) {
      setModalError(err.message || 'Failed to register device.');
    } finally {
      setRegistering(false);
    }
  };

  if (!user) return null;

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Profile Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'}
              alt={user.fullName}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{user.fullName}</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-200">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-slate-500">@{user.username} • {user.email}</p>
              <div className="flex items-center gap-3 pt-1 text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1 font-mono">
                  <Award className="w-3.5 h-3.5 text-emerald-600" /> {user.reputationPoints} reputation points
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500">{devices.length} registered hardware passports</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Register Device Passport
          </button>
        </div>

        {/* Registered Devices & Hardware Passports */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Digital Hardware Passports
              </h2>
              <p className="text-xs text-slate-500">
                Track maintenance logs, hardware specs, and repair history for each device.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl p-10 text-center text-xs text-slate-500 border border-slate-200">
              Loading registered hardware passports...
            </div>
          ) : devices.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center space-y-3 border border-slate-200">
              <Laptop className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-sm font-semibold text-slate-800">No devices registered yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Register your laptop, phone or tower to receive tailored diagnostic solutions and maintain a digital repair log.
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-[#2563EB] text-white font-semibold text-xs inline-flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" /> Register First Device
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {devices.map((dev) => (
                <div
                  key={dev._id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {dev.healthStatus || 'Healthy'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {dev.purchaseYear ? `Purchased ${dev.purchaseYear}` : ''}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {dev.nickname || dev.modelId?.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {dev.modelId?.name} ({dev.modelId?.manufacturerId?.name})
                    </p>

                    {dev.serialNumber && (
                      <p className="text-[11px] text-slate-400 font-mono">
                        S/N: {dev.serialNumber}
                      </p>
                    )}

                    {dev.modelId?.specs && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                        <div><strong>CPU:</strong> {dev.modelId.specs.cpu || 'N/A'}</div>
                        <div><strong>RAM:</strong> {dev.modelId.specs.ramType || 'N/A'}</div>
                        <div><strong>Storage:</strong> {dev.modelId.specs.storageType || 'N/A'}</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      {dev.repairHistory?.length || 0} repairs logged
                    </span>
                    <Link
                      to={`/solutions?modelId=${dev.modelId?._id}`}
                      className="text-[#2563EB] hover:underline font-semibold"
                    >
                      Matching Solutions →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal: Register Device Passport */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Register Device Passport</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {modalError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                  {modalError}
                </div>
              )}

              <form onSubmit={handleRegisterDevice} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Select Device Model Profile *
                  </label>
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Choose model...</option>
                    {models.map((m) => (
                      <option key={m._id} value={m._id}>
                        {m.name} ({m.manufacturerId?.name || 'OEM'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Device Nickname
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g. My College Workhorse or Bench Rig"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Serial Number / Service Tag
                    </label>
                    <input
                      type="text"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      placeholder="e.g. 7X92KL1"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Purchase Year
                    </label>
                    <input
                      type="number"
                      value={purchaseYear}
                      onChange={(e) => setPurchaseYear(e.target.value)}
                      min="2010"
                      max="2030"
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Operating System
                  </label>
                  <input
                    type="text"
                    value={osVersion}
                    onChange={(e) => setOsVersion(e.target.value)}
                    placeholder="e.g. Windows 11 23H2"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={registering}
                    className="px-4 py-2 rounded-xl bg-[#2563EB] text-white font-semibold shadow-md shadow-blue-500/20"
                  >
                    {registering ? 'Saving...' : 'Register Passport'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
