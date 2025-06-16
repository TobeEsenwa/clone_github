import { useState, useCallback } from 'react';

const sortOptions = [
  { label: 'Stars', value: 'stars' },
  { label: 'Forks', value: 'forks' },
  { label: 'Updated', value: 'updated' }
];

function SortOptions({ currentSort, currentOrder, onChange }) {
  const [sort, setSort] = useState(currentSort);
  const [order, setOrder] = useState(currentOrder);

  const handleSortChange = useCallback((e) => {
    const newSort = e.target.value;
    setSort(newSort);
    onChange(newSort, order);
  }, [order, onChange]);
  
  const handleOrderChange = useCallback((e) => {
    const newOrder = e.target.value;
    setOrder(newOrder);
    onChange(sort, newOrder);
  }, [sort, onChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort By
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={sort}
          onChange={handleSortChange}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Order
        </label>
        <div className="flex">
          <div className="flex items-center mr-4">
            <input
              id="order-desc"
              type="radio"
              value="desc"
              name="order"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              checked={order === 'desc'}
              onChange={handleOrderChange}
            />
            <label htmlFor="order-desc" className="ml-2 text-sm font-medium text-gray-700">
              Descending
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="order-asc"
              type="radio"
              value="asc"
              name="order"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              checked={order === 'asc'}
              onChange={handleOrderChange}
            />
            <label htmlFor="order-asc" className="ml-2 text-sm font-medium text-gray-700">
              Ascending
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortOptions;