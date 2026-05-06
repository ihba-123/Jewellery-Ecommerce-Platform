# 🔗 Component Architecture & Data Flow

## Component Hierarchy

```
KaligardNews.jsx (Main Page)
├── State Management
│   ├── newsItems[]
│   ├── showForm (boolean)
│   ├── previewItem (object)
│   └── toastMessage (string)
│
├── Callbacks
│   ├── handleAddNews()
│   ├── handleDeleteNews()
│   ├── handleViewMedia()
│   └── showToast()
│
├── NewsHeader ─────────────────> Add Button Click
│   ├── title: "NEWS & INFO"
│   ├── subtitle
│   ├── onAddClick callback
│   └── totalPosts (optional)
│
├── NewsForm (Modal) ────────── Conditional Render
│   ├── Form State
│   │   ├── title
│   │   ├── description
│   │   ├── type (text/image/video)
│   │   ├── mediaFile
│   │   └── mediaPreview
│   ├── Props
│   │   ├── onSubmit(formData)
│   │   ├── onCancel()
│   │   └── isLoading
│   └── Methods
│       ├── handleChange()
│       ├── handleTypeChange()
│       ├── handleMediaChange()
│       └── handleSubmit()
│
├── EmptyNewsState ─────────── Conditional Render
│   ├── Icon: Megaphone
│   ├── Title: "NO NEWS POSTED"
│   └── Message
│
├── NewsGrid ────────────────── Conditional Render
│   ├── Props
│   │   ├── items[]
│   │   ├── onDelete()
│   │   └── onView()
│   │
│   └── Maps to NewsCard[]
│       └── NewsCard x N
│           ├── item (object)
│           ├── Props
│           │   ├── onDelete(id)
│           │   └── onView(item)
│           ├── Displays
│           │   ├── Media Preview (img/video/text)
│           │   ├── Hover Overlay
│           │   ├── Action Buttons
│           │   ├── Type Badge
│           │   └── Date
│           └── Hover Effects
│               ├── Scale animation
│               ├── Overlay appears
│               └── Action buttons visible
│
└── MediaPreviewModal ────────── Conditional Render
    ├── Props
    │   ├── item (object)
    │   └── onClose()
    ├── Displays
    │   ├── Full-screen media (img/video)
    │   ├── Item details
    │   ├── Close button
    │   └── Metadata
    └── Features
        ├── Video controls
        ├── Image display
        └── Info panel
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│            KaligardNews.jsx (Main Container)                │
└─────────────────────────────────────────────────────────────┘
        │
        ├─────────────────────────────────────────────────────┐
        │                                                     │
    ┌───▼────┐                                           ┌──▼──┐
    │ Header │◄───────── onAddClick() ──────────────────┤Form?│
    │ "NEWS  │           setShowForm(true)              └──┬──┘
    │  INFO" │                                             │
    └────────┘                                             │
        │                                            [Modal Opens]
        │                                                   │
        │                                            ┌──────▼──────┐
        │                                            │ NewsForm    │
        │                                            │ Modal       │
        │                                            │ ┌────────┐  │
        │                                            │ │TITLE   │  │
        │                                            │ │MEDIA   │  │
        │                                            │ │DESC    │  │
        │                                            │ │UPLOAD  │  │
        │                                            │ │BUTTONS │  │
        │                                            │ └────────┘  │
        │                                            └────┬────────┘
        │                                                 │
        │                                          onSubmit(formData)
        │                                                 │
    ┌───▼──────────────────────────────────────────────┐ │
    │          newsItems[] ◄─────────────────────────────┘
    │  (Array of news objects)
    │  [{id, title, desc, type, imageUrl, videoUrl, date}, ...]
    └───┬──────────────────────────────────────────────┐
        │                                              │
    [Empty?]                                      [Has Items?]
        │                                              │
    ┌───▼────────────┐                        ┌───────▼─────┐
    │ EmptyNewsState │                        │  NewsGrid   │
    │ "NO NEWS       │                        │  (Responsive)
    │  POSTED"       │                        └───────┬─────┘
    └────────────────┘                                │
                                      ┌───────────────┼───────────────┐
                                      │               │               │
                                   ┌──▼──┐         ┌──▼──┐        ┌──▼──┐
                                   │Card1│         │Card2│        │Card3│
                                   │     │         │     │        │     │
                                   └──┬──┘         └──┬──┘        └──┬──┘
                                      │               │             │
                              [Hover effects]  [Hover effects]  [Hover effects]
                                      │               │             │
                            ┌─────────┴─────────┐     │             │
                            │                   │     │             │
                       View Button         Delete Button
                            │                   │
                    onView(item)         onDelete(id)
                            │                   │
                       [Preview Modal]   [Confirmation]
                            │                   │
                       ┌────▼──────┐      ┌────▼──────┐
                       │MediaPreview│      │Remove Item│
                       │Modal       │      │Update List│
                       │(Full screen)│      │Toast Msg  │
                       └────────────┘      └───────────┘
```

---

## State Management Flow

```
Initial State:
┌─────────────────────────────────┐
│ newsItems: []                   │
│ showForm: false                 │
│ previewItem: null               │
│ toastMessage: ""                │
│ isSubmitting: false             │
└─────────────────────────────────┘
        │
        ▼
User clicks "ADD NEWS/MEDIA"
        │
        ▼
handleAddClick()
        │
        ├─► setShowForm(true)
        │
        └─► NewsForm Modal Displays
                │
                ▼
        User fills form and clicks "POST NEWS"
                │
                ▼
        handleAddNews(formData)
                │
                ├─► setIsSubmitting(true)
                ├─► Process formData
                ├─► Create newItem object
                ├─► setNewsItems([newItem, ...prev])
                ├─► setShowForm(false)
                ├─► setIsSubmitting(false)
                ├─► showToast("Success!")
                │
                └─► State Updated
                    ┌─────────────────────────────┐
                    │ newsItems: [newItem, ...]   │
                    │ showForm: false             │
                    │ toastMessage: "Success"     │
                    │ isSubmitting: false         │
                    └─────────────────────────────┘
                            │
                            ▼
                    Grid Re-renders
                    Cards Display
```

---

## Event Handler Chain

```
NewsHeader
  └─► Button onClick
      └─► onAddClick()
          └─► setShowForm(true)
              └─► NewsForm Renders

NewsForm
  ├─► Input onChange
  │   └─► handleChange()
  │       └─► setFormData({...formData, [name]: value})
  │
  ├─► Type Button onClick
  │   └─► handleTypeChange(type)
  │       └─► setFormData({type: value, mediaFile: null, ...})
  │
  ├─► Media Upload onChange
  │   └─► handleMediaChange()
  │       └─► FileReader
  │           └─► setFormData({mediaFile: file, mediaPreview: base64})
  │
  ├─► Form onSubmit
  │   └─► handleSubmit()
  │       └─► Validate
  │           └─► onSubmit(formData)
  │               └─► handleAddNews()
  │                   └─► setNewsItems([newItem, ...])
  │                       └─► UI Updates
  │
  └─► Cancel Button onClick
      └─► onCancel()
          └─► setShowForm(false)
              └─► Modal Closes

NewsCard
  ├─► Hover
  │   └─► CSS :hover
  │       └─► Overlay appears
  │
  ├─► Eye Button onClick
  │   └─► onView(item)
  │       └─► handleViewMedia(item)
  │           └─► setPreviewItem(item)
  │               └─► MediaPreviewModal Renders
  │
  └─► Trash Button onClick
      └─► onDelete(id)
          └─► handleDeleteNews(id)
              └─► Confirm Dialog
                  └─► setNewsItems(filtered)
                      └─► showToast("Deleted")
                          └─► Grid Updates

MediaPreviewModal
  └─► Close Button onClick
      └─► onClose()
          └─► handleClosePreview()
              └─► setPreviewItem(null)
                  └─► Modal Closes
```

---

## Props Drilling Path

```
KaligardNews.jsx
│
├─► NewsHeader
│   ├─ onAddClick: (function)
│   └─ totalPosts: (number) [optional]
│
├─► NewsForm
│   ├─ onSubmit: (function)
│   ├─ onCancel: (function)
│   └─ isLoading: (boolean)
│
├─► NewsGrid
│   ├─ items: (array)
│   ├─ onDelete: (function)
│   └─ onView: (function)
│       │
│       └─► NewsCard (x N)
│           ├─ item: (object)
│           ├─ onDelete: (function)
│           └─ onView: (function)
│
└─► MediaPreviewModal
    ├─ item: (object)
    └─ onClose: (function)
```

---

## API Integration Points

```
KaligardNews.jsx
│
├─► Load Initial Data (useEffect - optional)
│   └─► newsService.fetchNews()
│       └─► GET /api/kaligard/news
│           └─► setNewsItems(response)
│
├─► Add News
│   └─► handleAddNews(formData)
│       └─► newsService.createNews(formData)
│           └─► POST /api/kaligard/news
│               └─► Returns: newItem
│                   └─► setNewsItems([newItem, ...])
│
├─► Delete News
│   └─► handleDeleteNews(id)
│       └─► newsService.deleteNews(id)
│           └─► DELETE /api/kaligard/news/{id}
│               └─► Returns: success
│                   └─► setNewsItems(filtered)
│
└─► Update News (Future)
    └─► handleUpdateNews(id, updates)
        └─► newsService.updateNews(id, updates)
            └─► PUT /api/kaligard/news/{id}
                └─► Returns: updatedItem
                    └─► setNewsItems(updated)
```

---

## Responsive Layout Transformation

```
SM (640px) - Mobile
┌─────────────────┐
│  HEADER         │
├─────────────────┤
│  [Form Modal]   │
├─────────────────┤
│  CARD 1         │  [1 column]
│  (Full width)   │
├─────────────────┤
│  CARD 2         │
│  (Full width)   │
├─────────────────┤
│  CARD 3         │
│  (Full width)   │
└─────────────────┘
        ▼
MD (768px) - Tablet
┌─────────────────────────────┐
│  HEADER                     │
├──────────────┬──────────────┤
│  CARD 1      │  CARD 2      │  [2 columns]
├──────────────┼──────────────┤
│  CARD 3      │  CARD 4      │
├──────────────┴──────────────┤
│  [Form Modal]               │
└─────────────────────────────┘
        ▼
LG (1024px) - Desktop
┌─────────────────────────────────────┐
│  HEADER                             │
├──────────────┬──────────────┬───────┤
│  CARD 1      │  CARD 2      │CARD 3 │  [3 columns]
├──────────────┼──────────────┼───────┤
│  CARD 4      │  CARD 5      │CARD 6 │
├──────────────┴──────────────┴───────┤
│  [Form Modal - Centered]            │
└─────────────────────────────────────┘
        ▼
XL (1280px) - Large
┌──────────────────────────────────────────────┐
│  HEADER                                      │
├────────┬────────┬────────┬────────┐
│ CARD 1 │ CARD 2 │ CARD 3 │ CARD 4 │  [4 columns]
├────────┼────────┼────────┼────────┤
│ CARD 5 │ CARD 6 │ CARD 7 │ CARD 8 │
├────────┴────────┴────────┴────────┤
│  [Form Modal - Centered, Max Width]│
└──────────────────────────────────────────────┘
```

---

## CSS Class Organization

```
Layout Classes (Responsive):
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
  gap-4 sm:gap-5 lg:gap-6
  p-6 sm:p-8 lg:p-10

Typography Classes:
  text-3xl sm:text-4xl lg:text-5xl
  font-bold sm:font-black
  text-white/80 (opacity)

Spacing Classes:
  px-4 sm:px-6 lg:px-8
  py-3 sm:py-4 lg:py-5
  space-y-6 sm:space-y-8

Interaction Classes:
  hover:bg-white/12
  transition-all duration-200
  focus:outline-none focus:ring-2
  disabled:opacity-50

Responsive Visibility:
  sm:hidden (hide on small)
  md:block (show on medium)
  lg:text-lg (large text on large screens)
```

---

## Performance Optimization

```
Memoization:
  ├─ useCallback(handleAddNews, [showToast])
  ├─ useCallback(handleDeleteNews, [showToast])
  ├─ useCallback(handleViewMedia, [])
  └─ useCallback(handleClosePreview, [])

Efficient Updates:
  ├─ Only state that changes is updated
  ├─ Arrays use immutable patterns
  ├─ No unnecessary re-renders
  └─ Conditional rendering

Component Re-render Prevention:
  ├─ NewsCard: Only re-renders when item changes
  ├─ NewsGrid: Only re-renders when items array changes
  ├─ NewsHeader: Only re-renders when totalPosts changes
  └─ Form: Only re-renders on controlled input changes
```

---

**Architecture created with focus on:**
- ✅ Single Responsibility Principle
- ✅ DRY (Don't Repeat Yourself)
- ✅ Component Reusability
- ✅ Efficient Data Flow
- ✅ Optimal Performance
- ✅ Clean Code Structure
