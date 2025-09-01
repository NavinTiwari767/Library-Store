import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GLOBE from "vanta/dist/vanta.globe.min";
import * as THREE from "three";

export default function Home() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x00ffff,
          color2: 0xff00ff,
          backgroundColor: 0x000010,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="h-screen w-full flex items-center justify-center text-white"
    >
      <div className="relative z-10 text-center px-4">
      
        {/* ✅ THIS LINE IS UPDATED FOR BETTER ALIGNMENT */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
          🌍 Welcome To BookStore
        </h1>

        <p className="mt-4 text-lg md:text-xl">Explore books around the globe</p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}