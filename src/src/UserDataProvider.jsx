import { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();

export default function UserDataProvider({ children }) {
  const [dataAvailabilityCheck, setDataAvailabilityCheck] = useState(false);
  const userDataFromStorage = JSON.parse(localStorage.getItem("userAccount"));

  useEffect(() => {
    if (!userDataFromStorage) {
      const templateFillingInUserData = {
        nickname: "",
        phoneNumber: "",
        email: "",
        homeAdress: "",
      };
      localStorage.setItem(
        "userAccount",
        JSON.stringify(templateFillingInUserData)
      );
    } else {
      const isDataComplete =
        userDataFromStorage.nickname &&
        userDataFromStorage.phoneNumber &&
        userDataFromStorage.email &&
        userDataFromStorage.homeAdress;
      setDataAvailabilityCheck(isDataComplete);
    }
  }, [userDataFromStorage]);

  return (
    <UserDataContext.Provider
      value={{ dataAvailabilityCheck, userDataFromStorage }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
