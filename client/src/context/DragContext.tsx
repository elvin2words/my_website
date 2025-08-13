// src/context/DragContext.tsx
// This file provides a context for managing drag-and-drop functionality in the application.

import React, { createContext, useContext, useState, ReactNode, useRef, useCallback } from 'react';

interface DragContextType {
  draggedElement: string | null;
  setDraggedElement: (id: string | null) => void;
  registerDraggable: (id: string, ref: React.RefObject<HTMLDivElement>) => void;
  getDraggableRef: (id: string) => React.RefObject<HTMLDivElement> | undefined;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

interface DragProviderProps {
  children: ReactNode;
}

export const DragProvider: React.FC<DragProviderProps> = ({ children }) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  // Use useRef instead of useState to prevent re-renders
  const draggableRefs = useRef<Map<string, React.RefObject<HTMLDivElement>>>(new Map());

  const registerDraggable = useCallback((id: string, ref: React.RefObject<HTMLDivElement>) => {
    draggableRefs.current.set(id, ref);
  }, []);

  const getDraggableRef = useCallback((id: string) => {
    return draggableRefs.current.get(id);
  }, []);

  return (
    <DragContext.Provider
      value={{
        draggedElement,
        setDraggedElement,
        registerDraggable,
        getDraggableRef,
      }}
    >
      {children}
    </DragContext.Provider>
  );
};

export const useDrag = () => {
  const context = useContext(DragContext);
  if (context === undefined) {
    throw new Error('useDrag must be used within a DragProvider');
  }
  return context;
};
