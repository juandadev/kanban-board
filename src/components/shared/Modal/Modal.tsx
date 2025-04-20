"use client";

import React from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useModal } from "@/context/ModalContext";
import { ModalProps } from "@/types/modal";

export function Modal({ children, type }: ModalProps) {
  const { activeModal } = useModal();

  if (activeModal !== type) return null;

  return createPortal(
    <div className={styles.modal_overlay}>
      <div className={styles.modal_container}>{children}</div>
    </div>,
    document.querySelector(".modal") as Element,
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.modal_title_container}>
      <h2 className={styles.modal_title}>{children}</h2>
    </div>
  );
}

export function Body({ children }: { children: React.ReactNode }) {
  return <div className={styles.modal_body_container}>{children}</div>;
}

export function Footer({ children }: { children: React.ReactNode }) {
  return <div className={styles.modal_footer_container}>{children}</div>;
}

Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
