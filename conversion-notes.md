# Record Record React Conversion Notes

## Project Overview

- Original project: SwiftUI app for album collection, details, reviews, and Discogs API integration.
- Target: Modern React (Next.js + Chakra UI) web app.

## Conversion Steps

3. **Rebuild UI components using React and Chakra UI.**
   - Album list, album detail, reviews, etc.

### Suggested Album Components

#### Album List Components

- **AlbumGrid.tsx** – Grid layout for displaying multiple albums.
- **AlbumCard.tsx** – Individual card component for album previews in lists/grids. (Completed)
- **AlbumListItem.tsx** – Alternative list view for albums.

#### Album Detail Components

- **AlbumHeader.tsx** – Shows album title, artist, year, and cover image.
- **TrackList.tsx** – Displays the album's tracklist.
- **AlbumInfo.tsx** – Shows genres, styles, and format information.
- **AlbumCredits.tsx** – Displays artist credits and roles.

#### Album Interaction Components

- **AddToCollectionButton.tsx** – Button to add album to user's collection.
- **AlbumActions.tsx** – Menu or button group for album-related actions.
- **RatingDisplay.tsx** – Show/set album ratings.

#### Album Search Components

- **AlbumSearchBar.tsx** – Search input with filters for finding albums.
- **SearchResults.tsx** – Display component for album search results.
- **FilterControls.tsx** – Filters for year, format, genre, etc.

#### Album Review Components

- **ReviewList.tsx** – List of community reviews.
- **ReviewCard.tsx** – Individual review display.
- **ReviewForm.tsx** – Form for adding/editing reviews.

4. **API Integration:**
   - Use Next.js API routes to proxy Discogs API calls (keeps keys safe, allows custom logic).
   - Example: `/pages/api/albums.ts` for album search/fetch.
5. **State Management:**
   - Use React hooks (`useState`, `useContext`) or Zustand/Redux for larger state needs.
6. **Authentication (if needed):**
   - Use Auth0, Clerk, or NextAuth.js for user login and protected features.
7. **Database (if needed):**
   - MongoDB (with Mongoose) or PostgreSQL (with Prisma) for user data, reviews, collections, etc.
8. **Deployment:**
   - Deploy to Vercel (recommended for Next.js) or Netlify.

---

## Useful Swift File References

- `Models/Album.swift` (see TypeScript above)
- `Models/AlbumDetail.swift`
- `Models/CommunityReview.swift`
- `Services/DiscogsAPI.swift` (API logic to port)
- `ViewModels/AlbumCollectionViewModel.swift` (state management logic)
- `Views/AlbumDetailView.swift`, `AlbumCard.swift`, etc. (UI to React components)

---

## Tips for the New Project

- Use Chakra UI for fast, accessible UI components.
- Keep API keys and secrets out of the frontend—use API routes.
- Modularize code: separate types, components, pages, and API logic.
- Document any custom logic or conversion quirks in this file as you go.

---

## Next Steps

- Reference this file in your new project for context.
- Copy over and adapt models, logic, and UI as needed.
- Update this file with any new conversion notes or decisions.
