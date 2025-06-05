
import React, { useState } from 'react';
import { Calendar, Clock, Video, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DoctorBookingProps {
  language: 'en' | 'np';
}

const DoctorBooking: React.FC<DoctorBookingProps> = ({ language }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const specialties = [
    { value: 'general', label: language === 'en' ? 'General Physician' : 'सामान्य चिकित्सक' },
    { value: 'cardiology', label: language === 'en' ? 'Cardiology' : 'हृदय रोग विशेषज्ञ' },
    { value: 'dermatology', label: language === 'en' ? 'Dermatology' : 'छाला रोग विशेषज्ञ' },
    { value: 'pediatrics', label: language === 'en' ? 'Pediatrics' : 'बाल चिकित्सक' },
    { value: 'orthopedics', label: language === 'en' ? 'Orthopedics' : 'हड्डी रोग विशेषज्ञ' },
  ];

  const doctors = [
    {
      id: '1',
      name: 'Dr. Rajesh Sharma',
      specialty: language === 'en' ? 'General Physician' : 'सामान्य चिकित्सक',
      rating: 4.8,
      experience: '15 years',
      fee: 'NPR 800',
      image: '👨‍⚕️',
      availability: ['10:00 AM', '2:00 PM', '4:30 PM'],
      hospital: 'Tribhuvan University Teaching Hospital'
    },
    {
      id: '2',
      name: 'Dr. Sunita Thapa',
      specialty: language === 'en' ? 'Cardiology' : 'हृदय रोग विशेषज्ञ',
      rating: 4.9,
      experience: '12 years',
      fee: 'NPR 1200',
      image: '👩‍⚕️',
      availability: ['9:00 AM', '11:30 AM', '3:00 PM'],
      hospital: 'Norvic International Hospital'
    },
    {
      id: '3',
      name: 'Dr. Amit Ghimire',
      specialty: language === 'en' ? 'Dermatology' : 'छाला रोग विशेषज्ञ',
      rating: 4.7,
      experience: '10 years',
      fee: 'NPR 1000',
      image: '👨‍⚕️',
      availability: ['1:00 PM', '3:30 PM', '5:00 PM'],
      hospital: 'Hams Hospital'
    },
  ];

  const dates = [
    { value: 'today', label: language === 'en' ? 'Today' : 'आज' },
    { value: 'tomorrow', label: language === 'en' ? 'Tomorrow' : 'भोलि' },
    { value: '2024-12-07', label: language === 'en' ? 'Dec 7, 2024' : 'डिसेम्बर ७, २०२४' },
    { value: '2024-12-08', label: language === 'en' ? 'Dec 8, 2024' : 'डिसेम्बर ८, २०२४' },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          {language === 'en' ? 'Book Doctor Appointment' : 'डाक्टर अपोइन्टमेन्ट बुक गर्नुहोस्'}
        </h1>
        <p className="text-gray-600">
          {language === 'en' 
            ? 'Find and book appointments with qualified doctors' 
            : 'योग्य डाक्टरहरूसँग अपोइन्टमेन्ट खोज्नुहोस् र बुक गर्नुहोस्'
          }
        </p>
      </div>

      {/* Filters */}
      <Card className="health-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            {language === 'en' ? 'Search Filters' : 'खोजी फिल्टर'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'en' ? 'Specialty' : 'विशेषज्ञता'}
              </label>
              <Select onValueChange={setSelectedSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select specialty' : 'विशेषज्ञता चयन गर्नुहोस्'} />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.value} value={specialty.value}>
                      {specialty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {language === 'en' ? 'Preferred Date' : 'मनपर्ने मिति'}
              </label>
              <Select onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'en' ? 'Select date' : 'मिति चयन गर्नुहोस्'} />
                </SelectTrigger>
                <SelectContent>
                  {dates.map((date) => (
                    <SelectItem key={date.value} value={date.value}>
                      {date.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctors List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="health-card hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{doctor.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{doctor.name}</h3>
                  <p className="text-green-600 font-medium">{doctor.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{doctor.experience}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{doctor.hospital}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{doctor.fee}</p>
                  <p className="text-xs text-gray-500">
                    {language === 'en' ? 'Consultation' : 'परामर्श'}
                  </p>
                </div>
              </div>

              {/* Available Times */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Clock className="h-4 w-4 text-blue-600" />
                  {language === 'en' ? 'Available Today' : 'आज उपलब्ध'}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {doctor.availability.map((time, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 text-sm border border-blue-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Video className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Video Call' : 'भिडियो कल'}
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'In-Person' : 'व्यक्तिगत'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Contact */}
      <Card className="health-card mt-8 border-red-200 bg-red-50/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🚨</span>
            </div>
            <div>
              <h3 className="font-bold text-red-800">
                {language === 'en' ? 'Emergency?' : 'आपातकाल?'}
              </h3>
              <p className="text-red-700">
                {language === 'en' 
                  ? 'For urgent medical attention, call 102 or visit nearest emergency room'
                  : 'तत्काल चिकित्सा सेवाको लागि १०२ मा फोन गर्नुहोस् वा नजिकको आपतकालीन कक्षमा जानुहोस्'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorBooking;
