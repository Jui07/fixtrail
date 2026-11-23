import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Layers,
  ShieldCheck,
  Settings,
  Cpu,
  FileText,
  Activity,
  CheckCircle2,
  AlertTriangle,
  PlusCircle,
  Search,
  Award
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'devices' | 'ai'
  const [overview, setOverview] = useState(null);
  const [userList, setUserList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImage, setNewCatImage] = useState('');
  const [creatingCat, setCreatingCat] = useState(false);
  const [catSuccessMsg, setCatSuccessMsg] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }

    const loadAdminData = async () => {
      try {
        const [ovRes, usrRes, catRes] = await Promise.all([
          api.get('/admin/overview'),
          api.get('/admin/users'),
          api.get('/devices/categories')
        ]);
        if (ovRes.success) setOverview(ovRes.data);
        if (usrRes.success) setUserList(usrRes.data);
        if (catRes.success) setCategories(catRes.data);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [isAuthenticated, user]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await api.patch(`/admin/users/${userId}/role`, { role: newRole });
      if (res.success) {
        setUserList((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      }
    } catch (err) {
      alert(err.message || 'Failed to update role.');
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim() || !newCatDesc.trim() || !newCatImage.trim()) return;

    setCreatingCat(true);
    setCatSuccessMsg('');
    try {
      const res = await api.post('/admin/categories', {
        name: newCatName.trim(),
        description: newCatDesc.trim(),
        imageUrl: newCatImage.trim()
      });

      if (res.success) {
        setCategories((prev) => [...prev, res.data]);
        setCatSuccessMsg(`Category "${res.data.name}" added successfully.`);
        setNewCatName('');
        setNewCatDesc('');
        setNewCatImage('');
      }
    } catch (err) {
      alert(err.message || 'Failed to create category.');
    } finally {
      setCreatingCat(false);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Navigation Bar */}
        <div className="bg-[#101B35] rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">FixTrail Command Center</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-400/30">
                ADMIN ACCESS
              </span>
            </div>
            <p className="text-xs text-slate-400">
              System monitoring, role governance, device schemas, and live audit telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/80 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'overview' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'users' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Users & Roles
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'devices' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Device Catalog
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'ai' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              AI Config
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
                <span className="text-xs text-slate-500 font-medium block">Total Registered Users</span>
                <span className="text-2xl font-bold font-mono text-slate-900 mt-1 block">
                  {overview?.kpis?.totalUsers || 0}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold block mt-1">Authentic DB Records</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
                <span className="text-xs text-slate-500 font-medium block">Community Questions</span>
                <span className="text-2xl font-bold font-mono text-blue-600 mt-1 block">
                  {overview?.kpis?.totalQuestions || 0}
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">{overview?.kpis?.totalAnswers || 0} Answers Logged</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
                <span className="text-xs text-slate-500 font-medium block">Verified Solutions</span>
                <span className="text-2xl font-bold font-mono text-teal-600 mt-1 block">
                  {overview?.kpis?.totalSolutions || 0}
                </span>
                <span className="text-[11px] text-teal-700 font-semibold block mt-1">Wilson Scored</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-card">
                <span className="text-xs text-slate-500 font-medium block">Measured Success Rate</span>
                <span className="text-2xl font-bold font-mono text-amber-500 mt-1 block">
                  {overview?.kpis?.successRate || 0}%
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">{overview?.kpis?.workedCount || 0} Confirmed Fixes</span>
              </div>
            </div>

            {/* Audit Logs Table */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" /> Recent Security & Platform Audit Telemetry
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">Immutable Log Stream</span>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {overview?.recentAuditLogs?.length > 0 ? (
                  overview.recentAuditLogs.map((log) => (
                    <div key={log._id} className="py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                          {log.action}
                        </span>
                        <span className="text-slate-600">{log.resourceType} ({log.resourceId})</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-center text-slate-400">No audit logs recorded yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS & ROLES */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-base text-slate-900">User Governance & Reputation</h3>
              <span className="text-xs text-slate-500">{userList.length} users registered</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Current Role</th>
                    <th className="p-3">Reputation</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {userList.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-medium text-slate-900 flex items-center gap-2">
                        <img
                          src={u.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                          alt={u.username}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div>
                          <span className="block">{u.fullName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">@{u.username}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600">{u.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          u.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          u.role === 'expert' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3 font-mono font-bold text-emerald-700">{u.reputationPoints} pts</td>
                      <td className="p-3">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="px-2 py-1 text-xs border border-slate-300 rounded-lg bg-white"
                        >
                          <option value="user">User</option>
                          <option value="expert">Expert</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DEVICE CATALOG MANAGEMENT */}
        {activeTab === 'devices' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Create Category Form */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900">Add New Device Category</h3>

              {catSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs border border-emerald-200">
                  {catSuccessMsg}
                </div>
              )}

              <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category Name *</label>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Drone & UAV Electronics"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Description *</label>
                  <textarea
                    rows={2}
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="Brief description of hardware covered..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Realistic Image URL (Unsplash) *</label>
                  <input
                    type="url"
                    value={newCatImage}
                    onChange={(e) => setNewCatImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={creatingCat}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#2563EB] text-white font-bold text-xs shadow-md"
                >
                  {creatingCat ? 'Adding Category...' : 'Add Device Category'}
                </button>
              </form>
            </div>

            {/* Existing Categories List */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-4">
              <h3 className="font-bold text-base text-slate-900">Current Categories ({categories.length})</h3>
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1 text-xs">
                {categories.map((c) => (
                  <div key={c._id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <strong className="block text-slate-900">{c.name}</strong>
                      <span className="text-[11px] text-slate-500 font-mono">slug: {c.slug}</span>
                    </div>
                    <span className="text-emerald-700 font-semibold text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AI CONFIGURATION */}
        {activeTab === 'ai' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-5 text-xs">
            <h3 className="font-bold text-base text-slate-900">FixTrail Intelligence Engine Configuration</h3>
            <p className="text-slate-500">
              Settings governing Google Gemini API prompt safety, OCR confidence limits, and hazard triage keywords.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <strong className="text-slate-900 font-semibold block">Multimodal Engine Status:</strong>
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  Hybrid Triage Active: Rule-Engine + Gemini Fallback Enabled
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <strong className="text-slate-900 font-semibold block">Active Hazard Interceptors:</strong>
                <p className="text-slate-600">
                  Instant red banners trigger when user input contains: <code>chai, coffee, water, tea, spill, swollen, bulging, smoke, burning smell</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <strong className="text-slate-900 font-semibold block">Wilson Score Statistical Parameter:</strong>
                <p className="text-slate-600 font-mono">
                  Confidence Parameter z = 1.96 (95% statistical two-tailed interval). Minimum required attempts for "Bench-Verified" badge: 15.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
