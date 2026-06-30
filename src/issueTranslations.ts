import { Issue } from './types';
import { getLocalizedStateName } from './stateTranslations';
import { getLocalizedCitizenName } from './emergencyTranslations';


export const DYNAMIC_CATEGORY_MAP: Record<string, Record<string, string>> = {
  'en-US': {
    'Potholes': 'Potholes',
    'Water Leakage': 'Water Leakage',
    'Damaged Streetlights': 'Damaged Streetlights',
    'Waste Management': 'Waste Management',
    'Public Infrastructure': 'Public Infrastructure'
  },
  'hi-IN': {
    'Potholes': 'सड़क के गड्ढे',
    'Water Leakage': 'पानी का रिसाव',
    'Damaged Streetlights': 'खराब स्ट्रीटलाइट्स',
    'Waste Management': 'कचरा प्रबंधन',
    'Public Infrastructure': 'सार्वजनिक बुनियादी ढांचा'
  },
  'bn-IN': {
    'Potholes': 'রাস্তার গর্ত',
    'Water Leakage': 'জলের অপচয় ও ফুটো',
    'Damaged Streetlights': 'নষ্ট স্ট্রিটলাইট',
    'Waste Management': 'বর্জ্য ব্যবস্থাপনা',
    'Public Infrastructure': 'পাবলিক পরিকাঠামো'
  },
  'gu-IN': {
    'Potholes': 'ખાડાઓ',
    'Water Leakage': 'પાણીનું લીકેજ',
    'Damaged Streetlights': 'ખરાબ સ્ટ્રીટલાઇટ્સ',
    'Waste Management': 'કચરો વ્યવસ્થાપન',
    'Public Infrastructure': 'જાહેર માળખું'
  },
  'kn-IN': {
    'Potholes': 'ರಸ್ತೆ ಗುಂಡಿಗಳು',
    'Water Leakage': 'ನೀರಿನ ಸೋರಿಕೆ',
    'Damaged Streetlights': 'ಹಾಳಾದ ಬೀದಿ ದೀಪಗಳು',
    'Waste Management': 'ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ',
    'Public Infrastructure': 'ಸಾರ್ವಜನಿಕ ಮೂಲಸೌಕರ್ಯ'
  },
  'ml-IN': {
    'Potholes': 'റോഡിലെ കുഴികൾ',
    'Water Leakage': 'ജല ചോർച്ച',
    'Damaged Streetlights': 'കേടായ തെരുവ് വിളക്കുകൾ',
    'Waste Management': 'മാലിന്യ സംസ്കരണം',
    'Public Infrastructure': 'പൊതു ഇൻഫ്രാസ്ട്രക്ചർ'
  },
  'mr-IN': {
    'Potholes': 'रस्त्यावरील खड्डे',
    'Water Leakage': 'पाण्याची गळती',
    'Damaged Streetlights': 'खराब स्ट्रीटलाईट्स',
    'Waste Management': 'कचरा व्यवस्थापन',
    'Public Infrastructure': 'सार्वजनिक पायाभूत सुविधा'
  },
  'ta-IN': {
    'Potholes': 'சாலை குழிகள்',
    'Water Leakage': 'நீர் கசிவு',
    'Damaged Streetlights': 'பழுதடைந்த தெருவிளக்குகள்',
    'Waste Management': 'கழிவு மேலாண்மை',
    'Public Infrastructure': 'பொது உள்கட்டமைப்பு'
  },
  'te-IN': {
    'Potholes': 'రోడ్డు గుంతలు',
    'Water Leakage': 'నీటి లీకేజీ',
    'Damaged Streetlights': 'పాడైన వీధి దీపాలు',
    'Waste Management': 'వ్యర్థాల నిర్వహణ',
    'Public Infrastructure': 'పౌర మౌలిక సదుపాయాలు'
  },
  'ur-IN': {
    'Potholes': 'سڑک کے گڑھے',
    'Water Leakage': 'پانی کا رساؤ',
    'Damaged Streetlights': 'خراب اسٹریٹ لائٹس',
    'Waste Management': 'کچرے کا انتظام',
    'Public Infrastructure': 'عوامی بنیادی ڈھانچہ'
  }
};

// Handcrafted localized values for the 5 core preseeded issues
const CORE_ISSUE_LOCALIZATIONS: Record<string, Record<string, Partial<Issue>>> = {
  'hi-IN': {
    'issue-1': {
      title: 'गंभीर फुटपाथ गड्ढा (क्रेटर)',
      description: 'पुल के तुरंत बाद बाईं ट्रैफिक लेन को अवरुद्ध करने वाला एक गहरा, टेढ़ा-मेढ़ा डामर धंसाव। वाहनों के लिए बड़ा खतरा।',
      aiSummary: 'महत्वपूर्ण सड़क दरार की पहचान। गहरी उप-सतह मिट्टी का कटाव पाया गया। उच्च सुरक्षा जोखिम सूचकांक आकलित।',
      aiPreventionInsight: 'अति आवश्यक। बारिश के बाद नमी फैलने से डामर की संरचनात्मक गिरावट 48 घंटों के भीतर 300% बढ़ जाएगी।',
      aiResolutionRecommendation: '12 घंटे के भीतर भारी डामर सीलर के साथ सामरिक मरम्मत दल तैनात करें। चमकती चेतावनी बीकन सेट करें।',
      authorityAssigned: 'शहरी सड़क निर्माण विभाग'
    },
    'issue-2': {
      title: 'दबावयुक्त कर्ब रिसाव',
      description: 'कंक्रीट कर्ब जोड़ से साफ पीने का पानी आक्रामक रूप से बाहर निकल रहा है, जिससे सार्वजनिक साइकिल पथ पर बाढ़ आ गई है।',
      aiSummary: 'साफ पानी वितरण पाइपलाइन की विफलता। द्रव वेग से प्रति मिनट 12 गैलन निरंतर पानी की हानि का संकेत। स्थानीय मार्ग जलमग्न।',
      aiPreventionInsight: 'कर्ब का लगातार पानी सड़क की उप-मिट्टी को कमजोर करता है, जिससे आसन्न लेन पर सिंकहोल की संभावना बढ़ जाती है।',
      aiResolutionRecommendation: 'उप-सतह ध्वनिक रिसाव पहचान दल को जुटाएं। मुख्य उपयोगिता वाल्व 4B को अलग करें और कर्ब को खोदें।',
      authorityAssigned: 'जल आपूर्ति एवं सीवरेज विभाग'
    },
    'issue-3': {
      title: 'बंद पड़ी सोडियम लाइट',
      description: 'स्ट्रीट लाइट पोल नंबर SL-402 पूरी तरह से बंद है। पूरा ब्लॉक बिल्कुल अंधेरा है, जिससे पैदल यात्रियों का पार करना असुरक्षित हो गया है।',
      aiSummary: 'सघन आवासीय क्षेत्र में सिंगल-लाइट आउटेज। स्थानीय निवासियों द्वारा कम दृश्य क्षमता की सूचना।',
      aiPreventionInsight: 'अंधेरे गलियारे देर रात के आवागमन के दौरान पैदल यात्रियों के सड़क पार करने के जोखिम सूचकांक को 140% तक बढ़ा देते हैं।',
      aiResolutionRecommendation: 'बल्ब को स्मार्ट 80W एलईडी नोड से बदलें। अगले रखरखाव चक्र पर फोटो-सेंसर फीडबैक नियंत्रण सर्किट सत्यापित करें।',
      authorityAssigned: 'नगर निगम प्रकाश व्यवस्था विभाग'
    },
    'issue-4': {
      title: 'अवैध औद्योगिक कचरा डंप',
      description: 'पार्क के बगल में सार्वजनिक घास की पट्टी पर रात भर में फेंके गए तीन बड़े रासायनिक बैरल। अत्यधिक जहरीली गंध।',
      aiSummary: 'पर्यावरण-संवेदनशील हरित क्षेत्र में खतरनाक रासायनिक निपटान। वाष्पशील यौगिक संकेत। जैव-सुरक्षा टीम की आवश्यकता।',
      aiPreventionInsight: 'उप-सतह रासायनिक अपवाह 24 घंटे के भीतर पार्क की खेल-मिट्टी और तूफान-नाली के बहाव को दूषित कर देगा।',
      aiResolutionRecommendation: 'नगर निगम हैज़मैट निपटान दस्ते को तुरंत रवाना करें। क्षेत्र के 20 मीटर के दायरे को सुरक्षित करें और पुलिस सुरक्षा समीक्षा का अनुरोध करें।',
      authorityAssigned: 'स्वच्छता बोर्ड और पर्यावरण सुरक्षा विभाग'
    },
    'issue-5': {
      title: 'क्षतिग्रस्त सार्वजनिक रेलिंग',
      description: 'व्यस्त पारगमन टर्मिनल मोड़ के साथ लगी स्टील सुरक्षा रेलिंग गंभीर रूप से मुड़ गई है और ढीली हो गई है। अवरोध जोखिम पैदा करती है।',
      aiSummary: 'संरचनात्मक रेल फ्रैक्चर। प्राथमिक उच्च-मात्रा वाले मोड़ पर रक्षात्मक सुरक्षा अवरोध कमजोर हुआ है।',
      aiPreventionInsight: 'एक क्षतिग्रस्त मोड़ अवरोध अगले प्रभाव के दौरान पूरी तरह से विफल हो जाएगा, जिससे यात्रियों के लिए उच्च जोखिम पैदा होगा।',
      aiResolutionRecommendation: 'क्षतिग्रस्त समर्थन खंभों को खोदें। मॉड्यूलर स्टील क्रैश रेल स्थापित करें और उच्च-तन्यता वाले बोल्ट के साथ सुरक्षित करें।',
      authorityAssigned: 'लोक निर्माण विभाग (PWD)'
    }
  },
  'bn-IN': {
    'issue-1': {
      title: 'মারাত্মক পিচ রাস্তার গর্ত',
      description: 'সেতুর ঠিক পরেই বাম দিকের ট্রাফিক লেন অবরুদ্ধকারী একটি গভীর, খসখসে ডামাল ধস। যানবাহনের জন্য বড় বিপদ।',
      aiSummary: 'গুরুত্বপূর্ণ সড়ক ফাটল চিহ্নিত। গভীর উপ-পৃষ্ঠ ক্ষয় ধরা পড়েছে। উচ্চ নিরাপত্তা ঝুঁকি সূচক গণনা করা হয়েছে।',
      aiPreventionInsight: 'জরুরি। বৃষ্টির পরবর্তী আর্দ্রতা সম্প্রসারণ ৪৮ ঘণ্টার মধ্যে ডামালের পরিকাঠামোগত ক্ষতি ৩০০% বৃদ্ধি করবে।',
      aiResolutionRecommendation: '১২ ঘণ্টার মধ্যে হেভি অ্যাসফল্ট সিলার সহ বিশেষ মেরামতি দল নিয়োগ করুন। ফ্ল্যাশিং অ্যালার্ট বীকন সেট করুন।',
      authorityAssigned: 'নগর পথ নির্মাণ বিভাগ'
    },
    'issue-2': {
      title: 'চাপযুক্ত কার্ব জলের স্রোত',
      description: 'কংক্রিট কার্ব সীমের মধ্য দিয়ে বিশুদ্ধ পানীয় জল প্রবলভাবে বুদবুদ আকারে বের হচ্ছে, যা পাবলিক বাইক পথ প্লাবিত করছে।',
      aiSummary: 'বিশুদ্ধ জল বিতরণ পাইপলাইন ব্যর্থতা। তরল গতিবেগ প্রতি মিনিটে ১২ গ্যালন জল অপচয় নির্দেশ করছে।',
      aiPreventionInsight: 'ক্রমাগত কার্ব জলের স্রোত রাস্তার উপ-মাটি দুর্বল করে, যা পার্শ্ববর্তী লেনে সিঙ্কহোলের সম্ভাবনা বাড়ায়।',
      aiResolutionRecommendation: 'অ্যাকোস্টিক লিক ডিটেকশন টিম পাঠান। প্রধান ইউটিলিটি ভালভ 4B বন্ধ করুন এবং কার্ব খুঁড়ে মেরামত করুন।',
      authorityAssigned: 'জল সরবরাহ ও পয়ঃনিষ্কাশন বিভাগ'
    },
    'issue-3': {
      title: 'অকেজো সোডিয়াম স্ট্রিটলাইট',
      description: 'স্ট্রিট লাইট পোল নম্বর SL-402 সম্পূর্ণ নিভে আছে। পুরো ব্লকটি ঘুটঘুটে অন্ধকার, যা পথচারীদের যাতায়াত অনিরাপদ করছে।',
      aiSummary: 'ঘন বসতিপূর্ণ আবাসিক এলাকায় একক লাইট বিভ্রাট। স্থানীয় বাসিন্দাদের দ্বারা দৃশ্যমানতা হ্রাসের অভিযোগ।',
      aiPreventionInsight: 'অন্ধকার করিডোর গভীর রাতের যাতায়াতের সময় পথচারীদের রাস্তা পারাপারের ঝুঁকি ১৪০% বাড়িয়ে দেয়।',
      aiResolutionRecommendation: 'বাল্বটি একটি স্মার্ট 80W এলইডি নোড দিয়ে প্রতিস্থাপন করুন। পরবর্তী রক্ষণাবেক্ষণে ফটো-সেন্সর সার্কিট পরীক্ষা করুন।',
      authorityAssigned: 'পৌর আলোকসজ্জা বিভাগ'
    },
    'issue-4': {
      title: 'অবৈধ শিল্প রাসায়নিক বর্জ্য',
      description: 'পার্কের পাশে পাবলিক ঘাসের জমিতে সারারাত ধরে ফেলে রাখা তিনটি বড় রাসায়নিক ব্যারেল। অত্যন্ত বিষাক্ত গন্ধ।',
      aiSummary: 'পরিবেশ-সংবেদনশীল সবুজ এলাকায় বিপজ্জনক রাসায়নিক বর্জন। বায়ো-প্রোটেকশন টিমের প্রয়োজন।',
      aiPreventionInsight: 'রাসায়নিকের উপ-পৃষ্ঠ ক্ষরণ ২৪ ঘণ্টার মধ্যে পার্কের খেলার মাটি এবং নর্দমার জলকে দূষিত করবে।',
      aiResolutionRecommendation: 'পৌরসভার হ্যাজম্যাট নিষ্কাশন দল পাঠান। ২০-মিটার পরিধি সুরক্ষিত করুন এবং পুলিশি তদন্তের অনুরোধ করুন।',
      authorityAssigned: 'স্যানিটেশন বোর্ড এবং পরিবেশগত সুরক্ষা'
    },
    'issue-5': {
      title: 'ক্ষতিগ্রস্ত পাবলিক গার্ডরেল',
      description: 'ব্যস্ত ট্রানজিট টার্মিনাল বাঁকের পাশে থাকা ইস্পাতের নিরাপত্তা গার্ডরেলটি মারাত্মকভাবে বেঁকে ও আলগা হয়ে গেছে।',
      aiSummary: 'কাঠামোগত গার্ডরেল ফাটল। প্রধান উচ্চ-চাপের বাঁকে প্রতিরক্ষামূলক নিরাপত্তা প্রাচীর আপস করা হয়েছে।',
      aiPreventionInsight: 'বাঁকের দুর্বল ব্যারিয়ার দ্বিতীয়বার সংঘর্ষে সম্পূর্ণ ব্যর্থ হতে পারে, যার ফলে চরম যাত্রীর ঝুঁকি রয়েছে।',
      aiResolutionRecommendation: 'দুর্বল খুঁটিগুলি খুঁড়ে তুলুন। মডুলার ইস্পাতের ক্র্যাশ রেল স্থাপন করুন এবং উচ্চ-ক্ষমতাসম্পন্ন বোল্ট দিয়ে আটকে দিন।',
      authorityAssigned: 'গণপূর্ত বিভাগ'
    }
  },
  'gu-IN': {
    'issue-1': {
      title: 'ગંભીર રસ્તાનો ખાડો',
      description: 'બ્રિજ પછી તરત જ ડાબી ટ્રાફિક લેનને બ્લોક કરતો એક ઊંડો, ખરબચડો ડામરનો ખાડો. વાહનો માટે મોટો ભય.',
      aiSummary: 'કટોકટીના રોડ ફ્રેક્ચરની ઓળખ. ઊંડા સબ-સરફેસ ધોવાણ મળી આવ્યા. ઉચ્ચ સુરક્ષા જોખમ સૂચકાંક.',
      aiPreventionInsight: 'અતિ તાકીદનું. વરસાદ પછી ભેજનું વિસ્તરણ ૪૮ કલાકની અંદર ડામરના બંધારણ બગાડને ૩૦૦% વધારશે.',
      aiResolutionRecommendation: '૧૨ કલાકની અંદર પેચ ક્રૂ તૈનાત કરો. ફ્લેશિંગ એલર્ટ બીકોન્સ સેટ કરો.',
      authorityAssigned: 'શહેરી માર્ગ બાંધકામ વિભાગ'
    },
    'issue-2': {
      title: 'દબાણયુક્ત કર્બ લીકેજ',
      description: 'કોંક્રિટ કર્બ સીમમાંથી પીવાનું ચોખ્ખું પાણી બહાર આવી રહ્યું છે, જેનાથી જાહેર બાઇક પાથ પર પૂર જેવી સ્થિતિ સર્જાઈ છે.',
      aiSummary: 'ચોખ્ખા પાણીના વિતરણ પાઇપલાઇનની નિષ્ફળતા. પ્રવાહી વેગ પ્રતિ મિનિટ ૧૨ ગેલન સતત નુકસાન સૂચવે છે.',
      aiPreventionInsight: 'સતત કર્બ પાણીનો પ્રવાહ રસ્તાની માટી નબળી પાડે છે, જેથી સિંકહોલની સંભાવના વધે છે.',
      aiResolutionRecommendation: 'એકોસ્ટિક લીક શોધ ટીમને બોલાવો. મુખ્ય વાલ્વ 4B ને અલગ કરો અને કર્બ ખોદવો.',
      authorityAssigned: 'પાણી પુરવઠા અને ગટર વ્યવસ્થા વિભાગ'
    },
    'issue-3': {
      title: 'બંધ પડેલી સોડિયમ સ્ટ્રીટલાઇટ',
      description: 'સ્ટ્રીટ લાઇટ પોલ નંબર SL-402 સંપૂર્ણપણે બંધ છે. આખો બ્લોક અંધારપટમાં છે, જેનાથી રાહદારીઓ અસુરક્ષિત બન્યા છે.',
      aiSummary: 'રહેણાંક ઝોનમાં સિંગલ-લાઇટ આઉટેજ. સ્થાનિક રહેવાસીઓ દ્વારા ઓછી દૃશ્ય ક્ષમતાની ફરિયાદ.',
      aiPreventionInsight: 'અંધારા કોરિડોર રાત્રિના સમયે રાહદારીઓ માટે અકસ્માતનું જોખમ ૧૪૦% વધારે છે.',
      aiResolutionRecommendation: 'બલ્બને સ્માર્ટ 80W એલઇડી નોડથી બદલો. ફોટો-સેન્સર સર્કિટ ચકાસો.',
      authorityAssigned: 'મ્યુનિસિપલ લાઇટિંગ વિભાગ'
    },
    'issue-4': {
      title: 'ગેરકાયદેસર ઔદ્યોગિક કચરો',
      description: 'પાર્ક બાજુની જાહેર ઘાસની પટ્ટી પર રાતોરાત ફેંકવામાં આવેલા ત્રણ મોટા કેમિકલ બેરલ. અત્યંત ઝેરી ગંધ.',
      aiSummary: 'પર્યાવરણ-સંવેદનશીલ ગ્રીન ઝોનમાં જોખમી રાસાયણિક નિકાલ. બાયો-પ્રોટેક્શન ટીમની જરૂર.',
      aiPreventionInsight: 'રાસાયણિક પ્રવાહ ૨૪ કલાકની અંદર બગીચાની માટી અને તોફાન-ડ્રેઇન વહેણને દૂષિત કરશે.',
      aiResolutionRecommendation: 'મ્યુનિસિપલ હેઝમેટ ડિસ્પોઝલ સ્કવોડને રવાના કરો. ૨0 મીટર પરિમિતિ સુરક્ષિત કરો.',
      authorityAssigned: 'સેનિટેશન બોર્ડ અને પર્યાવરણીય સુરક્ષા'
    },
    'issue-5': {
      title: 'ક્ષતિગ્રસ્ત જાહેર ગાર્ડરેલ',
      description: 'વ્યસ્ત ટ્રાન્ઝિટ ટર્મિનલ વળાંક પરની સ્ટીલ સેફ્ટી ગાર્ડરેલ તૂટી અને ઢીલી થઈ ગઈ છે. જોખમ ઊભું કરે છે.',
      aiSummary: 'બંધારણીય રેલ અકસ્માત. પ્રાથમિક વળાંક પર રક્ષણાત્મક અવરોધ જોખમમાં છે.',
      aiPreventionInsight: 'વળાંક પર નબળો અવરોધ સેકન્ડરી ટક્કર દરમિયાન સંપૂર્ણ નિષ્ફળ જશે, જેથી મુસાફરો માટે ભારે જોખમ ઊભું થશે.',
      aiResolutionRecommendation: 'ટેકો આપતા સ્તંભો ખોદી કાઢો. મોડ્યુલર સ્ટીલ ક્રેશ રેલ્સ સ્થાપિત કરો.',
      authorityAssigned: 'જાહેર બાંધકામ વિભાગ'
    }
  },
  'kn-IN': {
    'issue-1': {
      title: 'ತೀವ್ರವಾದ ರಸ್ತೆ ಗುಂಡಿ',
      description: 'ಸೇತುವೆಯ ನಂತರ ಎಡ ಟ್ರಾಫಿಕ್ ಲೇನ್ ಅನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಿರ್ಬಂಧಿಸುವ ಆಳವಾದ ರಸ್ತೆ ಗುಂಡಿ. ವಾಹನಗಳಿಗೆ ಭಾರಿ ಅಪಾಯ.',
      aiSummary: 'ರಸ್ತೆ ಬಿರುಕು ಪತ್ತೆ. ಆಳವಾದ ಉಪ-ಮೇಲ್ಮೈ ಸವೆತ ಕಂಡುಬಂದಿದೆ. ಉನ್ನತ ರಕ್ಷಣಾ ಅಪಾಯ ಸೂಚ್ಯಂಕ.',
      aiPreventionInsight: 'ತುರ್ತು. ಮಳೆಯ ನಂತರದ ತೇವಾಂಶ ಹರಡುವಿಕೆಯಿಂದ ಡಾಂಬರು ದಕ್ಕೆ 48 ಗಂಟೆಗಳ ಒಳಗೆ 300% ಹೆಚ್ಚಾಗುತ್ತದೆ.',
      aiResolutionRecommendation: '12 ಗಂಟೆಗಳ ಒಳಗೆ ಡಾಂಬರು ರಿಪೇರಿ ತಂಡವನ್ನು ನಿಯೋಜಿಸಿ. ಎಚ್ಚರಿಕೆ ದೀಪಗಳನ್ನು ಅಳವಡಿಸಿ.',
      authorityAssigned: 'ನಗರ ರಸ್ತೆ ಮತ್ತು ಸುಧಾರಣೆ ಇಲಾಖೆ'
    },
    'issue-2': {
      title: 'ಒತ್ತಡದ ಕಸದ ಪಕ್ಕದ ನೀರಿನ ಸೋರಿಕೆ',
      description: 'ಕಾಂಕ್ರೀಟ್ ಸೀಮ್ ಮೂಲಕ ಕುಡಿಯುವ ನೀರು ಭಾರಿ ಒತ್ತಡದಲ್ಲಿ ಚಿಮ್ಮುತ್ತಿದ್ದು, ಸಾರ್ವಜನಿಕ ಬೈಸಿಕಲ್ ಹಾದಿ ಜಲಾವೃತಗೊಂಡಿದೆ.',
      aiSummary: 'ನೀರು ವಿತರಣಾ ಪೈಪ್‌ಲೈನ್ ವೈಫಲ್ಯ. ಪ್ರತಿ ನಿಮಿಷಕ್ಕೆ 12 ಗ್ಯಾಲನ್ ನಿರಂತರ ನೀರು ನಷ್ಟ.',
      aiPreventionInsight: 'ನಿರಂತರ ನೀರಿನ ಹರಿವು ರಸ್ತೆ ಬದಿಯ ಮಣ್ಣನ್ನು ದುರ್ಬಲಗೊಳಿಸಿ, ಪಕ್ಕದ ಲೇನ್‌ನಲ್ಲಿ ಸಿಂಕ್‌ಹೋಲ್ ಉಂಟಾಗುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚಿಸುತ್ತದೆ.',
      aiResolutionRecommendation: 'ಅಕೋಸ್ಟಿಕ್ ಲೀಕ್ ಪತ್ತೆ ಹಚ್ಚುವ ತಂಡವನ್ನು ಕರೆಯಿಸಿ. ಮುಖ್ಯ ವಾಲ್ವ್ 4B ಪ್ರತ್ಯೇಕಿಸಿ ದುರಸ್ತಿ ಮಾಡಿ.',
      authorityAssigned: 'ಜಲಮಂಡಳಿ ಮತ್ತು ಒಳಚರಂಡಿ ಇಲಾಖೆ'
    },
    'issue-3': {
      title: 'ಕೆಟ್ಟುಹೋದ ಸೋಡಿಯಂ ಬೀದಿ ದೀಪ',
      description: 'ಬೀದಿ ದೀಪ ಕಂಬ ಸಂಖ್ಯೆ SL-402 ಸಂಪೂರ್ಣವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿಲ್ಲ. ಇಡೀ ಬ್ಲಾಕ್ ಕತ್ತಲೆಯಿಂದ ಕೂಡಿದ್ದು ಪಾದಚಾರಿಗಳಿಗೆ ಕಷ್ಟವಾಗಿದೆ.',
      aiSummary: 'ವಸತಿ ವಲಯದಲ್ಲಿ ಏಕ ದೀಪ ಸ್ಥಗಿತ. ಸ್ಥಳೀಯ ನಿವಾಸಿಗಳಿಂದ ಕಡಿಮೆ ದೃಷ್ಟಿ ಸಾಮರ್ಥ್ಯ ವರದಿ.',
      aiPreventionInsight: 'ಕತ್ತಲೆ ರಸ್ತೆಗಳು ಪಾದಚಾರಿಗಳು ದಾಟುವ ಅಪಾಯದ ಸೂಚ್ಯಂಕವನ್ನು 140% ಹೆಚ್ಚಿಸುತ್ತವೆ.',
      aiResolutionRecommendation: 'ಬಲ್ಬ್ ಅನ್ನು ಸ್ಮಾರ್ಟ್ 80W ಎಲ್ಇಡಿ ನೋಡ್‌ನೊಂದಿಗೆ ಬದಲಾಯಿಸಿ. ಫೋಟೋ ಸೆನ್ಸರ್ ಪರೀಕ್ಷಿಸಿ.',
      authorityAssigned: 'ನಗರಸಭೆ ಬೀದಿ ದೀಪ ವಿಭಾಗ'
    },
    'issue-4': {
      title: 'ಕಾನೂನುಬಾಹಿರ ಕೈಗಾರಿಕಾ ತ್ಯಾಜ್ಯ ವಿಲೇವಾರಿ',
      description: 'ಉದ್ಯಾನವನದ ಪಕ್ಕದ ಸಾರ್ವಜನಿಕ ಹುಲ್ಲುಹಾಸಿನ ಮೇಲೆ ರಾತ್ರೋರಾತ್ರಿ ಎಸೆಯಲಾದ ಮೂರು ದೊಡ್ಡ ರಾಸಾಯನಿಕ ಬ್ಯಾರೆಲ್‌ಗಳು. ವಿಷಕಾರಿ ವಾಸನೆ.',
      aiSummary: 'ಪರಿಸರ ಸೂಕ್ಷ್ಮ ವಲಯದಲ್ಲಿ ಅಪಾಯಕಾರಿ ರಾಸಾಯನಿಕ ವಿಲೇವಾರಿ. ಬಯೋ-ಪ್ರೊಟೆಕ್ಷನ್ ತಂಡದ ಅವಶ್ಯಕತೆ.',
      aiPreventionInsight: 'ರಾಸಾಯನಿಕಗಳು 24 ಗಂಟೆಗಳ ಒಳಗೆ ಉದ್ಯಾನದ ಆಟದ ಮಣ್ಣು ಮತ್ತು ಒಳಚರಂಡಿ ನೀರನ್ನು ಕಲುಷಿತಗೊಳಿಸುತ್ತವೆ.',
      aiResolutionRecommendation: 'ನಗರಸಭೆಯ ಹ್ಯಾಜ್ಮ್ಯಾಟ್ ತಂಡವನ್ನು ಕಳುಹಿಸಿ. 20 ಮೀಟರ್ ಪ್ರದೇಶವನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಿ.',
      authorityAssigned: 'ನೈರ್ಮಲ್ಯ ಮಂಡಳಿ ಮತ್ತು ಪರಿಸರ ಸುರಕ್ಷತೆ'
    },
    'issue-5': {
      title: 'ಹಾಳಾದ ಸಾರ್ವಜನಿಕ ಗಾರ್ಡ್‌ರೈಲ್',
      description: 'ನಿರಂತರ ಸಾರಿಗೆ ಟರ್ಮಿನಲ್ ತಿರುವಿನ ಪಕ್ಕದಲ್ಲಿರುವ ಉಕ್ಕಿನ ರಕ್ಷಣಾ ರೈಲಿಂಗ್ ಮುರಿದು ಸಡಿಲಗೊಂಡಿದೆ. ಅಪಘಾತದ ಭಯ ಹೆಚ್ಚಿಸಿದೆ.',
      aiSummary: 'ರಕ್ಷಣಾ ರೈಲ್ ಮುರಿತ. ಪ್ರಾಥಮಿಕ ತಿರುವಿನಲ್ಲಿ ರಕ್ಷಣಾತ್ಮಕ ತಡೆಗೋಡೆ ದುರ್ಬಲಗೊಂಡಿದೆ.',
      aiPreventionInsight: 'ದುರ್ಬಲಗೊಂಡ ತಡೆಗೋಡೆ ದ್ವಿತೀಯ ಘರ್ಷಣೆಯ ಸಮಯದಲ್ಲಿ ಸಂಪೂರ್ಣವಾಗಿ ವಿಫಲವಾಗಬಹುದು, ಪ್ರಯಾಣಿಕರಿಗೆ ಭಾರಿ ಅಪಾಯ ಉಂಟುಮಾಡಬಹುದು.',
      aiResolutionRecommendation: 'ದುರ್ಬಲಗೊಂಡ ಕಂಬಗಳನ್ನು ಅಗೆದು ತೆಗೆಯಿರಿ. ಮಾಡ್ಯುಲರ್ ಸ್ಟೀಲ್ ಕ್ರಾಶ್ ರೈಲ್ ಅಳವಡಿಸಿ.',
      authorityAssigned: 'ಸಾರ್ವಜನಿಕ ಲೋಕೋಪಯೋಗಿ ಇಲಾಖೆ (PWD)'
    }
  },
  'ml-IN': {
    'issue-1': {
      title: 'ഗുരുതരമായ റോഡ് കുഴി (ക്രാറ്റർ)',
      description: 'പാലത്തിന് തൊട്ടുപിന്നാലെ ഇടത് ട്രാഫിക് ലെയിൻ തടസ്സപ്പെടുത്തുന്ന ആഴത്തിലുള്ള റോഡ് തകർച്ച. വാഹനങ്ങൾക്ക് വലിയ അപകടം.',
      aiSummary: 'ഗുരുതരമായ റോഡ് തകരാർ. ഉപരിതലത്തിന് താഴെ മണ്ണൊലിപ്പ് കണ്ടെത്തി. ഉയർന്ന അപകടസാധ്യത.',
      aiPreventionInsight: 'അടിയന്തിരം. മഴയ്ക്ക് ശേഷം ഈർപ്പം പടരുന്നത് 48 മണിക്കൂറിനുള്ളിൽ ടാറിന്റെ തകർച്ച 300% വർദ്ധിപ്പിക്കും.',
      aiResolutionRecommendation: '12 മണിക്കൂറിനുള്ളിൽ റോഡ് പരുക്കൻ അറ്റകുറ്റപ്പണി സംഘത്തെ വിന്യസിക്കുക. മിന്നുന്ന മുന്നറിയിപ്പ് വിളക്കുകൾ സ്ഥാപിക്കുക.',
      authorityAssigned: 'അർബൻ റോഡ് വിഭാഗം'
    },
    'issue-2': {
      title: 'സമ്മർദ്ദമുള്ള കurb് ചോർച്ച',
      description: 'കോൺക്രീറ്റ് അരികിൽ നിന്ന് കുടിവെള്ളം ശക്തമായി പുറത്തേക്ക് വരുന്നു, ഇത് പൊതു ബൈക്ക് പാതയിൽ വെള്ളപ്പൊക്കമുണ്ടാക്കുന്നു.',
      aiSummary: 'ശുദ്ധജല വിതരണ പൈപ്പ്ലൈൻ പരാജയം. മിനിറ്റിൽ 12 ഗാലൻ വെള്ളം നഷ്ടപ്പെടുന്നു.',
      aiPreventionInsight: 'തുടർച്ചയായ ജലപ്രവാഹം റോഡിനടിയിലെ മണ്ണ് ദുർബലമാക്കുന്നു, ഇത് തൊട്ടടുത്ത വരിയിൽ വൻ കുഴികൾക്ക് കാരണമാകാം.',
      aiResolutionRecommendation: 'അക്കോസ്റ്റിക് ചോർച്ച കണ്ടെത്തൽ സംഘത്തെ വിളിക്കുക. പ്രധാന വാൽവ് 4B വേർതിരിച്ച് അറ്റകുറ്റപ്പണി നടത്തുക.',
      authorityAssigned: 'ജല അതോറിറ്റി'
    },
    'issue-3': {
      title: 'പ്രവർത്തിക്കാത്ത സോഡിയം തെരുവ് വിളക്ക്',
      description: 'തെരുവ് വിളക്ക് പോസ്റ്റ് നമ്പർ SL-402 പൂർണ്ണമായും അണഞ്ഞിരിക്കുന്നു. ഈ ഭാഗം പൂർണ്ണമായും ഇരുട്ടിലാണ്, ഇത് കാൽനടയാത്രക്കാരെ അപകടത്തിലാക്കുന്നു.',
      aiSummary: 'താമസ മേഖലയിൽ ഒരു തെരുവ് വിളക്ക് അണഞ്ഞു. ദൂരക്കാഴ്ച കുറവാണെന്ന് റസിഡന്റ്സ് റിപ്പോർട്ട് ചെയ്യുന്നു.',
      aiPreventionInsight: 'ഇരുണ്ട തെരുവ് രാത്രികാലങ്ങളിൽ കാൽനടയാത്രക്കാരുടെ അപകട സാധ്യത 140% വർദ്ധിപ്പിക്കുന്നു.',
      aiResolutionRecommendation: 'ബൾബ് സ്മാർട്ട് 80W എൽഇഡി നോഡ് ഉപയോഗിച്ച് മാറ്റുക. ഫോട്ടോ സെൻസർ സർക്യൂട്ട് പരിശോധിക്കുക.',
      authorityAssigned: 'മുനിസിപ്പൽ ലൈറ്റിംഗ് വിഭാഗം'
    },
    'issue-4': {
      title: 'നിയമവിരുദ്ധ വ്യവസായ മാലിന്യ നിക്ഷേപം',
      description: 'പാർക്കിന് തൊട്ടടുത്തുള്ള പുൽത്തകിടിയിൽ രാത്രിയിൽ തള്ളിയ മൂന്ന് വലിയ കെമിക്കൽ ബാരലുകൾ. അതീവ വിഷലിപ്തമായ മണം.',
      aiSummary: 'പരിസ്ഥിതി മലിനീകരണം. രാസവസ്തുക്കളുടെ അടിയന്തിര നീക്കം ആവശ്യമാണ്. ബയോ-പ്രൊട്ടക്ഷൻ ടീം വേണം.',
      aiPreventionInsight: 'രാസവസ്തുക്കൾ 24 മണിക്കൂറിനുള്ളിൽ പാർക്കിലെ മണ്ണും സമീപത്തെ കനാലുകളും മലിനമാക്കും.',
      aiResolutionRecommendation: 'മുനിസിപ്പൽ ഹസ്മാറ്റ് ടീമിനെ അയക്കുക. 20 മീറ്റർ ചുറ്റളവ് സുരക്ഷിതമാക്കുക.',
      authorityAssigned: 'മലിനീകരണ നിയന്ത്രണ ബോർഡ്'
    },
    'issue-5': {
      title: 'കേടായ പൊതു ഗാർഡ്‌റെയിൽ',
      description: 'തിരക്കേറിയ ട്രാൻസിറ്റ് ടെർമിനൽ വളവിലെ സ്റ്റീൽ സുരക്ഷാ റെയിൽവേ വളഞ്ഞുപോയിരിക്കുന്നു. അപകട സാധ്യത കൂട്ടുന്നു.',
      aiSummary: 'സുരക്ഷാ ഗാർഡ് റെയിൽ തകർച്ച. പ്രധാന വളവിലെ സുരക്ഷാ തടസ്സം ദുർബലമായിരിക്കുന്നു.',
      aiPreventionInsight: 'വളവിലെ ദുർബലമായ സുരക്ഷാ റെയിൽ അടുത്തൊരു വാഹനം തട്ടുമ്പോൾ പൂർണ്ണമായും തകരും. യാത്രക്കാർക്ക് വലിയ ഭീഷണി.',
      aiResolutionRecommendation: 'തകർന്ന തൂണുകൾ മാറ്റുക. മോഡുലാർ സ്റ്റീൽ റെയിലുകൾ സ്ഥാപിക്കുക.',
      authorityAssigned: 'പൊതുമരാമത്ത് വകുപ്പ് (PWD)'
    }
  },
  'mr-IN': {
    'issue-1': {
      title: 'गंभीर रस्त्यावरील खड्डा (क्रेटर)',
      description: 'पुलाच्या लगेचच नंतर डावी वाहतूक लेन अडवणारा एक खोल, खडबडीत डांबरी खड्डा. वाहनांसाठी मोठा धोका.',
      aiSummary: 'महत्त्वपूर्ण रस्ता क्रॅकची ओळख. खोल उप-पृष्ठभाग मातीची धूप आढळली. उच्च सुरक्षा जोखीम निर्देशांक आकलित.',
      aiPreventionInsight: 'अति आवश्यक. पाऊस पडल्यानंतर ओलावा पसरल्याने डांबराचे संरचनात्मक नुकसान ४८ तासांच्या आत ३००% वाढेल.',
      aiResolutionRecommendation: '१२ तासांच्या आत जड डांबर सीलरसह सामरिक दुरुस्ती पथक तैनात करा. चमकणारे चेतावणी दिवे लावा.',
      authorityAssigned: 'शहरी रस्ते बांधकाम विभाग'
    },
    'issue-2': {
      title: 'दाबाखालील पाण्याचा निचरा गळती',
      description: 'काँक्रीट कर्न जोडातून स्वच्छ पिण्याचे पाणी वेगाने बाहेर पडत आहे, ज्यामुळे सार्वजनिक सायकल ट्रॅकवर पाणी साचले आहे.',
      aiSummary: 'स्वच्छ पाणी वितरण पाईपलाईन अपयशी. द्रव वेगाने दर मिनिटाला १२ गॅलन सतत पाणी वाया जात आहे.',
      aiPreventionInsight: 'कडांमधून सतत वाहणारे पाणी रस्त्याखालील माती कमकुवत करते, ज्यामुळे लगतच्या लेनवर सिंकहोलची शक्यता वाढते.',
      aiResolutionRecommendation: 'उप-पृष्ठभाग ध्वनिक गळती शोध पथकाला बोलवा. मुख्य व्हॉल्व्ह ४B बंद करा आणि कडा खोडून दुरुस्त करा.',
      authorityAssigned: 'जल पुरवाठा आणि सांडपाणी विभाग'
    },
    'issue-3': {
      title: 'बंद पडलेली सोडियम स्ट्रीट लाईट',
      description: 'स्ट्रीट लाईट पोल क्रमांक SL-402 पूर्णपणे बंद आहे. संपूर्ण ब्लॉक अंधारात आहे, ज्यामुळे पादचाऱ्यांना रस्ता ओलांडणे सुरक्षित झाले आहे.',
      aiSummary: 'दाट निवासी भागात एकेरी लाईट बंद. स्थानिक रहिवाशांकडून कमी दृश्यमानतेची तक्रार.',
      aiPreventionInsight: 'अंधारे रस्ते रात्रीच्या वेळी पादचाऱ्यांच्या अपघाताचा धोका १४०% वाढतो.',
      aiResolutionRecommendation: 'बल्ब बदलून स्मार्ट 80W एलईडी बल्ब लावा. फोटो सेन्सर सर्किट तपासा.',
      authorityAssigned: 'महानगरपालिका विद्युत विभाग'
    },
    'issue-4': {
      title: 'बेकायदेशीर औद्योगिक रासायनिक कचरा',
      description: 'पार्कच्या शेजारील गवताळ भागात रात्रीच्या वेळी टाकलेले तीन मोठे रासायनिक बॅरल्स. अत्यंत विषारी वास.',
      aiSummary: 'पर्यावरण-संवेदनशील भागात विषारी रासायनिक कचरा फेकला गेला. बायो-प्रोटेक्शन पथकाची आवश्यकता.',
      aiPreventionInsight: 'हे रसायने २४ तासांत उद्यानातील माती आणि पावसाचे पाणी प्रदूषित करू शकतात.',
      aiResolutionRecommendation: 'तातडीने मनपाचे धोकादायक कचरा विल्हेवाट पथक पाठवा. २० मीटर परिसर सुरक्षित करा.',
      authorityAssigned: 'स्वच्छता मंडळ आणि पर्यावरण सुरक्षा'
    },
    'issue-5': {
      title: 'खराब झालेली सार्वजनिक रेलिंग',
      description: 'वाहतूक टर्मिनलच्या वळणावर असलेली लोखंडी सुरक्षा रेलिंग वाकली असून सैल झाली आहे. अपघाताचा धोका आहे.',
      aiSummary: 'सुरक्षा कठडा तुटला. वळणावर सुरक्षा भिंत कमकुवत झाली आहे.',
      aiPreventionInsight: 'कमकुवत झालेला कठडा दुसऱ्या धडकेत पूर्णपणे तुटू शकतो, प्रवाशांसाठी हा मोठा धोका आहे.',
      aiResolutionRecommendation: 'कमकुवत खांब काढून घ्या. नवीन मजबूत स्टील कठडे बसवून घ्या.',
      authorityAssigned: 'सार्वजनिक बांधकाम विभाग (PWD)'
    }
  },
  'ta-IN': {
    'issue-1': {
      title: 'கடுமையான சாலை பள்ளம் (கிரேட்டர்)',
      description: 'பாலத்திற்கு உடனடியாகப் பின்னால் இடதுபுற போக்குவரத்தை முழுமையாகத் தடுக்கும் ஒரு ஆழமான, கரடுமுரடான பள்ளம். வாகனங்களுக்கு பெரும் ஆபத்து.',
      aiSummary: 'முக்கியமான சாலை விரிசல் கண்டறியப்பட்டுள்ளது. ஆழமான மண் அரிப்பு உள்ளது. அதிக பாதுகாப்பு ஆபத்து குறியீடு.',
      aiPreventionInsight: 'மிகவும் அவசரம். மழையின் ஈரப்பதத்தால் சாலையின் கட்டமைப்பு சீர்குலைவு 48 மணி நேரத்திற்குள் 300% அதிகரிக்கும்.',
      aiResolutionRecommendation: '12 மணி நேரத்திற்குள் அவசர சாலை பழுதுபார்க்கும் குழுவை நியமிக்கவும். எச்சரிக்கை விளக்குகளை வைக்கவும்.',
      authorityAssigned: 'நகர சாலைகள் மேம்பாட்டு துறை'
    },
    'issue-2': {
      title: 'அழுத்தப்பட்ட குழாய் நீர் கசிவு',
      description: 'சிமெண்ட் நடைபாதையின் ஓரத்திலிருந்து சுத்தமான குடிநீர் பெருக்கெடுத்து ஓடுகிறது, இதனால் சைக்கிள் பாதை நீரில் மூழ்கியுள்ளது.',
      aiSummary: 'சுத்தமான குடிநீர் விநியோக குழாய் உடைப்பு. நிமிடத்திற்கு 12 கேலன் நீர் வீணாகிறது.',
      aiPreventionInsight: 'தொடர்ச்சியான நீர் ஓட்டம் சாலையின் அடிப்பகுதியை பலவீனப்படுத்துகிறது, இதனால் அருகில் பெரிய பள்ளம் உருவாகலாம்.',
      aiResolutionRecommendation: 'நீர் கசிவு கண்டறியும் குழுவை அழைக்கவும். முக்கிய வால்வு 4B ஐ மூடி பழுதுபார்க்கவும்.',
      authorityAssigned: 'குடிநீர் வழங்கல் மற்றும் கழிவுநீரகற்று வாரியம்'
    },
    'issue-3': {
      title: 'பழுதடைந்த சோடியம் தெருவிளக்கு',
      description: 'தெருவிளக்கு கம்பம் எண் SL-402 முழுமையாக எரியவில்லை. அந்தப் பகுதி முழுவதும் இருட்டாக உள்ளதால் மக்கள் செல்வது பாதுகாப்பற்றதாக உள்ளது.',
      aiSummary: 'குடியிருப்பு பகுதியில் ஒற்றை விளக்கு பழுது. குறைந்த வெளிச்சம் உள்ளதாக பொதுமக்கள் புகார்.',
      aiPreventionInsight: 'இருண்ட பாதைகள் இரவு நேரங்களில் பொதுமக்கள் கடக்கும்போது விபத்து ஆபத்தை 140% அதிகரிக்கின்றன.',
      aiResolutionRecommendation: 'விளக்கை மாற்றி புதிய 80W எல்இடி விளக்கை வைக்கவும். சென்சாரை பரிசோதிக்கவும்.',
      authorityAssigned: 'மாநகராட்சி மின்சார துறை'
    },
    'issue-4': {
      title: 'சட்டவிரோத தொழிற்சாலை கழிவு கொட்டுதல்',
      description: 'பூங்காவின் அருகில் உள்ள புல்வெளியில் இரவோடு இரவாக கொட்டப்பட்ட மூன்று பெரிய இரசாயன பேரல்கள். நச்சுத்தன்மை வாய்ந்த வாசனை.',
      aiSummary: 'சுற்றுச்சூழல் பாதுகாப்பு பகுதிக்குள் நச்சு இரசாயனம் கொட்டப்பட்டுள்ளது. அவசர பாதுகாப்பு தேவை.',
      aiPreventionInsight: 'இரசாயன கழிவுகள் 24 மணி நேரத்திற்குள் பூங்காவின் மண்ணையும் மழைநீர் வடிகாலையும் நச்சுத்தன்மையாக்கும்.',
      aiResolutionRecommendation: 'மாநகராட்சி ஆபத்தான கழிவு மேலாண்மை குழுவை அனுப்பவும். 20 மீட்டர் பகுதியை சுற்றிலும் அடைக்கவும்.',
      authorityAssigned: 'மாநகராட்சி சுகாதாரத் துறை மற்றும் சுற்றுச்சூழல் பாதுகாப்பு'
    },
    'issue-5': {
      title: 'பழுதடைந்த பொது பாதுகாப்பு கம்பி',
      description: 'போக்குவரத்து முனையத்தின் வளைவில் உள்ள இரும்பு பாதுகாப்பு வேலி கடுமையாக வளைந்து, தளர்வாக உள்ளது. விபத்து ஆபத்து உள்ளது.',
      aiSummary: 'பாதுகாப்பு கம்பி உடைப்பு. வளைவில் உள்ள பாதுகாப்பு பலவீனம் அடைந்துள்ளது.',
      aiPreventionInsight: 'வளைவில் உள்ள பலவீனமான பாதுகாப்பு வேலி அடுத்த முறை வாகனம் மோதும்போது முழுமையாக உடைந்து பெரும் ஆபத்தை ஏற்படுத்தும்.',
      aiResolutionRecommendation: 'வளைந்த கம்பிகளை அகற்றவும். புதிய வலுவான பாதுகாப்பு வேலியை அமைக்கவும்.',
      authorityAssigned: 'மாநில நெடுஞ்சாலை மற்றும் பொதுப்பணித்துறை (PWD)'
    }
  },
  'te-IN': {
    'issue-1': {
      title: 'తీవ్రమైన రోడ్డు గుంత (క్రేటర్)',
      description: 'వంతెన దాటిన వెంటనే ఎడమ ట్రాఫిక్ లేన్‌ను అడ్డుకుంటున్న లోతైన, ప్రమాదకరమైన గుంత. వాహనదారులకు పెద్ద ప్రమాదం.',
      aiSummary: 'కీలక రోడ్డు దెబ్బతింది. లోతైన భూమి లోపలి మట్టి కొట్టుకుపోయింది. అధిక భద్రతా ప్రమాద సూచిక.',
      aiPreventionInsight: 'అత్యవసరం. వర్షం తర్వాత తేమ వల్ల రోడ్డు మరింత దెబ్బతిని 48 గంటల్లో ప్రమాదం 300% పెరుగుతుంది.',
      aiResolutionRecommendation: '12 గంటల్లోగా ప్రత్యేక మరమ్మతు బృందాన్ని పంపండి. ప్రమాద హెచ్చరిక బోర్డులను ఏర్పాటు చేయండి.',
      authorityAssigned: 'నగర రహదారుల అభివృద్ధి శాఖ'
    },
    'issue-2': {
      title: 'ఒత్తిడితో కూడిన కాలువ లీకేజీ',
      description: 'కాంక్రీట్ అంచు నుండి త్రాగునీరు వేగంగా పైకి చిమ్ముతోంది, దీనివల్ల సైకిల్ ట్రాక్ జలమయమైంది.',
      aiSummary: 'శుద్ధజల సరఫరా పైప్‌లైన్ వైఫల్యం. నిమిషానికి 12 గ్యాలన్ల నీరు వృధా అవుతోంది.',
      aiPreventionInsight: 'నిరంతర నీటి ప్రవాహం వల్ల రోడ్డు కింద మట్టి లూజ్ అయి పక్కనే పెద్ద సింక్‌హోల్ ఏర్పడే ప్రమాదం ఉంది.',
      aiResolutionRecommendation: 'లీకేజీ గుర్తింపు బృందాన్ని పిలిపించండి. మెయిన్ వాల్వ్ 4Bని ఆఫ్ చేసి రిపేర్ చేయండి.',
      authorityAssigned: 'వాటర్ సప్లై & మురుగునీటి బోర్డు'
    },
    'issue-3': {
      title: 'పనిచేయని సోడియం వీధి దీపం',
      description: 'వీధి దీపం పోల్ నంబర్ SL-402 పూర్తిగా ఆరిపోయింది. ఇదంతా చీకటిగా ఉండటం వల్ల ప్రజలు నడవడానికి భయపడుతున్నారు.',
      aiSummary: 'నివాస ప్రాంతంలో సింగిల్ లైట్ ఆఫ్ అయింది. స్థానికుల నుంచి తక్కువ వెలుతురు సమస్య నివేదిక.',
      aiPreventionInsight: 'చీకటిగా ఉండే మార్గాలు రాత్రి వేళల్లో రోడ్డు దాటే పౌరుల ప్రమాద శాతాన్ని 140% పెంచుతాయి.',
      aiResolutionRecommendation: 'బల్బును స్మార్ట్ 80W ఎల్‌ఈడీ నోడ్‌తో మార్చండి. ఫోటో సెన్సార్‌ను తనిఖీ చేయండి.',
      authorityAssigned: 'మునిసిపల్ లైటింగ్ విభాగం'
    },
    'issue-4': {
      title: 'అక్రమ పారిశ్రామిక రసాయన వ్యర్థాలు',
      description: 'పార్కు పక్కన బహిరంగ స్థలంలో రాత్రికి రాత్రే పడేసిన మూడు పెద్ద రసాయన డ్రమ్ములు. తీవ్రమైన విషపూరిత వాసన.',
      aiSummary: 'పర్యావરણ రక్షిత ప్రాంతంలో హానికర రసాయనాల పారబోత. బయో-ప్రొటెక్షన్ టీమ్ అవసరం.',
      aiPreventionInsight: 'రసాయన ద్రవాలు 24 గంటల్లో పార్కు నేలను, వర్షపు నీటి కాలువలను కలుషితం చేస్తాయి.',
      aiResolutionRecommendation: 'మున్సిపల్ హాజ్మ్యాట్ బృందాన్ని పంపండి. 20 మీటర్ల పరిధిని నిరోధించండి.',
      authorityAssigned: 'శానిటేషన్ బోర్డు & పర్యావరణ పరిరక్షణ విభాగం'
    },
    'issue-5': {
      title: 'పాడైన ప్రభుత్వ గార్డ్‌రైల్',
      description: 'రద్దీగా ఉండే రవాణా టెర్మినల్ వంపు వద్ద ఉక్కు రక్షణ రైలింగ్ పూర్తిగా వంగిపోయి ఊడిపోయింది. ప్రమాద భయం కలిగిస్తోంది.',
      aiSummary: 'రక్షణ రైలింగ్ దెబ్బతింది. కీలకమైన మలుపు వద్ద రక్షణ కవచం బలహీనపడింది.',
      aiPreventionInsight: 'బలహీనపడిన రైలింగ్ తదుపరి వాహనం ఢీకొట్టినప్పుడు పూర్తిగా విరిగిపోయి ప్రయాణికులకు తీవ్ర నష్టం కలిగిస్తుంది.',
      aiResolutionRecommendation: 'వంగిన కడ్డీలను తొలగించండి. కొత్త ఉక్కు రక్షణ రైలింగ్‌ను ఏర్పాటు చేయండి.',
      authorityAssigned: 'ప్రభుత్వ రోడ్డు భవనాల శాఖ (PWD)'
    }
  },
  'ur-IN': {
    'issue-1': {
      title: 'شدید سڑک کا گڑھا (کریٹر)',
      description: 'پل کے فوراً بعد بائیں ٹریفک لین کو بلاک کرنے والا ایک گہرا، ٹیڑھا میڑھا گڑھا۔ گاڑیوں کے لیے بڑا خطرہ۔',
      aiSummary: 'اہم سڑک کے فریکچر کی نشاندہی۔ سڑک کے نیچے مٹی کا کٹاؤ پایا گیا۔ خطرے کا انڈیکس زیادہ ہے۔',
      aiPreventionInsight: 'انتہائی ضروری۔ بارش کے بعد نمی پھیلنے سے سڑک کی خرابی 48 گھنٹوں کے اندر 300 فیصد بڑھ جائے گی۔',
      aiResolutionRecommendation: '12 گھنٹوں کے اندر اندر سڑک کی مرمت کرنے والا عملہ روانہ کریں۔ چمکنے والے لیمپ لگائیں۔',
      authorityAssigned: 'محکمہ سڑک و تعمیرات'
    },
    'issue-2': {
      title: 'پریشرائزڈ ڈرینیج لیکیج',
      description: 'کنکریٹ کے کنارے سے پینے کا صاف پانی تیزی سے باہر نکل رہا ہے، جس کی وجہ سے بائیک ٹریک پر پانی جمع ہو گیا ہے۔',
      aiSummary: 'صاف پانی کی سپلائی پائپ لائن میں خرابی۔ ہر منٹ میں 12 گیلن پانی کا مسلسل ضیاع۔',
      aiPreventionInsight: 'مسلسل بہنے والا پانی سڑک کے نیچے کی مٹی کو کمزور کرتا ہے، جس سے سڑک دھنسنے کے امکانات بڑھ جاتے ہیں۔',
      aiResolutionRecommendation: 'لیکیج تلاش کرنے والی ٹیم کو بلائیں۔ مین والو 4B کو بند کر کے مرمت کریں۔',
      authorityAssigned: 'محکمہ واٹر سپلائی و سیوریج'
    },
    'issue-3': {
      title: 'بند پڑی سوڈیم اسٹریٹ لائٹ',
      description: 'اسٹریٹ لائٹ پول نمبر SL-402 مکمل طور پر بند ہے۔ پورا بلاک اندھیرے میں ہے، پیدل چلنے والوں کے لیے راستہ غیر محفوظ ہو گیا ہے۔',
      aiSummary: 'رہائشی علاقے میں اکیلی لائٹ خراب۔ کم روشنی کے بارے میں شہریوں کی شکایت۔',
      aiPreventionInsight: 'تاریک راستے رات کے وقت پیدل چلنے والوں کے لیے حادثات کے خطرے کو 140 فیصد تک بڑھا دیتے ہیں۔',
      aiResolutionRecommendation: 'بلب بدل کر اسمارٹ 80W ایل ای ڈی لگائیں۔ فوٹو سینسر سرکٹ چیک کریں۔',
      authorityAssigned: 'بلدیہ الیکٹرک ڈیپارٹمنٹ'
    },
    'issue-4': {
      title: 'غیر قانونی صنعتی کیمیائی کچرا',
      description: 'پارک کے پاس گھاس کے میدان پر راتوں رات پھینکے گئے تین بڑے کیمیائی بیرل۔ انتہائی زہریلی بو۔',
      aiSummary: 'ماحول دوست علاقے میں خطرناک کیمیکل پھینکنا۔ بائیو پروٹیکشن عملے کی ضرورت ہے۔',
      aiPreventionInsight: 'یہ کیمیکل 24 گھنٹوں کے اندر پارک کی مٹی اور بارش کے پانی کو زہریلا کر دیں گے۔',
      aiResolutionRecommendation: 'میونسپل کارپوریشن کی ٹیم روانہ کریں۔ 20 میٹر کے علاقے کو گھیرے میں لے لیں۔',
      authorityAssigned: 'محکمہ صفائی و ماحولیاتی تحفظ'
    },
    'issue-5': {
      title: 'خراب شدہ عوامی گارڈ ریل',
      description: 'ٹرانزٹ ٹرمینل کے موڑ پر لگی لوہے کی گارڈ ریل مڑ گئی ہے اور ڈھیلی ہو گئی ہے۔ حادثے کا خطرہ ہے۔',
      aiSummary: 'حفاظتی گارڈ ریل کا ٹوٹنا۔ موڑ پر حفاظتی دیوار کمزور ہو گئی ہے۔',
      aiPreventionInsight: 'کمزور حفاظتی ریل دوسری ٹکر کے دوران مکمل طور پر ٹوٹ جائے گی، مسافروں کے لیے بڑا خطرہ ہے۔',
      aiResolutionRecommendation: 'مڑی ہوئی ریل کو ہٹائیں۔ لوہے کے نئے حفاظتی جنگلے نصب کریں۔',
      authorityAssigned: 'محکمہ تعمیرات عامہ (PWD)'
    }
  }
};

// Main function to translate and localize any issue on-the-fly
export function getLocalizedIssue(issue: Issue, langCode: string): Issue {
  if (langCode === 'en-US' || !langCode) {
    return issue;
  }

  // Get localized category
  const localizedCategory = DYNAMIC_CATEGORY_MAP[langCode]?.[issue.category] || issue.category;

  // Translate timeline status items
  const localizedTimeline = issue.timeline?.map(step => {
    let title = step.title;
    let description = step.description;

    if (langCode === 'hi-IN') {
      if (step.status === 'reported') { title = "रिपोर्ट दर्ज की गई"; description = "नागरिक द्वारा समस्या की रिपोर्ट दर्ज की गई है।"; }
      else if (step.status === 'investigating') { title = "जांच सक्रिय"; description = "एआई जियो-इंटेलिजेंस एजेंट द्वारा विवरण और सीमा का सत्यापन जारी है।"; }
      else if (step.status === 'verified') { title = "समुदाय द्वारा सत्यापित"; description = "स्थानीय नागरिकों ने भौतिक सत्यापन और सहमति व्यक्त की है।"; }
      else if (step.status === 'prioritized') { title = "प्राथमिकता दी गई"; description = "एआई एल्गोरिदम ने प्रभाव स्कोर के आधार पर तात्कालिकता की गणना की।"; }
      else if (step.status === 'assigned') { title = "कार्य सौंपा गया"; description = "समाधान सिफारिशों के साथ संबंधित विभाग को काम सौंप दिया गया है।"; }
      else if (step.status === 'resolving') { title = "समाधान प्रगति पर"; description = "ठेकेदार दल ने जमीन पर मरम्मत कार्य शुरू कर दिया है।"; }
      else if (step.status === 'resolved') { title = "समस्या का समाधान"; description = "काम पूरा हो चुका है। अंतिम सहमति और सत्यापन स्वीकृत है।"; }
    } else if (langCode === 'bn-IN') {
      if (step.status === 'reported') { title = "রিপোর্ট নথিভুক্ত"; description = "নাগরিক দ্বারা সমস্যাটির রিপোর্ট জমা করা হয়েছে।"; }
      else if (step.status === 'investigating') { title = "তদন্ত সক্রিয়"; description = "এআই জিও-ইন্টেলিজেন্স এজেন্ট দ্বারা যাচাইকরণ চলছে।"; }
      else if (step.status === 'verified') { title = "সম্প্রদায় দ্বারা যাচাইকৃত"; description = "স্থানীয় বাসিন্দারা ভৌগোলিক সত্যতা অনুমোদন করেছেন।"; }
      else if (step.status === 'prioritized') { title = "অগ্রাধিকার দেওয়া হয়েছে"; description = "এআই অ্যালগরিদম প্রভাবের উপর ভিত্তি করে গুরুত্ব নির্ধারণ করেছে।"; }
      else if (step.status === 'assigned') { title = "কাজ বরাদ্দ"; description = "সমাধান প্রস্তাব সহ সংশ্লিষ্ট বিভাগে কাজ পাঠানো হয়েছে।"; }
      else if (step.status === 'resolving') { title = "সমাধান চলছে"; description = "মেরামতকারী দল ঘটনাস্থলে কাজ শুরু করেছে।"; }
      else if (step.status === 'resolved') { title = "সমস্যা সমাধান সম্পন্ন"; description = "কাজ সম্পন্ন হয়েছে। চূড়ান্ত অডিট দ্বারা অনুমোদিত।"; }
    } else if (langCode === 'gu-IN') {
      if (step.status === 'reported') { title = "રિપોર્ટ દાખલ"; }
      else if (step.status === 'investigating') { title = "તપાસ ચાલુ"; }
      else if (step.status === 'verified') { title = "સમુદાય દ્વારા ચકાસાયેલ"; }
      else if (step.status === 'prioritized') { title = "પ્રાથમિકતા નક્કી"; }
      else if (step.status === 'assigned') { title = "કામ સોંપવામાં આવ્યું"; }
      else if (step.status === 'resolving') { title = "કામ ચાલુ છે"; }
      else if (step.status === 'resolved') { title = "સમસ્યા ઉકેલાઈ ગઈ"; }
    } else if (langCode === 'kn-IN') {
      if (step.status === 'reported') { title = "ವರದಿ ದಾಖಲಾಗಿದೆ"; }
      else if (step.status === 'investigating') { title = "ತನಿಖೆ ಪ್ರಗತಿಯಲ್ಲಿದೆ"; }
      else if (step.status === 'verified') { title = "ಸಮುದಾಯ ಪರಿಶೀಲಿಸಿದೆ"; }
      else if (step.status === 'prioritized') { title = "ಆದ್ಯತೆ ನೀಡಲಾಗಿದೆ"; }
      else if (step.status === 'assigned') { title = "ಕೆಲಸ ನಿಯೋಜಿಸಲಾಗಿದೆ"; }
      else if (step.status === 'resolving') { title = "ದುರಸ್ತಿ ಕಾರ್ಯ ಪ್ರಗತಿಯಲ್ಲಿದೆ"; }
      else if (step.status === 'resolved') { title = "ಸಮಸ್ಯೆ ಬಗೆಹರಿದಿದೆ"; }
    } else if (langCode === 'ml-IN') {
      if (step.status === 'reported') { title = "റിപ്പോർട്ട് ചെയ്യപ്പെട്ടു"; }
      else if (step.status === 'investigating') { title = "അന്വേഷണം നടക്കുന്നു"; }
      else if (step.status === 'verified') { title = "സ്ഥിരീകരിക്കപ്പെട്ടു"; }
      else if (step.status === 'prioritized') { title = "മുൻഗണന നൽകി"; }
      else if (step.status === 'assigned') { title = "ചുമതലപ്പെടുത്തി"; }
      else if (step.status === 'resolving') { title = "പരിഹാരം പുരോഗമിക്കുന്നു"; }
      else if (step.status === 'resolved') { title = "പരിഹരിക്കപ്പെട്ടു"; }
    } else if (langCode === 'mr-IN') {
      if (step.status === 'reported') { title = "अहवाल नोंदवला"; }
      else if (step.status === 'investigating') { title = "तपास सुरू"; }
      else if (step.status === 'verified') { title = "पडताळणी यशस्वी"; }
      else if (step.status === 'prioritized') { title = "प्राधान्य दिले"; }
      else if (step.status === 'assigned') { title = "काम सोपवले"; }
      else if (step.status === 'resolving') { title = "दुरुस्ती सुरू"; }
      else if (step.status === 'resolved') { title = "समस्या मिटली"; }
    } else if (langCode === 'ta-IN') {
      if (step.status === 'reported') { title = "புகார் பதிவானது"; }
      else if (step.status === 'investigating') { title = "விசாரணை நடக்கிறது"; }
      else if (step.status === 'verified') { title = "சமூகத்தாரால் சரிபார்க்கப்பட்டது"; }
      else if (step.status === 'prioritized') { title = "முன்னுரிமை அளிக்கப்பட்டது"; }
      else if (step.status === 'assigned') { title = "ஒதுக்கீடு செய்யப்பட்டது"; }
      else if (step.status === 'resolving') { title = "பழுதுநீக்கப்படுகிறது"; }
      else if (step.status === 'resolved') { title = "தீர்க்கப்பட்டது"; }
    } else if (langCode === 'te-IN') {
      if (step.status === 'reported') { title = "రిపోర్ట్ నమోదైంది"; }
      else if (step.status === 'investigating') { title = "పరిశోధన జరుగుతోంది"; }
      else if (step.status === 'verified') { title = "ధృవీకరించబడింది"; }
      else if (step.status === 'prioritized') { title = "ఆద్యత ఇవ్వబడింది"; }
      else if (step.status === 'assigned') { title = "పని అప్పగించబడింది"; }
      else if (step.status === 'resolving') { title = "పరిష్కరిస్తున్నారు"; }
      else if (step.status === 'resolved') { title = "పరిష్కరించబడింది"; }
    } else if (langCode === 'ur-IN') {
      if (step.status === 'reported') { title = "رپورٹ درج کی گئی"; }
      else if (step.status === 'investigating') { title = "تحقیقات جاری"; }
      else if (step.status === 'verified') { title = "تصدیق کی گئی"; }
      else if (step.status === 'prioritized') { title = "ترجیح دی گئی"; }
      else if (step.status === 'assigned') { title = "کام سونپ دیا گیا"; }
      else if (step.status === 'resolving') { title = "حل جاری ہے"; }
      else if (step.status === 'resolved') { title = "حل ہو گیا"; }
    }

    return { ...step, title, description: getLocalizedCitizenName(description, langCode) };
  });

  // Check if there is a direct handcrafted translation for this issue id
  const localizedValues = CORE_ISSUE_LOCALIZATIONS[langCode]?.[issue.id];
  if (localizedValues) {
    return {
      ...issue,
      reportedBy: getLocalizedCitizenName(issue.reportedBy, langCode),
      category: localizedCategory,
      title: localizedValues.title || issue.title,
      description: localizedValues.description || issue.description,
      aiSummary: localizedValues.aiSummary || issue.aiSummary,
      aiPreventionInsight: localizedValues.aiPreventionInsight || issue.aiPreventionInsight,
      aiResolutionRecommendation: localizedValues.aiResolutionRecommendation || issue.aiResolutionRecommendation,
      authorityAssigned: localizedValues.authorityAssigned || issue.authorityAssigned,
      timeline: localizedTimeline || issue.timeline
    };
  }

  // Find state name from ID mapping
  const getIssueLocation = (issueId: string): string => {
    const mapping: Record<string, string> = {
      'ind-issue-1': 'Andhra Pradesh',
      'ind-issue-2': 'Arunachal Pradesh',
      'ind-issue-3': 'Assam',
      'ind-issue-4': 'Bihar',
      'ind-issue-5': 'Chhattisgarh',
      'ind-issue-6': 'Goa',
      'ind-issue-7': 'Gujarat',
      'ind-issue-8': 'Haryana',
      'ind-issue-9': 'Himachal Pradesh',
      'ind-issue-10': 'Jharkhand',
      'ind-issue-11': 'Karnataka',
      'ind-issue-12': 'Kerala',
      'ind-issue-13': 'Madhya Pradesh',
      'ind-issue-14': 'Maharashtra',
      'ind-issue-15': 'Manipur',
      'ind-issue-16': 'Meghalaya',
      'ind-issue-17': 'Mizoram',
      'ind-issue-18': 'Nagaland',
      'ind-issue-19': 'Odisha',
      'ind-issue-20': 'Punjab',
      'ind-issue-21': 'Rajasthan',
      'ind-issue-22': 'Sikkim',
      'ind-issue-23': 'Tamil Nadu',
      'ind-issue-24': 'Telangana',
      'ind-issue-25': 'Tripura',
      'ind-issue-26': 'Uttar Pradesh',
      'ind-issue-27': 'Uttarakhand',
      'ind-issue-28': 'West Bengal',
      'ind-issue-29': 'Delhi / NCR'
    };
    return mapping[issueId] || 'Metro Heights';
  };

  const locationName = getIssueLocation(issue.id);
  const location = getLocalizedStateName(locationName, langCode);

  // Dynamic template translation fallback for the 29 Indian state issues & others
  let title = issue.title;
  let description = issue.description;
  let aiSummary = issue.aiSummary;
  let aiPreventionInsight = issue.aiPreventionInsight;
  let aiResolutionRecommendation = issue.aiResolutionRecommendation;
  let authorityAssigned = issue.authorityAssigned;

  // Let's create beautiful category-aware template translations for other languages
  if (langCode === 'hi-IN') {
    title = `${location} - ${localizedCategory} समस्या`;
    description = `यह ${location} क्षेत्र में पाई गई ${localizedCategory} की एक सत्यापित रिपोर्ट है। स्थानीय निवासियों द्वारा इसकी पुष्टि की गई है। विवरण: ${issue.description}`;
    aiSummary = `एआई आकलन: ${localizedCategory} विफलता की पुष्टि। उप-सतह खतरा सूचकांक आकलित। समाधान की आवश्यकता।`;
    aiPreventionInsight = `एआई अंतर्दृष्टि: समाधान न होने पर अगले मौसम पूर्वानुमानों के दौरान इस क्षेत्र में सुरक्षा जोखिम ३००% बढ़ जाएगा।`;
    aiResolutionRecommendation = `एआई सिफारिश: संबंधित विभाग द्वारा आपातकालीन तकनीकी मरम्मत दल भेजा जाए।`;
    authorityAssigned = `स्थानीय नगरपालिका प्रशासन विभाग`;
  } else if (langCode === 'bn-IN') {
    title = `${location} - ${localizedCategory} সমস্যা`;
    description = `এটি ${location} অঞ্চলে পাওয়া ${localizedCategory} এর একটি অনুমোদিত রিপোর্ট। নাগরিকদের দ্বারা এটি যাচাই করা হয়েছে। বিবরণ: ${issue.description}`;
    aiSummary = `এআই মূল্যায়ন: ${localizedCategory} ব্যর্থতা প্রমাণিত। এলাকায় পরিকাঠামোগত সুরক্ষার ঝুঁকি রয়েছে।`;
    aiPreventionInsight = `এআই পূর্বাভাস: দ্রুত সমাধান না হলে পরবর্তী বৃষ্টিপাতের সময় ঝুঁকি মারাত্মক আকার ধারণ করতে পারে।`;
    aiResolutionRecommendation = `এআই পরামর্শ: দ্রুত মেরামতি দল নিযুক্ত করার পরামর্শ দেওয়া হচ্ছে।`;
    authorityAssigned = `স্থানীয় পৌরসভা কর্পোরেশন`;
  } else if (langCode === 'gu-IN') {
    title = `${location} - ${localizedCategory} ની સમસ્યા`;
    description = `આ ${location} વિસ્તારમાં જોવા મળેલી ${localizedCategory} ની ચકાસાયેલ રિપોર્ટ છે.`;
  } else if (langCode === 'kn-IN') {
    title = `${location} - ${localizedCategory} ಸಮಸ್ಯೆ`;
    description = `ಇದು ${location} ಪ್ರದೇಶದಲ್ಲಿ ಕಂಡುಬಂದ ${localizedCategory} ಯ ಅಧಿಕೃತ ವರದಿಯಾಗಿದೆ.`;
  } else if (langCode === 'ml-IN') {
    title = `${location} - ${localizedCategory} പ്രശ്നം`;
    description = `ഇത് ${location} പ്രദേശത്ത് കണ്ടെത്തിയ ${localizedCategory} സംബന്ധിച്ച സ്ഥിരീകരിച്ച റിപ്പോർട്ട് ആണ്.`;
  } else if (langCode === 'mr-IN') {
    title = `${location} - ${localizedCategory} ची समस्या`;
    description = `हा ${location} क्षेत्रातील ${localizedCategory} चा पडताळणी केलेला अहवाल आहे.`;
  } else if (langCode === 'ta-IN') {
    title = `${location} - ${localizedCategory} பிரச்சனை`;
    description = `இது ${location} பகுதியில் பதிவான ${localizedCategory} குறித்த சரிபார்க்கப்பட்ட புகாராகும்.`;
  } else if (langCode === 'te-IN') {
    title = `${location} - ${localizedCategory} సమస్య`;
    description = `ఇది ${location} ప్రాంతంలో గుర్తించబడిన ${localizedCategory} యొక్క ధృవీకరించబడిన నివేదిక.`;
  } else if (langCode === 'ur-IN') {
    title = `${location} - ${localizedCategory} کا مسئلہ`;
    description = `یہ ${location} کے علاقے میں ${localizedCategory} کی تصدیق شدہ رپورٹ ہے۔`;
  }

  return {
    ...issue,
    reportedBy: getLocalizedCitizenName(issue.reportedBy, langCode),
    category: localizedCategory,
    title,
    description,
    aiSummary: aiSummary || issue.aiSummary,
    aiPreventionInsight: aiPreventionInsight || issue.aiPreventionInsight,
    aiResolutionRecommendation: aiResolutionRecommendation || issue.aiResolutionRecommendation,
    authorityAssigned: authorityAssigned || issue.authorityAssigned,
    timeline: localizedTimeline || issue.timeline
  };
}
