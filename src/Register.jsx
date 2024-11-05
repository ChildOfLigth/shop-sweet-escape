import { useRef } from "react";
import classes from "./styles/Register.module.css";
import CustomButton from "./CustomButton";

export default function Register() {
  const registrForm = useRef();

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
  }

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

          <CustomButton
            style={{ width: "300px", margin: "10px auto"}}
            onClick={handleSubmit}
          >
            Send
          </CustomButton>
        </form>
      </div>
    </>
  );
}
