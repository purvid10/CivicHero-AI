import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import { 
  MapPin, Navigation, ZoomIn, ZoomOut, Maximize2, AlertCircle, 
  Sparkles, CheckCircle, Clock, Heart, Shield, Home, Flame, 
  Layers, Search, Eye, Compass, HelpCircle, ChevronRight, CornerDownRight 
} from 'lucide-react';
import { Issue } from '../types';
import { INDIAN_SAFETY_CENTERS, INDIAN_RISK_ZONES } from '../data/indiaData';
import { TRANSLATIONS } from '../translations';
import { getLocalizedEmergencyCenterName, getLocalizedDetailOrCapacity } from '../emergencyTranslations';

interface MapLocalizedType {
  yourLocation: string;
  readyForDispatch: string;
  locationLocked: string;
  readyToReport: string;
  capacity: string;
  contact: string;
  riskLevel: string;
  emergencyShelter: string;
  medicalTraumaHQ: string;
  activeDispatchCenter: string;
  floodRiskZones: string;
  issueDensityHeatmap: string;
  safeEscortGuidance: string;
  determiningRoute: string;
  activateRouteText: string;
  nearestSecureFacility: string;
  dist: string;
  est: string;
  active: string;
  off: string;
  density: string;
  markers: string;
  route: string;
  searchPlaceholder: string;
  searchResults: string;
  close: string;
  search: string;
  safetyLayersControl: string;
  safetyLayersDescription: string;
  hospitalsTrauma: string;
  policeHeadquarters: string;
  emergencyShelters: string;
  myLiveGeolocation: string;
  zoomIn: string;
  zoomOut: string;
  recenterCityCenter: string;
  departFromCoords: string;
  headEastStep: string;
  turnParallelStep: string;
  slightAdvanceStep: string;
  arriveSafelyStep: string;
}

const MAP_LOCALIZED: Record<string, Partial<MapLocalizedType>> = {
  'en-US': {
    yourLocation: "Your Location",
    readyForDispatch: "Ready for local dispatch reporting",
    locationLocked: "Location Locked",
    readyToReport: "Ready to report issue here:",
    capacity: "Capacity",
    contact: "Contact",
    riskLevel: "Risk Level",
    emergencyShelter: "Emergency Shelter",
    medicalTraumaHQ: "Medical Trauma HQ",
    activeDispatchCenter: "Active Dispatch Center",
    floodRiskZones: "Flood-Risk Zones",
    issueDensityHeatmap: "Issue Density Heatmap",
    safeEscortGuidance: "Safe Escort Guidance",
    determiningRoute: "Determining safety route... Make sure your browser has geoshare enabled!",
    activateRouteText: "Activate route to generate a grid-guided safe escape route to your absolute nearest shelter/hospital.",
    nearestSecureFacility: "Nearest Secure Facility",
    dist: "Dist",
    est: "Est",
    active: "ACTIVE",
    off: "OFF",
    density: "DENSITY",
    markers: "MARKERS",
    route: "ROUTE",
    searchPlaceholder: "Search local streets, districts, parks...",
    searchResults: "Search results",
    close: "Close",
    search: "SEARCH",
    safetyLayersControl: "Safety Layers Control",
    safetyLayersDescription: "Toggle live open-street safety telemetry & emergency checkpoints.",
    hospitalsTrauma: "Hospitals / Trauma",
    policeHeadquarters: "Police Headquarters",
    emergencyShelters: "Emergency Shelters",
    myLiveGeolocation: "My Live Geolocation",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
    recenterCityCenter: "Recenter City Center",
    departFromCoords: "Depart from your current live coordinates.",
    headEastStep: "Head East along low-risk pedestrian zones",
    turnParallelStep: "Turn onto parallel safety corridor corridor near",
    slightAdvanceStep: "Slight advance northwards avoiding flood risk zones.",
    arriveSafelyStep: "Arrive safely at"
  },
  'hi-IN': {
    yourLocation: "आपकी स्थिति",
    readyForDispatch: "स्थानीय प्रेषण रिपोर्टिंग के लिए तैयार",
    locationLocked: "स्थान लॉक है",
    readyToReport: "यहाँ समस्या की रिपोर्ट करने के लिए तैयार:",
    capacity: "क्षमता",
    contact: "संपर्क",
    riskLevel: "जोखिम स्तर",
    emergencyShelter: "आपातकालीन आश्रय",
    medicalTraumaHQ: "चिकित्सा ट्रॉमा मुख्यालय",
    activeDispatchCenter: "सक्रिय प्रेषण केंद्र",
    floodRiskZones: "बाढ़-जोखिम क्षेत्र",
    issueDensityHeatmap: "समस्या घनत्व हीटमैप",
    safeEscortGuidance: "सुरक्षित एस्कॉर्ट मार्गदर्शन",
    determiningRoute: "सुरक्षित मार्ग का निर्धारण... सुनिश्चित करें कि आपके ब्राउज़र में जियोशेयर सक्षम है!",
    activateRouteText: "अपने निकटतम आश्रय/अस्पताल के लिए ग्रिड-निर्देशित सुरक्षित बच निकलने का मार्ग उत्पन्न करने के लिए मार्ग सक्रिय करें।",
    nearestSecureFacility: "निकटतम सुरक्षित सुविधा",
    dist: "दूरी",
    est: "अनुमानित समय",
    active: "सक्रिय",
    off: "बंद",
    density: "घनत्व",
    markers: "चिह्न",
    route: "मार्ग",
    searchPlaceholder: "स्थानीय सड़कों, जिलों, पार्कों की खोज करें...",
    searchResults: "खोज परिणाम",
    close: "बंद करें",
    search: "खोजें",
    safetyLayersControl: "सुरक्षा परतें नियंत्रण",
    safetyLayersDescription: "लाइव सुरक्षा टेलीमेट्री और आपातकालीन चौकियों को चालू/बंद करें।",
    hospitalsTrauma: "अस्पताल / ट्रॉमा केयर",
    policeHeadquarters: "पुलिस मुख्यालय",
    emergencyShelters: "आपातकालीन आश्रय स्थल",
    myLiveGeolocation: "मेरी लाइव भौगोलिक स्थिति",
    zoomIn: "ज़ूम इन",
    zoomOut: "ज़ूम आउट",
    recenterCityCenter: "शहर के केंद्र को फिर से केंद्रित करें",
    departFromCoords: "अपने वर्तमान लाइव निर्देशांक से प्रस्थान करें।",
    headEastStep: "कम जोखिम वाले पैदल चलने वाले क्षेत्रों के माध्यम से पूर्व की ओर बढ़ें",
    turnParallelStep: "समानांतर सुरक्षा गलियारे की ओर मुड़ें, निकट",
    slightAdvanceStep: "बाढ़ जोखिम क्षेत्रों से बचते हुए उत्तर की ओर थोड़ा बढ़ें।",
    arriveSafelyStep: "सुरक्षित रूप से पहुंचें"
  },
  'bn-IN': {
    yourLocation: "আপনার অবস্থান",
    readyForDispatch: "স্থানীয় প্রেরণ রিপোর্টিংয়ের জন্য প্রস্তুত",
    locationLocked: "অবস্থান লক করা হয়েছে",
    readyToReport: "এখানে সমস্যা রিপোর্ট করতে প্রস্তুত:",
    capacity: "ক্ষমতা",
    contact: "যোগাযোগ",
    riskLevel: "ঝুঁকির মাত্রা",
    emergencyShelter: "জরুরি আশ্রয়",
    medicalTraumaHQ: "চিকিৎসা ট্রমা সদর দপ্তর",
    activeDispatchCenter: "সক্রিয় প্রেরণ কেন্দ্র",
    floodRiskZones: "বন্যা-ঝুঁকিপূর্ণ এলাকা",
    issueDensityHeatmap: "সমস্যার ঘনত্বের হিটম্যাপ",
    safeEscortGuidance: "নিরাপদ এসকর্ট নির্দেশিকা",
    determiningRoute: "নিরাপদ রুট নির্ধারণ করা হচ্ছে... আপনার ব্রাউজারে জিওশেয়ার সক্ষম আছে কিনা তা নিশ্চিত করুন!",
    activateRouteText: "আপনার নিকটবর্তী আশ্রয়/হাসপাতালে একটি গ্রিড-নির্দেশিত নিরাপদ রুট তৈরি করতে রুট সক্রিয় করুন।",
    nearestSecureFacility: "নিকটতম নিরাপদ সুবিধা",
    dist: "দূরত্ব",
    est: "আনুমানিক সময়",
    active: "সক্রিয়",
    off: "বন্ধ",
    density: "ঘনত্ব",
    markers: "চিহ্নসমূহ",
    route: "রুট",
    searchPlaceholder: "স্থানীয় রাস্তা, জেলা, পার্ক অনুসন্ধান করুন...",
    searchResults: "অনুসন্ধানের ফলাফল",
    close: "বন্ধ করুন",
    search: "অনুসন্ধান",
    safetyLayersControl: "নিরাপত্তা স্তর নিয়ন্ত্রণ",
    safetyLayersDescription: "লাইভ ওপেন-স্ট্রিট নিরাপত্তা টেলিমেট্রি এবং জরুরি চেকপয়েন্ট টগল করুন।",
    hospitalsTrauma: "হাসপাতাল / ট্রমা",
    policeHeadquarters: "পুলিশ সদর দপ্তর",
    emergencyShelters: "জরুরী আশ্রয় কেন্দ্র",
    myLiveGeolocation: "আমার লাইভ ভূ-অবস্থান",
    zoomIn: "জুম ইন",
    zoomOut: "জুম আউট",
    recenterCityCenter: "শহরের কেন্দ্র পুনরায় কেন্দ্র করুন",
    departFromCoords: "আপনার বর্তমান লাইভ স্থানাঙ্ক থেকে প্রস্থান করুন।",
    headEastStep: "কম ঝুঁকিপূর্ণ পথচারী এলাকা দিয়ে পূর্ব দিকে যান",
    turnParallelStep: "নিকটবর্তী সমান্তরাল নিরাপত্তা করিডোরে যান",
    slightAdvanceStep: "বন্যা ঝুঁকি অঞ্চল এড়িয়ে উত্তরে সামান্য অগ্রসর হোন।",
    arriveSafelyStep: "নিরাপদে পৌঁছান"
  },
  'gu-IN': {
    yourLocation: "તમારું સ્થાન",
    readyForDispatch: "સ્થાનિક રવાનગી રિપોર્ટિંગ માટે તૈયાર",
    locationLocked: "સ્થાન લોક કરેલ છે",
    readyToReport: "અહીં સમસ્યાની જાણ કરવા માટે તૈયાર:",
    capacity: "ક્ષમતા",
    contact: "સંપર્ક",
    riskLevel: "જોખમ સ્તર",
    emergencyShelter: "કટોકટી આશ્રય",
    medicalTraumaHQ: "મેડિકલ ટ્રોમા હેડક્વાર્ટર",
    activeDispatchCenter: "સક્રિય રવાનગી કેન્દ્ર",
    floodRiskZones: "પૂર-જોખમ વિસ્તારો",
    issueDensityHeatmap: "સમસ્યા ઘનતા હીટમેપ",
    safeEscortGuidance: "સુરક્ષિત એસ્કોર્ટ માર્ગદર્શન",
    determiningRoute: "સુરક્ષિત માર્ગ નક્કી કરી રહ્યા છીએ... ખાતરી કરો કે તમારા બ્રાઉઝરમાં જીઓશેર સક્ષમ છે!",
    activateRouteText: "તમારા નજીકના આશ્રય/હોસ્પિટલ માટે ગ્રીડ-માર્ગદર્શિત સુરક્ષિત માર્ગ જનરેટ કરવા માટે રૂટ સક્રિય કરો.",
    nearestSecureFacility: "નજીકની સુરક્ષિત સુવિધા",
    dist: "અંતર",
    est: "સમય",
    active: "સક્રિય",
    off: "બંધ",
    density: "ઘનતા",
    markers: "માર્કર્સ",
    route: "માર્ગ",
    searchPlaceholder: "સ્થાનિક રસ્તાઓ, વિસ્તારો, બગીચાઓ શોધો...",
    searchResults: "શોધ પરિણામો",
    close: "બંધ કરો",
    search: "શોધો",
    safetyLayersControl: "સુરક્ષા સ્તરો નિયંત્રણ",
    safetyLayersDescription: "લાઇવ ઓપન-સ્ટ્રીટ સુરક્ષા ટેલિમેટ્રી અને કટોકટી ચેકપોઇન્ટ્સ ટૉગલ કરો.",
    hospitalsTrauma: "હોસ્પિટલો / ટ્રોમા",
    policeHeadquarters: "પોલીસ મુખ્ય મથક",
    emergencyShelters: "કટોકટી આશ્રયસ્થાનો",
    myLiveGeolocation: "મારું લાઇવ ભૌગોલિક સ્થાન",
    zoomIn: "ઝૂમ ઇન",
    zoomOut: "ઝૂમ આઉટ",
    recenterCityCenter: "શહેરનું કેન્દ્ર રિસેન્ટર કરો",
    departFromCoords: "તમારા વર્તમાન લાઇવ કોઓર્ડિનેટ્સથી પ્રસ્થાન કરો.",
    headEastStep: "ઓછા જોખમવાળા રાહદારી વિસ્તારો સાથે પૂર્વ તરફ આગળ વધો",
    turnParallelStep: "સમાંતર સુરક્ષા કોરિડોર પર વળો, નજીક",
    slightAdvanceStep: "પૂર જોખમવાળા વિસ્તારોને ટાળીને ઉત્તર તરફ થોડા આગળ વધો.",
    arriveSafelyStep: "સુરક્ષિત રીતે પહોંચો"
  },
  'ta-IN': {
    yourLocation: "உங்கள் இடம்",
    readyForDispatch: "உள்ளூர் மீட்பు அறிக்கையிடலுக்கு தயார்",
    locationLocked: "இடம் பூட்டப்பட்டது",
    readyToReport: "இங்கே புகாரளிக்கத் தயார்:",
    capacity: "கொள்ளளவு",
    contact: "தொடர்பு",
    riskLevel: "ஆபத்து நிலை",
    emergencyShelter: "அவசரகால தங்குமிடம்",
    medicalTraumaHQ: "மருத்துவ அதிர்ச்சி தலைமையகம்",
    activeDispatchCenter: "செயலில் உள்ள மீட்பు மையம்",
    floodRiskZones: "வெள்ள ஆபத்து மண்டலங்கள்",
    issueDensityHeatmap: "பிரச்சனை अडர்த்தி வெப்பவரைபடம்",
    safeEscortGuidance: "பாதுகாப்பான வழித்துணை வழிகாட்டுதல்",
    determiningRoute: "பாதுகாப்பான வழியைக் கண்டறிகிறது... உங்கள் உலாவியில் இருப்பிடப் பகிர்வு இயக்கப்பட்டிருப்பதை உறுதிசெய்யவும்!",
    activateRouteText: "உங்களுக்கு மிக அருகிலுள்ள தங்குமிடம்/மருத்துவமனைக்கு பாதுகாப்பான வழியை உருவாக்க வழியைச் செயல்படுத்தவும்.",
    nearestSecureFacility: "அருகிலுள்ள பாதுகாப்பான வசதி",
    dist: "தொலைவு",
    est: "நேரம்",
    active: "செயலில்",
    off: "முடக்கப்பட்டது",
    density: "அடர்த்தி",
    markers: "குறியீடுகள்",
    route: "வழி",
    searchPlaceholder: "உள்ளூர் தெருக்கள், மாவட்டங்கள், பூங்காக்களைத் தேடுங்கள்...",
    searchResults: "தேடல் முடிவுகள்",
    close: "மூடு",
    search: "தேடு",
    safetyLayersControl: "பாதுகாப்பு அடுக்குகள் கட்டுப்பாடு",
    safetyLayersDescription: "நேரடி திறந்தவெளி பாதுகாப்பு அளவீடு மற்றும் அவசர சோதனைச் சாவடிகளை மாற்றவும்.",
    hospitalsTrauma: "மருத்துவமனைகள் / அதிர்ச்சி சிகிச்சை",
    policeHeadquarters: "காவல் தலைமையகம்",
    emergencyShelters: "அவசரகால தங்குமிடங்கள்",
    myLiveGeolocation: "எனது நேரடி இருப்பிடம்",
    zoomIn: "பெரிதாக்கு",
    zoomOut: "சிறிதாக்கு",
    recenterCityCenter: "நகர மையத்தை மறுசீரமைக்கவும்",
    departFromCoords: "உங்கள் தற்போதைய நேரடி இருப்பிடத்திலிருந்து புறப்படுங்கள்.",
    headEastStep: "குறைந்த ஆபத்துள்ள பாதசாரி பகுதிகள் வழியாக கிழக்கு நோக்கி செல்லுங்கள்",
    turnParallelStep: "இணையான பாதுகாப்பு நடைபாதைக்கு திரும்பவும், அருகில்",
    slightAdvanceStep: "வெள்ள ஆபத்து பகுதிகளைத் தவிர்த்து வடக்கு நோக்கிச் செல்லுங்கள்.",
    arriveSafelyStep: "பாதுகாப்பாக வந்தடையுங்கள்"
  },
  'kn-IN': {
    yourLocation: "ನಿಮ್ಮ ಸ್ಥಳ",
    readyForDispatch: "ಸ್ಥಳೀಯ ರವಾನೆ ವರದಿಗಾಗಿ ಸಿದ್ಧವಾಗಿದೆ",
    locationLocked: "ಸ್ಥಳವನ್ನು ಲಾಕ್ ಮಾಡಲಾಗಿದೆ",
    readyToReport: "ಇಲ್ಲಿ ವರದಿ ಮಾಡಲು ಸಿದ್ಧವಾಗಿದೆ:",
    capacity: "ಸಾಮರ್ಥ್ಯ",
    contact: "ಸಂಪರ್ಕ",
    riskLevel: "ಅಪಾಯದ ಮಟ್ಟ",
    emergencyShelter: "ತುರ್ತು ಆಶ್ರಯ",
    medicalTraumaHQ: "ವೈದ್ಯಕೀಯ ಟ್ರಾಮಾ ಪ್ರಧಾನ ಕಚೇರಿ",
    activeDispatchCenter: "ಸಕ್ರಿಯ ರವಾನೆ ಕೇಂದ್ರ",
    floodRiskZones: "ಪ್ರವಾಹ-ಅಪಾಯದ ವಲಯಗಳು",
    issueDensityHeatmap: "ಸಮಸ್ಯೆ ಸಾಂದ್ರತೆಯ ಹೀಟ್‌ಮ್ಯಾಪ್",
    safeEscortGuidance: "ಸುರಕ್ಷಿತ ಬೆಂಗಾವಲು ಮಾರ್ಗದರ್ಶನ",
    determiningRoute: "ಸುರಕ್ಷಿತ ಮಾರ್ಗವನ್ನು ನಿರ್ಧರಿಸಲಾಗುತ್ತಿದೆ... ನಿಮ್ಮ ಬ್ರೌಸರ್ ಜಿಯೋಶೇರ್ ಸಕ್ರಿಯಗೊಳಿಸಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ!",
    activateRouteText: "ನಿಮ್ಮ ಹತ್ತಿರದ ಆಶ್ರಯ/ಆಸ್ಪತ್ರೆಗೆ ಸುರಕ್ಷಿತ ಪಾರು ಮಾರ್ಗವನ್ನು ರಚಿಸಲು ಮಾರ್ಗವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.",
    nearestSecureFacility: "ಹತ್ತಿರದ ಸುರಕ್ಷಿತ ಸೌಲಭ್ಯ",
    dist: "ದೂರ",
    est: "ಅಂದಾಜು ಸಮಯ",
    active: "ಸಕ್ರಿಯ",
    off: "ಆಫ್",
    density: "ಸಾಂದ್ರತೆ",
    markers: "ಗುರುತುಗಳು",
    route: "ಮಾರ್ಗ",
    searchPlaceholder: "ಸ್ಥಳೀಯ ರಸ್ತೆಗಳು, ಜಿಲ್ಲೆಗಳು, ಉದ್ಯಾನವನಗಳನ್ನು ಹುಡುಕಿ...",
    searchResults: "ಹುಡುಕಾಟದ ಫಲಿತಾಂಶಗಳು",
    close: "ಮುಚ್ಚಿ",
    search: "ಹುಡುಕಿ",
    safetyLayersControl: "ಸುರಕ್ಷತಾ ಪದರಗಳ ನಿಯಂತ್ರಣ",
    safetyLayersDescription: "ಲೈವ್ ಓಪನ್-ಸ್ಟ್ರೀಟ್ ಸುರಕ್ಷತಾ ಟೆಲಿಮೆಟ್ರಿ ಮತ್ತು ತುರ್ತು ಚೆಕ್‌ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಟಾಗಲ್ ಮಾಡಿ.",
    hospitalsTrauma: "ಆಸ್ಪತ್ರೆಗಳು / ಟ್ರಾಮಾ ಕೇರ್",
    policeHeadquarters: "ಪೊಲೀಸ್ ಪ್ರಧಾನ ಕಚೇರಿಗಳು",
    emergencyShelters: "ತುರ್ತು ಆಶ್ರಯಗಳು",
    myLiveGeolocation: "ನನ್ನ ಲೈವ್ ಜಿಯೋಲೊಕೇಶನ್",
    zoomIn: "ಜೂಮ್ ಇನ್",
    zoomOut: "ಜೂಮ್ ಔಟ್",
    recenterCityCenter: "ನಗರ ಕೇಂದ್ರವನ್ನು ಮರುಕೇಂದ್ರೀಕರಿಸಿ",
    departFromCoords: "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಲೈವ್ ನಿರ್ದೇಶಾಂಕಗಳಿಂದ ಹೊರಡಿ.",
    headEastStep: "ಕಡಿಮೆ ಅಪಾಯದ ಪಾದಚಾರಿ ವಲಯಗಳ ಮೂಲಕ ಪೂರ್ವಕ್ಕೆ ಸಾಗಿ",
    turnParallelStep: "ಸಮಾಂತರ ಸುರಕ್ಷತಾ ಕಾರಿಡಾರ್‌ಗೆ ತಿರುಗಿ, ಹತ್ತಿರ",
    slightAdvanceStep: "ಪ್ರವಾಹ ಅಪಾಯದ ವಲಯಗಳನ್ನು ತಪ್ಪಿಸಿ ಉತ್ತರಕ್ಕೆ ಸ್ವಲ್ಪ ಮುನ್ನಡೆಯಿರಿ.",
    arriveSafelyStep: "ಸುರಕ್ಷಿತವಾಗಿ ತಲುಪಿ"
  },
  'ml-IN': {
    yourLocation: "നിങ്ങളുടെ സ്ഥാനം",
    readyForDispatch: "പ്രാദേശിക ഡിസ്പാച്ച് റിപ്പോർട്ടിംഗിനായി തയ്യാറാണ്",
    locationLocked: "ലൊക്കേഷൻ ലോക്ക് ചെയ്തു",
    readyToReport: "ഇവിടെ പ്രശ്നം റിപ്പോർട്ട് ചെയ്യാൻ തയ്യാറാണ്:",
    capacity: "ശേഷി",
    contact: "ബന്ധപ്പെടുക",
    riskLevel: "അപകട നില",
    emergencyShelter: "അടിയന്തര അഭയകേന്ദ്രം",
    medicalTraumaHQ: "മെഡിക്കൽ ട്രോമ ആസ്ഥാനം",
    activeDispatchCenter: "സജീവ ഡിസ്പാച്ച് സെന്റർ",
    floodRiskZones: "വെള്ളപ്പൊക്ക സാധ്യതയുള്ള മേഖലകൾ",
    issueDensityHeatmap: "പ്രശ്ന സാന്ദ്രത ഹീറ്റ്മാപ്പ്",
    safeEscortGuidance: "സുരക്ഷിത എസ്കോർട്ട് മാർഗ്ഗനിർദ്ദേശം",
    determiningRoute: "സുരക്ഷിത പാത കണ്ടെത്തുന്നു... ബ്രൗസറിൽ ലൊക്കേഷൻ അനുമതി നൽകിയിട്ടുണ്ടെന്ന് ഉറപ്പാക്കുക!",
    activateRouteText: "നിങ്ങളുടെ തൊട്ടടുത്തുള്ള അഭയകേന്ദ്രത്തിലേക്കോ ആശുപത്രിയിലേക്കോ ഉള്ള സുരക്ഷിത പാത നിർമ്മിക്കാൻ റൂട്ട് സജീവമാക്കുക.",
    nearestSecureFacility: "ഏറ്റവും അടുത്തുള്ള സുരക്ഷിത കേന്ദ്രം",
    dist: "ദൂരം",
    est: "സമയം",
    active: "സജീവം",
    off: "ഓഫ്",
    density: "സാന്ദ്രത",
    markers: "മാർക്കറുകൾ",
    route: "പാത",
    searchPlaceholder: "പ്രാദേശിക തെരുവുകൾ, ജില്ലകൾ, പാർക്കുകൾ തിരയുക...",
    searchResults: "തിരച്ചിൽ ഫലങ്ങൾ",
    close: "അടയ്ക്കുക",
    search: "തിരയുക",
    safetyLayersControl: "സുരക്ഷാ പാളികളുടെ നിയന്ത്രണം",
    safetyLayersDescription: "തത്സമയ ഓപ്പൺ-സ്ട്രീറ്റ് സുരക്ഷാ ടെലിമെട്രിയും അടിയന്തര ചെക്ക് പോയിന്റുകളും ഓൺ/ഓഫ് ചെയ്യുക.",
    hospitalsTrauma: "ആശുപത്രികൾ / ട്രോമ കെയർ",
    policeHeadquarters: "പോലീസ് ആസ്ഥാനങ്ങൾ",
    emergencyShelters: "അടിയന്തര അഭയകേന്ദ്രങ്ങൾ",
    myLiveGeolocation: "എന്റെ തത്സമയ സ്ഥാനം",
    zoomIn: "വലുതാക്കുക",
    zoomOut: "ചെറുതാക്കുക",
    recenterCityCenter: "നഗര കേന്ദ്രത്തിലേക്ക് മാപ്പ് ക്രമീകരിക്കുക",
    departFromCoords: "നിങ്ങളുടെ നിലവിലെ കോർഡിനേറ്റുകളിൽ നിന്ന് ആരംഭിക്കുക.",
    headEastStep: "അപകടസാധ്യത കുറഞ്ഞ കാൽനട മേഖലകളിലൂടെ കിഴക്കോട്ട് പോകുക",
    turnParallelStep: "സമാന്തര സുരക്ഷാ ഇടനാഴിയിലേക്ക് തിരിയുക, സമീപം",
    slightAdvanceStep: "വെള്ളപ്പൊക്ക സാധ്യതയുള്ള പ്രദേശങ്ങൾ ഒഴിവാക്കി വടക്കോട്ട് നീങ്ങുക.",
    arriveSafelyStep: "സുരക്ഷിതമായി എത്തിച്ചേരുക"
  },
  'mr-IN': {
    yourLocation: "तुमचे स्थान",
    readyForDispatch: "स्थानिक प्रेषण अहवालासाठी तयार",
    locationLocked: "स्थान लॉक केले आहे",
    readyToReport: "येथे समस्येचा अहवाल देण्यासाठी तयार:",
    capacity: "क्षमता",
    contact: "संपर्क",
    riskLevel: "धोका पातळी",
    emergencyShelter: "आपत्कालीन निवारा",
    medicalTraumaHQ: "वैद्यकीय ट्रॉमा मुख्यालय",
    activeDispatchCenter: "सक्रिय प्रेषण केंद्र",
    floodRiskZones: "पूर-धोका क्षेत्र",
    issueDensityHeatmap: "समस्या घनता हीटमॅप",
    safeEscortGuidance: "सुरक्षित एस्कॉर्ट मार्गदर्शन",
    determiningRoute: "सुरक्षित मार्ग निश्चित करत आहे... तुमच्या ब्राउझरमध्ये जिओशेअर सक्षम असल्याची खात्री करा!",
    activateRouteText: "तुमच्या जवळच्या निवारा/रुग्णालयासाठी सुरक्षित मार्ग तयार करण्यासाठी मार्ग सक्रिय करा.",
    nearestSecureFacility: "जवळची सुरक्षित सोय",
    dist: "अंतर",
    est: "वेळ",
    active: "सक्रिय",
    off: "बंद",
    density: "घनता",
    markers: "गुण",
    route: "मार्ग",
    searchPlaceholder: "स्थानिक रस्ते, जिल्हे, उद्याने शोधा...",
    searchResults: "शोध निकाल",
    close: "बंद करा",
    search: "शोधा",
    safetyLayersControl: "सुरक्षा स्तर नियंत्रण",
    safetyLayersDescription: "थेट ओपन-स्ट्रीट सुरक्षा टेलिमेट्री आणि आपत्कालीन चेकपॉईंट्स चालू/बंद करा.",
    hospitalsTrauma: "रुग्णालय / ट्रॉमा केअर",
    policeHeadquarters: "पोलीस मुख्यालय",
    emergencyShelters: "आपत्कालीन निवारे",
    myLiveGeolocation: "माझे थेट स्थान",
    zoomIn: "झूम इन",
    zoomOut: "झूम आउट",
    recenterCityCenter: "शहराच्या केंद्रावर या",
    departFromCoords: "तुमच्या वर्तमान थेटCoordinates वरून प्रस्थान करा.",
    headEastStep: "कमी धोक्याच्या पादचारी क्षेत्रांमधून पूर्वेकडे जा",
    turnParallelStep: "समानांतर सुरक्षा कॉरिडोअरवर वळा, जवळ",
    slightAdvanceStep: "पूर प्रवण क्षेत्र टाळून उत्तरेकडे थोडे पुढे जा.",
    arriveSafelyStep: "सुरक्षितपणे पोहोचा"
  },
  'te-IN': {
    yourLocation: "మీ స్థానం",
    readyForDispatch: "స్థానిక రవాణా నివేదిక కోసం సిద్ధంగా ఉంది",
    locationLocked: "స్థానం లాక్ చేయబడింది",
    readyToReport: "ఇక్కడ నివేదించడానికి సిద్ధంగా ఉంది:",
    capacity: "సామర్థ్యం",
    contact: "సంప్రదించండి",
    riskLevel: "ప్రమాద స్థాయి",
    emergencyShelter: "అత్యవసర ఆశ్రయం",
    medicalTraumaHQ: "వైద్య ట్రామా ప్రధాన కార్యాలయం",
    activeDispatchCenter: "సక్రియ సహాయ కేంద్రం",
    floodRiskZones: "వరద ప్రమాద వలయాలు",
    issueDensityHeatmap: "సమస్య సాంద్రత హీట్‌మ్యాప్",
    safeEscortGuidance: "సురక్షిత ఎస్కార్ట్ మార్గదర్శకం",
    determiningRoute: "సురక్షిత మార్గాన్ని నిర్ధారిస్తోంది... మీ బ్రౌజర్‌లో లొకేషన్ అనుమతి ఉందని నిర్ధారించుకోండి!",
    activateRouteText: "మీకు అత్యంత సమీపంలో ఉన్న ఆశ్రయం/ఆసుపత్రికి సురక్షిత మార్గాన్ని రూపొందించడానికి మార్గాన్ని సక్రియం చేయండి.",
    nearestSecureFacility: "సమీప సురక్షిత సదుపాయం",
    dist: "దూరం",
    est: "సమయం",
    active: "సక్రియం",
    off: "ఆఫ్",
    density: "సాంద్రత",
    markers: "మార్కర్లు",
    route: "మాर्गం"
  },
  'ur-IN': {
    yourLocation: "آپ کا مقام",
    readyForDispatch: "مقامی ڈسپیچ رپورٹنگ کے لیے تیار",
    locationLocked: "مقام مقفل ہے",
    readyToReport: "یہاں رپورٹ کرنے کے لیے تیار:",
    capacity: "صلاحیت",
    contact: "رابطہ",
    riskLevel: "خطرے की سطح",
    emergencyShelter: "ہنگامی پناہ گاہ",
    medicalTraumaHQ: "میڈیکل ٹروما ہیڈ کوارٹر",
    activeDispatchCenter: "فعال ڈسپیच سینٹر",
    floodRiskZones: "سیلاب کے خطرے والے زمرے",
    issueDensityHeatmap: "مسئلے کی کثافت کا ہیٹ میپ",
    safeEscortGuidance: "محفوظ راستہ رہنمائی",
    determiningRoute: "محفوظ راستے کا تعین کیا جا रहा है... یقینی بنائیں کہ آپ کے براؤزر میں لوکیشن آن ہے!",
    activateRouteText: "آپ کے قریبی پناہ گاہ یا ہسپتال کے لیے محفوظ راستہ بنانے کے لیے روٹ آن کریں۔",
    nearestSecureFacility: "قریبی محفوظ ترین جگہ",
    dist: "فاصلہ",
    est: "وقت",
    active: "فعال",
    off: "بند",
    density: "کثافت",
    markers: "نشانات",
    route: "راستہ"
  }
};

interface MapComponentProps {
  issues: Issue[];
  selectedIssue: Issue | null;
  onSelectIssue: (issue: Issue | null) => void;
  onSelectCoordinates: (lat: number, lng: number) => void;
  onBoundsChange?: (bounds: { west: number; south: number; east: number; north: number }) => void;
  prefilledCoords?: { lat: number; lng: number } | null;
  verifyLocation?: { lat: number; lng: number; name: string; type: 'state' | 'street' } | null;
  interactionMode?: 'verify' | 'report';
  langCode?: string;
}

// Preseeded safety/emergency locations for Metro Heights (SF Coordinates)
const HOSPITALS = [
  { id: 'h1', name: "Metro Heights Emergency Hospital", lat: 37.784, lng: -122.433, type: 'hospital', detail: "24/7 ICU & Trauma Center" },
  { id: 'h2', name: "St. Jude Community Medical", lat: 37.762, lng: -122.405, type: 'hospital', detail: "Emergency & Walk-in care" },
];

const POLICE_STATIONS = [
  { id: 'p1', name: "Central Metro Police Headquarters", lat: 37.778, lng: -122.412, type: 'police', detail: "Main precinct - active dispatch" },
  { id: 'p2', name: "Sutter Ward Security Hub", lat: 37.755, lng: -122.445, type: 'police', detail: "Substation & Neighborhood patrol" },
];

const SHELTERS = [
  { id: 's1', name: "Civic Hall emergency Shelter", lat: 37.7795, lng: -122.418, type: 'shelter', capacity: '120/150 spots active', contact: "Zone-1 Disaster Response" },
  { id: 's2', name: "Sunset High Safe Haven", lat: 37.748, lng: -122.451, type: 'shelter', capacity: '35/100 spots active', contact: "Red Cross Chapter" },
  { id: 's3', name: "Mission Community Safe Zone", lat: 37.761, lng: -122.421, type: 'shelter', capacity: '88/120 spots active', contact: "Civic Volunteer Center" },
];

const FLOOD_ZONES = [
  { id: 'f1', name: "Marina Coastal Inundation Risk Area", lat: 37.802, lng: -122.437, radius: 500, riskLevel: "High" },
  { id: 'f2', name: "Mission Creek Drainage Spill Zone", lat: 37.771, lng: -122.395, radius: 450, riskLevel: "Medium" },
];

const ALL_HOSPITALS = [
  ...INDIAN_SAFETY_CENTERS.filter(c => c.type === 'hospital').map(c => ({
    id: c.id,
    name: c.name,
    lat: c.lat,
    lng: c.lng,
    type: 'hospital',
    detail: c.detail
  })),
  ...HOSPITALS
];

const ALL_POLICE_STATIONS = [
  ...INDIAN_SAFETY_CENTERS.filter(c => c.type === 'police').map(c => ({
    id: c.id,
    name: c.name,
    lat: c.lat,
    lng: c.lng,
    type: 'police',
    detail: c.detail
  })),
  ...POLICE_STATIONS
];

const ALL_SHELTERS = [
  ...INDIAN_SAFETY_CENTERS.filter(c => c.type === 'shelter').map(c => ({
    id: c.id,
    name: c.name,
    lat: c.lat,
    lng: c.lng,
    type: 'shelter',
    capacity: c.capacity || '200/250 spots active',
    contact: c.contact || 'Disaster Response Desk'
  })),
  ...SHELTERS
];

const ALL_FLOOD_ZONES = [
  ...INDIAN_RISK_ZONES.map(z => ({
    id: z.id,
    name: z.name,
    lat: z.lat,
    lng: z.lng,
    radius: z.radius,
    riskLevel: z.riskLevel
  })),
  ...FLOOD_ZONES
];

const isValidLatLng = (lat: any, lng: any): boolean => {
  return typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng);
};

export default function MapComponent({ 
  issues, 
  selectedIssue, 
  onSelectIssue, 
  onSelectCoordinates, 
  onBoundsChange, 
  prefilledCoords,
  verifyLocation,
  interactionMode = 'verify',
  langCode = 'en-US'
}: MapComponentProps) {
  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en-US'];
  const ml = {
    ...MAP_LOCALIZED['en-US'],
    ...(MAP_LOCALIZED[langCode] || {})
  } as MapLocalizedType;

  // Leaflet references
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const overlaysLayerGroupRef = useRef<L.LayerGroup | null>(null);

  const onBoundsChangeRef = useRef(onBoundsChange);
  useEffect(() => {
    onBoundsChangeRef.current = onBoundsChange;
  }, [onBoundsChange]);

  const isMovingRef = useRef(false);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  // States for dynamic layers and tools
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [hospitalsEnabled, setHospitalsEnabled] = useState(true);
  const [policeEnabled, setPoliceEnabled] = useState(true);
  const [sheltersEnabled, setSheltersEnabled] = useState(true);
  const [floodZonesEnabled, setFloodZonesEnabled] = useState(true);
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);
  const [routeEnabled, setRouteEnabled] = useState(false);

  // Route guidance variables
  const [routeDetails, setRouteDetails] = useState<{
    destinationName: string;
    distance: string;
    time: string;
    steps: string[];
  } | null>(null);

  // Geocoding Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Find emergency centres near selected issue
  const nearbyEmergencyCentres = selectedIssue ? [
    ...ALL_HOSPITALS.map(h => ({ ...h, category: 'Hospital', icon: '🏥' })),
    ...ALL_POLICE_STATIONS.map(p => ({ ...p, category: 'Police Station', icon: '👮' })),
    ...ALL_SHELTERS.map(s => ({ ...s, category: 'Emergency Shelter', icon: '🏠' }))
  ].map(center => {
    const dist = Math.sqrt(
      Math.pow(center.lat - selectedIssue.lat, 2) + 
      Math.pow(center.lng - selectedIssue.lng, 2)
    ) * 111;
    return { ...center, distance: dist };
  }).filter(c => c.distance < 25)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3) : [];

  // Standard Leaflet Icon fix or modern DivIcon generators
  const getLiveLocationIcon = () => {
    return L.divIcon({
      className: 'custom-live-location-icon',
      html: `
        <div class="relative flex items-center justify-center w-8 h-8">
          <span class="absolute inline-flex w-full h-full rounded-full bg-blue-500 opacity-30 animate-ping"></span>
          <span class="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[9px] font-bold">👤</span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  };

  const getLockIcon = () => {
    return L.divIcon({
      className: 'custom-lock-location-icon',
      html: `
        <div class="relative flex items-center justify-center w-9 h-9">
          <span class="absolute inline-flex w-full h-full rounded-full bg-rose-500 opacity-40 animate-ping"></span>
          <span class="relative inline-flex rounded-xl h-6 w-6 bg-rose-600 border-2 border-white shadow-xl flex items-center justify-center text-white text-xs font-bold animate-bounce">📍</span>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  };

  const getVerifyIcon = () => {
    return L.divIcon({
      className: 'custom-verify-location-icon',
      html: `
        <div class="relative flex items-center justify-center w-10 h-10">
          <span class="absolute inline-flex w-full h-full rounded-full bg-blue-500 opacity-30 animate-ping"></span>
          <span class="relative inline-flex rounded-xl h-7 w-7 bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center text-white text-sm font-bold">🔍</span>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  const getIssueIcon = (priority: string, status: string, isSelected: boolean) => {
    let color = '#eab308'; // medium
    let pulseClass = 'pulse-yellow';
    if (status === 'resolved') {
      color = '#10b981';
      pulseClass = 'pulse-green';
    } else if (priority === 'critical') {
      color = '#ef4444';
      pulseClass = 'pulse-red';
    } else if (priority === 'high') {
      color = '#f97316';
      pulseClass = 'pulse-orange';
    }

    const size = isSelected ? 40 : 32;
    const innerSize = isSelected ? 'h-5 w-5 border-4' : 'h-4 w-4 border-2';
    const highlightRing = isSelected ? 'border-blue-400 border-2 scale-125 z-40' : '';

    return L.divIcon({
      className: `custom-issue-icon ${highlightRing}`,
      html: `
        <div class="relative flex items-center justify-center" style="width: ${size}px; height: ${size}px;">
          <span class="absolute inline-flex w-7 h-7 rounded-full opacity-70 ${pulseClass}"></span>
          <span class="relative inline-flex rounded-full ${innerSize} bg-slate-950 border-white shadow-xl" style="background-color: ${color}"></span>
        </div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  };

  const getPOIIcon = (type: 'hospital' | 'police' | 'shelter') => {
    let emoji = '🏥';
    let bgColor = 'bg-red-600';
    let borderColor = 'border-red-400';
    if (type === 'police') {
      emoji = '👮';
      bgColor = 'bg-blue-600';
      borderColor = 'border-blue-400';
    } else if (type === 'shelter') {
      emoji = '🔥';
      bgColor = 'bg-amber-600';
      borderColor = 'border-amber-400';
    }

    return L.divIcon({
      className: `custom-poi-icon-${type}`,
      html: `
        <div class="flex items-center justify-center w-7 h-7 rounded-xl ${bgColor} border ${borderColor} text-white shadow-lg text-xs font-bold font-sans">
          ${emoji}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
  };

  // Get current user live geolocation
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (isValidLatLng(latitude, longitude)) {
          setUserLocation({ lat: latitude, lng: longitude });
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 14, { animate: true });
          }
        }
        setIsLocating(false);
      },
      (error) => {
        console.warn("Geolocation failed or denied, using core coordinates:", error);
        setIsLocating(false);
        // Alert user softly
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  // Osm Nominatim Geocoding API
  const handleGeocodingSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
        setShowSearchResults(data.length > 0);
      }
    } catch (err) {
      console.error("Geocoding fetch failed:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Use CartoDB Dark Matter tile layer for an elegant futuristic design
    // Centering the map on India (coordinates 20.5937, 78.9629) with view level 5 by default
    const map = L.map(mapContainerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20
    }).addTo(map);

    // Click handler to select coordinates for reporting
    map.on('click', (e) => {
      if (e.latlng && isValidLatLng(e.latlng.lat, e.latlng.lng)) {
        onSelectCoordinates(e.latlng.lat, e.latlng.lng);
      }
    });

    const handleMoveStart = () => {
      isMovingRef.current = true;
    };

    const handleMoveEnd = () => {
      isMovingRef.current = false;
      const bounds = map.getBounds();
      if (onBoundsChangeRef.current) {
        onBoundsChangeRef.current({
          west: bounds.getWest(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          north: bounds.getNorth(),
        });
      }
    };

    const handleZoomStart = () => {
      isMovingRef.current = true;
    };

    const handleZoomEnd = () => {
      isMovingRef.current = false;
    };

    map.on('movestart', handleMoveStart);
    map.on('moveend', handleMoveEnd);
    map.on('zoomstart', handleZoomStart);
    map.on('zoomend', handleZoomEnd);

    // Layer group to manage all overlay markers/polygons dynamically
    const overlaysGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    overlaysLayerGroupRef.current = overlaysGroup;

    // Trigger initial bounds calculation
    setTimeout(() => {
      handleMoveEnd();
    }, 300);

    // Try to trigger geolocation on load immediately for live experience
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          if (isValidLatLng(latitude, longitude)) {
            setUserLocation({ lat: latitude, lng: longitude });
            map.setView([latitude, longitude], 13);
          }
          handleMoveEnd();
        },
        (error) => {
          console.warn("Geolocation permission denied or timed out. Defaulting to India view.", error);
          handleMoveEnd();
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      handleMoveEnd();
    }

    return () => {
      map.off('movestart', handleMoveStart);
      map.off('moveend', handleMoveEnd);
      map.off('zoomstart', handleZoomStart);
      map.off('zoomend', handleZoomEnd);
      map.remove();
      mapInstanceRef.current = null;
      overlaysLayerGroupRef.current = null;
    };
  }, []);

  // Update Map Layers whenever states or props change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = overlaysLayerGroupRef.current;
    if (!map || !group) return;

    // If the map is currently moving/zooming/animating, defer the overlay update
    const isMapAnimating = isMovingRef.current || (map as any)._animating || (map as any)._zooming || (typeof (map as any).isAnimating === 'function' && (map as any).isAnimating());
    if (isMapAnimating) {
      const handleDeferredUpdate = () => {
        map.off('moveend', handleDeferredUpdate);
        map.off('zoomend', handleDeferredUpdate);
        setUpdateTrigger(prev => prev + 1);
      };
      map.on('moveend', handleDeferredUpdate);
      map.on('zoomend', handleDeferredUpdate);
      return () => {
        map.off('moveend', handleDeferredUpdate);
        map.off('zoomend', handleDeferredUpdate);
      };
    }

    const currentMap = map;
    const currentGroup = group;

    // Clear previous items from overlays group
    currentGroup.clearLayers();

    // 1. Add User Location Marker
    if (userLocation && isValidLatLng(userLocation.lat, userLocation.lng)) {
      const uMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: getLiveLocationIcon()
      });
      uMarker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>Your Location</b><br/>Ready for local dispatch reporting</div>`);
      currentGroup.addLayer(uMarker);
    }

      // 1b. Add Locked Prefilled Coordinate Marker (Coordinates Locking System)
      if (prefilledCoords && isValidLatLng(prefilledCoords.lat, prefilledCoords.lng)) {
        const lockMarker = L.marker([prefilledCoords.lat, prefilledCoords.lng], {
          icon: getLockIcon()
        });
        lockMarker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>🔒 Location Locked</b><br/>Ready to report issue here:<br/>${prefilledCoords.lat.toFixed(5)}, ${prefilledCoords.lng.toFixed(5)}</div>`);
        currentGroup.addLayer(lockMarker);
      }

      // 1c. Add Verification Location and scan zone (Verify Mode)
      if (interactionMode === 'verify' && verifyLocation && isValidLatLng(verifyLocation.lat, verifyLocation.lng)) {
        const verifyMarker = L.marker([verifyLocation.lat, verifyLocation.lng], {
          icon: getVerifyIcon()
        });
        const popupText = verifyLocation.type === 'state'
          ? `<b>🔍 State Region Selected</b><br/>Verifying issues in ${verifyLocation.name}`
          : `<b>🔍 Street Selected</b><br/>Verifying issues around ${verifyLocation.name}`;
        verifyMarker.bindPopup(`<div class="text-slate-900 text-xs font-sans">${popupText}</div>`);
        currentGroup.addLayer(verifyMarker);

        const verifyCircle = L.circle([verifyLocation.lat, verifyLocation.lng], {
          radius: 1200,
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.12,
          weight: 1.5,
          dashArray: '4, 4'
        });
        currentGroup.addLayer(verifyCircle);
      }

      // 2. Add Hospitals and Police Stations
      if (hospitalsEnabled) {
        ALL_HOSPITALS.forEach(h => {
          if (isValidLatLng(h.lat, h.lng)) {
            const marker = L.marker([h.lat, h.lng], { icon: getPOIIcon('hospital') });
            const locName = getLocalizedEmergencyCenterName(h.name, langCode);
            const locDetail = getLocalizedDetailOrCapacity(h.detail, langCode);
            marker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>🏥 ${locName}</b><br/>${locDetail}</div>`);
            currentGroup.addLayer(marker);
          }
        });
      }

      if (policeEnabled) {
        ALL_POLICE_STATIONS.forEach(p => {
          if (isValidLatLng(p.lat, p.lng)) {
            const marker = L.marker([p.lat, p.lng], { icon: getPOIIcon('police') });
            const locName = getLocalizedEmergencyCenterName(p.name, langCode);
            const locDetail = getLocalizedDetailOrCapacity(p.detail, langCode);
            marker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>👮 ${locName}</b><br/>${locDetail}</div>`);
            currentGroup.addLayer(marker);
          }
        });
      }

      // 3. Add Emergency Shelters
      if (sheltersEnabled) {
        ALL_SHELTERS.forEach(s => {
          if (isValidLatLng(s.lat, s.lng)) {
            const marker = L.marker([s.lat, s.lng], { icon: getPOIIcon('shelter') });
            const locName = getLocalizedEmergencyCenterName(s.name, langCode);
            const locCapacity = getLocalizedDetailOrCapacity(s.capacity, langCode);
            const locContact = getLocalizedDetailOrCapacity(s.contact, langCode);
            marker.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>🔥 ${locName}</b><br/>${ml.capacity || 'Capacity'}: ${locCapacity}<br/>${ml.contact || 'Contact'}: ${locContact}</div>`);
            currentGroup.addLayer(marker);
          }
        });
      }

      // 4. Draw Flood Zones
      if (floodZonesEnabled) {
        ALL_FLOOD_ZONES.forEach(f => {
          if (isValidLatLng(f.lat, f.lng)) {
            const circle = L.circle([f.lat, f.lng], {
              radius: f.radius,
              color: '#3b82f6',
              fillColor: '#1d4ed8',
              fillOpacity: 0.25,
              weight: 1.5,
              dashArray: '4, 4'
            });
            circle.bindPopup(`<div class="text-slate-900 text-xs font-sans"><b>🌊 ${f.name}</b><br/>Risk Level: <span class="text-red-500 font-bold">${f.riskLevel}</span></div>`);
            currentGroup.addLayer(circle);
          }
        });
      }

      // 5. Draw Heatmap Mode vs. Normal Civic Issue Markers
      if (heatmapEnabled) {
        issues.forEach(issue => {
          if (isValidLatLng(issue.lat, issue.lng)) {
            // Overlay a glowing warm radius zone for density representation
            const heatCircle = L.circle([issue.lat, issue.lng], {
              radius: 200,
              stroke: false,
              fillColor: issue.priority === 'critical' ? '#ef4444' : issue.priority === 'high' ? '#f97316' : '#eab308',
              fillOpacity: 0.35,
            });
            currentGroup.addLayer(heatCircle);
          }
        });
      } else {
        // Normal interactive markers
        issues.forEach(issue => {
          if (isValidLatLng(issue.lat, issue.lng)) {
            const isSelected = selectedIssue?.id === issue.id;
            const marker = L.marker([issue.lat, issue.lng], {
              icon: getIssueIcon(issue.priority, issue.status || 'open', isSelected)
            });
            
            // Listen to marker selection
            marker.on('click', (e) => {
              if (e.originalEvent) {
                L.DomEvent.stopPropagation(e.originalEvent);
              }
              // Delay state update slightly to let Leaflet finish its event propagation cycle cleanly
              setTimeout(() => {
                onSelectIssue(issue);
              }, 100);
            });

            currentGroup.addLayer(marker);
          }
        });
      }

      // 6. Nearest Safe Location Route Guidance
      if (routeEnabled && userLocation && isValidLatLng(userLocation.lat, userLocation.lng)) {
        // Find the absolute nearest Shelter or Hospital to current user position
        const safeHavens = [
          ...ALL_SHELTERS.map(s => ({ name: s.name, lat: s.lat, lng: s.lng, desc: "Emergency Shelter" })),
          ...ALL_HOSPITALS.map(h => ({ name: h.name, lat: h.lat, lng: h.lng, desc: "Medical Trauma HQ" }))
        ].filter(h => isValidLatLng(h.lat, h.lng));

        let nearest: typeof safeHavens[0] | null = null;
        let minDistance = Infinity;

        safeHavens.forEach(haven => {
          const dist = Math.sqrt(Math.pow(userLocation.lat - haven.lat, 2) + Math.pow(userLocation.lng - haven.lng, 2));
          if (dist < minDistance) {
            minDistance = dist;
            nearest = haven;
          }
        });

        if (nearest) {
          const dest: typeof safeHavens[0] = nearest;
          if (isValidLatLng(dest.lat, dest.lng)) {
            // Draw simulated safe path grid (makes parallel/perpendicular turn coordinates)
            const latMid = userLocation.lat;
            const lngMid = dest.lng;

            const pathCoords: L.LatLngExpression[] = [
              [userLocation.lat, userLocation.lng],
              [latMid, lngMid],
              [dest.lat, dest.lng]
            ];

            const polyline = L.polyline(pathCoords, {
              color: '#60a5fa',
              weight: 4,
              opacity: 0.9,
              dashArray: '5, 8',
              lineCap: 'round',
              lineJoin: 'round',
            });

            currentGroup.addLayer(polyline);

            // Highlight marker for the target destination
            const destinationPulse = L.circle([dest.lat, dest.lng], {
              radius: 80,
              color: '#10b981',
              fillColor: '#059669',
              fillOpacity: 0.45,
              weight: 2
            });
            currentGroup.addLayer(destinationPulse);

            // Calculate metadata for user routing panel
            const rawDistKm = (minDistance * 111).toFixed(2); // roughly 111 km per degree lat
            const calculatedTimeMin = Math.round(minDistance * 111 * 12); // walking: ~12 min per km

            const localizedDestName = getLocalizedEmergencyCenterName(dest.name, langCode);
            const localizedDescName = getLocalizedDetailOrCapacity(dest.desc, langCode);
            const rawTimeStr = langCode === 'hi-IN' ? `${calculatedTimeMin} मिनट (पैदल)` :
                               langCode === 'bn-IN' ? `${calculatedTimeMin} মিনিট (হেঁটে)` :
                               langCode === 'gu-IN' ? `${calculatedTimeMin} મિનિટ (પગપાળા)` :
                               langCode === 'kn-IN' ? `${calculatedTimeMin} ನಿಮಿಷಗಳು (ನಡಿಗೆ)` :
                               langCode === 'ml-IN' ? `${calculatedTimeMin} മിനിറ്റ് (നടത്തം)` :
                               langCode === 'mr-IN' ? `${calculatedTimeMin} मिनिटे (चालणे)` :
                               langCode === 'ta-IN' ? `${calculatedTimeMin} நிமிடங்கள் (நடைபயணம்)` :
                               langCode === 'te-IN' ? `${calculatedTimeMin} నిమిషాలు (నడక)` :
                               langCode === 'ur-IN' ? `${calculatedTimeMin} منٹ (پیدل)` :
                               `${calculatedTimeMin} mins (walking)`;

            setRouteDetails({
              destinationName: localizedDestName,
              distance: `${rawDistKm} KM`,
              time: rawTimeStr,
              steps: [
                `${ml.departFromCoords || 'Depart from your current live coordinates.'}`,
                `${ml.headEastStep || 'Head East along low-risk pedestrian zones'} (${Math.round(minDistance * 111 * 400)}m).`,
                `${ml.turnParallelStep || 'Turn onto parallel safety corridor corridor near'} ${dest.lng.toFixed(4)}.`,
                `${ml.slightAdvanceStep || 'Slight advance northwards avoiding flood risk zones.'}`,
                `${ml.arriveSafelyStep || 'Arrive safely at'} ${localizedDestName} (${localizedDescName}).`
              ]
            });

            // Automatically fly bounds to encompass whole escape route
            const bounds = L.latLngBounds([
              [userLocation.lat, userLocation.lng],
              [dest.lat, dest.lng]
            ]);
            currentMap.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
          }
        }
      } else {
        setRouteDetails(null);
      }
  }, [
    issues, selectedIssue, userLocation, 
    hospitalsEnabled, policeEnabled, sheltersEnabled, 
    floodZonesEnabled, heatmapEnabled, routeEnabled,
    prefilledCoords, updateTrigger
  ]);

  // Handle selected issue fly to map effect to fit both issue & nearby emergency centers
  useEffect(() => {
    if (selectedIssue && isValidLatLng(selectedIssue.lat, selectedIssue.lng) && mapInstanceRef.current) {
      const centers = [
        ...ALL_HOSPITALS,
        ...ALL_POLICE_STATIONS,
        ...ALL_SHELTERS
      ].filter(c => isValidLatLng(c.lat, c.lng))
       .map(c => {
         const dist = Math.sqrt(Math.pow(c.lat - selectedIssue.lat, 2) + Math.pow(c.lng - selectedIssue.lng, 2)) * 111;
         return { ...c, dist };
       }).filter(c => c.dist < 25)
         .sort((a, b) => a.dist - b.dist)
         .slice(0, 3);

      if (centers.length > 0) {
        const points: L.LatLngExpression[] = [
          [selectedIssue.lat, selectedIssue.lng],
          ...centers.map(c => [c.lat, c.lng] as L.LatLngExpression)
        ];
        const bounds = L.latLngBounds(points);
        mapInstanceRef.current.flyToBounds(bounds, {
          padding: [60, 60],
          duration: 1.2
        });
      } else {
        mapInstanceRef.current.setView([selectedIssue.lat, selectedIssue.lng], 14, {
          animate: true,
          duration: 1
        });
      }
    }
  }, [selectedIssue]);

  // Handle prefilledCoords fly to map effect
  useEffect(() => {
    if (prefilledCoords && isValidLatLng(prefilledCoords.lat, prefilledCoords.lng) && mapInstanceRef.current) {
      mapInstanceRef.current.setView([prefilledCoords.lat, prefilledCoords.lng], 15, {
        animate: true,
        duration: 1
      });
    }
  }, [prefilledCoords]);

  // Handle verifyLocation fly to map effect (Verify Mode)
  useEffect(() => {
    if (interactionMode === 'verify' && verifyLocation && isValidLatLng(verifyLocation.lat, verifyLocation.lng) && mapInstanceRef.current) {
      mapInstanceRef.current.setView([verifyLocation.lat, verifyLocation.lng], 14, {
        animate: true,
        duration: 1
      });
    }
  }, [verifyLocation, interactionMode]);

  const handleZoom = (factor: number) => {
    if (mapInstanceRef.current) {
      const current = mapInstanceRef.current.getZoom();
      mapInstanceRef.current.setZoom(factor > 1 ? current + 1 : current - 1);
    }
  };

  const resetMap = () => {
    if (mapInstanceRef.current) {
      if (userLocation) {
        mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 13, { animate: true });
      } else {
        mapInstanceRef.current.setView([20.5937, 78.9629], 5, { animate: true });
      }
    }
  };

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex flex-col md:flex-row">
      
      {/* Left side Map Container */}
      <div className="relative flex-1 h-full min-h-[300px]">
        
        {/* Nominatim OSM Geocoding Search Bar Overlay */}
        <div className="absolute top-4 left-4 z-10 w-80 max-w-[calc(100%-2rem)] flex flex-col gap-1.5">
          <form onSubmit={handleGeocodingSearch} className="flex items-center gap-1.5 backdrop-blur-md bg-slate-900/80 border border-white/15 px-2.5 py-1.5 rounded-2xl shadow-xl">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder={ml.searchPlaceholder} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-sans text-white border-none focus:outline-none flex-1 placeholder:text-slate-500 outline-none"
            />
            <button 
              type="submit" 
              className="p-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-sans font-bold text-[10px] transition shrink-0"
              disabled={isSearching}
            >
              {isSearching ? '...' : ml.search}
            </button>
          </form>

          {/* Search Results Drawer */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="backdrop-blur-xl bg-slate-900/95 border border-white/10 rounded-2xl p-2 shadow-2xl max-h-[160px] overflow-y-auto flex flex-col gap-1 z-50">
              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400 uppercase px-1 border-b border-white/5 pb-1">
                <span>{ml.searchResults}</span>
                <button onClick={() => setShowSearchResults(false)} className="text-red-400 hover:text-red-300">{ml.close}</button>
              </div>
              {searchResults.map((result, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const lat = parseFloat(result.lat);
                    const lng = parseFloat(result.lon);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([lat, lng], 15, { animate: true });
                      onSelectCoordinates(lat, lng);
                    }
                    setShowSearchResults(false);
                  }}
                  className="w-full text-left text-[11px] py-1.5 px-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition truncate font-sans"
                >
                  📍 {result.display_name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Map Canvas container */}
        <div 
          ref={mapContainerRef} 
          id="leaflet-map-element" 
          className="w-full h-full bg-[#0a0f1d] z-0 cursor-grab active:cursor-grabbing"
        ></div>

        {/* Floating Quick Action Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button 
            onClick={handleLocateUser}
            className={`p-2.5 rounded-xl glass-btn text-slate-300 hover:text-blue-400 shadow-xl flex items-center justify-center ${isLocating ? 'animate-spin border-blue-500 text-blue-400' : ''}`}
            title={ml.myLiveGeolocation}
          >
            <Compass className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleZoom(1.2)}
            className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-blue-400 shadow-xl"
            title={ml.zoomIn}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleZoom(0.8)}
            className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-blue-400 shadow-xl"
            title={ml.zoomOut}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={resetMap}
            className="p-2.5 rounded-xl glass-btn text-slate-300 hover:text-blue-400 shadow-xl"
            title={ml.recenterCityCenter}
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Floating selected issue overlay */}
        {selectedIssue && (
          <div className="absolute bottom-4 left-4 z-10 w-76 glass-panel-dark text-white border border-white/10 p-3.5 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300 max-h-[160px] overflow-y-auto">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[9px] uppercase tracking-wider font-mono text-blue-300 bg-blue-950/40 px-1.5 py-0.5 rounded border border-blue-900/30">
                {selectedIssue.category}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  (onSelectIssue as any)(null);
                }}
                className="text-white/60 hover:text-white text-[10px] px-1.5 py-0.5 bg-white/5 hover:bg-white/10 rounded transition"
              >
                {ml.close}
              </button>
            </div>
            <h4 className="font-display font-bold text-xs mb-0.5 text-white">{selectedIssue.title}</h4>
            <p className="text-[11px] text-slate-300 leading-tight mb-2 line-clamp-2">{selectedIssue.description}</p>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/15 p-1.5 rounded-lg text-[10px] flex items-start gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <p className="text-slate-300 italic line-clamp-2">
                "{selectedIssue.aiSummary || `${t.aiInvestigation || 'AI'}...`}"
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Right side Safety layers toggle drawer & Route Guidance details */}
      <div className="w-full md:w-76 border-t md:border-t-0 md:border-l border-white/10 backdrop-blur-lg bg-slate-950/80 p-4.5 flex flex-col gap-4 z-10 overflow-y-auto h-[240px] md:h-full">
        <div>
          <h3 className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            {ml.safetyLayersControl}
          </h3>
          <p className="text-[10px] text-slate-500 leading-relaxed mb-3">{ml.safetyLayersDescription}</p>
          
          <div className="flex flex-col gap-2">
            
            <button 
              onClick={() => setHospitalsEnabled(!hospitalsEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${hospitalsEnabled ? 'bg-red-500/10 border-red-500/30 text-red-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <Heart className={`w-3.5 h-3.5 ${hospitalsEnabled ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
                {ml.hospitalsTrauma}
              </span>
              <span className="text-[9px] font-mono">{hospitalsEnabled ? ml.active : ml.off}</span>
            </button>

            <button 
              onClick={() => setPoliceEnabled(!policeEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${policeEnabled ? 'bg-blue-500/10 border-blue-500/30 text-blue-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-blue-400" />
                {ml.policeHeadquarters}
              </span>
              <span className="text-[9px] font-mono">{policeEnabled ? ml.active : ml.off}</span>
            </button>

            <button 
              onClick={() => setSheltersEnabled(!sheltersEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${sheltersEnabled ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                {ml.emergencyShelters}
              </span>
              <span className="text-[9px] font-mono">{sheltersEnabled ? ml.active : ml.off}</span>
            </button>

            <button 
              onClick={() => setFloodZonesEnabled(!floodZonesEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${floodZonesEnabled ? 'bg-sky-500/10 border-sky-500/30 text-sky-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-sky-400" />
                {ml.floodRiskZones}
              </span>
              <span className="text-[9px] font-mono">{floodZonesEnabled ? ml.active : ml.off}</span>
            </button>

            <button 
              onClick={() => setHeatmapEnabled(!heatmapEnabled)}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition ${heatmapEnabled ? 'bg-purple-500/15 border-purple-500/30 text-purple-200' : 'bg-white/5 border-white/10 text-slate-400'}`}
            >
              <span className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-purple-400" />
                {ml.issueDensityHeatmap}
              </span>
              <span className="text-[9px] font-mono">{heatmapEnabled ? ml.density : ml.markers}</span>
            </button>

          </div>
        </div>

        {/* Nearby Emergency Centres Section */}
        {selectedIssue && nearbyEmergencyCentres.length > 0 && (
          <div className="border-t border-white/10 pt-3 flex flex-col gap-2">
            <h3 className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              {t.nearbyEmergency}
            </h3>
            <p className="text-[10px] text-slate-500 leading-relaxed mb-1">
              {t.closestDispatch}
            </p>
            <div className="flex flex-col gap-1.5">
              {nearbyEmergencyCentres.map((center) => (
                <div 
                  key={center.id} 
                  className="p-2 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-0.5 hover:bg-white/10 transition cursor-pointer"
                  onClick={() => {
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.setView([center.lat, center.lng], 16, { animate: true });
                    }
                  }}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-white">
                    <span className="truncate">{center.icon} {getLocalizedEmergencyCenterName(center.name, langCode)}</span>
                    <span className="text-[9px] text-rose-400 font-mono shrink-0 ml-1">
                      {center.distance.toFixed(1)} km
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 truncate">
                    {getLocalizedEmergencyCenterName(center.category, langCode)} • {getLocalizedDetailOrCapacity((center as any).detail || (center as any).capacity || t.activeDispatch || 'Active Dispatch', langCode)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safe Escape Route Guidance segment */}
        <div className="border-t border-white/10 pt-3 flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              {ml.safeEscortGuidance}
            </h3>
            <button 
              onClick={() => setRouteEnabled(!routeEnabled)}
              className={`px-2 py-1 rounded-lg text-[9px] font-bold font-mono transition ${routeEnabled ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-slate-300 hover:bg-white/15'}`}
            >
              {routeEnabled ? ml.active : ml.route}
            </button>
          </div>

          {!routeEnabled ? (
            <div className="rounded-xl border border-dashed border-white/5 p-3 text-center text-slate-500 text-[10.5px] leading-relaxed">
              {ml.activateRouteText}
            </div>
          ) : routeDetails ? (
            <div className="flex-1 flex flex-col gap-2 min-h-0">
              <div className="bg-emerald-500/10 border border-emerald-500/25 p-2 rounded-xl">
                <span className="block text-[8px] font-mono text-emerald-400 uppercase font-bold">{ml.nearestSecureFacility}</span>
                <span className="block text-xs font-bold text-white truncate leading-tight">{routeDetails.destinationName}</span>
                <div className="flex gap-2.5 mt-1 text-[10px] font-mono text-slate-400">
                  <span>{ml.dist}: <b>{routeDetails.distance}</b></span>
                  <span>{ml.est}: <b>{routeDetails.time}</b></span>
                </div>
              </div>

              {/* Turn-by-Turn list */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-1.5 pr-1 max-h-[120px] md:max-h-none">
                {routeDetails.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-1.5 items-start text-[10px] text-slate-300 leading-tight">
                    <span className="text-blue-400 font-mono font-bold">{idx + 1}.</span>
                    <p className="flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-slate-400 text-xs text-center p-4">
              {ml.determiningRoute}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
