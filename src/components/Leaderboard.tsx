import React, { useState } from 'react';
import { Award, Trophy, Sparkles, ShoppingBag, ArrowRight, Heart, Star, Flame, CheckCircle, Shield } from 'lucide-react';
import { CitizenProfile, RewardItem } from '../types';
import { TRANSLATIONS } from '../translations';
import { getLocalizedCitizenName } from '../emergencyTranslations';

interface LeaderboardProps {
  profile: CitizenProfile;
  onRedeemReward: (cost: number, itemName: string) => void;
  langCode: string;
}

const COMMUNITY_LEADERBOARD = [
  { rank: 1, name: "Manvi Srivastav", points: 2450, level: 12, badge: "👑 Community Guardian" },
  { rank: 2, name: "Eva Mishra", points: 1980, level: 10, badge: "🏆 City Champion" },
  { rank: 3, name: "Siddharth Nair", points: 1720, level: 9, badge: "🛡️ Issue Verifier" },
  { rank: 4, name: "Rishab", points: 1540, level: 8, badge: "🌟 Local Hero" },
  { rank: 5, name: "You (Citizen Hero)", points: 880, level: 7, badge: "🛡️ Issue Verifier", isUser: true },
  { rank: 6, name: "David", points: 790, level: 6, badge: "🏅 Community Reporter" },
  { rank: 7, name: "Ram Kapoor", points: 620, level: 5, badge: "🏅 Community Reporter" },
];

const REWARDS_STORE: RewardItem[] = [
  { id: '1', title: 'Plant a Tree in Central Park', cost: 300, description: 'Sponsor a real sapling to improve urban canopy. Certificate included.', category: 'Eco', icon: '🌳' },
  { id: '2', title: '1-Week Eco-Transit Pass', cost: 200, description: 'Free unlimited travel on all city buses and commuter light rail lines.', category: 'Transit', icon: '🎫' },
  { id: '3', title: '15% Local Cafe Discount', cost: 100, description: 'Redeem at participating zero-waste local coffee houses and bakeries.', category: 'Dining', icon: '☕' },
  { id: '4', title: 'Community Cleanup Bundle', cost: 80, description: 'Includes biodegradable trash bags, heavy-duty gloves, and grabber tool.', category: 'Eco', icon: '🧹' },
  { id: '5', title: 'Free 2-Hour Smart Parking', cost: 120, description: 'Redeemable at any smart IoT municipal parking bay across downtown.', category: 'Transit', icon: '🚗' },
];

export default function Leaderboard({ profile, onRedeemReward, langCode }: LeaderboardProps) {
  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en-US'];
  
  const getBadgeTranslationText = (badgeText: string) => {
    if (langCode === 'en-US') return badgeText;
    
    const translations: Record<string, Record<string, string>> = {
      'hi-IN': {
        '👑 Community Guardian': '👑 सामुदायिक संरक्षक',
        '🏆 City Champion': '🏆 सिटी चैंपियन',
        '🛡️ Issue Verifier': '🛡️ समस्या सत्यापनकर्ता',
        '🌟 Local Hero': '🌟 स्थानीय नायक',
        '🏅 Community Reporter': '🏅 सामुदायिक रिपोर्टर'
      },
      'bn-IN': {
        '👑 Community Guardian': '👑 সম্প্রদায় অভিভাবক',
        '🏆 City Champion': '👑 সিটি চ্যাম্পিয়ন',
        '🛡️ Issue Verifier': '🛡️ সমস্যা যাচাইকারী',
        '🌟 Local Hero': '🌟 স্থানীয় হিরো',
        '🏅 Community Reporter': '🏅 সম্প্রদায় রিপোর্টার'
      },
      'gu-IN': {
        '👑 Community Guardian': '👑 સમુદાય રક્ષક',
        '🏆 City Champion': '🏆 સિટી ચેમ્પિયન',
        '🛡️ Issue Verifier': '🛡️ સમસ્યા ચકાસણીકર્તા',
        '🌟 Local Hero': '🌟 સ્થાનિક હીરો',
        '🏅 Community Reporter': '🏅 સમુદાય રિપોર્ટર'
      },
      'kn-IN': {
        '👑 Community Guardian': '👑 ಸಮುದಾಯ ರಕ್ಷಕ',
        '🏆 City Champion': '🏆 ಸಿಟಿ ಚಾಂಪಿಯನ್',
        '🛡️ Issue Verifier': '🛡️ ಸಮಸ್ಯೆ ಪರಿಶೀಲಕ',
        '🌟 Local Hero': '🌟 ಸ್ಥಳೀಯ ಹೀರೋ',
        '🏅 Community Reporter': '🏅 ಸಮುದಾಯ ವರದಿಗಾರ'
      },
      'ml-IN': {
        '👑 Community Guardian': '👑 കമ്മ്യൂണിറ്റി ഗാർഡിയൻ',
        '🏆 City Champion': '🏆 സിറ്റി ചാമ്പ്യൻ',
        '🛡️ Issue Verifier': '🛡️ പ്രശ്ന പരിശോധകൻ',
        '🌟 Local Hero': '🌟 പ്രാദേശിക ഹീറോ',
        '🏅 Community Reporter': '🏅 കമ്മ്യൂണിറ്റി റിപ്പോർട്ടർ'
      },
      'mr-IN': {
        '👑 Community Guardian': '👑 समुदाय रक्षक',
        '🏆 City Champion': '🏆 सिटी चॅम्पियन',
        '🛡️ Issue Verifier': '🛡️ समस्या पडताळणीकर्ता',
        '🌟 Local Hero': '🌟 स्थानिक हिरो',
        '🏅 Community Reporter': '🏅 समुदाय वार्ताहर'
      },
      'ta-IN': {
        '👑 Community Guardian': '👑 சமூக பாதுகாவலர்',
        '🏆 City Champion': '🏆 சிட்டி சாம்பியன்',
        '🛡️ Issue Verifier': '🛡️ சிக்கல் சரிபார்ப்பவர்',
        '🌟 Local Hero': '🌟 உள்ளூர் ஹீரோ',
        '🏅 Community Reporter': '🏅 சமூக நிருபர்'
      },
      'te-IN': {
        '👑 Community Guardian': '👑 కమ్యూనిటీ గార్డియన్',
        '🏆 City Champion': '🏆 సిటీ ఛాంపియన్',
        '🛡️ Issue Verifier': '🛡️ సమస్య ధృవీకరణకర్త',
        '🌟 Local Hero': '🌟 స్థానిక హీరో',
        '🏅 Community Reporter': '🏅 కమ్యూనిటీ రిపోర్టర్'
      },
      'ur-IN': {
        '👑 Community Guardian': '👑 کمیونٹی گارڈین',
        '🏆 City Champion': '🏆 سٹی چیمپئن',
        '🛡️ Issue Verifier': '🛡️ مسئلہ کی تصدیق کرنے والا',
        '🌟 Local Hero': '🌟 مقامی ہیرو',
        '🏅 Community Reporter': '🏅 کمیونٹی رپورٹر'
      }
    };
    
    return translations[langCode]?.[badgeText] || badgeText;
  };

  const [activeTab, setActiveTab] = useState<'leaderboard' | 'rewards'>('leaderboard');
  const [message, setMessage] = useState<string | null>(null);

  const handleRedeem = (reward: RewardItem) => {
    const titleTrans = getRewardTranslation(reward.id, 'title', reward.title);
    if (profile.points < reward.cost) {
      if (langCode === 'hi-IN') {
        setMessage(`❌ अपर्याप्त अंक! आपको रिडीम करने के लिए ${reward.cost - profile.points} और अंकों की आवश्यकता है।`);
      } else {
        setMessage(`❌ Insufficient points! You need ${reward.cost - profile.points} more points to redeem this.`);
      }
      setTimeout(() => setMessage(null), 4000);
      return;
    }
    onRedeemReward(reward.cost, titleTrans);
    if (langCode === 'hi-IN') {
      setMessage(`🎉 सफलतापूर्वक रिडीम किया गया: "${titleTrans}"! वाउचर कोड आपकी प्रोफ़ाइल ईमेल पर भेजा गया।`);
    } else {
      setMessage(`🎉 Successfully redeemed: "${titleTrans}"! Voucher code sent to your profile email.`);
    }
    setTimeout(() => setMessage(null), 5000);
  };

  const getRewardCategoryTranslation = (cat: string) => {
    if (cat === 'Eco') return t.eco || 'Eco';
    if (cat === 'Transit') return t.transit || 'Transit';
    if (cat === 'Dining') return t.dining || 'Dining';
    return cat;
  };

  const getRewardTranslation = (id: string, field: 'title' | 'description', defaultText: string) => {
    if (langCode === 'en-US') return defaultText;
    
    const rewardsTranslations: Record<string, Record<string, { title: string, description: string }>> = {
      'hi-IN': {
        '1': { title: 'सिटिज़न पार्क में एक पेड़ लगाएं', description: 'शहरी हरियाली में सुधार के लिए एक असली पौधा प्रायोजित करें। प्रमाणपत्र शामिल है।' },
        '2': { title: '1-सप्ताह इको-ट्रांजिट पास', description: 'सभी शहर की बसों और यात्री रेल लाइनों पर मुफ्त असीमित यात्रा।' },
        '3': { title: '15% स्थानीय कैफे छूट', description: 'भाग लेने वाले कचरा-मुक्त स्थानीय कॉफी हाउस और बेकरियों में रिडीम करें।' },
        '4': { title: 'सामुदायिक सफाई बंडल', description: 'बायोडिग्रेडेबल कचरा बैग, भारी-शुल्क दस्ताने और ग्रैबर टूल शामिल हैं।' },
        '5': { title: 'मुफ्त 2-घंटे स्मार्ट पार्किंग', description: 'डाउनटाउन में किसी भी स्मार्ट आईओटी पार्किंग खाड़ी में रिडीम करने योग्य।' }
      },
      'bn-IN': {
        '1': { title: 'সেন্ট্রাল পার্কে একটি গাছ লাগান', description: 'শহরের সবুজায়ন উন্নত করতে একটি আসল চারা স্পনসর করুন। প্রশংসাপত্র অন্তর্ভুক্ত।' },
        '2': { title: '১-সপ্তাহের ইকো-ট্রানজিট পাস', description: 'সমস্ত城市的 বাস এবং যাত্রীবাহী রেল লাইনে বিনামূল্যে সীমাহীন ভ্রমণ।' },
        '3': { title: '১৫% স্থানীয় ক্যাফে ছাড়', description: 'অংশগ্রহণকারী কফি হাউস এবং বেকারিতে খালাস করুন।' },
        '4': { title: 'সামাজিক পরিচ্ছন্নতা বান্ডিল', description: 'বায়োডিগ্রেডেবল আবর্জনার ব্যাগ, ভারী গ্লাভস এবং আবর্জনা তোলার সরঞ্জাম অন্তর্ভুক্ত।' },
        '5': { title: 'বিনামূল্যে ২-ঘণ্টা স্মার্ট পার্কিং', description: 'ডাউনটাউনের যেকোনো স্মার্ট পার্কিংয়ে ব্যবহারযোগ্য।' }
      },
      'gu-IN': {
        '1': { title: 'સેન્ટ્રલ પાર્કમાં એક વૃક્ષ વાવો', description: 'શહેરી હરિયાળી વધારવા માટે એક રોપાને સ્પોન્સર કરો. પ્રમાણપત્ર સામેલ છે.' },
        '2': { title: '૧-અઠવાડિયા ઇકો-ટ્રાન્ઝિટ પાસ', description: 'તમામ શહેર બસો અને રેલ્વે લાઈનો પર મફત અમર્યાદિત મુસાફરી.' },
        '3': { title: '૧૫% સ્થાનિક કેફે ડિસ્કાઉન્ટ', description: 'ભાગ લેતી ઝીરો-વેસ્ટ સ્થાનિક કોફી હાઉસ અને બેકરીઓ પર રિડીમ કરો.' },
        '4': { title: 'સામુદાયિક સફાઈ બંડલ', description: 'બાયોડિગ્રેડેબલ કચરાની બેગ, હેવી-ડ્યુટી ગ્લોવ્સ અને ગ્રેબર ટૂલ શામેલ છે.' },
        '5': { title: 'મફત ૨-કલાક સ્માર્ટ પાર્કિંગ', description: 'ડાઉનટાઉનમાં કોઈપણ સ્માર્ટ આઈઓટી પાર્કિંગ પર રિડીમ કરી શકાય તેવું.' }
      },
      'kn-IN': {
        '1': { title: 'ಸೆಂಟ್ರಲ್ ಪಾರ್ಕ್‌ನಲ್ಲಿ ಒಂದು ಮರ ನೆಡಿ', description: 'ನಾಗರ ಹಸಿರು ಹೆಚ್ಚಿಸಲು ಸಸಿಯನ್ನು ಪ್ರಾಯೋಜಿಸಿ. ಪ್ರಮಾಣಪತ್ರ ಒಳಗೊಂಡಿದೆ.' },
        '2': { title: '1-ವಾರದ ಪರಿಸರ ಸಾರಿಗೆ ಪಾಸ್', description: 'ಎಲ್ಲಾ ನಗರ ಬಸ್‌ಗಳು ಮತ್ತು ಪ್ರಯಾಣಿಕ ರೈಲುಗಳಲ್ಲಿ ಉಚಿತ ಅನಿಯಮಿತ ಪ್ರಯಾಣ.' },
        '3': { title: '15% ಸ್ಥಳೀಯ ಕೆಫೆ ರಿಯಾಯಿತಿ', description: 'ಭಾಗವಹಿಸುವ ಶೂನ್ಯ-ತ್ಯಾಜ್ಯ ಸ್ಥಳೀಯ ಕಾಫಿ ಮತ್ತು ಬೇಕರಿಗಳಲ್ಲಿ ರಿಡೀಮ್ ಮಾಡಿ.' },
        '4': { title: 'ಸಮುದಾಯ ಸ್ವಚ್ಛತಾ ಬಂಡಲ್', description: 'ಜೈವಿಕ ವಿಘಟನೀಯ ಕಸದ ಚೀಲಗಳು, ಕೈಗವಸುಗಳು ಮತ್ತು ಕಸ ಎತ್ತುವ ಉಪಕರಣ ಸೇರಿದೆ.' },
        '5': { title: 'ಉಚಿತ 2-ಗಂಟೆ ಸ್ಮಾರ್ಟ್ ಪಾರ್ಕಿಂಗ್', description: 'ನಗರದ ಯಾವುದೇ ಸ್ಮಾರ್ಟ್ ಐಓಟಿ ಪಾರ್ಕಿಂಗ್ ಬೇಯ್‌ನಲ್ಲಿ ರಿಡೀಮ್ ಮಾಡಬಹುದು.' }
      },
      'ml-IN': {
        '1': { title: 'സെൻട്രൽ പാർക്കിൽ ഒരു മരം നട്ടുപിടിപ്പിക്കുക', description: 'നഗര ഹരിതാഭ വർദ്ധിപ്പിക്കാൻ ഒരു തൈ സ്പോൺസർ ചെയ്യുക. സർട്ടിഫിക്കറ്റ് ഉൾപ്പെടുന്നു.' },
        '2': { title: '1-ആഴ്ച ഇക്കോ-ട്രാൻസിറ്റ് പാസ്', description: 'എല്ലാ സിറ്റി ബസുകളിലും ലൈറ്റ് റെയിലുകളിലും സൌജന്യ പരിധിയില്ലാത്ത യാത്ര.' },
        '3': { title: '15% പ്രാദേശിക കഫേ കിഴിവ്', description: 'പങ്കെടുക്കുന്ന സീറോ വേസ്റ്റ് കോഫി ഹൗസുകളിൽ റിഡീം ചെയ്യാം.' },
        '4': { title: 'കമ്മ്യൂണിറ്റി ക്ലീനപ്പ് ബണ്ടിൽ', description: 'ബയോഡിഗ്രേഡബിൾ മാലിന്യ ബാഗുകൾ, ഗ്ലൗസുകൾ, ഗ്രാബർ ഉപകരണം എന്നിവ ഉൾപ്പെടുന്നു.' },
        '5': { title: 'സൌജന്യ 2-മണിക്കൂർ സ്മാർട്ട് പാർക്കിംഗ്', description: 'നഗരത്തിലെ ഏതെങ്കിലും സ്മാർട്ട് പാർക്കിംഗിൽ ഉപയോഗിക്കാം.' }
      },
      'mr-IN': {
        '1': { title: 'सेंट्रल पार्कमध्ये एक झाड लावा', description: 'नागरी हरीत कवच वाढवण्यासाठी एका रोपाचे प्रायोजकत्व घ्या. प्रमाणपत्र समाविष्ट.' },
        '2': { title: '१-आठवडा इको-ट्रान्झिट पास', description: 'सर्व शहर बसेस आणि लोकल रेल्वे मार्गांवर विनामूल्य अमर्यादित प्रवास.' },
        '3': { title: '१५% स्थानिक कॅफे सवलत', description: 'सहभागी झिरो-वेस्ट स्थानिक कॉफी हाऊस आणि बेकरीमध्ये रिडीम करा.' },
        '4': { title: 'सामुदायिक स्वच्छता बंडल', description: 'बायोडिग्रेडेबल कचरा पिशव्या, हेवी-ड्यूटी हातमोजे आणि ग्रॅबर टूल समाविष्ट.' },
        '5': { title: 'मोफत २-तास स्मार्ट पार्किंग', description: 'डाउनटाउनमधील कोणत्याही स्मार्ट आयओटी पार्किंग क्षेत्रात रिडीम करण्यायोग्य.' }
      },
      'ta-IN': {
        '1': { title: 'மத்திய பூங்காவில் ஒரு மரம் நடுங்கள்', description: 'நகர பசுமையை மேம்படுத்த ஒரு மரக்கன்றை ஸ்பான்சர் செய்யுங்கள். சான்றிதழ் சேர்க்கப்பட்டுள்ளது.' },
        '2': { title: '1-வார இக்கோ-டிரான்சிட் பாஸ்', description: 'அனைத்து நகர பேருந்துகள் மற்றும் ரயில்களில் இலவச வரம்பற்ற பயணம்.' },
        '3': { title: '15% உள்ளூர் உணவக தள்ளுபடி', description: 'பங்கேற்கும் பூஜ்ஜிய கழிவு காபி கடைகளில் மீட்டெடுக்கலாம்.' },
        '4': { title: 'சமூக தூய்மை தொகுப்பு', description: 'மக்கும் குப்பை பைகள், கனரக கையுறைகள் மற்றும் குப்பை எடுக்கும் கருவி அடங்கும்.' },
        '5': { title: 'இலவச 2-மணிநேர ஸ்மார்ட் பார்க்கிங்', description: 'நகரத்தின் எந்தவொரு ஸ்மார்ட் பார்க்கிங் பகுதியிலும் மீட்டெடுக்கலாம்.' }
      },
      'te-IN': {
        '1': { title: 'సెంట్రల్ పార్క్‌లో ఒక మొక్కను నాటండి', description: 'నగర పచ్చదనం పెంచడానికి ఒక మొక్కను స్పాన్సర్ చేయండి. సర్టిఫికేట్ కూడా ఇవ్వబడుతుంది.' },
        '2': { title: '1-వారం ఎకో-ట్రాన్సిట్ పాస్', description: 'అన్ని నగర బస్సులు మరియు రైళ్లలో ఉచిత అపరిమిత ప్రయాణం.' },
        '3': { title: '15% స్థానిక కేఫ్ డిస్కౌంట్', description: 'పాల్గొనే జీరో-వేస్ట్ లోకల్ కేఫ్‌లలో రిడీమ్ చేసుకోండి.' },
        '4': { title: 'కమ్యూనిటీ క్లీనప్ బండిల్', description: 'బయోడిగ్రేడబుల్ చెత్త బ్యాగులు, గ్లౌజులు మరియు క్లీనింగ్ పరికరాలు ఉంటాయి.' },
        '5': { title: 'ఉచిత 2-గంటల స్మార్ట్ పార్కింగ్', description: 'డౌన్‌టౌన్‌లోని ఏ స్మార్ట్ ఐఓటి పార్కింగ్ వద్దనైనా ఉపయోగించవచ్చు.' }
      },
      'ur-IN': {
        '1': { title: 'سینٹرل پارک میں ایک درخت لگائیں', description: 'شہری ہریالی کو بہتر بنانے کے لئے ایک پودا سپانسر کریں۔ سرٹیفکیٹ شامل ہے۔' },
        '2': { title: '1-ہفتہ کا ایکو ٹرانزٹ پاس', description: 'شہر کی تمام بسوں اور لوکل ٹرینوں پر مفت لامحدود سفر۔' },
        '3': { title: '15٪ مقامی کیفے دسکاؤنٹ', description: 'شریک زیرو ویسٹ کافی ہاؤسز میں کیش کریں۔' },
        '4': { title: 'کمیونٹی صفائی بنڈل', description: 'کچرے کے تھیلے، دستانے اور صفائی کے اوزار شامل ہیں۔' },
        '5': { title: 'مفت 2 گھنٹے اسمارٹ پارکنگ', description: 'شہر کے کسی بھی اسمارٹ پارکنگ میں استعمال کے قابل۔' }
      }
    };

    const langDict = rewardsTranslations[langCode];
    if (langDict && langDict[id]) {
      return langDict[id][field];
    }
    return defaultText;
  };

  const getBadgeTranslation = (id: string, field: 'name' | 'description', defaultText: string) => {
    if (langCode === 'en-US') return defaultText;

    const badgeTranslations: Record<string, Record<string, { name: string, description: string }>> = {
      'hi-IN': {
        'badge_reporter_gold': { name: 'स्वर्ण रिपोर्टर', description: '10 से अधिक सत्यापित नागरिक समस्याओं की सफलतापूर्वक रिपोर्ट की' },
        'badge_verifier_pro': { name: 'पेशेवर सत्यापनकर्ता', description: 'समुदाय की रिपोर्टों पर 20 सफल सत्यापन ऑडिट पूरे किए' },
        'badge_eco_champion': { name: 'पर्यावरण चैंपियन', description: 'पर्यावरण और पार्क बुनियादी ढांचे को बहाल करने में सक्रिय भागीदार' }
      },
      'bn-IN': {
        'badge_reporter_gold': { name: 'স্বর্ণ রিপোর্টার', description: '১০টির বেশি যাচাইকৃত নাগরিক সমস্যা সফলভাবে রিপোর্ট করেছেন' },
        'badge_verifier_pro': { name: 'প্রো যাচাইকারী', description: 'কমিউনিটির রিপোর্টে ২০টি সফল যাচাইকরণ অডিট সম্পন্ন করেছেন' },
        'badge_eco_champion': { name: 'ইকো চ্যাম্পিয়ন', description: 'পরিবেশ এবং পার্ক পুনরুদ্ধার উদ্যোগে সক্রিয় অংশগ্রহণকারী' }
      },
      'gu-IN': {
        'badge_reporter_gold': { name: 'ગોલ્ડ રિપોર્ટર', description: '૧૦ થી વધુ ચકાસાયેલ સમસ્યાઓ સફળતાપૂર્વક રિપોર્ટ કરી' },
        'badge_verifier_pro': { name: 'પ્રો વેરિફાયર', description: '૨૦ સફળ ચકાસણી ઓડિટ પૂર્ણ કર્યા' },
        'badge_eco_champion': { name: 'ઇકો ચેમ્પિયન', description: 'પર્યાવરણ અને જાહેર બાગ-બગીચાઓ સુધારવામાં સક્રિય ભાગીદાર' }
      },
      'kn-IN': {
        'badge_reporter_gold': { name: 'ಗೋಲ್ಡ್ ರಿಪೋರ್ಟರ್', description: '10 ಕ್ಕೂ ಹೆಚ್ಚು ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ವರದಿ ಮಾಡಲಾಗಿದೆ' },
        'badge_verifier_pro': { name: 'ಪ್ರೊ ವೆರಿಫೈಯರ್', description: 'ಸಮುದಾಯದ ವರದಿಗಳ ಮೇಲೆ 20 ಯಶಸ್ವಿ ಆಡಿಟ್‌ಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ' },
        'badge_eco_champion': { name: 'ಪರಿಸರ ಚಾಂಪಿಯನ್', description: 'ಪರಿಸರ ಮತ್ತು ಉದ್ಯಾನವನಗಳನ್ನು ಸುಧಾರಿಸುವಲ್ಲಿ ಸಕ್ರಿಯ ಸಹಭಾಗಿ' }
      },
      'ml-IN': {
        'badge_reporter_gold': { name: 'ഗോൾഡ് റിപ്പോർട്ടർ', description: 'പത്തിലധികം പൗര പ്രശ്നങ്ങൾ വിജയകരമായി റിപ്പോർട്ട് ചെയ്തു' },
        'badge_verifier_pro': { name: 'പ്രോ വെരിഫയർ', description: 'കമ്മ്യൂണിറ്റി റിപ്പോർട്ടുകളിൽ 20 വിജയകരമായ ഓഡിറ്റുകൾ പൂർത്തിയാക്കി' },
        'badge_eco_champion': { name: 'ഇക്കോ ചാമ്പ്യൻ', description: 'പരിസ്ഥിതിയും പാർക്കുകളും നന്നാക്കുന്നതിൽ സജീവ പങ്കാളി' }
      },
      'mr-IN': {
        'badge_reporter_gold': { name: 'गोल्ड रिपोर्टर', description: '१० हून अधिक सत्यापित नागरी समस्यांची यशस्वी नोंदणी केली' },
        'badge_verifier_pro': { name: 'प्रो व्हेरिफायर', description: 'नागरिकांच्या तक्रारींवर २० यशस्वी पडताळणी पूर्ण केल्या' },
        'badge_eco_champion': { name: 'इको चॅम्पियन', description: 'पर्यावरण आणि उद्यानांच्या पायाभूत सुविधा सुधारण्यात सक्रिय सहभाग' }
      },
      'ta-IN': {
        'badge_reporter_gold': { name: 'தங்க ரிப்போர்ட்டர்', description: '10க்கும் மேற்பட்ட சரிபார்க்கப்பட்ட புகார்களை வெற்றிகரமாக சமர்ப்பித்துள்ளார்' },
        'badge_verifier_pro': { name: 'புரோ வெரிஃபையர்', description: 'சமூக புகார்களில் 20 வெற்றிகரமான சரிபார்ப்புகளை முடித்துள்ளார்' },
        'badge_eco_champion': { name: 'இக்கோ சாம்பியன்', description: 'சுற்றுச்சூழல் மற்றும் பூங்காக்களை மேம்படுத்துவதில் தீவிர பங்கேற்பாளர்' }
      },
      'te-IN': {
        'badge_reporter_gold': { name: 'గోల్డ్ రిపోర్టర్', description: '10 కంటే ఎక్కువ సమస్యలను విజయవంతంగా నివేదించారు' },
        'badge_verifier_pro': { name: 'ప్రో వెరిఫైయర్', description: 'సముదాయ నివేదికలపై 20 విజయవంతమైన ఆడిట్లు పూర్తి చేశారు' },
        'badge_eco_champion': { name: 'ఎకో ఛాంపియన్', description: 'పర్యావరణం మరియు పార్కుల పునరుద్ధరణలో క్రియాశీల భాగస్వామి' }
      },
      'ur-IN': {
        'badge_reporter_gold': { name: 'گولڈ رپورٹر', description: '10 سے زائد تصدیق شدہ شہری مسائل کامیابی سے رپورٹ کئے' },
        'badge_verifier_pro': { name: 'پرو ویریفائر', description: 'کمیونٹی کی رپورٹوں پر 20 کامیاب تصدیقی آڈٹ مکمل کئے' },
        'badge_eco_champion': { name: 'ایکو چیمپئن', description: 'ماحولیات اور باغات کی بہتری میں سرگرم شریک' }
      }
    };

    const langDict = badgeTranslations[langCode];
    if (langDict && langDict[id]) {
      return langDict[id][field];
    }
    return defaultText;
  };

  return (
    <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl flex flex-col h-[520px]">
      {/* Toggle Headers */}
      <div className="flex justify-between items-center mb-5 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="font-display text-lg font-bold text-white">
            {t.gamifiedHub}
          </h3>
        </div>
        
        <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-xl text-xs font-sans">
          <button
            id="tab-leaderboard"
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'leaderboard' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.leaderboard}
          </button>
          <button
            id="tab-rewards"
            onClick={() => setActiveTab('rewards')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'rewards' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.rewardsStore}
          </button>
        </div>
      </div>

      {/* Profile summary card inside */}
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-4 mb-4 shrink-0 shadow-sm">
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-display font-bold shadow-md">
              7
            </div>
            <div>
              <span className="block text-[11px] text-slate-400 font-sans leading-none font-medium">{t.statusLabel}</span>
              <span className="font-display font-bold text-white text-sm flex items-center gap-1">
                {t.levelInfo}
                <Flame className="w-4 h-4 text-orange-500 animate-bounce" />
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-[11px] text-slate-400 font-sans leading-none font-medium">{t.balance}</span>
            <span className="font-mono font-bold text-blue-400 text-lg">{profile.points} PTS</span>
          </div>
        </div>

        {/* Level Progress Bar as requested: Level 7 Citizen Hero ████████░░ 80% */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] font-mono text-slate-400 font-medium">
            <span>{t.progressLevel}</span>
            <span>80% (3,200 / 4,000 XP)</span>
          </div>
          <div className="relative w-full h-3.5 bg-white/5 border border-white/10 rounded-full overflow-hidden shadow-inner flex items-center px-0.5">
            <div 
              className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-sm transition-all duration-1000"
              style={{ width: `${profile.progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-white/10 text-center">
          <div className="bg-white/5 border border-white/10 rounded-xl p-1.5">
            <span className="block text-[9px] text-slate-400 font-sans uppercase font-bold tracking-wider">{t.weeklyReports}</span>
            <span className="font-display font-bold text-sm text-white">{profile.weeklyReportsCount}</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-1.5">
            <span className="block text-[9px] text-slate-400 font-sans uppercase font-bold tracking-wider">{t.verifications}</span>
            <span className="font-display font-bold text-sm text-white">{profile.weeklyVerificationsCount}</span>
          </div>
        </div>
      </div>

      {/* Active Message Notification / Voucher Code Toast */}
      {message && (
        <div className="mb-3 px-3.5 py-2.5 rounded-xl text-xs font-sans bg-slate-900 text-white border border-white/10 shadow-lg animate-pulse shrink-0">
          {message}
        </div>
      )}

      {/* Content Scroller */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'leaderboard' ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase font-mono px-2">
              <span>{langCode === 'en-US' ? 'RANK & CITIZEN' : t.leaderboard}</span>
              <div className="flex gap-12">
                <span>LVL</span>
                <span>{langCode === 'en-US' ? 'POINTS' : t.balance}</span>
              </div>
            </div>

            {COMMUNITY_LEADERBOARD.map((item) => (
              <div 
                key={item.rank}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  item.isUser 
                    ? 'bg-blue-500/15 border-blue-500/35 text-white shadow-sm' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                    item.rank === 1 ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' :
                    item.rank === 2 ? 'bg-slate-300/15 text-slate-300 border border-slate-400/20' :
                    item.rank === 3 ? 'bg-orange-500/15 text-orange-300 border border-orange-500/30' :
                    'bg-white/5 text-slate-400 border border-white/5'
                  }`}>
                    {item.rank}
                  </span>
                  <div>
                    <span className="font-sans font-bold text-xs block leading-tight">
                      {item.isUser && langCode !== 'en-US' ? (
                        langCode === 'hi-IN' ? 'आप (नागरिक नायक)' :
                        langCode === 'bn-IN' ? 'আপনি (সিটিজেন হিরో)' :
                        langCode === 'gu-IN' ? 'તમે (નાગરિક હીરો)' :
                        langCode === 'kn-IN' ? 'ನೀವು (ನಾಗರಿಕ ಹೀರೊ)' :
                        langCode === 'ml-IN' ? 'നിങ്ങൾ (സിറ്റിസൺ ഹീറോ)' :
                        langCode === 'mr-IN' ? 'तुम्ही (सिटिझन हिरो)' :
                        langCode === 'ta-IN' ? 'நீங்கள் (குடிமக்கள் ஹீரோ)' :
                        langCode === 'te-IN' ? 'మీరు (పౌర హీరో)' :
                        langCode === 'ur-IN' ? 'آپ (شہری ہیرو)' :
                        item.name
                      ) : getLocalizedCitizenName(item.name, langCode)}
                    </span>
                    <span className="text-[10px] text-blue-400 font-semibold">
                      {item.isUser && langCode !== 'en-US' ? t.citizenHero : getBadgeTranslationText(item.badge)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-8 shrink-0">
                  <span className="font-display font-bold text-xs bg-white/5 px-2.5 py-1 rounded-md border border-white/10 text-slate-300">
                    Lvl {item.level}
                  </span>
                  <span className="font-mono font-bold text-xs text-white w-12 text-right">
                    {item.rank === 5 ? profile.points : item.points} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 pb-2">
            {REWARDS_STORE.map((reward) => {
              const canAfford = profile.points >= reward.cost;

              return (
                <div 
                  key={reward.id}
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex justify-between items-center gap-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-2xl p-2 bg-white/10 rounded-xl shadow-sm inline-block shrink-0">{reward.icon}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] uppercase font-bold text-blue-400 bg-blue-500/15 px-1.5 py-0.5 rounded border border-blue-500/20">
                          {getRewardCategoryTranslation(reward.category)}
                        </span>
                        <h4 className="font-display font-bold text-xs text-white">{getRewardTranslation(reward.id, 'title', reward.title)}</h4>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 font-sans leading-relaxed">{getRewardTranslation(reward.id, 'description', reward.description)}</p>
                    </div>
                  </div>

                  <button
                    id={`btn-redeem-${reward.id}`}
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 rounded-xl font-sans font-bold text-[11px] shrink-0 transition-all shadow-md flex items-center gap-1 ${
                      canAfford 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer hover:scale-102 shadow-blue-500/20' 
                        : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {reward.cost} PTS
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Badges Quick Panel list bottom as requested */}
      <div className="border-t border-white/10 pt-3 mt-4 shrink-0">
        <h4 className="text-[10px] font-bold text-slate-400 font-mono uppercase mb-2">{t.unlockedBadges}</h4>
        <div className="flex flex-wrap gap-2">
          {profile.badges.map(badge => (
            <div 
              key={badge.id}
              className="flex items-center gap-1 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-xs font-sans text-slate-300 shadow-sm hover:bg-white/10 transition"
              title={getBadgeTranslation(badge.id, 'description', badge.description)}
            >
              <span>{badge.icon}</span>
              <span className="text-[10px] font-bold text-white">{getBadgeTranslation(badge.id, 'name', badge.name)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
