export default function Bloc({
  blocSizeX = 1,
  blocSizeY = 1,
  posUnitX = 1,
  posUnitY = 1,
}) {
  const initialWidth = 339;
  const initialHeight = 339;
  const initialPosX = 0;
  const initialPosY = 0;

  let finalWidth = initialWidth * blocSizeX;
  let finalHeight = initialHeight * blocSizeY;
  let finalPosX = (initialPosX + posUnitX) * initialWidth
  let finalPosY = (initialPosY + posUnitY) * initialHeight

  console.log("Size X : " + finalWidth);
  console.log("Size Y : " + finalHeight);
  console.log("Pos X : " + finalPosX);
  console.log("Pos Y : " + finalPosY);

  return (
    <div
      style={{
        width: `${finalWidth}px`,
        height: `${finalHeight}px`,
        left: `${finalPosX}px`,
        top: `${finalPosY}px`,
        position: "absolute",
      }}
      className="bg-slate-600 p-10 rounded-3xl"
    >
      <h1>test test bloc page test test</h1>
    </div>
  );
}
