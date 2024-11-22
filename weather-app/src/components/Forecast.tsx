import { useContext } from "react";
import { AppContext } from "../helpers/Contexts";

function Forecast() {
  const { changePage } = useContext(AppContext);

  return (
    <div id="today">
      <h2>forecast:</h2>
      <div className="row"></div>
      <div className="buttons">
        <button className="menu" onClick={() => changePage("menu")}>
          menu
        </button>
      </div>
    </div>
  );
}

export default Forecast;
