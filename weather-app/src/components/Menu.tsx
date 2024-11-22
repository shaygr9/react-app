import { useContext } from "react";
import { AppContext } from "../helpers/Contexts";

function Menu() {

  const {changePage} = useContext(AppContext)

  return (
    <div className="buttons">
      <button className="today" onClick={()=>changePage('today')}>today</button>
      <button className="forecast" onClick={()=>changePage('forecast')}>forecast</button>
    </div>
  );
}

export default Menu;
