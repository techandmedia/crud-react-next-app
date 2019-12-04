export default function menuReducer(state, action) {
  console.log("TEST", state);
  console.log("TEST", action);
  const { key } = action;

  switch (key) {
    case 1:
      return {
        ...state
      };

    case 2:
      return {
        ...state
      };
    default:
      throw new Error();
  }
}
