
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import HomeScreen from '../components/HomeScreen';
import SymptomChecker from '../components/SymptomChecker';
import DoctorBooking from '../components/DoctorBooking';
import WellnessScreen from '../components/WellnessScreen';
import UserProfile from '../components/auth/UserProfile';
import { useAuth } from '../hooks/useAuth';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [language, setLanguage] = useState<'en' | 'np'>('en');
  const { user, profile } = useAuth();
  
  const userName = profile?.full_name || user?.email?.split('@')[0] || "Guest";

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleLanguageToggle = () => {
    setLanguage(prev => prev === 'en' ? 'np' : 'en');
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeScreen onSectionChange={setActiveSection} language={language} userName={userName} />;
      case 'symptoms':
        return <SymptomChecker language={language} />;
      case 'doctors':
        return <DoctorBooking language={language} />;
      case 'profile':
        return <UserProfile language={language} />;
      case 'lab':
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Lab Tests (Coming Soon)' : 'प्रयोगशाला परीक्षण (चाँडै आउँदैछ)'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Book lab tests and home sample collection will be available soon!'
                : 'प्रयोगशाला परीक्षण बुक र घर नमूना संकलन चाँडै उपलब्ध हुनेछ!'
              }
            </p>
          </div>
        );
      case 'prescriptions':
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Prescriptions (Coming Soon)' : 'नुस्खा (चाँडै आउँदैछ)'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'View and manage your prescriptions digitally!'
                : 'तपाईंका नुस्खाहरू डिजिटल रूपमा हेर्नुहोस् र व्यवस्थापन गर्नुहोस्!'
              }
            </p>
          </div>
        );
      case 'medicine':
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Medicine Store (Coming Soon)' : 'औषधि पसल (चाँडै आउँदैछ)'}
            </h2>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Order medicines online with home delivery!'
                : 'घर डेलिभरी सहित अनलाइन औषधि अर्डर गर्नुहोस्!'
              }
            </p>
          </div>
        );
      case 'wellness':
        return <WellnessScreen language={language} />;
      default:
        return <HomeScreen onSectionChange={setActiveSection} language={language} userName={userName} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-orange-50">
      <div className="flex h-screen">
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={handleSidebarClose}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          language={language}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            onMenuClick={handleMenuClick}
            language={language}
            onLanguageToggle={handleLanguageToggle}
          />
          
          <main className="flex-1 overflow-y-auto">
            {renderActiveSection()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
