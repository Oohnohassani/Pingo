import { useState } from "react";
import styles from "./FAQ.module.css";

// DEMO
const faq = [
  {
    question: "What is Pingo?",
    answer:
      "Pingo is a travel tracking app that lets you record your journeys, drop pins on places you visit, and add personal notes to remember each location. It helps you build a visual map of your adventures.",
    id: 1,
    isActive: false,
  },
  {
    question: "How do I track my travels with Pingo?",
    answer:
      " Simply open the app and start exploring. When you visit a place, you can add a pin on the map and attach notes, photos, or memories so you can revisit them later.",
    id: 2,
    isActive: false,
  },
  {
    question: "Can I add notes to the places I visit?",
    answer:
      "Yes! Every pin you drop can include personal notes, so you can write about what you did there, why the place mattered to you, or any travel tips you want to remember.",
    id: 3,
    isActive: false,
  },
  {
    question: "Can I add multiple pins in one trip?",
    answer:
      "Yes! You can add as many pins as you want during your trip. Each pin can represent a place you visited, allowing you to build a complete visual record of your journey.",
    id: 4,
    isActive: false,
  },
  {
    question: "Can I edit my notes after creating a pin?",
    answer:
      "Absolutely. You can edit or update the notes attached to any pin whenever you want, making it easy to add more details or correct information later.",
    id: 5,
    isActive: false,
  },
  {
    question: "Can I delete pins from my map?",
    answer:
      "Yes, you can remove pins at any time. If a location is no longer relevant or was added by mistake, simply delete it from your map.",
    id: 6,
    isActive: false,
  },
  {
    question: "Can I use Pingo to plan future trips?",
    answer:
      "Yes! You can drop pins on places you want to visit and add notes about them. This makes Pingo a great tool for planning upcoming adventures.",
    id: 7,
    isActive: false,
  },
  {
    question: "Does Pingo save my travel history?",
    answer:
      "Yes. Every pin you add stays on your map, allowing you to look back and see all the places you’ve visited over time.",
    id: 8,
    isActive: false,
  },
  {
    question: "Can I view my pins later?",
    answer:
      "Of course. All your pins and notes remain saved in the app, so you can revisit your travel memories whenever you want.",
    id: 9,
    isActive: false,
  },
  {
    question: "Is Pingo only for international travel?",
    answer:
      "Not at all. You can use Pingo to track any place you visit, whether it's a different country, a nearby city, or even a favorite café in your neighborhood.",
    id: 10,
    isActive: false,
  },
  {
    question: "Why should I use Pingo instead of a regular map app?",
    answer:
      "While map apps help you navigate, Pingo focuses on capturing memories. It lets you mark locations and attach personal notes so your map becomes a record of your experiences.",
    id: 11,
    isActive: false,
  },
];

function FAQ() {
  // State 🧠
  const [questions, setQuestions] = useState(faq);
  const [isOpen, setIsOpen] = useState(false);

  function currentQuestion(id) {
    setQuestions((questions) =>
      questions.map((question) =>
        question.id === id
          ? { ...question, isActive: !question.isActive }
          : question,
      ),
    );
  }

  return (
    <div className={styles.faq}>
      <h2>Frequently Asked Questions</h2>

      <div className={styles.faqQuestions}>
        {questions.map((question) => (
          <Question
            question={question}
            key={question.id}
            getQuestion={currentQuestion}
          />
        ))}
      </div>
    </div>
  );
}

function Question({ question, getQuestion }) {
  return (
    <div key={question.id}>
      <div className={styles.question}>
        <div className={styles.faqHeader}>
          <div className={styles.questionTitle}>
            <h5 className={styles.questionNumber}>
              {question.id < 10 ? `0${question.id}` : question.id}
            </h5>
            <h4>{question.question}</h4>
          </div>
          <span
            className={question.isActive ? styles.rotate : ""}
            onClick={() => getQuestion(question.id)}
          >
            {question.isActive ? "-" : "+"}
          </span>
        </div>

        {/* Show text when is open is set to true */}
        <p
          className={`${styles.answer} ${question.isActive ? styles.open : ""}`}
        >
          {question.answer}
        </p>
      </div>
    </div>
  );
}

export default FAQ;
