"use client";

import React from "react";
import { useActiveBoard } from "@/hooks/useActiveBoard";
import { useModal } from "@/context/modalContext";
import { EditBoardModal } from "@/components/EditBoardModal/EditBoardModal";
import { Button } from "@/components/ui/button";

export function Board() {
  const { board, columns } = useActiveBoard();
  const { openModal } = useModal();

  const renderColumns = columns.map((column) => (
    <div key={column.id}>{column.name}</div>
  ));

  if (!board) {
    return (
      <section>
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
      <section>
        <div>
          {columns.length === 0 ? (
            <>
              <p>This board is empty. Create a new column to get started.</p>
              <Button onClick={() => openModal("editBoard")}>
                Add new Column
              </Button>
            </>
          ) : (
            renderColumns
          )}
        </div>
      </section>
      <EditBoardModal />
    </>
  );
}
