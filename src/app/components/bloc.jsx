"use client";

import { useRef, useEffect } from "react";

// Fonction utilitaire pour appliquer les contraintes de valeur
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function Bloc({
  id,
  blocSizeX = 1,
  blocSizeY = 1,
  posUnitX = 0,
  posUnitY = 0,
  cellSize,       // { width, height } passé depuis le Dashboard
  updatePosition, // fonction pour le drag
  updateSize,     // fonction pour le resize
  forceUpdate,    // propriété pour forcer le re-render en cas de collision
}) {
  const blocRef = useRef(null);
  const dragStartRef = useRef(null);
  const resizeStartRef = useRef(null);

  // Synchronisation du style avec le state, on ajoute forceUpdate dans les dépendances
  useEffect(() => {
    if (blocRef.current) {
      blocRef.current.style.gridColumn = `${posUnitX + 1} / span ${blocSizeX}`;
      blocRef.current.style.gridRow = `${posUnitY + 1} / span ${blocSizeY}`;
    }
  }, [posUnitX, posUnitY, blocSizeX, blocSizeY, forceUpdate]);

  // ------------------------
  // GESTION DU DRAG
  // ------------------------
  const handleMouseDown = (e) => {
    e.preventDefault();
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initPosX: posUnitX,
      initPosY: posUnitY,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!dragStartRef.current || !cellSize.width || !cellSize.height) return;
    const offsetX = e.clientX - dragStartRef.current.mouseX;
    const offsetY = e.clientY - dragStartRef.current.mouseY;
    const offsetCellsX = Math.round(offsetX / cellSize.width);
    const offsetCellsY = Math.round(offsetY / cellSize.height);
    let newPosUnitX = dragStartRef.current.initPosX + offsetCellsX;
    let newPosUnitY = dragStartRef.current.initPosY + offsetCellsY;
    // Limiter pour rester dans la grille (6 colonnes et 6 lignes)
    newPosUnitX = clamp(newPosUnitX, 0, 6 - blocSizeX);
    newPosUnitY = clamp(newPosUnitY, 0, 6 - blocSizeY);
    if (blocRef.current) {
      blocRef.current.style.gridColumn = `${newPosUnitX + 1} / span ${blocSizeX}`;
      blocRef.current.style.gridRow = `${newPosUnitY + 1} / span ${blocSizeY}`;
    }
  };

  const handleMouseUp = (e) => {
    if (!dragStartRef.current || !cellSize.width || !cellSize.height) return;
    const offsetX = e.clientX - dragStartRef.current.mouseX;
    const offsetY = e.clientY - dragStartRef.current.mouseY;
    const offsetCellsX = Math.round(offsetX / cellSize.width);
    const offsetCellsY = Math.round(offsetY / cellSize.height);
    let newPosUnitX = dragStartRef.current.initPosX + offsetCellsX;
    let newPosUnitY = dragStartRef.current.initPosY + offsetCellsY;
    newPosUnitX = clamp(newPosUnitX, 0, 6 - blocSizeX);
    newPosUnitY = clamp(newPosUnitY, 0, 6 - blocSizeY);
    updatePosition(id, newPosUnitX, newPosUnitY);
    dragStartRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // ------------------------
  // GESTION DU RESIZE
  // ------------------------
  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initSizeX: blocSizeX,
      initSizeY: blocSizeY,
    };
    document.addEventListener("mousemove", handleResizeMouseMove);
    document.addEventListener("mouseup", handleResizeMouseUp);
  };

  const handleResizeMouseMove = (e) => {
    if (!resizeStartRef.current || !cellSize.width || !cellSize.height) return;
    const offsetX = e.clientX - resizeStartRef.current.mouseX;
    const offsetY = e.clientY - resizeStartRef.current.mouseY;
    const offsetCellsX = Math.round(offsetX / cellSize.width);
    const offsetCellsY = Math.round(offsetY / cellSize.height);
    let newSizeX = resizeStartRef.current.initSizeX + offsetCellsX;
    let newSizeY = resizeStartRef.current.initSizeY + offsetCellsY;
    newSizeX = clamp(newSizeX, 1, Math.min(2, 6 - posUnitX));
    newSizeY = clamp(newSizeY, 1, Math.min(3, 6 - posUnitY));
    if (blocRef.current) {
      blocRef.current.style.gridColumn = `${posUnitX + 1} / span ${newSizeX}`;
      blocRef.current.style.gridRow = `${posUnitY + 1} / span ${newSizeY}`;
    }
  };

  const handleResizeMouseUp = (e) => {
    if (!resizeStartRef.current || !cellSize.width || !cellSize.height) return;
    const offsetX = e.clientX - resizeStartRef.current.mouseX;
    const offsetY = e.clientY - resizeStartRef.current.mouseY;
    const offsetCellsX = Math.round(offsetX / cellSize.width);
    const offsetCellsY = Math.round(offsetY / cellSize.height);
    let newSizeX = resizeStartRef.current.initSizeX + offsetCellsX;
    let newSizeY = resizeStartRef.current.initSizeY + offsetCellsY;
    newSizeX = clamp(newSizeX, 1, Math.min(2, 6 - posUnitX));
    newSizeY = clamp(newSizeY, 1, Math.min(3, 6 - posUnitY));
    updateSize(id, newSizeX, newSizeY);
    resizeStartRef.current = null;
    document.removeEventListener("mousemove", handleResizeMouseMove);
    document.removeEventListener("mouseup", handleResizeMouseUp);
  };

  return (
    <div
      ref={blocRef}
      onMouseDown={handleMouseDown}
      style={{
        gridColumn: `${posUnitX + 1} / span ${blocSizeX}`,
        gridRow: `${posUnitY + 1} / span ${blocSizeY}`,
        cursor: "grab",
        position: "relative",
      }}
      className="bg-slate-600 p-1 rounded-3xl z-0"
    >
      <div className="bg-slate-100 rounded-3xl w-full h-full p-3 select-none">
        <h2>test test bloc page test test</h2>
      </div>
      <div
        onMouseDown={handleResizeMouseDown}
        style={{
          width: "16px",
          height: "16px",
          background: "gray",
          position: "absolute",
          bottom: "4px",
          right: "4px",
          cursor: "se-resize",
          borderRadius: "4px",
        }}
      />
    </div>
  );
}
