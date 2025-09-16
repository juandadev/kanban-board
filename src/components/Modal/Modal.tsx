"use client";

import React from "react";
import { ModalType, useModal } from "@/context/modalContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type ModalProps = {
  children: React.ReactNode;
  type: ModalType;
};

export function Modal({ children, type }: ModalProps) {
  const { activeModal, closeModal } = useModal();

  return (
    <Dialog open={activeModal === type} onOpenChange={closeModal}>
      <DialogContent className="gap-6">{children}</DialogContent>
    </Dialog>
  );
}
