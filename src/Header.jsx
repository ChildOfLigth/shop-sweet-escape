import "./styles/Header.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import shoppingBascketIco from "./imgs/icons/shopping-basket.png";
import registrationUser from "./imgs/icons/registrationUser.png";
import iconForwebsite from "./imgs/icons/Sweet_Escape_Circular_Icon.png";
import { useContext } from "react";
import { UserDataContext } from "./UserDataProvider";

export default function Header() {
  const navigate = useNavigate();
  const { dataAvailabilityCheck } = useContext(UserDataContext);

  return (
    <header>
      <div className="menu-burger">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="header_content">
        <div className="header_content_linkBlock">
          <NavLink to={"/shop-sweet-escape"}>Home</NavLink>
          <NavLink to={"/shop-sweet-escape/menu"}>Menu</NavLink>
          <NavLink to={"/shop-sweet-escape/about-us"}>About us</NavLink>
        </div>

        <img src={iconForwebsite} alt="" className="header__iconForWebsite" />

        <div className="header__buttonBlock">
          <button
            onClick={() => navigate("/shop-sweet-escape/shopping-cart")}
            title="Go to cart"
          >
            <img src={shoppingBascketIco} alt="" />
          </button>

          <button onClick={() => navigate("/shop-sweet-escape/registration")} style={{display: dataAvailabilityCheck ? "none" : "block"}}>
              <img src={registrationUser} alt="" />
            </button>
          
        </div>
      </div>
      <Outlet />
    </header>
  );
}
