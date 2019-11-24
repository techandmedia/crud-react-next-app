export default function menuReducer(state, action) {
  console.log(state, action);
  const { type, results } = action;
  switch (type) {
    case "init":
      return {
        ...state
      };
    case "login-success":
      console.log(results);
      return {
        ...state
      };
    default:
      throw new Error();
  }
}
