import React, { useState, lazy } from "react";

const Modal = lazy(() => import("./Modal"));

const ModalContainer = ({ text }) => {
  const [showModal, toggleModal] = useState(false);
  return (
    <div>
      <button onClick={() => toggleModal(!showModal)}>{text}</button>
      <div>
        {showModal ? (
          <Modal>
            <h1>{text}</h1>
            <div className="buttons">
              <button onClick={() => toggleModal(!showModal)}>Yes</button>
              <button onClick={() => toggleModal(!showModal)}>No</button>
            </div>
          </Modal>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default ModalContainer;
