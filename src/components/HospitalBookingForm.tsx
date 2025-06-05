
import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, CreditCard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Hospital {
  id: string;
  name: string;
  nameNepali: string;
  address: string;
  consultationFee: number;
}

interface HospitalBookingFormProps {
  hospital: Hospital;
  language: 'en' | 'np';
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirm: (bookingData: any) => void;
}

const HospitalBookingForm: React.FC<HospitalBookingFormProps> = ({
  hospital,
  language,
  isOpen,
  onClose,
  onBookingConfirm
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');

  const text = {
    en: {
      bookHospitalTicket: 'Book Hospital Ticket',
      selectDate: 'Select Date',
      selectTime: 'Select Time Slot',
      selectDoctor: 'Select Doctor (Optional)',
      patientName: 'Patient Name',
      patientPhone: 'Phone Number',
      consultationFee: 'Consultation Fee',
      totalAmount: 'Total Amount',
      confirmBooking: 'Confirm Booking',
      cancel: 'Cancel',
      generalConsultation: 'General Consultation',
      emergency: 'Emergency',
      cardiology: 'Cardiology',
      pediatrics: 'Pediatrics'
    },
    np: {
      bookHospitalTicket: 'अस्पताल टिकट बुक गर्नुहोस्',
      selectDate: 'मिति छान्नुहोस्',
      selectTime: 'समय छान्नुहोस्',
      selectDoctor: 'डाक्टर छान्नुहोस् (वैकल्पिक)',
      patientName: 'बिरामीको नाम',
      patientPhone: 'फोन नम्बर',
      consultationFee: 'परामर्श शुल्क',
      totalAmount: 'कुल रकम',
      confirmBooking: 'बुकिंग पुष्टि गर्नुहोस्',
      cancel: 'रद्द गर्नुहोस्',
      generalConsultation: 'सामान्य परामर्श',
      emergency: 'आपतकालीन',
      cardiology: 'हृदय रोग',
      pediatrics: 'बाल रोग'
    }
  };

  const t = text[language];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const doctors = [
    { id: '1', name: language === 'en' ? 'Dr. Ramesh Sharma' : 'डा. रमेश शर्मा', specialty: t.generalConsultation },
    { id: '2', name: language === 'en' ? 'Dr. Sita Devi' : 'डा. सीता देवी', specialty: t.cardiology },
    { id: '3', name: language === 'en' ? 'Dr. Binod Thapa' : 'डा. बिनोद थापा', specialty: t.pediatrics }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingData = {
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      date: selectedDate,
      time: selectedTime,
      doctorId: selectedDoctor,
      patientName,
      patientPhone,
      consultationFee: hospital.consultationFee,
      totalAmount: hospital.consultationFee + 50 // Adding booking fee
    };

    onBookingConfirm(bookingData);
  };

  if (!isOpen) return null;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">{t.bookHospitalTicket}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-4 p-3 bg-teal-50 rounded-lg">
            <div className="flex items-center gap-2 text-teal-700">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">{language === 'en' ? hospital.name : hospital.nameNepali}</span>
            </div>
            <p className="text-sm text-teal-600 mt-1">{hospital.address}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                {t.selectDate}
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                {t.selectTime}
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">{t.selectTime}</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4 inline mr-1" />
                {t.selectDoctor}
              </label>
              <select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">{t.selectDoctor}</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.patientName}
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.patientPhone}
              </label>
              <input
                type="tel"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">{t.consultationFee}</span>
                <span className="font-medium">Rs. {hospital.consultationFee}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Booking Fee</span>
                <span className="font-medium">Rs. 50</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                <span>{t.totalAmount}</span>
                <span className="text-teal-600">Rs. {hospital.consultationFee + 50}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                {t.cancel}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {t.confirmBooking}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HospitalBookingForm;
