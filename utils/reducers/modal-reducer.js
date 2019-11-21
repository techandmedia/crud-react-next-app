export default function modalReducer(state, action) {
  console.log(state, action);
  const { type } = action;
  switch (type) {
    case "success":
      return {
        ...state,
        isModalVisible: true,
        modalTitle: "Success",
        modalMessage: "Anda Berhasil Login!"
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
