interface Props {
  children: React.ReactNode;
  buttonType: "btn-primary" | "btn-secondary" | "btn-neutral" | "btn-ghost";
  loading: boolean;
  onClick?: Function;
}

export default function Button({ children, buttonType, loading }: Props) {
  return (
    <button type="submit" className={`btn ${buttonType}`} disabled={loading}>
      {loading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
