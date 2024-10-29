import { HeartIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addFavorite } from "../store/action/favoriteAction";
import Modal from "react-modal";
import { useState } from "react";

const LoveButton = ({ movie }) => {
  const [clicked, setClicked] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!confirmed) {
      setModalIsOpen(true); 
    } else {
      alert("Film sudah ditambahkan ke favorit!"); 
    }
  };

  const confirmAdd = () => {
    dispatch(addFavorite(movie));
    setClicked(true);
    setConfirmed(true);
    setModalIsOpen(false); 
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 
                ${clicked ? "bg-red-600" : "bg-white"}`}
      >
        <HeartIcon
          className={`h-5 w-5 ${clicked ? "text-white" : "text-red-600"}`}
        />
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Konfirmasi Tambah Favorit"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Latar belakang gelap
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
        <p className="pb-3">Apakah ingin menambahkan film ini ke favorit?</p>
        <button className="btn mr-5" onClick={confirmAdd}>
          Ya
        </button>
        <button className="btn" onClick={closeModal}>
          Tidak
        </button>
      </Modal>
    </div>
  );
};

export default LoveButton;
