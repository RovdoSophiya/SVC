import React from "react";
import "./modal.css";

const Modal = ({ active, setActive }) => {
  return (
    <section
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setActive(false)}>
          &#215;
        </button>
        <div className="modal-title">
          <h2 data-i18="modalAuthor">Oops, you are not authorized!</h2>
        </div>
        <hr />
        <div className="modal-content">
          <p data-i18="modalLogReg">
            Log in to your personal account or register to view store options
          </p>
          <a href="#" data-i18="LogReg">
            Login/Register
          </a>
        </div>
      </div>
    </section>
  );
};

export default Modal;
