import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Search, Star, ExternalLink, Award } from 'lucide-react';
import { api } from '../services/api';

export const ServiceCentresPage = () => {
  const [centres, setCentres] = useState([]);
  const [cityFilter, setCityFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCentres = async () => {
    setLoading(true);
    try {
      let query = '?';
      if (cityFilter) query += `city=${cityFilter}&`;
      if (brandFilter) query += `brand=${brandFilter}&`;
      if (search) query += `search=${encodeURIComponent(search)}&`;

      const res = await api.get(`/service-centres${query}`);
      if (res.success) {
        setCentres(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCentres();
  }, [cityFilter, brandFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCentres();
  };

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Verified Repair Directory
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#172033] tracking-tight">
              Authorized & Independent Service Centres
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Find verified repair technicians and official OEM service hubs when DIY troubleshooting isn't safe.
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by centre name, location, or landmark..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </form>

          <div className="flex items-center gap-3">
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">All Cities</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
            </select>

            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="">All Brands</option>
              <option value="Dell">Dell</option>
              <option value="HP">HP</option>
              <option value="Lenovo">Lenovo</option>
              <option value="Apple">Apple</option>
              <option value="ASUS">ASUS</option>
            </select>
          </div>
        </div>

        {/* Service Centres Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
              Loading verified repair centres...
            </div>
          ) : centres.length === 0 ? (
            <div className="col-span-2 bg-white rounded-2xl p-12 text-center text-xs text-slate-500 border border-slate-200">
              No service centres found matching your filter.
            </div>
          ) : (
            centres.map((c) => (
              <div
                key={c._id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">{c.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-bold mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{c.rating}</span>
                        <span className="text-slate-400 font-normal">({c.reviewCount} community reviews)</span>
                      </div>
                    </div>

                    {c.isAuthorizedOEM ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-800 border border-blue-200 shrink-0">
                        Official OEM Hub
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
                        Peer Bench Desk
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{c.address}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {c.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {c.timings}
                    </span>
                  </div>

                  {/* Supported Brand Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {c.supportedBrands?.map((brand, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" /> FixTrail Inspected & Verified
                  </span>
                  <a
                    href={`tel:${c.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] hover:bg-blue-600 text-white font-semibold text-xs transition-all"
                  >
                    Contact Bench
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
