"use client";

import { useRef } from "react";

export default function Bloc({
  id,
  blocSizeX = 1,
  blocSizeY = 1,
  posUnitX = 0,
  posUnitY = 0,
  cellSize,       // { width, height } passé depuis le Dashboard
  updatePosition, // fonction de callback pour mettre à jour la position
}) {
  // Référence vers l'élément DOM du bloc
  const blocRef = useRef(null);
  // Utiliser une référence pour stocker la position de départ du drag
  const dragStartRef = useRef(null);

  // Démarrer le drag dès le premier clic
  const handleMouseDown = (e) => {
    e.preventDefault();
    // Stocker la position initiale dans la référence
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initPosX: posUnitX,
      initPosY: posUnitY,
    };

    // Ajouter les écouteurs d'événements sur document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Gestion du déplacement
  const handleMouseMove = (e) => {
    if (!dragStartRef.current || !cellSize.width || !cellSize.height) return;

    // Calculer le déplacement en pixels
    const offsetX = e.clientX - dragStartRef.current.mouseX;
    const offsetY = e.clientY - dragStartRef.current.mouseY;

    // Conversion en nombre de cellules
    const offsetCellsX = Math.round(offsetX / cellSize.width);
    const offsetCellsY = Math.round(offsetY / cellSize.height);

    // Nouvelle position en grille
    const newPosUnitX = dragStartRef.current.initPosX + offsetCellsX;
    const newPosUnitY = dragStartRef.current.initPosY + offsetCellsY;

    // Mise à jour visuelle immédiate
    if (blocRef.current) {
      blocRef.current.style.gridColumn = `${newPosUnitX + 1} / span ${blocSizeX}`;
      blocRef.current.style.gridRow = `${newPosUnitY + 1} / span ${blocSizeY}`;
    }
  };

  // Fin du drag
  const handleMouseUp = (e) => {
    if (!dragStartRef.current || !cellSize.width || !cellSize.height) return;

    // Calcul final du déplacement en pixels
    const offsetX = e.clientX - dragStartRef.current.mouseX;
    const offsetY = e.clientY - dragStartRef.current.mouseY;
    const offsetCellsX = Math.round(offsetX / cellSize.width);
    const offsetCellsY = Math.round(offsetY / cellSize.height);
    const newPosUnitX = dragStartRef.current.initPosX + offsetCellsX;
    const newPosUnitY = dragStartRef.current.initPosY + offsetCellsY;

    // Mettre à jour la position dans le parent via le callback
    updatePosition(id, newPosUnitX, newPosUnitY);

    // Réinitialiser la référence
    dragStartRef.current = null;

    // Retirer les écouteurs globaux
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={blocRef}
      onMouseDown={handleMouseDown}
      style={{
        gridColumn: `${posUnitX + 1} / span ${blocSizeX}`,
        gridRow: `${posUnitY + 1} / span ${blocSizeY}`,
        cursor: "grab",
      }}
      className="bg-slate-600 p-1 rounded-3xl z-0"
    >
      <div className="bg-slate-100 rounded-3xl w-full h-full p-3 select-none">
        <h2>test test bloc page test test</h2>
      </div>
    </div>
  );
}
