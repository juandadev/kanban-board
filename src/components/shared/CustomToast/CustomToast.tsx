import React from "react";
import styles from "./CustomToast.module.css";
import { toast } from "react-toastify";
import { GenericResponse } from "@/types/services";

interface CustomToastProps {
  children: React.ReactNode;
  variant: "loading" | "success" | "error";
}

function CustomToast({ children, variant }: CustomToastProps) {
  return (
    <div className={styles.toast_container}>
      <span className={styles.toast_icon} data-variant={variant} />
      <p>{children}</p>
    </div>
  );
}

function Promise<T>({ promise }: { promise: Promise<T> }): Promise<T> {
  return toast.promise(
    promise,
    {
      pending: {
        render() {
          return (
            <CustomToast variant={"loading"}>Loading boards...</CustomToast>
          );
        },
      },
      success: {
        render({ data }) {
          return (
            <CustomToast variant={"success"}>
              {(data as GenericResponse<any>).message}
            </CustomToast>
          );
        },
      },
      error: {
        render({ data }) {
          return (
            <CustomToast variant={"error"}>
              {(data as GenericResponse<any>).message}
            </CustomToast>
          );
        },
      },
    },
    {
      autoClose: 2000,
      closeButton: false,
      hideProgressBar: true,
      icon: false,
      className: "",
      style: {
        background: "transparent",
        boxShadow: "none",
        padding: 0,
      },
    },
  );
}

CustomToast.Promise = Promise;

export default CustomToast;
