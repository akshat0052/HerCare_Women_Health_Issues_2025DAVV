import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Diet() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-100 via-rose-50 to-purple-100 p-6 pt-32 pb-20 overflow-hidden text-gray-800">

      {/* HERO SECTION */}
      <div className="text-center mb-16 relative" data-aos="fade-down">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6 drop-shadow-sm tracking-tight relative z-10">
          Nourish Your Body
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed relative z-10">
          Expertly curated diet plans for weight management and hormonal balance. 
          Transform your health naturally with our specialized guides.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ================= WEIGHT GAIN ================= */}
        <div data-aos="fade-up" className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-[2rem] transform rotate-1 group-hover:rotate-2 transition-transform duration-500 opacity-20"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-green-700 tracking-tight">
                Weight Gain Plan
                <span className="block text-base font-medium text-green-600/80 mt-1">For Underweight Women</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { time: 'Morning', items: 'Milk + 2 bananas + soaked almonds' },
                { time: 'Breakfast', items: 'Paneer paratha / oats with milk + nuts' },
                { time: 'Lunch', items: 'Roti + dal + paneer + rice + salad' },
                { time: 'Evening', items: 'Banana smoothie / peanut butter shake' },
                { time: 'Dinner', items: 'Roti + sabzi + dal + add ghee', colSpan: 'lg:col-span-2' },
              ].map((meal, idx) => (
                <div key={idx} className={`bg-green-50/80 hover:bg-white border border-green-100/50 p-6 rounded-2xl transition-colors duration-300 shadow-sm hover:shadow-md ${meal.colSpan || ''}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold text-green-800">{meal.time}</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{meal.items}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Eat every 3–4 hours', 'Include protein', 'Do strength training'].map((tip, i) => (
                <span key={i} className="bg-green-100/80 text-green-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                  ✓ {tip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= WEIGHT LOSS ================= */}
        <div data-aos="fade-up" data-aos-delay="100" className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-500 rounded-[2rem] transform -rotate-1 group-hover:-rotate-2 transition-transform duration-500 opacity-20"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-red-600 tracking-tight">
                Weight Loss Plan
                <span className="block text-base font-medium text-red-500/80 mt-1">For Overweight Women</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { time: 'Morning', items: 'Warm water + lemon + green tea' },
                { time: 'Breakfast', items: 'Oats / boiled eggs / poha' },
                { time: 'Lunch', items: '1–2 roti + sabzi + dal + salad' },
                { time: 'Evening', items: 'Fruits / roasted chana' },
                { time: 'Dinner', items: 'Soup / salad / light meal', colSpan: 'lg:col-span-2' },
              ].map((meal, idx) => (
                <div key={idx} className={`bg-red-50/80 hover:bg-white border border-red-100/50 p-6 rounded-2xl transition-colors duration-300 shadow-sm hover:shadow-md ${meal.colSpan || ''}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold text-red-800">{meal.time}</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{meal.items}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Avoid sugar', 'Avoid fried food', 'Walk 30–40 min daily'].map((tip, i) => (
                <span key={i} className="bg-red-100/80 text-red-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                  ✓ {tip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================= PCOD ================= */}
        <div data-aos="fade-up" data-aos-delay="200" className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-[2rem] transform rotate-1 group-hover:rotate-2 transition-transform duration-500 opacity-20"></div>
          <div className="relative bg-white/60 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-700 tracking-tight">
                PCOD / PCOS Diet
                <span className="block text-base font-medium text-purple-600/80 mt-1">Hormonal Balance Plan</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { time: 'Morning', items: 'Warm water + flax seeds' },
                { time: 'Breakfast', items: 'Oats / eggs / sprouts' },
                { time: 'Lunch', items: 'Multigrain roti + dal + sabzi' },
                { time: 'Evening', items: 'Nuts + green tea' },
                { time: 'Dinner', items: 'Light protein meal (paneer/tofu + veggies)', colSpan: 'lg:col-span-2' },
              ].map((meal, idx) => (
                <div key={idx} className={`bg-purple-50/80 hover:bg-white border border-purple-100/50 p-6 rounded-2xl transition-colors duration-300 shadow-sm hover:shadow-md ${meal.colSpan || ''}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold text-purple-800">{meal.time}</h3>
                  </div>
                  <p className="text-gray-700 font-medium">{meal.items}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Avoid sugar & maida', 'Eat on time', 'Do yoga daily'].map((tip, i) => (
                <span key={i} className="bg-purple-100/80 text-purple-700 text-sm font-semibold px-4 py-2 rounded-full shadow-sm">
                  ✓ {tip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER TIP */}
        <div data-aos="zoom-in" data-aos-delay="300" className="text-center bg-gradient-to-r from-pink-500 to-purple-500 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>
          
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10 flex items-center justify-center gap-2">
            Healthy Lifestyle Tip
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-white/90 font-medium relative z-10">
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">Drink 2–3L water</span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">Sleep 7–8 hrs</span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">Exercise daily</span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">Stay consistent</span>
          </div>
        </div>

      </div>
    </div>
  );
}