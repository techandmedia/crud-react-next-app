export default function modalReducer(state, action) {
  console.log(state, action);
  const { type, results } = action;
  switch (type) {
    case "success":
      const { status, message } = results;
      return {
        ...state,
        isModalVisible: true,
        modalTitle: status,
        modalMessage: message
      };
    case "modal-show":
      return { ...state, isModalVisible: true };
    case "modal-ok":
      return {
        ...state,
        isModalVisible: false,
        modalTitle: "",
        modalMessage: ""
      };
    case "modal-cancel":
      return {
        ...state,
        isModalVisible: false,
        modalTitle: "",
        modalMessage: ""
      };
    default:
      throw new Error();
  }
}
