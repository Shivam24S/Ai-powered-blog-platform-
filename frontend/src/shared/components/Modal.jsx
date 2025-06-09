import React from "react";
import ReactDOM from "react-dom";

const ModalOverlay = ({ show, onCancel, header, children, footer }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/60 z-40"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-md bg-base-100 text-base-content p-6 rounded-xl shadow-2xl animate-fade-in"
          onClick={(e) => e.stopPropagation()} // prevent clicks inside from closing modal
        >
          <button
            onClick={onCancel}
            className="btn btn-sm btn-circle absolute top-2 right-2"
            aria-label="Close Modal"
          >
            ✕
          </button>

          {header && <h3 className="text-xl font-semibold mb-4">{header}</h3>}

          <div className="mb-4">{children}</div>

          {footer && <div className="flex justify-end gap-3">{footer}</div>}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

const Modal = ({ show, onCancel, header, children, footer }) => {
  return (
    <ModalOverlay
      show={show}
      onCancel={onCancel}
      header={header}
      footer={footer}
    >
      {children}
    </ModalOverlay>
  );
};

export default Modal;
