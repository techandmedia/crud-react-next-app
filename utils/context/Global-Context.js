import { useEffect, useState, createContext, useReducer } from "react";
import { selectMenuReducer, userReducer } from "../reducers";

const MenuContext = createContext(null);
const UserContext = createContext(null);

export default function GlobalProvider(props) {
  const [language, setLanguage] = useState("en");
  const [value, setLanguageValue] = useState(1);
  const [user, dispatchUser] = useReducer(userReducer, {
    preferredWorkingHour: 8
  });
  const [menu, dispatchMenu] = useReducer(selectMenuReducer, {
    menu: "preference"
  });

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
      <UserContext.Provider value={{ user, dispatchUser }}>
        {props.children}
      </UserContext.Provider>
    </MenuContext.Provider>
  );
}

export { MenuContext, UserContext };
