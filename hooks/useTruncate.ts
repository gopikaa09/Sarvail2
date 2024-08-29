export const truncateHtml = (htmlContent, limit) => {
  if (!htmlContent) return ''; // Return an empty string if htmlContent is undefined or null

  const textContent = htmlContent.replace(/<[^>]+>/g, ''); // Remove HTML tags
  if (textContent.length <= limit) {
    return htmlContent;
  }
  const truncatedText = textContent.substring(0, limit) + '...';
  return truncatedText;
};
