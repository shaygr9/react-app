import { createContext } from "react"


type StateType = {
  page: string;
  changePage(nextPage?:string): void;
};

const initState: StateType = {
  page: "menu",
  changePage: () => {},
};

export const AppContext = createContext<StateType>(initState);


