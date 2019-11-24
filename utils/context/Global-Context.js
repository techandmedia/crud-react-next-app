import { useEffect, useState, createContext, useReducer } from "react";
import menuReducer from "../reducers/select-menu-reducer";

const MenuContext = createContext(null);
const UserContext = createContext(null);

export default function GlobalProvider(props) {
  const [language, setLanguage] = useState("en");
  const [value, setLanguageValue] = useState(1);
  const [user, setUser] = useState("Andri");
  const [menu, dispatchMenu] = useReducer(menuReducer, { menu: "default" });

  // useEffect(() => {
  //   if (value === 1) {
  //     setLanguage(en);
  //     moment.locale("en");
  //   } else if (value === 2) {
  //     setLanguage(ind);
  //     moment.locale("id");
  //   }
  // }, [value]);

  return (
    <MenuContext.Provider value={{ menu, dispatchMenu }}>
      <UserContext.Provider value={{ user }}>
        {props.children}
      </UserContext.Provider>
    </MenuContext.Provider>
  );
}

export { MenuContext, UserContext };
