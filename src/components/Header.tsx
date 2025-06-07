
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthModal from './auth/AuthModal';

interface HeaderProps {
  language: 'en' | 'np';
  setLanguage: (lang: 'en' | 'np') => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut, profile } = useAuth();
  const navigate = useNavigate();

  const text = {
    en: {
      title: 'Swasthya Setu',
      home: 'Home',
      hospitals: 'Hospitals',
      doctors: 'Doctors',
      wellness: 'Wellness',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      profile: 'Profile',
      welcome: 'Welcome',
    },
    np: {
      title: 'स्वास्थ्य सेतु',
      home: 'होम',
      hospitals: 'अस्पतालहरू',
      doctors: 'डाक्टरहरू',
      wellness: 'कल्याण',
      signIn: 'साइन इन',
      signOut: 'साइन आउट',
      profile: 'प्रोफाइल',
      welcome: 'स्वागत छ',
    },
  };

  const t = text[language];

  const handleSignOut = async () => {
    await signOut();
  };

  const handleAuthClick = () => {
    if (user) {
      // User is signed in, show profile or sign out options
      return;
    } else {
      // User is not signed in, navigate to auth page
      navigate('/auth', { state: { language } });
    }
  };

  return (
    <header className="health-card sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">{t.title}</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-[#60c4b3] transition-colors">
              {t.home}
            </a>
            <a href="#hospitals" className="text-gray-700 hover:text-[#60c4b3] transition-colors">
              {t.hospitals}
            </a>
            <a href="#doctors" className="text-gray-700 hover:text-[#60c4b3] transition-colors">
              {t.doctors}
            </a>
            <a href="#wellness" className="text-gray-700 hover:text-[#60c4b3] transition-colors">
              {t.wellness}
            </a>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language.toUpperCase()}
            </Button>

            {/* Authentication */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {t.welcome}, {profile?.full_name || user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  {t.signOut}
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleAuthClick}
                className="primary-button flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                {t.signIn}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-[#60c4b3] transition-colors">
                {t.home}
              </a>
              <a href="#hospitals" className="text-gray-700 hover:text-[#60c4b3] transition-colors">
                {t.hospitals}
              </a>
              <a href="#doctors" className="text-gray-700 hover:text-[#60c4b3] transition-colors">
                {t.doctors}
              </a>
              <a href="#wellness" className="text-gray-700 hover:text-[#60c4b3] transition-colors">
                {t.wellness}
              </a>
              
              {/* Mobile Language and Auth */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-white/20">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
                  className="flex items-center gap-2 justify-start"
                >
                  <Globe className="h-4 w-4" />
                  {language.toUpperCase()}
                </Button>

                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      {t.welcome}, {profile?.full_name || user.email}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="flex items-center gap-2 justify-start"
                    >
                      <LogOut className="h-4 w-4" />
                      {t.signOut}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleAuthClick}
                    className="primary-button flex items-center gap-2 justify-start"
                  >
                    <User className="h-4 w-4" />
                    {t.signIn}
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          language={language}
        />
      )}
    </header>
  );
};

export default Header;
