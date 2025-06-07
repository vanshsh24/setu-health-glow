
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Building2, TestTube } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface InstitutionRegistrationProps {
  language: 'en' | 'np';
  onClose: () => void;
}

const InstitutionRegistration: React.FC<InstitutionRegistrationProps> = ({ language, onClose }) => {
  const [institutionType, setInstitutionType] = useState<'hospital' | 'pathology_lab'>('hospital');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    city: '',
    district: '',
    contact_email: '',
    contact_phone: '',
    services_description: '',
  });
  const [legalDocument, setLegalDocument] = useState<File | null>(null);
  const { toast } = useToast();

  const text = {
    en: {
      title: 'Institution Registration',
      description: 'Register your healthcare institution with us',
      hospitalTab: 'Hospital',
      pathologyTab: 'Pathology Lab',
      institutionName: 'Institution Name',
      location: 'Full Address',
      city: 'City',
      district: 'District',
      contactEmail: 'Contact Email',
      contactPhone: 'Contact Phone',
      servicesDescription: 'Services Description',
      legalDocument: 'Legal Document (PDF/Image)',
      uploadDocument: 'Upload Document',
      submit: 'Submit Registration',
      submitting: 'Submitting...',
      success: 'Registration submitted successfully! We will review your application and contact you soon.',
      error: 'Failed to submit registration. Please try again.',
      required: 'All fields are required',
      documentRequired: 'Please upload a legal document',
      namePlaceholder: 'Enter institution name',
      locationPlaceholder: 'Enter full address',
      cityPlaceholder: 'Enter city',
      districtPlaceholder: 'Enter district',
      emailPlaceholder: 'Enter contact email',
      phonePlaceholder: 'Enter contact phone',
      servicesPlaceholder: 'Describe the services you provide...',
    },
    np: {
      title: 'संस्था दर्ता',
      description: 'हामीसँग आफ्नो स्वास्थ्य संस्था दर्ता गर्नुहोस्',
      hospitalTab: 'अस्पताल',
      pathologyTab: 'प्रयोगशाला',
      institutionName: 'संस्थाको नाम',
      location: 'पूरा ठेगाना',
      city: 'शहर',
      district: 'जिल्ला',
      contactEmail: 'सम्पर्क इमेल',
      contactPhone: 'सम्पर्क फोन',
      servicesDescription: 'सेवाहरूको विवरण',
      legalDocument: 'कानुनी कागजात (PDF/छवि)',
      uploadDocument: 'कागजात अपलोड गर्नुहोस्',
      submit: 'दर्ता पेश गर्नुहोस्',
      submitting: 'पेश गर्दै...',
      success: 'दर्ता सफलतापूर्वक पेश गरियो! हामी तपाईंको आवेदन समीक्षा गरेर चाँडै सम्पर्क गर्नेछौं।',
      error: 'दर्ता पेश गर्न असफल। कृपया फेरि प्रयास गर्नुहोस्।',
      required: 'सबै क्षेत्रहरू आवश्यक छन्',
      documentRequired: 'कृपया कानुनी कागजात अपलोड गर्नुहोस्',
      namePlaceholder: 'संस्थाको नाम प्रविष्ट गर्नुहोस्',
      locationPlaceholder: 'पूरा ठेगाना प्रविष्ट गर्नुहोस्',
      cityPlaceholder: 'शहर प्रविष्ट गर्नुहोस्',
      districtPlaceholder: 'जिल्ला प्रविष्ट गर्नुहोस्',
      emailPlaceholder: 'सम्पर्क इमेल प्रविष्ट गर्नुहोस्',
      phonePlaceholder: 'सम्पर्क फोन प्रविष्ट गर्नुहोस्',
      servicesPlaceholder: 'तपाईंले प्रदान गर्नुहुने सेवाहरूको वर्णन गर्नुहोस्...',
    },
  };

  const t = text[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLegalDocument(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = Object.values(formData).every(value => value.trim() !== '');
    if (!requiredFields) {
      toast({
        title: "Error",
        description: t.required,
        variant: "destructive",
      });
      return;
    }

    if (!legalDocument) {
      toast({
        title: "Error",
        description: t.documentRequired,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // For now, we'll store the document name. In a real implementation,
      // you would upload the file to Supabase storage first
      const { error } = await supabase
        .from('institution_registrations')
        .insert([{
          institution_type: institutionType,
          ...formData,
          legal_document_name: legalDocument.name,
          // legal_document_url: would be set after upload
        }]);

      if (error) {
        console.error('Registration error:', error);
        toast({
          title: "Error",
          description: t.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: t.success,
      });

      onClose();
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: t.error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {institutionType === 'hospital' ? (
              <Building2 className="h-5 w-5" />
            ) : (
              <TestTube className="h-5 w-5" />
            )}
            {t.title}
          </CardTitle>
          <CardDescription>{t.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Institution Type</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={institutionType === 'hospital' ? 'default' : 'outline'}
                onClick={() => setInstitutionType('hospital')}
                className="flex items-center gap-2"
              >
                <Building2 className="h-4 w-4" />
                {t.hospitalTab}
              </Button>
              <Button
                type="button"
                variant={institutionType === 'pathology_lab' ? 'default' : 'outline'}
                onClick={() => setInstitutionType('pathology_lab')}
                className="flex items-center gap-2"
              >
                <TestTube className="h-4 w-4" />
                {t.pathologyTab}
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t.institutionName}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{t.location}</Label>
              <Input
                id="location"
                type="text"
                placeholder={t.locationPlaceholder}
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{t.city}</Label>
                <Input
                  id="city"
                  type="text"
                  placeholder={t.cityPlaceholder}
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="district">{t.district}</Label>
                <Input
                  id="district"
                  type="text"
                  placeholder={t.districtPlaceholder}
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">{t.contactEmail}</Label>
                <Input
                  id="contact_email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">{t.contactPhone}</Label>
                <Input
                  id="contact_phone"
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="services_description">{t.servicesDescription}</Label>
              <Textarea
                id="services_description"
                placeholder={t.servicesPlaceholder}
                value={formData.services_description}
                onChange={(e) => handleInputChange('services_description', e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="legal_document">{t.legalDocument}</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="legal_document"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('legal_document')?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {t.uploadDocument}
                </Button>
                {legalDocument && (
                  <span className="text-sm text-gray-600">{legalDocument.name}</span>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t.submitting : t.submit}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstitutionRegistration;
