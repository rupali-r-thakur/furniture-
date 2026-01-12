import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import video1 from "../Videos/video1.mp4";
import video2 from "../Videos/video2.mp4";
import video3 from "../Videos/video3.mp4";

const slides = [
  {
    video: video1,
    title: "Modern Furniture",
    text: "Premium interior solutions",
  },
  {
    video: video2,
    title: "Custom Work",
    text: "Made as per your design",
  },
  {
    video: video3,
    title: "Trusted Thekedar",
    text: "Quality & on-time delivery",
  },
];

function Home() {
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // ARROWS
  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  // TOUCH / MOUSE
  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleEnd = (e) => {
    if (!isDragging.current) return;

    const endX = e.changedTouches
      ? e.changedTouches[0].clientX
      : e.clientX;

    const diff = startX.current - endX;

    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();

    isDragging.current = false;
  };

  return (
    <div
      className="slider"
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
    >
      {/* SLIDES  */}
      <div
        className="slides"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div className="slide" key={i}>
            <video autoPlay muted loop playsInline>
              <source src={slide.video} type="video/mp4" />
            </video>

            <div className="overlay">
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ARROWS */}
      <button className="arrow left" onClick={prevSlide}>
        <FaChevronLeft />
      </button>

      <button className="arrow right" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      {/* DOTS */}
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={i === index ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
