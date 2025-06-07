
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Hospital } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HospitalCard from './HospitalCard';
import HospitalBookingForm from './HospitalBookingForm';
import TicketConfirmation from './TicketConfirmation';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HospitalScreenProps {
  language: 'en' | 'np';
}

interface Institution {
  id: string;
  name: string;
  nameNepali?: string;
  location: string;
  city: string;
  district: string;
  contact_email: string;
  contact_phone: string;
  services_description: string;
  institution_type: 'hospital' | 'pathology_lab';
  is_active: boolean;
}

const HospitalScreen: React.FC<HospitalScreenProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const text = {
    en: {
      findHospitals: 'Find Hospitals',
      searchPlaceholder: 'Search hospitals, doctors, or specialties...',
      nearbyHospitals: 'Nearby Hospitals',
      featuredHospitals: 'Featured Hospitals',
      filter: 'Filter',
      noHospitalsFound: 'No hospitals found matching your search.',
      bookingSuccess: 'Booking confirmed successfully!'
    },
    np: {
      findHospitals: 'अस्पताल खोज्नुहोस्',
      searchPlaceholder: 'अस्पताल, डाक्टर, वा विशेषता खोज्नुहोस्...',
      nearbyHospitals: 'नजिकका अस्पतालहरू',
      featuredHospitals: 'विशेष अस्पतालहरू',
      filter: 'फिल्टर',
      noHospitalsFound: 'तपाईंको खोजसँग मिल्ने अस्पताल फेला परेन।',
      bookingSuccess: 'बुकिंग सफलतापूर्वक पुष्टि भयो!'
    }
  };

  const t = text[language];

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    try {
      const { data, error } = await supabase
        .from('approved_institutions')
        .select('*')
        .eq('is_active', true)
        .eq('institution_type', 'hospital');

      if (error) {
        console.error('Error fetching institutions:', error);
        toast({
          title: "Error",
          description: "Failed to load hospitals. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setInstitutions(data || []);
    } catch (error) {
      console.error('Error fetching institutions:', error);
      toast({
        title: "Error",
        description: "Failed to load hospitals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatInstitutionForCard = (institution: Institution) => {
    return {
      id: institution.id,
      name: institution.name,
      nameNepali: institution.name, // You might want to add a nepali_name field
      address: `${institution.location}, ${institution.city}`,
      specialties: institution.services_description.split(',').map(s => s.trim()).slice(0, 3),
      rating: 4.0 + Math.random() * 0.5, // Random rating for demo
      openHours: '24/7', // Default for demo
      doctorsAvailable: Math.floor(Math.random() * 50) + 20, // Random for demo
      distance: (Math.random() * 10 + 1).toFixed(1), // Random distance for demo
      consultationFee: Math.floor(Math.random() * 1000) + 1500, // Random fee for demo
      contact_phone: institution.contact_phone,
      contact_email: institution.contact_email,
      city: institution.city,
      district: institution.district
    };
  };

  const filteredInstitutions = institutions.filter(institution =>
    institution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institution.services_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institution.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    institution.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookTicket = (hospital: any) => {
    setSelectedHospital(hospital);
    setShowBookingForm(true);
  };

  const handleBookingConfirm = (data: any) => {
    setBookingData(data);
    setShowBookingForm(false);
    setShowConfirmation(true);
  };

  const handleCloseModals = () => {
    setShowBookingForm(false);
    setShowConfirmation(false);
    setSelectedHospital(null);
    setBookingData(null);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center">Loading hospitals...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Hospital className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            {t.findHospitals}
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white/80 backdrop-blur-sm"
            />
          </div>
          <Button variant="outline" className="px-6">
            <Filter className="h-5 w-5 mr-2" />
            {t.filter}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="health-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                  <Hospital className="h-4 w-4 text-teal-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-600">{filteredInstitutions.length}</div>
                  <div className="text-sm text-gray-600">Hospitals Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="health-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">2.3 km</div>
                  <div className="text-sm text-gray-600">Nearest Hospital</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="health-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">24/7</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{filteredInstitutions.filter(() => Math.random() > 0.5).length}</div>
                  <div className="text-sm text-gray-600">Emergency Ready</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hospital Listings */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {searchQuery ? `Search Results (${filteredInstitutions.length})` : t.nearbyHospitals}
        </h2>

        {filteredInstitutions.length === 0 ? (
          <Card className="health-card">
            <CardContent className="p-8 text-center">
              <Hospital className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">{t.noHospitalsFound}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map((institution) => (
              <HospitalCard
                key={institution.id}
                hospital={formatInstitutionForCard(institution)}
                language={language}
                onBookTicket={handleBookTicket}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedHospital && (
        <HospitalBookingForm
          hospital={selectedHospital}
          language={language}
          isOpen={showBookingForm}
          onClose={handleCloseModals}
          onBookingConfirm={handleBookingConfirm}
        />
      )}

      {/* Confirmation Modal */}
      {bookingData && (
        <TicketConfirmation
          bookingData={bookingData}
          language={language}
          isOpen={showConfirmation}
          onClose={handleCloseModals}
        />
      )}
    </div>
  );
};

export default HospitalScreen;
