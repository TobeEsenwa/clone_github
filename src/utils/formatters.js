/**
 * Format a date string to a relative time string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffMonth / 12);

  if (diffYear > 0) {
    return `${diffYear} ${diffYear === 1 ? 'year' : 'years'} ago`;
  } 
  if (diffMonth > 0) {
    return `${diffMonth} ${diffMonth === 1 ? 'month' : 'months'} ago`;
  }
  if (diffDay > 0) {
    return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
  }
  if (diffHour > 0) {
    return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
  }
  if (diffMin > 0) {
    return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  return 'just now';
}

/**
 * Format a number to a more readable string
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return '';
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  
  return num.toString();
}

/**
 * Format bytes to a human-readable string
 * @param {number} bytes - Bytes to format
 * @param {number} decimals - Number of decimal places to show
 * @returns {string} Formatted size string
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length before truncating
 * @returns {string} Truncated text
 */
export function truncateText(text, length = 100) {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
}