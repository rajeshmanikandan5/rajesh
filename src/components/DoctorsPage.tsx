import { useState, useEffect } from 'react';
import { Doctor } from '../types';
import { doctors, specialties } from '../data/doctors';
import DoctorCard from './DoctorCard';

interface DoctorsPageProps {
  specialtyFilter: string;
  setSpecialtyFilter: (s: string) => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export default function DoctorsPage({ specialtyFilter, setSpecialtyFilter, onBookDoctor }: DoctorsPageProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  useEffect(() => {
    if (specialtyFilter) setSearch('');
  }, [specialtyFilter]);

  const filtered = doctors
    .filter(doc => {
      const matchSearch =
        !search ||
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
        doc.hospital.toLowerCase().includes(search.toLowerCase()) ||
        doc.location.toLowerCase().includes(search.toLowerCase());

      const matchSpecialty =
        !specialtyFilter ||
        doc.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());

      const matchAvailability =
        availabilityFilter === 'all' ||
        (availabilityFilter === 'today' && doc.nextAvailable === 'Today') ||
        (availabilityFilter === 'tomorrow' && doc.nextAvailable === 'Tomorrow');

      return matchSearch && matchSpecialty && matchAvailability;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'fee') return a.consultationFee - b.consultationFee;
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
        <p className="text-gray-500">Choose from our network of verified healthcare professionals</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setSpecialtyFilter(''); }}
              placeholder="Search by name, specialty, hospital..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
          </div>
          <select
            value={availabilityFilter}
            onChange={e => setAvailabilityFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="all">Any Availability</option>
            <option value="today">Available Today</option>
            <option value="tomorrow">Available Tomorrow</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="rating">Sort by Rating</option>
            <option value="fee">Sort by Fee</option>
            <option value="experience">Sort by Experience</option>
          </select>
        </div>
      </div>

      {/* Specialty Filter Chips */}
      <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setSpecialtyFilter('')}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            !specialtyFilter
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
          }`}
        >
          All Specialties
        </button>
        {specialties.map(s => (
          <button
            key={s.name}
            onClick={() => setSpecialtyFilter(s.name)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              specialtyFilter === s.name
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            <span>{s.icon}</span>
            {s.name}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-600">
          Found <span className="font-bold text-gray-900">{filtered.length}</span> doctor{filtered.length !== 1 ? 's' : ''}
          {specialtyFilter && <span className="text-blue-600"> in {specialtyFilter}</span>}
        </p>
        {(specialtyFilter || search) && (
          <button
            onClick={() => { setSpecialtyFilter(''); setSearch(''); }}
            className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
          >
            ✕ Clear Filters
          </button>
        )}
      </div>

      {/* Doctor Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={onBookDoctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No doctors found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => { setSpecialtyFilter(''); setSearch(''); }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
