// Premium UI version of Period Tracker
import React, { useEffect, useState } from "react";

export default function PeriodTracker() {
  const [periods, setPeriods] = useState([]);
  const [dateInput, setDateInput] = useState(isoToday());
  const [lengthInput, setLengthInput] = useState(5);
  const [avgCycle, setAvgCycle] = useState(28);

  useEffect(() => {
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
    <div className=" bg-gradient-to-br from-pink-50 to-rose-100 p-8 flex justify-center mt-[6.5rem]">
      <div className="max-w-5xl w-full backdrop-blur-xl bg-white/60 shadow-2xl rounded-3xl p-6 border border-white/40">

        <h1 className="text-4xl font-bold mb-6 text-rose-600 text-center tracking-tight drop-shadow-sm">
           Period Tracker
        </h1>

        {/* Add Period Card */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white shadow-xl rounded-3xl p-6 border border-rose-100 hover:shadow-2xl transition-all">
            <h2 className="text-xl font-semibold mb-4 text-rose-500">Add Period</h2>

            <label className="text-sm font-medium">Start Date</label>
            <input type="date" value={dateInput} onChange={(e)=>setDateInput(e.target.value)} className="w-full mt-1 mb-3 p-2 border rounded-xl focus:ring-2 focus:ring-rose-300" />

            <label className="text-sm font-medium">Length (days)</label>
            <input type="number" value={lengthInput} onChange={(e)=>setLengthInput(e.target.value)} className="w-full mt-1 mb-3 p-2 border rounded-xl focus:ring-2 focus:ring-rose-300" />

            <button onClick={addPeriod} className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-2xl shadow-md transition-all">
              Add Entry
            </button>
          </div>

          {/* Recorded Periods */}
          <div className="bg-white shadow-xl rounded-3xl p-6 border border-rose-100 overflow-auto">
            <h2 className="text-xl font-semibold mb-4 text-rose-500">History</h2>
            <div className="space-y-3 max-h-64">
              {periods.map((p,i)=>(
                <div key={i} className="p-3 bg-rose-50 rounded-xl flex justify-between shadow-sm border border-rose-100">
                  <div>
                    <div className="font-medium">{p.start}</div>
                    <div className="text-xs text-gray-600">{p.length} days</div>
                  </div>
                  <button onClick={()=>removeIndex(i)} className="text-rose-600 font-semibold">×</button>
                </div>
              ))}
              {periods.length===0 && <div className="text-gray-500 text-sm">No entries yet</div>}
            </div>
          </div>

          {/* Prediction Box */}
          <div className="bg-white shadow-xl rounded-3xl p-6 border border-rose-100">
            <h2 className="text-xl font-semibold mb-4 text-rose-500">Predictions</h2>
            {predicted ? (
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Next Period:</span> {predicted}</p>
                <p><span className="font-semibold">Ovulation:</span> {ovulation}</p>
                <p><span className="font-semibold">Fertile Window:</span> {fertileStart} → {fertileEnd}</p>
                <p><span className="font-semibold">Avg Cycle:</span> {avgCycle} days</p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Add at least 1 record</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}