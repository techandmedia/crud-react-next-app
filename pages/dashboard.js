import { useContext, useEffect } from "react";
import { MenuContext, UserContext } from "context/Global-Context";
import pages from "../modules";

export default function Dashboard(props) {
  const { menu, dispatchMenu } = useContext(MenuContext);

  // const { user, dispatchUser } = useContext(UserContext);

  // useEffect(() => {
  //   console.log(props.isLoggedIn, pages[0]);
  // });

  function renderPage() {
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].key === menu.menu) {
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
