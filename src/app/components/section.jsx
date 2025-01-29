import Link from "next/link";
import * as Icons from "@heroicons/react/24/outline";

export default function Section({ icon, link, name }) {
  const IconComponent = Icons[icon] || Icons.HomeIcon
  return (
    <div>
      <Link href={link} className="flex gap-2">
        <IconComponent className="size-6" />
        <span>{name}</span>
      </Link>
    </div>
  );
}
