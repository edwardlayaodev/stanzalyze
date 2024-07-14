"use client";
import { useState } from "react";

interface Props {
  title: string;
  description: string;
  content: string;
  id: string;
}

export default function Collapse({ title, description, content, id }: Props) {
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen((prev) => !prev);
  }
  return (
    <>
      <div
        onClick={handleClick}
        className="relative collapse collapse-arrow join-item border-base-300 border"
      >
        <input
          // react is
          onChange={() => {}}
          type="radio"
          name={`accordion-${id}`}
          checked={open}
        />
        <div className="collapse-title text-xl font-medium">
          <p className="text-2xl font-bold">{title}</p>
          <p className="mt-6 md:mt-0">
            <span className="font-bold">PROMPT: </span> {description}
          </p>
        </div>
        <div className="collapse-content">
          <p className="cursor-pointer">
            <span className="font-bold">ANALYSIS: </span> {content}
          </p>
        </div>
      </div>
    </>
  );
}
