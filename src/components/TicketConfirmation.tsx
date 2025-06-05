
import React from 'react';
import { CheckCircle, Calendar, Clock, MapPin, User, Phone, CreditCard, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TicketConfirmationProps {
  bookingData: {
    hospitalName: string;
    date: string;
    time: string;
    patientName: string;
    patientPhone: string;
    totalAmount: number;
    ticketNumber?: string;
  };
  language: 'en' | 'np';
  isOpen: boolean;
  onClose: () => void;
}

const TicketConfirmation: React.FC<TicketConfirmationProps> = ({
  bookingData,
  language,
  isOpen,
  onClose
}) => {
  const text = {
    en: {
      ticketConfirmed: 'Ticket Confirmed!',
      thankYou: 'Thank you for booking with us',
      ticketNumber: 'Ticket Number',
      hospital: 'Hospital',
      appointmentDate: 'Appointment Date',
      appointmentTime: 'Time',
      patientName: 'Patient Name',
      phoneNumber: 'Phone Number',
      totalPaid: 'Total Paid',
      downloadTicket: 'Download Ticket',
      goToHome: 'Go to Home',
      importantNote: 'Important Note',
      arriveEarly: 'Please arrive 15 minutes before your scheduled time',
      bringId: 'Bring a valid ID and this ticket confirmation'
    },
    np: {
      ticketConfirmed: 'टिकट पुष्टि भयो!',
      thankYou: 'हामीसँग बुकिङ गर्नुभएकोमा धन्यवाद',
      ticketNumber: 'टिकट नम्बर',
      hospital: 'अस्पताल',
      appointmentDate: 'अपोइन्टमेन्ट मिति',
      appointmentTime: 'समय',
      patientName: 'बिरामीको नाम',
      phoneNumber: 'फोन नम्बर',
      totalPaid: 'कुल भुक्तानी',
      downloadTicket: 'टिकट डाउनलोड गर्नुहोस्',
      goToHome: 'होममा जानुहोस्',
      importantNote: 'महत्वपूर्ण नोट',
      arriveEarly: 'कृपया तोकिएको समयभन्दा १५ मिनेट अगाडि आउनुहोस्',
      bringId: 'वैध परिचयपत्र र यो टिकट पुष्टि ल्याउनुहोस्'
    }
  };

  const t = text[language];

  if (!isOpen) return null;

  const ticketNumber = bookingData.ticketNumber || `HSP${Date.now().toString().slice(-6)}`;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{t.ticketConfirmed}</h2>
                <p className="text-sm text-gray-600">{t.thankYou}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-4 mb-6 border border-teal-100">
            <div className="text-center mb-4">
              <div className="text-sm text-teal-600 font-medium">{t.ticketNumber}</div>
              <div className="text-2xl font-bold text-teal-800 font-mono">{ticketNumber}</div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">{t.hospital}</div>
                  <div className="font-medium">{bookingData.hospitalName}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">{t.appointmentDate}</div>
                  <div className="font-medium">{formatDate(bookingData.date)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">{t.appointmentTime}</div>
                  <div className="font-medium">{bookingData.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">{t.patientName}</div>
                  <div className="font-medium">{bookingData.patientName}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">{t.phoneNumber}</div>
                  <div className="font-medium">{bookingData.patientPhone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <div>
                  <div className="text-xs text-gray-500">{t.totalPaid}</div>
                  <div className="font-medium text-green-600">Rs. {bookingData.totalAmount}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <h4 className="font-medium text-yellow-800 mb-2">{t.importantNote}</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• {t.arriveEarly}</li>
              <li>• {t.bringId}</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                // Here you would implement ticket download functionality
                console.log('Download ticket', ticketNumber);
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              {t.downloadTicket}
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
            >
              {t.goToHome}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketConfirmation;
