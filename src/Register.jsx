import { useContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import classes from "./styles/Register.module.css";
import CustomButton from "./CustomButton";
import okLogo from "./imgs/icons/verified.gif";
import closeModalWind from "./imgs/icons/cross.png";
import appleLogo from "./imgs/icons/apple-logo.png";
import googleLogo from "./imgs/icons/google-logo.png";
import { UserDataContext } from "./UserDataProvider";

export default function Register({ isFormVisible, setIsFormVisible }) {
  const registrForm = useRef();
  const modalWindow = useRef();
  const [isActiveModalWindow, setIsActiveModalWindow] = useState(false);
  const { setDataAvailabilityCheck } = useContext(UserDataContext);

  const inputRefs = {
    nickname: useRef(),
    phoneNumber: useRef(),
    email: useRef(),
    homeAddress: useRef(),
  };

  useEffect(() => {
    const body = document.body;

    if (isFormVisible) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [isFormVisible]);

  function checkAllValues() {
    const acquriedData = JSON.parse(localStorage.getItem("userAccount")) || {};
    const allValues = Object.values(acquriedData).every((value) => value);

    if (allValues) {
      setIsActiveModalWindow(true);
    }
  }

  function handleSubmit() {
    const newData = {
      nickname: inputRefs.nickname.current.value,
      phoneNumber: inputRefs.phoneNumber.current.value,
      email: inputRefs.email.current.value,
      homeAddress: inputRefs.homeAddress.current.value,
    };

    if (
      newData.nickname &&
      newData.phoneNumber &&
      newData.email &&
      newData.homeAddress
    ) {
      localStorage.setItem("userAccount", JSON.stringify(newData));
      setDataAvailabilityCheck(true);
      checkAllValues();
    }
  }

  return (
    <>
      <div className={classes.dimmingContent}></div>
      <form
        ref={registrForm}
        action="#"
        id="form"
        className={
          isFormVisible ? classes.orderProcessingForm : classes.hiddenForm
        }
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{
          opacity: isActiveModalWindow ? 0 : 1,
        }}
      >
        <button
          className={classes.closeForm}
          onClick={() => setIsFormVisible(false)}
        >
          <img src={closeModalWind} alt="close" />
        </button>

        <h2>Create an account</h2>
        <ul className={classes.orderProcessingForm__inputFieldWrapper}>
          <li className={classes.inputFieldWrapper__elem}>
            <label htmlFor="usersNickname">Your nickname</label>
            <input
              type="text"
              id="usersNickname"
              name="nickname"
              ref={inputRefs.nickname}
              required
            />
          </li>

          <li className={classes.inputFieldWrapper__elem}>
            <label htmlFor="usersPhoneNumber">Your phone number</label>
            <input
              type="text"
              id="usersPhoneNumber"
              name="phoneNumber"
              ref={inputRefs.phoneNumber}
              required
            />
          </li>

          <li className={classes.inputFieldWrapper__elem}>
            <label htmlFor="usersEmail">Your email address</label>
            <input
              type="email"
              id="usersEmail"
              name="email"
              ref={inputRefs.email}
              required
            />
          </li>

          <li className={classes.inputFieldWrapper__elem}>
            <label htmlFor="homeAddress">Your home address</label>
            <input
              type="text"
              id="homeAddress"
              ref={inputRefs.homeAddress}
              required
            />
          </li>
        </ul>

        <CustomButton style={{ width: "400px", margin: "15px auto" }}>
          Send
        </CustomButton>

        <div className={classes.orderProcessingForm__otherRegistratioOptions}>
          <h3>Or register with</h3>
          <div className={classes.otherRegistratioOptions__blockOptions}>
            <div className={classes.blockOptions__elem}>
              <img src={googleLogo} alt="Google" />
              <p>Google</p>
            </div>

            <div className={classes.blockOptions__elem}>
              <img src={appleLogo} alt="Apple" />
              <p>Apple</p>
            </div>
          </div>
        </div>
      </form>

      {isActiveModalWindow && (
        <>
          <div className={classes.modalBackdrop}></div>
          <div
            className={classes.wrapper__modal_completeRegistration}
            ref={modalWindow}
          >
            <img src={okLogo} alt="Success" />
            <h2>Registration was successful!</h2>
            <p>Thank you for trusting us! Now you can continue your business</p>
            <CustomButton
              onClick={() => {
                setIsFormVisible(false);
              }}
              style={{ width: "370px" }}
            >
              Continue
            </CustomButton>
          </div>
        </>
      )}
      <Outlet />
    </>
  );
}
