import { useState } from "react";
import Modal from "react-modal";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";

const Unlove = ({ movieId, onDelete, onClose }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    if (onClose) onClose();
  };

  const confirmDelete = () => {
    onDelete(movieId);
    closeModal();
  };

  return (
    <div>
      
      <button
        onClick={handleClick}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 
                ${clicked ? "bg-white" : "bg-red-600"}`}
      >
        <HeartIcon
          className={`h-5 w-5 ${clicked ? "text-red-600" : "text-white"}`}
        />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Konfirmasi Hapus"
        appElement={document.getElementById("root")}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "500px",
            padding: "20px",
            borderRadius: "10px",
          },
        }}
      >
        <h2 className="flex justify-center pb-3 font-medium underline underline-offset-4">
          Konfirmasi
        </h2>
        <p className="pb-3">Apakah Anda yakin ingin menghapus item ini dari favorite?</p>
        <button className="btn mr-5" onClick={confirmDelete}>
          Ya
        </button>
        <button className="btn" onClick={closeModal}>
          Tidak
        </button>
      </Modal>
    </div>
  );
};

export default Unlove;