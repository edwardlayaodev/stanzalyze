import Link from "next/link";
import { Atom } from "../atoms";

export default function Navbar() {
  return (
    <nav className="bg-base-100 px-4">
      <div className="navbar max-w-[1280px] mx-auto">
        <div className="navbar-start">
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
