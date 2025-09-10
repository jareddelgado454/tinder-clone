// contexts/ModalActionContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react";

type ActionType = -1 | 1 | "super" | null;

interface ModalActionContextProps {
  action: ActionType;
  setAction: (action: ActionType) => void;
}

const ModalActionContext = createContext<ModalActionContextProps | undefined>(undefined);

export const ModalActionProvider = ({ children }: { children: ReactNode }) => {
  const [action, setAction] = useState<ActionType>(null);

  return (
    <ModalActionContext.Provider value={{ action, setAction }}>
      {children}
    </ModalActionContext.Provider>
  );
};

export const useModalAction = () => {
  const context = useContext(ModalActionContext);
  if (!context) throw new Error("useModalAction must be used within ModalActionProvider");
  return context;
};
