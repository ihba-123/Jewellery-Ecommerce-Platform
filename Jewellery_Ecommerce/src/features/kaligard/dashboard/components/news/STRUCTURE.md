# News & Media Management - Complete Documentation

## 📁 Folder Structure

```
src/features/kaligard/dashboard/
├── components/
│   └── news/                          # All news-related components
│       ├── NewsForm.jsx               # Modal form for adding posts (TEXT/IMAGE/VIDEO)
│       ├── NewsHeader.jsx             # Header with title and "Add News/Media" button
│       ├── NewsCard.jsx               # Individual news card component
│       ├── NewsGrid.jsx               # Responsive grid layout for news items
│       ├── EmptyNewsState.jsx         # Empty state placeholder ("NO NEWS POSTED")
│       ├── MediaPreviewModal.jsx      # Full-screen media viewer
│       └── README.md                  # This file
│
├── hooks/
│   └── useNewsManager.js              # Custom hook for state management
│
├── services/
│   ├── newsService.js                 # API integration layer
│   └── newsValidation.js              # Form validation utilities
│
└── pages/
    └── KaligardNews.jsx               # Main page component
```

## 🎨 Design Features

### Form Design (NewsForm.jsx)
✨ **"NEW POST" Modal**
- Professional gradient background (purple to blue)
- Text-based input with uppercase labels
- Three media type buttons: TEXT, IMAGE, VIDEO
- Responsive button styling with active states
- Dynamic media upload section
- Large descriptive textarea
- CANCEL and POST NEWS action buttons

### Responsive Breakpoints
- **sm (640px)**: Mobile - Full-width layout, adjusted font sizes
- **md (768px)**: Tablet - 2-column grid, optimized spacing
- **lg (1024px)**: Desktop - 3-column grid
- **xl (1280px)**: Large screens - 4-column grid

### UI/UX Elements
- Gradient background (from-[#667eea]/80 to-[#764ba2]/80)
- Semi-transparent inputs (bg-white/15)
- Smooth transitions and hover effects
- Border-based interactive states
- Professional shadow effects
- Responsive typography

## 📱 Responsive Typography

| Element | Mobile | Tablet | Desktop | Large |
|---------|--------|--------|---------|-------|
| Title | text-3xl | text-4xl | text-5xl | - |
| Labels | text-sm | text-base | text-base | - |
| Input | text-base | text-lg | text-lg | - |
| Buttons | text-base | text-lg | text-lg | - |

## 🎯 Key Features

### 1. NewsForm Component
**Purpose**: Modal for creating new posts

**Props**:
- `onSubmit(formData)` - Called when form is submitted
- `onCancel()` - Called when cancel button clicked
- `isLoading(bool)` - Shows loading state on submit button

**Form Data Structure**:
```javascript
{
  title: string,           // Post title (required)
  description: string,     // Optional description
  type: 'text' | 'image' | 'video',
  mediaFile: File,         // File object for image/video
  mediaPreview: string,    // Base64 preview for display
}
```

### 2. NewsHeader Component
**Purpose**: Page header with title and add button

**Props**:
- `onAddClick()` - Callback for add button
- `totalPosts(number)` - Optional total count display

### 3. NewsCard Component
**Purpose**: Individual news item display

**Props**:
- `item` - News item object
- `onDelete(id)` - Delete callback
- `onView(item)` - Preview callback

**Features**:
- Hover overlay with view/delete buttons
- Media preview (image/video/text)
- Type badge with emoji
- Date formatting
- Responsive grid placement

### 4. NewsGrid Component
**Purpose**: Responsive grid layout

**Grid Sizes**:
- sm: 1 column
- md-lg: 2 columns
- lg: 3 columns
- xl: 4 columns

### 5. EmptyNewsState Component
**Purpose**: Placeholder when no news exists

### 6. MediaPreviewModal Component
**Purpose**: Full-screen media viewer

**Features**:
- Image display
- Video player with controls
- Item details (title, description, date)
- Close button

## 🔧 Usage Example

```jsx
// In KaligardNews.jsx
import NewsForm from '../components/news/NewsForm';

const handleAddNews = (formData) => {
  // formData contains: title, description, type, mediaFile, mediaPreview
  setNewsItems(prev => [{
    id: Date.now(),
    ...formData,
    imageUrl: formData.type === 'image' ? formData.mediaPreview : null,
    videoUrl: formData.type === 'video' ? formData.mediaPreview : null,
    date: new Date().toISOString(),
  }, ...prev]);
};

// Show form on button click
<button onClick={() => setShowForm(true)}>Add News</button>

// Render form
{showForm && (
  <NewsForm
    onSubmit={handleAddNews}
    onCancel={() => setShowForm(false)}
    isLoading={isSubmitting}
  />
)}
```

## 🎨 Color Scheme

**Form/Modal**:
- Background: `from-[#667eea]/80 to-[#764ba2]/80`
- Primary Text: `#ffffff`
- Secondary Text: `rgba(255,255,255,0.7)`
- Active Button: `#ffffff` text on `#667eea` background
- Inactive Button: `rgba(255,255,255,0.2)` background

**Interactive States**:
- Hover: `bg-white/25` or `bg-white/30`
- Focus: `focus:ring-2 focus:ring-white/50`
- Error: `border-red-400/70`
- Disabled: `opacity-50 cursor-not-allowed`

## 📊 Form Validation

Handled in `newsValidation.js`:
- Title: Required, max 100 characters
- Media file: Type-specific validation
- File size: Images (10MB), Videos (100MB)

## 🔌 API Integration

Service methods in `newsService.js`:
- `fetchNews()` - Get all posts
- `createNews(formData)` - Add new post
- `updateNews(id, updates)` - Edit post
- `deleteNews(id)` - Remove post
- `uploadMedia(file, type)` - Upload media file

## 📝 Customization Guide

### Change Grid Columns
Edit `NewsGrid.jsx`:
```jsx
// Current: 1 column (sm) → 2 columns (md) → 3 columns (lg) → 4 columns (xl)
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

### Modify Colors
Edit `NewsForm.jsx` classes:
```jsx
from-[#667eea]/80 to-[#764ba2]/80  // Gradient colors
text-[#667eea]                      // Text color
```

### Adjust Spacing
Change `gap-` and `p-` classes:
```jsx
// Example: Increase spacing
className="space-y-6 sm:space-y-8 lg:space-y-10"
```

### Change File Size Limits
Edit `newsValidation.js`:
```javascript
const maxSize = 50 * 1024 * 1024;  // 50MB instead of 100MB
```

## 🚀 Performance Tips

1. **Lazy Load Images**: Add lazy loading attribute to img tags
2. **Optimize Videos**: Use appropriate video formats (MP4, WebM)
3. **Pagination**: Implement pagination for large news lists
4. **Caching**: Cache API responses with React Query or SWR
5. **Code Splitting**: Lazy load NewsForm with React.lazy()

## 🧪 Testing

### Test Cases
- [ ] Form submission with title only
- [ ] Form submission with image
- [ ] Form submission with video
- [ ] Delete confirmation dialog
- [ ] Media preview modal
- [ ] Responsive layout on mobile
- [ ] Responsive layout on tablet
- [ ] Responsive layout on desktop

## 🐛 Troubleshooting

### Form not appearing
- Check if `showForm` state is true
- Verify `z-[100]` isn't being overridden
- Check for CSS conflicts

### Media preview not loading
- Verify file type is supported
- Check file size limits
- Ensure FileReader API is working

### Grid not responsive
- Verify Tailwind CSS breakpoints are configured
- Check browser viewport settings
- Clear CSS cache

## 📚 Related Files
- Route: `/kaligard-dashboard/news` (AppRoutes.jsx)
- Service: `newsService.js` (API calls)
- Hook: `useNewsManager.js` (State management)
- Validation: `newsValidation.js` (Form validation)

---
**Last Updated**: May 6, 2026
**Version**: 1.0.0
