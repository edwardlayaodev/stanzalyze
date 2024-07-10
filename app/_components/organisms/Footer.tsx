import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 text-base-content p-4">
      <aside>
        <p>
          Copyright &copy; {new Date().getFullYear()} - Made by Edward Layao
        </p>
        <Link href={"https://edward-layao-dev-portfolio.vercel.app/"}>
          Check out my portfolio @
          https://edward-layao-dev-portfolio.vercel.app/
        </Link>
      </aside>
    </footer>
  );
}
