import { useEffect, useRef, type ReactNode } from 'react';
import './Modal.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** id of the heading inside the dialog that names it */
  labelledBy: string;
  size?: 'slim' | 'wide';
  children: ReactNode;
}

/**
 * Modal shell on the native <dialog> element. showModal() gives a focus trap,
 * an inert background and Escape-to-close; closing returns focus to the
 * element that opened it. Content stays mounted while closed, so a visitor who
 * closes a half-filled form by accident gets it back when they reopen it.
 */
function Modal({ isOpen, onClose, labelledBy, size = 'wide', children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      // Start on the first field rather than the close button.
      dialog.querySelector<HTMLElement>('input, textarea, select')?.focus();
    }
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function handleCancel(e: React.SyntheticEvent<HTMLDialogElement>) {
    // Escape: let React state drive closing so the parent stays in sync.
    e.preventDefault();
    onClose();
  }

  function handleClick(e: React.MouseEvent<HTMLDialogElement>) {
    // A click on the dialog element itself (not its content) is a backdrop click.
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <dialog
      ref={ref}
      className={`modal modal--${size}`}
      aria-labelledby={labelledBy}
      onCancel={handleCancel}
      onClick={handleClick}
    >
      <div className="modal__body">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
