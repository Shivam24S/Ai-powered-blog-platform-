import React from "react";
import ReactDOM from "react-dom";

// const ModalOverlay = ({ show, onCancel, header, children, footer }) => {
//   if (!show) return null;

//   return ReactDOM.createPortal(
//     <>
//       <div
//         className="fixed inset-0 bg-black/50 z-[9998]"
//         onClick={onCancel}
//       ></div>

//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div className="modal-box w-full max-w-md bg-base-100 shadow-xl relative animate-fade-in">
//           <button
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={onCancel}
//           >
//             ✕
//           </button>

//           {header && <h3 className="font-bold text-lg">{header}</h3>}

//           <div className="py-4">{children}</div>

//           {footer && (
//             <div className="modal-action flex justify-end">{footer}</div>
//           )}
//         </div>
//       </div>
//     </>,
//     document.getElementById("modal-root")
//   );
// };

const ModalOverlay = ({ show, onCancel, header, children, footer }) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onCancel} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <button onClick={onCancel} className="absolute top-2 right-2">
            ✕
          </button>
          {header && <h3 className="text-xl font-bold mb-4">{header}</h3>}
          <div className="mb-4">{children}</div>
          {footer && <div className="flex justify-end gap-2">{footer}</div>}
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
