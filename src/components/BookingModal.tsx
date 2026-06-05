import { useState } from 'react';
import { Doctor, Appointment, TimeSlot } from '../types';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
  onConfirm: (appointment: Appointment) => void;
}

type Step = 'slot' | 'details' | 'confirm' | 'success';

export default function BookingModal({ doctor, onClose, onConfirm }: BookingModalProps) {
  const [step, setStep] = useState<Step>('slot');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [consultationType, setConsultationType] = useState<'in-person' | 'video' | 'phone'>('in-person');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    insurance: '',
    notes: '',
  });
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  const availableSlots = doctor.availableSlots.filter(s => s.available);

  const groupedSlots: Record<string, TimeSlot[]> = availableSlots.reduce((acc, slot) => {
    const key = slot.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(slot);
    return acc;
  }, {} as Record<string, TimeSlot[]>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;
    const appointment: Appointment = {
      id: `APT-${Date.now()}`,
      doctor,
      date: formatDate(selectedSlot.date),
      time: selectedSlot.time,
      type: consultationType,
      reason: formData.reason,
      status: 'upcoming',
      patientName: formData.name,
      confirmationCode: `MC${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    };
    setBookedAppointment(appointment);
    setStep('success');
    onConfirm(appointment);
  };

  const consultationTypes = [
    { id: 'in-person', label: 'In-Person', icon: '🏥', desc: 'Visit the clinic' },
    { id: 'video', label: 'Video Call', icon: '🎥', desc: 'Online consultation' },
    { id: 'phone', label: 'Phone Call', icon: '📞', desc: 'Audio consultation' },
  ];

  const avatarColors: Record<string, string> = {
    SM: 'from-rose-400 to-pink-600',
    JC: 'from-blue-400 to-indigo-600',
    PS: 'from-orange-400 to-amber-600',
    MT: 'from-green-400 to-teal-600',
    EW: 'from-purple-400 to-violet-600',
    RK: 'from-cyan-400 to-blue-600',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Book Appointment</h2>
            <div className="flex items-center gap-2 mt-1">
              {['slot', 'details', 'confirm'].map((s, i) => (
                <div key={s} className="flex items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s ? 'bg-blue-600 text-white' :
                    ['slot', 'details', 'confirm'].indexOf(step) > i ? 'bg-green-500 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {['slot', 'details', 'confirm'].indexOf(step) > i ? '✓' : i + 1}
                  </div>
                  <span className="text-xs text-gray-500 capitalize">{s === 'slot' ? 'Schedule' : s === 'details' ? 'Info' : 'Review'}</span>
                  {i < 2 && <div className="w-8 h-0.5 bg-gray-200 mx-1"></div>}
                </div>
              ))}
            </div>
          </div>
          {step !== 'success' && (
            <button onClick={onClose} className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Doctor Banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-blue-100">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${avatarColors[doctor.avatar] || 'from-gray-400 to-gray-600'} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md`}>
              {doctor.avatar}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{doctor.name}</h3>
              <p className="text-blue-600 text-sm font-medium">{doctor.specialty}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-yellow-400 text-sm">⭐ {doctor.rating}</span>
                <span className="text-gray-400 text-xs">·</span>
                <span className="text-gray-600 text-xs">{doctor.hospital}</span>
              </div>
            </div>
            <div className="ml-auto text-right hidden sm:block">
              <p className="text-xs text-gray-500">Consultation Fee</p>
              <p className="text-xl font-bold text-gray-900">₹{doctor.consultationFee.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* STEP 1: Select Slot */}
          {step === 'slot' && (
            <div>
              {/* Consultation Type */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Consultation Type</h3>
                <div className="grid grid-cols-3 gap-3">
                  {consultationTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setConsultationType(type.id as typeof consultationType)}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        consultationType === type.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl block mb-1">{type.icon}</span>
                      <span className="text-xs font-semibold text-gray-700 block">{type.label}</span>
                      <span className="text-xs text-gray-400">{type.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Select Date & Time</h3>
                {Object.entries(groupedSlots).map(([date, slots]) => (
                  <div key={date} className="mb-5">
                    <p className="text-sm font-semibold text-gray-600 mb-2">📅 {formatDate(date)}</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {slots.map(slot => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-xl border text-sm font-medium transition-all ${
                            selectedSlot?.id === slot.id
                              ? 'border-blue-500 bg-blue-600 text-white shadow-md'
                              : 'border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50 bg-white'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep('details')}
                disabled={!selectedSlot}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2"
              >
                Continue → Enter Your Details
              </button>
            </div>
          )}

          {/* STEP 2: Patient Details */}
          {step === 'details' && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-5 flex items-center gap-2">
                <span className="text-blue-500">📅</span>
                <span className="text-sm font-medium text-blue-700">
                  {selectedSlot && formatDate(selectedSlot.date)} at {selectedSlot?.time}
                </span>
                <button onClick={() => setStep('slot')} className="ml-auto text-xs text-blue-500 underline">Change</button>
              </div>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Reason for Visit *</label>
                  <textarea
                    value={formData.reason}
                    onChange={e => setFormData({...formData, reason: e.target.value})}
                    placeholder="Briefly describe your symptoms or reason for booking..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Insurance Provider (Optional)</label>
                  <input
                    type="text"
                    value={formData.insurance}
                    onChange={e => setFormData({...formData, insurance: e.target.value})}
                    placeholder="e.g. Blue Cross Blue Shield"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep('slot')} className="flex-1 border border-gray-300 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={() => setStep('confirm')}
                  disabled={!formData.name || !formData.phone || !formData.email || !formData.reason}
                  className="flex-2 flex-grow-[2] bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Review Booking →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirm */}
          {step === 'confirm' && (
            <div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <h3 className="font-bold text-gray-900 mb-3">Booking Summary</h3>
                  {[
                    { label: 'Patient', value: formData.name },
                    { label: 'Date', value: selectedSlot ? formatDate(selectedSlot.date) : '' },
                    { label: 'Time', value: selectedSlot?.time || '' },
                    { label: 'Type', value: consultationType.charAt(0).toUpperCase() + consultationType.slice(1).replace('-', ' ') },
                    { label: 'Reason', value: formData.reason },
                    { label: 'Insurance', value: formData.insurance || 'Not provided' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start justify-between py-2 border-b border-gray-200 last:border-0">
                      <span className="text-sm text-gray-500">{item.label}</span>
                      <span className="text-sm font-semibold text-gray-800 text-right max-w-[60%]">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">Consultation Fee</span>
                    <span className="text-2xl font-bold text-blue-600">₹{doctor.consultationFee.toLocaleString('en-IN')}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Payment will be collected at the time of appointment</p>
                </div>

                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <span className="text-yellow-600 mt-0.5">ℹ️</span>
                  <p className="text-xs text-yellow-700">A confirmation email will be sent to <strong>{formData.email}</strong>. You may cancel or reschedule up to 24 hours before.</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep('details')} className="flex-1 border border-gray-300 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-grow-[2] bg-gradient-to-r from-green-500 to-teal-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  ✅ Confirm Booking
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 'success' && bookedAppointment && (
            <div className="text-center py-4">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🎉</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h3>
              <p className="text-gray-500 mb-6">Your appointment has been successfully booked.</p>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-blue-200 rounded-2xl p-5 text-left mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-700">Confirmation Code</span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-mono font-bold text-sm">
                    {bookedAppointment.confirmationCode}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Doctor</span>
                    <span className="font-semibold">{doctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-semibold">{bookedAppointment.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-semibold">{bookedAppointment.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="font-semibold capitalize">{bookedAppointment.type.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                View My Appointments
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
