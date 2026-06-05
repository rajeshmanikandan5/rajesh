import { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getAIResponse } from '../data/aiResponses';
import { doctors } from '../data/doctors';

interface AIAssistantProps {
  setActiveTab: (tab: string) => void;
  setSpecialtyFilter: (specialty: string) => void;
}

function formatMessage(text: string) {
  // Convert **bold** to <strong>
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-base flex-shrink-0 shadow-md">
          🤖
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
            isUser
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-sm'
              : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm'
          }`}
        >
          {formatMessage(message.content)}
        </div>
        <span className="text-xs text-gray-400 px-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isUser && (
        <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md">
          You
        </div>
      )}
    </div>
  );
}

export default function AIAssistant({ setActiveTab, setSpecialtyFilter }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! 👋 I'm **MediAI**, your intelligent healthcare assistant. I'm here to help you:\n\n• 🩺 **Find the right doctor** based on your symptoms\n• 📅 **Book appointments** quickly and easily\n• 💊 **Get health guidance** and recommendations\n• 🏥 **Navigate healthcare** options\n\nYou can describe your symptoms, ask about specialties, or simply tell me what kind of help you need. How can I assist you today?",
      timestamp: new Date(),
      suggestions: ['I have chest pain', 'Book a general checkup', 'Find a specialist', 'I have headaches'],
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const aiData = getAIResponse(messageText);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiData.response,
      timestamp: new Date(),
      suggestions: aiData.suggestions,
    };

    setIsTyping(false);
    setMessages(prev => [...prev, aiMessage]);

    // If specialty is recommended, offer navigation
    if (aiData.recommendSpecialty) {
      setTimeout(() => {
        const navMessage: Message = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: `I found **${doctors.filter(d => d.specialty.toLowerCase().includes(aiData.recommendSpecialty!.toLowerCase().split(' ')[0])).length} specialists** matching your needs. Click below to view their profiles and available slots:`,
          timestamp: new Date(),
          suggestions: [`View ${aiData.recommendSpecialty}s →`, 'Tell me more about my symptoms', 'What questions should I ask my doctor?'],
        };
        setMessages(prev => [...prev, navMessage]);
      }, 500);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.includes('→') || suggestion.toLowerCase().includes('view')) {
      const specialty = suggestion.replace('View ', '').replace('s →', '').replace('→', '').trim();
      setSpecialtyFilter(specialty);
      setActiveTab('doctors');
      return;
    }
    handleSend(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm mb-4 flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
          🤖
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">MediAI Assistant</h1>
          <p className="text-sm text-gray-500">Powered by advanced medical AI</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Online & Ready
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">🔒 Secure</span>
          <span className="flex items-center gap-1">🏥 Medical Grade</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200 shadow-sm overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map(message => (
          <div key={message.id}>
            <MessageBubble message={message} />
            {message.suggestions && message.role === 'assistant' && (
              <div className="mt-3 ml-12 flex flex-wrap gap-2">
                {message.suggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-white border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-blue-50 hover:border-blue-400 transition-all duration-150 shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-base flex-shrink-0 shadow-md">
              🤖
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Describe your symptoms or ask a health question..."
            className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:shadow-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Send
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 px-1">
          ⚠️ This AI assistant is for informational purposes only. For emergencies, call 112. Always consult a qualified physician for medical advice.
        </p>
      </div>
    </div>
  );
}
