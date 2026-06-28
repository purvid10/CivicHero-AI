import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, Mic, Send, Twitter, Sparkles, MapPin, UploadCloud, 
  HelpCircle, Trash2, StopCircle, RefreshCw, Eye 
} from 'lucide-react';
import { Issue, TimelineEvent, IssueStatus } from '../types';
import { TRANSLATIONS } from '../translations';

interface ReportFormProps {
  onAddIssue: (issue: Partial<Issue>) => void;
  prefilledCoords: { lat: number; lng: number } | null;
  onClearCoords: () => void;
  langCode: string;
  languageName: string;
}

const PRESET_MOCK_COORDS = { lat: 37.7749, lng: -122.4194 };

const LOCALIZED_MOCK_TRANSCRIPTS: Record<string, string[]> = {
  'en-US': [
    "I am reporting a large pothole at Oakridge Street. Cars are swerving to avoid it and it's extremely dangerous.",
    "Water is leaking from an underground pipe near Riverside Park. There is a huge puddle blocking the public sidewalk.",
    "The streetlight is completely broken on 4th Avenue near the eco district. It's pitch black at night, causing high risk.",
    "Garbage is overflowing from the bins on Elm Road. Waste management needs to collect this immediately, animals are getting into it.",
    "There is a damaged pedestrian guardrail next to the transit terminal, public infrastructure is broken and unsafe."
  ],
  'hi-IN': [
    "मैं ओकरिज स्ट्रीट पर एक बड़े गड्ढे की रिपोर्ट कर रहा हूँ। कारें इससे बचने के लिए मुड़ रही हैं और यह बहुत खतरनाक है।",
    "रिवरसाइड पार्क के पास भूमिगत पाइप से पानी रिस रहा है। सार्वजनिक फुटपाथ पर पानी का एक बड़ा गड्ढा जमा हो गया है।",
    "इको डिस्ट्रिक्ट के पास चौथी एवेन्यू पर स्ट्रीटलाइट पूरी तरह से खराब है। रात में बहुत अंधेरा रहता है जिससे खतरा बढ़ जाता है।",
    "एल्म रोड पर कचरा डिब्बों से बाहर बह रहा है। अपशिष्ट प्रबंधन को इसे तुरंत उठाना चाहिए, जानवर इसमें घुस रहे हैं।",
    "ट्रांजिट टर्मिनल के बगल में एक क्षतिग्रस्त पैदल यात्री रेलिंग है, सार्वजनिक बुनियादी ढांचा टूटा हुआ और असुरक्षित है।"
  ],
  'bn-IN': [
    "আমি ওকরিজ স্ট্রিটে একটি বড় রাস্তার গর্তের রিপোর্ট করছি। গাড়িগুলো এটি এড়াতে গিয়ে ঘুরে যাচ্ছে এবং এটি অত্যন্ত বিপজ্জনক।",
    "রিভারসাইড পার্কের কাছে একটি ভূগর্ভস্থ পাইপ থেকে জল চুঁইয়ে পড়ছে। ফুটপাতে জল জমে বড় কাদার সৃষ্টি হয়েছে।",
    "ইকো ডিস্ট্রিক্টের কাছে ৪র্থ অ্যাভিনিউতে স্ট্রীটলাইটটি সম্পূর্ণ ভেঙে গেছে। রাতে সম্পূর্ণ অন্ধকার থাকে, যার ফলে উচ্চ ঝুঁকি তৈরি হচ্ছে।",
    "এলম রোডের ডাস্টবিন থেকে আবর্জনা উপচে পড়ছে। বর্জ্য ব্যবস্থাপনার অবিলম্বে এটি সংগ্রহ করা উচিত, পশুরা এতে মুখ দিচ্ছে।",
    "ট্রানজিট টার্মিনালের পাশে একটি ক্ষতিগ্রস্ত পথচারী গার্ডরেল রয়েছে, পাবলিক অবকাঠামো ভেঙে গেছে এবং অনিরাপদ।"
  ],
  'gu-IN': [
    "હું ઓકરિજ સ્ટ્રીટ પર એક મોટા ખાડાની રિપોર્ટ કરી રહ્યો છું. ગાડીઓ બચવા માટે વળાંક લઈ રહી છે અને આ ખૂબ જોખમી છે.",
    "રિવરસાઇડ પાર્ક પાસે ભૂગર્ભ પાઇપમાંથી પાણી લીક થઈ રહ્યું છે. ફૂટપાથ પર પાણીનો મોટો ખાડો જામી ગયો છે.",
    "ઇકો ડિસ્ટ્રિક્ટ પાસે ચોથા એવન્યુ પર સ્ટ્રીટલાઇટ સંપૂર્ણપણે બંધ છે. રાત્રે ખૂબ અંધારું હોય છે જેથી મોટું જોખમ છે.",
    "એલ્મ રોડ પર કચરો પેટીઓમાંથી બહાર વહી રહ્યો છે. કચરા વ્યવસ્થાપન વિભાગે આ તાત્કાલિક સાફ કરવું જોઈએ.",
    "ટ્રાન્ઝિટ ટર્મિનલની બાજુમાં પેડેસ્ટ્રિયન ગાર્ડરેલ તૂટી ગયું છે, જાહેર માળખું અસુરક્ષિત છે."
  ],
  'kn-IN': [
    "ನಾನು ಓಕ್ರಿಡ್ಜ್ ಸ್ಟ್ರೀಟ್‌ನಲ್ಲಿ ದೊಡ್ಡ ರಸ್ತೆ ಗುಂಡಿಯ ಬಗ್ಗೆ ವರದಿ ಮಾಡುತ್ತಿದ್ದೇನೆ. ಕಾರುಗಳು ಇದನ್ನು ತಪ್ಪಿಸಲು ತಿರುಗುತ್ತಿವೆ ಮತ್ತು ಇದು ತುಂಬಾ ಅಪಾಯಕಾರಿಯಾಗಿದೆ.",
    "ರಿವರ್‌ಸೈಡ್ ಪಾರ್ಕ್ ಬಳಿ ಭೂಗತ ಪೈಪ್‌ನಿಂದ ನೀರು ಸೋರುತ್ತಿದೆ. ಸಾರ್ವಜನಿಕ ಕಾಲುದಾರಿಯಲ್ಲಿ ದೊಡ್ಡ ನೀರಿನ ಹೊಂಡ ನಿರ್ಮಾಣವಾಗಿದೆ.",
    "ಎಕೋ ಡಿಸ್ಟ್ರಿಕ್ಟ್ ಬಳಿ 4ನೇ ಅವೆನ್ಯೂದಲ್ಲಿ ಬೀದಿದೀಪ ಸಂಪೂರ್ಣವಾಗಿ ಕೆಟ್ಟುಹೋಗಿದೆ. ರಾತ್ರಿ ಸಮಯದಲ್ಲಿ ಕತ್ತಲೆಯಾಗಿರುವುದರಿಂದ ಅಪಘಾತದ ಭೀತಿ ಇದೆ.",
    "ಎಲ್ಮ್ ರಸ್ತೆಯಲ್ಲಿ ಕಸದ ಬುಟ್ಟಿಗಳಿಂದ ಕಸ ಹೊರಗೆ ಚೆಲ್ಲುತ್ತಿದೆ. ನೈರ್ಮಲ್ಯ ಸಿಬ್ಬಂದಿ ಇದನ್ನು ತಕ್ಷಣವೇ ತೆರవుಗೊಳಿಸಬೇಕು.",
    "ಸಾರಿಗೆ ಟರ್ಮಿನಲ್ ಪಕ್ಕದಲ್ಲಿ ಪಾದಚಾರಿ ಗಾರ್ಡ್‌ರೈಲ್ ಹಾನಿಗೊಳಗಾಗಿದೆ, ಸಾರ್ವಜನಿಕ ಮೂಲಸೌకರ್ಯ ಮುರಿದು ಅಸುರಕ್ಷಿತವಾಗಿದೆ."
  ],
  'ml-IN': [
    "ഓക്രിഡ്ജ് സ്ട്രീറ്റിലെ വലിയൊരു റോഡ് കുഴിയെക്കുറിച്ച് ഞാൻ റിപ്പോർട്ട് ചെയ്യുന്നു. വണ്ടികൾ വെട്ടിച്ചുമാറ്റുന്നത് വലിയ അപകടത്തിന് കാരണമാകുന്നു.",
    "റിവർസൈഡ് പാർക്കിന് സമീപമുള്ള പൈപ്പിൽ നിന്ന് വെള്ളം ചോരുന്നു. നടപ്പാതയിൽ വലിയൊരു വെള്ളക്കെട്ട് രൂപപ്പെട്ടിട്ടുണ്ട്.",
    "ഇക്കോ ഡിസ്ട്രിക്റ്റിന് സമീപം നാലാം അവന്യൂവിലുള്ള തെരുവ് വിളക്ക് പൂർണ്ണമായും കേടാണ്. രാത്രിയിൽ വലിയ അപകടസാധ്യതയുണ്ട്.",
    "എൽമ് റോഡിലെ ബിന്നുകളിൽ നിന്ന് മാലിന്യങ്ങൾ കവിഞ്ഞൊഴുകുന്നു. മാലിന്യ സംസ്കരണ വിഭാഗം ഇത് ഉടൻ നീക്കം ചെയ്യണം.",
    "ട്രാൻസിറ്റ് ടെർമിനലിന് സമീപമുള്ള കാൽനടയാത്രക്കാരുടെ ഗാർഡ്റെയിൽ തകർന്നിരിക്കുന്നു, പൊതു ഇൻഫ്രാസ്ട്രക്ചർ അസുരക്ഷിതമാണ്."
  ],
  'mr-IN': [
    "मी ओक्रीज स्ट्रीटवरील मोठ्या खड्ड्याबद्दल तक्रार नोंदवत आहे. वाहने वाचवण्यासाठी वळत आहेत आणि हे अत्यंत धोकादायक आहे.",
    "रिव्हरसाईड पार्कजवळ भूमिगत पाईपमधून पाणी गळती होत आहे. फुटपाथवर पाण्याचे मोठे डबके साचले आहे.",
    "इको डिस्ट्रिक्टजवळील ४थ्या एव्हेन्यूवरील पथदिवा पूर्णपणे बंद आहे. रात्रीच्या वेळी मोठा धोका निर्माण होत आहे.",
    "एल्म रोडवरील कचरापेटीतून कचरा बाहेर पडत आहे. कचरा व्यवस्थापनाने हा त्वरित गोळा करावा, प्राणी त्यात जात आहेत.",
    "ट्रान्झिट टर्मिनलशेजारील पादचारी संरक्षक कठडा तुटला आहे, सार्वजनिक पायाभूत सुविधा असुरक्षित आहे."
  ],
  'ta-IN': [
    "ஓக்ரிட்ஜ் தெருவில் ஒரு பெரிய குழி இருப்பதாக நான் புகாரளிக்கிறேன். கார்கள் அதைத் தவிர்க்க வளைந்து செல்வதால் பெரும் ஆபத்து ஏற்படுகிறது.",
    "ரிவர்சைட் பூங்காவிற்கு அருகில் உள்ள குழாயில் இருந்து தண்ணீர் கசிகிறது. நடைபாதையில் பெரும் நீர் தேங்கியுள்ளது.",
    "ஈகோ மாவட்டத்திற்கு அருகில் உள்ள 4வது அவென்யூவில் தெருவிளக்கு முற்றிலும் பழுதடைந்துள்ளது. இரவில் பெரும் ஆபத்து நிலவுகிறது.",
    "எல்ம் சாலையில் உள்ள குப்பைத் தொட்டிகளில் இருந்து குப்பைகள் வழிகின்றன. துப்புரவுப் பணியாளர்கள் உடனடியாக இதை அகற்ற வேண்டும்.",
    "போக்குவரத்து முனையத்திற்கு அருகில் உள்ள பாதசாரி பாதுகாப்பு கம்பி சேதமடைந்துள்ளது, பொது உள்கட்டமைப்பு அற்றது."
  ],
  'te-IN': [
    "నేను ఓక్రిడ్జ్ వీధిలో ఒక పెద్ద గుంత గురించి నివేదిస్తున్నాను. కార్లు దానిని తప్పించుకోవడానికి తిరుగుతున్నాయి మరియు ఇది చాలా ప్రమాదకరమైనది.",
    "రివర్‌సైడ్ పార్క్ సమీపంలో భూగర్భ పైపు నుండి నీరు లీక్ అవుతోంది. ఫుట్‌పాత్‌పై పెద్ద నీటి కుంట ఏర్పడింది.",
    "ఎకో డిస్ట్రిక్ట్ సమీపంలో 4వ అవెన్యూలో వీధి దీపం పూర్తిగా పాడైపోయింది. రాత్రి వేళల్లో ప్రమాదాలు జరిగే అవకాశం ఉంది.",
    "చెత్త డబ్బాల నుండి చెత్త బయటకు ప్రవహిస్తోంది. మునిసిపల్ సిబ్బంది దీనిని వెంటనే సేకరించాలి.",
    "రవాణా టెర్మినల్ పక్కన పాదచారుల రక్షణ కంచె దెబ్బతింది, పౌర మౌలిక సదుపాయాలు విరిగి ప్రమాదకరంగా మారాయి."
  ],
  'ur-IN': [
    "میں اوکریج اسٹریٹ پر سڑک کے ایک بڑے گڑھے کی اطلاع دے رہا ہو۔ گاڑیاں بچنے کے لئے مڑ رہی ہیں اور یہ انتہائی خطرناک ہے۔",
    "ریور سائیڈ پارک کے قریب زیر زمین پائپ سے پانی بہہ رہا ہے۔ فٹ پاتھ پر پانی کا ایک بڑا جوہڑ بن گیا ہے۔",
    "ایکو ڈسٹرکٹ کے قریب چوتھی ایونیو پر اسٹریٹ لائٹ بالکل بند ہے۔ رات میں اندھیرا ہونے کی وجہ से خطرہ بڑھ جاتا ہے۔",
    "ایلم روڈ پر کچرے دانوں سے کچرا باہر گر رہا ہے۔ ویسٹ مینجمنٹ کو اسے فوری طور پر صاف کرنا چاہئے۔",
    "ٹرانزٹ ٹرمینل کے پاس پیدل چلنے والوں کی حفاظتی ریلنگ ٹوٹی ہوئی ہے، عوامی انفراسٹرکچر غیر محفوظ ہے۔"
  ]
};

const REPORT_FORM_LOCALIZED: Record<string, Record<string, string>> = {
  'en-US': {
    standard: 'Standard',
    socialParser: 'Social Parser',
    aiLive: 'AI Agent Investigation Live',
    aiSub: 'AI Investigation Agent parses visual data and uses structural rules to automatically assign authority & impact.',
    latitude: 'Latitude',
    longitude: 'Longitude',
    reset: 'Reset',
    dragDrop: 'Drag & drop local media or click to browse',
    preload: 'Preload Demo:',
    potholePhoto: '🚧 Pothole Photo',
    waterLeakPhoto: '💧 Water Leak Photo',
    darkStreetlight: '💡 Dark Streetlight',
    acousticSmart: 'Acoustic Smart Detection',
    recognizedTranscript: 'Recognized Transcript',
    recordAgain: 'Record Again',
    refineInForm: 'Refine in Form',
    listening: 'Listening to audio dictation... Speak clearly.',
    noActive: 'No active dictation. Press mic to dictate.',
    socialFeedParser: 'Social Media Feed Parser',
    examples: 'Examples:',
    roadTweet: '🐦 Road Tweet',
    streetlightPost: '🐦 Streetlight Post',
    parsing: 'Neural Parsing in Progress...',
    placeholderTitle: 'e.g., Deep water main leak',
    placeholderDesc: 'Give descriptive notes of what you see. The AI investigation agent will analyze this text to extract structural consequences.'
  },
  'hi-IN': {
    standard: 'मानक',
    socialParser: 'सोशल पार्सर',
    aiLive: 'एआई एजेंट जांच लाइव',
    aiSub: 'एआई जांच एजेंट दृश्य डेटा का विश्लेषण करता है और स्वचालित रूप से अधिकार और प्रभाव निर्धारित करता है।',
    latitude: 'अक्षांश',
    longitude: 'रेखांश',
    reset: 'रीसेट',
    dragDrop: 'स्थानीय मीडिया को खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें',
    preload: 'डेमो प्रीलोड करें:',
    potholePhoto: '🚧 गड्ढे का फोटो',
    waterLeakPhoto: '💧 पानी रिसाव फोटो',
    darkStreetlight: '💡 खराब स्ट्रीटलाइट',
    acousticSmart: 'ध्वनिक स्मार्ट पहचान',
    recognizedTranscript: 'पहचाना गया ट्रांसक्रिप्ट',
    recordAgain: 'फिर से रिकॉर्ड करें',
    refineInForm: 'फॉर्म में सुधार करें',
    listening: 'ऑडियो डिक्टेशन सुन रहा है... स्पष्ट रूप से बोलें।',
    noActive: 'कोई सक्रिय डिक्टेशन नहीं। डिक्टेट करने के लिए माइक दबाएं।',
    socialFeedParser: 'सोशल मीडिया फीड पार्सर',
    examples: 'उदाहरण:',
    roadTweet: '🐦 सड़क ट्वीट',
    streetlightPost: '🐦 स्ट्रीटलाइट पोस्ट',
    parsing: 'न्यूरल पार्सिंग प्रगति पर है...',
    placeholderTitle: 'जैसे, पानी के मुख्य पाइप का रिसाव',
    placeholderDesc: 'आप जो देखते हैं उसका वर्णनात्मक विवरण दें। एआई जांच एजेंट इसका विश्लेषण करेगा।'
  },
  'bn-IN': {
    standard: 'সাধারণ',
    socialParser: 'সোশ্যাল পার্সার',
    aiLive: 'এআই এজেন্ট লাইভ তদন্ত',
    aiSub: 'এআই তদন্ত এজেন্ট ভিজ্যুয়াল ডেটা বিশ্লেষণ করে এবং স্বয়ংক্রিয়ভাবে দায়িত্ব বরাদ্দ করে।',
    latitude: 'অক্ষাংশ',
    longitude: 'দ্রাঘিমাংশ',
    reset: 'রিসেট',
    dragDrop: 'ড্র্যাগ এবং ড্রপ করুন বা ব্রাউজ করতে ক্লিক করুন',
    preload: 'ডেমো প্রিলோடு:',
    potholePhoto: '🚧 গর্তের ছবি',
    waterLeakPhoto: '💧 জল চুঁইয়ে পড়ার ছবি',
    darkStreetlight: '💡 অচল স্ট্রিটলাইট',
    acousticSmart: 'অ্যাকোস্টিক スマート ഡിറ്റക്ഷൻ',
    recognizedTranscript: 'স্বীকৃত প্রতিলিপি',
    recordAgain: 'আবার রেকর্ড করুন',
    refineInForm: 'ফর্মে সংশোধন করুন',
    listening: 'অডিও শোনা হচ্ছে... পরিষ্কারভাবে কথা বলুন।',
    noActive: 'কোনো ডিকটেশন সক্রিয় নেই। রেকর্ড করতে মাইক টিপুন।',
    socialFeedParser: 'সোশ্যাল মিডিয়া ফিড পার্সার',
    examples: 'উদাহরণ:',
    roadTweet: '🐦 রাস্তার টুইট',
    streetlightPost: '🐦 স্ট্রিটলাইটের পোস্ট',
    parsing: 'পার্সিং চলছে...',
    placeholderTitle: 'যেমন, জলের প্রধান লাইনের ফুটো',
    placeholderDesc: 'আপনি যা দেখছেন তার বিবরণ দিন। এআই তদন্তকারী এটি বিশ্লেষণ করবে।'
  },
  'gu-IN': {
    standard: 'સામાન્ય',
    socialParser: 'સોશિયલ પાર્સર',
    aiLive: 'એઆઈ એજન્ટ તપાસ લાઈવ',
    aiSub: 'એઆઈ તપાસ એજન્ટ વિઝ્યુઅલ ડેટાનું વિશ્લેષણ કરે છે અને આપમેળે જવાબદારી સોંપે છે.',
    latitude: 'અક્ષાંશ',
    longitude: 'રેખાંશ',
    reset: 'રીસેટ',
    dragDrop: 'મીડિયાને અહીં ખેંચો અથવા બ્રાઉઝ કરવા માટે ક્લિક કરો',
    preload: 'ડેમો લોડ કરો:',
    potholePhoto: '🚧 ખાડાનો ફોટો',
    waterLeakPhoto: '💧 પાણી ગળતરનો ફોટો',
    darkStreetlight: '💡 બંધ સ્ટ્રીટલાઇટ',
    acousticSmart: 'એકોસ્ટિક સ્માર્ટ ડિટેક્શન',
    recognizedTranscript: 'ઓળખાયેલ લખાણ',
    recordAgain: 'ફરીથી રેકોર્ડ કરો',
    refineInForm: 'ફોર્મમાં સુધારો કરો',
    listening: 'સાંભળી રહ્યું છે... સ્પષ્ટ બોલો.',
    noActive: 'કોઈ સક્રિય ડિક્ટેશન નથી. માઈક દબાવો.',
    socialFeedParser: 'સોશિયલ મીડિયા ફીડ પાર્સર',
    examples: 'ઉદાહરણો:',
    roadTweet: '🐦 રોડ ટ્વીટ',
    streetlightPost: '🐦 સ્ટ્રીટલાઇટ પોસ્ટ',
    parsing: 'પાર્સિંગ ચાલુ છે...',
    placeholderTitle: 'દા.ત., પાણીની પાઇપલાઇન લીકેજ',
    placeholderDesc: 'તમે જે જુઓ છો તેનું વિગતવાર વર્ણન આપો.'
  },
  'kn-IN': {
    standard: 'સામાન્ય',
    socialParser: 'ಸೋಷಿಯಲ್ ಪಾರ್ಸರ್',
    aiLive: 'ಐಐ ಏಜೆಂಟ್ ಲೈವ್ ತನಿಖೆ',
    aiSub: 'ಎಐ ತನಿಖಾ ಏಜೆಂಟ್ ದೃಶ್ಯ ಡೇಟಾವನ್ನು ವಿಶ್ಲೇಷಿಸಿ ಪ್ರಾಧಿಕಾರವನ್ನು ನಿಯೋಜಿಸುತ್ತದೆ.',
    latitude: 'ಅಕ್ಷಾಂಶ',
    longitude: 'ರೇಖಾಂಶ',
    reset: 'ಮರುಹೊಂದಿಸಿ',
    dragDrop: 'ಫೈಲ್ ಎಳೆಯಿರಿ ಅಥವಾ ಬ್ರೌಸ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    preload: 'ಡೆಮೊ ಲೋಡ್ ಮಾಡಿ:',
    potholePhoto: '🚧 ರಸ್ತೆ ಗುಂಡಿ ಫೋಟೋ',
    waterLeakPhoto: '💧 ನೀರು ಸೋರಿಕೆ ಫೋಟೋ',
    darkStreetlight: '💡 ಕೆಟ್ಟ ಬೀದಿದೀప',
    acousticSmart: 'ಅಕೌಸ್ಟಿಕ್ ಸ್ಮಾರ್ಟ್ ಪತ್ತೆ',
    recognizedTranscript: 'ಗುರುತಿಸಲಾದ ಪ್ರತಿಲಿಪಿ',
    recordAgain: 'ಮತ್ತೆ ರೆಕಾರ್ಡ್ ಮಾಡಿ',
    refineInForm: 'ಫಾರ್ಮ್‌ನಲ್ಲಿ ತಿದ್ದುಪಡಿ ಮಾಡಿ',
    listening: 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ... ಸ್ರ್ಪಷ್ಟವಾಗಿ ಮಾತನಾಡಿ.',
    noActive: 'ಯಾವುದೇ ಸಕ್ರಿಯ ರೆಕಾರ್ಡಿಂಗ್ ಇಲ್ಲ. ಮೈಕ್ ಒತ್ತಿ.',
    socialFeedParser: 'ಸೋಷಿಯల్ ಮೀಡಿಯಾ ಫೀడ్ ಪಾರ್ಸರ್',
    examples: 'ಉದಾಹરણೆಗಳು:',
    roadTweet: '🐦 ರಸ್ತೆ ಟ್ವೀట్',
    streetlightPost: '🐦 ಬೀದಿದೀప ಪೋಸ್ಟ್',
    parsing: 'ಪಾರ್ಸಿಂಗ್ ಪ್ರಗತಿಯಲ್ಲಿದೆ...',
    placeholderTitle: 'ಉದಾಹರಣೆಗೆ, ನೀరు ಸೋರಿಕೆ',
    placeholderDesc: 'ನೀವು ನೋಡುವುದನ್ನು ವಿವರವಾಗಿ ಬರೆಯಿರಿ.'
  },
  'ml-IN': {
    standard: 'സാധാരണ',
    socialParser: 'സോഷ്യൽ പാർസർ',
    aiLive: 'എഐ ഏജൻ്റ് അന്വേഷണം ലൈവ്',
    aiSub: 'വിഷ്വൽ ഡാറ്റ പരിശോധിച്ച് എഐ അധികാരികളെ നിശ്ചയിക്കുന്നു.',
    latitude: 'അക്ഷാംശം',
    longitude: 'രേഖാംശം',
    reset: 'റീസെറ്റ്',
    dragDrop: 'ഫയലുകൾ ഇവിടെ ഇടുക അല്ലെങ്കിൽ ബ്രൗസ് ചെയ്യുക',
    preload: 'ഡെമോ ലോഡ്:',
    potholePhoto: '🚧 കുഴിയുടെ ചിത്രം',
    waterLeakPhoto: '💧 പൈപ്പ് ചോർച്ച ഫോട്ടോ',
    darkStreetlight: '💡 കേടായ തെരുവ് വിളക്ക്',
    acousticSmart: 'അക്കോസ്റ്റിക് സ്മാർട്ട് ഡിറ്റക്ഷൻ',
    recognizedTranscript: 'തിരിച്ചറിഞ്ഞ വിവരങ്ങൾ',
    recordAgain: 'വീണ്ടും റെക്കോർഡ് ചെയ്യുക',
    refineInForm: 'ഫോമിൽ തിരുത്തുക',
    listening: 'കേൾക്കുന്നു... വ്യക്തമായി സംസാരിക്കക്കുക.',
    noActive: 'റെക്കോർഡിംഗ് ലഭ്യമല്ല. മൈക്ക് അമർത്തുക.',
    socialFeedParser: 'സോഷ്യل മീഡിയ ഫീഡ് പാർസർ',
    examples: 'ഉദാഹരണങ്ങൾ:',
    roadTweet: '🐦 റോഡ് ട്വീറ്റ്',
    streetlightPost: '🐦 സ്ട്രീറ്റ്ലൈറ്റ് പോസ്റ്റ്',
    parsing: 'വിശകലനം നടക്കുന്നു...',
    placeholderTitle: 'ഉദാഹരണത്തിന്, പൈപ്പ് ചോർച്ച',
    placeholderDesc: 'നിങ്ങൾ കാണുന്ന കാര്യം വിശദീകരിക്കുക.'
  },
  'mr-IN': {
    standard: 'सामान्य',
    socialParser: 'सोशल पार्सर',
    aiLive: 'एआय एजंट तपासणी लाईव्ह',
    aiSub: 'एआय तपासणी एजंट दृष्य डेटाचे विश्लेषण करतो आणि स्वयंचलितपणे अधिकार नियुक्त करतो.',
    latitude: 'अक्षांश',
    longitude: 'रेखांश',
    reset: 'रीसेट',
    dragDrop: 'फाइल खेचा आणि सोडा किंवा ब्राउझ करण्यासाठी क्लिक करा',
    preload: 'डेमो लोड:',
    potholePhoto: '🚧 खड्ड्याचा फोटो',
    waterLeakPhoto: '💧 पाणी गळतीचा फोटो',
    darkStreetlight: '💡 बंद पथदिव्याचा फोटो',
    acousticSmart: 'अकॉस्टिक स्मार्ट डिटेक्शन',
    recognizedTranscript: 'ओळखलेले भाषण',
    recordAgain: 'पुन्हा रेकॉर्ड करा',
    refineInForm: 'फॉर्ममध्ये सुधारा',
    listening: 'ऐकत आहे... स्पष्टपणे बोला.',
    noActive: 'सक्रिय भाषण नाही. माईक दाबा.',
    socialFeedParser: 'Social Media Feed Parser',
    examples: 'उदाहरणे:',
    roadTweet: '🐦 रस्त्याचा ट्विट',
    streetlightPost: '🐦 पथदिव्याची पोस्ट',
    parsing: 'पार्सिंग सुरू आहे...',
    placeholderTitle: 'उदा. पाणी गळती',
    placeholderDesc: 'तुम्हाला जे दिसत आहे त्याचे वर्णन लिहा.'
  },
  'ta-IN': {
    standard: 'வழக்கமான',
    socialParser: 'சமூக ஊடக பகுப்பாய்வு',
    aiLive: 'செயற்கை நுண்ணறிவு விசாரணை நேரலை',
    aiSub: 'செயற்கை நுண்ணறிவுத் தரவு பகுப்பாய்வு மூலம் தானாகவே துறைையைத் தேர்ந்தெடுக்கும்.',
    latitude: 'அட்சரேகை',
    longitude: 'தீர்க்கரேகை',
    reset: 'மீட்டமை',
    dragDrop: 'கோப்புகளை இங்கே இழுத்துப் போடவும் அல்லது கிளிக் செய்யவும்',
    preload: 'மாதிரி கோப்பு:',
    potholePhoto: '🚧 சாலைக்குழி புகைப்படம்',
    waterLeakPhoto: '💧 குடிநீர் கசிவு புகைப்படம்',
    darkStreetlight: '💡 தெருவிளக்கு பழுது',
    acousticSmart: 'ஒலிவழி ஸ்மார்ட் கண்டறிதல்',
    recognizedTranscript: 'கண்டறியப்பட்ட உரை',
    recordAgain: 'மீண்டும் பதிவுசெய்',
    refineInForm: 'படிவத்தில் திருத்து',
    listening: 'கேட்கிறது... தெளிவாகப் பேசவும்.',
    noActive: 'பதிவு எதுவும் இல்லை. மைக் பொத்தானை அழுத்தவும்.',
    socialFeedParser: 'சமூக ஊடக பகுப்பாய்வி',
    examples: 'உதாரணங்கள்:',
    roadTweet: '🐦 சாலை ட்வீட்',
    streetlightPost: '🐦 தெருவிளக்கு பதிவு',
    parsing: 'பகுப்பாய்வு செய்யப்படுகிறது...',
    placeholderTitle: 'எ.கா., குடிநீர் கசிவு',
    placeholderDesc: 'நீங்கள் காண்பதை விவரித்துக் கூறவும்.'
  },
  'te-IN': {
    standard: 'సాధారణ',
    socialParser: 'సోషల్ పార్సర్',
    aiLive: 'ఏఐ ఏజెంట్ పరిశోధన లైవ్',
    aiSub: 'ఏఐ పరిశోధన ఏజెంట్ దృశ్య సమాచారాన్ని విశ్లేషించి బాధ్యతలను కేటాయిస్తుంది.',
    latitude: 'అక్షాంశం',
    longitude: 'రేఖాంశం',
    reset: 'రీసెట్',
    dragDrop: 'ఫైళ్లను ఇక్కడ డ్రాప్ చేయండి లేదా క్లిక్ చేయండి',
    preload: 'డెమో లోడ్:',
    potholePhoto: '🚧 గుంత ఫోటో',
    waterLeakPhoto: '💧 నీటి లీకేజీ ఫోటో',
    darkStreetlight: '💡 వీధి దీపం ఫోటో',
    acousticSmart: 'అకౌస్టిక్ స్మార్ట్ డిటెక్షన్',
    recognizedTranscript: 'గుర్తించిన వచనం',
    recordAgain: 'మళ్లీ రికార్డ్ చేయి',
    refineInForm: 'ఫారమ్‌లో సవరించు',
    listening: 'వింటోంది... స్పష్టంగా మాట్లాడండి.',
    noActive: 'రికార్డింగ్ యాక్టివ్‌గా లేదు. మైక్ నొక్కండి.',
    socialFeedParser: 'సోషల్ మీడియా ఫీడ్ పార్సర్',
    examples: 'ఉదాహరణలు:',
    roadTweet: '🐦 రోడ్ ట్వీట్',
    streetlightPost: '🐦 వీధి దీపం పోస్ట్',
    parsing: 'విశ్లేషణ జరుగుతోంది...',
    placeholderTitle: 'ఉదాహరణకు, నీటి లీకేజీ',
    placeholderDesc: 'మీరు చూసిన దానిని వివరించండి.'
  },
  'ur-IN': {
    standard: 'معیاری',
    socialParser: 'سوشل پارسر',
    aiLive: 'اے آئی ایجنٹ تفتیش لائیو',
    aiSub: 'اے آئی ایجنٹ بصری ڈیٹا کا تجزیہ کر کے خودکار طریقے سے کارروائی کا تعین کرتا ہے۔',
    latitude: 'عرض بلد',
    longitude: 'طول بلد',
    reset: 'دوبارہ ترتیب دیں',
    dragDrop: 'فائل کو یہاں ڈراپ کریں یا براؤز کریں',
    preload: 'ڈیمو لوڈ کریں:',
    potholePhoto: '🚧 گڑھے کی تصویر',
    waterLeakPhoto: '💧 پانی کے رساؤ کی تصویر',
    darkStreetlight: '💡 خراب اسٹریٹ لائٹ',
    acousticSmart: 'صوتی اسمارٹ اسکینر',
    recognizedTranscript: 'تسلیم شدہ تحریر',
    recordAgain: 'دوبارہ ریکارڈ کریں',
    refineInForm: 'فارم میں ترمیم کریں',
    listening: 'آڈیو سنی جا رہی ہے... صاف بولیں۔',
    noActive: 'کوئی آڈیو ریکارڈنگ نہیں ہے۔ مائیک دبائیں۔',
    socialFeedParser: 'سوشل میڈیا فیڈ پارسر',
    examples: 'مثالیں:',
    roadTweet: '🐦 سڑک کا ٹویٹ',
    streetlightPost: '🐦 اسٹریٹ لائٹ کی پوسٹ',
    parsing: 'تجزیہ جاری ہے...',
    placeholderTitle: 'مثلاً, پانی کی پائپ لائن کا رساؤ',
    placeholderDesc: 'مسئلے کی تفصیل تحریر کریں۔'
  }
};

export default function ReportForm({ onAddIssue, prefilledCoords, onClearCoords, langCode, languageName }: ReportFormProps) {
  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en-US'];
  const rl = REPORT_FORM_LOCALIZED[langCode] || REPORT_FORM_LOCALIZED['en-US'];
  const [activeTab, setActiveTab] = useState<'form' | 'voice' | 'social'>('form');
  
  // Standard Form States
  const [category, setCategory] = useState<'Potholes' | 'Water Leakage' | 'Damaged Streetlights' | 'Waste Management' | 'Public Infrastructure'>('Potholes');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [attachedFileType, setAttachedFileType] = useState<string | null>(null);
  
  // Voice Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTimer, setVoiceTimer] = useState(0);
  const [waveHeights, setWaveHeights] = useState<number[]>([10, 15, 8, 20, 14, 25, 12, 18, 10, 15]);
  const [transcript, setTranscript] = useState('');
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const equalizerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Social Parsing States
  const [socialText, setSocialText] = useState('');
  const [isParsingSocial, setIsParsingSocial] = useState(false);
  
  // AI Investigation States
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [aiLogMessage, setAiLogMessage] = useState('');

  // Local Coordinates synced to prefilledCoords or defaults
  const [lat, setLat] = useState<number>(37.7749);
  const [lng, setLng] = useState<number>(-122.4194);

  useEffect(() => {
    if (prefilledCoords) {
      setLat(prefilledCoords.lat);
      setLng(prefilledCoords.lng);
    } else {
      setLat(37.7749);
      setLng(-122.4194);
    }
  }, [prefilledCoords]);

  // Voice recording mock functions
  const startVoiceRecording = () => {
    setIsRecording(true);
    setVoiceTimer(0);
    setTranscript('');
    
    recordingIntervalRef.current = setInterval(() => {
      setVoiceTimer(prev => {
        if (prev >= 15) {
          stopVoiceRecording();
          return 15;
        }
        return prev + 1;
      });
    }, 1000);

    equalizerIntervalRef.current = setInterval(() => {
      setWaveHeights(Array.from({ length: 10 }, () => Math.floor(Math.random() * 30) + 5));
    }, 150);
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    if (equalizerIntervalRef.current) clearInterval(equalizerIntervalRef.current);
    
    const transcripts = LOCALIZED_MOCK_TRANSCRIPTS[langCode] || LOCALIZED_MOCK_TRANSCRIPTS['en-US'];
    const randomTranscript = transcripts[Math.floor(Math.random() * transcripts.length)];
    setTranscript(randomTranscript);
  };

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      if (equalizerIntervalRef.current) clearInterval(equalizerIntervalRef.current);
    };
  }, []);

  // Preset media handler
  const handleSelectMockMedia = (type: 'pothole' | 'leak' | 'light') => {
    if (type === 'pothole') {
      setAttachedFile('https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=400');
      setAttachedFileType('image/jpeg');
    } else if (type === 'leak') {
      setAttachedFile('https://images.unsplash.com/photo-1542013936693-8848e5742383?auto=format&fit=crop&q=80&w=400');
      setAttachedFileType('image/jpeg');
    } else if (type === 'light') {
      setAttachedFile('https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&q=80&w=400');
      setAttachedFileType('image/jpeg');
    }
  };

  // Drag and Drop files
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setAttachedFile(reader.result as string);
      setAttachedFileType(file.type);
    };
    reader.readAsDataURL(file);
  };

  // Parse social complaint
  const parseSocialPost = () => {
    setIsParsingSocial(true);
    
    setTimeout(() => {
      setIsParsingSocial(false);
      const text = socialText.toLowerCase();
      let extractedCategory: typeof category = 'Public Infrastructure';
      let extractedTitle = 'Civic Alert';
      
      if (text.includes('pothole') || text.includes('road') || text.includes('crater') || text.includes('street')) {
        extractedCategory = 'Potholes';
        extractedTitle = 'Pothole Fissure Detected';
      } else if (text.includes('water') || text.includes('leak') || text.includes('pipe') || text.includes('gush') || text.includes('flood')) {
        extractedCategory = 'Water Leakage';
        extractedTitle = 'Water Gush Triage';
      } else if (text.includes('light') || text.includes('lamp') || text.includes('dark') || text.includes('unlit')) {
        extractedCategory = 'Damaged Streetlights';
        extractedTitle = 'Street Outage Lock';
      } else if (text.includes('waste') || text.includes('garbage') || text.includes('bin') || text.includes('trash') || text.includes('dump')) {
        extractedCategory = 'Waste Management';
        extractedTitle = 'Refuse Backlog Report';
      }
      
      setCategory(extractedCategory);
      setTitle(extractedTitle);
      setDescription(socialText);
      setActiveTab('form');
    }, 1500);
  };

  // Submit report form with mock AI logs
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsInvestigating(true);
    
    const logs = [
      "Initializing Autonomous AI Investigation Agent...",
      "Matching report with geographic utility coordinates...",
      "Analyzing visual data & metadata...",
      "Cross-referencing historical consensus databases...",
      "Generating deep structural hazard index...",
      "Filing autonomous civic report successfully!"
    ];

    let logIndex = 0;
    setAiLogMessage(logs[0]);

    const logInterval = setInterval(() => {
      logIndex++;
      if (logIndex < logs.length) {
        setAiLogMessage(logs[logIndex]);
      } else {
        clearInterval(logInterval);
        setIsInvestigating(false);
        
        // Define dynamic timeline recommendations
        let timeline: TimelineEvent[] = [
          { 
            status: 'reported' as IssueStatus, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
            title: 'Incident Created', 
            description: `Citizen filed report: ${title}` 
          },
          { 
            status: 'investigating' as IssueStatus, 
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
            title: 'Autonomous AI Dispatch', 
            description: 'Geo Intelligence Agent verified location index & mapped boundaries.' 
          }
        ];

        let aiImpactScore = 60;
        let aiPreventionInsight = "Awaiting full risk assessment.";
        let aiResolutionRecommendation = "Awaiting dispatch specs.";
        let authorityAssigned = "Public Works Department";

        if (category === 'Potholes') {
          aiImpactScore = 78;
          aiPreventionInsight = "Moisture expansion will multiply asphalt structural degradation significantly within 48 hours.";
          aiResolutionRecommendation = "Deploy tactical paving patch crew with heavy asphalt sealer within 12 hours.";
          authorityAssigned = "Department of Urban Paving";
        } else if (category === 'Water Leakage') {
          aiImpactScore = 74;
          aiPreventionInsight = "Continuous water runoff weakens road bed sub-soils, elevating long-term sinkhole probability.";
          aiResolutionRecommendation = "Mobilize sub-surface acoustic leak detection team and isolate main utility valve.";
          authorityAssigned = "Water Supply & Sewage Division";
        } else if (category === 'Damaged Streetlights') {
          aiImpactScore = 52;
          aiPreventionInsight = "Unlit corridors increase pedestrian crossing risk indexes by 140% during late-night intervals.";
          aiResolutionRecommendation = "Replace bulb with smart 80W LED node. Verify photo-sensor feedback control circuits.";
          authorityAssigned = "Municipal Lighting Division";
        } else if (category === 'Waste Management') {
          aiImpactScore = 65;
          aiPreventionInsight = "Overflowing waste will trigger rodent nesting vectors and localized soil toxicity in high-density areas.";
          aiResolutionRecommendation = "Deploy waste dispatch vehicle within 4 hours. Verify bin lid locks.";
          authorityAssigned = "Sanitation Board & Environmental Safety";
        } else if (category === 'Public Infrastructure') {
          aiImpactScore = 70;
          aiPreventionInsight = "A compromised barrier or structure will fail completely during secondary impact, resulting in high risk.";
          aiResolutionRecommendation = "Install modular steel crash barriers and anchor with high-tensile bolts.";
          authorityAssigned = "Public Works Department";
        }

        onAddIssue({
          title,
          category,
          description,
          lat,
          lng,
          imageUrl: attachedFile || undefined,
          aiSummary: `AI triage generated for ${category}: ${title}. High safety hazard index evaluated.`,
          aiImpactScore,
          aiPreventionInsight,
          aiResolutionRecommendation,
          authorityAssigned,
          timeline
        });

        // Reset fields
        setTitle('');
        setDescription('');
        setAttachedFile(null);
        setAttachedFileType(null);
        onClearCoords();
      }
    }, 800);
  };

  return (
    <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl flex flex-col h-[520px] relative overflow-hidden">
      {/* Title Header */}
      <div className="flex justify-between items-center mb-4 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
          <h3 className="font-display text-lg font-bold text-white">
            {t.fileReport || "Report Local Issue"}
          </h3>
        </div>

        {/* Form Selection Tabs */}
        <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-xl text-xs font-sans">
          <button
            id="tab-report-form"
            onClick={() => setActiveTab('form')}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition cursor-pointer ${
              activeTab === 'form' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            {rl.standard}
          </button>
          <button
            id="tab-report-voice"
            onClick={() => setActiveTab('voice')}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition cursor-pointer ${
              activeTab === 'voice' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5 animate-pulse text-blue-400" />
            {t.record || "Voice"}
          </button>
          <button
            id="tab-report-social"
            onClick={() => setActiveTab('social')}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 transition cursor-pointer ${
              activeTab === 'social' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Twitter className="w-3.5 h-3.5 text-sky-400" />
            {rl.socialParser}
          </button>
        </div>
      </div>

      {/* AI Investigation Overlay Log */}
      {isInvestigating && (
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-40 rounded-3xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
          <div className="relative w-16 h-16 mb-4">
            <span className="absolute inset-0 rounded-full bg-blue-500/10 border border-blue-500/20 animate-ping"></span>
            <div className="absolute inset-2 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
          </div>
          <h4 className="font-display font-bold text-white text-sm">{rl.aiLive}</h4>
          <p className="text-xs text-blue-400 font-mono font-bold mt-1 max-w-sm animate-pulse">
            {aiLogMessage}
          </p>
          <p className="text-[10px] text-slate-400 mt-4 max-w-xs italic font-sans leading-relaxed">
            {rl.aiSub}
          </p>
        </div>
      )}

      {/* Content Scroller */}
      <div className="flex-1 overflow-y-auto pr-1">
        
        {/* TAB 1: STANDARD FORM */}
        {activeTab === 'form' && (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3.5">
              {/* Category Selector */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">{t.categoryLabel || "Issue Category"}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs font-semibold glass-input rounded-xl px-3 py-2 text-slate-100 bg-slate-900"
                >
                  <option className="bg-slate-900 text-slate-100" value="Potholes">{t.potholes || "Potholes"}</option>
                  <option className="bg-slate-900 text-slate-100" value="Water Leakage">{t.waterLeakage || "Water Leakage"}</option>
                  <option className="bg-slate-900 text-slate-100" value="Damaged Streetlights">{t.streetlights || "Streetlights"}</option>
                  <option className="bg-slate-900 text-slate-100" value="Waste Management">{t.wasteManagement || "Waste Management"}</option>
                  <option className="bg-slate-900 text-slate-100" value="Public Infrastructure">{t.publicInfrastructure || "Infrastructure"}</option>
                </select>
              </div>

              {/* Title Field */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">{t.titleLabel || "Brief Title"}</label>
                <input
                  type="text"
                  required
                  placeholder={rl.placeholderTitle}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs glass-input rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            {/* Coordinates Fields */}
            <div className="grid grid-cols-2 gap-3.5 bg-white/5 border border-white/10 p-2.5 rounded-xl text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 font-sans">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="block text-[8px] font-mono text-slate-400 uppercase font-bold">{rl.latitude}</span>
                  <span className="font-semibold font-mono">{lat.toFixed(5)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center font-sans">
                <div>
                  <span className="block text-[8px] font-mono text-slate-400 uppercase font-bold">{rl.longitude}</span>
                  <span className="font-semibold font-mono">{lng.toFixed(5)}</span>
                </div>
                {prefilledCoords && (
                  <button 
                    type="button" 
                    onClick={onClearCoords}
                    className="text-[9px] text-rose-400 hover:text-rose-300 font-bold bg-rose-500/10 border border-rose-500/20 px-1.5 py-0.5 rounded cursor-pointer animate-pulse"
                  >
                    {rl.reset}
                  </button>
                )}
              </div>
            </div>

            {/* Description textarea */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">{t.descLabel || "Details & Description"}</label>
              <textarea
                required
                rows={3}
                placeholder={rl.placeholderDesc}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs glass-input rounded-xl px-3 py-2 text-slate-100 leading-relaxed resize-none"
              />
            </div>

            {/* Attachment Area */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">{t.mediaLabel || "Attach Photo or Video"}</label>
              
              {!attachedFile ? (
                <div 
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-white/5 transition-all flex flex-col items-center justify-center relative"
                >
                  <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                  <p className="text-[10px] text-slate-400 font-sans">{rl.dragDrop}</p>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  
                  {/* Preset quick attachments */}
                  <div className="flex gap-1.5 mt-3 pt-3 border-t border-white/10 w-full justify-center font-sans">
                    <span className="text-[9px] text-slate-500 mt-1">{rl.preload}</span>
                    <button 
                      type="button" 
                      onClick={() => handleSelectMockMedia('pothole')}
                      className="text-[8px] bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded text-blue-400 font-bold cursor-pointer"
                    >
                      {rl.potholePhoto}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleSelectMockMedia('leak')}
                      className="text-[8px] bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded text-blue-400 font-bold cursor-pointer"
                    >
                      {rl.waterLeakPhoto}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleSelectMockMedia('light')}
                      className="text-[8px] bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-0.5 rounded text-blue-400 font-bold cursor-pointer"
                    >
                      {rl.darkStreetlight}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 h-28 bg-black flex items-center justify-center">
                  <img src={attachedFile} alt="Attached asset" className="h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => {
                      setAttachedFile(null);
                      setAttachedFileType(null);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition cursor-pointer"
                    title="Remove File"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            <button
              id="btn-report-submit"
              type="submit"
              className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-sans font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102 transition"
            >
              <Send className="w-4 h-4" />
              {t.submitReport || "File Autonomous AI Report"} (+50 PTS)
            </button>
          </form>
        )}

        {/* TAB 2: VOICE REPORTING */}
        {activeTab === 'voice' && (
          <div className="h-full flex flex-col justify-center items-center py-6 text-center">
            <h4 className="font-display font-bold text-sm text-white mb-1">{rl.acousticSmart}</h4>
            <p className="text-xs text-slate-400 max-w-sm mb-6 font-sans">
              {t.voiceDesc || "Press record, dictate the issue, and watch the AI speech agent parse context, geo coordinates and details instantly!"}
            </p>

            {/* Recorder circle button */}
            <div className="relative mb-6">
              {isRecording && (
                <span className="absolute -inset-4 rounded-full bg-blue-500/10 border border-blue-500/20 animate-ping opacity-60"></span>
              )}
              <button
                id="btn-voice-record-toggle"
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white shadow-2xl transition duration-300 relative cursor-pointer ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isRecording ? (
                  <>
                    <StopCircle className="w-8 h-8" />
                    <span className="text-[9px] font-mono mt-1 font-bold">{voiceTimer}S</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-8 h-8" />
                    <span className="text-[9px] font-mono mt-1 font-bold">{t.record ? t.record.toUpperCase() : "RECORD"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Live animated equalizer bars */}
            <div className="flex items-end justify-center gap-1 h-10 w-full max-w-xs mb-6">
              {waveHeights.map((h, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 rounded-full transition-all duration-150 ${isRecording ? 'bg-blue-500' : 'bg-white/10'}`}
                  style={{ height: `${isRecording ? h : 4}px` }}
                ></div>
              ))}
            </div>

            {/* Transcript text box */}
            {transcript ? (
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left font-sans animate-in fade-in duration-300">
                <span className="text-[9px] font-mono font-bold text-blue-400 uppercase block mb-1">{rl.recognizedTranscript}</span>
                <p className="text-xs text-slate-200 leading-relaxed italic">"{transcript}"</p>
                <div className="mt-3 flex justify-end gap-2">
                  <button
                    id="btn-voice-retry"
                    onClick={() => setTranscript('')}
                    className="text-[9px] text-slate-300 hover:text-white font-bold bg-white/5 border border-white/10 px-2 py-1 rounded cursor-pointer"
                  >
                    {rl.recordAgain}
                  </button>
                  <button
                    id="btn-voice-use-transcript"
                    onClick={() => {
                      setDescription(transcript);
                      setTitle(category === 'Potholes' ? 'Pothole Alert via Voice' : category === 'Water Leakage' ? 'Water Leak Alert via Voice' : 'Civic Complaint via Voice');
                      setActiveTab('form');
                    }}
                    className="text-[9px] text-blue-400 hover:text-blue-300 font-bold bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded cursor-pointer"
                  >
                    {rl.refineInForm}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">
                {isRecording ? rl.listening : rl.noActive}
              </p>
            )}
          </div>
        )}

        {/* TAB 3: SOCIAL MEDIA PARSER */}
        {activeTab === 'social' && (
          <div className="space-y-4 py-2">
            <div>
              <h4 className="font-display font-bold text-sm text-white mb-1">{rl.socialFeedParser}</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {t.socialDesc || "Paste any tweet, forum post, or chat message about local distress. The neural listener extracts structured categories, geo-coordinate offsets, and details dynamically!"}
              </p>
            </div>

            <div className="space-y-3">
              <textarea
                rows={5}
                value={socialText}
                onChange={(e) => setSocialText(e.target.value)}
                placeholder="Paste civic complaints here. e.g.: 'Unbelievable, the water has been spraying out from the pipeline on 12th road for hours now, causing a massive river! Totally flooded! @CivicDepartment #help'"
                className="w-full text-xs glass-input rounded-2xl px-3.5 py-2.5 text-slate-100 leading-relaxed resize-none"
              />

              <div className="flex gap-1.5 overflow-x-auto py-1 font-sans">
                <span className="text-[9px] text-slate-500 shrink-0 mt-1">{rl.examples}</span>
                <button
                  type="button"
                  onClick={() => setSocialText("Just drove over a massive pothole on 5th Ave that nearly popped my tire. Completely ruined! Why do we pay taxes if our streets are falling apart? #paveit")}
                  className="text-[8px] bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-full text-slate-300 shrink-0 cursor-pointer"
                >
                  {rl.roadTweet}
                </button>
                <button
                  type="button"
                  onClick={() => setSocialText("All the streetlights are completely dead on Elm Street. Walked home in pitch blackness, felt incredibly unsafe. Fix the lamps please! #darkstreets")}
                  className="text-[8px] bg-white/5 hover:bg-white/10 border border-white/10 px-2.5 py-1 rounded-full text-slate-300 shrink-0 cursor-pointer"
                >
                  {rl.streetlightPost}
                </button>
              </div>

              <button
                id="btn-social-parse"
                onClick={parseSocialPost}
                disabled={isParsingSocial || !socialText.trim()}
                className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-sans font-bold text-xs shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 transition cursor-pointer shadow-blue-500/20"
              >
                {isParsingSocial ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {rl.parsing}
                  </>
                ) : (
                  <>
                    <Twitter className="w-4 h-4" />
                    {t.socialButton || "Auto-Generate Complaint Card"}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
