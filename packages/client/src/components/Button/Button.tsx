import React from "react";
import styles from "./Button.module.css";

interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "primary" | "secondary" | "danger" | "success";
  testId?: string;
  disabled?: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  type = "primary",
  testId = "button",
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      data-testid={testId}
      className={`${styles.root} ${styles[type]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
