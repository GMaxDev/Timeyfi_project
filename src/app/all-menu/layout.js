import Link from "next/link";
import Image from "next/image";
import { HomeIcon } from "@heroicons/react/24/outline";

import SearchTaskBar from "@/app/components/search-task-bar";
import ExportSummary from "../components/export-summary";
import History from "../components/history";
import Notifications from "../components/notifications";
import Profile from "../components/profile";
import Section from "../components/section";

export default function AllMenuLayout({ children }) {
  return (
    <div className="flex flex-wrap">
      <header className="w-full p-2 flex items-center">
        <Image
          src="/img/timeyfi-logo.webp"
          alt="Logo de l'application Timeyfi"
          width={193}
          height={47}
          priority
          className="basis-1/6 max-h-12 object-contain"
        />
        <nav className="flex basis-5/6 bg-white rounded-2xl p-2 gap-2">
          <SearchTaskBar className="w-full" />
          <ExportSummary className="min-w-52" />
          <History className="min-w-12" />
          <Notifications className="min-w-12" />
          <Profile className="min-w-12" />
        </nav>
      </header>
      <aside className="basis-1/6 bg-white rounded-2xl p-4">
        <ul className="flex flex-col gap-y-6">
          <li>
            <Section
              icon="Dashboard"
              link="/all-menu/dashboard"
              name="Dashboard"
            />
          </li>
          <li>
            <Section icon="ClipboardIcon" link="/all-menu/list" name="List" />
          </li>
          <li>
            <Section
              icon="CalendarIcon"
              link="/all-menu/calendar"
              name="Calendar"
            />
          </li>
          <li>
            <Section
              icon="EnvelopeIcon"
              link="/all-menu/messages"
              name="Messages"
            />
          </li>
        </ul>
      </aside>
      <main className="basis-5/6 bg-red-500">{children}</main>
    </div>
  );
}
