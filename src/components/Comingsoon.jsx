// Imports 📩
import { useState, useRef, useEffect } from "react";
import styles from "./Comingsoon.module.css";
import pingo from "../assets/Ping0! (small).png";
import supabase from "../assets/supabase.png";
import bg from "../assets/globe_1.png";
import Navbar from "./Navbar";
import { LuCalendar } from "react-icons/lu";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

// Demo Data
const waitlist = [
  {
    id: 1,
    name: "Ava Johnson",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: 2,
    name: "Liam Franck",
    image: "https://i.pravatar.cc/150?img=24",
  },
  {
    id: 3,
    name: "Noah Kim",
    image: "https://i.pravatar.cc/150?img=10",
  },
  {
    id: 4,
    name: "Emma Garcia",
    image: "https://i.pravatar.cc/150?img=56",
  },
  {
    id: 5,
    name: "Ethan Patel",
    image: "https://i.pravatar.cc/150?img=34",
  },
  {
    id: 6,
    name: "Sophia Müller",
    image: "https://i.pravatar.cc/150?img=12",
  },
];

// Component 🧩
function Comingsoon() {
  // State 🧠
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(31_622_400); // 1 year

  // Refs
  const iframeRef = useRef(null);

  // video id
  const videoId = "b2ZCQbhgzzo";

  // Navigate
  const navigate = useNavigate();

  // Clock
  const days = Math.floor(time / (24 * 60 * 60));
  const hours = Math.floor((time % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  // Effects 🌀
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => {
        if (t > 0) return t - 1;
        return 0;
      });
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, []); // ✅ empty array

  // Helpers ⚕️
  function handlePlay(e) {
    e.stopPropagation(); // prevents wrapper click interference
    setIsPlaying(true);
  }

  function handlePause() {
    setIsPlaying(false);
  }

  function handleLogo() {
    navigate("/");
  }

  return (
    <>
      <Navbar />

      <section className={styles.comingSoon}>
        {/* Globe */}
        <div className={styles.bg}>
          <div class={styles.globeWrapper}>
            <img src={bg} alt="globe background" />
          </div>
        </div>

        {/* Content */}
        <div className={styles.ComingsoonWrapper}>
          {/* Logo */}
          <div className={styles.logo} onClick={handleLogo}>
            <img src={pingo} alt="pingo logo" draggable="false" />
          </div>

          {/* Availability */}
          <div className={styles.availability}>
            <span></span>
            <h5>Availabale in early 2027</h5>
          </div>

          {/* Heading & Content */}
          <div className={styles.content}>
            <h3>Get Early Access</h3>
            <p>
              Be part of something before the world catches on. Join Pingo’s
              exclusive early circle and claim your spot on our viral waitlist.
              The countdown has begun—sign up now and be the first to know when
              we go live. 🚀
            </p>
          </div>

          {/* Email and CTA */}
          <div className={styles.input}>
            <div>
              <input type="email" placeholder="Email" />
              <button>Join waitlist</button>
            </div>
          </div>

          {/* Waitlist */}
          <div className={styles.waitlist}>
            <div className={styles.waitlistProfiles}>
              {waitlist.map((person) => (
                <div key={person.id}>
                  <img src={person.image} alt={person.name} />
                </div>
              ))}
            </div>

            <p>Join 12,500+ others on the waitlist.</p>
          </div>

          {/* Clock */}
          <div className={styles.clock}>
            <div className={styles.clockWrapper}>
              <div className={styles.clockDigits}>
                <span>{days}</span>
                <span>Days</span>
              </div>
              :
              <div className={styles.clockDigits}>
                <span>{hours}</span>
                <span>Hours</span>
              </div>
              :
              <div className={styles.clockDigits}>
                <span>{minutes}</span>
                <span>Minutes</span>
              </div>
              :
              <div className={styles.clockDigits}>
                <span>{seconds}</span>
                <span>Seconds</span>
              </div>
            </div>

            <div className={styles.calender}>
              <span>
                <LuCalendar />
              </span>
              <span>Left Untill Full Release</span>
            </div>
          </div>

          {/* Video */}
          <div className={styles.video}>
            <div className={styles.dots}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            {/* Video */}
            {/* Wrapper click = pause */}
            <div className={styles.videoWrapper} onClick={handlePause}>
              {/* Thumbnail */}
              {!isPlaying ? (
                <>
                  {/* Thumbnail */}
                  <img
                    src="https://img.youtube.com/vi/b2ZCQbhgzzo/hqdefault.jpg"
                    alt="Video thumbnail"
                    className={styles.thumbnail}
                  />

                  {/* Custom Play Button */}
                  <div className={styles.playButton} onClick={handlePlay}>
                    ▶
                  </div>

                  <span className={styles.seeHowWaitWorks}>
                    See how wait works (22m)
                  </span>

                  {/* Optional overlay for cinematic feel */}
                  <div className={styles.overlay}></div>
                </>
              ) : (
                <iframe
                  className={styles.iframe}
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  ref={iframeRef}
                  title="YouTube video"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </div>

        {/* Sponsor */}
        <div className={styles.sponsor}>
          Powered by
          <span>
            <img src={supabase} alt="supabase logo" draggable="false" />
          </span>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Comingsoon;
