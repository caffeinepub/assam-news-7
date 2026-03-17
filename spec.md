# Assam News 7

## Current State
No existing app (previous build failed).

## Requested Changes (Diff)

### Add
- Professional regional news portal for Assam
- Homepage with breaking news banner, top stories, category sections
- Article detail page
- Categories: Politics, Business, Sports, Entertainment, Technology, Health
- Admin CMS panel (login-protected) to create/edit/delete articles
- HTTP outcalls to periodically fetch latest news headlines from a public RSS/news API and auto-import them
- Search functionality
- Responsive design suitable for news site

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: Articles (title, content, category, author, publishedAt, imageUrl, isBreaking, source), Categories, Admin CRUD, HTTP outcall to fetch RSS news feed periodically
2. Authorization for admin CMS access
3. Frontend: Homepage, Article detail, Category pages, Admin panel, Search
