import { useState, useCallback } from 'react';

export const useNewsManager = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addNews = useCallback(async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newItem = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        type: formData.type,
        imageUrl: formData.type === 'image' ? formData.mediaPreview : null,
        videoUrl: formData.type === 'video' ? formData.mediaPreview : null,
        date: new Date().toISOString(),
        mediaFile: formData.mediaFile,
      };

      setNewsItems(prev => [newItem, ...prev]);
      return newItem;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteNews = useCallback((id) => {
    setNewsItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateNews = useCallback((id, updates) => {
    setNewsItems(prev =>
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  }, []);

  return {
    newsItems,
    isLoading,
    error,
    addNews,
    deleteNews,
    updateNews,
    setNewsItems,
  };
};

export default useNewsManager;
