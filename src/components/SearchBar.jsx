import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

function SearchBar({ initialQuery = '', setQuery }) {
  const [inputValue, setInputValue] = useState(initialQuery);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg 
          className="w-5 h-5 text-gray-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </div>
      <input
        type="search"
        className="block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search repositories (e.g., 'react', 'machine learning', etc.)"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* {inputValue && (
        <button
          type="button"
          className="absolute right-2.5 bottom-2.5 text-gray-500 hover:text-gray-700"
          onClick={() => setInputValue('')}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )} */}
    </div>
  );
}

export default SearchBar;