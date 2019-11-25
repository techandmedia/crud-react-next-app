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
    case "modal-ok":
      return { ...state, isModalVisible: false };
    case "modal-cancel":
      return { ...state, isModalVisible: false };
    default:
      throw new Error();
  }
}
