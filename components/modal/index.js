import { Modal } from "antd";


export default function CustomModal(props) {
  function handleOk() {
    props.dispatchModal({ type: "modal-ok" });
  }

  function handleCancel() {
    props.dispatchModal({ type: "modal-cancel" });
  }

  return (
    <Modal
      title={props.modal.modalTitle}
      visible={props.modal.isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{props.modal.modalMessage}</p>
    </Modal>
  );
}

// export default function CustomModal(props) {
//   function handleOk() {
//     props.setModalVisible(false);
//   }

//   function handleCancel() {
//     props.setModalVisible(false);
//   }

//   return (
//     <Modal
//       title={props.modalTitle}
//       visible={props.isModalVisible}
//       onOk={handleOk}
//       onCancel={handleCancel}
//     >
//       <p>{props.modalMessage}</p>
//     </Modal>
//   );
// }
