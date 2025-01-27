import Link from "next/link";

export default function SideMenuLayout({ children }) {
  return (
    <div>
      <aside>
        <ul>
          <li>
            <Link href="/side-menu/dashboard">dashboard</Link>
          </li>
          <li>
            <Link href="/side-menu/list">list</Link>
          </li>
          <li>
            <Link href="/side-menu/calendar">calendar</Link>
          </li>
          <main>{children}</main>
        </ul>
      </aside>
    </div>
  );
}
