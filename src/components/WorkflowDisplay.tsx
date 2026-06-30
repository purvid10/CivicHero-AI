import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Sparkles, MapPin, Eye, CheckCircle2, ShieldAlert, BadgeCheck, 
  ChevronRight, Play, Info, AlertCircle, ArrowRightLeft, Cpu 
} from 'lucide-react';
import { Issue, IssueStatus } from '../types';
import { TRANSLATIONS } from '../translations';

interface WorkflowDisplayProps {
  activeIssue: Issue | null;
  langCode: string;
}

const WORKFLOW_LOCALIZED: Record<string, {
  desc1: string;
  desc2: string;
  desc3: string;
  desc4: string;
  desc5: string;
  desc6: string;
  desc7: string;
  reportedAnalysis: string;
  investigatingAnalysis: (lat: number, lng: number) => string;
  verifiedAnalysis: (upvotes: number, verifications: number) => string;
  prioritizedAnalysis: (score: number, priority: string) => string;
  assignedAnalysis: (rec: string, assigned: string) => string;
  resolvingAnalysis: string;
  resolvedAnalysis: string;
}> = {
  'en-US': {
    desc1: "Uses multi-modal parsing to validate images/videos & auto-categorize inputs.",
    desc2: "Validates reporting coordinates, checks duplicates, and maps local boundaries.",
    desc3: "Crowdsources truth. Handles upvotes/downvotes to confirm validity.",
    desc4: "Runs dynamic impact formula mapping citizen density and danger index.",
    desc5: "Drafts exact work specs, matches appropriate contractor, and dispatches job.",
    desc6: "Tracks actual resolution milestones, updates status, and issues bounty points.",
    desc7: "Generates preventive insights to recommend structural maintenance.",
    reportedAnalysis: "Detection Agent successfully read description, parsed attachments, auto-assigned category, and initialized local community verifications.",
    investigatingAnalysis: (lat, lng) => `Geo Intelligence Agent validated GPS coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)}) against municipal asset indexes.`,
    verifiedAnalysis: (upvotes, verifications) => `Community consensus reaches threshold. Upvotes: ${upvotes}. Verified: ${verifications} times. Approving dispatch.`,
    prioritizedAnalysis: (score, priority) => `Prioritization Agent calculated impact factor: ${score}/100. Priority assigned: ${priority.toUpperCase()}.`,
    assignedAnalysis: (rec, assigned) => `Resolution recommendation drafted: "${rec}". Assigned to ${assigned}.`,
    resolvingAnalysis: "Dispatch crew has arrived on site. Active resolution logging is in progress.",
    resolvedAnalysis: "Resolution completed. Citizen engagement agent issued reward points. Predictive model saved details for historical correlation."
  },
  'hi-IN': {
    desc1: "छवियों/वीडियो को सत्यापित करने और इनपुट को स्वचालित रूप से वर्गीकृत करने के लिए मल्टी-मोडल पार्सिंग का उपयोग करता है।",
    desc2: "रिपोर्टिंग निर्देशांकों को सत्यापित करता है, डुप्लिकेट की जांच करता है, और स्थानीय सीमाओं को मैप करता है।",
    desc3: "भीड़-भाड़ से सच्चाई जुटाता है। वैधता की पुष्टि करने के लिए अपवोट/डाउनवोट संभालता है।",
    desc4: "नागरिक घनत्व और खतरे के सूचकांक का मानचित्रण करने वाले गतिशील प्रभाव सूत्र को चलाता है।",
    desc5: "सटीक कार्य विनिर्देशों का मसौदा तैयार करता है, उपयुक्त ठेकेदार से मिलान करता है, और काम भेजता है।",
    desc6: "वास्तविक समाधान के मील के पत्थर को ट्रैक करता है, स्थिति अपडेट करता है, और इनाम अंक जारी करता है।",
    desc7: "संरचनात्मक रखरखाव की सिफारिश करने के लिए निवारक अंतर्दृष्टि उत्पन्न करता है।",
    reportedAnalysis: "समस्या पहचान एजेंट ने विवरण को सफलतापूर्वक पढ़ा, अनुलग्नकों का विश्लेषण किया, स्वचालित रूप से श्रेणी असाइन की, और स्थानीय सामुदायिक सत्यापन शुरू किया।",
    investigatingAnalysis: (lat, lng) => `भू-खुफिया एजेंट ने नगरपालिका परिसंपत्ति सूचकांकों के खिलाफ जीपीएस निर्देशांक (${lat.toFixed(4)}, ${lng.toFixed(4)}) का सत्यापन किया।`,
    verifiedAnalysis: (upvotes, verifications) => `सामुदायिक सहमति सीमा तक पहुँच गई है। अपवोट: ${upvotes}, सत्यापन: ${verifications} बार। प्रेषण को मंजूरी दी जा रही है।`,
    prioritizedAnalysis: (score, priority) => `प्राथमिकता निर्धारण एजेंट ने प्रभाव कारक की गणना की: ${score}/100. सौंपी गई प्राथमिकता: ${priority.toUpperCase()}`,
    assignedAnalysis: (rec, assigned) => `समाधान अनुशंसा का मसौदा तैयार किया गया: "${rec}"। इसे ${assigned} को सौंपा गया है।`,
    resolvingAnalysis: "प्रेषण दल साइट पर पहुंच गया है। सक्रिय समाधान लॉगिंग प्रगति पर है।",
    resolvedAnalysis: "समाधान पूरा हुआ। नागरिक जुड़ाव एजेंट ने पुरस्कार अंक जारी किए। पूर्वानुमानित मॉडल ने ऐतिहासिक सहसंबंध के लिए विवरण सहेजा।"
  },
  'bn-IN': {
    desc1: "ছবি/ভিডিও যাচাই করতে এবং ইনপুটগুলিকে স্বয়ংক্রিয়ভাবে শ্রেণীবদ্ধ করতে মাল্টি-মোডাল পার্সিং ব্যবহার করে।",
    desc2: "রিপোর্টিং স্থানাঙ্কগুলি যাচাই করে, সদৃশগুলি পরীক্ষা করে এবং স্থানীয় সীমানা মানচিত্র করে।",
    desc3: "ভিড় থেকে সত্যতা সংগ্রহ করে। বৈধতা নিশ্চিত করতে আপভোট/ডাউনভোট পরিচালনা করে।",
    desc4: "নাগরিক ঘনত্ব এবং বিপদের সূচক মানচিত্র করতে গতিশীল প্রভাব সূত্র চালায়।",
    desc5: "সঠিক কাজের বিবরণ খসড়া করে, উপযুক্ত ঠিকাদারের সাথে মেলায় এবং কাজ বরাদ্দ করে।",
    desc6: "প্রকৃত সমাধানের মাইলফলকগুলি ট্র্যাক করে, স্ট্যাটাস আপডেট করে এবং পুরস্কার পয়েন্ট প্রদান করে।",
    desc7: "কাঠামোগত রক্ষণাবেক্ষণের সুপারিশ করার জন্য প্রতিরোধমূলক অন্তর্দৃষ্টি তৈরি করে।",
    reportedAnalysis: "সনাক্তকরণ এজেন্ট সফলভাবে বিবরণ পড়েছে, সংযুক্তিগুলি বিশ্লেষণ করেছে, স্বয়ংক্রিয়ভাবে বিভাগ বরাদ্দ করেছে এবং স্থানীয় সম্প্রদায় যাচাইকরণ শুরু করেছে।",
    investigatingAnalysis: (lat, lng) => `জিও ইন্টেলিজेंस এজেন্ট পৌরসভা সম্পদ সূচকের বিরুদ্ধে জিপিএস স্থানাঙ্ক (${lat.toFixed(4)}, ${lng.toFixed(4)}) যাচাই করেছে।`,
    verifiedAnalysis: (upvotes, verifications) => `সম্প্রদায়ের ঐক্যমত থ্রেশহোল্ডে পৌঁছেছে। আপভোট: ${upvotes}। যাচাইকৃত: ${verifications} বার। প্রেরণ অনুমোদন করা হচ্ছে।`,
    prioritizedAnalysis: (score, priority) => `অগ্রাধিকার নির্ধারণকারী এজেন্ট প্রভাবের হার গণনা করেছে: ${score}/১০০। নির্ধারিত অগ্রাধিকার: ${priority.toUpperCase()}।`,
    assignedAnalysis: (rec, assigned) => `সমাধানের খসড়া তৈরি করা হয়েছে: "${rec}"। ${assigned}-কে দায়িত্ব দেওয়া হয়েছে।`,
    resolvingAnalysis: "কর্মী দল ঘটনাস্থলে পৌঁছেছে। সমাধানের কাজ সক্রিয়ভাবে লগ করা হচ্ছে।",
    resolvedAnalysis: "সমাধান সম্পন্ন হয়েছে। নাগরিক সম্পৃক্ততা এজেন্ট পুরস্কার পয়েন্ট প্রদান করেছে। ভবিষ্যদ্বাণীমূলক মডেল ঐতিহাসিক তথ্য সংরক্ষণের জন্য বিস্তারিত সংরক্ষণ করেছে।"
  },
  'gu-IN': {
    desc1: "છબીઓ/વિડિઓઝને માન્ય કરવા અને ઇનપુટ્સનું આપમેળે વર્ગીકરણ કરવા માટે મલ્ટી-મોડલ પાર્સિંગનો ઉપયોગ કરે છે.",
    desc2: "રિપોર્ટિંગ કોઓર્ડિનેટ્સને માન્ય કરે છે, ડુપ્લિકેટ્સ તપાસે છે અને સ્થાનિક સીમાઓનો નકશો બનાવે છે.",
    desc3: "લોકો પાસેથી સત્ય મેળવે છે. વૈધતાની પુષ્ટિ કરવા માટે અપવોટ્સ/ડાઉનવોટ્સ હેન્ડલ કરે છે.",
    desc4: "નાગરિક ઘનતા અને જોખમ સૂચકાંકનું મેપિંગ કરતું ગતિશીલ પ્રભાવ સૂત્ર ચલાવે છે.",
    desc5: "ચોક્કસ કામના વિશિષ્ટતાઓનો ડ્રાફ્ટ તૈયાર કરે છે, યોગ્ય કોન્ટ્રાક્ટર સાથે મેળ ખાય છે અને કામ મોકલે છે.",
    desc6: "વાસ્તવિક નિકાલના સીમાચિહ્નોને ટ્રેક કરે છે, સ્થિતિ અપડેટ કરે છે અને પુરસ્કાર પોઈન્ટ જારી કરે છે.",
    desc7: "માળખાકીય જાળવણીની ભલામણ કરવા માટે નિવારક આંતરદૃષ્ટિ ઉત્પન્ન કરે છે.",
    reportedAnalysis: "શોધ એજન્ટે સફળતાપૂર્વક વર્ણન વાંચ્યું, જોડાણોનું વિશ્લેષણ કર્યું, આપમેળે કેટેગરી સોંપી અને સ્થાનિક સમુદાય ચકાસણી શરૂ કરી.",
    investigatingAnalysis: (lat, lng) => `ભૂ-ખુફિયા એજન્ટે મ્યુનિસિપલ એસેટ ઇન્ડેક્સ સામે જીપીએસ કોઓર્ડિનેટ્સ (${lat.toFixed(4)}, ${lng.toFixed(4)}) માન્ય કર્યા.`,
    verifiedAnalysis: (upvotes, verifications) => `સમુદાય સર્વસંમતિ થ્રેશોલ્ડ પર પહોંચી ગઈ છે. અપવોટ્સ: ${upvotes}. ચકાસાયેલ: ${verifications} વખત. રવાનગી મંજૂર કરી રહ્યાં છીએ.`,
    prioritizedAnalysis: (score, priority) => `પ્રાથમિકતા એજન્ટે પ્રભાવ પરિબળની ગણતરી કરી: ${score}/100. સોંપાયેલ અગ્રતા: ${priority.toUpperCase()}.`,
    assignedAnalysis: (rec, assigned) => `ઉકેલ ભલામણ તૈયાર કરવામાં આવી: "${rec}". ${assigned} ને સોંપવામાં આવી.`,
    resolvingAnalysis: "કામદાર ટીમ ઘટનાસ્થળે પહોંચી ગઈ છે. સક્રિય ઉકેલ લોગીંગ પ્રગતિમાં છે.",
    resolvedAnalysis: "ઉકેલ પૂર્ણ થયો. નાગરિક જોડાણ એજન્ટે પુરસ્કાર પોઈન્ટ જારી કર્યા. આગાહી કરનાર મોડેલે વિગતો સાચવી."
  },
  'kn-IN': {
    desc1: "ಚಿತ್ರಗಳು/ವೀಡಿಯೊಗಳನ್ನು ಮೌಲ್ಯೀಕರಿಸಲು ಮತ್ತು ಇನ್‌ಪುಟ್‌ಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ವರ್ಗೀಕರಿಸಲು ಮಲ್ಟಿ-ಮೋಡಲ್ ಪಾರ್ಸಿಂಗ್ ಬಳಸುತ್ತದೆ.",
    desc2: "ವರದಿ ಮಾಡುವ ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ, ನಕಲುಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ ಮತ್ತು ಸ್ಥಳೀಯ ಗಡಿಗಳನ್ನು ಮ್ಯಾಪ್ ಮಾಡುತ್ತದೆ.",
    desc3: "ಸಮೂಹದಿಂದ ಸತ್ಯವನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ. ಸಿಂಧುತ್ವವನ್ನು ಖಚಿತಪಡಿಸಲು ಅಪ್‌ವೋಟ್‌ಗಳು/ಡೌನ್‌ವೋಟ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.",
    desc4: "ನಾಗರಿಕ ಸಾಂದ್ರತೆ ಮತ್ತು ಅಪಾಯದ ಸೂಚ್ಯಂಕವನ್ನು ಮ್ಯಾಪ್ ಮಾಡುವ ಕ್ರಿಯಾತ್ಮಕ ಪ್ರಭಾವದ ಸೂತ್ರವನ್ನು ರನ್ ಮಾಡುತ್ತದೆ.",
    desc5: "ನಿಖರವಾದ ಕೆಲಸದ ವಿಶೇಷಣಗಳನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ, ಸೂಕ್ತ ಗುತ್ತಿಗೆದಾರರನ್ನು ಹೊಂದಿಸುತ್ತದೆ ಮತ್ತು ಕೆಲಸವನ್ನು ನಿಯೋಜಿಸುತ್ತದೆ.",
    desc6: "ನಿಜವಾದ ಪರಿಹಾರದ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುತ್ತದೆ, ಸ್ಥಿತಿಯನ್ನು ನವೀಕರಿಸುತ್ತದೆ ಮತ್ತು ಬಹುಮಾನದ ಅಂಕಗಳನ್ನು ನೀಡುತ್ತದೆ.",
    desc7: "ರಚನಾತ್ಮಕ ನಿರ್ವಹಣೆಯನ್ನು ಶಿಫಾರಸು ಮಾಡಲು ತಡೆಗಟ್ಟುವ ಒಳನೋಟಗಳನ್ನು ರಚಿಸುತ್ತದೆ.",
    reportedAnalysis: "ಸಮಸ್ಯೆ ಪತ್ತೆ ಏಜೆಂಟ್ ಯಶಸ್ವಿಯಾಗಿ ವಿವರಣೆಯನ್ನು ಓದಿದೆ, ಲಗತ್ತುಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಿದೆ, ವರ್ಗವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ನಿಯೋಜಿಸಿದೆ ಮತ್ತು ಸ್ಥಳೀಯ ಸಮುದಾಯ ಪರಿಶೀಲನೆಗಳನ್ನು ಪ್ರಾರಂಭಿಸಿದೆ.",
    investigatingAnalysis: (lat, lng) => `ಜಿಯೋ ಇಂಟೆಲಿಜೆನ್ಸ್ ಏಜೆಂಟ್ ಜಿಪಿಎಸ್ ನಿರ್ದೇಶಾಂಕಗಳನ್ನು (${lat.toFixed(4)}, ${lng.toFixed(4)}) ಪುರಸಭೆಯ ಆಸ್ತಿ ಸೂಚಿಕೆಗಳ ವಿರುದ್ಧ ಪರಿಶೀಲಿಸಿದೆ.`,
    verifiedAnalysis: (upvotes, verifications) => `ಸಮುದಾಯದ ಒಮ್ಮತವು ಮಿತಿಯನ್ನು ತಲುಪಿದೆ. ಅಪ್‌ವೋಟ್‌ಗಳು: ${upvotes}. ಪರಿಶೀಲಿಸಲಾಗಿದೆ: ${verifications} ಬಾರಿ. ರವಾನೆಗೆ ಅನುಮೋದಿಸಲಾಗುತ್ತಿದೆ.`,
    prioritizedAnalysis: (score, priority) => `ಆದ್ಯತೆ ಏಜೆಂಟ್ ಪ್ರಭಾವದ ಅಂಶವನ್ನು ಲೆಕ್ಕಹಾಕಿದೆ: ${score}/100. ಆದ್ಯತೆ ನಿಯೋಜಿಸಲಾಗಿದೆ: ${priority.toUpperCase()}.`,
    assignedAnalysis: (rec, assigned) => `ಪರಿಹಾರ ಶಿಫಾರಸು ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ: "${rec}". ${assigned} ಗೆ ನಿಯೋಜಿಸಲಾಗಿದೆ.`,
    resolvingAnalysis: "ಪರಿಹಾರ ಸಿಬ್ಬಂದಿ ಸ್ಥಳಕ್ಕೆ ಆಗಮಿಸಿದ್ದಾರೆ. ಸಕ್ರಿಯ ಪರಿಹಾರ ದಾಖಲಾತಿ ಪ್ರಗತಿಯಲ್ಲಿದೆ.",
    resolvedAnalysis: "ಪರಿಹಾರ ಪೂರ್ಣಗೊಂಡಿದೆ. ನಾಗರಿಕ ತೊಡಗಿಸಿಕೊಳ್ಳುವಿಕೆ ಏಜೆಂಟ್ ಬಹುಮಾನದ ಅಂಕಗಳನ್ನು ನೀಡಿದೆ. ಮುನ್ಸೂಚನಾ ಮಾದರಿಯು ವಿವರಗಳನ್ನು ಉಳಿಸಿದೆ."
  },
  'ml-IN': {
    desc1: "ചിത്രങ്ങളും വീഡിയോകളും സാധൂകരിക്കുന്നതിനും ഇൻപുട്ടുകൾ സ്വയമേവ വർഗ്ഗീകരിക്കുന്നതിനും മൾട്ടി-മോഡൽ പാർസിംഗ് ഉപയോഗിക്കുന്നു.",
    desc2: "റിപ്പോർട്ടിംഗ് കോർഡിനേറ്റുകൾ സാധൂകരിക്കുകയും തനിപ്പകർപ്പുകൾ പരിശോധിക്കുകയും പ്രാദേശിക അതിരുകൾ മാപ്പ് ചെയ്യുകയും ചെയ്യുന്നു.",
    desc3: "ക്രൗഡ് സോഴ്‌സിംഗ് വഴി സത്യം കണ്ടെത്തുന്നു. സാധുത സ്ഥിരീകരിക്കുന്നതിന് അപ്‌വോട്ടുകളും ഡൗൺവോട്ടുകളും കൈകാര്യം ചെയ്യുന്നു.",
    desc4: "പൗര സാന്ദ്രതയും അപകട സൂചികയും മാപ്പ് ചെയ്യുന്ന ഡൈനാമിക് ഇംപാക്ട് ഫോർമുല പ്രവർത്തിപ്പിക്കുന്നു.",
    desc5: "കൃത്യമായ ജോലി വിവരങ്ങൾ തയ്യാറാക്കുകയും അനുയോജ്യമായ കരാറുകാരനുമായി പൊരുത്തപ്പെടുത്തുകയും ജോലി നൽകുകയും ചെയ്യുന്നു.",
    desc6: "യഥാർത്ഥ പരിഹാര നാഴികക്കല്ലുകൾ ട്രാക്ക് ചെയ്യുകയും സ്റ്റാറ്റസ് അപ്ഡേറ്റ് ചെയ്യുകയും റിവാർഡ് പോയിന്റുകൾ നൽകുകയും ചെയ്യുന്നു.",
    desc7: "ഘടനാപരമായ അറ്റകുറ്റപ്പണികൾ ശുപാർശ ചെയ്യുന്നതിനായി പ്രതിരോധ ഉൾക്കാഴ്ചകൾ സൃഷ്ടിക്കുന്നു.",
    reportedAnalysis: "ഡിറ്റക്ഷൻ ഏജന്റ് വിവരണം വിജയകരമായി വായിക്കുകയും അറ്റാച്ച്‌മെന്റുകൾ പാർസ് ചെയ്യുകയും സ്വയമേവ വിഭാഗം നൽകുകയും കമ്മ്യൂณีറ്റി പരിശോധനകൾ ആരംഭിക്കുകയും ചെയ്തു.",
    investigatingAnalysis: (lat, lng) => `ജിയോ ഇന്റലിജൻസ് ഏജന്റ് ജിപിഎസ് കോർഡിനേറ്റുകൾ (${lat.toFixed(4)}, ${lng.toFixed(4)}) മുൻസിപ്പൽ അസറ്റ് സൂചികയുമായി ഒത്തുനോക്കി പരിശോധിച്ചു.`,
    verifiedAnalysis: (upvotes, verifications) => `കമ്മ്യൂണിറ്റി സമവായം പരിധിയിലെത്തി. അപ്‌വോട്ടുകൾ: ${upvotes}. വെരിഫൈ ചെയ്തത്: ${verifications} തവണ. ഡിസ്പാച്ചിന് അനുമതി നൽകുന്നു.`,
    prioritizedAnalysis: (score, priority) => `മുൻഗണനാ ഏജന്റ് ഇംപാക്ട് ഫാക്ടർ കണക്കാക്കി: ${score}/100. മുൻഗണന നൽകിയിരിക്കുന്നു: ${priority.toUpperCase()}.`,
    assignedAnalysis: (rec, assigned) => `പരിഹാര ശുപാർശ തയ്യാറാക്കി: "${rec}". ${assigned}-ലേക്ക് ജോലി ചുമതലപ്പെടുത്തി.`,
    resolvingAnalysis: "പ്രതികരണ സംഘം സ്ഥലത്തെത്തി. സജീവ പരിഹാര പ്രവർത്തനങ്ങൾ പുരോഗമിക്കുന്നു.",
    resolvedAnalysis: "പരിഹാരം പൂർത്തിയായി. പൗര പങ്കാളിത്ത ഏജന്റ് റിവാർഡ് പോയിന്റുകൾ നൽകി. ഭാവി വിശകലനങ്ങൾക്കായി വിവരങ്ങൾ സംരക്ഷിച്ചു."
  },
  'mr-IN': {
    desc1: "प्रतिमा/व्हिडिओ सत्यापित करण्यासाठी आणि इनपुट स्वयंचलितपणे वर्गीकृत करण्यासाठी मल्टी-मोडल पार्सिंग वापरते.",
    desc2: "रिपोर्टिंग निर्देशांकांची पडताळणी करते, डुप्लिकेट तपासते आणि स्थानिक सीमा मॅप करते.",
    desc3: "क्राउडसोर्सद्वारे सत्य शोधते. वैधता तपासण्यासाठी अपवोट/डाउनवोट हाताळते.",
    desc4: "नागरीक घनत्व आणि धोका निर्देशांक मॅपिंग करणारे गतिमान प्रभाव सूत्र चालवते.",
    desc5: "अचूक कामाच्या तपशीलांचा मसुदा तयार करते, योग्य कंत्राटदाराशी जुळवून घेते आणि काम पाठवते.",
    desc6: "वास्तविक समाधानाच्या टप्प्यांचा मागोवा घेते, स्थिती अद्यतनित करते आणि बक्षीस गुण जारी करते.",
    desc7: "संरचनात्मक देखभालीची शिफारस करण्यासाठी प्रतिबंधात्मक अंतर्दृष्टी निर्माण करते.",
    reportedAnalysis: "समस्या शोध एजंटने यशस्वीरित्या वर्णन वाचले, फायलींचे विश्लेषण केले, स्वयंचलितपणे श्रेणी दिली आणि स्थानिक समुदाय पडताळणी सुरू केली.",
    investigatingAnalysis: (lat, lng) => `जिओ इंटेलिजन्स एजंटने नगरपालिका मालमत्ता निर्देशकांविरुद्ध जीपीएस निर्देशांक (${lat.toFixed(4)}, ${lng.toFixed(4)}) सत्यापित केले.`,
    verifiedAnalysis: (upvotes, verifications) => `समुदाय एकमत मर्यादेपर्यंत पोहोचले आहे. अपवोट्स: ${upvotes}. पडताळणी: ${verifications} वेळा. पाठवण्यास मान्यता दिली जात आहे.`,
    prioritizedAnalysis: (score, priority) => `प्राधान्य एजंटने प्रभाव घटकाची गणना केली: ${score}/100. प्राधान्य दिले: ${priority.toUpperCase()}.`,
    assignedAnalysis: (rec, assigned) => `निवारण शिफारस तयार केली: "${rec}". ${assigned} कडे सोपवले आहे.`,
    resolvingAnalysis: "निवारण कर्मचारी घटनास्थळी पोहोचले आहेत. सक्रिय निवारण नोंदी प्रगतिपथावर आहेत.",
    resolvedAnalysis: "निवारण पूर्ण झाले. नागरिक प्रतिबद्धता एजंटने बक्षीस गुण जारी केले. अंदाज मॉडेलने तपशील जतन केले."
  },
  'ta-IN': {
    desc1: "படங்கள்/வீடியோக்களைச் சரிபார்க்கவும், உள்ளீடுகளைத் தானாக வகைப்படுத்தவும் மல்டி-மாடல் பாகுபடுத்தலைப் பயன்படுத்துகிறது.",
    desc2: "அறிக்கையிடல் ஒருங்கிணைப்புகளைச் சரிபார்க்கிறது, நகல்களைச் சரிபார்க்கிறது மற்றும் உள்ளூர் எல்லைகளை வரைபடமாக்குகிறது.",
    desc3: "கூட்ட மூலத்திலிருந்து உண்மையை சேகரிக்கிறது. செல்லுபடியை உறுதிப்படுத்த அப்வோட்கள்/டவுன்வோட்களைக் கையாள்கிறது.",
    desc4: "குடிமக்களின் அடர்த்தி மற்றும் ஆபத்து குறியீட்டை வரைபடமாக்கும் மாறும் தாக்க சூத்திரத்தை இயக்குகிறது.",
    desc5: "துல்லியாமான வேலை விவரங்களைத் தயாரித்து, பொருத்தமான ஒப்பந்தக்காரரைப் பொருத்தி, வேலையை அனுப்புகிறது.",
    desc6: "உண்மையான தீர்வு மைல்கற்களைக் கண்காணித்து, நிலையைப் புதுப்பித்து, வெகுமதி புள்ளிகளை வழங்குகிறது.",
    desc7: "கட்டமைப்பு பராமரிப்பை பரிந்துரைக்க தடுப்பு நுண்ணறிவுகளை உருவாக்குகிறது.",
    reportedAnalysis: "கண்டறிதல் முகவர் வெற்றிகரமாக விளக்கத்தைப் படித்து, இணைப்புகளை பகுப்பாய்வு செய்து, தானாக வகையை ஒதுக்கி, உள்ளூர் சமூக சரிபார்ப்புகளைத் தொடங்கினார்.",
    investigatingAnalysis: (lat, lng) => `புவிசார் நுண்ணறிவு முகவர் நகராட்சி சொத்து குறியீடுகளுக்கு எதிராக ஜிபிஎஸ் ஒருங்கிணைப்புகளை (${lat.toFixed(4)}, ${lng.toFixed(4)}) சரிபார்த்தார்.`,
    verifiedAnalysis: (upvotes, verifications) => `சமூக ஒருமித்த கருத்து வரம்பை எட்டியுள்ளது. அப்வோட்கள்: ${upvotes}. சரிபார்க்கப்பட்டது: ${verifications} முறை. அனுப்புவதற்கு ஒப்புதல் அளிக்கப்படுகிறது.`,
    prioritizedAnalysis: (score, priority) => `முன்னுரிமை முகவர் தாக்கக் காரணியைக் கணக்கிட்டார்: ${score}/100. முன்னுரிமை ஒதுக்கப்பட்டது: ${priority.toUpperCase()}.`,
    assignedAnalysis: (rec, assigned) => `தீர்வு பரிந்துரை வரைவு செய்யப்பட்டது: "${rec}". ${assigned} இடம் ஒப்படைக்கப்பட்டது.`,
    resolvingAnalysis: "பணிக்குழு தளத்திற்கு வந்துவிட்டது. தீர்வுப் பணிகள் தீவிரமாகப் பதிவு செய்யப்பட்டு வருகின்றன.",
    resolvedAnalysis: "தீர்வு நிறைவடைந்தது. குடிமக்கள் ஈடுபாட்டு முகவர் வெகுமதி புள்ளிகளை வழங்கினார். முன்னறிவிப்பு மாதிரி விவரங்களைச் சேமித்தது."
  },
  'te-IN': {
    desc1: "చిత్రాలు/వీడియోలను ధృవీకరించడానికి మరియు ఇన్‌పుట్‌లను స్వయంచాలకంగా వర్గీకరించడానికి మల్టీ-మోడల్ పార్సింగ్‌ను ఉపయోగిస్తుంది.",
    desc2: "రిపోర్టింగ్ కోఆర్డినేట్‌లను ధృవీకరిస్తుంది, నకిలీలను తనిఖీ చేస్తుంది మరియు స్థానిక సరిహద్దులను మ్యాప్ చేస్తుంది.",
    desc3: "ప్రజల నుండి సత్యాన్ని సేకరిస్తుంది. ప్రామాణికతను నిర్ధారించడానికి అప్‌వోట్లు/డౌన్‌వోట్లను హ్యాండిల్ చేస్తుంది.",
    desc4: "పౌరుల సాంద్రత మరియు ప్రమాద సూచికను మ్యాప్ చేసే డైనమిక్ ఇంపాక్ట్ ఫార్ములాను నడుపుతుంది.",
    desc5: "ఖచ్చితమైన పని వివరాలను డ్రాఫ్ట్ చేస్తుంది, తగిన కాంట్రాక్టర్‌ను మ్యాచ్ చేస్తుంది మరియు పనిని కేటాయిస్తుంది.",
    desc6: "ఖచ్చితమైన పరిష్కార మైలురాళ్లను ట్రాక్ చేస్తుంది, స్థితిని అప్‌డేట్ చేస్తుంది మరియు రివార్డ్ పాయింట్లను ఇస్తుంది.",
    desc7: "నిర్మాణాత్మక నిర్వహణను సిఫార్సు చేయడానికి నివారణ అంతర్దృష్టులను ఉత్పత్తి చేస్తుంది.",
    reportedAnalysis: "డిటెక్షన్ ఏజెంట్ విజయవంతంగా వివరణను చదివింది, జోడింపులను విశ్లేషించింది, కేటగిరీని కేటాయించింది మరియు స్థానిక కమ్యూనిటీ ధృవీకరణలను ప్రారంభించింది.",
    investigatingAnalysis: (lat, lng) => `జియో ఇంటెలిజెన్స్ ఏజెంట్ మున్సిపల్ ఆస్తి సూచికలతో పోల్చి జిపిఎస్ కోఆర్డినేట్లను (${lat.toFixed(4)}, ${lng.toFixed(4)}) ధృవీకరించింది.`,
    verifiedAnalysis: (upvotes, verifications) => `కమ్యూనిటీ ఏకాభిప్రాయం పరిమితికి చేరుకుంది. అప్‌వోట్లు: ${upvotes}. ధృవీకరించబడింది: ${verifications} సార్లు. పంపడానికి ఆమోదిస్తున్నాము.`,
    prioritizedAnalysis: (score, priority) => `ఆద్యత ఏజెంట్ ఇంపాక్ట్ ఫ్యాక్టర్‌ను లెక్కించింది: ${score}/100. కేటాయించిన ప్రాధాన్యత: ${priority.toUpperCase()}.`,
    assignedAnalysis: (rec, assigned) => `పరిష్కార సిఫార్సు సిద్ధం చేయబడింది: "${rec}". ${assigned} కి కేటాయించబడింది.`,
    resolvingAnalysis: "సిబ్బంది ఘటనా స్థలానికి చేరుకున్నారు. పరిష్కార పనులు చురుగ్గా నమోదు చేయబడుతున్నాయి.",
    resolvedAnalysis: "పరిష్కారం పూర్తయింది. సిటిజన్ ఎంగేజ్‌మెంట్ ఏజెంట్ రివార్డ్ పాయింట్లను ఇచ్చింది. భవిష్యత్ విశ్లేషణల కోసం వివరాలు సేవ్ చేయబడ్డాయి."
  },
  'ur-IN': {
    desc1: "تصاویر/ویڈیوز کی تصدیق اور ان پٹ کو خود بخود زمرہ بندی کرنے کے لیے ملٹی موڈل پارسنگ کا استعمال کرتا ہے۔",
    desc2: "رپورٹنگ کوآرڈینیٹس کی توثیق کرتا ہے، نقلوں کو چیک کرتا ہے، اور مقامی حدود کا نقشہ بناتا ہے۔",
    desc3: "عوامی مہم کے ذریعے سچائی جمع کرتا ہے۔ صداقت کی تصدیق کے لیے اپ ووٹس/ڈاؤن ووٹس کو ہینڈل کرتا ہے۔",
    desc4: "شہری کثافت اور خطرے کے اشاریہ کی نقشہ سازی کرنے والا متحرک اثر فارمولا چلاتا ہے۔",
    desc5: "کام کی درست وضاحتیں تیار کرتا ہے، مناسب ٹھیکیدار سے میچ کرتا ہے، اور کام تفویض کرتا ہے۔",
    desc6: "حقیقی حل کے سنگ میلوں کو ٹریک کرتا ہے، اسٹیٹس اپ ڈیٹ کرتا ہے، اور انعام پوائنٹس جاری کرتا ہے۔",
    desc7: "ساختی دیکھ بھال کی سفارش کرنے کے لیے حفاظتی بصیرت پیدا کرتا ہے۔",
    reportedAnalysis: "ڈیٹیکشن ایجنٹ نے تفصیل کو کامیابی کے ساتھ پڑھا، فائلز کا تجزیہ کیا، خود بخود زمرہ تفویض کیا، اور مقامی برادری کی تصدیق شروع کی۔",
    investigatingAnalysis: (lat, lng) => `جیو انٹیلی جنس ایجنٹ نے میونسپل اثاثوں کے انڈیکس کے خلاف جی پی ایس کوآرڈینیٹس (${lat.toFixed(4)}, ${lng.toFixed(4)}) کی تصدیق کی۔`,
    verifiedAnalysis: (upvotes, verifications) => `برادری کے اتفاق رائے کی حد تک پہنچ گیا ہے۔ اپ ووٹس: ${upvotes}۔ تصدیق شدہ: ${verifications} بار۔ روانگی کی منظوری دی جا رہی ہے۔`,
    prioritizedAnalysis: (score, priority) => `ترجیحی ایجنٹ نے اثر کے عنصر کا حساب لگایا: ${score}/100۔ ترجیح تفویض کی گئی: ${priority.toUpperCase()}۔`,
    assignedAnalysis: (rec, assigned) => `حل کی سفارش تیار کی گئی: "${rec}"۔ اسے ${assigned} کے سپرد کیا گیا ہے۔`,
    resolvingAnalysis: "ٹیم جائے وقوعہ پر پہنچ گئی ہے۔ حل کا عمل فعال طور پر لاگ کیا جا رہا ہے۔",
    resolvedAnalysis: "حل مکمل ہو گیا۔ سٹیزن انگیجمنٹ ایجنٹ نے انعام پوائنٹس جاری کیے۔ قبل از وقت ماڈل نے مستقبل کے تجزیے کے لیے تفصیلات محفوظ کر لیں۔"
  }
};

const awaitingSpecsMap: Record<string, string> = {
  'en-US': 'Awaiting dispatch specs',
  'hi-IN': 'प्रेषण विनिर्देशों की प्रतीक्षा है',
  'bn-IN': 'প্রেরণ বিবরণীর জন্য অপেক্ষা করা হচ্ছে',
  'gu-IN': 'રવાનગી વિગતોની રાહ જોવાઈ રહી છે',
  'kn-IN': 'ರವಾನೆ ವಿವರಗಳಿಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ',
  'ml-IN': 'ഡിസ്പാച്ച് വിവരങ്ങൾക്കായി കാത്തിരിക്കുന്നു',
  'mr-IN': 'पाठवण्याच्या तपशीलांची वाट पाहत आहे',
  'ta-IN': 'அனுப்புதல் விவரங்களுக்காகக் காத்திருக்கிறது',
  'te-IN': 'పంపే వివరాల కోసం వేచి ఉంది',
  'ur-IN': 'روانگی کی تفصیلات کا انتظار ہے'
};

const publicWorksMap: Record<string, string> = {
  'en-US': 'Public Works',
  'hi-IN': 'लोक निर्माण विभाग',
  'bn-IN': 'গণপূर्त বিভাগ',
  'gu-IN': 'જાહેર બાંધકામ વિભાગ',
  'kn-IN': 'ಲೋಕೋಪಯೋಗಿ ಇಲಾಖೆ',
  'ml-IN': 'പൊതുമരാമത്ത് വകുപ്പ്',
  'mr-IN': 'सार्वजनिक बांधकाम विभाग',
  'ta-IN': 'பொதுப்பணித்துறை',
  'te-IN': 'ప్రజా పనుల విభాగం',
  'ur-IN': 'محکمہ تعمیرات عامہ'
};

export default function WorkflowDisplay({ activeIssue, langCode }: WorkflowDisplayProps) {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en-US'];
  const wl = WORKFLOW_LOCALIZED[langCode] || WORKFLOW_LOCALIZED['en-US'];

  // Defining the 7 stages of the Citizen to Prediction resolution pipeline
  const pipelineSteps = [
    {
      id: 1,
      status: 'reported' as IssueStatus,
      title: t.citizenReporting || 'Citizen Reporting',
      agent: t.issueDetectionAgent || 'Issue Detection Agent',
      agentDesc: wl.desc1,
      icon: Users,
      color: 'text-blue-400 bg-blue-500/15 border-blue-500/20',
      activeColor: 'bg-blue-500/15 border-blue-500/40 text-blue-300 shadow-lg shadow-blue-500/10'
    },
    {
      id: 2,
      status: 'investigating' as IssueStatus,
      title: t.aiInvestigation || 'AI Investigation',
      agent: t.geoIntelligenceAgent || 'Geo Intelligence Agent',
      agentDesc: wl.desc2,
      icon: MapPin,
      color: 'text-purple-400 bg-purple-500/15 border-purple-500/20',
      activeColor: 'bg-purple-500/15 border-purple-500/40 text-purple-300 shadow-lg shadow-purple-500/10'
    },
    {
      id: 3,
      status: 'verified' as IssueStatus,
      title: t.communityVerification || 'Community Verification',
      agent: t.communityVerificationAgent || 'Community Verification Agent',
      agentDesc: wl.desc3,
      icon: CheckCircle2,
      color: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/20',
      activeColor: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-lg shadow-indigo-500/10'
    },
    {
      id: 4,
      status: 'prioritized' as IssueStatus,
      title: t.smartPrioritization || 'Smart Prioritization',
      agent: t.prioritizationAgent || 'Prioritization Agent',
      agentDesc: wl.desc4,
      icon: ShieldAlert,
      color: 'text-rose-400 bg-rose-500/15 border-rose-500/20',
      activeColor: 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-lg shadow-rose-500/10'
    },
    {
      id: 5,
      status: 'assigned' as IssueStatus,
      title: t.authorityAssignment || 'Authority Assignment',
      agent: t.resRecAgent || 'Resolution Recommendation Agent',
      agentDesc: wl.desc5,
      icon: ArrowRightLeft,
      color: 'text-amber-400 bg-amber-500/15 border-amber-500/20',
      activeColor: 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/10'
    },
    {
      id: 6,
      status: 'resolving' as IssueStatus,
      title: t.resTracking || 'Resolution Tracking',
      agent: t.citizenEngAgent || 'Citizen Engagement Agent',
      agentDesc: wl.desc6,
      icon: BadgeCheck,
      color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/20',
      activeColor: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/10'
    },
    {
      id: 7,
      status: 'resolved' as IssueStatus,
      title: t.predPrevention || 'Prediction & Prevention',
      agent: t.civicIntelAgent || 'Civic Intelligence Agent',
      agentDesc: wl.desc7,
      icon: Sparkles,
      color: 'text-pink-400 bg-pink-500/15 border-pink-500/20',
      activeColor: 'bg-pink-500/15 border-pink-500/40 text-pink-300 shadow-lg shadow-pink-500/10'
    }
  ];

  // Map issue status to current active pipeline step
  const getActiveStepIndex = () => {
    if (!activeIssue) return -1;
    const index = pipelineSteps.findIndex(step => step.status === activeIssue.status);
    return index !== -1 ? index : 0;
  };

  const activeStepIndex = getActiveStepIndex();

  return (
    <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            {t.aiPipeline || "AI Multi-Agent Pipeline"}
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            {t.transparentTracking || "Transparent tracking of municipal resolutions across smart intelligence layers."}
          </p>
        </div>
        
        {activeIssue ? (
          <div className="text-right backdrop-blur-md bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs">
            <span className="text-slate-400 mr-1.5">{t.analyzing || "Analyzing:"}</span>
            <span className="font-bold text-blue-400">{activeIssue.title}</span>
          </div>
        ) : (
          <div className="backdrop-blur-md bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-[11px] text-amber-300 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            {t.selectIssueHint || "Select an issue from the feed to track its live agent routing"}
          </div>
        )}
      </div>

      {/* Horizontal Pipeline Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 mb-6 relative">
        {pipelineSteps.map((step, idx) => {
          const isCompleted = activeIssue ? idx < activeStepIndex : false;
          const isActive = activeIssue ? idx === activeStepIndex : false;
          const StepIcon = step.icon;

          return (
            <div 
              key={step.id}
              className={`flex flex-col justify-between p-3.5 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                isActive 
                  ? `${step.activeColor} ring-2 ring-blue-500/20`
                  : isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 opacity-90'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
              }`}
              onClick={() => setSelectedAgent(selectedAgent === idx ? null : idx)}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`p-1.5 rounded-xl border ${step.color}`}>
                  <StepIcon className="w-4 h-4" />
                </span>
                
                {/* Microstatus badges */}
                {isActive && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                )}
                {isCompleted && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
              </div>

              <div>
                <span className="block text-[10px] font-mono tracking-wide text-slate-500 mb-0.5">{(t.stage || "STAGE").toUpperCase()} 0{step.id}</span>
                <h4 className="font-display font-semibold text-xs text-white line-clamp-1 group-hover:text-blue-400">
                  {step.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5 font-medium line-clamp-1">
                  {step.agent}
                </p>
              </div>

              {/* Connected Line indicators on desktop */}
              {idx < 6 && (
                <div className="hidden lg:block absolute left-[98%] top-1/2 transform -translate-y-1/2 z-10 text-white/10">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Agent Detail Focus Modal / Drawers */}
      <AnimatePresence mode="wait">
        {(selectedAgent !== null || activeStepIndex !== -1) && (
          <motion.div
            key={selectedAgent !== null ? selectedAgent : activeStepIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            {(() => {
              const currentFocusIdx = selectedAgent !== null ? selectedAgent : activeStepIndex;
              const step = pipelineSteps[currentFocusIdx];
              if (!step) return null;
              const FocusIcon = step.icon;

              return (
                <>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-2xl border bg-slate-900 border-white/10 ${step.color} shrink-0`}>
                      <FocusIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[9px] font-bold text-blue-400 tracking-wider bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/20">
                          {t.agentLayer || "AGENT LAYER"} {currentFocusIdx + 1}/7
                        </span>
                        <h4 className="font-display font-bold text-sm text-white">{step.agent}</h4>
                      </div>
                      <p className="text-xs font-sans text-slate-300 mt-1 max-w-xl">
                        {step.agentDesc}
                      </p>
                      
                      {activeIssue && currentFocusIdx === activeStepIndex && (
                        <div className="mt-3 bg-white/5 border border-white/10 rounded-xl p-2.5 text-[11px] text-slate-200 flex items-start gap-2 max-w-lg">
                          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-white block mb-0.5">{t.liveAgentAnalysis || "Live Agent Analysis"}:</span>
                            {activeIssue.status === 'reported' && wl.reportedAnalysis}
                            {activeIssue.status === 'investigating' && wl.investigatingAnalysis(activeIssue.lat, activeIssue.lng)}
                            {activeIssue.status === 'verified' && wl.verifiedAnalysis(activeIssue.upvotes || 0, activeIssue.verificationCount || 0)}
                            {activeIssue.status === 'prioritized' && wl.prioritizedAnalysis(activeIssue.aiImpactScore || 0, activeIssue.priority)}
                            {activeIssue.status === 'assigned' && wl.assignedAnalysis(
                              activeIssue.aiResolutionRecommendation || (awaitingSpecsMap[langCode] || awaitingSpecsMap['en-US']), 
                              activeIssue.authorityAssigned || (publicWorksMap[langCode] || publicWorksMap['en-US'])
                            )}
                            {activeIssue.status === 'resolving' && wl.resolvingAnalysis}
                            {activeIssue.status === 'resolved' && wl.resolvedAnalysis}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 p-2.5 rounded-xl shrink-0">
                    <span className="font-semibold block text-white mb-0.5">{t.milestoneEvent || "Milestone Event"}:</span>
                    <span>{t.status || "Status"}: {(t[step.status] || step.status).toUpperCase()}</span>
                    <span className="block mt-0.5 opacity-80">{t.webhookTrigger || "Trigger: Automated API Webhook"}</span>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
