import { specialties } from '../data/doctors';

interface HomePageProps {
  setActiveTab: (tab: string) => void;
  setSpecialtyFilter: (specialty: string) => void;
}

export default function HomePage({ setActiveTab, setSpecialtyFilter }: HomePageProps) {
  const stats = [
    { label: 'Verified Doctors', value: '2,400+', icon: '👨‍⚕️' },
    { label: 'Happy Patients', value: '150K+', icon: '😊' },
    { label: 'Specialties', value: '50+', icon: '🏥' },
    { label: 'Avg. Wait Time', value: '< 2 hrs', icon: '⏱️' },
  ];

  const features = [
    {
      icon: '🤖',
      title: 'AI Symptom Analysis',
      desc: 'Describe your symptoms and our AI instantly recommends the right specialist for you.',
      gradient: 'from-violet-500 to-purple-600',
      bg: 'from-violet-50 to-purple-50',
      color: 'black'
    },
    {
      icon: '📅',
      title: 'Instant Scheduling',
      desc: 'See real-time availability and book appointments in under 60 seconds.',
      gradient: 'from-cyan-500 to-blue-600',
      bg: 'from-cyan-50 to-blue-50',
    },
    {
      icon: '🎥',
      title: 'Video Consultations',
      desc: 'Connect with top doctors from the comfort of your home via secure video calls.',
      gradient: 'from-green-500 to-teal-600',
      bg: 'from-green-50 to-teal-50',
    },
    {
      icon: '🔔',
      title: 'Smart Reminders',
      desc: 'Never miss an appointment with intelligent reminders and follow-up care.',
      gradient: 'from-orange-500 to-amber-600',
      bg: 'from-orange-50 to-amber-50',
    },
  ];

  const handleSpecialtyClick = (specialty: string) => {
    setSpecialtyFilter(specialty);
    setActiveTab('doctors');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                AI-Powered Healthcare Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Health,
                <br />
                <span className="text-cyan-300">Smarter</span> Care
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
                Let our AI analyze your symptoms and connect you with the right specialist in minutes. Book appointments, consult virtually, and take control of your healthcare journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActiveTab('ai-assistant')}
                  className="flex items-center justify-center gap-3 bg-white text-blue-700 px-7 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="text-2xl">🤖</span>
                  Talk to AI Assistant
                </button>
                <button
                  onClick={() => setActiveTab('doctors')}
                  className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm border border-white/40 px-7 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-200"
                >
                  <span className="text-2xl">🔍</span>
                  Browse Doctors
                </button>
              </div>
            </div>

            {/* Hero Card */}
            <div className="hidden md:block">
              <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">🤖</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">MediAI Assistant</p>
                    <p className="text-xs text-blue-200">Always here to help</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-xs text-green-300 bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/20 rounded-2xl rounded-tl-sm p-3 text-sm text-white max-w-[85%]">
                    I've been having severe headaches for the past week. What should I do?
                  </div>
                  <div className="bg-cyan-500/30 border border-cyan-400/30 rounded-2xl rounded-tr-sm p-3 text-sm text-white ml-auto max-w-[90%]">
                    Based on your symptoms, I recommend seeing a <strong>Neurologist</strong>. I've found 3 available specialists near you. Shall I book the earliest slot?
                  </div>
                  <div className="bg-white/20 rounded-2xl rounded-tl-sm p-3 text-sm text-white max-w-[60%]">
                    Yes, book the earliest one!
                  </div>
                </div>
                <div className="mt-5 bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">✅ Appointment Confirmed</span>
                    <span className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">Booked</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">JC</div>
                    <div>
                      <p className="text-sm font-medium text-white">Dr. James Chen</p>
                      <p className="text-xs text-blue-200">Neurologist · Tomorrow 10 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="text-3xl block mb-2">{stat.icon}</span>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Browse by Specialty</h2>
            <p className="text-gray-500 mt-1">Find the right specialist for your needs</p>
          </div>
          <button
            onClick={() => setActiveTab('doctors')}
            className="text-blue-600 font-semibold text-sm hover:text-blue-800 flex items-center gap-1"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {specialties.map((specialty, i) => (
            <button
              key={i}
              onClick={() => handleSpecialtyClick(specialty.name)}
              className="group bg-white rounded-2xl p-4 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100"
            >
              <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${specialty.color} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                {specialty.icon}
              </div>
              <span className="text-xs font-semibold text-gray-700 leading-tight">{specialty.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose MediBook AI?</h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">The most intelligent healthcare booking platform, powered by cutting-edge AI</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" >
            {features.map((feature, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${feature.bg} rounded-2xl p-6 border border-black/5 hover:border-black/10 shadow-sm transition-all duration-200 group`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-black font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-800 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl">
          <span className="text-5xl block mb-4">🏥</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to book your appointment?</h2>
          <p className="text-cyan-100 text-lg mb-8 max-w-xl mx-auto">
            Talk to our AI assistant, describe your symptoms, and get matched with the best doctors in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveTab('ai-assistant')}
              className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
            >
              🤖 Start with AI Assistant
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className="bg-white/20 border border-white/40 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all"
            >
              Browse All Doctors
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>© 2025 MediBook AI · Smart Healthcare Platform · All rights reserved</p>
        <p className="mt-2 text-xs text-gray-600">⚠️ This is a demo application. For medical emergencies, always call 112.</p>
      </footer>
    </div>
  );
}
