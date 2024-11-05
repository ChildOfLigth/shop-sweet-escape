import { NavLink, Outlet } from "react-router-dom";
import "./styles/Footer.css";
import discoverIco from "./imgs/icons/discoverIco.jpg";
import visaIco from "./imgs/icons/visaIco.png";
import viberIco from "./imgs/icons/viber.png";
import telegramIco from "./imgs/icons/telegram.png";
import instIco from "./imgs/icons/instagram.png";

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

          <div className="foter__adress_info">
            <h3>Adress</h3>
            <p>305 Oxford Street</p>
            <p>10:00-19:00, days off Saturday-Sunday</p>
          </div>

          <div className="footer__contacts">
            <h3>Contacts</h3>
            <p>+44 20 7946 1234</p>
            <p>sweetesc@gmail.com</p>
          </div>

          <div className="footer_socialMedia">
            <h3>Social Media</h3>
            <div className="socialMedia__icons">
              <img src={instIco} alt="" />
              <img src={viberIco} alt="" />
              <img src={telegramIco} alt="" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
