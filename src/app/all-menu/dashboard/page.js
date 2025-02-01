import Bloc from "@/app/components/bloc";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-4 gap-2 grid-rows-6 h-">
      <Bloc posUnitX={0} posUnitY={0} blocSizeX={1} blocSizeY={2}/>
      <Bloc posUnitX={2} posUnitY={0} blocSizeX={1} blocSizeY={1}/>
      <Bloc posUnitX={3} posUnitY={0} blocSizeX={1} blocSizeY={2}/>
      <Bloc posUnitX={1} posUnitY={1} blocSizeX={2} blocSizeY={1}/>
    </div>
  );
}
