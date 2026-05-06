import { useEffect, useRef, useState, useCallback } from 'react';
import NewsHeader from '../components/news/NewsHeader';
import NewsGrid from '../components/news/NewsGrid';
import EmptyNewsState from '../components/news/EmptyNewsState';
import NewsForm from '../components/news/NewsForm';
import MediaPreviewModal from '../components/news/MediaPreviewModal';

const KaligardNews = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const newsItemsRef = useRef(newsItems);

  const isBlobUrl = useCallback((url) => typeof url === 'string' && url.startsWith('blob:'), []);

  useEffect(() => {
    newsItemsRef.current = newsItems;
  }, [newsItems]);

  useEffect(() => {
    return () => {
      newsItemsRef.current.forEach((item) => {
        const mediaUrl = item.mediaUrl || item.imageUrl || item.videoUrl;
        if (isBlobUrl(mediaUrl)) {
          URL.revokeObjectURL(mediaUrl);
        }
      });
    };
  }, [isBlobUrl, newsItems]);

  // Show toast notification
  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  }, []);

  // Handle adding new news/media
  const handleAddNews = useCallback((formData) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const mediaUrl = formData.mediaFile ? URL.createObjectURL(formData.mediaFile) : null;
      const newItem = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        type: formData.type,
        mediaUrl,
        imageUrl: formData.type === 'image' ? mediaUrl : null,
        videoUrl: formData.type === 'video' ? mediaUrl : null,
        date: new Date().toISOString(),
        mediaFile: formData.mediaFile,
      };

      setNewsItems(prev => [newItem, ...prev]);
      setShowForm(false);
      setIsSubmitting(false);
      showToast('News published successfully!');
    }, 500);
  }, [showToast]);

  // Handle deleting news item
  const handleDeleteNews = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this news item?')) {
      setNewsItems(prev => {
        const targetItem = prev.find(item => item.id === id);
        const mediaUrl = targetItem?.mediaUrl || targetItem?.imageUrl || targetItem?.videoUrl;
        if (isBlobUrl(mediaUrl)) {
          URL.revokeObjectURL(mediaUrl);
        }

        return prev.filter(item => item.id !== id);
      });
      showToast('News deleted successfully!');
    }
  }, [isBlobUrl, showToast]);

  // Handle viewing media
  const handleViewMedia = useCallback((item) => {
    setPreviewItem(item);
  }, []);

  // Handle closing preview
  const handleClosePreview = useCallback(() => {
    setPreviewItem(null);
  }, []);

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
          {toastMessage}
        </div>
      )}

      {/* Header with Add Button */}
      <NewsHeader onAddClick={() => setShowForm(true)} />

      {/* Content */}
      {newsItems.length === 0 ? (
        <div className="rounded-2xl border border-white/20 bg-white/8 backdrop-blur-md overflow-hidden min-h-96 flex items-center justify-center">
          <EmptyNewsState />
        </div>
      ) : (
        <>
          {/* Stats Card */}
          <div className="rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4 sm:p-6 hover:bg-white/12 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center shrink-0 shadow-lg">
                <span className="text-xl sm:text-2xl">📰</span>
              </div>
              <div>
                <p className="text-white/70 text-xs sm:text-sm font-medium">TOTAL UPDATES</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">{newsItems.length}</p>
              </div>
            </div>
          </div>

          {/* News Grid */}
          <NewsGrid
            items={newsItems}
            onDelete={handleDeleteNews}
            onView={handleViewMedia}
          />
        </>
      )}

      {/* Add News Form Modal */}
      {showForm && (
        <NewsForm
          onSubmit={handleAddNews}
          onCancel={() => setShowForm(false)}
          isLoading={isSubmitting}
        />
      )}

      {/* Media Preview Modal */}
      {previewItem && (
        <MediaPreviewModal
          item={previewItem}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default KaligardNews;
