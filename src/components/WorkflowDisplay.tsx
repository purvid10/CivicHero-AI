import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Sparkles, MapPin, Eye, CheckCircle2, ShieldAlert, BadgeCheck, 
  ChevronRight, Play, Info, AlertCircle, ArrowRightLeft, Cpu 
} from 'lucide-react';
import { Issue, IssueStatus } from '../types';

interface WorkflowDisplayProps {
  activeIssue: Issue | null;
}

export default function WorkflowDisplay({ activeIssue }: WorkflowDisplayProps) {
  const [selectedAgent, setSelectedAgent] = useState<number | null>(null);

  // Defining the 7 stages of the Citizen to Prediction resolution pipeline
  const pipelineSteps = [
    {
      id: 1,
      status: 'reported' as IssueStatus,
      title: 'Citizen Reporting',
      agent: 'Issue Detection Agent',
      agentDesc: 'Uses multi-modal parsing to validate images/videos & auto-categorize inputs.',
      icon: Users,
      color: 'text-blue-400 bg-blue-500/15 border-blue-500/20',
      activeColor: 'bg-blue-500/15 border-blue-500/40 text-blue-300 shadow-lg shadow-blue-500/10'
    },
    {
      id: 2,
      status: 'investigating' as IssueStatus,
      title: 'AI Investigation',
      agent: 'Geo Intelligence Agent',
      agentDesc: 'Validates reporting coordinates, checks duplicates, and maps local boundaries.',
      icon: MapPin,
      color: 'text-purple-400 bg-purple-500/15 border-purple-500/20',
      activeColor: 'bg-purple-500/15 border-purple-500/40 text-purple-300 shadow-lg shadow-purple-500/10'
    },
    {
      id: 3,
      status: 'verified' as IssueStatus,
      title: 'Community Verification',
      agent: 'Community Verification Agent',
      agentDesc: 'Crowdsources truth. Handles upvotes/downvotes to confirm validity.',
      icon: CheckCircle2,
      color: 'text-indigo-400 bg-indigo-500/15 border-indigo-500/20',
      activeColor: 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-lg shadow-indigo-500/10'
    },
    {
      id: 4,
      status: 'prioritized' as IssueStatus,
      title: 'Smart Prioritization',
      agent: 'Prioritization Agent',
      agentDesc: 'Runs dynamic impact formula mapping citizen density and danger index.',
      icon: ShieldAlert,
      color: 'text-rose-400 bg-rose-500/15 border-rose-500/20',
      activeColor: 'bg-rose-500/15 border-rose-500/40 text-rose-300 shadow-lg shadow-rose-500/10'
    },
    {
      id: 5,
      status: 'assigned' as IssueStatus,
      title: 'Authority Assignment',
      agent: 'Resolution Recommendation Agent',
      agentDesc: 'Drafts exact work specs, matches appropriate contractor, and dispatches job.',
      icon: ArrowRightLeft,
      color: 'text-amber-400 bg-amber-500/15 border-amber-500/20',
      activeColor: 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/10'
    },
    {
      id: 6,
      status: 'resolving' as IssueStatus,
      title: 'Resolution Tracking',
      agent: 'Citizen Engagement Agent',
      agentDesc: 'Tracks actual resolution milestones, updates status, and issues bounty points.',
      icon: BadgeCheck,
      color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/20',
      activeColor: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/10'
    },
    {
      id: 7,
      status: 'resolved' as IssueStatus,
      title: 'Prediction & Prevention',
      agent: 'Civic Intelligence Agent',
      agentDesc: 'Generates preventive insights to recommend structural maintenance.',
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
            AI Multi-Agent Pipeline
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Transparent tracking of municipal resolutions across smart intelligence layers.
          </p>
        </div>
        
        {activeIssue ? (
          <div className="text-right backdrop-blur-md bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs">
            <span className="text-slate-400 mr-1.5">Analyzing:</span>
            <span className="font-bold text-blue-400">{activeIssue.title}</span>
          </div>
        ) : (
          <div className="backdrop-blur-md bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full text-[11px] text-amber-300 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            Select an issue from the feed to track its live agent routing
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
                <span className="block text-[10px] font-mono tracking-wide text-slate-500 mb-0.5">STAGE 0{step.id}</span>
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
                          AGENT LAYER {currentFocusIdx + 1}/7
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
                            <span className="font-bold text-white block mb-0.5">Live Agent Analysis:</span>
                            {activeIssue.status === 'reported' && "Detection Agent successfully read description, parsed attachments, auto-assigned category, and initialized local community verifications."}
                            {activeIssue.status === 'investigating' && `Geo Intelligence Agent validated GPS coordinates (${activeIssue.lat.toFixed(4)}, ${activeIssue.lng.toFixed(4)}) against municipal asset indexes.`}
                            {activeIssue.status === 'verified' && `Community consensus reaches threshold. Upvotes: ${activeIssue.upvotes}. Verified: ${activeIssue.verificationCount} times. Approving dispatch.`}
                            {activeIssue.status === 'prioritized' && `Prioritization Agent calculated impact factor: ${activeIssue.aiImpactScore}/100. Priority assigned: ${activeIssue.priority.toUpperCase()}.`}
                            {activeIssue.status === 'assigned' && `Resolution recommendation drafted: "${activeIssue.aiResolutionRecommendation || 'Awaiting dispatch specs'}". Assigned to ${activeIssue.authorityAssigned || 'Public Works'}.`}
                            {activeIssue.status === 'resolving' && "Dispatch crew has arrived on site. Active resolution logging is in progress."}
                            {activeIssue.status === 'resolved' && `Resolution completed. Citizen engagement agent issued reward points. Predictive model saved details for historical correlation.`}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 p-2.5 rounded-xl shrink-0">
                    <span className="font-semibold block text-white mb-0.5">Milestone Event:</span>
                    <span>Status: {step.status.toUpperCase()}</span>
                    <span className="block mt-0.5 opacity-80">Trigger: Automated API Webhook</span>
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
