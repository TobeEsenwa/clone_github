/**
 * Search GitHub repositories using the GitHub API
 * @param {Object} params - Search parameters
 * @param {string} params.q - Search query
 * @param {string} [params.sort] - Sort field (stars, forks, updated)
 * @param {string} [params.order] - Sort order (asc, desc)
 * @param {number} [params.page] - Page number
 * @param {number} [params.per_page] - Items per page
 * @returns {Promise<Object>} - Search results
 */
export async function searchRepositories(params) {
  try {
    // Build URL with query parameters
    const baseUrl = 'https://api.github.com/search/repositories';
    const url = new URL(baseUrl);
    
    // Add the query parameters to the URL
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value);
      }
    });

    // Set default values for parameters if not provided
    if (!url.searchParams.has('sort')) url.searchParams.append('sort', 'stars');
    if (!url.searchParams.has('order')) url.searchParams.append('order', 'desc');
    if (!url.searchParams.has('page')) url.searchParams.append('page', '1');
    if (!url.searchParams.has('per_page')) url.searchParams.append('per_page', '10');

    // Make the API request
    const response = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add authorization header if you have a GitHub token
        // 'Authorization': `token ${YOUR_GITHUB_TOKEN}`
      }
    });

    // Check if the response is successful
    if (!response.ok) {
      // Get more detailed error information
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      error.status = response.status;
      error.details = errorData;
      throw error;
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    // Add more context to the error
    if (!error.message.includes('GitHub API error')) {
      error.message = `Failed to fetch repositories: ${error.message}`;
    }
    throw error;
  }
}

/**
 * Get available languages for filtering
 * This is a simplified implementation
 * @returns {Promise<string[]>} - Array of language names
 */
export async function fetchLanguages() {
  // In a real application, you might want to fetch this from the GitHub API
  // or build it dynamically from the search results
  return [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Go',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
    'Rust'
  ];
}

/**
 * Get available licenses for filtering
 * @returns {Promise<Object[]>} - Array of license objects
 */
export async function fetchLicenses() {
  try {
    const response = await fetch('https://api.github.com/licenses', {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch licenses:', error);
    
    // Return a default list in case of error
    return [
      { spdx_id: 'MIT', name: 'MIT License' },
      { spdx_id: 'Apache-2.0', name: 'Apache License 2.0' },
      { spdx_id: 'GPL-3.0', name: 'GNU General Public License v3.0' },
      { spdx_id: 'BSD-3-Clause', name: 'BSD 3-Clause License' }
    ];
  }
}