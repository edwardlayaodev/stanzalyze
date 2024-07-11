import { Atom } from "@/app/_components/atoms";

export default function UserDashboard() {
  return (
    <Atom.Hero>
      Hello World
      <form method="post" action={"/auth/logout"}>
        <button type="submit">logout</button>
      </form>
    </Atom.Hero>
  );
}
