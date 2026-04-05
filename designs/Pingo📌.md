In this project we will practice:

- React Router
- Context API
- Leaflet maps
- Protected routes
- Dynamic routes
- Data fetching
- Forms
- URL search params
- Authentication
- Third party libraries like leaflet, Tippy and Draggable

I’ll structure it like a **mini project spec** so you can build it step-by-step.

### Project: Pingo📌🌍

A **map-based travel journal** where users can pin places they’ve visited and store notes about them.

Users can:

- Click on the map
- Add a location
- Save memories
- View locations in a sidebar
- Navigate between places

Very similar to **WorldWise**, but with a few extra ideas.

The map will use **Leaflet**.

### Main Concepts You Will Practice

### React Router

You will practice:

- BrowserRouter
- Nested routes
- Dynamic routes
- useNavigate
- useParams
- useSearchParams
- Protected routes
- Outlet

### Context API

You will create:

1. Auth Context
2. Locations Context

### App Layout

Basic layout:

```
src
 ├─ pages
 │   ├─ Homepage
 │   ├─ Login
 │   ├─ AppLayout
 │   ├─ Cities
 │   ├─ City
 │   ├─ Countries
 │   ├─ Form
 │
 ├─ components
 │   ├─ Map
 │   ├─ Sidebar
 │   ├─ CityList
 │   ├─ CountryList
 │   ├─ CityItem
 │
 ├─ contexts
 │   ├─ AuthContext
 │   ├─ LocationsContext
 │
 ├─ routes
 │   └─ ProtectedRoute
```

### Pages You Will Build

### 1. Homepage

Route:

```
/
```

Landing page explaining the app.

Button:

```
Start Tracking
```

Navigate to login.

You will use:

```
useNavigate()
```

### 2. Login Page

Route:

```
/login
```

Fake authentication.

Use:

```
AuthContext
```

State:

```
isAuthenticated
```

After login:

```
navigate("/app", { replace: true })
```

### Protected Routes

The entire app should be protected.

Example:

```
/app/*
```

If user not logged in:

```
redirect → /login
```

You will implement:

```
ProtectedRoute
```

### App Layout

Route:

```
/app
```

Layout contains:

```
Sidebar | Map
```

You will use:

```
Outlet
```

Example:

```jsx
function AppLayout() {
  return (
    <div className="app">
      <Sidebar />
      <Map />
      <Outlet />
    </div>
  );
}
```

### Cities Page

Route:

```
/app/cities
```

Displays a list of cities the user visited.

Example:

```
Lisbon 🇵🇹
Paris 🇫🇷
Tokyo 🇯🇵
```

Each city is clickable.

Clicking a city goes to:

```
/app/cities/:id
```

### City Page (Dynamic Route)

Route:

```
/app/cities/:id
```

Use:

```
useParams()
```

Example URL:

```
/app/cities/5
```

Show:

```
City name
Country
Notes
Date visited
```

### Countries Page

Route:

```
/app/countries
```

Shows countries grouped from cities.

Example:

```
Portugal
France
Japan
```

### Add City Form

Route:

```
/app/form
```

Users add a new city.

Fields:

```
City name
Country
Date
Notes
```

Coordinates come from the map.

### Map Integration

You will use **Leaflet**.

Example library:

```
react-leaflet
```

Install:

```
npm install leaflet react-leaflet
```

The map will:

- Show markers
- Detect clicks
- Store coordinates

When clicking map:

```
navigate("/app/form?lat=...&lng=...")
```

### Using Search Params

Example URL:

```
/app/form?lat=52.5&lng=13.4
```

Use:

```
useSearchParams()
```

Example:

```javascript
const [searchParams] = useSearchParams();

const lat = searchParams.get("lat");
const lng = searchParams.get("lng");
```

Now your form knows **where the user clicked on the map**.

### Context API

### Auth Context

Manages login state.

Example state:

```
isAuthenticated
user
login()
logout()
```

Used by:

```
ProtectedRoute
Navbar
Login page
```

### Locations Context

Stores all locations.

Example state:

```
cities
selectedCity
isLoading
```

Functions:

```
getCity()
addCity()
deleteCity()
```

Used by:

```
CityList
City
Map
Form
```

### Map Markers

Every saved city should appear as a marker.

Example:

```
📍 Paris
📍 Lisbon
📍 Tokyo
```

Clicking a marker should navigate to:

```
/app/cities/:id
```

You will use:

```
useNavigate()
```

### Extra Features (Optional)

These make the project **more advanced than WorldWise**.

### Filter cities

Example:

```
/app/cities?country=Portugal
```

Use:

```
useSearchParams
```

### Delete city

Button:

```
Delete
```

Removes the city.

### Fly to location

When clicking a city:

```
map.flyTo()
```

Map moves smoothly.

---

### Skills You Will Practice

By building this project you will master:

React Router:

```
BrowserRouter
Routes
Route
Outlet
Link
NavLink
useNavigate
useParams
useSearchParams
Protected Routes
```

Context API:

```
createContext
useContext
global state
```

Maps:

```
Leaflet
markers
coordinates
map events
```

State architecture:

```
multiple contexts
shared state
```

### Bonus Challenge (Highly Recommended)

Add **favorite places ⭐**

Users can mark locations as favorites.

New route:

```
/app/favorites
```

Filter cities from context.

### What This Project Teaches

This project is extremely valuable because it combines:

- routing
- global state
- real UI interactions
- map libraries
- URL state
- protected routes

These are **real production skills**.
