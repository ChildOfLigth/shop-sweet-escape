import "./styles/Header.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import shoppingBascketIco from "./imgs/icons/shopping-basket.png";
import registrationUser from "./imgs/icons/registrationUser.png";
import iconForwebsite from "./imgs/icons/Sweet_Escape_Circular_Icon.png";
import { UserDataContext } from "./UserDataProvider";
import Register from "./Register";
import ModalWindowIfOkRegister from "./ModalWindowIfOkRegistr";

export default function Header() {
  const navigate = useNavigate();
  const { dataAvailabilityCheck } = useContext(UserDataContext);
  const [registrationBlockVisibility, setRegistrationBlockVisibility] =
    useState(false);
  const [modalWindowvisibilite, setModalWindowVisibilite] = useState(false);
  const [openMenuBurger, setOpenMenuBurger] = useState(false);

  return (
    <header>
      <div
        className="menu-burger"
        onClick={() => {
          setOpenMenuBurger(!openMenuBurger);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div
        className={openMenuBurger ? "blockMenuBurger" : "hiddenMenuBurgBlock"}
      >
        <div className="menu-burger_linkBlock">
          <NavLink
            to={"/shop-sweet-escape"}
            onClick={() => setOpenMenuBurger(false)}
          >
            Home
          </NavLink>
          <NavLink
            to={"/shop-sweet-escape/menu"}
            onClick={() => setOpenMenuBurger(false)}
          >
            Menu
          </NavLink>
          <NavLink
            to={"/shop-sweet-escape/about-us"}
            onClick={() => setOpenMenuBurger(false)}
          >
            About us
          </NavLink>

          <div className="linkBlock__buttonBlock">
            <button
              onClick={() => {
                dataAvailabilityCheck
                  ? navigate("/shop-sweet-escape/shopping-cart")
                  : setRegistrationBlockVisibility(
                      !registrationBlockVisibility
                    );

                setOpenMenuBurger(false);
              }}
              title="Go to cart"
            >
              <img src={shoppingBascketIco} alt="" />
            </button>

            <button
              onClick={() => {
                if (dataAvailabilityCheck) {
                  setModalWindowVisibilite(true);
                  setRegistrationBlockVisibility(false);
                  setOpenMenuBurger(false);
                } else {
                  setRegistrationBlockVisibility(!registrationBlockVisibility);
                  setOpenMenuBurger(false);
                }
              }}
            >
              <img src={registrationUser} alt="" />
            </button>
          </div>
        </div>
      </div>

      <div className="header_content">
        <img
          src={iconForwebsite}
          alt=""
          className="header__iconForWebsite"
          onClick={() => navigate("/shop-sweet-escape")}
          title="Go to the main page"
          style={{ display: openMenuBurger ? "none" : "block" }}
        />

        <div className="header_content_linkBlock">
          <NavLink to={"/shop-sweet-escape"}>Home</NavLink>
          <NavLink to={"/shop-sweet-escape/menu"}>Menu</NavLink>
          <NavLink to={"/shop-sweet-escape/about-us"}>About us</NavLink>

          <div className="linkBlock__buttonBlock">
            <button
              onClick={() =>
                dataAvailabilityCheck
                  ? navigate("/shop-sweet-escape/shopping-cart")
                  : setRegistrationBlockVisibility(!registrationBlockVisibility)
              }
              title="Go to cart"
            >
              <img src={shoppingBascketIco} alt="" />
            </button>

            <button
              onClick={() => {
                if (dataAvailabilityCheck) {
                  setModalWindowVisibilite(true);
                  setRegistrationBlockVisibility(false);
                } else {
                  setRegistrationBlockVisibility(!registrationBlockVisibility);
                }
              }}
            >
              <img src={registrationUser} alt="" />
            </button>
          </div>
        </div>
      </div>

      {registrationBlockVisibility && (
        <Register
          isFormVisible={registrationBlockVisibility}
          setIsFormVisible={setRegistrationBlockVisibility}
        />
      )}

      {!registrationBlockVisibility && (
        <ModalWindowIfOkRegister
          modalWindVisibility={modalWindowvisibilite}
          setModalWindVisibility={setModalWindowVisibilite}
        />
      )}

      <Outlet />
    </header>
  );
}
