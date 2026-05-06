/**
 * News API Service
 * Handles all API calls related to news and media management
 */

class NewsService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || '/api';
    this.endpoint = `${this.baseUrl}/kaligard/news`;
  }

  /**
   * Fetch all news items for the vendor
   */
  async fetchNews() {
    try {
      const response = await fetch(`${this.endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch news');
      return await response.json();
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  }

  /**
   * Create a new news item with media
   */
  async createNews(formData) {
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('type', formData.type);

      if (formData.mediaFile) {
        data.append('media', formData.mediaFile);
      }

      const response = await fetch(`${this.endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: data,
      });

      if (!response.ok) throw new Error('Failed to create news');
      return await response.json();
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  }

  /**
   * Update an existing news item
   */
  async updateNews(id, updates) {
    try {
      const response = await fetch(`${this.endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error('Failed to update news');
      return await response.json();
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  }

  /**
   * Delete a news item
   */
  async deleteNews(id) {
    try {
      const response = await fetch(`${this.endpoint}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete news');
      return await response.json();
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  }

  /**
   * Upload media file (can be used separately if needed)
   */
  async uploadMedia(file, type) {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('type', type);

      const response = await fetch(`${this.endpoint}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: data,
      });

      if (!response.ok) throw new Error('Failed to upload media');
      return await response.json();
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error;
    }
  }
}

export default new NewsService();
