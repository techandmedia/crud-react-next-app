import { useEffect, useState, createContext, useReducer } from "react";
import { selectMenuReducer, userReducer } from "../reducers";

const MenuContext = createContext(null);
const UserContext = createContext(null);

export default function GlobalProvider(props) {
  const [user, dispatchUser] = useReducer(userReducer, {
    preferredWorkingHour: 8
  });
  const [menu, dispatchMenu] = useReducer(selectMenuReducer, {
    menu: "default"
  });

  return (
    <MenuContext.Provider value={{ menu, dispatchMenu }}>
      <UserContext.Provider value={{ user, dispatchUser }}>
        {props.children}
      </UserContext.Provider>
    </MenuContext.Provider>
  );
}

export { MenuContext, UserContext };
