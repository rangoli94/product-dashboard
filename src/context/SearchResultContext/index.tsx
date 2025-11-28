import { createContext, useState } from "react";
import type { Product } from "../../types/products";

export type SearchResultContextValue = {
    results: Product[];
    setResults: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const SearchResultContext = createContext<SearchResultContextValue | undefined>(
  undefined
);

export function SearchResultProvider({ children }: { children: React.ReactNode }) {
  const [results, setResults] = useState<Product[]>([]);

  return (
    <SearchResultContext.Provider value={{ results, setResults }}>
      {children}
    </SearchResultContext.Provider>
  );
}