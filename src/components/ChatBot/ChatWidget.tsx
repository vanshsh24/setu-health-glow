
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MessageBubble from './MessageBubble';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWidgetProps {
  language: 'en' | 'np';
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const text = {
    en: {
      title: 'Health Assistant',
      placeholder: 'Ask me about your health...',
      welcome: "Hi! I'm your virtual health assistant. You can ask me anything about your symptoms, well-being, or hospital services — in English or Nepali 😊",
      signInRequired: 'Please sign in to use the AI health assistant.'
    },
    np: {
      title: 'स्वास्थ्य सहायक',
      placeholder: 'तपाईंको स्वास्थ्यको बारेमा सोध्नुहोस्...',
      welcome: "नमस्ते! म तपाईंको भर्चुअल स्वास्थ्य सहायक हुँ। तपाईं आफ्ना लक्षणहरू, स्वास्थ्य, वा अस्पताल सेवाहरूको बारेमा अंग्रेजी वा नेपालीमा कुनै पनि कुरा सोध्न सक्नुहुन्छ 😊",
      signInRequired: 'AI स्वास्थ्य सहायक प्रयोग गर्न कृपया साइन इन गर्नुहोस्।'
    }
  };

  const t = text[language];

  // Initialize welcome message
  useEffect(() => {
    if (user && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: t.welcome,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [user, t.welcome, messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Mock Gemini API response for now
      // In production, this would call your Supabase Edge Function
      setTimeout(() => {
        const mockResponses = [
          "Based on your symptoms, I recommend consulting with a general practitioner. Would you like me to help you book an appointment?",
          "It's important to stay hydrated and get adequate rest. Have you been experiencing these symptoms for long?",
          "For preventive care, regular check-ups are essential. I can help you find nearby hospitals for a health screening.",
          "Your symptoms could be stress-related. Consider practicing meditation and ensuring you get 7-8 hours of sleep.",
          "I understand your concern. For persistent symptoms, it's best to consult a healthcare professional immediately."
        ];

        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: mockResponses[Math.floor(Math.random() * mockResponses.length)],
          isUser: false,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      }, 2000);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full primary-button shadow-lg hover:scale-105 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#60c4b3] text-white rounded-t-2xl">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">{t.title}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {!user ? (
          <div className="text-center text-gray-600 text-sm p-4">
            {t.signInRequired}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
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
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      {user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder={t.placeholder}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 border-gray-200 focus:border-[#60c4b3] rounded-xl"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isTyping}
              className="primary-button px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
