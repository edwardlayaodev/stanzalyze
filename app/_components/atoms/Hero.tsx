import { Children } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Hero({ children }: Props) {
  return (
    <section className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">{children}</div>
    </section>
  );
}
