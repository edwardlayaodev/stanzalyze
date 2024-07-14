"use client";
import Link from "next/link";
import { Atom } from "../atoms";

interface Props {
  items: any;
  header: string;
}

export default function List({ items, header }: Props) {
  return (
    <>
      <h1 className="text-5xl font-bold text-center">{header}</h1>
      <ul className="text-left flex flex-col gap-8">
        {items.map((item: any) => {
          return (
            <Atom.Collapse
              id={item.id}
              key={item.id}
              title={item.title}
              description={item.prompt}
              content={item.result}
            />
          );
        })}
      </ul>
    </>
  );
}
