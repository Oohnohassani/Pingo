Here is a **visual architecture diagram** for the **Pingo📌 app** (the WorldWise-style project).
This will help you understand **how React Router, Context API, and Leaflet interact**.

### TravelPin App Architecture Diagram

```text
                         App
                          │
                          │
                    BrowserRouter
                          │
                          │
                     Routes
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
     Homepage                             Login
        │                                   │
        │                                   │
        │                          AuthContext (login/logout)
        │                                   │
        │                                   │
        └──────────────► ProtectedRoute ◄───┘
                               │
                               │
                           /app/*
                               │
                          AppLayout
                 ┌─────────────┴─────────────┐
                 │                           │
              Sidebar                        Map
                 │                           │
                 │                     Leaflet Map
                 │                           │
                 │                     Click Event
                 │                           │
                 │                  navigate("/app/form?lat&lng")
                 │
                 │
        ┌────────┴─────────┐
        │                  │
      Cities             Countries
        │                  │
        │                  │
   CityList            CountryList
        │
        │
   CityItem
        │
        │
 /app/cities/:id
        │
        │
      City Page
        │
        │
   LocationsContext
        │
        │
   cities[]
   selectedCity
   addCity()
   deleteCity()
        │
        │
      Form Page
/app/form?lat=...&lng=...
        │
        │
   useSearchParams()
        │
        │
   Add new city
        │
        │
     Update Map Marker
```

### How Data Flows in the App

### 1. Authentication Flow

```text
Login Page
     │
     ▼
AuthContext.login()
     │
     ▼
isAuthenticated = true
     │
     ▼
ProtectedRoute allows access
     │
     ▼
User enters /app
```

If not authenticated:

```text
ProtectedRoute
      │
      ▼
Navigate("/login")
```

### 2. Map → Form Flow

User clicks the map.

```text
Leaflet Map Click
       │
       ▼
Get coordinates
       │
       ▼
navigate("/app/form?lat=...&lng=...")
       │
       ▼
Form reads URL params
       │
       ▼
useSearchParams()
```

Example URL:

```text
/app/form?lat=48.85&lng=2.35
```

### 3. Adding a City

```text
Form Submit
     │
     ▼
LocationsContext.addCity()
     │
     ▼
cities state updates
     │
     ▼
CityList re-renders
     │
     ▼
New marker appears on map
```

### 4. Selecting a City

Click city in sidebar.

```text
CityItem click
      │
      ▼
navigate("/app/cities/:id")
      │
      ▼
City Page
      │
      ▼
useParams()
      │
      ▼
LocationsContext.getCity()
      │
      ▼
Display city details
```

### Router Structure (Very Important)

```text
/
├── /
│   └── Homepage
│
├── /login
│   └── Login Page
│
└── /app  (Protected)
    │
    ├── /app/cities
    │     └── Cities Page
    │
    ├── /app/cities/:id
    │     └── City Page
    │
    ├── /app/countries
    │     └── Countries Page
    │
    └── /app/form
          └── Add City Form
```

### Component Hierarchy

```text
App
 │
 ├── AuthContextProvider
 │
 ├── LocationsContextProvider
 │
 └── Router
      │
      ├── Homepage
      ├── Login
      │
      └── ProtectedRoute
           │
           └── AppLayout
                │
                ├── Sidebar
                │    ├── CityList
                │    └── CountryList
                │
                └── Map
```

### Where React Router Hooks Are Used

| Hook            | Where            |
| --------------- | ---------------- |
| useNavigate     | login, map click |
| useParams       | city page        |
| useSearchParams | form page        |
| Outlet          | AppLayout        |

### Where Context Is Used

### AuthContext

```text
Login Page
ProtectedRoute
Navbar
```

### LocationsContext

```text
CityList
City Page
Form
Map
```

### Visual Mental Model

You can think of the app like this:

```text
          Router
            │
            ▼
       Protected App
            │
     ┌──────┴──────┐
     │             │
  Sidebar         Map
     │             │
     ▼             ▼
 City Data     Map Markers
     │             │
     └──────► Shared Context
```

Context acts like a **central brain** 🧠 that both the **sidebar and map share**.
