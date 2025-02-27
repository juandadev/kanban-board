import React, { createContext, useContext, useState, ReactNode } from "react";

export type ModalType = "editBoard" | null;

type ModalContextType = {
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  activeModal: ModalType;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (modalType: ModalType) => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
}
