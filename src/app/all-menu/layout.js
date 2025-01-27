import Link from "next/link";
import Image from "next/image";

import SearchTaskBar from "@/app/components/search-task-bar";
import ExportSummary from "../components/export-summary";
import History from "../components/history";
import Notifications from "../components/notifications";
import Profile from "../components/profile";

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
        <nav className="grid grid-cols-[50%_20%_10%_10%_10%] basis-5/6 bg-white rounded-2xl">
          <SearchTaskBar />
          <ExportSummary />
          <History />
          <Notifications />
          <Profile />
        </nav>
      </header>
      <aside className="basis-1/6 bg-green-500">
        <ul>
          <li>
            <Link href="/all-menu/dashboard">dashboard</Link>
          </li>
          <li>
            <Link href="/all-menu/list">list</Link>
          </li>
          <li>
            <Link href="/all-menu/calendar">calendar</Link>
          </li>
          <li>
            <Link href="/all-menu/messages">messages</Link>
          </li>
        </ul>
      </aside>
      <main className="basis-5/6 bg-red-500">{children}</main>
    </div>
  );
}
