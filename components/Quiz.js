"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { matchListings } from "../lib/match";
import Rating from "./Rating";
import CopyCode from "./CopyCode";
import AddToWeek from "./AddToWeek";
import { Arrow, Check } from "./Icons";
import s from "./quiz.module.css";

const QUESTIONS = [
  {
    key: "goal", title: "What's your main goal?", options: [
      ["healthy", "Eat healthier", "Best nutritionist ratings first"],
      ["lose", "Lose weight", "Lower-calorie plans"],
      ["muscle", "Build muscle", "High-protein plans"],
      ["time", "Save time", "Ready-made, heat and eat"],
      ["money", "Spend less", "Lowest price per serve"],
    ],
  },
  {
    key: "how", title: "How do you want to eat?", options: [
      ["ready", "Ready-made", "Heat and eat in minutes"],
      ["kit", "Meal kit", "Ingredients and recipes, you cook"],
      ["either", "Either is fine", ""],
    ],
  },
  {
    key: "needs", title: "Any diet needs?", hint: "Tick all that apply", multi: true, options: [
      ["none", "No, anything goes", ""],
      ["veg", "Vegetarian", ""],
      ["vegan", "Vegan", ""],
      ["gf", "Gluten free", ""],
      ["df", "Dairy free", ""],
      ["keto", "Low carb or keto", ""],
      ["halal", "Halal", ""],
    ],
  },
  {
    key: "who", title: "Who are you feeding?", options: [
      ["me", "Just me", ""],
      ["two", "Two of us", ""],
      ["family", "Family of 3 or more", "We'll favour family-size kits"],
    ],
  },
];

function initialAnswers(params) {
  const a = { needs: [] };
  const goal = params.get("goal");
  const diet = params.get("diet");
  if (goal && QUESTIONS[0].options.some(([v]) => v === goal)) a.goal = goal;
  if (diet && QUESTIONS[2].options.some(([v]) => v === diet && v !== "none")) a.needs = [diet];
  return a;
}

export default function Quiz() {
  const params = useSearchParams();
  const [answers, setAnswers] = useState(() => initialAnswers(params));
  const [step, setStep] = useState(() => (initialAnswers(params).goal ? 1 : 0));

  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[step];
  const isAnswered = (question) =>
    question.multi ? answers.needs.length > 0 : Boolean(answers[question.key]);

  function choose(value) {
    if (q.multi) {
      setAnswers((a) => {
        if (value === "none") return { ...a, needs: ["none"] };
        const rest = a.needs.filter((n) => n !== "none");
        const needs = rest.includes(value) ? rest.filter((n) => n !== value) : [...rest, value];
        return { ...a, needs };
      });
      return;
    }
    setAnswers((a) => ({ ...a, [q.key]: value }));
    setStep((n) => n + 1);
  }

  return (
    <div className={s.card}>
      <div className={s.progress} aria-hidden="true">
        {QUESTIONS.map((question, i) => (
          <i key={question.key} className={i <= step ? s.on : undefined} />
        ))}
      </div>
      {done ? (
        <Results
          answers={answers}
          onEdit={() => setStep(QUESTIONS.length - 1)}
          onRestart={() => { setAnswers({ needs: [] }); setStep(0); }}
        />
      ) : (
        <fieldset className={`${s.question} ${s.enter}`} key={step}>
          <legend>
            <span className={s.count}>Question {step + 1} of {QUESTIONS.length}</span>
            <span className={s.title}>{q.title}</span>
            {q.hint && <span className={s.hint}>{q.hint}</span>}
          </legend>
          <div className={q.grid ? s.gridOptions : s.options}>
            {q.options.map(([value, label, sub]) => {
              const selected = q.multi ? answers.needs.includes(value) : answers[q.key] === value;
              return (
                <button
                  key={value}
                  type="button"
                  className={s.option}
                  aria-pressed={selected}
                  onClick={() => choose(value)}
                >
                  <span className={s.optionText}>
                    {label}
                    {sub && <small>{sub}</small>}
                  </span>
                  {q.multi && <span className={s.tick}>{selected && <Check size={14} />}</span>}
                </button>
              );
            })}
          </div>
          <div className={s.nav}>
            <button type="button" className="btn btn-quiet" onClick={() => setStep((n) => n - 1)} disabled={step === 0}>
              Back
            </button>
            {(q.multi || isAnswered(q)) && (
              <button type="button" className="btn" onClick={() => setStep((n) => n + 1)} disabled={!isAnswered(q)}>
                {step === QUESTIONS.length - 1 ? "Show my matches" : "Next"} <Arrow />
              </button>
            )}
          </div>
        </fieldset>
      )}
    </div>
  );
}

function Results({ answers, onEdit, onRestart }) {
  const { results, relaxed } = matchListings(answers);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function signUp(e) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setMessage("Enter an email like name@example.com.");
      return;
    }
    // TODO: connect to the email service once it's chosen.
    setMessage("Thanks! Email sign-up goes live once the email service is connected.");
  }

  return (
    <div className={`${s.results} ${s.enter}`} aria-live="polite">
      <h1 className={s.resultsTitle}>
        {results.length ? <>Your top {results.length}, <span className="hand">sorted</span></> : "No exact match yet"}
      </h1>
      {relaxed && (
        <p className={s.hint}>
          There weren't enough {answers.how === "kit" ? "meal kits" : "ready-made services"} for your answers, so we've included both.
        </p>
      )}
      {!results.length && (
        <p>
          No service we list matches all of those needs yet. Try removing one diet need, or check back soon as we add new services every month.
        </p>
      )}
      <ol className={s.resultList}>
        {results.map((l, i) => (
          <li key={l.id} className={`${s.rise} ${i === 0 ? s.best : ""}`} style={{ animationDelay: `${120 + i * 110}ms` }}>
            <div className={s.resultHead}>
              <b>{l.name ? `${l.brand} – ${l.name}` : l.brand}</b>
              {i === 0 && <span className={`pill ${s.pop}`}>Best match</span>}
            </div>
            <p className={s.why}>Why: {l.why.length ? l.why.slice(0, 3).join(" · ") : "strong rating for the price"}</p>
            <div className={s.meta}>
              <span><b className="num">${l.price.toFixed(2)}</b> per serve</span>
              <Rating value={l.rating} />
              <span>{l.type === "kit" ? "Meal kit" : "Ready-made"}</span>
            </div>
            <p className={s.why}>Delivers to {l.states.length === 8 ? "all states" : l.states.join(", ")}</p>
            <div className={s.dealRow}>
              {l.code && <CopyCode code={l.code} />}
              {l.deal && <span className={s.deal}>{l.deal}</span>}
              {l.url && (
                <a className="btn btn-small" href={l.url} target="_blank" rel="sponsored nofollow noopener">
                  Go to site <Arrow size={16} />
                </a>
              )}
              <AddToWeek id={l.id} />
            </div>
          </li>
        ))}
      </ol>

      <form className={`note ${s.email}`} onSubmit={signUp}>
        <span className="hand">Want these in your inbox?</span>
        <p>We'll email your matches, plus new codes for your diet once a month. Optional.</p>
        <div className={s.emailRow}>
          <label htmlFor="quiz-email" className="visually-hidden">Email</label>
          <input id="quiz-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit" className="btn btn-small">Email me</button>
        </div>
        {message && <p className={s.hint} role="status">{message}</p>}
      </form>

      <p className={s.hint}>
        Add your favourites to <a href="/my-week">My week</a> to plan your dinners and see the weekly cost.
      </p>

      <div className={s.nav}>
        <button type="button" className="btn btn-quiet" onClick={onEdit}>Change answers</button>
        <button type="button" className="btn btn-quiet" onClick={onRestart}>Start again</button>
      </div>
    </div>
  );
}
