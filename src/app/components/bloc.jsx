export default function Bloc({
  blocSizeX = 1,
  blocSizeY = 1,
  posUnitX = 0,
  posUnitY = 0,
}) {
  return (
    <div
      style={{
        gridColumn: `${posUnitX + 1} / span ${blocSizeX}`,
        gridRow: `${posUnitY + 1} / span ${blocSizeY}`,
      }}
      className="bg-slate-600 p-1 rounded-3xl z-0"
    >
      <div className="bg-slate-100 rounded-3xl w-full h-full p-3">
        <h2>test test bloc page test test</h2>
      </div>
    </div>
  );
}
