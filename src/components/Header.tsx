
import React, { useState } from 'react';
import { Bell, User, Menu, Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './auth/AuthModal';

interface HeaderProps {
  onMenuClick: () => void;
  language: 'en' | 'np';
  onLanguageToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, language, onLanguageToggle }) => {
  const { user, profile, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const text = {
    en: {
      profile: 'Profile',
      signOut: 'Sign Out',
      signIn: 'Sign In',
    },
    np: {
      profile: 'प्रोफाइल',
      signOut: 'साइन आउट',
      signIn: 'साइन इन',
    },
  };

  const t = text[language];

  return (
    <>
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
          
          {user && (
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
          )}
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline-block text-sm">
                    {profile?.full_name || user.email?.split('@')[0] || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {t.profile}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 text-red-600">
                  <LogOut className="h-4 w-4" />
                  {t.signOut}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setAuthModalOpen(true)}>
              <User className="h-5 w-5 mr-1" />
              {t.signIn}
            </Button>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        language={language}
      />
    </>
  );
};

export default Header;
