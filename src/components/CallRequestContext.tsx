import { createContext, useContext, useState, type ReactNode } from 'react';
import Modal from './Modal';
import CallRequestForm from './CallRequestForm';

const CallRequestContext = createContext<() => void>(() => {});

/** Opens the "Request a Call" dialog. Available anywhere inside CallRequestProvider. */
export function useCallRequest() {
  return useContext(CallRequestContext);
}

/** Owns the single site-wide "Request a Call" dialog so the header and page CTAs share it. */
export function CallRequestProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  // Bumped after a successful send so the next opening starts with a fresh form.
  const [formKey, setFormKey] = useState(0);
  const close = () => setIsOpen(false);
  const finish = () => {
    setIsOpen(false);
    setFormKey(k => k + 1);
  };

  return (
    <CallRequestContext.Provider value={() => setIsOpen(true)}>
      {children}
      <Modal isOpen={isOpen} onClose={close} labelledBy="call-title" size="slim">
        <CallRequestForm key={formKey} headingId="call-title" onDone={finish} />
      </Modal>
    </CallRequestContext.Provider>
  );
}
