import React, { Component, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.css"; // Importa la hoja de estilos externa


class Modal extends Component {
  render() {
    const { isOpen, onClose, children ,title} = this.props;

    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <button onClick={onClose} className={styles.modalClose}>
            ✕
          </button>
          <h2 className={styles.modalTitle}>{title}</h2>
          <div className={styles.modalBody}>{children}</div>
        </div>
      </div>,
      document.body
    );
  }
}

export default Modal;