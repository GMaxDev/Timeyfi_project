"use client";

import Bloc from "@/app/components/bloc";
import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  // Etat des blocs de base
  const [blocs, setBlocs] = useState([
    { id: 1, posUnitX: 0, posUnitY: 0, blocSizeX: 1, blocSizeY: 1 },
    { id: 2, posUnitX: 2, posUnitY: 0, blocSizeX: 1, blocSizeY: 1 },
    { id: 3, posUnitX: 3, posUnitY: 0, blocSizeX: 1, blocSizeY: 2 },
    { id: 4, posUnitX: 1, posUnitY: 1, blocSizeX: 2, blocSizeY: 1 },
    { id: 5, posUnitX: 4, posUnitY: 4, blocSizeX: 2, blocSizeY: 2 },
    { id: 6, posUnitX: 1, posUnitY: 2, blocSizeX: 1, blocSizeY: 3 },
    { id: 7, posUnitX: 4, posUnitY: 2, blocSizeX: 2, blocSizeY: 1 },
  ]);

  // Référence pour le conteneur de la grille
  const gridRef = useRef(null);
  // Etat pour stocker la taille d'une cellule
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 });

  // Au montage, on calcule la taille d'une cellule
  useEffect(() => {
    if (gridRef.current) {
      const gridWidth = gridRef.current.clientWidth;
      const gridHeight = gridRef.current.clientHeight;

      setCellSize({
        width: gridWidth / 6,
        height: gridHeight / 6,
      });
    }
  }, []);

  // Fonction de mise à jour de la position d'un bloc (corrigée)
  const updateBlocPosition = (id, newPosUnitX, newPosUnitY) => {
    setBlocs((prev) =>
      prev.map((bloc) =>
        bloc.id === id
          ? { ...bloc, posUnitX: newPosUnitX, posUnitY: newPosUnitY }
          : bloc
      )
    );
  };

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-6 gap-2 grid-rows-6 h-full relative"
    >
      {blocs.map((bloc) => (
        <Bloc
          key={bloc.id}
          id={bloc.id}
          posUnitX={bloc.posUnitX}
          posUnitY={bloc.posUnitY}
          blocSizeX={bloc.blocSizeX}
          blocSizeY={bloc.blocSizeY}
          cellSize={cellSize}
          updatePosition={updateBlocPosition}
        />
      ))}
    </div>
  );
}
