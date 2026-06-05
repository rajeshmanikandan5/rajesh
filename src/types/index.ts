export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subspecialty: string;
  rating: number;
  reviews: number;
  experience: string;
  hospital: string;
  location: string;
  avatar: string;
  availableSlots: TimeSlot[];
  consultationFee: number;
  languages: string[];
  about: string;
  education: string[];
  nextAvailable: string;
  isAIRecommended?: boolean;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  type: 'in-person' | 'video' | 'phone';
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  patientName: string;
  confirmationCode: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export interface PatientInfo {
  name: string;
  age: string;
  gender: string;
  symptoms: string;
  insuranceProvider: string;
}
