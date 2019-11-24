export default function menuReducer(state, action) {
  console.log(state, action);
  const { key, results } = action;
  switch (key) {
    case key:
      return {
        ...state,
        menu: key
      };
    default:
      throw new Error();
  }
}
