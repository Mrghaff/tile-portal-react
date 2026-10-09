import { useEffect, useRef } from "react";

export default function Modal({ title, onClose, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector(".modal-body").scrollTop = 0;
  }, [title]);

  return (
    <dialog
      aria-labelledby="modal-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      ref={dialogRef}
    >
      <div className="modal-head">
        <h2 id="modal-title">{title}</h2>
        <button aria-label="بستن" className="close" onClick={onClose} type="button">×</button>
      </div>
      <div className="modal-body">{children}</div>
    </dialog>
  );
}
