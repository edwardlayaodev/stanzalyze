interface Props {
  title: string;
  description: string;
}

export default function ListItem({ title, description }: Props) {
  return (
    <li>
      <p className="text-xl font-bold">{title}</p>
      {description}
    </li>
  );
}
