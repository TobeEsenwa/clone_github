import { useState, useEffect, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import SortOptions from './components/SortOptions';
import Pagination from './components/Pagination';
import RepoList from './components/RepoList';
import useGitHubSearch from './hooks/useGitHubSearch';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [sort, setSort] = useState('stars');
  const [order, setOrder] = useState('desc');
  const [filters, setFilters] = useState({
    language: '',
    stars: {
      min: '',
      max: ''
    },
    license: ''
  });

  const generateSearchQueryString = useMemo(() => {
    let queryString = query || 'stars:>1';
    
    if (filters.language) {
      queryString += ` language:${filters.language}`;
    }
    
    if (filters.stars.min) {
      queryString += ` stars:>=${filters.stars.min}`;
    }
    
    if (filters.stars.max) {
      queryString += ` stars:<=${filters.stars.max}`;
    }
    
    if (filters.license && filters.license !== 'All') {
      queryString += ` license:${filters.license}`;
    }
    
    return queryString;
  }, [query, filters]);
  
  const { 
    repositories, 
    totalCount, 
    loading, 
    error, 
    fetchRepositories 
  } = useGitHubSearch();

  useEffect(() => {
    fetchRepositories({
      q: generateSearchQueryString,
      sort,
      order,
      page,
      per_page: perPage
    });
  }, [generateSearchQueryString, sort, order, page, perPage, fetchRepositories]);

  const totalPages = useMemo(() => {
    if (totalCount === null) return 0;
    
    // GitHub API limits results to 1000 items
    const maxResults = Math.min(totalCount, 1000);
    return Math.ceil(maxResults / perPage);
  }, [totalCount, perPage]);
  
  // Calculate pagination information
  const paginationInfo = useMemo(() => {
    if (totalCount === null) return null;
    
    const startItem = (page - 1) * perPage + 1;
    const endItem = Math.min(page * perPage, totalCount);
    
    return {
      startItem,
      endItem,
      totalItems: totalCount,
      currentPage: page,
      totalPages
    };
  }, [page, perPage, totalCount, totalPages]);

  const handleSortChange = (sortOption, orderOption) => {
    setSort(sortOption);
    setOrder(orderOption);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-900 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2">GitHub Explorer</h1>
          <p className="text-gray-400">Search and explore GitHub repositories</p>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="mb-6">
          <SearchBar 
            initialQuery={query} 
            setQuery={setQuery} 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <Filters 
                filters={filters} 
                onChange={handleFilterChange}
                setPage={setPage}
              />
            </div>
            
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-4">Sort Options</h2>
              <SortOptions 
                currentSort={sort} 
                currentOrder={order} 
                onChange={handleSortChange} 
              />
            </div>
          </aside>
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Repositories 
                    {totalCount !== null && !loading && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({totalCount.toLocaleString()} results)
                      </span>
                    )}
                  </h2>
                  {paginationInfo && !loading && (
                    <span className="text-sm text-gray-500">
                      Showing {paginationInfo.startItem}-{paginationInfo.endItem} of {paginationInfo.totalItems.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              
              <RepoList 
                repositories={repositories} 
                loading={loading} 
                error={error}
              />
              
              {totalPages > 0 && (
                <div className="p-4 border-t">
                  <Pagination 
                    currentPage={page} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-12 bg-gray-900 text-white p-6">
        <div className="container mx-auto text-center">
          <p>Created by Tobe Esenwa ❤️</p>
        </div>
      </footer>
    </div>
  );
}

export default App;