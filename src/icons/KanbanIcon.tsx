import { IconProps } from "@/types";

export default function KanbanIcon({ size, ...props }: IconProps) {
  return (
    <svg
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={6} height={25} rx={2} fill="#635FC7" />
      <rect opacity={0.75} x={9} width={6} height={25} rx={2} fill="#635FC7" />
      <rect opacity={0.5} x={18} width={6} height={25} rx={2} fill="#635FC7" />
    </svg>
  );
}
