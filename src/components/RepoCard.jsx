import { memo } from 'react';
import { formatDate, formatNumber } from '../utils/formatters';

function RepoCard({ repo }) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start">
        {repo.owner && (
          <div className="mr-3 flex-shrink-0">
            <img 
              src={repo.owner.avatar_url} 
              alt={`${repo.owner.login}'s avatar`} 
              className="w-10 h-10 rounded-full" 
            />
          </div>
        )}
        
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-medium text-blue-600 hover:underline truncate">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {repo.owner && `${repo.owner.login}/`}{repo.name}
            </a>
          </h3>
          
          {repo.description && (
            <p className="text-gray-600 mt-1 mb-2 text-sm line-clamp-2">
              {repo.description}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {repo.topics.slice(0, 5).map(topic => (
                  <span 
                    key={topic} 
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
                  >
                    {topic}
                  </span>
                ))}
                {repo.topics.length > 5 && (
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                    +{repo.topics.length - 5} more
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-600">
            {repo.language && (
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full mr-1 bg-gray-400"></span>
                <span>{repo.language}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>{formatNumber(repo.stargazers_count)}</span>
            </div>
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>{formatNumber(repo.forks_count)}</span>
            </div>
            
            {repo.license && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{repo.license.spdx_id || repo.license.name}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Updated {formatDate(repo.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(RepoCard);