export interface AIResponse {
  keywords: string[];
  response: string;
  suggestions?: string[];
  recommendSpecialty?: string;
}

export const aiResponses: AIResponse[] = [
  {
    keywords: ['chest pain', 'heart', 'palpitations', 'shortness of breath', 'cardiac'],
    response: "I'm sorry to hear you're experiencing these symptoms. Chest pain and heart-related symptoms should be evaluated promptly. Based on what you've described, I'd recommend seeing a **Cardiologist**. \n\nIf you're experiencing severe chest pain, dizziness, or difficulty breathing **right now**, please call **112 immediately**.\n\nWould you like me to find available cardiologists near you?",
    suggestions: ['Find Cardiologists', 'What should I expect?', 'Emergency symptoms guide'],
    recommendSpecialty: 'Cardiologist',
  },
  {
    keywords: ['headache', 'migraine', 'dizzy', 'dizziness', 'brain', 'memory', 'seizure', 'numbness'],
    response: "Neurological symptoms like headaches, migraines, or dizziness can have various causes. Based on your symptoms, I recommend seeing a **Neurologist** for a proper evaluation.\n\nCommon triggers include stress, dehydration, sleep disorders, or underlying neurological conditions. A specialist can run the right tests to identify the cause.\n\nShall I show you available neurologists in your area?",
    suggestions: ['Find Neurologists', 'Headache diary tips', 'When to go to ER'],
    recommendSpecialty: 'Neurologist',
  },
  {
    keywords: ['skin', 'rash', 'acne', 'eczema', 'psoriasis', 'mole', 'itching', 'hair loss'],
    response: "Skin conditions can be complex and sometimes indicate underlying health issues. A **Dermatologist** would be the right specialist to see.\n\nFor new or changing moles, it's particularly important to get them checked. Many skin conditions are highly treatable when caught early.\n\nWould you like me to find available dermatologists for you?",
    suggestions: ['Find Dermatologists', 'Skin care tips', 'Signs to watch for'],
    recommendSpecialty: 'Dermatologist',
  },
  {
    keywords: ['joint pain', 'knee', 'back pain', 'shoulder', 'hip', 'bone', 'fracture', 'sports injury'],
    response: "Joint pain and musculoskeletal issues can significantly impact your quality of life. Based on your description, an **Orthopedic Specialist** would be best suited to help you.\n\nModern treatments range from physical therapy and injections to minimally invasive procedures, depending on the severity.\n\nShall I find orthopedic specialists available for consultation?",
    suggestions: ['Find Orthopedists', 'Pain management tips', 'Physical therapy info'],
    recommendSpecialty: 'Orthopedist',
  },
  {
    keywords: ['anxiety', 'depression', 'mental health', 'stress', 'panic', 'mood', 'sleep', 'insomnia', 'ptsd'],
    response: "Thank you for reaching out — it takes courage to address mental health concerns. A **Psychiatrist** or mental health professional can provide the support and treatment you need.\n\nMental health conditions are medical conditions and are very treatable. You don't have to face this alone.\n\nWould you like me to find available mental health specialists near you?",
    suggestions: ['Find Psychiatrists', 'Mental health resources', 'Self-care strategies'],
    recommendSpecialty: 'Psychiatrist',
  },
  {
    keywords: ['stomach', 'digestive', 'bloating', 'constipation', 'diarrhea', 'acid reflux', 'nausea', 'bowel'],
    response: "Digestive issues can range from mild discomfort to more serious conditions. A **Gastroenterologist** specializes in the digestive system and can help determine the cause.\n\nMany GI conditions like IBS, GERD, and Crohn's disease are very manageable with the right treatment plan.\n\nWould you like to see available gastroenterologists?",
    suggestions: ['Find Gastroenterologists', 'Digestive health tips', 'Dietary advice'],
    recommendSpecialty: 'Gastroenterologist',
  },
  {
    keywords: ['child', 'baby', 'infant', 'kid', 'pediatric', 'toddler', 'vaccination', 'fever child'],
    response: "For children's health concerns, a **Pediatrician** is the right specialist. They're trained to handle everything from routine check-ups and vaccinations to childhood illnesses and developmental concerns.\n\nIt's always better to err on the side of caution when it comes to children's health.\n\nShall I find available pediatricians in your area?",
    suggestions: ['Find Pediatricians', 'Child health guide', 'Vaccination schedule'],
    recommendSpecialty: 'Pediatrics',
  },
  {
    keywords: ['hi', 'hello', 'hey', 'help', 'start', 'book', 'appointment'],
    response: "Hello! 👋 I'm **MediAI**, your intelligent healthcare assistant. I'm here to help you:\n\n• 🩺 **Find the right doctor** based on your symptoms\n• 📅 **Book appointments** quickly and easily\n• 💊 **Get health guidance** and recommendations\n• 🏥 **Navigate healthcare** options\n\nYou can describe your symptoms, ask about specialties, or simply tell me what kind of help you need. How can I assist you today?",
    suggestions: ['I have chest pain', 'Book a general checkup', 'Find a specialist', 'View my appointments'],
  },
  {
    keywords: ['checkup', 'general', 'annual', 'physical', 'routine', 'wellness'],
    response: "Regular check-ups are essential for preventive healthcare! For a general health assessment, I'd recommend seeing a **Primary Care Physician (PCP)** or **General Practitioner**.\n\nAnnual physicals typically include:\n• Blood pressure & cholesterol check\n• Blood glucose screening\n• BMI assessment\n• Cancer screenings (age-appropriate)\n• Vaccination review\n\nShall I find available doctors for a general check-up?",
    suggestions: ['Find General Practitioners', 'What to expect at a checkup', 'Health screening guide'],
  },
];

export function getAIResponse(userMessage: string): AIResponse {
  const message = userMessage.toLowerCase();
  
  for (const response of aiResponses) {
    if (response.keywords.some(keyword => message.includes(keyword))) {
      return response;
    }
  }
  
  return {
    keywords: [],
    response: "I understand you're looking for healthcare assistance. To help you find the right doctor and appointment, could you tell me more about:\n\n• **What symptoms** are you experiencing?\n• **How long** have you had these symptoms?\n• **Any specific area** of concern (heart, brain, skin, etc.)?\n\nThe more detail you provide, the better I can match you with the right specialist!",
    suggestions: ['I have chest pain', 'I need a specialist', 'General health checkup', 'Mental health support'],
  };
}
