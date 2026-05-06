import { useEffect, useState } from 'react';
import { Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

const NewsForm = ({ onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'text',
    mediaFile: null,
    mediaPreview: null,
  });

  const [touched, setTouched] = useState({});
  const mediaTypes = ['TEXT', 'IMAGE', 'VIDEO'];

  useEffect(() => {
    if (!formData.mediaFile) {
      setFormData(prev => (prev.mediaPreview ? { ...prev, mediaPreview: null } : prev));
      return undefined;
    }

    const previewUrl = URL.createObjectURL(formData.mediaFile);
    setFormData(prev => ({ ...prev, mediaPreview: previewUrl }));

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [formData.mediaFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type: type.toLowerCase(),
      mediaFile: null,
      mediaPreview: null,
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        mediaFile: file,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setTouched({ title: true });
      return;
    }
    if (formData.type !== 'text' && !formData.mediaFile) {
      setTouched({ mediaFile: true });
      return;
    }
    onSubmit(formData);
  };

  const errors = {
    title: touched.title && !formData.title.trim() ? 'Title is required' : '',
    mediaFile: touched.mediaFile && !formData.mediaFile ? 'Media file is required' : '',
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-linear-to-br from-[#667eea]/80 to-[#764ba2]/80 backdrop-blur-md p-6 text-white shadow-2xl my-8 sm:p-8 lg:p-10 sm:my-auto">
        
        {/* Header */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-center mb-8 sm:mb-10 tracking-tight">
          NEW POST
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          
          {/* Title Field */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-white/80 mb-3 tracking-widest">
              TITLE
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your post title..."
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 bg-white/15 text-white placeholder-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 text-base sm:text-lg ${
                errors.title ? 'border-red-400/70' : 'border-white/30'
              }`}
            />
            {errors.title && <p className="text-xs sm:text-sm text-red-300 mt-2">{errors.title}</p>}
          </div>

          {/* Media Type Selection */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-white/80 mb-3 tracking-widest">
              MEDIA TYPE
            </label>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {mediaTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleTypeChange(type)}
                  className={`px-4 sm:px-6 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all duration-200 border-2 ${
                    formData.type === type.toLowerCase()
                      ? 'bg-white text-[#667eea] border-white shadow-lg'
                      : 'bg-white/20 text-white border-white/30 hover:bg-white/25'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Media Upload (for Image/Video) */}
          {formData.type !== 'text' && (
            <div>
              <label className="block text-sm sm:text-base font-bold text-white/80 mb-3 tracking-widest">
                UPLOAD {formData.type.toUpperCase()}
              </label>
              <label
                htmlFor="media-upload"
                className={`block cursor-pointer rounded-2xl border-2 border-dashed transition-all p-6 sm:p-8 lg:p-10 text-center ${
                  errors.mediaFile
                    ? 'border-red-400/70 bg-red-400/5'
                    : 'border-white/40 bg-white/10 hover:bg-white/15'
                }`}
              >
                {formData.mediaPreview ? (
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      {formData.type === 'image' ? (
                        <img
                          src={formData.mediaPreview}
                          alt="Preview"
                          className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl object-cover border-2 border-white/30"
                        />
                      ) : (
                        <video
                          src={formData.mediaPreview}
                          preload="metadata"
                          playsInline
                          className="h-24 w-24 sm:h-32 sm:w-32 rounded-xl object-cover border-2 border-white/30"
                        />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 font-medium">{formData.mediaFile.name}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-center">
                      {formData.type === 'image' ? (
                        <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white/60" />
                      ) : (
                        <VideoIcon className="h-10 w-10 sm:h-12 sm:w-12 text-white/60" />
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-medium">Click to upload</p>
                    <p className="text-xs sm:text-sm text-white/60">
                      {formData.type === 'image' ? 'PNG, JPG, GIF up to 10MB' : 'MP4, WebM up to 100MB'}
                    </p>
                  </div>
                )}
              </label>
              <input
                id="media-upload"
                type="file"
                onChange={handleMediaChange}
                onBlur={handleBlur}
                className="hidden"
                accept={formData.type === 'image' ? 'image/*' : 'video/*'}
              />
              {errors.mediaFile && <p className="text-xs sm:text-sm text-red-300 mt-2">{errors.mediaFile}</p>}
            </div>
          )}

          {/* Description Field */}
          <div>
            <label className="block text-sm sm:text-base font-bold text-white/80 mb-3 tracking-widest">
              DESCRIPTION / INFORMATION
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add description for your post (optional)..."
              rows="4"
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 border-white/30 bg-white/15 text-white placeholder-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/30 resize-none text-base sm:text-lg"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 sm:gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 border-white/40 bg-white/15 text-white font-bold text-base sm:text-lg transition-all hover:bg-white/20 hover:border-white/50"
            >
              CANCEL
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-white text-[#667eea] font-black text-base sm:text-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'POSTING...' : 'POST NEWS'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
