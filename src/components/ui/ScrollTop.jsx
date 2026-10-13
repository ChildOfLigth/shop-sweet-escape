import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (pathname !== "/shop-sweet-escape/menu") {
      window.scrollTo(0, 0);
    } else if (state && state.scrollPosition) {
      window.scrollTo(0, state.scrollPosition);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
};

export default ScrollToTop;
