import { useReducer, useCallback, useState, useEffect } from 'react';
import { searchRepositories } from '../utils/api';

// Initial state for the reducer
const initialState = {
  repositories: [],
  totalCount: null,
  loading: false,
  error: null
};

// Reducer function to handle state changes
function githubReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        repositories: action.payload.items,
        totalCount: action.payload.totalCount,
        error: null
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
        repositories: []
      };
    default:
      return state;
  }
}

/**
 * Custom hook for searching GitHub repositories
 * @returns {Object} State and methods for GitHub repository search
 */
function useGitHubSearch() {
  const [state, dispatch] = useReducer(githubReducer, initialState);
  const [searchParams, setSearchParams] = useState(null);
  const { repositories, totalCount, loading, error } = state;

  // Function to fetch repositories with given parameters
  const fetchRepositories = useCallback(async (params) => {
    // Save the search parameters for potential retry
    setSearchParams(params);
    
    // Start the loading state
    dispatch({ type: 'FETCH_START' });

    try {
      const data = await searchRepositories(params);
      
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: {
          items: data.items,
          totalCount: data.total_count
        }
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_ERROR',
        payload: error
      });
    }
  }, []);

  // Function to retry the last search
  const retryLastSearch = useCallback(() => {
    if (searchParams) {
      fetchRepositories(searchParams);
    }
  }, [searchParams, fetchRepositories]);

  return {
    repositories,
    totalCount,
    loading,
    error,
    fetchRepositories,
    retryLastSearch
  };
}

export default useGitHubSearch;