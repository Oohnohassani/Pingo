// Import 📩
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { FAKE_USER } from "../utils/server";
import { useNavigate } from "react-router-dom";

// 1. Create context
const AuthenticationContext = createContext();

// Initial state
const initialState = {
  // isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  isAuthenticated: false, // FIXME 😭
  isLoading: false,
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "login":
      // localStorage.setItem("isAuthenticated", true); // state persists reloads
      return { ...state, isAuthenticated: true, isLoading: false };

    case "logout":
      // localStorage.setItem("isAuthenticated", false); // state persists through reloads
      return { ...state, isAuthenticated: false, isLoading: false };

    default:
      throw Error("Unknown action...");
  }
}

// 2. Provide context
function AuthenticationProvider({ children }) {
  // State 🧠
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isAuthenticated, isLoading } = state;

  // Navigate
  const navigate = useNavigate();

  // Actions
  const logIn = useCallback(
    function logIn(username, password) {
      dispatch({ type: "loading" });

      // Debugging 🐞
      // console.log(FAKE_USER.username, FAKE_USER.password);

      if (username === FAKE_USER.username && password === FAKE_USER.password) {
        dispatch({ type: "login" });
        navigate("/app", { replace: true }); // Once logged in, The user shouldn't be able to go back to the login page
      } else {
        throw new Error(
          "The username and password DO NOT match the current user!",
        );
      }
    },
    [navigate],
  );

  const logOut = useCallback(
    function logOut() {
      dispatch({ type: "loading" });
      dispatch({ type: "logout" });
      navigate("/");
    },
    [navigate],
  );

  // Memoization
  const value = useMemo(
    function () {
      return { logIn, logOut, isAuthenticated, isLoading };
    },
    [isAuthenticated, isLoading, logIn, logOut],
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}

// 3. Consume context
const useAuth = function () {
  const context = useContext(AuthenticationContext);
  if (context === undefined) throw new Error("User authentication failed 😔");
  return context;
};

export { AuthenticationProvider, useAuth };

// Note: For real world application, you want the 'isAuthenticated' to persist and for that we can use the local storage and only restet the state by logging out, otherwise if you want to reset the 'isAuthenticated' state on page reload, comment out the locat storage states and use the bare reducer states.
