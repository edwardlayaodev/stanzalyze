import Link from "next/link";
import { Atom } from "../atoms";

export default function Navbar() {
  return (
    <nav className="bg-base-100">
      <div className="navbar max-w-[1280px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <Link href={"/"}>
            <p className="text-xl font-bold">Stanzalyze</p>
          </Link>
        </div>

        <div className="navbar-end">
          <Link href={"/sign-in"} className="btn">
            <span>
              <Atom.DoorIcon />
            </span>
            Sign-In
          </Link>
        </div>
      </div>
    </nav>
  );
}
