export default function Dashboard(props) {
  console.log("Dashboard", props);

  function LoginFailed() {
    return <p>Silahkan Login untuk mengakses fitur ini</p>;
  }

  function LoginSuccess() {
    return <p>Anda berhasil login</p>;
  }

  return (
    <React.Fragment>
      {props.isLoggedIn ? <LoginSuccess /> : <LoginFailed />}
    </React.Fragment>
  );
}
