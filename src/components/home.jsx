import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Disease from "./Disease";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200 font-[Poppins] relative overflow-hidden">

      {/* 🌸 FLOATING FLOWERS */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 text-3xl animate-bounce">🌸</div>
        <div className="absolute top-40 right-20 text-2xl animate-pulse">🌷</div>
        <div className="absolute bottom-20 left-1/4 text-2xl animate-bounce">💮</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-pulse">🌹</div>
      </div>
      {/* HERO SECTION */}

      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-10 py-40">
        {/* TEXT */}

        <div className="max-w-xl" data-aos="fade-right">

          <h2 className="text-5xl md:text-6xl font-extrabold text-pink-700 mb-4 leading-tight">
            Elegant Care <br /> for Every Woman 💖
          </h2>

          <p className="text-lg text-gray-700 mb-6">

            Discover trusted health information, awareness, and wellness tips designed specially for women.
          </p>

          <button
            onClick={() => navigate("/disease")}
            className="bg-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-pink-300 hover:scale-105 transition duration-300">
            Explore Now

          </button>

        </div>
        {/* IMAGE */}

        <div className="mb-10 md:mb-0 relative" data-aos="fade-left">

          <div className="relative group">
            <img

              src="https://t4.ftcdn.net/jpg/07/27/56/21/360_F_727562179_kO4SXJ8KYrFumXiwgSHD7Yb2uSy7Gr8U.jpg"

              alt="Two Women"

              className="w-[400px] h-[400px] object-cover rounded-[40px] shadow-2xl transition-transform duration-500 group-hover:scale-105"

            />
            {/* overlay */}

            <div className="absolute inset-0 bg-pink-200 opacity-20 rounded-[40px]"></div>

          </div>
          {/* flowers */}

          <div className="absolute -top-6 -left-6 text-4xl animate-bounce">🌸</div>

          <div className="absolute -bottom-6 -right-6 text-4xl animate-pulse">🌷</div>

        </div>

      </section>

      {/* FEATURES */}

      {/* <section className="px-10 py-8 text-center">

        <h3 className="text-3xl font-bold text-pink-700 mb-10" data-aos="fade-up">

          Our Special Care 🌺

        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition border border-white/30" data-aos="fade-up">

            🌸

            <h4 className="text-xl font-semibold mt-2 text-pink-600">

              Disease Awareness

            </h4>

            <p className="text-gray-600">

              Learn about women's health issues in simple language.

            </p>

          </div>
          <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition border border-white/30" data-aos="fade-up">

            💖

            <h4 className="text-xl font-semibold mt-2 text-pink-600">

              Wellness Tips

            </h4>

            <p className="text-gray-600">

              Daily habits for a healthy and happy life.

            </p>

          </div>

          <div className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition border border-white/30" data-aos="fade-up">

            🌷

            <h4 className="text-xl font-semibold mt-2 text-pink-600">

              Care & Support

            </h4>

            <p className="text-gray-600">

              Empowering women with knowledge and care.

            </p>

          </div>
        </div>

      </section>
      <section className="text-center py-16 bg-pink-500 text-white" data-aos="zoom-in">

        <h3 className="text-3xl font-bold mb-4">

          Start Your Healthy Journey 💕

        </h3>
        <a href="/login"

          className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold shadow-md hover:scale-105 transition">
          Get Started
        </a>
      </section> */}
      {/* FOOTER */}

      <footer className="text-center py-6 text-gray-700">

        © 2026 HerCare 🌸 | Made with Love for women

      </footer>



    </div>

  );

}