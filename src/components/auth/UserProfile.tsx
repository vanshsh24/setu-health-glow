
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

interface UserProfileProps {
  language: 'en' | 'np';
}

const UserProfile: React.FC<UserProfileProps> = ({ language }) => {
  const { user, profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    date_of_birth: profile?.date_of_birth || '',
    gender: profile?.gender || '',
    address: profile?.address || '',
    emergency_contact: profile?.emergency_contact || '',
  });
  const [loading, setLoading] = useState(false);

  const text = {
    en: {
      title: 'Profile Information',
      description: 'Manage your personal information',
      fullName: 'Full Name',
      phone: 'Phone Number',
      dateOfBirth: 'Date of Birth',
      gender: 'Gender',
      address: 'Address',
      emergencyContact: 'Emergency Contact',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      selectGender: 'Select gender',
      save: 'Save Changes',
      email: 'Email',
    },
    np: {
      title: 'प्रोफाइल जानकारी',
      description: 'तपाईंको व्यक्तिगत जानकारी व्यवस्थापन गर्नुहोस्',
      fullName: 'पूरा नाम',
      phone: 'फोन नम्बर',
      dateOfBirth: 'जन्म मिति',
      gender: 'लिङ्ग',
      address: 'ठेगाना',
      emergencyContact: 'आपतकालीन सम्पर्क',
      male: 'पुरुष',
      female: 'महिला',
      other: 'अन्य',
      selectGender: 'लिङ्ग छान्नुहोस्',
      save: 'परिवर्तनहरू सेभ गर्नुहोस्',
      email: 'इमेल',
    },
  };

  const t = text[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await updateProfile(formData);
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={user.email || ''}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">{t.fullName}</Label>
              <Input
                id="full_name"
                type="text"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t.phone}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">{t.dateOfBirth}</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">{t.gender}</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectGender} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t.male}</SelectItem>
                  <SelectItem value="female">{t.female}</SelectItem>
                  <SelectItem value="other">{t.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t.address}</Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency_contact">{t.emergencyContact}</Label>
              <Input
                id="emergency_contact"
                type="tel"
                value={formData.emergency_contact}
                onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {t.save}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
