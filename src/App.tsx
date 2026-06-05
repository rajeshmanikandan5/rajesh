import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import AIAssistant from './components/AIAssistant';
import DoctorsPage from './components/DoctorsPage';
import AppointmentsPage from './components/AppointmentsPage';
import BookingModal from './components/BookingModal';
import { Doctor, Appointment } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleBookDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleConfirmAppointment = (appointment: Appointment) => {
    setAppointments(prev => [appointment, ...prev]);
    // Redirect to appointments after a short delay
    setTimeout(() => {
      setSelectedDoctor(null);
      setActiveTab('appointments');
    }, 2500);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a)
    );
  };

  const upcomingCount = appointments.filter(a => a.status === 'upcoming').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        appointmentCount={upcomingCount}
      />

      <main>
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            setSpecialtyFilter={setSpecialtyFilter}
          />
        )}
        {activeTab === 'ai-assistant' && (
          <AIAssistant
            setActiveTab={setActiveTab}
            setSpecialtyFilter={setSpecialtyFilter}
          />
        )}
        {activeTab === 'doctors' && (
          <DoctorsPage
            specialtyFilter={specialtyFilter}
            setSpecialtyFilter={setSpecialtyFilter}
            onBookDoctor={handleBookDoctor}
          />
        )}
        {activeTab === 'appointments' && (
          <AppointmentsPage
            appointments={appointments}
            setActiveTab={setActiveTab}
            onCancel={handleCancelAppointment}
          />
        )}
      </main>

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onConfirm={handleConfirmAppointment}
        />
      )}
    </div>
  );
}
