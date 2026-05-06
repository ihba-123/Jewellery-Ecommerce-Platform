# News & Media Management Component Documentation

## Folder Structure

```
kaligard/dashboard/
├── components/
│   └── news/
│       ├── NewsHeader.jsx          # Header with title and "Add" button
│       ├── NewsForm.jsx             # Modal form for adding news/media
│       ├── NewsCard.jsx             # Individual news card component
│       ├── NewsGrid.jsx             # Grid layout for news items
│       └── MediaPreviewModal.jsx   # Full-screen media preview
├── hooks/
│   └── useNewsManager.js            # Custom hook for news state management
├── services/
│   ├── newsService.js              # API calls for news operations
│   └── newsValidation.js           # Form validation utilities
└── pages/
    └── KaligardNews.jsx             # Main page component
```

## Component Overview

### NewsHeader
Displays the page title, subtitle, and "Add News/Media" button.
- Responsive text sizing (sm, md, lg, xl)
- White call-to-action button

### NewsForm (Modal)
Form to add new news items with media uploads.
- Supports: Images, Videos, and Text Updates
- Media preview before submission
- Form validation
- File size limitations

### NewsCard
Individual news/media card component.
- Responsive grid layout
- Media preview with hover effects
- Quick actions (view, delete)
- Date and type badges

### NewsGrid
Responsive grid layout for displaying news items.
- 1 column on mobile (sm)
- 2 columns on tablet (sm-lg)
- 3 columns on desktop (lg)
- 4 columns on large screens (xl)

### MediaPreviewModal
Full-screen media viewer with controls.
- Image viewing
- Video playback with controls
- Item details and metadata

### EmptyNewsState
Placeholder component shown when no news items exist.
- Icon and messaging
- Encourages user to add content

## Features

✅ Responsive Design (sm, md, lg, xl)
✅ Image and Video Support
✅ Text Updates
✅ Add/Edit/Delete Operations
✅ Media Preview
✅ Toast Notifications
✅ Form Validation
✅ API Integration Ready

## Usage

The main page component handles all state management:

```javascript
import KaligardNews from '../../features/kaligard/dashboard/pages/KaligardNews';

// Use in your routing
<Route path="/kaligard-dashboard/news" element={<KaligardNews />} />
```

## Breakpoints

- **sm**: 640px - Mobile devices
- **md**: 768px - Tablets
- **lg**: 1024px - Small desktops
- **xl**: 1280px - Large desktops

## API Integration

The `newsService.js` provides methods for:
- `fetchNews()` - Get all news items
- `createNews()` - Add new news
- `updateNews()` - Modify existing news
- `deleteNews()` - Remove news items
- `uploadMedia()` - Upload media files

## Validation

The `newsValidation.js` provides:
- Form data validation
- Media file type checking
- File size validation

## Customization

### Modify Card Grid Columns
Edit `NewsGrid.jsx` line with grid-cols classes:
```jsx
lg:grid-cols-3 xl:grid-cols-4  // Change these values
```

### Change File Size Limits
Edit `newsValidation.js`:
```javascript
const maxSize = 100 * 1024 * 1024; // Adjust this value
```

### Add Custom Media Types
Extend validation in `newsValidation.js`:
```javascript
const validTypes = ['image/jpeg', 'image/png', /* add more */];
```
