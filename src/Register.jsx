import { useEffect, useRef, useState } from "react";
import classes from "./styles/Register.module.css";
import CustomButton from "./CustomButton";
import registrationSuccessful from "./imgs/icons/man.png";

export default function Register() {
  const blockAboutRegistrConfirmation = useRef();
  const registrForm = useRef();
  const [localStorageData, setLocalStorageData] = useState(
    JSON.parse(localStorage.getItem("userAccount")) || {}
  );
  const inputRefs = {
    nickname: useRef(),
    phoneNumber: useRef(),
    email: useRef(),
    homeAdress: useRef(),
  };

  function handleSubmit() {
    const newData = {
      nickname: inputRefs.nickname.current.value,
      phoneNumber: inputRefs.phoneNumber.current.value,
      email: inputRefs.email.current.value,
      homeAdress: inputRefs.homeAdress.current.value,
    };
    localStorage.setItem("userAccount", JSON.stringify(newData));
    setLocalStorageData(newData);
  }

  const checkLocalStorageData = () => {
    if (
      localStorageData.nickname &&
      localStorageData.phoneNumber &&
      localStorageData.email &&
      localStorageData.homeAdress
    ) {
      blockAboutRegistrConfirmation.current.style.display = "block";
      registrForm.current.style.display = "none";
    } else {
      blockAboutRegistrConfirmation.current.style.display = "none";
      registrForm.current.style.display = "flex";
    }
  };

  useEffect(() => {
    checkLocalStorageData();
  }, [localStorageData]);

  const handleRemoveData = () => {
    localStorage.removeItem("userAccount");
    setLocalStorageData({});
  };

  return (
    <>
      <div className={classes.wrapper}>
        <form
          ref={registrForm}
          action="#"
          id="form"
          className={classes.orderProcessingForm}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className={classes.orderProcessingForm__titleBlock}>
            <h1>Registration on the site</h1>
            <p>
              Registration is required in order for you to be able to perform
              some actions on the site that are related to your personal data.
              Please, enter accurate information
            </p>
          </div>
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
                type="number"
                id="usersPhoneNumber"
                name="phoneNumber"
                ref={inputRefs.phoneNumber}
                required
              />
            </li>

            <li className={classes.inputFieldWrapper__elem}>
              <label htmlFor="usersEmail">Your email adress</label>
              <input
                type="email"
                id="usersEmail"
                name="email"
                ref={inputRefs.email}
                required
              />
            </li>

            <li className={classes.inputFieldWrapper__elem}>
              <label htmlFor="homeAddres">
                Your home address (street, house/apartament number)
              </label>
              <input
                type="text"
                id="homeAddres"
                ref={inputRefs.homeAdress}
                required
              />
            </li>
          </ul>

          <button
            className={classes.orderProcessingForm__formSubmitButton}
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
        <div
          className={classes.modalIfDataExists}
          ref={blockAboutRegistrConfirmation}
        >
          <h1>You are already registered!</h1>
          <p>If you want to update the data, click on the button below</p>
          <CustomButton onClick={handleRemoveData}>Rewrite data</CustomButton>
          <img src={registrationSuccessful} alt="" />
        </div>
      </div>
    </>
  );
}
