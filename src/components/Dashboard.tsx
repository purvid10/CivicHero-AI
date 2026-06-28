import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, Sparkles, Filter, CheckCircle, 
  ThumbsUp, MessageSquare, MapPin, Search, Calendar, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { Issue, IssuePriority, IssueStatus } from '../types';
import { TRANSLATIONS } from '../translations';

interface DashboardProps {
  issues: Issue[];
  mapBounds?: { west: number; south: number; east: number; north: number } | null;
  onSelectIssue: (issue: Issue) => void;
  onVerifyIssue: (issueId: string) => void;
  onVoteIssue: (issueId: string, type: 'up' | 'down') => void;
  langCode: string;
}

export default function Dashboard({ issues, mapBounds, onSelectIssue, onVerifyIssue, onVoteIssue, langCode }: DashboardProps) {
  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en-US'];
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterByMapBounds, setFilterByMapBounds] = useState<boolean>(true);

  const getCategoryTranslation = (catName: string) => {
    if (catName === 'All') return t.all || 'All';
    if (catName === 'Potholes') return t.potholes || 'Potholes';
    if (catName === 'Water Leakage') return t.waterLeakage || 'Water Leakage';
    if (catName === 'Damaged Streetlights' || catName === 'Streetlights') return t.streetlights || 'Damaged Streetlights';
    if (catName === 'Waste Management') return t.wasteManagement || 'Waste Management';
    if (catName === 'Public Infrastructure') return t.publicInfrastructure || 'Public Infrastructure';
    return catName;
  };

  const getPriorityTranslation = (priorityName: string) => {
    const p = priorityName.toLowerCase();
    if (p === 'all') return t.all || 'All';
    if (p === 'critical') return t.critical || 'Critical';
    if (p === 'high') return t.high || 'High';
    if (p === 'medium') return t.medium || 'Medium';
    if (p === 'low') return t.low || 'Low';
    if (p === 'resolved') return t.resolved || 'Resolved';
    return priorityName;
  };

  // Filter & Search Issues (including area selection / visible map bounds filtering)
  const filteredIssues = issues.filter(issue => {
    const matchesCategory = filterCategory === 'All' || issue.category === filterCategory;
    const matchesPriority = filterPriority === 'All' || issue.priority === filterPriority.toLowerCase();
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Bounds checking
    const matchesBounds = !filterByMapBounds || !mapBounds || (
      issue.lat >= mapBounds.south &&
      issue.lat <= mapBounds.north &&
      issue.lng >= mapBounds.west &&
      issue.lng <= mapBounds.east
    );

    return matchesCategory && matchesPriority && matchesSearch && matchesBounds;
  });

  // KPI Calculations
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(i => i.status === 'resolved').length;
  const criticalIssues = issues.filter(i => i.priority === 'critical' && i.status !== 'resolved').length;
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* 4 Glassmorphic Metrics / Impact Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Reports */}
        <div className="rounded-2xl glass-panel p-4 border border-white/10 shadow-md">
          <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">{t.activeCitations}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display font-bold text-2xl text-white">{totalIssues}</span>
            <span className="text-[10px] font-sans text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">+4 Today</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans mt-1">{t.totalCitizenReports}</p>
        </div>

        {/* Resolved Reports */}
        <div className="rounded-2xl glass-panel p-4 border border-white/10 shadow-md">
          <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">{t.completedResolutions}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display font-bold text-2xl text-emerald-400">{resolvedIssues}</span>
            <span className="text-[10px] font-sans text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">80% Efficiency</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans mt-1">{t.issuesResolved}</p>
        </div>

        {/* Critical Redundancy */}
        <div className="rounded-2xl glass-panel p-4 border border-white/10 shadow-md">
          <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">{t.criticalBlockages}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display font-bold text-2xl text-rose-400">{criticalIssues}</span>
            <span className="text-[10px] font-sans text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-bold">Action Required</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans mt-1">{t.immediateThreat}</p>
        </div>

        {/* Consensus Verification Rate */}
        <div className="rounded-2xl glass-panel p-4 border border-white/10 shadow-md">
          <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">{t.verificationRate}</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="font-display font-bold text-2xl text-blue-400">{resolutionRate}%</span>
            <span className="text-[10px] font-sans text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">High Trust</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans mt-1">{t.communityConsensus}</p>
        </div>
      </div>

      {/* Two Columns: Predictive Intelligence Chart & Active Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Predictive Intelligence Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl flex flex-col justify-between h-[520px]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </span>
              <h3 className="font-display text-base font-bold text-white">{t.predictiveIntel}</h3>
            </div>
            <p className="text-xs text-slate-400 font-sans mb-4">
              {t.predictiveML}
            </p>

            {/* Simulated Custom Premium Glass SVG Chart */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 relative overflow-hidden shadow-2xl">
              <span className="absolute top-3 right-3 text-[9px] font-mono font-bold text-blue-400 bg-blue-500/15 px-2 py-0.5 rounded border border-blue-500/25">{t.weeklyPredictor || "WEEKLY TARGET"}</span>
              
              <div className="h-40 w-full relative flex items-end">
                {/* SVG Curves representing trends */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Fill Area for Active Issues */}
                  <path d="M0,80 Q25,60 50,45 T100,20 L100,100 L0,100 Z" fill="url(#grad-indigo)" opacity="0.1" />
                  
                  {/* Glowing Lines */}
                  <path d="M0,80 Q25,60 50,45 T100,20" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                  <path d="M0,95 Q25,85 50,60 T100,45" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3,2" />
                </svg>

                {/* Grid guidelines */}
                <div className="absolute inset-x-0 top-1/4 border-t border-white/10"></div>
                <div className="absolute inset-x-0 top-2/4 border-t border-white/10"></div>
                <div className="absolute inset-x-0 top-3/4 border-t border-white/10"></div>

                {/* Y-axis Labels */}
                <span className="absolute left-1 top-1 text-[8px] font-mono text-slate-400">90%</span>
                <span className="absolute left-1 top-[48%] text-[8px] font-mono text-slate-400">50%</span>
                <span className="absolute left-1 bottom-1 text-[8px] font-mono text-slate-400">10%</span>
              </div>

              {/* Chart Legend */}
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-2 border-t border-white/10 pt-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span> {t.potholes}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {t.resolved}
                </span>
              </div>

              <defs>
                <linearGradient id="grad-indigo" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                </linearGradient>
              </defs>
            </div>
          </div>

          {/* AI Neural Prediction Insights block */}
          <div className="bg-gradient-to-r from-purple-500/15 to-blue-500/15 border border-blue-500/25 p-3.5 rounded-2xl">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wide">{t.predictiveIntel}</span>
            </div>
            <p className="text-[11px] font-sans text-slate-300 leading-relaxed italic">
              "Heavy regional rainfall forecast for Thursday presents a high probability (84%) of sub-surface soil erosion under Centerville Avenue, potentially converting active category-medium potholes into critical road blockages."
            </p>
          </div>
        </div>

        {/* Real-time Issue Feed (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl flex flex-col h-[520px]">
          {/* Header & Filters */}
          <div className="shrink-0 space-y-3.5 mb-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                {t.activeFeed} ({filteredIssues.length})
              </h3>

              {/* Category selector pill bar */}
              <div className="flex overflow-x-auto gap-1.5 pb-1">
                {['All', 'Potholes', 'Water Leakage', 'Damaged Streetlights', 'Waste Management'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase shrink-0 transition ${
                      filterCategory === cat 
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {getCategoryTranslation(cat)}
                  </button>
                ))}
              </div>
            </div>

             {/* Search & Priority filter row */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs glass-input rounded-xl pl-9 pr-3 py-1.5 outline-none focus:bg-slate-900/40 transition"
                />
              </div>

              {/* Filtering Controls */}
              <div className="flex gap-2">
                {/* Map Bounds Filter Toggle */}
                <button
                  type="button"
                  onClick={() => setFilterByMapBounds(!filterByMapBounds)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition duration-200 outline-none select-none cursor-pointer ${
                    filterByMapBounds 
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-inner' 
                      : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                  }`}
                  title={filterByMapBounds ? "Showing only incidents inside the current map viewport" : "Showing incidents from all areas"}
                >
                  <MapPin className={`w-3.5 h-3.5 ${filterByMapBounds ? 'text-blue-400 animate-pulse' : 'text-slate-400'}`} />
                  <span>{filterByMapBounds ? t.visibleInMap : (t.all || "All Areas")}</span>
                </button>

                {/* Priority Select */}
                <div className="w-32">
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full text-xs glass-input rounded-xl px-2.5 py-1.5 outline-none font-semibold text-slate-100 bg-slate-900 border border-white/10"
                  >
                    <option className="bg-slate-900 text-slate-100 font-semibold" value="All">{t.all || "All"}</option>
                    <option className="bg-slate-900 text-rose-400 font-semibold" value="Critical">🔴 {t.critical}</option>
                    <option className="bg-slate-900 text-orange-400 font-semibold" value="High">🟠 {t.high}</option>
                    <option className="bg-slate-900 text-yellow-400 font-semibold" value="Medium">🟡 {t.medium}</option>
                    <option className="bg-slate-900 text-emerald-400 font-semibold" value="Resolved">🟢 {t.resolved}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Issues List Feed */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {filteredIssues.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-70 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <Search className="w-8 h-8 text-slate-500 mb-2" />
                <p className="text-xs text-slate-400 font-sans">{langCode === 'en-US' ? "No matching incidents reported in this sector." : (t.searchPlaceholder + " (0)")}</p>
              </div>
            ) : (
              filteredIssues.map((issue) => {
                const priorityBadge = 
                  issue.priority === 'resolved' || issue.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' :
                  issue.priority === 'critical' ? 'bg-rose-500/10 text-rose-300 border-rose-500/20' :
                  issue.priority === 'high' ? 'bg-orange-500/10 text-orange-300 border-orange-500/20' :
                  'bg-yellow-500/10 text-yellow-300 border-yellow-500/20';

                return (
                  <div 
                    key={issue.id}
                    id={`feed-item-${issue.id}`}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm hover:shadow-md cursor-pointer relative text-slate-200"
                    onClick={() => onSelectIssue(issue)}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Image Preview thumbnail if available */}
                      {issue.imageUrl ? (
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-slate-900 shadow-inner">
                          <img src={issue.imageUrl} alt="preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ) : (
                        <span className="text-2xl p-2.5 bg-white/10 rounded-xl shadow-sm inline-block shrink-0">
                          {issue.category === 'Potholes' ? '🚧' :
                           issue.category === 'Water Leakage' ? '💧' :
                           issue.category === 'Damaged Streetlights' ? '💡' :
                           issue.category === 'Waste Management' ? '🗑️' : '🏢'}
                        </span>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${priorityBadge}`}>
                            {getPriorityTranslation(issue.priority)}
                          </span>
                          <span className="text-[10px] text-blue-400 font-semibold">{getCategoryTranslation(issue.category)}</span>
                        </div>
                        <h4 className="font-display font-bold text-xs text-white truncate leading-tight">{issue.title}</h4>
                        <p className="text-[10px] text-slate-400 font-sans line-clamp-1 mt-0.5">{issue.description}</p>
                      </div>
                    </div>

                    {/* Community Verification Actions (Community Verification Agent Role!) */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {/* Consensus verification count badge */}
                      <button
                        id={`btn-verify-${issue.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onVerifyIssue(issue.id);
                        }}
                        className="px-2.5 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-[10px] font-sans font-bold transition flex items-center gap-1 cursor-pointer"
                        title="Personally witness and audit this reported problem"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        <span>{t.verify} ({issue.verificationCount})</span>
                      </button>

                      {/* Vote arrows up/down */}
                      <div className="flex bg-white/5 rounded-xl border border-white/10 p-0.5">
                        <button
                          id={`btn-vote-up-${issue.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onVoteIssue(issue.id, 'up');
                          }}
                          className="p-1 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-white/5 transition cursor-pointer"
                          title="Upvote local concern"
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>
                        <span className="text-[10px] font-mono font-bold px-1.5 self-center text-slate-300">
                          {issue.upvotes - issue.downvotes}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
