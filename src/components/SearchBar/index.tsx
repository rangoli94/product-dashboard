import React, { useContext, useEffect, useState } from 'react'
import useDebounce from '../../customHooks/useDebounce';
import type { Product } from '../../types/products';
import './index.css'
import { SearchResultContext } from '../../context/SearchResultContext';
import { highlight } from './highlight';
import { useSearchParams } from 'react-router-dom';

function SearchBar() {
    // const [searchParam, setSearchParam] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState("");
    
    // const [results, setResults] = useState<Product[]>([]);
    const searchResultContext = useContext(SearchResultContext);

    if(!searchResultContext) {
        throw new Error("context does not exist")
    }

    const { results, setResults } = searchResultContext
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 300); 

    const updateQuery = (value: string) => {
        setSearchParams({ q: value }); // updates URL ?q=value
    };

    useEffect(() => {
        updateQuery(query)
    },[results])

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

        setResults(data.products)
    
          setLoading(false);
        };
    
        fetchSearch();
      }, [debouncedQuery]);

    const handleProductClick = (result: Product) => {
        setResults([result])
    }

    const clearSearch = () => {
        setQuery("");
        setResults([]);
        setSearchParams({});
      };

  return (
    <div>
        <input type="text"  
            placeholder="Search products..."
            value={query} onChange={(e) => setQuery(e.target.value)}/>
        
        {query && (
          <button
            onClick={clearSearch}

          >
            X
          </button>
        )}

        {loading && <p className='search-results'>Searching...</p>}
        {results.length > 0 && (<div className='search-results'>
            {
                results.map(result => (
                    <div key={result.id} style={{borderBottom: '1px solid black'}} onClick={() => handleProductClick(result)}>
                        <p>Title: {highlight(result.title, query)}</p>
                        <p>Description: {highlight(result.description, query)}</p>
                    </div>
                ))
            }
        </div>)}
    </div>

  )
}

export default SearchBar