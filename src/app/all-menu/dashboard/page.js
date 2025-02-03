"use client";

import Bloc from "@/app/components/bloc";
import { useEffect, useRef, useState } from "react";

// Fonction utilitaire pour vérifier si deux rectangles se chevauchent
const rectanglesIntersect = (blockA, blockB) => {
  return (
    blockA.posUnitX < blockB.posUnitX + blockB.blocSizeX &&
    blockA.posUnitX + blockA.blocSizeX > blockB.posUnitX &&
    blockA.posUnitY < blockB.posUnitY + blockB.blocSizeY &&
    blockA.posUnitY + blockA.blocSizeY > blockB.posUnitY
  );
};

export default function Dashboard() {
  // État initial des blocs, on ajoute forceUpdate: 0 pour chaque bloc
  const [blocs, setBlocs] = useState([
    { id: 1, posUnitX: 0, posUnitY: 0, blocSizeX: 1, blocSizeY: 1, forceUpdate: 0 },
    { id: 2, posUnitX: 2, posUnitY: 0, blocSizeX: 1, blocSizeY: 1, forceUpdate: 0 },
    { id: 3, posUnitX: 3, posUnitY: 0, blocSizeX: 1, blocSizeY: 2, forceUpdate: 0 },
    { id: 4, posUnitX: 1, posUnitY: 1, blocSizeX: 2, blocSizeY: 1, forceUpdate: 0 },
    { id: 5, posUnitX: 4, posUnitY: 4, blocSizeX: 2, blocSizeY: 2, forceUpdate: 0 },
    { id: 6, posUnitX: 1, posUnitY: 2, blocSizeX: 1, blocSizeY: 3, forceUpdate: 0 },
    { id: 7, posUnitX: 4, posUnitY: 2, blocSizeX: 2, blocSizeY: 1, forceUpdate: 0 },
  ]);

  // Référence pour le conteneur de la grille
  const gridRef = useRef(null);
  // État pour stocker la taille d'une cellule
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 });

  // Au montage, calculer la taille d'une cellule
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

  // Mise à jour de la position d'un bloc avec détection de collision
  const updateBlocPosition = (id, newPosUnitX, newPosUnitY) => {
    setBlocs((prev) => {
      const movedBlock = prev.find((bloc) => bloc.id === id);
      if (!movedBlock) return prev;
      const newMovedBlock = {
        ...movedBlock,
        posUnitX: newPosUnitX,
        posUnitY: newPosUnitY,
      };
      const collision = prev.some((bloc) => {
        if (bloc.id === id) return false;
        return rectanglesIntersect(newMovedBlock, bloc);
      });
      if (collision) {
        console.log("Collision détectée, déplacement annulé");
        // Incrémenter forceUpdate pour ce bloc afin de forcer le re-render
        return prev.map((bloc) =>
          bloc.id === id ? { ...bloc, forceUpdate: bloc.forceUpdate + 1 } : { ...bloc }
        );
      }
      return prev.map((bloc) =>
        bloc.id === id ? newMovedBlock : { ...bloc }
      );
    });
  };

  // Mise à jour de la taille d'un bloc
  const updateBlocSize = (id, newSizeX, newSizeY) => {
    setBlocs((prev) =>
      prev.map((bloc) =>
        bloc.id === id
          ? { ...bloc, blocSizeX: newSizeX, blocSizeY: newSizeY }
          : { ...bloc }
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
          updateSize={updateBlocSize}
          forceUpdate={bloc.forceUpdate}
        />
      ))}
    </div>
  );
}
