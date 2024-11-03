import { NavLink, Outlet } from "react-router-dom";
import "./styles/Footer.css";
import discoverIco from "./imgs/icons/discoverIco.jpg";
import visaIco from "./imgs/icons/visaIco.png";

export default function Footer() {
  return (
    <>
      <Outlet />
      <footer>
        <div className="footer__content">
          <div className="footer__linkBlock">
            <NavLink to={"/shop-sweet-escape"}>Home</NavLink>
            <NavLink to={"/shop-sweet-escape/menu"}>Menu</NavLink>
            <NavLink to={"/shop-sweet-escape/about-us"}>About us</NavLink>
            <NavLink to={"/shop-sweet-escape/registration"}>Register</NavLink>
          </div>

          <div className="footer__paymentMethodBlock">
            <img src={discoverIco} alt="" />
            <img src={visaIco} alt="" />
          </div>
        </div>
      </footer>
    </>
  );
}
