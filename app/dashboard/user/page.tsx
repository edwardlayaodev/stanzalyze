import { Atom } from "@/app/_components/atoms";
import { Molecule } from "@/app/_components/molecules";
import List from "@/app/_components/molecules/List";
import { Organism } from "@/app/_components/organisms";
import { createClient } from "@/app/_utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UserDashboard() {
  let poetryData;
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }
  try {
    const res = await supabase
      .from("Poetry")
      .select("*")
      .eq("user_id", user.id);
    if (res.error) {
      throw res.error;
    }
    poetryData = res.data;
  } catch (error) {
    console.log(error);
  }

  return (
    <section className=" bg-base-200 min-h-screen flex flex-col gap-8 justify-start items-end px-2 md:px-32 py-12 md:py-32">
      <form className="" method="post" action={"/auth/logout"}>
        <Atom.Button buttonType="btn-primary">
          <Atom.DoorIcon />
          Logout
        </Atom.Button>
      </form>
      <Organism.SavedPoetry data={poetryData} />
    </section>
  );
}
