
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './AuthModal';
import InstitutionRegistration from './InstitutionRegistration';
import { User, Building2, TestTube } from 'lucide-react';

interface AuthPageProps {
  language: 'en' | 'np';
}

const AuthPage: React.FC<AuthPageProps> = ({ language }) => {
  const [authType, setAuthType] = useState<'user' | 'institution'>('user');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showInstitutionForm, setShowInstitutionForm] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const text = {
    en: {
      title: 'Welcome to Swasthya Setu',
      description: 'Your comprehensive healthcare companion',
      userLogin: 'User Login',
      institutionRegistration: 'Institution Registration',
      userLoginDesc: 'Sign in to access your health records and book appointments',
      institutionDesc: 'Register your hospital or pathology lab to join our network',
      signInButton: 'Sign In',
      registerHospital: 'Register Hospital',
      registerLab: 'Register Pathology Lab',
      alreadyUser: 'Already have an account?',
      signInLink: 'Sign in here',
    },
    np: {
      title: 'स्वास्थ्य सेतुमा स्वागत छ',
      description: 'तपाईंको व्यापक स्वास्थ्य साथी',
      userLogin: 'प्रयोगकर्ता लगइन',
      institutionRegistration: 'संस्था दर्ता',
      userLoginDesc: 'आफ्नो स्वास्थ्य रेकर्ड पहुँच गर्न र अपोइन्टमेन्ट बुक गर्न साइन इन गर्नुहोस्',
      institutionDesc: 'हाम्रो नेटवर्कमा सामेल हुन आफ्नो अस्पताल वा प्रयोगशाला दर्ता गर्नुहोस्',
      signInButton: 'साइन इन',
      registerHospital: 'अस्पताल दर्ता गर्नुहोस्',
      registerLab: 'प्रयोगशाला दर्ता गर्नुहोस्',
      alreadyUser: 'पहिले नै खाता छ?',
      signInLink: 'यहाँ साइन इन गर्नुहोस्',
    },
  };

  const t = text[language];

  // Redirect authenticated users to home
  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showInstitutionForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#eaf6fb] via-[#f0f9ff] to-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="outline"
            onClick={() => setShowInstitutionForm(false)}
            className="mb-6"
          >
            ← Back
          </Button>
          <InstitutionRegistration 
            language={language} 
            onClose={() => setShowInstitutionForm(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf6fb] via-[#f0f9ff] to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.description}</p>
        </div>

        <Tabs value={authType} onValueChange={(value) => setAuthType(value as 'user' | 'institution')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t.userLogin}
            </TabsTrigger>
            <TabsTrigger value="institution" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {t.institutionRegistration}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {t.userLogin}
                </CardTitle>
                <CardDescription>{t.userLoginDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="w-full"
                >
                  {t.signInButton}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="institution">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {t.institutionRegistration}
                </CardTitle>
                <CardDescription>{t.institutionDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => setShowInstitutionForm(true)}
                  className="w-full flex items-center gap-2"
                  variant="default"
                >
                  <Building2 className="h-4 w-4" />
                  {t.registerHospital}
                </Button>
                
                <Button 
                  onClick={() => setShowInstitutionForm(true)}
                  className="w-full flex items-center gap-2"
                  variant="outline"
                >
                  <TestTube className="h-4 w-4" />
                  {t.registerLab}
                </Button>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600">
                    {t.alreadyUser}{' '}
                    <button
                      onClick={() => setAuthType('user')}
                      className="text-primary hover:underline"
                    >
                      {t.signInLink}
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            language={language}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
