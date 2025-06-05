
import React from 'react';
import { Leaf, Moon, Dumbbell, Brain, Heart, Apple } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WellnessScreenProps {
  language: 'en' | 'np';
}

const WellnessScreen: React.FC<WellnessScreenProps> = ({ language }) => {
  const wellnessTips = [
    {
      id: '1',
      icon: Apple,
      title: language === 'en' ? 'Healthy Nutrition' : 'स्वस्थ पोषण',
      subtitle: language === 'en' ? 'Balanced diet recommendations' : 'सन्तुलित आहार सिफारिसहरू',
      tips: language === 'en' 
        ? ['Eat 5 servings of fruits & vegetables daily', 'Drink 8-10 glasses of water', 'Include whole grains in meals', 'Limit processed foods']
        : ['दैनिक ५ सर्भिङ फलफूल र तरकारी खानुहोस्', '८-१० गिलास पानी पिउनुहोस्', 'खानामा साबुत अन्न समावेश गर्नुहोस्', 'प्रशोधित खाना सीमित गर्नुहोस्'],
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50'
    },
    {
      id: '2',
      icon: Dumbbell,
      title: language === 'en' ? 'Physical Exercise' : 'शारीरिक व्यायाम',
      subtitle: language === 'en' ? 'Stay active and strong' : 'सक्रिय र बलियो रहनुहोस्',
      tips: language === 'en' 
        ? ['30 minutes of moderate exercise daily', 'Take stairs instead of elevator', 'Practice yoga or stretching', 'Walk 10,000 steps daily']
        : ['दैनिक ३० मिनेट मध्यम व्यायाम गर्नुहोस्', 'लिफ्टको सट्टा सिँढी प्रयोग गर्नुहोस्', 'योग वा स्ट्रेचिङ अभ्यास गर्नुहोस्', 'दैनिक १०,००० कदम हिँड्नुहोस्'],
      color: 'from-orange-400 to-red-500',
      bgColor: 'bg-orange-50'
    },
    {
      id: '3',
      icon: Moon,
      title: language === 'en' ? 'Quality Sleep' : 'गुणस्तरीय निद्रा',
      subtitle: language === 'en' ? 'Rest and recovery tips' : 'आराम र पुनर्प्राप्ति सुझावहरू',
      tips: language === 'en' 
        ? ['7-9 hours of sleep nightly', 'Maintain consistent sleep schedule', 'Create a relaxing bedtime routine', 'Avoid screens before bed']
        : ['रातमा ७-९ घण्टा सुत्नुहोस्', 'निरन्तर निद्रा तालिका कायम राख्नुहोस्', 'आरामदायक सुत्ने दिनचर्या बनाउनुहोस्', 'सुत्नु अघि स्क्रिन हेर्न नछोड्नुहोस्'],
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: '4',
      icon: Brain,
      title: language === 'en' ? 'Mental Wellness' : 'मानसिक स्वास्थ्य',
      subtitle: language === 'en' ? 'Stress management techniques' : 'तनाव व्यवस्थापन प्रविधिहरू',
      tips: language === 'en' 
        ? ['Practice daily meditation', 'Deep breathing exercises', 'Connect with loved ones', 'Engage in hobbies you enjoy']
        : ['दैनिक ध्यान अभ्यास गर्नुहोस्', 'गहिरो सास फेर्ने अभ्यास गर्नुहोस्', 'प्रियजनहरूसँग जोडिनुहोस्', 'मनपर्ने शौकमा संलग्न हुनुहोस्'],
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-teal-50'
    },
    {
      id: '5',
      icon: Heart,
      title: language === 'en' ? 'Heart Health' : 'हृदय स्वास्थ्य',
      subtitle: language === 'en' ? 'Cardiovascular care tips' : 'हृदय स्वास्थ्य देखभाल सुझावहरू',
      tips: language === 'en' 
        ? ['Monitor blood pressure regularly', 'Limit sodium intake', 'Include omega-3 rich foods', 'Avoid smoking and limit alcohol']
        : ['नियमित रूपमा रक्तचाप जाँच गर्नुहोस्', 'नुन सेवन सीमित गर्नुहोस्', 'ओमेगा-३ भरपूर खाना समावेश गर्नुहोस्', 'धुम्रपान नगर्नुहोस् र मदिरा सीमित गर्नुहोस्'],
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50'
    },
    {
      id: '6',
      icon: Leaf,
      title: language === 'en' ? 'Natural Remedies' : 'प्राकृतिक उपचार',
      subtitle: language === 'en' ? 'Traditional wellness practices' : 'परम्परागत स्वास्थ्य अभ्यासहरू',
      tips: language === 'en' 
        ? ['Drink herbal teas (ginger, turmeric)', 'Practice oil pulling', 'Use neem for skin health', 'Include garlic in daily diet']
        : ['जडिबुटी चिया पिउनुहोस् (अदुवा, बेसार)', 'तेल तान्ने अभ्यास गर्नुहोस्', 'छालाको स्वास्थ्यको लागि नीम प्रयोग गर्नुहोस्', 'दैनिक आहारमा लसुन समावेश गर्नुहोस्'],
      color: 'from-green-400 to-teal-500',
      bgColor: 'bg-green-50'
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
          {language === 'en' ? 'Wellness Center 🌱' : 'कल्याण केन्द्र 🌱'}
        </h1>
        <p className="text-gray-600 text-lg">
          {language === 'en' 
            ? 'Personalized wellness tips powered by AI for your healthy lifestyle'
            : 'तपाईंको स्वस्थ जीवनशैलीको लागि AI द्वारा संचालित व्यक्तिगत कल्याण सुझावहरू'
          }
        </p>
      </div>

      {/* Daily Wellness Score */}
      <Card className="health-card mb-8 border-2 border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-teal-800">
                {language === 'en' ? 'Today\'s Wellness Score' : 'आजको कल्याण स्कोर'}
              </h3>
              <p className="text-teal-600">
                {language === 'en' 
                  ? 'Based on your recent activities and health data'
                  : 'तपाईंको हालका गतिविधिहरू र स्वास्थ्य डेटाको आधारमा'
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                78%
              </div>
              <p className="text-sm text-teal-600 mt-2">
                {language === 'en' ? 'Good!' : 'राम्रो!'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wellness Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wellnessTips.map((tip) => {
          const Icon = tip.icon;
          return (
            <Card key={tip.id} className="health-card hover:scale-[1.02] transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${tip.color} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-800">{tip.title}</CardTitle>
                <p className="text-sm text-gray-600">{tip.subtitle}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2">
                  {tip.tips.map((tipText, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>{tipText}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Personalized Recommendations */}
      <Card className="health-card mt-8 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-orange-600" />
            {language === 'en' ? 'AI Personalized for You' : 'तपाईंको लागि AI व्यक्तिगत'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-orange-100">
              <h4 className="font-semibold text-orange-800 mb-2">
                {language === 'en' ? '🎯 Today\'s Focus' : '🎯 आजको फोकस'}
              </h4>
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'Based on your stress levels, we recommend 10 minutes of deep breathing exercises and a warm turmeric milk before bed.'
                  : 'तपाईंको तनावको स्तरको आधारमा, हामी १० मिनेट गहिरो सास फेर्ने व्यायाम र सुत्नु अघि न्यानो बेसारको दूध सिफारिस गर्छौं।'
                }
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-orange-100">
              <h4 className="font-semibold text-orange-800 mb-2">
                {language === 'en' ? '📅 This Week\'s Goal' : '📅 यस हप्ताको लक्ष्य'}
              </h4>
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'Increase your daily water intake to 3 liters and add 15 minutes of morning yoga to your routine.'
                  : 'तपाईंको दैनिक पानी सेवन ३ लिटरसम्म बढाउनुहोस् र तपाईंको दिनचर्यामा १५ मिनेट बिहानको योग थप्नुहोस्।'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessScreen;
