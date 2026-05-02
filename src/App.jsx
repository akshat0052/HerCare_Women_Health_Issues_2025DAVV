import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Disease from "./components/Disease";
import Header from "./components/Header";
import Loginpage from "./components/Loginpage";
import Registerpage from "./components/Registerpage";
import Chatbot from "./components/chatbot";
import DetailPage from "./components/detailpage";
import Home from "./components/home";
import PeriodTracker from "./components/PeriodTracker";
import { useEffect } from "react";
import Doctors from "./components/Doctor";
import Diet from "./components/Diet";


function App() {
  
  useEffect(() => {
    if (window.googleTranslateLoaded) return;

    window.googleTranslateLoaded = true;

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          layout:
            window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Router>
        <Header />
        {/* Hidden Google Translate element - controlled by Header language button */}
        <div id="google_translate_element" className="hidden-translate"></div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Loginpage />} />
          <Route path="/Register" element={<Registerpage />} />
          <Route path="/about" element={<Chatbot />} />
          <Route path="/Disease" element={<Disease />} />
          <Route path="/Diet" element={<Diet />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/PeriodTracker" element={<PeriodTracker />} />
          <Route path="/detailpage/:slug" element={<DetailPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;