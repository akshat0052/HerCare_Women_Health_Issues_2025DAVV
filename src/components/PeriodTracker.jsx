import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PeriodTracker() {
  const [periods, setPeriods] = useState([]);
  const [dateInput, setDateInput] = useState(isoToday());
  const [lengthInput, setLengthInput] = useState(5);
  const [avgCycle, setAvgCycle] = useState(28);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const raw = localStorage.getItem("periods_v1");
    if (raw) {
      try { setPeriods(JSON.parse(raw)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("periods_v1", JSON.stringify(periods));
    computeAvgCycle();
  }, [periods]);

  function isoToday() {
    return new Date().toISOString().slice(0, 10);
  }
  function addPeriod(e) {
    e.preventDefault();
    const item = { start: dateInput, length: Number(lengthInput) };
    const list = [...periods, item].sort((a,b)=> new Date(a.start)-new Date(b.start));
    setPeriods(list);
  }
  function removeIndex(i){ setPeriods(p=>p.filter((_,x)=>x!==i)); }

  function computeAvgCycle(){
    if(periods.length<2) return setAvgCycle(28);
    const gaps=[];
    for(let i=1;i<periods.length;i++){
      const d1=new Date(periods[i-1].start);
      const d2=new Date(periods[i].start);
      const gap=Math.round((d2-d1)/(1000*60*60*24));
      if(gap>0) gaps.push(gap);
    }
    if(gaps.length===0) return setAvgCycle(28);
    setAvgCycle(Math.round(gaps.reduce((a,b)=>a+b,0)/gaps.length));
  }

  function addDaysISO(iso, days){ const d=new Date(iso); d.setDate(d.getDate()+days); return d.toISOString().slice(0,10);}   
  function inRange(iso, start, end){ return new Date(iso)>=new Date(start)&&new Date(iso)<=new Date(end);}  

  const last = periods[periods.length - 1] || null;
  const predicted = last ? addDaysISO(last.start, avgCycle) : null;
  const predictedLength = last?.length || 5;
  const ovulation = predicted ? addDaysISO(predicted, -14) : null;
  const fertileStart = ovulation ? addDaysISO(ovulation, -3) : null;
  const fertileEnd = ovulation ? addDaysISO(ovulation, 3) : null;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-pink-50 to-red-100 px-4 py-8 pt-28 pb-20 overflow-hidden text-gray-800">
      
      {/* Background Blobs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-20 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="text-center mb-16" data-aos="fade-down">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-4 drop-shadow-sm tracking-tight">
            Cycle & Period Tracker
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Log your cycle, predict your next period, and track your fertile window with ease.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Add Period Card */}
          <div data-aos="fade-up" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-500 rounded-[2rem] transform rotate-1 group-hover:rotate-2 transition-transform duration-500 opacity-20"></div>
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-rose-600">Log Period</h2>
              </div>

              <div className="flex-1 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Start Date</label>
                  <input type="date" value={dateInput} onChange={(e)=>setDateInput(e.target.value)} className="w-full p-3 bg-white/50 border border-rose-200 rounded-xl focus:ring-4 focus:ring-rose-300/50 focus:border-rose-400 transition-all outline-none font-medium" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Length (days)</label>
                  <input type="number" value={lengthInput} onChange={(e)=>setLengthInput(e.target.value)} className="w-full p-3 bg-white/50 border border-rose-200 rounded-xl focus:ring-4 focus:ring-rose-300/50 focus:border-rose-400 transition-all outline-none font-medium" />
                </div>
              </div>

              <button onClick={addPeriod} className="w-full mt-8 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-rose-500/30 transition-all active:scale-95 flex justify-center items-center gap-2">
                Add Entry
              </button>
            </div>
          </div>

          {/* Recorded Periods Card */}
          <div data-aos="fade-up" data-aos-delay="100" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-[2rem] transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500 opacity-20"></div>
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-purple-600">Cycle History</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar" style={{ maxHeight: "300px" }}>
                {periods.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                    <p className="font-medium text-sm">No entries recorded yet</p>
                  </div>
                )}
                {periods.map((p,i)=>(
                  <div key={i} className="group/item p-4 bg-white/60 hover:bg-white rounded-2xl flex justify-between items-center shadow-sm hover:shadow border border-purple-100/50 transition-all">
                    <div>
                      <div className="font-bold text-gray-800 text-lg">{p.start}</div>
                      <div className="text-sm font-medium text-purple-600/80 bg-purple-100/50 px-2 py-0.5 rounded-md inline-block mt-1">
                        {p.length} days
                      </div>
                    </div>
                    <button onClick={()=>removeIndex(i)} title="Remove entry" className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prediction Box Card */}
          <div data-aos="fade-up" data-aos-delay="200" className="relative group md:col-span-2 lg:col-span-1">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-red-500 rounded-[2rem] transform rotate-1 group-hover:rotate-2 transition-transform duration-500 opacity-20"></div>
            <div className="relative bg-white/70 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-bold text-pink-600">Predictions</h2>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                {predicted ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-rose-100 to-pink-50 p-4 rounded-2xl border border-rose-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-rose-800">Next Period</span>
                      </div>
                      <span className="font-extrabold text-rose-600 text-lg bg-white px-3 py-1 rounded-xl shadow-sm">{predicted}</span>
                    </div>

                    <div className="bg-gradient-to-r from-purple-100 to-indigo-50 p-4 rounded-2xl border border-purple-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-purple-800">Ovulation</span>
                      </div>
                      <span className="font-extrabold text-purple-600 text-lg bg-white px-3 py-1 rounded-xl shadow-sm">{ovulation}</span>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-emerald-50 p-4 rounded-2xl border border-green-200 shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-green-800">Fertile Window</span>
                      </div>
                      <span className="font-extrabold text-green-700 text-center bg-white px-3 py-2 rounded-xl shadow-sm w-full">
                        {fertileStart} <span className="text-gray-400 font-medium text-sm mx-1">to</span> {fertileEnd}
                      </span>
                    </div>

                    <div className="pt-2 text-center">
                      <span className="inline-block bg-gray-100 text-gray-600 text-sm font-bold px-4 py-1.5 rounded-full shadow-inner">
                        Average Cycle: <span className="text-pink-600">{avgCycle} days</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 font-medium">Log at least 1 period to unlock personalized predictions.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}