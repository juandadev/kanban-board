import React from "react";
import { ModalType } from "@/context/ModalContext";

export type ModalProps = {
  children: React.ReactNode;
  type: ModalType;
};