// Import 📩
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "./Button";
import styles from "./DataForm.module.css";
import Logo from "./Logo";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { v4 as uuidv4 } from "uuid";

import { BASE_URL_REVERSE } from "../utils/server";
import { convertToEmoji } from "../utils/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usePlaces } from "../contexts/PlacesContext";

function DataForm({ showForm, setShowForm }) {
  // State 🧠
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [country, setCountry] = useState("");

  // Search prams
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // console.log(lat, lng);

  // Consume context
  const { addNewPlace } = usePlaces();

  // Navigate
  const navigate = useNavigate();

  // Helpers ⚕️

  // Add a new place
  async function handleSubmit(e) {
    e.preventDefault();

    // 1. Guard clause
    if (!place || !date || !notes) return;

    // 2. Create an object
    const newObject = {
      placeName: place,
      country: country,
      emoji: emoji,
      date: date,
      notes: notes,
      position: {
        lat: lat,
        lng: lng,
      },
      id: uuidv4(), // generates a unique ID like "9b1deb4d-5b14-488a-9f45-bc6a3c3f6a89"
    };

    // console.log(newObject);

    // 3. Upload it to the API
    await addNewPlace(newObject);

    // 4. Clear inputs
    setDate("");
    setCountry("");
    setPlace("");
    setNotes("");
    setEmoji("");

    // Reset URL and prams
    navigate("/app/places", { replace: true }); // Reset the URL and clear params here

    // Hide form
    setShowForm(false);
  }

  // Get clicked place through lat and lng and reverse geocoding
  useEffect(
    function () {
      // This effect should only run if lat and lng exist!
      if (!lat || !lng) return;

      async function getPlace() {
        try {
          const res = await fetch(
            `${BASE_URL_REVERSE}latitude=${lat}&longitude=${lng}`,
          );
          const data = await res.json();

          // console.log(data);

          // Set states
          setPlace(data.city || data.locality);
          setEmoji(convertToEmoji(data.countryCode));
          setCountry(data.countryName);
        } catch (err) {
          console.error(err.message);
        }
      }

      getPlace();
    },
    [lat, lng],
  );

  // Clear and reset states if form is hidden
  useEffect(
    function () {
      if (!showForm) {
        setDate("");
        setCountry("");
        setPlace("");
        setNotes("");
        setEmoji("");
      }
    },
    [showForm, navigate],
  );

  return (
    <div className={styles.dataFormWrapper}>
      <Tippy content="Draggable form" className={styles.formTooltip}>
        <div className={`${styles.dataFormLogo} drag-handle`}>
          <Logo width="8rem" cursor="grabbing" />
        </div>
      </Tippy>

      <form className={styles.dataForm} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.inputs}>
          <label>
            Place name
            <div className={styles.inputWithEmoji}>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
              {emoji && <span>{emoji}</span>}
            </div>
          </label>

          <label>
            When did you visit {place || "this place?"}?
            {/* <input
              id={styles.date}
              type="text"
              placeholder="e.g; Sat July 4 2025"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            /> */}
            <DatePicker
              id={styles.date}
              placeholder="e.g; Sat July 4 2025"
              selected={date}
              onChange={(date) => setDate(date)}
            />
          </label>

          <label>
            Notes about your visit to {place || "this place"}?
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
        </div>

        <div className={styles.dataFormBtns}>
          <Button type={"submit"} className={styles.add}>
            Add
          </Button>

          <button
            type={"button"}
            className={styles.back}
            onClick={(e) => {
              e.preventDefault();

              // Open in current page
              // window.location.href = "https://www.github.com";

              // Open on a different page
              window.open(
                "https://github.com/Oohnohassani",
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            Learn more &#8599;
          </button>
        </div>
      </form>
    </div>
  );
}

export default DataForm;
