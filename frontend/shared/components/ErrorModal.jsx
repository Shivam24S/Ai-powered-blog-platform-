// ErrorModal.jsx
const ErrorModal = ({ error, onClear }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box bg-error text-white">
        <h3 className="font-bold text-lg">An Error Occurred</h3>
        <p className="py-4">{error}</p>
        <div className="modal-action">
          <button className="btn btn-sm btn-neutral" onClick={onClear}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
