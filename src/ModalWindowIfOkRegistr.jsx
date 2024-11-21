import { useContext, useState } from "react";
import { UserDataContext } from "./UserDataProvider";
import "./styles/ModalWindowIfOkRegister.css";
import CustomButton from "./CustomButton";
import Register from "./Register";
import closeModalWind from "./imgs/icons/cross.png";

export default function ModalWindowIfOkRegister({ modalWindVisibility, setModalWindVisibility }) {
  const { userDataFromStorage, setDataAvailabilityCheck } =
    useContext(UserDataContext);
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      {modalWindVisibility && !isFormVisible && (
        <>
          <div className="modalBackdrop"></div>
          <div className="blockIfRegistrAvailable">
            <button className="closeModalWind" onClick={() => setModalWindVisibility(false)}>
              <img src={closeModalWind} alt="" />
            </button>
            <h2>You are already registered</h2>
            <h3>Your data:</h3>
            <ul>
              <li>
                Nickname: <span>{userDataFromStorage?.nickname}</span>
              </li>
              <li>
                Email: <span>{userDataFromStorage?.email}</span>
              </li>
              <li>
                Phone number: <span>{userDataFromStorage?.phoneNumber}</span>
              </li>
              <li>
                Home address: <span>{userDataFromStorage?.homeAddress}</span>
              </li>
            </ul>
            <CustomButton
              style={{ margin: "8px auto" }}
              onClick={() => {
                setDataAvailabilityCheck(false);
                setIsFormVisible(true);
              }}
            >
              Change data
            </CustomButton>
          </div>
        </>
      )}
      {isFormVisible && (
        <Register
          isFormVisible={isFormVisible}
          setIsFormVisible={setIsFormVisible}
        />
      )}
    </>
  );
}
