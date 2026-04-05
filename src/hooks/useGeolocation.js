// Imports 📩
import { useState, useEffect } from "react";

// Custom hook 🪝
export function useGeolocation(defaultPosition = null) {
  // State 🧠
  const [geoLocationPosition, setGeoLocationPosition] =
    useState(defaultPosition);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Effects 🌀
  useEffect(
    function () {
      // Async function
      async function geoPosition() {
        try {
          // Set isLoading state to true
          setIsLoading(true);

          // Promisify geolocation api
          const getLocation = function () {
            return new Promise(function (resolve, reject) {
              navigator.geolocation.getCurrentPosition(
                function (success) {
                  resolve(success);
                },
                function (err) {
                  reject(err);
                },
              );

              // resolve("Resolved code goes here..."); // Success
              // console.log("Does this run? yes it does :)");
              // reject("Rejected code goes here..."); // Errors
              // console.log("Does this run too? yes it does :)");
            });
          };

          const data = await getLocation();
          const { latitude: lat, longitude: lng } = data.coords;
          // console.log(lat, lng);

          setGeoLocationPosition([lat, lng]);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          // console.log("This code is executed no matter what! 😁🎉");
          setIsLoading(false);
        }
      }

      // Call the asyn function
      geoPosition(); // [lat, lng]
    },

    [], // runs once on mount
  );

  // Return the states
  return { geoLocationPosition, error, isLoading };
}

/* Note:

  Dependency arrays in useEffect:

  1. [] 
     - Empty array
     - Effect runs ONLY once (after first render / mount).
  
  2. [value] 
     - Effect runs after first render AND 
       every time "value" changes.
  
  3. No array 
     - Effect runs after EVERY render (mount + updates).
     - ⚠️ Can easily cause performance issues if heavy logic is inside.

*/
