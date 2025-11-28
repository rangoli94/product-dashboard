import React, { useEffect, useState } from "react";
// import useDebounce from "../../customHooks";
import { useSearchParams } from "react-router-dom";
import { highlight } from "./highlight";
import useDebounce from "../../customHooks/useDebounce";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  // Update URL when user types
  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery]);

  // Fetch results from API
  useEffect(() => {
    if (debouncedQuery.trim().length === 0) {
      setResults([]);
      return;
    }

    const fetchSearch = async () => {
      setLoading(true);

      const res = await fetch(
        `https://dummyjson.com/products/search?q=${debouncedQuery}`
      );
      const data = await res.json();

      setResults(
        data.products.filter(
          (p: Product) =>
            p.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
      );

      setLoading(false);
    };

    fetchSearch();
  }, [debouncedQuery]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSearchParams({});
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      {/* Search Input */}
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 35px 10px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />

        {/* Clear Button (X) */}
        {query && (
          <button
            onClick={clearSearch}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* Searching Indicator */}
      {loading && <p style={{ marginTop: "10px" }}>🔍 Searching...</p>}

      {/* Results */}
      <div style={{ marginTop: "15px" }}>
        {results.map((p) => (
          <div
            key={p.id}
            style={{
              padding: "10px",
              background: "#f8f8f8",
              marginBottom: "10px",
              borderRadius: "8px",
              color: "black"
            }}
          >
            <h4>{highlight(p.title, debouncedQuery)}</h4>
            <p>{highlight(p.description, debouncedQuery)}</p>
            <strong>${p.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
