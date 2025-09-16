"use client";

import React from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { useModal } from "@/context/modalContext";
import { EditBoardModal } from "@/components/EditBoardModal/EditBoardModal";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export function Board() {
  const { board, columns } = useActiveBoard();
  const { openModal } = useModal();

  const renderColumns = columns.map((column) => (
    <div key={column.id}>{column.name}</div>
  ));

  const handleEditColumnModal = () => {
    openModal("editBoard");
  };

  if (!board) {
    return (
      <section className="h-full">
        <div>
          <p>
            There is no selected board. Select one from the menu or create a new
            one
          </p>
          <Button>Create New Board</Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="h-[calc(100dvh-68px)] flex items-center justify-center px-4 py-6">
        <div>
          {columns.length === 0 ? (
            <div className="flex flex-col items-center gap-6">
              <p className="font-bold text-lg text-center">
                This board is empty. Create a new column to get started.
              </p>
              <Button className="w-fit" onClick={handleEditColumnModal}>
                <PlusIcon />
                Add new Column
              </Button>
            </div>
          ) : (
            renderColumns
          )}
        </div>
      </section>
      <EditBoardModal />
    </>
  );
}
