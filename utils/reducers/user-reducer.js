export default function menuReducer(state, action) {
  // console.log(state, action);
  const { type, results } = action;
  switch (type) {
    case "init":
      return {
        ...state
      };
    case "login-success":
      const { data } = results;
      return {
        ...state,
        detail: data.user,
        preference: data.preference,
        data: data.data,
        allUsers: data.allUsers_AdminOnly
      };
    default:
      throw new Error();
  }
}
