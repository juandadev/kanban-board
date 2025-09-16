"use client";

import React from "react";
import { createPortal } from "react-dom";
import { ModalType, useModal } from "@/context/modalContext";

type ModalProps = {
  children: React.ReactNode;
  type: ModalType;
};

export function Modal({ children, type }: ModalProps) {
  const { activeModal } = useModal();

  if (activeModal !== type) return null;

  return createPortal(
    <div>
      <div>{children}</div>
    </div>,
    document.querySelector(".modal") as Element,
  );
}
