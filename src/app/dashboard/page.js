import Image from "next/image";
import SearchTaskBar from "@/app/components/search-task-bar"
import ExportSummary from "../components/export-summary";
import History from "../components/history";
import Notifications from "../components/notifications";
import Profile from "../components/profile";

export default function Dashboard() {
  return (
    <>
      <SearchTaskBar />
      <ExportSummary />
      <History />
      <Notifications />
      <Profile />
    </>
  );
}
