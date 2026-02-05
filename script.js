import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// --- MOCK DATA (In a real app, this comes from your API) ---
const INITIAL_TEAMS = [
  { id: 1, name: "Lions FC", pts: 45, winProb: 65, draw: 20, loss: 15, avgGoals: 2.4, possession: 58, history: [{m:1, p:3}, {m:2, p:6}, {m:3, p:7}, {m:4, p:10}] },
  { id: 2, name: "Tigers United", pts: 42, winProb: 40, draw: 30, loss: 30, avgGoals: 1.8, possession: 45, history: [{m:1, p:0}, {m:2, p:3}, {m:3, p:6}, {m:4, p:9}] },
  { id: 3, name: "Eagle Squad", pts: 38, winProb: 50, draw: 25, loss: 25, avgGoals: 2.1, possession: 52, history: [{m:1, p:1}, {m:2, p:4}, {m:3, p:4}, {m:4, p:7}] },
];

const SportsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedTeam, setFocusedTeam] = useState(INITIAL_TEAMS[0]); // For Trends
  const [compareTeams, setCompareTeams] = useState([INITIAL_TEAMS[0], INITIAL_TEAMS[1]]); // For H2H

  // --- 1. SEARCH LOGIC (REPLACE old search) ---
  const filteredTeams = useMemo(() => {
    return INITIAL_TEAMS.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleReplaceComparison = (team, index) => {
    const newCompare = [...compareTeams];
    newCompare[index] = team;
    setCompareTeams(newCompare);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans text-slate-900">
      
      {/* HEADER & SEARCH */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-black uppercase tracking-tight">Analytics <span className="text-blue-600">Pro</span></h1>
        <input 
          type="text" 
          placeholder="Search teams or players..." 
          className="w-full md:w-96 p-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: LEADERBOARD & FAVORITES (REPLACE your old table) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold mb-4 flex items-center gap-2">🏆 Live Rankings</h2>
          <div className="space-y-2">
            {filteredTeams.map((team, i) => (
              <div key={team.id} className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-xl cursor-pointer transition group">
                <div className="flex items-center gap-3" onClick={() => setFocusedTeam(team)}>
                  <span className="text-xs font-bold text-gray-400">{i + 1}</span>
                  <span className="font-semibold">{team.name}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleReplaceComparison(team, 0)} className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded opacity-0 group-hover:opacity-100">Add H2H</button>
                  <span className="font-bold text-blue-600">{team.pts}pt</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MIDDLE: H2H & PREDICTIONS (ADD this new feature) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold mb-6 italic">Head-to-Head Comparison</h2>
            <div className="grid grid-cols-3 items-center text-center">
              <div>
                <p className="text-lg font-black">{compareTeams[0].name}</p>
                <p className="text-3xl font-light text-blue-600">{compareTeams[0].avgGoals}</p>
                <p className="text-xs text-gray-400 uppercase">Avg Goals</p>
              </div>
              <div className="text-gray-300 font-bold text-xl">VS</div>
              <div>
                <p className="text-lg font-black">{compareTeams[1].name}</p>
                <p className="text-3xl font-light text-red-600">{compareTeams[1].avgGoals}</p>
                <p className="text-xs text-gray-400 uppercase">Avg Goals</p>
              </div>
            </div>

            {/* WIN PROBABILITY BAR (SMART INSIGHTS) */}
            <div className="mt-8">
               <p className="text-center text-xs font-bold uppercase mb-2">Win Probability</p>
               <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                  <div style={{width: '50%'}} className="bg-blue-500" />
                  <div style={{width: '20%'}} className="bg-gray-300" />
                  <div style={{width: '30%'}} className="bg-red-500" />
               </div>
               <div className="flex justify-between text-[10px] mt-1 font-bold">
                  <span>{compareTeams[0].name} (50%)</span>
                  <span>DRAW (20%)</span>
                  <span>{compareTeams[1].name} (30%)</span>
               </div>
            </div>
          </div>

          {/* TREND ANALYSIS (ADD this performance chart) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="font-bold mb-4 uppercase text-xs tracking-widest text-gray-400">
              Performance Trend: {focusedTeam.name}
            </h2>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={focusedTeam.history}>
                  <defs>
                    <linearGradient id="colorPts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip />
                  <Area type="monotone" dataKey="p" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPts)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SportsDashboard;
