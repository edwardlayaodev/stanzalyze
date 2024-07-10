import { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  buttonType: "btn-primary" | "btn-secondary" | "btn-neutral" | "btn-ghost";
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  htmlType?: "submit" | "reset" | "button";
}

export default function Button({
  children,
  buttonType,
  loading,
  onClick,
  htmlType = "submit",
}: Props) {
  return (
    <button
      onClick={onClick}
      type={htmlType}
      className={`btn ${buttonType}`}
      disabled={loading}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
