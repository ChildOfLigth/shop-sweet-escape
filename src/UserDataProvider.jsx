import { createContext, useEffect, useState } from "react";

export const UserDataContext = createContext();

export default function UserDataProvider({ children }) {
  const [dataAvailabilityCheck, setDataAvailabilityCheck] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userAccount"));
    if (storedData) {
      const isDataComplete =
        storedData.nickname &&
        storedData.phoneNumber &&
        storedData.email &&
        storedData.homeAddress;

      setDataAvailabilityCheck(!!isDataComplete);
    } else {
      setDataAvailabilityCheck(false);
    }
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        dataAvailabilityCheck,
        setDataAvailabilityCheck,
        userDataFromStorage: JSON.parse(localStorage.getItem("userAccount")),
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}
