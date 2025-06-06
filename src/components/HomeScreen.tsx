
import React from 'react';
import { Heart, Calendar, FileText, ShoppingCart, Brain, Zap, Hospital } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface HomeScreenProps {
  onSectionChange: (section: string) => void;
  language: 'en' | 'np';
  userName: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSectionChange, language, userName }) => {
  const healthCards = [
    {
      id: 'symptoms',
      icon: Heart,
      title: language === 'en' ? 'Check Symptoms' : 'लक्षण जाँच गर्नुहोस्',
      subtitle: language === 'en' ? 'AI-powered symptom analysis' : 'AI-संचालित लक्षण विश्लेषण',
      gradient: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50'
    },
    {
      id: 'hospitals',
      icon: Hospital,
      title: language === 'en' ? 'Find Hospitals' : 'अस्पताल खोज्नुहोस्',
      subtitle: language === 'en' ? 'Book hospital tickets online' : 'अनलाइन अस्पताल टिकट बुक गर्नुहोस्',
      gradient: 'from-[#60c4b3] to-cyan-500',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'doctors',
      icon: Calendar,
      title: language === 'en' ? 'Book Doctor' : 'डाक्टर बुक गर्नुहोस्',
      subtitle: language === 'en' ? 'Schedule appointments easily' : 'सजिलै अपोइन्टमेन्ट तालिका',
      gradient: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 'lab',
      icon: FileText,
      title: language === 'en' ? 'Lab Tests' : 'प्रयोगशाला परीक्षण',
      subtitle: language === 'en' ? 'Book tests & home pickup' : 'परीक्षण बुक र घर पिकअप',
      gradient: 'from-purple-400 to-violet-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'prescriptions',
      icon: FileText,
      title: language === 'en' ? 'Prescriptions' : 'नुस्खा',
      subtitle: language === 'en' ? 'View past prescriptions' : 'पुराना नुस्खा हेर्नुहोस्',
      gradient: 'from-indigo-400 to-blue-500',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'medicine',
      icon: ShoppingCart,
      title: language === 'en' ? 'Buy Medicine' : 'औषधि किन्नुहोस्',
      subtitle: language === 'en' ? 'Order medicines online' : 'अनलाइन औषधि अर्डर गर्नुहोस्',
      gradient: 'from-[#60c4b3] to-blue-500',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'wellness',
      icon: Brain,
      title: language === 'en' ? 'Wellness Tips' : 'स्वास्थ्य सुझाव',
      subtitle: language === 'en' ? 'Personalized health advice' : 'व्यक्तिगत स्वास्थ्य सल्लाह',
      gradient: 'from-emerald-400 to-teal-500',
      bgColor: 'bg-emerald-50'
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <div className="relative inline-block">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#60c4b3] via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
            {language === 'en' ? `Welcome back, ${userName}! 👋` : `स्वागत छ, ${userName}! 👋`}
          </h1>
          <div className="absolute -top-2 -right-2">
            <div className="w-4 h-4 bg-gradient-to-r from-[#60c4b3] to-cyan-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-gray-600 text-lg">
          {language === 'en' 
            ? 'How can I help you with your health today?' 
            : 'आज म तपाईंको स्वास्थ्यमा कसरी मद्दत गर्न सक्छु?'
          }
        </p>
      </div>

      {/* Quick AI Assistant */}
      <div className="mb-8">
        <Card className="health-card border-2 border-dashed border-[#60c4b3]/30 hover:border-[#60c4b3]/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#60c4b3] to-cyan-600 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {language === 'en' ? 'AI Health Assistant' : 'AI स्वास्थ्य सहायक'}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' 
                    ? 'Ask me anything about your health concerns 💖' 
                    : 'तपाईंको स्वास्थ्य चिन्ताको बारेमा मलाई कुनै पनि कुरा सोध्नुहोस् 💖'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={() => onSectionChange('symptoms')}
              className="w-full primary-button"
            >
              {language === 'en' ? 'Start Conversation 💬' : 'कुराकानी सुरु गर्नुहोस् 💬'}
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Health Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card 
              key={card.id}
              className="health-card cursor-pointer hover:scale-[1.02] transition-all duration-300 group"
              onClick={() => onSectionChange(card.id)}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Health Stats Quick View */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-lg">✅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Health Score' : 'स्वास्थ्य स्कोर'}
              </p>
              <p className="font-bold text-green-600">85/100</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#60c4b3]/20 rounded-full flex items-center justify-center">
              <span className="text-[#60c4b3] text-lg">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Next Appointment' : 'अर्को अपोइन्टमेन्ट'}
              </p>
              <p className="font-bold text-[#60c4b3]">Dec 15</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-lg">💊</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Active Medications' : 'सक्रिय औषधि'}
              </p>
              <p className="font-bold text-blue-600">3 items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
