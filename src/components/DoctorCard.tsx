import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

const avatarColors: Record<string, string> = {
  SM: 'from-rose-400 to-pink-600',
  JC: 'from-blue-400 to-indigo-600',
  PS: 'from-orange-400 to-amber-600',
  MT: 'from-green-400 to-teal-600',
  EW: 'from-purple-400 to-violet-600',
  RK: 'from-cyan-400 to-blue-600',
};

export default function DoctorCard({ doctor, onBook }: DoctorCardProps) {
  const avatarGradient = avatarColors[doctor.avatar] || 'from-gray-400 to-gray-600';

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {doctor.isAIRecommended && (
        <div className="bg-gradient-to-r from-violet-500 to-blue-600 text-white text-xs font-bold px-4 py-1.5 flex items-center gap-2">
          <span>✨</span>
          AI Recommended Match
        </div>
      )}

      <div className="p-5">
        {/* Doctor Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${avatarGradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0`}>
            {doctor.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-base truncate">{doctor.name}</h3>
            <p className="text-blue-600 font-medium text-sm">{doctor.specialty}</p>
            <p className="text-gray-500 text-xs">{doctor.subspecialty}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-sm">⭐</span>
                <span className="text-sm font-semibold text-gray-700">{doctor.rating}</span>
                <span className="text-xs text-gray-400">({doctor.reviews})</span>
              </div>
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-500">{doctor.experience}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>🏥</span>
            <span className="truncate">{doctor.hospital}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>📍</span>
            <span>{doctor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span>🌐</span>
            <span>{doctor.languages.join(', ')}</span>
          </div>
        </div>

        {/* Availability & Fee */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-4">
          <div>
            <p className="text-xs text-gray-500">Next Available</p>
            <p className={`text-sm font-bold ${doctor.nextAvailable === 'Today' ? 'text-green-600' : 'text-gray-800'}`}>
              {doctor.nextAvailable === 'Today' && <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>}
              {doctor.nextAvailable}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Consultation Fee</p>
            <p className="text-sm font-bold text-gray-800">₹{doctor.consultationFee.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Slots Preview */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">Available Slots</p>
          <div className="flex flex-wrap gap-1.5">
            {doctor.availableSlots.filter(s => s.available).slice(0, 4).map(slot => (
              <span key={slot.id} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-lg">
                {slot.time}
              </span>
            ))}
            {doctor.availableSlots.filter(s => s.available).length > 4 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                +{doctor.availableSlots.filter(s => s.available).length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onBook(doctor)}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2.5 rounded-xl font-semibold text-sm hover:shadow-md hover:from-cyan-600 hover:to-blue-700 transition-all"
          >
            📅 Book Appointment
          </button>
          <button className="bg-gray-100 text-gray-600 px-3 py-2.5 rounded-xl hover:bg-gray-200 transition-colors text-sm">
            👁️
          </button>
        </div>
      </div>
    </div>
  );
}
