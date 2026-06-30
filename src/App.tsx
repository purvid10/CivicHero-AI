import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, MapPin, Eye, Info, CheckCircle, Navigation, LayoutDashboard, Send, Award, MessageSquare, Flame, LogOut, Globe, User, ChevronDown, X, AlertCircle } from 'lucide-react';
import { Issue, CitizenProfile, Badge } from './types';
import MapComponent from './components/MapComponent';
import WorkflowDisplay from './components/WorkflowDisplay';
import Leaderboard from './components/Leaderboard';
import ReportForm from './components/ReportForm';
import Chatbot from './components/Chatbot';
import Dashboard from './components/Dashboard';
import { LANGUAGES, TRANSLATIONS } from './translations';
import { INDIAN_SAMPLE_ISSUES } from './data/indiaData';
import { getLocalizedIssue } from './issueTranslations';
import { getLocalizedStateName } from './stateTranslations';
import civicLogo from './assets/images/civichero_logo_1782658605680.jpg';

// Mapping of all 29 Indian States and their capital cities for the Hackathon explorer
const INDIAN_STATES_MAPPING = [
  { id: 'ind-issue-1', state: 'Andhra Pradesh', capital: 'Vijayawada' },
  { id: 'ind-issue-2', state: 'Arunachal Pradesh', capital: 'Itanagar' },
  { id: 'ind-issue-3', state: 'Assam', capital: 'Guwahati' },
  { id: 'ind-issue-4', state: 'Bihar', capital: 'Patna' },
  { id: 'ind-issue-5', state: 'Chhattisgarh', capital: 'Raipur' },
  { id: 'ind-issue-6', state: 'Goa', capital: 'Panaji' },
  { id: 'ind-issue-7', state: 'Gujarat', capital: 'Ahmedabad' },
  { id: 'ind-issue-8', state: 'Haryana', capital: 'Gurugram' },
  { id: 'ind-issue-9', state: 'Himachal Pradesh', capital: 'Shimla' },
  { id: 'ind-issue-10', state: 'Jharkhand', capital: 'Ranchi' },
  { id: 'ind-issue-11', state: 'Karnataka', capital: 'Bengaluru' },
  { id: 'ind-issue-12', state: 'Kerala', capital: 'Kochi' },
  { id: 'ind-issue-13', state: 'Madhya Pradesh', capital: 'Bhopal' },
  { id: 'ind-issue-14', state: 'Maharashtra', capital: 'Mumbai' },
  { id: 'ind-issue-15', state: 'Manipur', capital: 'Imphal' },
  { id: 'ind-issue-16', state: 'Meghalaya', capital: 'Shillong' },
  { id: 'ind-issue-17', state: 'Mizoram', capital: 'Aizawl' },
  { id: 'ind-issue-18', state: 'Nagaland', capital: 'Kohima' },
  { id: 'ind-issue-19', state: 'Odisha', capital: 'Bhubaneswar' },
  { id: 'ind-issue-20', state: 'Punjab', capital: 'Amritsar' },
  { id: 'ind-issue-21', state: 'Rajasthan', capital: 'Jaipur' },
  { id: 'ind-issue-22', state: 'Sikkim', capital: 'Gangtok' },
  { id: 'ind-issue-23', state: 'Tamil Nadu', capital: 'Chennai' },
  { id: 'ind-issue-24', state: 'Telangana', capital: 'Hyderabad' },
  { id: 'ind-issue-25', state: 'Tripura', capital: 'Agartala' },
  { id: 'ind-issue-26', state: 'Uttar Pradesh', capital: 'Lucknow' },
  { id: 'ind-issue-27', state: 'Uttarakhand', capital: 'Dehradun' },
  { id: 'ind-issue-28', state: 'West Bengal', capital: 'Kolkata' },
  { id: 'ind-issue-29', state: 'Delhi / NCR', capital: 'New Delhi' }
];

// Initial preseeded high-fidelity issues centered around Metro Heights (SF coordinates)
const INITIAL_ISSUES: Issue[] = [
  {
    id: 'issue-1',
    title: 'Severe Pavement Crater',
    category: 'Potholes',
    description: 'A deep, jagged asphalt collapse blocking the left traffic lane immediately after the bridge. Major danger to vehicles.',
    priority: 'critical',
    status: 'prioritized',
    lat: 37.7850,
    lng: -122.4220,
    upvotes: 42,
    downvotes: 2,
    verificationCount: 15,
    reportedBy: 'Manvi Srivastav',
    reportedAt: '2026-06-22, 10:14 AM',
    imageUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=400',
    aiSummary: 'Critical roadway fissure identified. Deep sub-surface erosion detected. High safety hazard index calculated.',
    aiImpactScore: 88,
    aiPreventionInsight: 'Urgent. Post-rain moisture expansion will multiply asphalt structural degradation by 300% within 48 hours.',
    aiResolutionRecommendation: 'Deploy tactical paving patch crew with heavy asphalt sealer within 12 hours. Set flashing alert beacons.',
    authorityAssigned: 'Department of Urban Paving',
    timeline: [
      { status: 'reported', timestamp: '10:14 AM', title: 'Incident Created', description: 'Citizen Manvi Srivastav reported deep pothole with attachments.' },
      { status: 'investigating', timestamp: '10:15 AM', title: 'Autonomous AI Dispatch', description: 'Geo Intelligence Agent verified location index & mapped boundaries.' },
      { status: 'verified', timestamp: '10:20 AM', title: 'Community Consensus Approved', description: 'Reached 10+ witness audits. Escalating priority.' },
      { status: 'prioritized', timestamp: '10:22 AM', title: 'Urgency Calculated', description: 'Prioritization Agent assigned CRITICAL rating with 88 Impact Score.' }
    ]
  },
  {
    id: 'issue-2',
    title: 'Pressurized Curb Gush',
    category: 'Water Leakage',
    description: 'Clean drinking water is bubbling up aggressively through the concrete curb seam, flooding the public bike path.',
    priority: 'high',
    status: 'assigned',
    lat: 37.7720,
    lng: -122.4080,
    upvotes: 28,
    downvotes: 1,
    verificationCount: 8,
    reportedBy: 'Eva Mishra',
    reportedAt: '2026-06-23, 08:35 AM',
    imageUrl: 'https://images.unsplash.com/photo-1542013936693-8848e5742383?auto=format&fit=crop&q=80&w=400',
    aiSummary: 'Clean water distribution pipe failure. Fluid velocity indicates 12 GPM continuous loss. Flooding localized trail sectors.',
    aiImpactScore: 72,
    aiPreventionInsight: 'Continuous curb water runoff weakens road bed sub-soils, elevating long-term sinkhole probability on adjacent lane.',
    aiResolutionRecommendation: 'Mobilize sub-surface acoustic leak detection team. Isolate main utility valve 4B and excavate curb seam.',
    authorityAssigned: 'Water Supply & Sewage Division',
    timeline: [
      { status: 'reported', timestamp: '08:35 AM', title: 'Water Leak Logged', description: 'Citizen Eva Mishra reported localized pressurized curb flooding.' },
      { status: 'investigating', timestamp: '08:40 AM', title: 'Leak Core Triaged', description: 'Geo Intelligence Agent matched coordinates against water pipeline schematics.' },
      { status: 'verified', timestamp: '09:00 AM', title: 'consensus validated', description: '8 community witnesses verified witness report.' },
      { status: 'prioritized', timestamp: '09:05 AM', title: 'High Priority Logged', description: 'Dynamic priority algorithm marked HIGH urgency.' },
      { status: 'assigned', timestamp: '09:12 AM', title: 'Water Crew Dispatched', description: 'Resolution recommendation drafted. Job delegated to Water Supply Board.' }
    ]
  },
  {
    id: 'issue-3',
    title: 'Non-functional Sodium Luminary',
    category: 'Damaged Streetlights',
    description: 'Street light pole number SL-402 is completely unlit. The entire block is pitch black, making pedestrian crossings unsafe.',
    priority: 'medium',
    status: 'investigating',
    lat: 37.7910,
    lng: -122.4350,
    upvotes: 15,
    downvotes: 0,
    verificationCount: 4,
    reportedBy: 'Siddharth Nair',
    reportedAt: '2026-06-23, 09:15 PM',
    imageUrl: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&q=80&w=400',
    aiSummary: 'Single-luminary outage in high-density residential zone. Reduced visual capability reported by local residents.',
    aiImpactScore: 54,
    aiPreventionInsight: 'Unlit corridors increase pedestrian crossing risk indexes by 140% during late-night commuter intervals.',
    aiResolutionRecommendation: 'Replace bulb with smart 80W LED node. Verify photo-sensor feedback control circuits on next maintenance cycle.',
    authorityAssigned: 'Municipal Lighting Division',
    timeline: [
      { status: 'reported', timestamp: '09:15 PM', title: 'Outage Logged', description: 'Citizen Siddharth Nair logged single-light outage on active corner.' },
      { status: 'investigating', timestamp: '09:20 PM', title: 'Acoustic/Photo Triage', description: 'Geo Intelligence Agent verified coordinate node mapping SL-402.' }
    ]
  },
  {
    id: 'issue-4',
    title: 'Illegal Industrial Dump',
    category: 'Waste Management',
    description: 'Three large commercial chemical barrels dumped overnight on the public grass strip next to the park. Highly toxic odor.',
    priority: 'critical',
    status: 'reported',
    lat: 37.7650,
    lng: -122.4310,
    upvotes: 35,
    downvotes: 0,
    verificationCount: 9,
    reportedBy: 'Rishab',
    reportedAt: '2026-06-24, 07:45 AM',
    aiSummary: 'Hazardous chemical disposal in eco-sensitive green zone. Volatile compound signature indicated. Bio-protection team needed.',
    aiImpactScore: 92,
    aiPreventionInsight: 'Subsurface chemical runoff will contaminate park play-soil ecosystems and storm-drain runoffs within 24 hours.',
    aiResolutionRecommendation: 'Dispatch municipal Hazmat disposal squad. Secure area 20-meter perimeter and request police security review.',
    authorityAssigned: 'Sanitation Board & Environmental Safety',
    timeline: [
      { status: 'reported', timestamp: '07:45 AM', title: 'Hazmat Dump Reported', description: 'Citizen Rishab reported commercial barrels dumped next to park.' }
    ]
  },
  {
    id: 'issue-5',
    title: 'Damaged Public Guardrail',
    category: 'Public Infrastructure',
    description: 'The steel safety guardrail alongside the busy transit terminal curve is severely bent and loose. Poses barrier risk.',
    priority: 'resolved',
    status: 'resolved',
    lat: 37.7590,
    lng: -122.4110,
    upvotes: 19,
    downvotes: 1,
    verificationCount: 11,
    reportedBy: 'David',
    reportedAt: '2026-06-21, 11:30 AM',
    aiSummary: 'Structural guide-rail fracture. Deflective security barrier compromised on primary high-volume curve.',
    aiImpactScore: 68,
    aiPreventionInsight: 'A compromised curve barrier will fail completely during secondary impact, resulting in high passenger risk.',
    aiResolutionRecommendation: 'Excavate compromised support stanchions. Install modular steel crash rails and anchor with high-tensile bolts.',
    authorityAssigned: 'Public Works Department',
    timeline: [
      { status: 'reported', timestamp: '11:30 AM', title: 'Barrier Compromise Reported', description: 'David reported fractured curve safety rail.' },
      { status: 'investigating', timestamp: '11:35 AM', title: 'Triage & Duplicate Check', description: 'Geo Intelligence Agent mapped incident near transit terminal.' },
      { status: 'verified', timestamp: '12:00 PM', title: 'Witness consensus achieved', description: '11 citizens validated report.' },
      { status: 'prioritized', timestamp: '12:05 PM', title: 'High Priority Logged', description: 'Dynamic algorithms designated priority score 68.' },
      { status: 'assigned', timestamp: '12:15 PM', title: 'Excavation Job Delegated', description: 'Delegated task with custom steel work specs to Public Works.' },
      { status: 'resolving', timestamp: '02:00 PM', title: 'Excavation In Progress', description: 'Contractor team excavated anchor points.' },
      { status: 'resolved', timestamp: '04:30 PM', title: 'Excavation Complete', description: 'Support anchors re-cemented. Crash barriers replaced. Job signed off.' }
    ]
  }
];

const ALL_INITIAL_ISSUES: Issue[] = [...INDIAN_SAMPLE_ISSUES, ...INITIAL_ISSUES];

const getBadgesForStats = (reports: number, verifications: number, points: number) => {
  const badges = [];
  if (reports >= 3) {
    badges.push({ id: 'b1', name: 'Community Reporter', icon: '🏅', description: 'Reported 3+ verified local issues successfully.' });
  }
  if (verifications >= 5) {
    badges.push({ id: 'b2', name: 'Issue Verifier', icon: '🛡️', description: 'Personally verified 5+ civic incidents.' });
  }
  if (points >= 200) {
    badges.push({ id: 'b3', name: 'Power Hero', icon: '⚡', description: 'Earned 200+ points by taking action.' });
  }
  if (reports >= 10) {
    badges.push({ id: 'b4', name: 'Legend Activist', icon: '👑', description: 'Filed 10+ civic reports for our city.' });
  }
  return badges;
};

const MODE_TRANSLATIONS: Record<string, {
  title: string;
  verifyMode: string;
  verifyDesc: string;
  reportMode: string;
  reportDesc: string;
  gpsLocating: string;
  gpsSuccess: string;
  gpsError: string;
}> = {
  'en-US': {
    title: "INTERACTION MODE",
    verifyMode: "Verify Mode",
    verifyDesc: "Verify reported environmental & infrastructure issues around selected state / street.",
    reportMode: "Report Mode",
    reportDesc: "Report a new incident by pinning your live GPS coordinates on the map.",
    gpsLocating: "Locating you... checking high-accuracy GPS coordinates...",
    gpsSuccess: "Live coordinates locked and placed on map successfully!",
    gpsError: "Could not retrieve live coordinates. Drag/double-click map manually."
  },
  'hi-IN': {
    title: "कार्रवाई मोड",
    verifyMode: "सत्यापन मोड",
    verifyDesc: "मानचित्र पर चयनित राज्य या सड़क के आसपास की वर्तमान समस्याओं का सत्यापन करें।",
    reportMode: "रिपोर्ट मोड",
    reportDesc: "मानचित्र पर अपने लाइव जीपीएस स्थान का उपयोग करके एक नई समस्या की रिपोर्ट करें।",
    gpsLocating: "जीपीएस निर्देशांक प्राप्त किए जा रहे हैं...",
    gpsSuccess: "लाइव स्थान लॉक और मानचित्र पर सेट किया गया!",
    gpsError: "लाइव स्थान प्राप्त नहीं किया जा सका। मानचित्र पर स्थान मैन्युअल रूप से चुनें।"
  },
  'bn-IN': {
    title: "ইন্টারঅ্যাকশন মোড",
    verifyMode: "যাচাইকরণ মোড",
    verifyDesc: "নির্বাচিত রাজ্য বা রাস্তার আশেপাশে রিপোর্ট করা সমস্যাগুলি যাচাই করুন।",
    reportMode: "রিপোর্ট মোड",
    reportDesc: "মানচিত্রে আপনার লাইভ জিপিএস স্থানাঙ্ক পিন করে একটি নতুন সমস্যা রিপোর্ট করুন।",
    gpsLocating: "লাইভ জিপিএস স্থানাঙ্ক খোঁজা হচ্ছে...",
    gpsSuccess: "লাইভ অবস্থান লক করা হয়েছে এবং মানচিত্রে সফলভাবে সেট করা হয়েছে!",
    gpsError: "লাইভ অবস্থান পাওয়া যায়নি। মানচিত্রে ম্যানুয়ালি অবস্থান নির্বাচন করুন।"
  },
  'gu-IN': {
    title: "ઇન્ટરેક્શન મોડ",
    verifyMode: "ચકાસણી મોડ",
    verifyDesc: "નકશા પર પસંદ કરેલ રાજ્ય અથવા શેરીની આસપાસની સમસ્યાઓની ચકાસણી કરો.",
    reportMode: "રિપોર્ટ મોડ",
    reportDesc: "નકશા પર તમારા લાઇવ જીપીએસ સ્થાનનો ઉપયોગ કરીને નવી સમસ્યાની જાણ કરો.",
    gpsLocating: "લાઇવ જીપીએસ સ્થાન મેળવી રહ્યું છે...",
    gpsSuccess: "લાઇવ સ્થાન લૉક અને નકશા પર સફળતાપૂર્વक સેટ થયું!",
    gpsError: "લાઇવ સ્થાન મેળવી શકાયું નથી. નકશા પર જાતે સ્થાન પસંદ કરો."
  },
  'kn-IN': {
    title: "ಸಂವಹನ ಮೋಡ್",
    verifyMode: "ಪರಿಶೀಲನಾ ಮೋಡ್",
    verifyDesc: "ನಕ್ಷೆಯಲ್ಲಿ ಆಯ್ಕೆಮಾಡಿದ ರಾಜ್ಯ ಅಥವಾ ಬೀದಿಯ ಸುತ್ತಲಿನ ಸಮಸ್ಯೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    reportMode: "ವರದಿ ಮೋಡ್",
    reportDesc: "ನಕ್ಷೆಯಲ್ಲಿ ನಿಮ್ಮ ಲೈವ್ ಜಿಪಿಎಸ್ ಸ್ಥಳವನ್ನು ಪಿన్ ಮಾಡುವ ಮೂಲಕ ಹೊಸ ವರदी ಸಲ್ಲಿಸಿ.",
    gpsLocating: "ಲೈವ್ ಜಿಪಿಎಸ್ ಸ್ಥಳ ಪತ್ತೆ ಮಾಡಲಾಗುತ್ತಿದೆ...",
    gpsSuccess: "ಲೈವ್ ಸ್ಥಳ ಲಾಕ್ ಆಗಿದೆ ಮತ್ತು ನಕ್ಷೆಯಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿ ಹೊಂದಿಸಲಾಗಿದೆ!",
    gpsError: "ಲైవ్ ಸ್ಥಳವನ್ನು ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ನಕ್ಷೆಯಲ್ಲಿ ಹಸ್ತಚಾಲಿತವಾಗಿ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ."
  },
  'ml-IN': {
    title: "ഇന്ററാക്ഷൻ മോഡ്",
    verifyMode: "വെരിഫിക്കേഷൻ മോഡ്",
    verifyDesc: "തിരഞ്ഞെടുത്ത സംസ്ഥാനത്തെ അല്ലെങ്കിൽ തെരുവിലെ നിലവിലുള്ള പ്രശ്നങ്ങൾ പരിശോധിക്കുക.",
    reportMode: "റിപ്പോർട്ട് മോഡ്",
    reportDesc: "മാപ്പിൽ നിങ്ങളുടെ തത്സമയ ജിപിഎസ് ലൊക്കേഷൻ പിൻ ചെയ്ത് പുതിയ റിപ്പോർട്ട് സമർപ്പിക്കുക.",
    gpsLocating: "തത്സമയ ജിപിഎസ് ലൊക്കേഷൻ കണ്ടെത്തുന്നു...",
    gpsSuccess: "തത്സമയ ലൊക്കേഷൻ ലോക്ക് ചെയ്യുകയും മാപ്പിൽ സജ്ജമാക്കുകയും ചെയ്തു!",
    gpsError: "തത്സമയ ലൊക്കേഷൻ ലഭ്യമല്ല. മാപ്പിൽ സ്വയം സ്ഥലം തിരഞ്ഞെടുക്കുക."
  },
  'mr-IN': {
    title: "इंटरअॅक्शन मोड",
    verifyMode: "पडताळणी मोड",
    verifyDesc: "नकाशावर निवडलेल्या राज्य किंवा रस्त्यावरील नागरिकांच्या तक्रारींचे सत्यापन करा.",
    reportMode: "रिपोर्ट मोड",
    reportDesc: "नकाशावर आपल्या थेट जीपीएस स्थानाचा वापर करून नवीन तक्रार दाखल करा.",
    gpsLocating: "थेट जीपीएस स्थान शोधत आहे...",
    gpsSuccess: "थेट स्थान यशस्वीरित्या लॉक केले आणि नकाशावर दाखवले!",
    gpsError: "थेट स्थान मिळवता आले नाही. नकाशावर स्थान स्वतः निवडा."
  },
  'ta-IN': {
    title: "செயல்பாட்டு முறை",
    verifyMode: "சரிபார்ப்பு முறை",
    verifyDesc: "வரைபடத்தில் தேர்ந்தெடுக்கப்பட்ட மாநிலம் அல்லது தெருவில் உள்ள பிரச்சனைகளை சரிபார்க்கவும்.",
    reportMode: "புகார் முறை",
    reportDesc: "வரைபடத்தில் உங்கள் நேரడి ஜிபிஎஸ் இருப்பிடத்தை பயன்படுத்தி புதிய புகாரை பதிவு செய்யவும்.",
    gpsLocating: "நேரடி ஜிபிஎஸ் இருப்பிடத்தை தேடுகிறது...",
    gpsSuccess: "நேரடி இருப்பிடம் வெற்றிகரமாக பூட்டப்பட்டு வரைபடத்தில் காட்டப்பட்டுள்ளது!",
    gpsError: "நேரடி இருப்பிடத்தை பெற முடியவில்லை. வரைபடத்தில் இருப்பிடத்தை கைமுறையாக தேர்ந்தெடுக்கவும்."
  },
  'te-IN': {
    title: "ఇంటరాక్షన్ మోడ్",
    verifyMode: "ధృవీకరణ మోడ్",
    verifyDesc: "మ్యాప్‌లో ఎంచుకున్న రాష్ట్రం లేదా వీధి చుట్టూ ఉన్న సమస్యలను ధృవీకరించండి.",
    reportMode: "రిపోర్ట్ మోడ్",
    reportDesc: "మ్యాప్‌లో మీ ప్రత్యక్ష జీపీఎస్ స్థానాన్ని పిన్ చేయడం ద్వారా కొత్త సమస్యను నివేదించండి.",
    gpsLocating: "ప్రత్యక్ష జీపీఎస్ స్థానాన్ని గుర్తిస్తోంది...",
    gpsSuccess: "ప్రత్యక్ష స్థానం విజయవంతంగా లాక్ చేయబడింది మరియు మ్యాప్‌లో చూపబడింది!",
    gpsError: "ప్రత్యక్ష స్థానాన్ని పొందలేకపోయాము. మ్యాప్‌లో స్థానాన్ని మాన్యువల్‌గా ఎంచుకోండి."
  },
  'ur-IN': {
    title: "انٹرایکشن موڈ",
    verifyMode: "تصدیقی موڈ",
    verifyDesc: "نقشے پر منتخب ریاست یا سڑک کے ارد گرد موجودہ مسائل کی تصدیق کریں۔",
    reportMode: "رپورٹ موڈ",
    reportDesc: "نقشے پر اپنے لائیو جی پی ایس مقام کا استعمال کرتے ہوئے ایک نیا مسئلہ رپورٹ کریں۔",
    gpsLocating: "لائیو جی پی ایس مقام تلاش کیا جا رہا ہے...",
    gpsSuccess: "لائیو مقام لاک ہو گیا اور نقشے پر کامیابی سے دکھا دیا گیا!",
    gpsError: "لائیو مقام حاصل نہیں کیا جا سکا۔ نقشے پر مقام خود منتخب کریں۔"
  }
};

export default function App() {
  const [issues, setIssues] = useState<Issue[]>(ALL_INITIAL_ISSUES);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(ALL_INITIAL_ISSUES[0]);
  const [prefilledCoords, setPrefilledCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [interactionMode, setInteractionMode] = useState<'verify' | 'report'>('verify');
  const [verifyLocation, setVerifyLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
    type: 'state' | 'street';
  } | null>(() => {
    const initial = ALL_INITIAL_ISSUES[0];
    if (initial) {
      return {
        lat: initial.lat,
        lng: initial.lng,
        name: "National Capital Region",
        type: 'state'
      };
    }
    return null;
  });
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsMessage, setGpsMessage] = useState<string | null>(null);

  // Map bounds state for spatial filtering
  const [mapBounds, setMapBounds] = useState<{
    west: number;
    south: number;
    east: number;
    north: number;
  } | null>(null);

  // Language state
  const [langCode, setLangCode] = useState<string>(() => {
    return localStorage.getItem('civic_lang_code') || 'en-US';
  });

  // User session state
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; location: string; systemCoords?: { lat: number; lng: number } } | null>(() => {
    const saved = localStorage.getItem('civic_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        return null;
      }
    }
    return null;
  });

  // Login inputs state
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginLocation, setLoginLocation] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);

  // System geolocation state for login
  const [geoPermissionStatus, setGeoPermissionStatus] = useState<'prompt' | 'requesting' | 'granted' | 'denied'>('prompt');
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [geoAutoDetected, setGeoAutoDetected] = useState<string | null>(null);

  const findNearestState = (lat: number, lng: number) => {
    // Check if we are closer to Metro Heights (SF: 37.7749, -122.4194)
    const distToSF = Math.sqrt(Math.pow(lat - 37.7749, 2) + Math.pow(lng - (-122.4194), 2));
    
    let nearestState = 'Metro Heights';
    let minDistance = distToSF;
    
    INDIAN_SAMPLE_ISSUES.forEach((issue) => {
      // Find matching state name in the mapping
      const match = INDIAN_STATES_MAPPING.find(s => s.id === issue.id);
      if (match) {
        const dist = Math.sqrt(Math.pow(lat - issue.lat, 2) + Math.pow(lng - issue.lng, 2));
        if (dist < minDistance) {
          minDistance = dist;
          nearestState = match.state;
        }
      }
    });
    
    return nearestState;
  };

  const requestSystemLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser");
      setGeoPermissionStatus('denied');
      return;
    }
    
    setGeoPermissionStatus('requesting');
    setGeoError(null);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setGeoCoords({ lat: latitude, lng: longitude });
        setGeoPermissionStatus('granted');
        
        // Find nearest state/sector
        const nearest = findNearestState(latitude, longitude);
        setGeoAutoDetected(nearest);
        setLoginLocation(nearest);
        
        // Also try to query OpenStreetMap Nominatim for a more detailed display name
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`, {
            headers: {
              'Accept-Language': 'en'
            }
          });
          if (res.ok) {
            const data = await res.json();
            if (data && data.address) {
              const state = data.address.state || data.address.state_district || data.address.province;
              const city = data.address.city || data.address.town || data.address.village || data.address.suburb;
              if (state) {
                // Match the state to one of our mapped INDIAN_STATES_MAPPING states if possible
                const matchingState = INDIAN_STATES_MAPPING.find(s => 
                  state.toLowerCase().includes(s.state.toLowerCase()) || 
                  s.state.toLowerCase().includes(state.toLowerCase())
                );
                if (matchingState) {
                  setLoginLocation(matchingState.state);
                  setGeoAutoDetected(`${matchingState.state} (${city || 'Local Sector'})`);
                } else if (state.toLowerCase().includes('california') || state.toLowerCase().includes('san francisco')) {
                  setLoginLocation('Metro Heights');
                  setGeoAutoDetected(`Metro Heights (${city || 'Local Sector'})`);
                } else {
                  setGeoAutoDetected(`${state} (${city || 'Local Sector'})`);
                }
              } else if (city) {
                setGeoAutoDetected(city);
              }
            }
          }
        } catch (e) {
          console.warn("Reverse geocoding fetch failed, fell back to nearest mapped calculations:", e);
        }
      },
      (error) => {
        let msg = "Location access denied by system/browser.";
        if (error.code === error.TIMEOUT) {
          msg = "Location request timed out.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = "Position unavailable from system GPS.";
        }
        setGeoError(msg);
        setGeoPermissionStatus('denied');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Gamified Citizen Profile
  const [profile, setProfile] = useState<CitizenProfile>(() => {
    const savedUser = localStorage.getItem('civic_user');
    let initialUser = null;
    if (savedUser) {
      try {
        initialUser = JSON.parse(savedUser);
      } catch (e) {}
    }
    if (initialUser) {
      const savedProfile = localStorage.getItem(`civic_profile_${initialUser.email}`);
      if (savedProfile) {
        try {
          return JSON.parse(savedProfile);
        } catch (e) {}
      }
      return {
        name: initialUser.name,
        email: initialUser.email,
        level: 1,
        points: 0,
        progressPercent: 0,
        badges: [],
        weeklyReportsCount: 0,
        weeklyVerificationsCount: 0,
        rank: 100
      };
    }
    return {
      name: "Siddharth Nair",
      email: "siddharth@example.com",
      level: 1,
      points: 0,
      progressPercent: 0,
      badges: [],
      weeklyReportsCount: 0,
      weeklyVerificationsCount: 0,
      rank: 100
    };
  });

  // Load/Reset profile when currentUser changes
  useEffect(() => {
    if (currentUser) {
      const savedProfile = localStorage.getItem(`civic_profile_${currentUser.email}`);
      if (savedProfile) {
        try {
          setProfile(JSON.parse(savedProfile));
        } catch (err) {
          setProfile({
            name: currentUser.name,
            email: currentUser.email,
            level: 1,
            points: 0,
            progressPercent: 0,
            badges: [],
            weeklyReportsCount: 0,
            weeklyVerificationsCount: 0,
            rank: 100
          });
        }
      } else {
        setProfile({
          name: currentUser.name,
          email: currentUser.email,
          level: 1,
          points: 0,
          progressPercent: 0,
          badges: [],
          weeklyReportsCount: 0,
          weeklyVerificationsCount: 0,
          rank: 100
        });
      }
    }
  }, [currentUser]);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    if (currentUser && profile && profile.email === currentUser.email) {
      localStorage.setItem(`civic_profile_${currentUser.email}`, JSON.stringify(profile));
    }
  }, [profile, currentUser]);

  // Set matching issue/location on login/mount
  useEffect(() => {
    if (currentUser && currentUser.location) {
      if (currentUser.systemCoords) {
        setPrefilledCoords(currentUser.systemCoords);
      }
      
      const stateMatch = INDIAN_STATES_MAPPING.find(
        s => s.state.toLowerCase() === currentUser.location.toLowerCase()
      );
      if (stateMatch) {
        const targetIssue = ALL_INITIAL_ISSUES.find(i => i.id === stateMatch.id);
        if (targetIssue) {
          setSelectedIssue(targetIssue);
        }
      } else if (currentUser.location === 'Metro Heights') {
        const targetIssue = ALL_INITIAL_ISSUES.find(i => i.id === 'issue-1');
        if (targetIssue) {
          setSelectedIssue(targetIssue);
        }
      }
    }
  }, [currentUser]);

  // Handle Login submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginEmail.trim()) return;
    
    const loc = loginLocation.trim();

    const performLogin = (resolvedLocation: string, coords?: { lat: number; lng: number }) => {
      const newUser = {
        name: loginName.trim(),
        email: loginEmail.trim(),
        location: resolvedLocation,
        systemCoords: coords
      };
      
      localStorage.setItem('civic_user', JSON.stringify(newUser));
      setCurrentUser(newUser);
    };

    // Prompt for geolocation on submit if not requested yet
    if (geoPermissionStatus === 'prompt') {
      setGeoPermissionStatus('requesting');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const nearest = findNearestState(latitude, longitude);
            setGeoCoords({ lat: latitude, lng: longitude });
            setGeoPermissionStatus('granted');
            performLogin(nearest, { lat: latitude, lng: longitude });
          },
          (error) => {
            setGeoPermissionStatus('denied');
            performLogin(loc || 'Metro Heights');
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
        return;
      }
    }

    performLogin(loc || 'Metro Heights', geoCoords || undefined);
  };

  // Handle Logout / Sign Out
  const handleSignOut = () => {
    localStorage.removeItem('civic_user');
    setCurrentUser(null);
    setLoginName('');
    setLoginEmail('');
    setLoginLocation('');
  };

  // Handle adding new reported issue
  const handleAddIssue = (newIssue: Partial<Issue>) => {
    const freshIssue: Issue = {
      id: `issue-${Date.now()}`,
      title: newIssue.title || 'Civic Incident',
      description: newIssue.description || '',
      category: newIssue.category || 'Public Infrastructure',
      priority: newIssue.priority || 'medium',
      status: 'reported',
      lat: newIssue.lat || 37.7749,
      lng: newIssue.lng || -122.4194,
      upvotes: 1,
      downvotes: 0,
      verificationCount: 0,
      reportedBy: 'You (Citizen Hero)',
      reportedAt: new Date().toLocaleString(),
      imageUrl: newIssue.imageUrl,
      aiSummary: newIssue.aiSummary || 'AI detection agent currently validating report details...',
      aiImpactScore: newIssue.aiImpactScore || 50,
      aiPreventionInsight: newIssue.aiPreventionInsight || 'Awaiting full multi-agent risk assessment.',
      aiResolutionRecommendation: newIssue.aiResolutionRecommendation || 'Awaiting dispatch specs.',
      authorityAssigned: newIssue.authorityAssigned || 'Public Works Division',
      timeline: newIssue.timeline || []
    };

    setIssues(prev => [freshIssue, ...prev]);
    setSelectedIssue(freshIssue);

    // Reward points for filing report!
    setProfile(prev => {
      const newPoints = prev.points + 50;
      const newReports = prev.weeklyReportsCount + 1;
      const level = Math.max(1, Math.floor(newPoints / 100) + 1);
      const progressPercent = newPoints % 100;
      const rank = Math.max(1, 100 - Math.floor(newPoints / 15) - newReports * 2 - prev.weeklyVerificationsCount);
      const badges = getBadgesForStats(newReports, prev.weeklyVerificationsCount, newPoints);
      return {
        ...prev,
        points: newPoints,
        weeklyReportsCount: newReports,
        level,
        progressPercent,
        rank,
        badges
      };
    });
  };

  // Handle selecting an issue from the map or feed
  const handleSelectIssue = (issue: Issue) => {
    const original = issues.find(i => i.id === issue.id) || issue;
    setSelectedIssue(original);
  };

  // Handle Map Clicking / Double-clicking or Selection to report or verify
  const handleSelectCoordinates = (lat: number, lng: number) => {
    if (interactionMode === 'verify') {
      // It's Verify Mode: Use the clicked street/location to verify
      setVerifyLocation({
        lat,
        lng,
        name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        type: 'street'
      });

      // Fetch reverse geocoded street name using Nominatim
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`)
        .then(res => res.json())
        .then(data => {
          if (data && data.display_name) {
            const addr = data.address || {};
            const street = addr.road || addr.suburb || addr.neighbourhood || addr.city_district || addr.county || data.display_name.split(',')[0];
            const state = addr.state || addr.state_district || "";
            const formattedName = street + (state ? `, ${state}` : '');
            setVerifyLocation({
              lat,
              lng,
              name: formattedName,
              type: 'street'
            });
          }
        })
        .catch(err => {
          console.warn("Could not reverse geocode clicked street location:", err);
        });

      // Also select nearest issue to make verification easy for the user
      let minDistance = Infinity;
      let closestIssue: Issue | null = null;
      issues.forEach(issue => {
        const dist = Math.sqrt(Math.pow(lat - issue.lat, 2) + Math.pow(lng - issue.lng, 2));
        if (dist < minDistance) {
          minDistance = dist;
          closestIssue = issue;
        }
      });
      if (closestIssue && minDistance < 0.1) {
        setSelectedIssue(closestIssue);
      }
    } else {
      // It's Report Mode: Use the location to report
      setPrefilledCoords({ lat, lng });
    }
  };

  const handleClearCoords = () => {
    setPrefilledCoords(null);
  };

  // Community Verification Audit (Community Verification Agent!)
  const handleVerifyIssue = (issueId: string) => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        // Increase verification count
        const updatedCount = issue.verificationCount + 1;
        
        // Auto-escalate status on enough verifications
        let updatedStatus = issue.status;
        if (updatedStatus === 'reported' && updatedCount >= 5) {
          updatedStatus = 'verified';
        }

        const updatedIssue = {
          ...issue,
          verificationCount: updatedCount,
          status: updatedStatus,
          timeline: [
            ...issue.timeline,
            { 
              status: updatedStatus, 
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
              title: 'Community Witness Audit', 
              description: `Citizen verified incident. Consensus reaches ${updatedCount} witnesses.` 
            }
          ]
        };

        if (selectedIssue?.id === issueId) {
          setSelectedIssue(updatedIssue);
        }

        return updatedIssue;
      }
      return issue;
    }));

    // Reward active verifier points
    setProfile(prev => {
      const newPoints = prev.points + 15;
      const newVerifications = prev.weeklyVerificationsCount + 1;
      const level = Math.max(1, Math.floor(newPoints / 100) + 1);
      const progressPercent = newPoints % 100;
      const rank = Math.max(1, 100 - Math.floor(newPoints / 15) - prev.weeklyReportsCount * 2 - newVerifications);
      const badges = getBadgesForStats(prev.weeklyReportsCount, newVerifications, newPoints);
      return {
        ...prev,
        points: newPoints,
        weeklyVerificationsCount: newVerifications,
        level,
        progressPercent,
        rank,
        badges
      };
    });
  };

  // Handle voting up/down
  const handleVoteIssue = (issueId: string, type: 'up' | 'down') => {
    setIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        const updatedIssue = {
          ...issue,
          upvotes: type === 'up' ? issue.upvotes + 1 : issue.upvotes,
          downvotes: type === 'down' ? issue.downvotes + 1 : issue.downvotes
        };

        if (selectedIssue?.id === issueId) {
          setSelectedIssue(updatedIssue);
        }

        return updatedIssue;
      }
      return issue;
    }));
  };

  // Handle rewards redemption
  const handleRedeemReward = (cost: number, itemName: string) => {
    setProfile(prev => {
      const newPoints = Math.max(0, prev.points - cost);
      const level = Math.max(1, Math.floor(newPoints / 100) + 1);
      const progressPercent = newPoints % 100;
      const rank = Math.max(1, 100 - Math.floor(newPoints / 15) - prev.weeklyReportsCount * 2 - prev.weeklyVerificationsCount);
      const badges = getBadgesForStats(prev.weeklyReportsCount, prev.weeklyVerificationsCount, newPoints);
      return {
        ...prev,
        points: newPoints,
        level,
        progressPercent,
        rank,
        badges
      };
    });
  };

  const activeLanguage = LANGUAGES.find(l => l.code === langCode) || LANGUAGES[0];
  const languageName = activeLanguage.name;
  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en-US'];

  const handleSetInteractionMode = (mode: 'verify' | 'report') => {
    setInteractionMode(mode);
    const mt = MODE_TRANSLATIONS[langCode] || MODE_TRANSLATIONS['en-US'];
    if (mode === 'report') {
      if (!navigator.geolocation) {
        setGpsMessage(mt.gpsError);
        return;
      }
      setGpsLoading(true);
      setGpsMessage(mt.gpsLocating);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPrefilledCoords({ lat: latitude, lng: longitude });
          setGpsLoading(false);
          setGpsMessage(mt.gpsSuccess);
          setTimeout(() => setGpsMessage(null), 4000);
        },
        (error) => {
          console.error("GPS fetch error:", error);
          setGpsLoading(false);
          setGpsMessage(mt.gpsError);
          setTimeout(() => setGpsMessage(null), 5000);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setPrefilledCoords(null);
      setGpsMessage(null);
    }
  };

  // Dynamically localize issues based on selected language for 100% translations
  const localizedIssues = useMemo(() => {
    return issues.map(issue => getLocalizedIssue(issue, langCode));
  }, [issues, langCode]);

  const localizedSelectedIssue = useMemo(() => {
    if (!selectedIssue) return null;
    return getLocalizedIssue(selectedIssue, langCode);
  }, [selectedIssue, langCode]);

  if (!currentUser) {
    return (
      <div id="login-screen-root" className="min-h-screen bg-[#0F172A] text-slate-100 relative overflow-hidden font-sans flex flex-col items-center justify-center p-4 gap-4">
        {/* Dynamic VisionOS fluid ambient glow blobs */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-pink-600/5 to-blue-600/10 blur-[150px] pointer-events-none"></div>

        {/* First Box */}
        <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto bg-slate-950/40 p-2 rounded-3xl border border-white/10 shadow-inner mb-4 flex items-center justify-center overflow-hidden">
              <img 
                src={civicLogo} 
                alt="CivicHero AI Logo" 
                className="w-full h-full object-contain rounded-2xl select-none"
                referrerPolicy="no-referrer"
              />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-white tracking-tight">
              {t.loginTitle || "CIVITAS AI Smart City Entry"}
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">
              {t.loginSubtitle || "Sign in to access your local gamified civic dashboard, report incidents with voice, and earn reward points."}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Language Selector */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3 text-blue-400" />
                Select Language / भाषा चुनें
              </label>
              <select
                value={langCode}
                onChange={(e) => {
                  setLangCode(e.target.value);
                  localStorage.setItem('civic_lang_code', e.target.value);
                }}
                className="w-full text-xs font-semibold bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-100 outline-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} className="bg-slate-900 text-slate-100" value={lang.code}>
                    {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                {t.fullNameLabel || "Full Name"}
              </label>
              <input
                type="text"
                required
                placeholder={t.namePlaceholder || "e.g. Alex Rivera"}
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-100 outline-none font-semibold"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="e.g. alex@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-100 outline-none font-semibold"
              />
            </div>

            {/* Location Selector */}
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">
                {t.locationLabel || "Your Sector / Location"}
              </label>
              <select
                required
                value={loginLocation}
                onChange={(e) => setLoginLocation(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-slate-100 outline-none font-semibold cursor-pointer"
              >
                <option value="" className="bg-slate-950 text-slate-500">-- Choose Your Location / State --</option>
                <option value="Metro Heights" className="bg-slate-950 text-slate-100">{getLocalizedStateName('metro-heights', langCode)} (California)</option>
                {INDIAN_STATES_MAPPING.map(item => (
                  <option key={item.id} value={item.state} className="bg-slate-950 text-slate-100">
                    {getLocalizedStateName(item.id, langCode)}
                  </option>
                ))}
              </select>
            </div>

            {/* Geolocation Request Widget */}
            <div className="p-3.5 rounded-xl bg-slate-950/50 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  System Geolocation
                </span>
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  geoPermissionStatus === 'granted' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  geoPermissionStatus === 'denied' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                  geoPermissionStatus === 'requesting' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {geoPermissionStatus === 'granted' ? 'CONNECTED' :
                   geoPermissionStatus === 'denied' ? 'DENIED' :
                   geoPermissionStatus === 'requesting' ? 'ACCESSING...' :
                   'NOT SECURED'}
                </span>
              </div>
              
              <p className="text-[11px] text-slate-400 leading-normal">
                Access your real system location coordinates to automatically select your sector and map nearby reports.
              </p>

              {geoError && (
                <p className="text-[10px] text-rose-400 font-mono mt-1">
                  ⚠️ {geoError}
                </p>
              )}

              {geoCoords && (
                <div className="p-2 rounded bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Coordinates:</span>
                    <span className="text-slate-300">{geoCoords.lat.toFixed(4)}°, {geoCoords.lng.toFixed(4)}°</span>
                  </div>
                  {geoAutoDetected && (
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-500">Auto-Detected:</span>
                      <span className="text-blue-400 font-bold">{geoAutoDetected}</span>
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={requestSystemLocation}
                disabled={geoPermissionStatus === 'requesting'}
                className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white font-semibold text-[11px] transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {geoPermissionStatus === 'requesting' ? (
                  <>
                    <span className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
                    Querying GPS...
                  </>
                ) : geoPermissionStatus === 'granted' ? (
                  '📍 Refresh GPS Signal'
                ) : (
                  '📍 Access & Verify System Location'
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-sans font-bold text-xs shadow-lg shadow-blue-500/20 flex items-center justify-center gap-1.5 cursor-pointer hover:scale-[1.02] transition active:scale-[0.98]"
            >
              {t.beginJourneyButton || "Begin Citizen Journey"}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-white/5 pt-3">
            <p className="text-[10px] text-slate-500 font-mono">
              Powered by Google Gemini • Secure Decentralized Validation
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="main-layout-root" className="min-h-screen bg-[#0F172A] text-slate-100 relative overflow-hidden font-sans pb-12">
      
      {/* Dynamic VisionOS fluid ambient glow blobs behind the frosted canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 blur-[130px] pointer-events-none mesh-glow-1"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-pink-600/5 to-blue-600/10 blur-[150px] pointer-events-none mesh-glow-2"></div>
      <div className="absolute top-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-purple-600/5 to-pink-600/5 blur-[120px] pointer-events-none mesh-glow-3"></div>

      {/* Primary Wrapper Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-6 relative z-10">
        
        {/* Navigation / Brand Header Bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 backdrop-blur-md bg-white/5 border border-white/10 px-6 py-4 rounded-3xl shadow-2xl relative z-[1050]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-950/40 p-1.5 rounded-2xl border border-white/10 shadow-inner flex items-center justify-center overflow-hidden">
              <img 
                src={civicLogo} 
                alt="CivicHero AI Logo" 
                className="w-full h-full object-contain rounded-xl select-none"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-xl text-white tracking-tight flex items-center gap-1.5">
                {t.appName || "CIVITAS AI"}
              </h1>
              <p className="text-xs text-slate-400 font-sans mt-0.5 font-medium">{t.appSubtitle || "Turning Community Reports into Community Action"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Quick prefill coordinate indicators */}
            {prefilledCoords ? (
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-2xl px-3 py-1.5 text-xs text-blue-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>Locked Coords: {prefilledCoords.lat.toFixed(4)}, {prefilledCoords.lng.toFixed(4)}</span>
                <button 
                  onClick={handleClearCoords}
                  className="font-bold hover:text-blue-100 ml-1.5"
                >
                  Clear
                </button>
              </div>
            ) : (
              <p className="hidden md:block text-[11px] text-slate-400 italic">{t.doubleClickHint || "Double-click map to pre-fill report gps coordinates"}</p>
            )}

            {/* Standalone Quick Language Selector Dropdown */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-2xl text-xs text-slate-300">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <select
                value={langCode}
                onChange={(e) => {
                  setLangCode(e.target.value);
                  localStorage.setItem('civic_lang_code', e.target.value);
                }}
                className="bg-transparent text-[11px] font-semibold border-none text-slate-300 focus:outline-none pr-1 outline-none cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* User Quick Profile Pill & Dropdown Menu */}
            <div className="relative ml-auto md:ml-0">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-2xl shadow-md transition cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-display font-bold text-xs shadow-md">
                  {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="block text-[10px] font-mono text-slate-400 font-bold uppercase leading-none">{currentUser.name}</span>
                  <span className="text-[11px] font-bold text-blue-400 font-sans">{profile.points} PTS</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileOpen && (
                <>
                  {/* Backdrop click-away trigger */}
                  <div className="fixed inset-0 z-[1060]" onClick={() => setProfileOpen(false)}></div>
                  
                  {/* Dropdown Container: 280 x 400 px */}
                  <div className="absolute right-0 mt-3 z-[1070] w-[280px] h-[400px] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    {/* Top Section */}
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-display font-extrabold text-base shadow-md relative shrink-0">
                        {currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-950 text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center border-2 border-slate-900 shadow">
                          {profile.level}
                        </span>
                      </div>
                      
                      {/* Name & Title */}
                      <h4 className="font-display font-extrabold text-sm text-white mt-2 truncate w-full px-1">{currentUser.name}</h4>
                      <p className="text-[10px] font-mono font-bold text-blue-400">CivicHero AI lvl {profile.level}</p>
                      
                      {/* Email */}
                      <p className="text-[10px] text-slate-400 font-sans truncate w-full px-2 mt-0.5 animate-pulse" title={currentUser.email || "siddharth@example.com"}>
                        {currentUser.email || "siddharth@example.com"}
                      </p>
                    </div>

                    {/* Stats Rows */}
                    <div className="bg-white/5 border border-white/5 rounded-2xl p-2.5 my-2 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center gap-2 text-amber-300 font-bold">
                        <span className="text-sm">⭐</span>
                        <span>{profile.points} Points</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <span className="text-sm">🏅</span>
                        <span>{profile.weeklyReportsCount} Reports</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-400 font-bold">
                        <span className="text-sm">✅</span>
                        <span>{profile.weeklyVerificationsCount} Verifications</span>
                      </div>
                      <div className="flex items-center gap-2 text-orange-400 font-bold">
                        <span className="text-sm">🔥</span>
                        <span>Rank {profile.rank || 12}</span>
                      </div>
                    </div>

                    {/* Badges list */}
                    <div className="px-1 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none scroll-smooth">
                      {profile.badges.map(badge => (
                        <span key={badge.id} className="text-lg p-1 bg-white/5 border border-white/5 rounded-lg cursor-help shrink-0" title={`${badge.name}: ${badge.description}`}>
                          {badge.icon}
                        </span>
                      ))}
                    </div>

                    {/* Language selector & Logout */}
                    <div className="border-t border-white/10 pt-2 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] gap-2 px-1">
                        <label className="text-slate-400 flex items-center gap-1 shrink-0 font-bold">
                          <Globe className="w-3.5 h-3.5 text-blue-400" />
                          Lang:
                        </label>
                        <select
                          value={langCode}
                          onChange={(e) => {
                            setLangCode(e.target.value);
                            localStorage.setItem('civic_lang_code', e.target.value);
                          }}
                          className="text-[11px] font-bold bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-slate-200 outline-none max-w-[130px] cursor-pointer"
                        >
                          {LANGUAGES.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          handleSignOut();
                        }}
                        className="w-full py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 rounded-xl text-[10px] font-bold text-red-400 hover:text-red-300 flex items-center justify-center gap-1.5 transition cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        {t.signout || "Sign Out"}
                      </button>
                    </div>

                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Outer Section Frame */}
        <div className="space-y-6">

          {/* REPORT. VERIFY. RESOLVE. Banner */}
          <div className="w-full backdrop-blur-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-5 shadow-2xl relative z-10 text-center animate-in fade-in zoom-in-95 duration-500">
            <p className="font-sans font-black text-white text-sm md:text-base tracking-[0.3em] leading-relaxed">
              {t.reportVerifyResolve || "REPORT. VERIFY. RESOLVE."}
            </p>
          </div>
          
          {/* Clean Region / State Capital Selection */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-slate-900/50 border border-white/10 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                🇮🇳 {t.regionSelection || "Region Selection (India)"}:
              </span>
            </div>
            <div className="relative w-full sm:w-80">
              <MapPin className="w-3.5 h-3.5 text-orange-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    const targetIssue = issues.find(i => i.id === e.target.value);
                    if (targetIssue) {
                      setSelectedIssue(targetIssue);
                      setVerifyLocation({
                        lat: targetIssue.lat,
                        lng: targetIssue.lng,
                        name: getLocalizedStateName(targetIssue.id, langCode),
                        type: 'state'
                      });
                    }
                  }
                }}
                value={selectedIssue?.id.startsWith('ind-') ? selectedIssue.id : ''}
                className="w-full text-xs font-bold bg-slate-950 text-slate-200 border border-white/10 rounded-xl pl-9 pr-8 py-2.5 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-950 text-slate-400">{t.chooseStatePlaceholder || "-- Choose State --"}</option>
                {INDIAN_STATES_MAPPING.map(item => (
                   <option key={item.id} value={item.id} className="bg-slate-950 text-slate-200">
                     {getLocalizedStateName(item.id, langCode)}
                   </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* INTERACTION MODE: Verify vs Report Selector */}
          <div className="p-5 bg-gradient-to-br from-slate-900/60 to-slate-950/80 border border-white/10 rounded-2xl shadow-xl space-y-3 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/5 blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                {(MODE_TRANSLATIONS[langCode] || MODE_TRANSLATIONS['en-US']).title}
              </h3>
              {gpsLoading && (
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono animate-pulse">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></div>
                  <span>{(MODE_TRANSLATIONS[langCode] || MODE_TRANSLATIONS['en-US']).gpsLocating}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Verify Mode Button Card */}
              <button
                id="btn-mode-verify"
                onClick={() => handleSetInteractionMode('verify')}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 ${
                  interactionMode === 'verify'
                    ? 'bg-blue-500/10 border-blue-500/40 shadow-lg shadow-blue-500/5'
                    : 'bg-slate-950/40 border-white/5 hover:bg-slate-900/40 hover:border-white/10'
                }`}
              >
                <div className={`p-2 rounded-lg ${interactionMode === 'verify' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-900 text-slate-400'}`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {(MODE_TRANSLATIONS[langCode] || MODE_TRANSLATIONS['en-US']).verifyMode}
                    {interactionMode === 'verify' && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                    {(MODE_TRANSLATIONS[langCode] || MODE_TRANSLATIONS['en-US']).verifyDesc}
                  </p>
                </div>
              </button>

              {/* Report Mode Button Card */}
              <button
                id="btn-mode-report"
                onClick={() => handleSetInteractionMode('report')}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-300 ${
                  interactionMode === 'report'
                    ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                    : 'bg-slate-950/40 border-white/5 hover:bg-slate-900/40 hover:border-white/10'
                }`}
              >
                <div className={`p-2 rounded-lg ${interactionMode === 'report' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}>
                  <AlertCircle className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    {(MODE_TRANSLATIONS[langCode] || MODE_TRANSLATIONS['en-US']).reportMode}
                    {interactionMode === 'report' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">
                    {(MODE_TRANSLATIONS[langCode] || MODE_TRANSLATIONS['en-US']).reportDesc}
                  </p>
                </div>
              </button>
            </div>

            {interactionMode === 'verify' && verifyLocation && (
              <div className="flex items-center gap-2.5 p-2.5 px-3.5 rounded-xl text-xs font-mono border bg-blue-950/30 border-blue-500/20 text-blue-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400 animate-pulse flex-shrink-0" />
                <span className="font-bold text-blue-400 flex-shrink-0">{verifyLocation.type === 'state' ? 'STATE REGION:' : 'STREET LOCATION:'}</span>
                <span className="truncate flex-1">{verifyLocation.name}</span>
                <span className="text-[10px] text-slate-500 font-sans flex-shrink-0">({verifyLocation.lat.toFixed(4)}, {verifyLocation.lng.toFixed(4)})</span>
              </div>
            )}

            {gpsMessage && (
              <div className={`flex items-center gap-2 p-2 px-3 rounded-lg text-xs font-mono border ${
                gpsMessage.includes("Locked") || gpsMessage.includes("लॉक") || gpsMessage.includes("সফল") || gpsMessage.includes("ల్యాండ్") || gpsMessage.includes("வெற்றிகரமாக")
                  ? 'bg-emerald-950/50 border-emerald-500/20 text-emerald-400'
                  : gpsMessage.includes("Locating") || gpsMessage.includes("खोज") || gpsMessage.includes("प्राप्त")
                  ? 'bg-blue-950/50 border-blue-500/20 text-blue-400'
                  : 'bg-amber-950/50 border-amber-500/20 text-amber-400'
              }`}>
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></div>
                <span className="flex-1">{gpsMessage}</span>
              </div>
            )}
          </div>

          {/* Main Top Section: Community Interactive Map */}
          <section id="community-map-section">
            <MapComponent 
              issues={localizedIssues}
              selectedIssue={localizedSelectedIssue}
              onSelectIssue={handleSelectIssue}
              onSelectCoordinates={handleSelectCoordinates}
              onBoundsChange={setMapBounds}
              prefilledCoords={prefilledCoords}
              verifyLocation={verifyLocation}
              interactionMode={interactionMode}
              langCode={langCode}
            />
          </section>

          {/* Dual Column: Reporting Form (Left) & Gamification Shop (Right) */}
          <section id="reporting-gamification-columns" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportForm 
              onAddIssue={handleAddIssue}
              prefilledCoords={prefilledCoords}
              onClearCoords={handleClearCoords}
              langCode={langCode}
              languageName={languageName}
            />
            <Leaderboard 
              profile={profile}
              onRedeemReward={handleRedeemReward}
              langCode={langCode}
            />
          </section>

          {/* Multi-Agent Animated resolution pipeline */}
          <section id="ai-agent-workflow-section">
            <WorkflowDisplay activeIssue={localizedSelectedIssue} langCode={langCode} />
          </section>

          {/* Dynamic Feed & Predictive Insights Chart */}
          <section id="active-incidents-dashboard">
            <Dashboard 
              issues={localizedIssues}
              mapBounds={mapBounds}
              onSelectIssue={handleSelectIssue}
              onVerifyIssue={handleVerifyIssue}
              onVoteIssue={handleVoteIssue}
              langCode={langCode}
            />
          </section>

        </div>
      </div>

      {/* Circular floating Neural chatbot Siri-style button */}
      <Chatbot currentIssues={localizedIssues} langCode={langCode} languageName={languageName} />
    </div>
  );
}
