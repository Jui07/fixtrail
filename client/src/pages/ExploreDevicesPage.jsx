import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Search, ArrowRight, Laptop, Smartphone, Monitor, Tv, Printer, Watch, Wifi, Gamepad2, Headphones, Cpu, Home, Wrench } from 'lucide-react';
import { api } from '../services/api';

export const ExploreDevicesPage = () => {
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEcosystem = async () => {
      try {
        const [catRes, mfgRes] = await Promise.all([
          api.get('/devices/categories'),
          api.get('/devices/manufacturers')
        ]);
        if (catRes.success) setCategories(catRes.data);
        if (mfgRes.success) setManufacturers(mfgRes.data);
      } catch (err) {
        console.error('Failed to load device ecosystem:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEcosystem();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()) ||
    cat.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-10 bg-[#F5F8FC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
              <Layers className="w-3.5 h-3.5" /> 14 Device Ecosystems
            </div>
            <h1 className="text-3xl font-bold text-[#172033] tracking-tight">
              Explore Device Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Select your hardware family to inspect motherboard schematics, verified failure modes, screw bins, and repair solutions.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div className="h-44 overflow-hidden relative bg-slate-100">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-lg leading-tight">{cat.name}</h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">
                    {cat.activeQuestionsCount || 0} questions
                  </span>
                  <Link
                    to={`/solutions?category=${cat._id}`}
                    className="text-[#2563EB] hover:text-blue-700 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Manufacturers Strip */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Supported Hardware Manufacturers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {manufacturers.map((mfg) => (
              <div
                key={mfg._id}
                className="p-4 rounded-xl border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/20 transition-all flex flex-col items-center justify-center text-center space-y-2"
              >
                <span className="font-bold text-base text-slate-800">{mfg.name}</span>
                <span className="text-[10px] text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Documented
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
