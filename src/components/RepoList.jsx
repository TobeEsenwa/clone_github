import { memo } from 'react';
import RepoCard from './RepoCard';
import SkeletonLoader from './SkeletonLoader';

function RepoList({ repositories, loading, error }) {
  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-600 mb-2">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-1">Error</h3>
        <p className="text-gray-600">{error.message || 'Failed to fetch repositories. Please try again.'}</p>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="divide-y">
        {[...Array(10)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }
  
  if (repositories.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 mb-2">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-1">No Results Found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }
  
  return (
    <div className="divide-y">
      {repositories.map(repo => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}

export default memo(RepoList);