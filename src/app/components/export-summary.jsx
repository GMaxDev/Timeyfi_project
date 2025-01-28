import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";
import { ChevronDownIcon, ArrowUpTrayIcon } from "@heroicons/react/20/solid";

export default function ExportSummary() {
  return (
    <Popover className="relative flex m-2 border-2 rounded-2xl items-center px-4 ">
      <PopoverButton className="relative flex justify-between w-full focus:outline-none data-[active]:text-blue-500">
      <ArrowUpTrayIcon className="size-5 transition-transform duration-200 ease-in-out data-[open]:rotate-180" />
        Export Summary
        <ChevronDownIcon className="size-5 transition-transform duration-200 ease-in-out data-[open]:rotate-180" />
      </PopoverButton>
      <PopoverPanel
        transition
        className="absolute left-0 top-14 min-w-full w-auto bg-white shadow-md rounded-lg p-2 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <Link
          className="block px-4 py-2 hover:bg-gray-100 rounded-md text-left"
          href="/tasks"
        >
          Tasks
        </Link>
        <Link
          className="block px-4 py-2 hover:bg-gray-100 rounded-md text-left"
          href="/goals"
        >
          Goals
        </Link>
      </PopoverPanel>
    </Popover>
  );
}
