import { useContext, useEffect } from "react";
import { MenuContext, UserContext } from "../utils/context/Global-Context";
import pages from "../modules";

export default function Dashboard(props) {
  const { menu, dispatchMenu } = useContext(MenuContext);
  const user = useContext(UserContext);

  useEffect(() => {
    console.log(props.isLoggedIn, pages[0]);
  });

  function renderPage() {
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].menu === menu.menu) {
        return <React.Fragment>{pages[i].component}</React.Fragment>;
      }
    }
  }

  return (
    <React.Fragment>
      {props.isLoggedIn ? renderPage() : pages[0].component}
    </React.Fragment>
  );
}
