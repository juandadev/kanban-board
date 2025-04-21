import { Button } from "@/components/shared/Button/Button";
import styles from "./AddBoardColumns.module.css";
import React from "react";
import { AddBoardItem } from "@/components/shared/AddNewBoardModal/subcomponents/BoardColumns/AddBoardItem";
import { Control, useFieldArray } from "react-hook-form";
import { NewBoardValues } from "@/components/shared/AddNewBoardModal/AddNewBoardModal";
import { v4 as uuidv4 } from "uuid";

const columnWords = [
  "Todo",
  "Doing",
  "Done",
  "Backlog",
  "In Progress",
  "Review",
  "Blocked",
  "Testing",
  "Ready",
  "Deployed",
  "Planning",
  "Research",
  "Design",
  "Development",
  "QA",
  "Staging",
  "Production",
  "Awaiting Feedback",
  "On Hold",
  "Completed",
];

interface AddBoardColumnsProps {
  control: Control<NewBoardValues>;
}

export function AddBoardColumns({ control }: AddBoardColumnsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const handleAddColumn = () => {
    append({ id: uuidv4(), name: "" });
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>Board Columns</span>
      {fields.map((column, index) => (
        <AddBoardItem
          key={column.id}
          id={column.id}
          placeholder={columnWords[index]}
          index={index}
          control={control}
          remove={remove}
        />
      ))}
      <Button
        type={"button"}
        variant={"secondary"}
        size={"small"}
        onClick={handleAddColumn}
      >
        + Add New Column
      </Button>
    </div>
  );
}
