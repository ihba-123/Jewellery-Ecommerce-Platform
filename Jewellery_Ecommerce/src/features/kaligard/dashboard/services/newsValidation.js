/**
 * News validation utilities
 */

export const validateNewsFormData = (formData) => {
  const errors = {};

  if (!formData.title?.trim()) {
    errors.title = 'Title is required';
  }

  if (formData.title && formData.title.length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  if (formData.description && formData.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  if (formData.type !== 'update' && !formData.mediaFile) {
    errors.mediaFile = 'Media file is required';
  }

  if (formData.mediaFile) {
    const maxSize = formData.type === 'video' ? 100 * 1024 * 1024 : 10 * 1024 * 1024; // 100MB for video, 10MB for images
    if (formData.mediaFile.size > maxSize) {
      errors.mediaFile = `File size exceeds ${maxSize / 1024 / 1024}MB limit`;
    }
  }

  return errors;
};

export const validateMediaFile = (file, type) => {
  if (!file) return 'File is required';

  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  const validTypes = type === 'image' ? validImageTypes : validVideoTypes;

  if (!validTypes.includes(file.type)) {
    return `Invalid file type. Expected ${type === 'image' ? 'image' : 'video'} file`;
  }

  return null;
};

export default {
  validateNewsFormData,
  validateMediaFile,
};
