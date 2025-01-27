import { Search } from "lucide-react";

export default function SearchTaskBar() {
  return (
    <div className="flex max-w-full m-2 border-style border-2 rounded-2xl h-12 items-center pl-4">
      <Search className="text-gray-400" />
      <input
        type="search"
        placeholder="Chercher une tâche"
        className="w-full focus:outline-none"
      />
    </div>
  );
}
