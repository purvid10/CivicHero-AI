import { Issue } from '../types';

export interface SafetyCenter {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'hospital' | 'police' | 'shelter';
  detail: string;
  capacity?: string;
  contact?: string;
}

export interface RiskZone {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  riskLevel: 'High' | 'Medium' | 'Low';
}

// 29 Major cities representing states and union territories in India
export const INDIAN_SAFETY_CENTERS: SafetyCenter[] = [
  // 1. Andhra Pradesh (Vijayawada)
  { id: 'ind-h-1', name: 'Vijayawada Metro General Hospital', lat: 16.5110, lng: 80.6410, type: 'hospital', detail: '24/7 Level-1 Trauma Care' },
  { id: 'ind-p-1', name: 'Vijayawada Central Police HQ', lat: 16.5020, lng: 80.6550, type: 'police', detail: 'State Dispatch & Patrol Command' },
  { id: 'ind-s-1', name: 'Amaravati Community Shelter', lat: 16.5200, lng: 80.6280, type: 'shelter', detail: 'Capacity: 150 beds', contact: 'AP Safety Cell' },

  // 2. Arunachal Pradesh (Itanagar)
  { id: 'ind-h-2', name: 'Itanagar District Medical Center', lat: 27.0910, lng: 93.6120, type: 'hospital', detail: 'Primary Emergency Care' },
  { id: 'ind-p-2', name: 'Itanagar Police Substation', lat: 27.0780, lng: 93.5980, type: 'police', detail: 'Hilly terrain patrol dispatch' },
  { id: 'ind-s-2', name: 'Ganga Lake Emergency Refuge', lat: 27.0810, lng: 93.6150, type: 'shelter', detail: 'Capacity: 80 beds', contact: 'Arunachal Disaster Mgmt' },

  // 3. Assam (Guwahati)
  { id: 'ind-h-3', name: 'Guwahati Medical College & Hospital', lat: 26.1520, lng: 91.7450, type: 'hospital', detail: 'Super-specialty Trauma Ward' },
  { id: 'ind-p-3', name: 'Paltan Bazaar Police HQ', lat: 26.1380, lng: 91.7300, type: 'police', detail: 'Guwahati Metropolitan Command' },
  { id: 'ind-s-3', name: 'Brahmaputra Flood Relief Shelter', lat: 26.1600, lng: 91.7200, type: 'shelter', detail: 'Capacity: 500 beds', contact: 'Assam State Disaster Authority' },

  // 4. Bihar (Patna)
  { id: 'ind-h-4', name: 'Patna Medical College Hospital (PMCH)', lat: 25.6020, lng: 85.1480, type: 'hospital', detail: '24/7 Casualty & Surgical Care' },
  { id: 'ind-p-4', name: 'Patna Secretariat Police Station', lat: 25.5880, lng: 85.1220, type: 'police', detail: 'Urban Security & Dispatch' },
  { id: 'ind-s-4', name: 'Gandhi Maidan Disaster Safehouse', lat: 25.6120, lng: 85.1380, type: 'shelter', detail: 'Capacity: 300 beds', contact: 'Bihar Disaster Response' },

  // 5. Chhattisgarh (Raipur)
  { id: 'ind-h-5', name: 'Raipur Civic Trauma Hospital', lat: 21.2580, lng: 81.6350, type: 'hospital', detail: 'Emergency ICU Block' },
  { id: 'ind-p-5', name: 'Raipur Sector-5 Police Command', lat: 21.2420, lng: 81.6210, type: 'police', detail: 'Active City Surveillance Group' },
  { id: 'ind-s-5', name: 'Naya Raipur Rescue Shelter', lat: 21.2650, lng: 81.6450, type: 'shelter', detail: 'Capacity: 200 beds', contact: 'CG Relief Comm' },

  // 6. Goa (Panaji)
  { id: 'ind-h-6', name: 'Goa Memorial Hospital - Panaji', lat: 15.4980, lng: 73.8350, type: 'hospital', detail: 'Coastal Emergency Medical Care' },
  { id: 'ind-p-6', name: 'Panaji Town Security HQ', lat: 15.4850, lng: 73.8200, type: 'police', detail: 'Tourist & Local Patrol Dispatch' },
  { id: 'ind-s-6', name: 'Mandovi River Community Shelter', lat: 15.5020, lng: 73.8150, type: 'shelter', detail: 'Capacity: 120 beds', contact: 'Goa Fire & Emergency Service' },

  // 7. Gujarat (Ahmedabad)
  { id: 'ind-h-7', name: 'Ahmedabad Civil Hospital', lat: 23.0310, lng: 72.5820, type: 'hospital', detail: 'Largest Super-Specialty Medical HQ' },
  { id: 'ind-p-7', name: 'Sabarmati Police Station HQ', lat: 23.0150, lng: 72.5600, type: 'police', detail: 'Ahmedabad West Command' },
  { id: 'ind-s-7', name: 'Kankaria Public Crisis Safe Haven', lat: 22.9990, lng: 72.5950, type: 'shelter', detail: 'Capacity: 400 beds', contact: 'Gujarat Disaster Control' },

  // 8. Haryana (Gurugram)
  { id: 'ind-h-8', name: 'Gurugram Metro Trauma Center', lat: 28.4680, lng: 77.0350, type: 'hospital', detail: 'Critical ICU & Burn Unit' },
  { id: 'ind-p-8', name: 'DLF Phase 3 Police Cyber Command', lat: 28.4520, lng: 77.0120, type: 'police', detail: 'Gurugram Police Hub' },
  { id: 'ind-s-8', name: 'Sector-44 Multi-Purpose Shelter', lat: 28.4410, lng: 77.0450, type: 'shelter', detail: 'Capacity: 250 beds', contact: 'Haryana Emergency Cell' },

  // 9. Himachal Pradesh (Shimla)
  { id: 'ind-h-9', name: 'Shimla Ridge Emergency Hospital', lat: 31.1120, lng: 77.1820, type: 'hospital', detail: 'Mountain Rescue Medical HQ' },
  { id: 'ind-p-9', name: 'Mall Road Central Police Post', lat: 31.0980, lng: 77.1650, type: 'police', detail: 'High-Altitude Patrol Unit' },
  { id: 'ind-s-9', name: 'Shimla Transit Refuge Shelter', lat: 31.1020, lng: 77.1550, type: 'shelter', detail: 'Capacity: 100 beds', contact: 'HP Emergency Rescue' },

  // 10. Jharkhand (Ranchi)
  { id: 'ind-h-10', name: 'Ranchi Medical College Hospital (RIMS)', lat: 23.3550, lng: 85.3180, type: 'hospital', detail: '24/7 Specialty Emergency Room' },
  { id: 'ind-p-10', name: 'Lalpur Circle Police Command', lat: 23.3320, lng: 85.2950, type: 'police', detail: 'Urban Law Enforcement Hub' },
  { id: 'ind-s-10', name: 'Morabadi Ground Safe Dome', lat: 23.3650, lng: 85.3120, type: 'shelter', detail: 'Capacity: 200 beds', contact: 'Jharkhand Disaster Board' },

  // 11. Karnataka (Bengaluru)
  { id: 'ind-h-11', name: 'Bengaluru Victoria Super-Specialty Hospital', lat: 12.9800, lng: 77.6050, type: 'hospital', detail: 'Level-1 Emergency & ICU Complex' },
  { id: 'ind-p-11', name: 'Koramangala Metropolitan Police Station', lat: 12.9620, lng: 77.5850, type: 'police', detail: 'Main South-Zone Active Dispatch' },
  { id: 'ind-s-11', name: 'Indiranagar Community Crisis Shelter', lat: 12.9750, lng: 77.6250, type: 'shelter', detail: 'Capacity: 350 beds', contact: 'BBMP Disaster Response Desk' },

  // 12. Kerala (Kochi)
  { id: 'ind-h-12', name: 'Ernakulam Government General Hospital', lat: 9.9410, lng: 76.2750, type: 'hospital', detail: 'Specialty Coastal Trauma & Burns Care' },
  { id: 'ind-p-12', name: 'Kochi Marine Drive Police Command', lat: 9.9220, lng: 76.2550, type: 'police', detail: 'Port & Coastal Security Patrol' },
  { id: 'ind-s-12', name: 'Kadavanthra Safe Haven Shelter', lat: 9.9320, lng: 76.2880, type: 'shelter', detail: 'Capacity: 220 beds', contact: 'Kerala State SDMA' },

  // 13. Madhya Pradesh (Bhopal)
  { id: 'ind-h-13', name: 'Bhopal Memorial Medical Hospital', lat: 23.2680, lng: 77.4250, type: 'hospital', detail: '24/7 Critical & Pulmonary Care' },
  { id: 'ind-p-13', name: 'Arera Hills Central Police Post', lat: 23.2450, lng: 77.3990, type: 'police', detail: 'Capital Security & Dispatch Hub' },
  { id: 'ind-s-13', name: 'TT Nagar Emergency Relief Shelter', lat: 23.2510, lng: 77.4080, type: 'shelter', detail: 'Capacity: 180 beds', contact: 'MP Relief Department' },

  // 14. Maharashtra (Mumbai)
  { id: 'ind-h-14', name: 'King Edward Memorial Hospital (KEM)', lat: 19.0850, lng: 72.8850, type: 'hospital', detail: 'Premier 24/7 Level-1 Trauma Hospital' },
  { id: 'ind-p-14', name: 'Mumbai Police HQ - Colaba / Bandra', lat: 19.0680, lng: 72.8620, type: 'police', detail: 'Unified Command & Emergency Dispatch' },
  { id: 'ind-s-14', name: 'Dharavi Public safe Haven', lat: 19.0410, lng: 72.8520, type: 'shelter', detail: 'Capacity: 600 beds', contact: 'MCGM Emergency Cell' },

  // 15. Manipur (Imphal)
  { id: 'ind-h-15', name: 'Imphal Regional Medical Institute (RIMS)', lat: 24.8250, lng: 93.9450, type: 'hospital', detail: 'State Trauma & Emergency Complex' },
  { id: 'ind-p-15', name: 'Imphal West Police Station HQ', lat: 24.8090, lng: 93.9250, type: 'police', detail: 'Hilly terrain patrol division' },
  { id: 'ind-s-15', name: 'Khangabok Community Refuge', lat: 24.8140, lng: 93.9310, type: 'shelter', detail: 'Capacity: 100 beds', contact: 'Manipur Rescue Team' },

  // 16. Meghalaya (Shillong)
  { id: 'ind-h-16', name: 'Shillong Civil General Hospital', lat: 25.5860, lng: 91.9020, type: 'hospital', detail: 'Primary Mountain Emergency Ward' },
  { id: 'ind-p-16', name: 'Police Bazaar Main Station', lat: 25.5720, lng: 91.8820, type: 'police', detail: 'Hill Station Patrol & Dispatch' },
  { id: 'ind-s-16', name: 'Laitumkhrah Safe Transit Shelter', lat: 25.5790, lng: 91.9120, type: 'shelter', detail: 'Capacity: 90 beds', contact: 'Meghalaya State Authority' },

  // 17. Mizoram (Aizawl)
  { id: 'ind-h-17', name: 'Aizawl State Specialty Hospital', lat: 23.7350, lng: 92.7260, type: 'hospital', detail: 'Trauma & Hill Emergency Wing' },
  { id: 'ind-p-17', name: 'Aizawl Central Police Barracks', lat: 23.7190, lng: 92.7090, type: 'police', detail: 'Active Terrain Safety Patrol' },
  { id: 'ind-s-17', name: 'Tuikhuahtlang Safe Haven Dome', lat: 23.7250, lng: 92.7150, type: 'shelter', detail: 'Capacity: 80 beds', contact: 'Mizoram SDMA Desk' },

  // 18. Nagaland (Kohima)
  { id: 'ind-h-18', name: 'Naga Hospital Authority Kohima', lat: 25.6820, lng: 94.1160, type: 'hospital', detail: 'Primary Emergency Medical Hub' },
  { id: 'ind-p-18', name: 'Kohima Sadar Police Station', lat: 25.6660, lng: 94.0990, type: 'police', detail: 'District Highway Control Patrol' },
  { id: 'ind-s-18', name: 'Kohima Local Refugee Shelter', lat: 25.6710, lng: 94.1050, type: 'shelter', detail: 'Capacity: 110 beds', contact: 'Nagaland Emergency Command' },

  // 19. Odisha (Bhubaneswar)
  { id: 'ind-h-19', name: 'AIIMS Bhubaneswar Emergency', lat: 20.3050, lng: 85.8320, type: 'hospital', detail: 'Elite Disaster & Trauma Center' },
  { id: 'ind-p-19', name: 'Saheed Nagar Commissionerate Police', lat: 20.2880, lng: 85.8150, type: 'police', detail: 'Capital City Patrol Dispatch' },
  { id: 'ind-s-19', name: 'Bhubaneswar Cyclone Safe Center', lat: 20.2920, lng: 85.8450, type: 'shelter', detail: 'Capacity: 450 beds', contact: 'Odisha OSDMA Force' },

  // 20. Punjab (Amritsar)
  { id: 'ind-h-20', name: 'Amritsar Guru Nanak Dev Hospital', lat: 31.6420, lng: 74.8820, type: 'hospital', detail: '24/7 Acute Care & Surgery Wing' },
  { id: 'ind-p-20', name: 'Amritsar Golden Temple Security Post', lat: 31.6260, lng: 74.8620, type: 'police', detail: 'High-Volume Crowd Safety Dispatch' },
  { id: 'ind-s-20', name: 'Ranjit Avenue Disaster Shelter', lat: 31.6500, lng: 74.8690, type: 'shelter', detail: 'Capacity: 180 beds', contact: 'Punjab Civil Protection' },

  // 21. Rajasthan (Jaipur)
  { id: 'ind-h-21', name: 'SMS Hospital Jaipur (Sawai Man Singh)', lat: 26.9210, lng: 75.7950, type: 'hospital', detail: 'Premier state-level Trauma Center' },
  { id: 'ind-p-21', name: 'Jaipur Central Police Commissionerate', lat: 26.9030, lng: 75.7790, type: 'police', detail: 'Pink City Command & Active Response' },
  { id: 'ind-s-21', name: 'Mansarovar Safety Zone Shelter', lat: 26.8920, lng: 75.7580, type: 'shelter', detail: 'Capacity: 300 beds', contact: 'Rajasthan State Rescue' },

  // 22. Sikkim (Gangtok)
  { id: 'ind-h-22', name: 'Sir Thutob Namgyal Memorial Hospital', lat: 27.3390, lng: 88.6210, type: 'hospital', detail: 'Himalayan Trauma & Pulmonary Care' },
  { id: 'ind-p-22', name: 'Gangtok Sadar Police Hub', lat: 27.3230, lng: 88.6050, type: 'police', detail: 'High altitude patrol coordination' },
  { id: 'ind-s-22', name: 'Development Area Safe Haven', lat: 27.3300, lng: 88.6110, type: 'shelter', detail: 'Capacity: 85 beds', contact: 'Sikkim Landslide Desk' },

  // 23. Tamil Nadu (Chennai)
  { id: 'ind-h-23', name: 'Rajiv Gandhi Government General Hospital', lat: 13.0910, lng: 80.2790, type: 'hospital', detail: '2000-bed Level-1 Trauma Hospital' },
  { id: 'ind-p-23', name: 'Vepery Chennai Police Headquarters', lat: 13.0740, lng: 80.2590, type: 'police', detail: 'Capital Security Center & Dispatch Control' },
  { id: 'ind-s-23', name: 'Marina Coastal Flood Refuge', lat: 13.0610, lng: 80.2820, type: 'shelter', detail: 'Capacity: 500 beds', contact: 'TNSDMA Emergency Force' },

  // 24. Telangana (Hyderabad)
  { id: 'ind-h-24', name: 'NIMS Hospital Hyderabad', lat: 17.3930, lng: 78.4950, type: 'hospital', detail: 'Elite Emergency Care & ICU Complex' },
  { id: 'ind-p-24', name: 'Cyberabad Police Commissionerate HQ', lat: 17.3770, lng: 78.4750, type: 'police', detail: 'Tech-enabled Command & Dispatch' },
  { id: 'ind-s-24', name: 'Gachibowli Public Emergency Shelter', lat: 17.4420, lng: 78.3480, type: 'shelter', detail: 'Capacity: 350 beds', contact: 'Telangana Fire & Rescue' },

  // 25. Tripura (Agartala)
  { id: 'ind-h-25', name: 'Agartala Government Medical College', lat: 23.8395, lng: 91.2950, type: 'hospital', detail: 'State Specialty Trauma Ward' },
  { id: 'ind-p-25', name: 'Agartala Central Police Station', lat: 23.8235, lng: 91.2780, type: 'police', detail: 'Border Security & Patrol Dispatch' },
  { id: 'ind-s-25', name: 'Melarmath Disaster Relief Center', lat: 23.8300, lng: 91.2840, type: 'shelter', detail: 'Capacity: 120 beds', contact: 'Tripura SDMA Desk' },

  // 26. Uttar Pradesh (Lucknow)
  { id: 'ind-h-26', name: 'KGMU Emergency Trauma Center - Lucknow', lat: 26.8547, lng: 80.9542, type: 'hospital', detail: 'Premier 24/7 Level-1 Trauma Center' },
  { id: 'ind-p-26', name: 'Hazratganj Central Police Station', lat: 26.8387, lng: 80.9382, type: 'police', detail: 'Capital City Patrol Command & dispatch' },
  { id: 'ind-s-26', name: 'Gomti Nagar Emergency Refuge', lat: 26.8480, lng: 80.9920, type: 'shelter', detail: 'Capacity: 400 beds', contact: 'UP Disaster Response Relief' },

  // 27. Uttarakhand (Dehradun)
  { id: 'ind-h-27', name: 'Doon Government Hospital & Trauma', lat: 30.3245, lng: 78.0402, type: 'hospital', detail: 'Mountain Disaster Trauma Complex' },
  { id: 'ind-p-27', name: 'Dehradun Secretariat Police HQ', lat: 30.3085, lng: 78.0242, type: 'police', detail: 'Hill Patrol Command & Rescue Center' },
  { id: 'ind-s-27', name: 'Rajpur Road Safe Transit Dome', lat: 30.3340, lng: 78.0550, type: 'shelter', detail: 'Capacity: 160 beds', contact: 'Uttarakhand SDRF HQ' },

  // 28. West Bengal (Kolkata)
  { id: 'ind-h-28', name: 'SSKM Super-Specialty Hospital - Kolkata', lat: 22.5806, lng: 88.3719, type: 'hospital', detail: 'Premier 24/7 Emergency & ICU Command' },
  { id: 'ind-p-28', name: 'Lalbazar Kolkata Police Headquarters', lat: 22.5646, lng: 88.3559, type: 'police', detail: 'Unified Metropolitan Dispatch Command' },
  { id: 'ind-s-28', name: 'Salt Lake Cyclone Relief Center', lat: 22.5850, lng: 88.4150, type: 'shelter', detail: 'Capacity: 450 beds', contact: 'West Bengal Disaster Authority' },

  // 29. Delhi / New Delhi
  { id: 'ind-h-29', name: 'AIIMS New Delhi Trauma Center', lat: 28.6219, lng: 77.2170, type: 'hospital', detail: 'Indias Prime Level-1 Trauma Hospital' },
  { id: 'ind-p-29', name: 'Connaught Place Police HQ', lat: 28.6059, lng: 77.2010, type: 'police', detail: 'Unified Central Capital Dispatch Area' },
  { id: 'ind-s-29', name: 'Pragati Maidan Crisis Safe Zone', lat: 28.6150, lng: 77.2420, type: 'shelter', detail: 'Capacity: 500 beds', contact: 'Delhi Disaster Management Force' }
];

// Preseeded risk/flood zones for major vulnerable regions in India
export const INDIAN_RISK_ZONES: RiskZone[] = [
  { id: 'ind-rz-1', name: 'Guwahati Brahmaputra Lowland Flooding Area', lat: 26.1700, lng: 91.7300, radius: 2500, riskLevel: 'High' },
  { id: 'ind-rz-2', name: 'Chennai Adyar River Coastal Inundation Zone', lat: 13.0100, lng: 80.2400, radius: 2200, riskLevel: 'High' },
  { id: 'ind-rz-3', name: 'Mumbai Mithi River Drainage Spill Zone', lat: 19.0650, lng: 72.8750, radius: 1800, riskLevel: 'High' },
  { id: 'ind-rz-4', name: 'Kolkata East Wetlands Water Logging Sector', lat: 22.5600, lng: 88.4300, radius: 2000, riskLevel: 'Medium' },
  { id: 'ind-rz-5', name: 'Patna Ganga River Plain Silt Danger Area', lat: 25.6250, lng: 85.1600, radius: 2400, riskLevel: 'Medium' }
];

// High-fidelity preseeded sample issues for all 29 states in India
export const INDIAN_SAMPLE_ISSUES: Issue[] = [
  // 1. Andhra Pradesh (Vijayawada)
  {
    id: 'ind-issue-1',
    title: 'Severe Canal Bank Erosion & Waterlogging',
    category: 'Water Leakage',
    description: 'A major breach in the local Eluru canal side-wall near Vijayawada Junction is leaking high-pressure municipal bypass water, flooding adjacent lanes and weakening structural soil foundations.',
    priority: 'high',
    status: 'prioritized',
    lat: 16.5160,
    lng: 80.6440,
    upvotes: 48,
    downvotes: 1,
    verificationCount: 12,
    reportedBy: 'Kalyan Prasad',
    reportedAt: '2026-06-24, 09:12 AM',
    aiSummary: 'Canal embankment failure. Medium-velocity water discharging into high-traffic transit corridors. Structural threat detected.',
    aiImpactScore: 78,
    aiPreventionInsight: 'Prolonged exposure will wash out road base gravel, inducing sub-surface cavities and high-risk sinkholes within 72 hours.',
    aiResolutionRecommendation: 'Deploy sandbags and temporary sheet-piles to contain the leakage. Order emergency canal-gate closure.',
    authorityAssigned: 'Andhra Pradesh Irrigation & Water Resources',
    timeline: [
      { status: 'reported', timestamp: '09:12 AM', title: 'Embankment Breach Logged', description: 'Citizen Kalyan reported extreme flow over the paved street.' },
      { status: 'investigating', timestamp: '09:15 AM', title: 'Flow Vector Triage', description: 'AI Agent mapped water flow and dispatched warning to the local Irrigation desk.' }
    ]
  },
  // 2. Arunachal Pradesh (Itanagar)
  {
    id: 'ind-issue-2',
    title: 'Hillslope Rockfall & Roadway Blockage',
    category: 'Public Infrastructure',
    description: 'Heavy rainfall has triggered a landslide rockfall on National Highway 415 near Itanagar, depositing large stone boulders that completely block two active transit lanes.',
    priority: 'critical',
    status: 'assigned',
    lat: 27.0850,
    lng: 93.6060,
    upvotes: 82,
    downvotes: 0,
    verificationCount: 22,
    reportedBy: 'Tashi Dorjee',
    reportedAt: '2026-06-24, 06:40 AM',
    aiSummary: 'Severe landslide hazard. Key hill-highway transit artery severed. High risks of secondary debris falls.',
    aiImpactScore: 94,
    aiPreventionInsight: 'Secondary rains will trigger residual gravel slides, threatening vehicles parked nearby. Immediate warning needed.',
    aiResolutionRecommendation: 'Mobilize heavy hydraulic excavators and rock-clearing explosive teams. Establish safety perimeter.',
    authorityAssigned: 'Arunachal Public Works Department & NHAI',
    timeline: [
      { status: 'reported', timestamp: '06:40 AM', title: 'Landslide Debris Logged', description: 'Tashi Dorjee reported large boulders on the road.' },
      { status: 'investigating', timestamp: '06:42 AM', title: 'Terrain Analysis Active', description: 'Satellite imagery matches landslide vector. Alert flagged to Border Roads Organisation.' }
    ]
  },
  // 3. Assam (Guwahati)
  {
    id: 'ind-issue-3',
    title: 'Brahmaputra Backflow Drainage Clog',
    category: 'Water Leakage',
    description: 'Grave civic drainage backflow in Guwahati near Paltan Bazaar. Debris blockage is keeping storm drains from releasing monsoon waters, leading to hip-deep waterlogging.',
    priority: 'critical',
    status: 'investigating',
    lat: 26.1410,
    lng: 91.7340,
    upvotes: 95,
    downvotes: 2,
    verificationCount: 31,
    reportedBy: 'Anirudh Saikia',
    reportedAt: '2026-06-24, 11:10 AM',
    aiSummary: 'Critical drainage failure compounded by river high-tide level backflow. Heavy flood-risk warning active.',
    aiImpactScore: 96,
    aiPreventionInsight: 'Stagnant water will trigger vector-borne outbreaks and severely affect commercial establishments within 24 hours.',
    aiResolutionRecommendation: 'Activate high-horsepower diesel pumping systems and deploy divers to clear primary intake gates of solid plastic waste.',
    authorityAssigned: 'Guwahati Municipal Corporation (GMC)',
    timeline: [
      { status: 'reported', timestamp: '11:10 AM', title: 'Severe Flooding Reported', description: 'Citizen reported backflow with water reaching building lobby levels.' }
    ]
  },
  // 4. Bihar (Patna)
  {
    id: 'ind-issue-4',
    title: 'Grave Trash Accumulation & Drain Clogging',
    category: 'Waste Management',
    description: 'Unregulated medical and industrial waste dumping on Patna Bypass road near PMCH. Piles of discarded materials are choking adjacent roadside storm-drains and releasing high pungent biological odor.',
    priority: 'high',
    status: 'reported',
    lat: 25.5960,
    lng: 85.1410,
    upvotes: 41,
    downvotes: 1,
    verificationCount: 9,
    reportedBy: 'Ramesh Sinha',
    reportedAt: '2026-06-25, 08:30 AM',
    aiSummary: 'Hazardous garbage heap blocks storm-water channel. Unchecked dump site has high risk of toxic sub-surface leachate.',
    aiImpactScore: 82,
    aiPreventionInsight: 'Unregulated medical waste attracts vector pests and poses direct biohazard risks to dense nearby slums.',
    aiResolutionRecommendation: 'Mobilize municipal hazardous waste loader. Issue notices to surrounding private clinics. Install surveillance cameras.',
    authorityAssigned: 'Patna Nagar Nigam (PNN)',
    timeline: [
      { status: 'reported', timestamp: '08:30 AM', title: 'Hazardous Dump Logged', description: 'Resident Ramesh reports toxic bio-waste bags alongside bypass road.' }
    ]
  },
  // 5. Chhattisgarh (Raipur)
  {
    id: 'ind-issue-5',
    title: 'Main Arterial Road Asphalt Sinkhole',
    category: 'Potholes',
    description: 'A massive 4-meter wide sinkhole has suddenly collapsed on the Raipur main Ring Road, exposing sub-grade utility cables. High threat to night commuters.',
    priority: 'critical',
    status: 'prioritized',
    lat: 21.2530,
    lng: 81.6310,
    upvotes: 74,
    downvotes: 0,
    verificationCount: 18,
    reportedBy: 'Amit Baghel',
    reportedAt: '2026-06-25, 01:15 AM',
    aiSummary: 'Major sub-surface structural cavity collapse. Main transit ring lane is entirely unsafe for heavy trailers and trucks.',
    aiImpactScore: 91,
    aiPreventionInsight: 'Vibrations from heavy transit trucks will trigger wider asphalt cracks, threatening adjacent active high-voltage power conduits.',
    aiResolutionRecommendation: 'Set up warning barricades immediately. Fill the cavity with sand-cement slurry and deploy gravel-rolling compaction crews.',
    authorityAssigned: 'Raipur Municipal Corporation',
    timeline: [
      { status: 'reported', timestamp: '01:15 AM', title: 'Road Cavity Collapse', description: 'Reported by nighttime commuter Amit after noticing sudden tire-damage hazard.' }
    ]
  },
  // 6. Goa (Panaji)
  {
    id: 'ind-issue-6',
    title: 'Compromised Coastal Promenade Railing',
    category: 'Public Infrastructure',
    description: 'High-tide storm surges have cracked the concrete pillars supporting the safety barrier on Miramar Beach Promenade in Panaji, creating a 10-meter open gap above direct rocky surf.',
    priority: 'medium',
    status: 'verified',
    lat: 15.4920,
    lng: 73.8180,
    upvotes: 33,
    downvotes: 0,
    verificationCount: 11,
    reportedBy: 'Manuel D’Souza',
    reportedAt: '2026-06-25, 03:50 PM',
    aiSummary: 'Structural barrier failure on heavy tourist foot-traffic pathway. Fall hazard over coastal rocky shoreline.',
    aiImpactScore: 62,
    aiPreventionInsight: 'Evening tourist crowds gather for sunset, making the barrier gap an active life-safety risk for children.',
    aiResolutionRecommendation: 'Erect high-visibility orange safety fences. Repair concrete anchors using fast-setting marine epoxy mortar.',
    authorityAssigned: 'Corporation of the City of Panaji (CCP)',
    timeline: [
      { status: 'reported', timestamp: '03:50 PM', title: 'Railing Fracture Logged', description: 'Citizen Manuel took photos of loose structural concrete pillars.' }
    ]
  },
  // 7. Gujarat (Ahmedabad)
  {
    id: 'ind-issue-7',
    title: 'Industrial Chemical Leakage in Storm-Drain',
    category: 'Waste Management',
    description: 'An oily chemical substance is discharging continuously into the open storm-drain near Naroda GIDC sector in Ahmedabad, producing thick blue-tinted foam and strong chemical vapor.',
    priority: 'critical',
    status: 'assigned',
    lat: 23.0280,
    lng: 72.5890,
    upvotes: 89,
    downvotes: 3,
    verificationCount: 25,
    reportedBy: 'Ketan Patel',
    reportedAt: '2026-06-24, 04:22 PM',
    aiSummary: 'Illegal chemical runoff identified. Flowing downstream towards Sabarmati River recharge zone. Immediate isolation required.',
    aiImpactScore: 95,
    aiPreventionInsight: 'The chemical has high concentration of industrial sulfur and toxic solvents, which will kill local freshwater ecosystems.',
    aiResolutionRecommendation: 'Deploy absorbent chemical booms. Intercept industrial outlet using robotic camera inspections to pinpoint the source factory.',
    authorityAssigned: 'Gujarat Pollution Control Board (GPCB)',
    timeline: [
      { status: 'reported', timestamp: '04:22 PM', title: 'Foamy Drainage Reported', description: 'Ketan Patel raised alarm after smelling heavy organic sulfur gas.' }
    ]
  },
  // 8. Haryana (Gurugram)
  {
    id: 'ind-issue-8',
    title: 'Uncapped High-Voltage Transformer Box',
    category: 'Public Infrastructure',
    description: 'A major electrical utility transformer enclosure on Gurugram Sector-56 main road has its heavy steel door fully cracked open, leaving high-voltage live wires fully exposed directly on the pedestrian walking pavement.',
    priority: 'critical',
    status: 'prioritized',
    lat: 28.4620,
    lng: 77.0310,
    upvotes: 110,
    downvotes: 1,
    verificationCount: 42,
    reportedBy: 'Sanjay Malik',
    reportedAt: '2026-06-25, 10:15 AM',
    aiSummary: 'Critical electrocution hazard on public sidewalk. High-voltage 11KV lines fully accessible to pedestrian touch. Water puddle nearby.',
    aiImpactScore: 98,
    aiPreventionInsight: 'Incoming rain shower will turn the surrounding water puddle live, leading to fatal risks for bypassing public.',
    aiResolutionRecommendation: 'Dispatch emergency utility electrical squad to isolate the section, reinstall lock-latch door and seal with industrial wraps.',
    authorityAssigned: 'Dakshin Haryana Bijli Vitran Nigam (DHBVN)',
    timeline: [
      { status: 'reported', timestamp: '10:15 AM', title: 'Exposed Wires Logged', description: 'Citizen Sanjay spotted open transformer with sparks during commute.' }
    ]
  },
  // 9. Himachal Pradesh (Shimla)
  {
    id: 'ind-issue-9',
    title: 'Severe Roadway Subsidence on Cart Road',
    category: 'Public Infrastructure',
    description: 'The steep edge supporting Cart Road near Shimla Mall Road is shifting downward. A 15-meter crack has opened on the road shoulder, threatening a full hillside road cave-in.',
    priority: 'critical',
    status: 'assigned',
    lat: 31.1090,
    lng: 77.1710,
    upvotes: 65,
    downvotes: 0,
    verificationCount: 16,
    reportedBy: 'Rajesh Thakur',
    reportedAt: '2026-06-25, 07:05 AM',
    aiSummary: 'Active mountain slope soil-sliding. Major road shoulder collapse threatens multi-tier valley residential units below.',
    aiImpactScore: 93,
    aiPreventionInsight: 'Vehicular vibration will hasten soil shear failure. Hill slope needs immediate retaining walls or concrete piling anchors.',
    aiResolutionRecommendation: 'Ban heavy trucks on this lane. Build permanent stone-mesh gabion walls. Spray shotcrete mortar across soil slopes.',
    authorityAssigned: 'Himachal Pradesh Public Works Department',
    timeline: [
      { status: 'reported', timestamp: '07:05 AM', title: 'Slope Subsidence Reported', description: 'Resident Rajesh reports a sudden crack on the main valley-side Cart Road.' }
    ]
  },
  // 10. Jharkhand (Ranchi)
  {
    id: 'ind-issue-10',
    title: 'Sewer Line Pipe Burst & Sludge Overflow',
    category: 'Water Leakage',
    description: 'A major municipal concrete sewer pipe has fractured near Lalpur Chowk, causing thick black sewage sludge to bubble up aggressively onto the commercial street and adjacent retail storefront entrances.',
    priority: 'high',
    status: 'assigned',
    lat: 23.3480,
    lng: 85.3050,
    upvotes: 52,
    downvotes: 1,
    verificationCount: 14,
    reportedBy: 'Vikram Mahto',
    reportedAt: '2026-06-25, 02:20 PM',
    aiSummary: 'Main trunk sewer burst. Raw bio-waste sludge discharge is posing severe sanitary threats to surrounding commercial area.',
    aiImpactScore: 84,
    aiPreventionInsight: 'Pathogenic waste flooding will contaminate local surface wells and cause waterborne health hazards if not sealed.',
    aiResolutionRecommendation: 'Bypass sewage using vacuum tankers. Excavate the cracked section of concrete pipe and install HDPE high-strength replacements.',
    authorityAssigned: 'Ranchi Municipal Corporation (RMC)',
    timeline: [
      { status: 'reported', timestamp: '02:20 PM', title: 'Sewage Burst Reported', description: 'Vikram Mahto reports heavy greywater odor and bubbling sludge on Lalpur main road.' }
    ]
  },
  // 11. Karnataka (Bengaluru)
  {
    id: 'ind-issue-11',
    title: 'Extreme Outer Ring Road Pothole Cluster',
    category: 'Potholes',
    description: 'A series of 8 deep, water-filled craters have formed on the high-speed lane of Outer Ring Road (ORR) near Marathahalli flyover. Causes massive vehicle swerves and severe rush-hour gridlock.',
    priority: 'critical',
    status: 'assigned',
    lat: 12.9730,
    lng: 77.6100,
    upvotes: 145,
    downvotes: 4,
    verificationCount: 56,
    reportedBy: 'Karthik Rao',
    reportedAt: '2026-06-25, 08:00 AM',
    aiSummary: 'Critical multiple pothole grid on major IT corridor. High rate of two-wheeler skid incidents reported in nighttime.',
    aiImpactScore: 92,
    aiPreventionInsight: 'With heavy vehicles using this route, delay in patchworks will cause immediate axle breakdowns and heavy logistics delay.',
    aiResolutionRecommendation: 'Deploy rapid-curing cold asphalt mixing crew. Complete dry-milling and asphalt patching under night lane closure.',
    authorityAssigned: 'Bruhat Bengaluru Mahanagara Palike (BBMP)',
    timeline: [
      { status: 'reported', timestamp: '08:00 AM', title: 'ORR Pothole Cluster Reported', description: 'Commuter Karthik Rao reports several scooter crash near Marathahalli.' }
    ]
  },
  // 12. Kerala (Kochi)
  {
    id: 'ind-issue-12',
    title: 'Canal Waste Blockage causing Urban Inundation',
    category: 'Waste Management',
    description: 'Accumulated single-use plastic waste and discarded fishing nets have completely choked the water exit under Kochi’s Marine Drive bridge, creating a dark stagnant water barrier that floods local market roads.',
    priority: 'high',
    status: 'prioritized',
    lat: 9.9360,
    lng: 76.2620,
    upvotes: 56,
    downvotes: 1,
    verificationCount: 19,
    reportedBy: 'Mathew George',
    reportedAt: '2026-06-25, 10:40 AM',
    aiSummary: 'Major canal throat blockage. Backwater discharge is flooding adjacent fish markets, risking heavy financial loss.',
    aiImpactScore: 81,
    aiPreventionInsight: 'High humidity and stagnant water are optimal breeding grounds for mosquitoes and micro-parasites within 48 hours.',
    aiResolutionRecommendation: 'Deploy mechanical trash-skimmer boats to dredge plastic choke points. Enforce strict trash disposal fines near harbor.',
    authorityAssigned: 'Kochi Municipal Corporation',
    timeline: [
      { status: 'reported', timestamp: '10:40 AM', title: 'Canal Trash Wall Spurred', description: 'Mathew George logs picture of completely solid floating plastic layer under bridge.' }
    ]
  },
  // 13. Madhya Pradesh (Bhopal)
  {
    id: 'ind-issue-13',
    title: 'Extensive Streetlight Outage near Lake Road',
    category: 'Damaged Streetlights',
    description: 'Over 25 successive smart LED streetlights along the VIP Road (Upper Lake Promenade) are completely unlit, reducing night visibility to near-zero and creating a hazard for evening walkers.',
    priority: 'medium',
    status: 'investigating',
    lat: 23.2640,
    lng: 77.4190,
    upvotes: 38,
    downvotes: 0,
    verificationCount: 8,
    reportedBy: 'Preeti Sharma',
    reportedAt: '2026-06-25, 08:30 PM',
    aiSummary: 'Multi-node lighting circuit failure along a premier lakeside tourist pathway. Suspected phase-breaker fault in sub-panel.',
    aiImpactScore: 58,
    aiPreventionInsight: 'Unlit tourist sectors show a statistically higher rate of bag-snatching and pedestrian trip accidents.',
    aiResolutionRecommendation: 'Perform panel checks on phase-controller board. Replace tripped high-capacity MCB breakers in Zone-3 kiosk.',
    authorityAssigned: 'Bhopal Municipal Corporation & MP-DISCOM',
    timeline: [
      { status: 'reported', timestamp: '08:30 PM', title: 'Dark Promenade Logged', description: 'Resident Preeti reports entire Upper Lake VIP road darkened.' }
    ]
  },
  // 14. Maharashtra (Mumbai)
  {
    id: 'ind-issue-14',
    title: 'Critical Water Pipe Burst near Western Express Highway',
    category: 'Water Leakage',
    description: 'A 4-foot wide high-pressure drinking water supply pipeline has burst near Bandra West on the WEH exit. An enormous 15-meter high water geyser is flooding 3 highway lanes, creating severe traffic stalls.',
    priority: 'critical',
    status: 'assigned',
    lat: 19.0710,
    lng: 72.8710,
    upvotes: 180,
    downvotes: 2,
    verificationCount: 65,
    reportedBy: 'Vikram Malhotra',
    reportedAt: '2026-06-25, 07:15 AM',
    aiSummary: 'High-pressure water distribution trunk line fracture. Tens of thousands of gallons of clean drinking water lost. Highway lanes disabled.',
    aiImpactScore: 97,
    aiPreventionInsight: 'Extreme soil erosion under WEH lane foundations can cause immediate highway sinkholes or structural slab cracks.',
    aiResolutionRecommendation: 'Shut main supply valves at reservoir head. Mobilize specialized welding engineers to repair pipe steel jacket.',
    authorityAssigned: 'Brihanmumbai Municipal Corporation (BMC)',
    timeline: [
      { status: 'reported', timestamp: '07:15 AM', title: 'Water Trunk Burst Logged', description: 'Malhotra reported giant water jet washing out highway gravel.' }
    ]
  },
  // 15. Manipur (Imphal)
  {
    id: 'ind-issue-15',
    title: 'National Highway Landslip & Bridge Anchor Crack',
    category: 'Public Infrastructure',
    description: 'Heavy structural cracking detected on the primary concrete abutment pillar of the bridge on NH-2 near Imphal, caused by soil creep and river bank washing.',
    priority: 'critical',
    status: 'investigating',
    lat: 24.8190,
    lng: 93.9390,
    upvotes: 45,
    downvotes: 0,
    verificationCount: 13,
    reportedBy: 'Kalen Singh',
    reportedAt: '2026-06-24, 02:14 PM',
    aiSummary: 'Bridge structural integrity compromised. High stress fracture on support columns. Safety level: Unstable.',
    aiImpactScore: 93,
    aiPreventionInsight: 'Repeated crossing of fully loaded military or cargo cargo trucks will trigger a catastrophic bridge structural failure.',
    aiResolutionRecommendation: 'Close bridge for heavy trucks. Inject high-grade concrete slurry into base cracks and anchor with steel plates.',
    authorityAssigned: 'Manipur Public Works Department',
    timeline: [
      { status: 'reported', timestamp: '02:14 PM', title: 'Bridge Cracking Spotted', description: 'Citizen Kalen logs picture of concrete cracks under bridge support.' }
    ]
  },
  // 16. Meghalaya (Shillong)
  {
    id: 'ind-issue-16',
    title: 'Severe Gutter Clog & Steep Step Landslide',
    category: 'Water Leakage',
    description: 'A deep hillside stone gutter in Shillong has become blocked with gravel silt, forcing rainwater to cascade down public pedestrian stairs, causing step slippage.',
    priority: 'high',
    status: 'assigned',
    lat: 25.5820,
    lng: 91.8950,
    upvotes: 39,
    downvotes: 0,
    verificationCount: 9,
    reportedBy: 'Daphne Lyngdoh',
    reportedAt: '2026-06-25, 08:12 AM',
    aiSummary: 'Hillside drainage overflow. High velocity runoff has eroded soil holding the pedestrian steps.',
    aiImpactScore: 76,
    aiPreventionInsight: 'Continuous stair water runoff will trigger a localized mudslide, directly threatening residential dwellings directly below the hill steps.',
    aiResolutionRecommendation: 'Manually excavate stone debris from the hill gutter. Install anti-silt wire screens at inlet sections.',
    authorityAssigned: 'Shillong Municipal Board',
    timeline: [
      { status: 'reported', timestamp: '08:12 AM', title: 'Silt Spill Reported', description: 'Resident Daphne reports water cascading into family yards.' }
    ]
  },
  // 17. Mizoram (Aizawl)
  {
    id: 'ind-issue-17',
    title: 'Exposed Soil Slope Slide Risk over Valley Road',
    category: 'Public Infrastructure',
    description: 'An unprotected mountain slope cut near Aizawl high road has started losing loose mud onto the main street, making the wet asphalt slick and dangerous.',
    priority: 'high',
    status: 'investigating',
    lat: 23.7310,
    lng: 92.7210,
    upvotes: 31,
    downvotes: 0,
    verificationCount: 7,
    reportedBy: 'Lalrinfela',
    reportedAt: '2026-06-25, 09:40 AM',
    aiSummary: 'Slope mud slide danger. Runoff has covered 30% of the single-lane hillside road. Slippery road warning active.',
    aiImpactScore: 74,
    aiPreventionInsight: 'Heavier downpours will fully push the unstable upper soil onto the road, isolating high valley villages.',
    aiResolutionRecommendation: 'Install heavy-duty wire-mesh anchors on the slope faces and deploy sweeping crews to clear muddy asphalt.',
    authorityAssigned: 'Mizoram PWD',
    timeline: [
      { status: 'reported', timestamp: '09:40 AM', title: 'Mud Seepage Reported', description: 'Resident reported soil sludge making road curves slick for bikes.' }
    ]
  },
  // 18. Nagaland (Kohima)
  {
    id: 'ind-issue-18',
    title: 'Deep Gully Erosion Threatening Pedestrian Path',
    category: 'Public Infrastructure',
    description: 'A deep ravine on the side of Kohima Bypass is rapidly eroding inward due to heavy stream runoffs, eating away at the support columns of a public walkway.',
    priority: 'high',
    status: 'assigned',
    lat: 25.6790,
    lng: 94.1110,
    upvotes: 35,
    downvotes: 1,
    verificationCount: 8,
    reportedBy: 'Kevi Sekhose',
    reportedAt: '2026-06-25, 11:15 AM',
    aiSummary: 'Gully boundary regression. Sidewalk support piers have lost 40% of their surrounding earth holding.',
    aiImpactScore: 79,
    aiPreventionInsight: 'A complete walkway collapse is highly likely during the next heavy storm, endangering school students.',
    aiResolutionRecommendation: 'Fill the eroded gorge with dry rubble and build a stone retention wall. Install warning signs for pedestrians.',
    authorityAssigned: 'Kohima Municipal Council',
    timeline: [
      { status: 'reported', timestamp: '11:15 AM', title: 'Walkway Support Hollowed', description: 'Spotted by student Kevi who noticed concrete pillars standing in open air.' }
    ]
  },
  // 19. Odisha (Bhubaneswar)
  {
    id: 'ind-issue-19',
    title: 'Severe Storm Drain Silt Blockage near NH-16',
    category: 'Waste Management',
    description: 'Massive accumulation of construction gravel and clay silt has entirely blocked the main drainage arterial pipeline alongside NH-16 near Bhubaneswar, leading to immediate road submergence after brief rain.',
    priority: 'high',
    status: 'assigned',
    lat: 20.2990,
    lng: 85.8290,
    upvotes: 68,
    downvotes: 0,
    verificationCount: 17,
    reportedBy: 'Soumya Mohanty',
    reportedAt: '2026-06-25, 03:30 PM',
    aiSummary: 'Critical block in national highway drainage. Highway storm water cannot exit, inducing immediate pooling on high-speed lane.',
    aiImpactScore: 83,
    aiPreventionInsight: 'High speed vehicles hit deep water pools, introducing dangerous hydroplaning risk for bypassing cars.',
    aiResolutionRecommendation: 'Use mechanical sewer dredging trucks to clean clay silt blocks. Fine the nearby construction site for illegal mud washing.',
    authorityAssigned: 'Bhubaneswar Municipal Corporation (BMC)',
    timeline: [
      { status: 'reported', timestamp: '03:30 PM', title: 'Highway Water Pooling Logged', description: 'Soumya reported several heavy splash events affecting two-wheelers.' }
    ]
  },
  // 20. Punjab (Amritsar)
  {
    id: 'ind-issue-20',
    title: 'Broken Heritage Walk Decorative Streetlights',
    category: 'Damaged Streetlights',
    description: 'Over 12 antique decorative streetlamp globes along the Golden Temple Heritage Walk in Amritsar are broken, with active electrical copper wires hanging loose near visitor walking areas.',
    priority: 'critical',
    status: 'prioritized',
    lat: 31.6300,
    lng: 74.8760,
    upvotes: 94,
    downvotes: 1,
    verificationCount: 33,
    reportedBy: 'Harpreet Singh',
    reportedAt: '2026-06-25, 08:14 PM',
    aiSummary: 'Critical tourist path hazard. Open live wiring in a highly crowded pedestrian precinct. Wet marble floor increases shock risks.',
    aiImpactScore: 94,
    aiPreventionInsight: 'Thousands of high-volume tourists walk barefoot here daily; exposed wires pose direct hazard.',
    aiResolutionRecommendation: 'Isolate zonal electrical feed. Dispatch repair crew to replace broken globes and install armored cable shields.',
    authorityAssigned: 'Amritsar Municipal Corporation',
    timeline: [
      { status: 'reported', timestamp: '08:14 PM', title: 'Heritage Walk Wiring Issue', description: 'Harpreet reported sparking decorative wire.' }
    ]
  },
  // 21. Rajasthan (Jaipur)
  {
    id: 'ind-issue-21',
    title: 'Open Deep Manholes on MI Road Shopping Zone',
    category: 'Public Infrastructure',
    description: 'Two deep, 5-foot sewage inspection manholes have their heavy iron covers entirely missing on Jaipur’s busy MI Road sidewalk, left completely open without any caution markers.',
    priority: 'critical',
    status: 'assigned',
    lat: 26.9160,
    lng: 75.7830,
    upvotes: 105,
    downvotes: 0,
    verificationCount: 38,
    reportedBy: 'Gopal Sharma',
    reportedAt: '2026-06-25, 12:45 PM',
    aiSummary: 'Extreme safety hazard in high-density shopping street. Extreme falling risks into dark sewer lines for blind or distracted shoppers.',
    aiImpactScore: 95,
    aiPreventionInsight: 'Evening market hours are extremely crowded, making these dark un-barricaded pits an immediate injury trigger.',
    aiResolutionRecommendation: 'Install temporary warning barricades immediately. Fabricate and install heavy-duty reinforced concrete cover plates.',
    authorityAssigned: 'Jaipur Nagar Nigam (JNN)',
    timeline: [
      { status: 'reported', timestamp: '12:45 PM', title: 'Missing Manhole Covers Logged', description: 'Gopal Sharma reports a child barely avoided falling inside MI road sewer.' }
    ]
  },
  // 22. Sikkim (Gangtok)
  {
    id: 'ind-issue-22',
    title: 'Compromised Valley Wall Barrier on NH-10',
    category: 'Public Infrastructure',
    description: 'A 12-meter stretch of the stone retaining guardrail on National Highway 10 near Gangtok has fully broken off into the deep valley gorge below, leaving no physical barrier for turning vehicles.',
    priority: 'critical',
    status: 'assigned',
    lat: 27.3350,
    lng: 88.6170,
    upvotes: 55,
    downvotes: 0,
    verificationCount: 15,
    reportedBy: 'Pemba Lepcha',
    reportedAt: '2026-06-25, 10:10 AM',
    aiSummary: 'Critical mountain pass highway barrier failure. 300-meter vertical drop fully exposed on sharp vehicle curve.',
    aiImpactScore: 96,
    aiPreventionInsight: 'High valley morning fog drastically reduces sightlines, raising immediate risks of vehicles driving off the open cliff road.',
    aiResolutionRecommendation: 'Install high-strength steel crash fences. Erect reflective safety warning barrels with flashing red LED blinkers.',
    authorityAssigned: 'Border Roads Organisation (BRO) & Sikkim PWD',
    timeline: [
      { status: 'reported', timestamp: '10:10 AM', title: 'Highway Edge Collapse Spotted', description: 'Driver Pemba Lepcha reported missing road safety border wall.' }
    ]
  },
  // 23. Tamil Nadu (Chennai)
  {
    id: 'ind-issue-23',
    title: 'Severe Street Inundation & Submerged Junction',
    category: 'Water Leakage',
    description: 'A major water main connector pipe has burst under Chennai’s T. Nagar central junction, flooding three primary shopping streets with knee-deep water and disabling traffic flow.',
    priority: 'critical',
    status: 'assigned',
    lat: 13.0870,
    lng: 80.2740,
    upvotes: 130,
    downvotes: 2,
    verificationCount: 45,
    reportedBy: 'Rajesh Subramanian',
    reportedAt: '2026-06-25, 06:15 AM',
    aiSummary: 'Underground pipeline rupture. High-volume clean water flooding. Road foundation soil structural integrity compromised.',
    aiImpactScore: 94,
    aiPreventionInsight: 'Nearby commercial buildings will suffer basement water entry, threatening electrical panels and HVAC installations.',
    aiResolutionRecommendation: 'Isolate pipeline section at Kilpauk water head. Deploy suction pumps to drain flooded retail blocks.',
    authorityAssigned: 'Chennai Metropolitan Water Supply and Sewerage Board (MetroWater)',
    timeline: [
      { status: 'reported', timestamp: '06:15 AM', title: 'T.Nagar Submerging Logged', description: 'Subramanian reported sudden massive water upwelling from the street joints.' }
    ]
  },
  // 24. Telangana (Hyderabad)
  {
    id: 'ind-issue-24',
    title: 'Extensive Commercial Chemical Dumping in Musi Riverbed',
    category: 'Waste Management',
    description: 'Unidentified tanker vehicles are illegal dumping acidic chemical effluents directly on the Musi River banks near Hyderabad, leaving huge dry yellow-crusted toxic chemical fields.',
    priority: 'critical',
    status: 'investigating',
    lat: 17.3890,
    lng: 78.4810,
    upvotes: 112,
    downvotes: 1,
    verificationCount: 39,
    reportedBy: 'Srinivas Rao',
    reportedAt: '2026-06-24, 11:35 PM',
    aiSummary: 'Critical industrial environmental dumping. Toxic fumes reported in nearby residential neighborhoods.',
    aiImpactScore: 95,
    aiPreventionInsight: 'Leachate will seep directly into ground aquifers, permanently poisoning surrounding municipal water supply borewells.',
    aiResolutionRecommendation: 'Establish constant police night patrols. Deploy drone surveillance. Remove toxic chemical crust using earth-movers.',
    authorityAssigned: 'Telangana State Pollution Control Board (TSPCB)',
    timeline: [
      { status: 'reported', timestamp: '11:35 PM', title: 'Night effluence Dump Spotted', description: 'Srinivas Rao logs coordinates of acidic smelling orange slush.' }
    ]
  },
  // 25. Tripura (Agartala)
  {
    id: 'ind-issue-25',
    title: 'Agartala Sub-Station Main Road Soil Slumping',
    category: 'Public Infrastructure',
    description: 'A major portion of the main access road shoulder leading to Agartala Central Sub-station has collapsed due to unstable drainage washing, leaving the asphalt edge hanging with no support.',
    priority: 'high',
    status: 'assigned',
    lat: 23.8355,
    lng: 91.2908,
    upvotes: 36,
    downvotes: 0,
    verificationCount: 9,
    reportedBy: 'Bikram Debbarma',
    reportedAt: '2026-06-25, 09:10 AM',
    aiSummary: 'Under-cut soil failure on critical utility lane. Support collapse poses direct risks to incoming grid maintenance trucks.',
    aiImpactScore: 81,
    aiPreventionInsight: 'Substation entrance is highly busy with heavy machinery; further sliding will isolate electrical repair fleets.',
    aiResolutionRecommendation: 'Reinforce road edge using steel sheet-piles and sand-gravel packing. Erect heavy vehicle warning signs.',
    authorityAssigned: 'Tripura PWD & Electricity Dept',
    timeline: [
      { status: 'reported', timestamp: '09:10 AM', title: 'Road Under-cut Spotted', description: 'Debbarma logs picture of hollow asphalt cavity.' }
    ]
  },
  // 26. Uttar Pradesh (Lucknow)
  {
    id: 'ind-issue-26',
    title: 'Hazratganj Hanging Electrical Cables Hazard',
    category: 'Public Infrastructure',
    description: 'Dozens of high-voltage overhead electrical cables have snapped and are hanging extremely low, touching the top of public bus shelter canopies in Hazratganj, Lucknow.',
    priority: 'critical',
    status: 'assigned',
    lat: 26.8507,
    lng: 80.9492,
    upvotes: 118,
    downvotes: 2,
    verificationCount: 44,
    reportedBy: 'Alok Mishra',
    reportedAt: '2026-06-25, 08:30 AM',
    aiSummary: 'Snapped power lines in a premium retail and transit zone. Steel structure of bus stop has active threat of turning live.',
    aiImpactScore: 96,
    aiPreventionInsight: 'Morning rain or moisture will transfer current through the metal shelters, creating an extremely high casualty risk.',
    aiResolutionRecommendation: 'De-energize Hazratganj street lines. Disconnect messy overhead cables and implement underground cable routing.',
    authorityAssigned: 'Madhyanchal Vidyut Vitran Nigam (MVVNL)',
    timeline: [
      { status: 'reported', timestamp: '08:30 AM', title: 'Low Power Cable Risk', description: 'Citizen Alok reports sparks touching metal passenger shelter.' }
    ]
  },
  // 27. Uttarakhand (Dehradun)
  {
    id: 'ind-issue-27',
    title: 'Severe Landslip Debris on Mussoorie Highway',
    category: 'Public Infrastructure',
    description: 'A major mountain mudslide has deposited 150 metric tons of rock debris and clay on the Mussoorie-Dehradun highway, trapping three tourist cars and fully closing traffic.',
    priority: 'critical',
    status: 'assigned',
    lat: 30.3205,
    lng: 78.0362,
    upvotes: 135,
    downvotes: 0,
    verificationCount: 51,
    reportedBy: 'Deepak Negi',
    reportedAt: '2026-06-25, 05:45 AM',
    aiSummary: 'High-severity highway mountain slide. Major tourism transit line blocked. Trapped passenger vehicles require emergency towing.',
    aiImpactScore: 97,
    aiPreventionInsight: 'Active rock overhangs look unstable; manual removal without safety gear poses immediate risks to highway rescue workers.',
    aiResolutionRecommendation: 'Deploy National Disaster Response Force (NDRF) and heavy earth movers. Use controlled acoustic clearing tools.',
    authorityAssigned: 'Uttarakhand State Disaster Management Authority & BRO',
    timeline: [
      { status: 'reported', timestamp: '05:45 AM', title: 'Highway Mudslide Disaster', description: ' Negi reported vehicle blockade with rock debris.' }
    ]
  },
  // 28. West Bengal (Kolkata)
  {
    id: 'ind-issue-28',
    title: 'Severe Waterlogging & Tram Line Submergence',
    category: 'Water Leakage',
    description: 'Heavy stagnant rainwater has completely submerged the historical tram tracks and active roadway near College Street in Kolkata, with water entering book shops and basements.',
    priority: 'critical',
    status: 'prioritized',
    lat: 22.5766,
    lng: 88.3679,
    upvotes: 99,
    downvotes: 1,
    verificationCount: 29,
    reportedBy: 'Subir Banerjee',
    reportedAt: '2026-06-25, 11:20 AM',
    aiSummary: 'Critical drainage failure in historical district. Stagnant rain levels exceed 2.5 feet, disabling public electric transit systems.',
    aiImpactScore: 94,
    aiPreventionInsight: 'Silt blockages in colonial-era brick sewers are preventing rapid gravity discharge into circular canal drains.',
    aiResolutionRecommendation: 'Mobilize high-volume high-discharge water pump trucks. Clean central brick sewer traps using robotic high-velocity jetting machines.',
    authorityAssigned: 'Kolkata Municipal Corporation (KMC)',
    timeline: [
      { status: 'reported', timestamp: '11:20 AM', title: 'College Street Inundation', description: 'Banerjee reports bookstore basement walls showing high structural water stress.' }
    ]
  },
  // 29. Delhi / New Delhi
  {
    id: 'ind-issue-29',
    title: 'Dangerous Construction Waste Dust & Open Drains',
    category: 'Waste Management',
    description: 'A large contractor site in Connaught Place has dumped tons of unprotected concrete dust and rubble directly on the public lane, producing heavy toxic dust storms and choking nearby storm drains.',
    priority: 'high',
    status: 'assigned',
    lat: 28.6179,
    lng: 77.2130,
    upvotes: 125,
    downvotes: 3,
    verificationCount: 48,
    reportedBy: 'Ankit Gupta',
    reportedAt: '2026-06-25, 09:30 AM',
    aiSummary: 'Severe violation of air quality and municipal waste laws. Heavy PM10 emissions. Open drainage channels completely blocked.',
    aiImpactScore: 88,
    aiPreventionInsight: 'High wind velocity disperses toxic silica particles, triggering severe health risk for thousands of morning office commuters.',
    aiResolutionRecommendation: 'Enforce immediate stop-work order. Spray water mist to suppress dust particles. Impose hefty fine on construction contractor.',
    authorityAssigned: 'New Delhi Municipal Council (NDMC) & DPCC',
    timeline: [
      { status: 'reported', timestamp: '09:30 AM', title: 'Connaught Place Dust Crisis', description: 'Ankit reported severe breathing discomfort and visible white dust plumes.' }
    ]
  }
];
