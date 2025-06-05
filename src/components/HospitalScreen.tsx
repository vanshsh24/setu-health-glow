
import React, { useState } from 'react';
import { Search, Filter, MapPin, Hospital } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import HospitalCard from './HospitalCard';
import HospitalBookingForm from './HospitalBookingForm';
import TicketConfirmation from './TicketConfirmation';

interface HospitalScreenProps {
  language: 'en' | 'np';
}

const HospitalScreen: React.FC<HospitalScreenProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

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

  const sampleHospitals = [
    {
      id: '1',
      name: 'Tribhuvan University Teaching Hospital',
      nameNepali: 'त्रिभुवन विश्वविद्यालय शिक्षण अस्पताल',
      address: 'Maharajgunj, Kathmandu',
      specialties: ['Cardiology', 'Neurology', 'Pediatrics', 'Emergency'],
      rating: 4.5,
      openHours: '24/7',
      doctorsAvailable: 45,
      distance: '2.3',
      consultationFee: 1500
    },
    {
      id: '2',
      name: 'Norvic International Hospital',
      nameNepali: 'नर्भिक अन्तर्राष्ट्रिय अस्पताल',
      address: 'Thapathali, Kathmandu',
      specialties: ['Orthopedics', 'Dermatology', 'General Medicine'],
      rating: 4.3,
      openHours: '6:00 AM - 10:00 PM',
      doctorsAvailable: 32,
      distance: '3.1',
      consultationFee: 2000
    },
    {
      id: '3',
      name: 'B&B Hospital',
      nameNepali: 'बी एण्ड बी अस्पताल',
      address: 'Gwarko, Lalitpur',
      specialties: ['Gastroenterology', 'Pulmonology', 'Oncology'],
      rating: 4.2,
      openHours: '24/7',
      doctorsAvailable: 28,
      distance: '4.7',
      consultationFee: 1800
    },
    {
      id: '4',
      name: 'Grande International Hospital',
      nameNepali: 'ग्रान्डे अन्तर्राष्ट्रिय अस्पताल',
      address: 'Dhapasi, Kathmandu',
      specialties: ['Emergency', 'ICU', 'Surgery', 'Radiology'],
      rating: 4.4,
      openHours: '24/7',
      doctorsAvailable: 38,
      distance: '5.2',
      consultationFee: 2200
    }
  ];

  const filteredHospitals = sampleHospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.nameNepali.includes(searchQuery) ||
    hospital.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
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
                  <div className="text-2xl font-bold text-teal-600">{sampleHospitals.length}</div>
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
                  <div className="text-2xl font-bold text-blue-600">3</div>
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
          {searchQuery ? `Search Results (${filteredHospitals.length})` : t.nearbyHospitals}
        </h2>

        {filteredHospitals.length === 0 ? (
          <Card className="health-card">
            <CardContent className="p-8 text-center">
              <Hospital className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">{t.noHospitalsFound}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
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
