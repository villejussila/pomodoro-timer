import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import Modal from "react-modal";
import "./Settings.css";

Modal.setAppElement("#root");

const customStyles: Modal.Styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(71, 71, 71, 0.911)",
    zIndex: 1000,
  },
  content: {
    top: "25%",
    left: "50%",
    right: "100px",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#242424",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
  },
};
const Settings = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  function handleChangeVolume(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  return (
    <>
      <button
        data-tip="Settings"
        data-delay-show="1000"
        className="settings-button"
        onClick={openModal}
      >
        <i className="fas fa-cog"></i>
      </button>
      <ReactTooltip />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal-top">
          <h2>Settings</h2>
          <button onClick={closeModal} className="modal-close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form className="settings-form">
          <label htmlFor="volume">Alarm volume</label>
          <input
            type="range"
            min="0"
            max="100"
            name="volume"
            defaultValue="75"
            className="volume-slider"
            onChange={(e) => handleChangeVolume(e)}
          />
          <label htmlFor="enable-static-background">
            Use static background when timer is running
          </label>
          <input
            type="checkbox"
            name="enable-static-background"
            className="enable-static-bg-checkbox"
          />
        </form>
      </Modal>
    </>
  );
};

export default Settings;
