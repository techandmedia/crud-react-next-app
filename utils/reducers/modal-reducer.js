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
    case "warning":
      return {
        ...state,
        isModalVisible: true,
        modalTitle: "Warning",
        modalMessage: "Username atau Password yang Anda masukkan salah!"
      };
    case "modal-ok":
      return { ...state, isModalVisible: false };
    case "modal-cancel":
      return { ...state, isModalVisible: false };
    default:
      throw new Error();
  }
}
