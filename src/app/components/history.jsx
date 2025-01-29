import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function History({className=""}) {
  return (
    <div className={`relative flex border-2 rounded-full justify-center items-center ${className}`}>
      <ClockIcon className="size-6" />
    </div>
  );
}
