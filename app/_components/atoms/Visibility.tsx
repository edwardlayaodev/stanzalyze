interface Props {
  children: React.ReactNode;
  state: boolean;
}

export default function Visibility({ children, state }: Props) {
  return state && children;
}
