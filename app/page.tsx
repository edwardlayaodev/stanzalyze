import { Atom } from "./_components/atoms";
import Link from "next/link";
import { createClient } from "./_utils/supabase/server";
import axios from "axios";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // on mount check if user is authenticated

  return (
    <Atom.Hero>
      <div>
        {user && (
          <form method="POST" action="/auth/logout">
            <div>
              <h1 className="text-5xl mb-4">{user.email} is Logged In!</h1>

              <Atom.Button buttonType={"btn-primary"}>Logout</Atom.Button>
            </div>
          </form>
        )}

        {!user && (
          <div>
            <h1 className="text-5xl mb-4">Please Log-In</h1>
            <Link href={"/sign-in"}>
              <Atom.Button buttonType={"btn-primary"}>Login</Atom.Button>
            </Link>
          </div>
        )}
      </div>
    </Atom.Hero>
  );
}
