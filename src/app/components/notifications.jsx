import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function Notifications({className=""}) {
  return (
    <Popover
      className={`relative flex border-2 rounded-full justify-center items-center ${className}`}
    >
      <PopoverButton className="relative flex justify-between focus:outline-none data-[active]:text-teal-600">
        <BellIcon className="size-6" />
      </PopoverButton>
      <PopoverPanel
        transition
        className="absolute -right-20 top-14 min-w-full w-96 bg-white shadow-md rounded-lg p-2 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <div
          className="block px-4 py-2 hover:bg-gray-100 rounded-md text-left"
          href="/tasks"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio, sequi.
        </div>
        <div
          className="block px-4 py-2 hover:bg-gray-100 rounded-md text-left"
          href="/goals"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, reprehenderit!
        </div>
      </PopoverPanel>
    </Popover>
  );
}
