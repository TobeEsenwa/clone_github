import { useState, useEffect } from 'react';

// Common programming languages for filter suggestions
const LANGUAGES = [
  'All', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Go', 
  'PHP', 'Ruby', 'Swift', 'Kotlin', 'Rust'
];

// Common licenses
const LICENSES = [
  'All', 'MIT', 'Apache-2.0', 'GPL-3.0', 'GPL-2.0', 'BSD-3-Clause', 
  'BSD-2-Clause', 'LGPL-3.0', 'MPL-2.0', 'AGPL-3.0'
];

function Filters({ filters, onChange, setPage }) {
  const [starMin, setStarMin] = useState(filters.stars.min);
  const [starMax, setStarMax] = useState(filters.stars.max);
  const [language, setLanguage] = useState(filters.language || 'All');
  const [license, setLicense] = useState(filters.license || 'All');

  useEffect(() => {
    // Only update when values have changed and debounce star values
    const handler = setTimeout(() => {
      const newFilters = {
        stars: {
          min: starMin,
          max: starMax
        },
        language: language === 'All' ? '' : language,
        license: license === 'All' ? '' : license
      };
      
      onChange(newFilters);
    }, 500);
    
    return () => clearTimeout(handler);
  }, [starMin, starMax, language, license, onChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {LANGUAGES.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stars
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={starMin}
            onChange={(e) => setStarMin(e.target.value)}
            min="0"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={starMax}
            onChange={(e) => setStarMax(e.target.value)}
            min="0"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          License
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
        >
          {LICENSES.map(lic => (
            <option key={lic} value={lic}>{lic}</option>
          ))}
        </select>
      </div>
      
      <div>
        <button
          className="w-full text-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          onClick={() => {
            setPage(1);
            setStarMin('');
            setStarMax('');
            setLanguage('All');
            setLicense('All');
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default Filters;