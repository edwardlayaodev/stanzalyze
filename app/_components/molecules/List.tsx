"use client";
import Link from "next/link";
import { Atom } from "../atoms";

interface Props {
  data: any;
  header: string;
}

export default function List({ data, header }: Props) {
  return (
    <>
      <h1 className="text-5xl font-bold text-center">{header}</h1>
      <ul className="text-left flex flex-col gap-8">
        {data.map((item: any) => {
          return (
            <Link key={item.id} href={`/dashboard/poetry/${item.id}`}>
              <Atom.ListItem title={item.title} description={item.prompt} />
            </Link>
          );
        })}
      </ul>
    </>
  );
}
