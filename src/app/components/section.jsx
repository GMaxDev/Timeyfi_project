"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "@heroicons/react/24/outline";

export default function Section({ icon, link, name }) {
  const pathName = usePathname()
  const isActive = pathName === link
  const IconComponent = Icons[icon] || Icons.HomeIcon

  return (
    <div>
      <Link href={link} className={`flex gap-2 ${isActive ? "text-teal-600" : ""}`}>
        <IconComponent className="size-6" />
        <span>{name}</span>
      </Link>
    </div>
  );
}
