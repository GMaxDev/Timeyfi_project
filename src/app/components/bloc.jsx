"use client";

import { useRef } from "react";

// Fonction utilitaire pour appliquer les contraintes de taille
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export default function Bloc({
  id,
  blocSizeX = 1,
  blocSizeY = 1,
  posUnitX = 0,
  posUnitY = 0,
  cellSize,       // { width, height } passé depuis le Dashboard
  updatePosition, // fonction pour mettre à jour la position (drag)
  updateSize,     // fonction pour mettre à jour la taille (resize)
}) {
  // Référence vers l'élément DOM du bloc
  const blocRef = useRef(null);
  // Référence pour stocker la position de départ du drag
  const dragStartRef = useRef(null);
  // Référence pour stocker la position de départ du resize
  const resizeStartRef = useRef(null);

  // ------------------------
  // GESTION DU DRAG (déjà en place)
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
    const newPosUnitX = dragStartRef.current.initPosX + offsetCellsX;
    const newPosUnitY = dragStartRef.current.initPosY + offsetCellsY;
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
    const newPosUnitX = dragStartRef.current.initPosX + offsetCellsX;
    const newPosUnitY = dragStartRef.current.initPosY + offsetCellsY;
    updatePosition(id, newPosUnitX, newPosUnitY);
    dragStartRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  // ------------------------
  // GESTION DU RESIZE
  // ------------------------
  const handleResizeMouseDown = (e) => {
    // On ne veut pas déclencher le drag en même temps que le resize
    e.stopPropagation();
    e.preventDefault();
    // Stocker les infos de départ pour le resize
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
    // Calcul de l'offset par rapport au point de départ
    const offsetX = e.clientX - resizeStartRef.current.mouseX;
    const offsetY = e.clientY - resizeStartRef.current.mouseY;
    // Conversion de l'offset en nombre de cellules
    const offsetCellsX = Math.round(offsetX / cellSize.width);
    const offsetCellsY = Math.round(offsetY / cellSize.height);
    // Calcul de la nouvelle taille avec contraintes (min=1, max=2)
    const newSizeX = clamp(resizeStartRef.current.initSizeX + offsetCellsX, 1, 2);
    const newSizeY = clamp(resizeStartRef.current.initSizeY + offsetCellsY, 1, 2);
    // Mise à jour visuelle du bloc
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
    const newSizeX = clamp(resizeStartRef.current.initSizeX + offsetCellsX, 1, 2);
    const newSizeY = clamp(resizeStartRef.current.initSizeY + offsetCellsY, 1, 2);
    // Mettre à jour la taille via le callback du parent
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
        position: "relative", // Nécessaire pour positionner le handle de resize
      }}
      className="bg-slate-600 p-1 rounded-3xl z-0"
    >
      <div className="bg-slate-100 rounded-3xl w-full h-full p-3 select-none">
        <h2>test test bloc page test test</h2>
      </div>
      {/* Handle de redimensionnement placé en bas à droite */}
      <div
        onMouseDown={handleResizeMouseDown}
        style={{
          width: "16px",
          height: "16px",
          background: "gray",
          position: "absolute",
          bottom: "10px",
          right: "20px",
          cursor: "se-resize",
          borderRadius: "4px",
        }}
      />
    </div>
  );
}
