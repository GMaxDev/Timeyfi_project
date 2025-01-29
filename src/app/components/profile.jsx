import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Profile({className=""}) {
  return (
    <div className={`relative flex border-2 rounded-full justify-center items-center ${className}`}>
      <UserCircleIcon className="size-6" />
    </div>
  );
}
