import { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  buttonType: "btn-primary" | "btn-secondary" | "btn-neutral" | "btn-ghost";
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  htmlType?: "submit" | "reset" | "button";
  disabled?: boolean;
}

export default function Button({
  children,
  buttonType,
  loading,
  onClick,
  disabled = false,
  htmlType = "submit",
}: Props) {
  return (
    <button
      onClick={onClick}
      type={htmlType}
      className={`btn ${buttonType}`}
      disabled={disabled}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
