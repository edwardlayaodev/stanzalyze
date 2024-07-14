import { Molecule } from "../molecules";

interface Props {
  data: any;
}

export default function SavedPoetry({ data }: Props) {
  return (
    <>
      <div>
        <Molecule.List header="Saved Poetry" items={data} />
      </div>
    </>
  );
}
