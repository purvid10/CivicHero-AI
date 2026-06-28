export type IssuePriority = 'critical' | 'high' | 'medium' | 'resolved';

export type IssueStatus = 
  | 'reported' 
  | 'investigating' 
  | 'verified' 
  | 'prioritized' 
  | 'assigned' 
  | 'resolving' 
  | 'resolved';

export interface TimelineEvent {
  status: IssueStatus;
  timestamp: string;
  title: string;
  description: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: 'Potholes' | 'Water Leakage' | 'Damaged Streetlights' | 'Waste Management' | 'Public Infrastructure';
  priority: IssuePriority;
  status: IssueStatus;
  lat: number;
  lng: number;
  upvotes: number;
  downvotes: number;
  verificationCount: number;
  reportedBy: string;
  reportedAt: string;
  imageUrl?: string;
  videoUrl?: string;
  aiSummary?: string;
  aiImpactScore?: number; // 1-100
  aiPreventionInsight?: string;
  aiResolutionRecommendation?: string;
  authorityAssigned?: string;
  timeline: TimelineEvent[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export interface CitizenProfile {
  name: string;
  email?: string;
  level: number;
  points: number;
  progressPercent: number;
  badges: Badge[];
  weeklyReportsCount: number;
  weeklyVerificationsCount: number;
  rank?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface AgentState {
  id: string;
  name: string;
  status: 'idle' | 'working' | 'completed';
  description: string;
  details?: string;
}

export interface RewardItem {
  id: string;
  title: string;
  cost: number;
  description: string;
  category: string;
  icon: string;
}
