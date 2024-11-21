import { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();

export default function UserDataProvider({ children }) {
  const [dataAvailabilityCheck, setDataAvailabilityCheck] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userAccount"));

    if (!storedData) {
      const templateFillingInUserData = {
        nickname: "",
        phoneNumber: "",
        email: "",
        homeAddress: ""
      };
      localStorage.setItem("userAccount", JSON.stringify(templateFillingInUserData));
      setDataAvailabilityCheck(false);
    } else {
      const isDataComplete =
        storedData.nickname &&
        storedData.phoneNumber &&
        storedData.email &&
        storedData.homeAddress;
      setDataAvailabilityCheck(!!isDataComplete);
    }
  }, []);

  return (
    <UserDataContext.Provider
      value={{ dataAvailabilityCheck, userDataFromStorage: JSON.parse(localStorage.getItem("userAccount")) }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
