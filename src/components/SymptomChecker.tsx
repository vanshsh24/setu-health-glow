
import React, { useState } from 'react';
import { Send, Mic, Heart, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface SymptomCheckerProps {
  language: 'en' | 'np';
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  rating?: 'up' | 'down';
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'en' 
        ? "Hi! I'm your AI health assistant 💖 I'm here to help you understand your symptoms and provide wellness guidance. How are you feeling today?"
        : "नमस्ते! म तपाईंको AI स्वास्थ्य सहायक हुँ 💖 म तपाईंका लक्षणहरू बुझ्न र स्वास्थ्य सल्लाह दिन यहाँ छु। आज तपाईं कस्तो महसुस गर्दै हुनुहुन्छ?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const aiResponses = {
    en: [
      "I understand you're experiencing some discomfort. Can you tell me more about when these symptoms started? 🤔",
      "Based on what you've described, it might be helpful to consult with a general practitioner. Would you like me to help you book an appointment? 👩‍⚕️",
      "It's important to stay hydrated and get plenty of rest. Have you been drinking enough water today? 💧",
      "These symptoms could be related to stress or fatigue. Have you been getting enough sleep lately? 😴",
      "I recommend monitoring your symptoms for the next 24-48 hours. If they worsen, please seek medical attention immediately. 🏥"
    ],
    np: [
      "म बुझ्छु कि तपाईं केही असुविधा महसुस गर्दै हुनुहुन्छ। यी लक्षणहरू कहिले देखि सुरु भएको बारेमा अझ बताउन सक्नुहुन्छ? 🤔",
      "तपाईंले वर्णन गर्नुभएको आधारमा, सामान्य चिकित्सकसँग सल्लाह लिनु उपयोगी हुन सक्छ। के म तपाईंलाई अपोइन्टमेन्ट बुक गर्न मद्दत गर्न सक्छु? 👩‍⚕️",
      "हाइड्रेटेड रहनु र पर्याप्त आराम लिनु महत्वपूर्ण छ। के तपाईंले आज पर्याप्त पानी पिउनुभएको छ? 💧",
      "यी लक्षणहरू तनाव वा थकानसँग सम्बन्धित हुन सक्छन्। के तपाईं हालै पर्याप्त निद्रा लिनुभएको छ? 😴",
      "म तपाईंका लक्षणहरू अर्को २४-४८ घण्टासम्म निगरानी गर्न सुझाव दिन्छु। यदि तिनीहरू बिग्रिए भने, कृपया तुरुन्त चिकित्सा सहायता लिनुहोस्। 🏥"
    ]
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responses = aiResponses[language];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleRating = (messageId: string, rating: 'up' | 'down') => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, rating } : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] max-w-4xl mx-auto p-4">
      {/* Header */}
      <Card className="health-card mb-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-xl">
                {language === 'en' ? 'AI Symptom Checker' : 'AI लक्षण जाँचकर्ता'}
              </h2>
              <p className="text-gray-600 text-sm">
                {language === 'en' 
                  ? 'Describe your symptoms and get personalized health advice'
                  : 'आफ्ना लक्षणहरू वर्णन गर्नुहोस् र व्यक्तिगत स्वास्थ्य सल्लाह पाउनुहोस्'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`${message.isUser ? 'chat-bubble-user' : 'chat-bubble-ai'} animate-fade-in`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              {!message.isUser && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    {language === 'en' ? 'Was this helpful?' : 'के यो उपयोगी थियो?'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRating(message.id, 'up')}
                    className={`h-6 w-6 p-0 ${message.rating === 'up' ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRating(message.id, 'down')}
                    className={`h-6 w-6 p-0 ${message.rating === 'down' ? 'text-red-600' : 'text-gray-400'}`}
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="chat-bubble-ai">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <Card className="health-card">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder={
                language === 'en' 
                  ? 'Describe your symptoms...' 
                  : 'आफ्ना लक्षणहरू वर्णन गर्नुहोस्...'
              }
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 border-gray-200 focus:border-[#60c4b3] rounded-xl"
            />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="primary-button px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {language === 'en' 
              ? '⚠️ This AI assistant provides general information only. Always consult a healthcare professional for medical advice.'
              : '⚠️ यो AI सहायकले केवल सामान्य जानकारी प्रदान गर्छ। चिकित्सा सल्लाहको लागि सधैं स्वास्थ्य पेशेवरसँग सल्लाह लिनुहोस्।'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SymptomChecker;
