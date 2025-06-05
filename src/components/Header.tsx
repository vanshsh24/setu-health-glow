
import React from 'react';
import { Bell, User, Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick: () => void;
  language: 'en' | 'np';
  onLanguageToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, language, onLanguageToggle }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-white/20 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">स्</span>
          </div>
          <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Swasthya Setu
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onLanguageToggle}
          className="flex items-center gap-1"
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{language === 'en' ? 'नेपाली' : 'English'}</span>
        </Button>
        
        <Button variant="ghost" size="sm">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="sm">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
