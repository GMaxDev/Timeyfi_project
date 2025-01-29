import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Notifications({className=""}) {
  return (
    <div className={`relative flex m-2 border-2 rounded-full justify-center items-center ${className}`}>
      <BellIcon className="size-5" />
    </div>
  );
}
