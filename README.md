# StyleStore E-commerce Application
#Github link - https://github.com/solothink/THRD-Assignment.git

## Implementation Details

### Approach

The application implements a personalized e-commerce experience with the following key architectural decisions:

1. **Authentication-First Design**
   - Implemented a secure authentication system using context-based state management
   - Protected all shopping features behind authentication
   - Persisted user sessions using local storage for seamless experience

2. **Data Management**
   - Utilized Singleton pattern for DataService to ensure consistent data access
   - Implemented CSV parsing for flexible data import
   - Maintained separation between data layer and presentation components

3. **State Management**
   - Used React Context for global state (auth, cart)
   - Implemented custom hooks for local storage synchronization
   - Maintained cart state persistence across sessions

### Product Display Logic

The personalization algorithm works as follows:

1. **Category-Based Sorting**
   - First displays products from categories the user hasn't purchased from
   - Then shows products from previously purchased categories
   - Within each section, products are alphabetically sorted by name

2. **Purchase History Integration**
   - Tracks user's purchase history across sessions
   - Uses historical data to influence product ordering
   - Maintains separate purchase records per user

3. **Cart Management**
   - Persists cart state per user
   - Restores cart items on re-authentication
   - Implements add/remove functionality with instant UI updates

### Additional Features

1. **Luxury UI/UX**
   - Custom color palette focusing on luxury aesthetics
   - Smooth animations using Framer Motion
   - Responsive design for all screen sizes

2. **Search Functionality**
   - Real-time product search with debouncing
   - Searches across product names and categories
   - Visual feedback for search results

3. **User Experience**
   - Toast notifications for user actions
   - Loading states for async operations
   - Error boundaries for graceful error handling

4. **Performance Optimizations**
   - Lazy loading for images
   - Memoized product sorting
   - Efficient state updates using React hooks
