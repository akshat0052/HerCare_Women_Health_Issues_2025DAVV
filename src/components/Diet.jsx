import React, { useState } from 'react'

export default function Diet() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white p-6 pt-30">

      {/* HERO */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-pink-600 mb-3">
           Women Diet & Health Plans
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Personalized diet plans for weight gain, weight loss, and PCOD. 
          Follow a healthy lifestyle and transform your body naturally.
        </p>
      </div>

      {/* ================= WEIGHT GAIN ================= */}
      <div className="mb-12 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-green-600 mb-6">
           Weight Gain Plan (For Underweight Women)
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Morning</h3>
            <p>Milk + 2 bananas  + soaked almonds </p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Breakfast</h3>
            <p>Paneer paratha / oats with milk + nuts</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Lunch</h3>
            <p>Roti + dal + paneer + rice + salad</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Evening</h3>
            <p>Banana smoothie / peanut butter shake</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl md:col-span-2">
            <h3 className="font-semibold mb-2"> Dinner</h3>
            <p>Roti + sabzi + dal + add ghee</p>
          </div>

        </div>

        <p className="mt-4 text-sm text-gray-500">
          ✔ Eat every 3–4 hours • ✔ Include protein • ✔ Do strength training
        </p>
      </div>

      {/* ================= WEIGHT LOSS ================= */}
      <div className="mb-12 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-red-500 mb-6">
           Weight Loss Plan (For Overweight Women)
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-red-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Morning</h3>
            <p>Warm water + lemon  + green tea</p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Breakfast</h3>
            <p>Oats / boiled eggs / poha</p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Lunch</h3>
            <p>1–2 roti + sabzi + dal + salad </p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Evening</h3>
            <p>Fruits / roasted chana</p>
          </div>

          <div className="bg-red-50 p-4 rounded-xl md:col-span-2">
            <h3 className="font-semibold mb-2"> Dinner</h3>
            <p>Soup / salad / light meal</p>
          </div>

        </div>

        <p className="mt-4 text-sm text-gray-500">
          ✔ Avoid sugar • ✔ Avoid fried food • ✔ Walk 30–40 min daily
        </p>
      </div>

      {/* ================= PCOD ================= */}
      <div className="mb-12 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-purple-600 mb-6">
          🩺 PCOD / PCOS Diet Plan
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-purple-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Morning</h3>
            <p>Warm water + flax seeds </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Breakfast</h3>
            <p>Oats / eggs / sprouts</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Lunch</h3>
            <p>Multigrain roti + dal + sabzi</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2"> Evening</h3>
            <p>Nuts + green tea</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl md:col-span-2">
            <h3 className="font-semibold mb-2"> Dinner</h3>
            <p>Light protein meal (paneer/tofu + veggies)</p>
          </div>

        </div>

        <p className="mt-4 text-sm text-gray-500">
          ✔ Avoid sugar & maida • ✔ Eat on time • ✔ Do yoga daily
        </p>
      </div>

      {/* FOOTER TIP */}
      <div className="text-center bg-pink-100 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-pink-600 mb-2">
           Healthy Lifestyle Tip
        </h3>
        <p className="text-gray-700 text-sm">
          Drink 2–3L water  • Sleep 7–8 hrs  • Exercise daily  • Stay consistent 
        </p>
      </div>

    </div>
  );
}