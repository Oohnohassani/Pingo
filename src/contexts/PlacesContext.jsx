import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { BASE_URL, X_Master_Key } from "../servers/servers";

// 1. Create context
const PlacesContext = createContext();

// Initial State
const initialState = {
  places: [],
  isLoading: false,
  error: "",
  currentActivePlace: {},
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "error":
      return { ...state, error: action.payload, isLoading: false };

    case "data/loaded":
      return {
        ...state,
        isLoading: false,
        // places: [...state.places, action.payload],
        places: action.payload,
      };

    case "data/uploaded":
      return {
        ...state,
        places: [...state.places, action.payload],
        isLoading: false,
      };

    case "data/deleted":
      return {
        ...state,
        places: state.places.filter((place) => place.id !== action.payload),
        isLoading: false,
      };

    case "set/activePlace":
      return { ...state, currentActivePlace: action.payload, isLoading: false };

    default:
      throw new Error("Unkonwn action");
  }
}

// 2. Provide context
function PlacesProvider({ children }) {
  // State 🧠
  const [state, dispatch] = useReducer(reducer, initialState);
  const { places, isLoading, error, currentActivePlace } = state;

  // Effect 🌀
  useEffect(function () {
    // 1. Fetch API Data
    async function fetchDate() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/latest`, {
          headers: {
            "X-Master-Key": X_Master_Key,
          },
        });
        const data = await res.json();

        // Access your array under data.record.places
        dispatch({ type: "data/loaded", payload: data.record.places });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
        console.error(err.message);
      }
    }

    // Call the asyn function
    fetchDate();
  }, []); // Runs once on mount!

  // Add a new place to the API
  const addNewPlace = useCallback(async function addNewPlace(newPlace) {
    dispatch({ type: "loading" });
    try {
      // 1. Get current array
      const getRes = await fetch(`${BASE_URL}/latest`, {
        headers: { "X-Master-Key": X_Master_Key },
      });
      const currentData = await getRes.json();
      const currentPlaces = currentData.record.places;

      // 2. Append new place
      const updatedPlaces = [...currentPlaces, newPlace];

      // 3. PUT updated array back
      const putRes = await fetch(BASE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": X_Master_Key,
        },
        body: JSON.stringify({ places: updatedPlaces }),
      });

      if (!putRes.ok) throw new Error("Failed to upload new place");

      // Update state
      dispatch({ type: "data/uploaded", payload: newPlace });
      dispatch({ type: "set/activePlace", payload: newPlace });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
      console.error(err);
    }
  }, []);

  // Delete place
  const deletePlace = useCallback(async function deletePlace(id) {
    dispatch({ type: "loading" });
    try {
      // 1. Get current array
      const getRes = await fetch(`${BASE_URL}/latest`, {
        headers: { "X-Master-Key": X_Master_Key },
      });
      const currentData = await getRes.json();
      const currentPlaces = currentData.record.places;

      // 2. Remove the place
      const updatedPlaces = currentPlaces.filter((p) => p.id !== id);

      // 3. PUT updated array
      const putRes = await fetch(BASE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": X_Master_Key,
        },
        body: JSON.stringify({ places: updatedPlaces }),
      });

      if (!putRes.ok) throw new Error("Failed to delete place");

      // Update state
      dispatch({ type: "data/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
      console.error(err);
    }
  }, []);

  // Get current place to display it's info
  const getPlace = useCallback(async function getPlace(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/latest`, {
        headers: { "X-Master-Key": X_Master_Key },
      });
      const data = await res.json();
      const place = data.record.places.find((p) => p.id === id);
      if (!place) throw new Error("Place not found!");

      dispatch({ type: "set/activePlace", payload: place });
      return place;
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
      console.error(err);
    }
  }, []);

  const value = useMemo(
    function () {
      return {
        places,
        isLoading,
        error,
        addNewPlace,
        deletePlace,
        getPlace,
        currentActivePlace,
      };
    },
    [
      places,
      isLoading,
      error,
      currentActivePlace,
      addNewPlace,
      deletePlace,
      getPlace,
    ],
  );

  return (
    <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>
  );
}

// 3. Consume context - Encapsulation 💊
const usePlaces = function () {
  const context = useContext(PlacesContext);

  if (!context || context === undefined)
    throw new Error("Places context is being used outside it's provider");

  return context;
};

export { PlacesProvider, usePlaces };
