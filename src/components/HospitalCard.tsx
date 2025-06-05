
import React from 'react';
import { MapPin, Clock, Star, Calendar, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Hospital {
  id: string;
  name: string;
  nameNepali: string;
  address: string;
  specialties: string[];
  rating: number;
  openHours: string;
  doctorsAvailable: number;
  distance: string;
  image?: string;
  consultationFee: number;
}

interface HospitalCardProps {
  hospital: Hospital;
  language: 'en' | 'np';
  onBookTicket: (hospital: Hospital) => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, language, onBookTicket }) => {
  const text = {
    en: {
      bookTicket: 'Book Ticket',
      doctorsAvailable: 'doctors available',
      consultationFee: 'Consultation Fee',
      open: 'Open',
      km: 'km away'
    },
    np: {
      bookTicket: 'टिकट बुक गर्नुहोस्',
      doctorsAvailable: 'डाक्टर उपलब्ध',
      consultationFee: 'परामर्श शुल्क',
      open: 'खुला',
      km: 'कि.मी. टाढा'
    }
  };

  const t = text[language];

  return (
    <Card className="health-card hover:scale-[1.02] transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 mb-1">
              {language === 'en' ? hospital.name : hospital.nameNepali}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4" />
              <span>{hospital.address}</span>
              <span className="text-teal-600 font-medium">• {hospital.distance} {t.km}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{hospital.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-green-500" />
                <span className="text-green-600 font-medium">{t.open}</span>
                <span>({hospital.openHours})</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {hospital.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-teal-50 text-teal-700 text-xs rounded-full font-medium"
              >
                {specialty}
              </span>
            ))}
            {hospital.specialties.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{hospital.specialties.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-600">
              <Users className="h-4 w-4" />
              <span>{hospital.doctorsAvailable} {t.doctorsAvailable}</span>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-xs">{t.consultationFee}</div>
              <div className="text-teal-600 font-bold">Rs. {hospital.consultationFee}</div>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onBookTicket(hospital)}
          className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-medium py-2.5 rounded-xl transition-all duration-300"
        >
          <Calendar className="h-4 w-4 mr-2" />
          {t.bookTicket}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;
