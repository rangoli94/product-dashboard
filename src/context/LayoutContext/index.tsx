import { createContext, useState } from "react";
import { LAYOUT } from "../../constant";
import type { Layout } from "../../types/products";

export type LayoutContextValue = {
  layout: Layout;
  setLayout: React.Dispatch<React.SetStateAction<Layout>>;
};

export const LayoutContext = createContext<LayoutContextValue | undefined>(
  undefined
);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useState<Layout>(LAYOUT.GRID);

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}