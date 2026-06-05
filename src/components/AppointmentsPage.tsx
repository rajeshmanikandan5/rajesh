import { Appointment } from '../types';

interface AppointmentsPageProps {
  appointments: Appointment[];
  setActiveTab: (tab: string) => void;
  onCancel: (id: string) => void;
}

const typeIcons: Record<string, string> = {
  'in-person': '🏥',
  video: '🎥',
  phone: '📞',
};

const statusColors: Record<string, string> = {
  upcoming: 'bg-green-100 text-green-700 border-green-200',
  completed: 'bg-gray-100 text-gray-600 border-gray-200',
  cancelled: 'bg-red-100 text-red-600 border-red-200',
};

const avatarColors: Record<string, string> = {
  SM: 'from-rose-400 to-pink-600',
  JC: 'from-blue-400 to-indigo-600',
  PS: 'from-orange-400 to-amber-600',
  MT: 'from-green-400 to-teal-600',
  EW: 'from-purple-400 to-violet-600',
  RK: 'from-cyan-400 to-blue-600',
};

export default function AppointmentsPage({ appointments, setActiveTab, onCancel }: AppointmentsPageProps) {
  const upcoming = appointments.filter(a => a.status === 'upcoming');
  const past = appointments.filter(a => a.status !== 'upcoming');

  if (appointments.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
          <div className="text-6xl mb-6">📅</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Appointments Yet</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Start by talking to our AI assistant or browsing our network of verified doctors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3.5 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              🤖 Talk to AI Assistant
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className="border border-gray-300 text-gray-700 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              🔍 Browse Doctors
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Appointments</h1>
        <p className="text-gray-500">Manage your healthcare appointments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Booked', value: appointments.length, icon: '📋', color: 'from-blue-500 to-cyan-600' },
          { label: 'Upcoming', value: upcoming.length, icon: '⏰', color: 'from-green-500 to-teal-600' },
          { label: 'Completed', value: past.length, icon: '✅', color: 'from-purple-500 to-violet-600' },
        ].map(stat => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white text-center shadow-md`}>
            <div className="text-3xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs font-medium opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Upcoming Appointments */}
      {upcoming.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Upcoming Appointments
          </h2>
          <div className="space-y-4">
            {upcoming.map(apt => (
              <AppointmentCard key={apt.id} appointment={apt} onCancel={onCancel} />
            ))}
          </div>
        </div>
      )}

      {/* Past Appointments */}
      {past.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Past Appointments</h2>
          <div className="space-y-4">
            {past.map(apt => (
              <AppointmentCard key={apt.id} appointment={apt} onCancel={onCancel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AppointmentCard({ appointment, onCancel }: { appointment: Appointment; onCancel: (id: string) => void }) {
  const typeIcon = typeIcons[appointment.type] || '🏥';
  const statusColor = statusColors[appointment.status];
  const avatarGradient = avatarColors[appointment.doctor.avatar] || 'from-gray-400 to-gray-600';

  return (
    <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all hover:shadow-md ${
      appointment.status === 'upcoming' ? 'border-blue-100' : 'border-gray-100'
    }`}>
      {appointment.status === 'upcoming' && (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-1"></div>
      )}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 bg-gradient-to-br ${avatarGradient} rounded-2xl flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0`}>
            {appointment.doctor.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{appointment.doctor.name}</h3>
                <p className="text-blue-600 text-sm font-medium">{appointment.doctor.specialty}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${statusColor} flex-shrink-0`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-base">📅</span>
                <span className="truncate">{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-base">🕐</span>
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-base">{typeIcon}</span>
                <span className="capitalize">{appointment.type.replace('-', ' ')}</span>
              </div>
            </div>

            {appointment.reason && (
              <div className="mt-3 bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">Reason: </span>
                  {appointment.reason}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Code:</span>
                <span className="text-xs font-mono font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                  {appointment.confirmationCode}
                </span>
              </div>
              {appointment.status === 'upcoming' && (
                <div className="flex gap-2">
                  <button className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                    Reschedule
                  </button>
                  <button
                    onClick={() => onCancel(appointment.id)}
                    className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              )}
              {appointment.status === 'completed' && (
                <button className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1.5 rounded-lg hover:bg-purple-100 transition-colors font-medium">
                  📝 Leave Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
