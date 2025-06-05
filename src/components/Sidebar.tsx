
import React from 'react';
import { Home, Calendar, Heart, FileText, ShoppingCart, Brain, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  language: 'en' | 'np';
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeSection, 
  onSectionChange, 
  language 
}) => {
  const menuItems = [
    { 
      id: 'home', 
      icon: Home, 
      label: language === 'en' ? 'Home' : 'होम',
      color: 'text-blue-600'
    },
    { 
      id: 'symptoms', 
      icon: Heart, 
      label: language === 'en' ? 'Symptom Checker' : 'लक्षण जाँच',
      color: 'text-red-500'
    },
    { 
      id: 'doctors', 
      icon: Calendar, 
      label: language === 'en' ? 'Book Doctor' : 'डाक्टर बुक गर्नुहोस्',
      color: 'text-green-600'
    },
    { 
      id: 'lab', 
      icon: FileText, 
      label: language === 'en' ? 'Lab Tests' : 'प्रयोगशाला परीक्षण',
      color: 'text-purple-600'
    },
    { 
      id: 'prescriptions', 
      icon: FileText, 
      label: language === 'en' ? 'Prescriptions' : 'नुस्खा',
      color: 'text-indigo-600'
    },
    { 
      id: 'medicine', 
      icon: ShoppingCart, 
      label: language === 'en' ? 'Buy Medicine' : 'औषधि किन्नुहोस्',
      color: 'text-orange-600'
    },
    { 
      id: 'wellness', 
      icon: Brain, 
      label: language === 'en' ? 'Wellness Tips' : 'स्वास्थ्य सुझाव',
      color: 'text-teal-600'
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-md border-r border-white/20
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-b border-gray-100 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">स्</span>
              </div>
              <h2 className="font-bold text-lg">Swasthya Setu</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : item.color}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
