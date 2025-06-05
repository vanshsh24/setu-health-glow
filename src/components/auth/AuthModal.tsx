
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Chrome, Mail } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'np';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, language }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const text = {
    en: {
      title: 'Welcome to Swasthya Setu',
      description: 'Sign in to access your health companion',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      googleSignIn: 'Continue with Google',
      emailLabel: 'Email',
      passwordLabel: 'Password',
      fullNameLabel: 'Full Name',
      emailPlaceholder: 'Enter your email',
      passwordPlaceholder: 'Enter your password',
      fullNamePlaceholder: 'Enter your full name',
      signInButton: 'Sign In',
      signUpButton: 'Create Account',
    },
    np: {
      title: 'स्वास्थ्य सेतुमा स्वागत छ',
      description: 'तपाईंको स्वास्थ्य साथी पहुँच गर्न साइन इन गर्नुहोस्',
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      googleSignIn: 'Google सँग जारी राख्नुहोस्',
      emailLabel: 'इमेल',
      passwordLabel: 'पासवर्ड',
      fullNameLabel: 'पूरा नाम',
      emailPlaceholder: 'तपाईंको इमेल प्रविष्ट गर्नुहोस्',
      passwordPlaceholder: 'तपाईंको पासवर्ड प्रविष्ट गर्नुहोस्',
      fullNamePlaceholder: 'तपाईंको पूरा नाम प्रविष्ट गर्नुहोस्',
      signInButton: 'साइन इन',
      signUpButton: 'खाता सिर्जना गर्नुहोस्',
    },
  };

  const t = text[language];

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await signInWithEmail(email, password);
    if (success) {
      onClose();
    }
    setLoading(false);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await signUpWithEmail(email, password, fullName);
    if (success) {
      onClose();
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t.title}</DialogTitle>
          <DialogDescription className="text-center">
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <Chrome className="mr-2 h-4 w-4" />
            {t.googleSignIn}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">{t.signIn}</TabsTrigger>
              <TabsTrigger value="signup">{t.signUp}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">{t.emailLabel}</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">{t.passwordLabel}</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <Mail className="mr-2 h-4 w-4" />
                  {t.signInButton}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleEmailSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t.fullNameLabel}</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={t.fullNamePlaceholder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t.emailLabel}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t.passwordLabel}</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  <Mail className="mr-2 h-4 w-4" />
                  {t.signUpButton}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
