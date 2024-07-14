interface Props {
  title: string;
  description: string;
  id: string;
}

export default function ListItem({ title, description, id }: Props) {
  return (
    <li key={id}>
      <p className="text-2xl font-bold">{title}</p>
      {description}
    </li>
  );
}
