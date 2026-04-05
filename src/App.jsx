// Imports 📩
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// import Home from "./pages/Home";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import Form from "./components/Form";
// import AppLayout from "./pages/AppLayout";

// Code splitting
const Home = lazy(() => import("./pages/Home"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Form = lazy(() => import("./components/Form"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

import Places from "./components/Places";
import Countries from "./components/Countries";
import { PlacesProvider } from "./contexts/PlacesContext";
import PlaceInfo from "./components/PlaceInfo";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import KeyboardShortcuts from "./components/KeyboardShortcuts";
import Comingsoon from "./components/Comingsoon";
import PageNotFound from "./pages/PageNotFound";
import LoadingSpinner from "./components/LoadingSpinner";
import ReportABug from "./pages/ReportABug";

// Component 🧩
function App() {
  return (
    <main>
      <BrowserRouter>
        <AuthenticationProvider>
          <PlacesProvider>
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/product" element={<Product />} />
                <Route path="/form" element={<Form />} />
                {/* Nested route */}
                <Route
                  path="/app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* Index route */}
                  {/* <Route index element={<Places />} /> */}
                  <Route index element={<Navigate to="places" replace />} />
                  <Route path="places" element={<Places />} />

                  {/* Dynamic Routes 🎯 */}
                  <Route path="places/:id" element={<PlaceInfo />} />
                  <Route path="countries" element={<Countries />} />
                </Route>
                <Route
                  path="/keyboardshortcuts"
                  element={<KeyboardShortcuts />}
                />
                <Route path="/comingsoon" element={<Comingsoon />} />
                <Route path="/bugreport" element={<ReportABug />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </PlacesProvider>
        </AuthenticationProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
