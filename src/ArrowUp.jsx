import arowToTop from "./imgs/icons/arowTop.png";
import { useEffect, useRef, useState } from "react";
import "./styles/ArrowUp.css";

export default function ArrowUp({ coordinat, coordinatesToHide }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollToUp = useRef(null);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollToUp.current) {
      scrollToUp.current.style.opacity = scrollPosition >= coordinat ? "1" : "0";
    }
  }, [scrollPosition, coordinat]);

  useEffect(() => {
    if (scrollToUp.current) {
      scrollToUp.current.style.opacity = scrollPosition <= coordinatesToHide ? "0" : "1";
    }
  }, [scrollPosition, coordinatesToHide]);

  const scrollToTop = () => {
    window.scrollTo({
      top: coordinat,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        ref={scrollToUp}
        onClick={scrollToTop}
        className="buttonToScrollUp"
        style={{ opacity: 0, transition: "opacity 0.5s" }}
      >
        <img src={arowToTop} alt="Scroll to top" />
      </button>
    </>
  );
}
