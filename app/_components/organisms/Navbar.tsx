import Link from "next/link";
import { Atom } from "../atoms";
import { createClient } from "@/app/_utils/supabase/server";

export default async function Navbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="bg-base-100 px-4">
      <div className="navbar max-w-[1280px] mx-auto">
        <div className="navbar-start">
          <Link href={"/"}>
            <p className="text-xl font-bold">Stanzalyze</p>
          </Link>
        </div>

        <div className="navbar-end">
          {!user && (
            <Link href={"/sign-in"} className="btn">
              <span>
                <Atom.DoorIcon />
              </span>
              Sign-In
            </Link>
          )}
          {user && (
            <Link href={"/dashboard/user"} className="btn">
              <span>
                <Atom.PersonIcon />
              </span>
              My Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
