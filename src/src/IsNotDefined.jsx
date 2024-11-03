import { useNavigate } from "react-router-dom";
import "./styles/IsNotDefined.css";
import notDefinedIco from "./imgs/icons/empty-state.png";
export default function IsNotDefined() {
  const navigate = useNavigate();
  return (
    <div className="errorBlock">
      <h1>Error 404</h1>
      <h2>This page was not found.</h2>
      <p>click on the button below to go to the main page</p>
      <button onClick={() => navigate("/shop-sweet-escape")}>
        Go to main page
      </button>
      <img src={notDefinedIco} alt="" />
    </div>
  );
}
