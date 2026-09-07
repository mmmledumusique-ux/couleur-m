import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: ColourGame,
});

// --- The six French colours and the hex used for both the card and the word ---
type ColourKey = "bleu" | "vert" | "rouge" | "orange" | "jaune" | "noir";

const COLOURS: Record<ColourKey, string> = {
  bleu: "#2563eb",
  vert: "#16a34a",
  rouge: "#dc2626",
  orange: "#ea580c",
  jaune: "#eab308",
  noir: "#1f2937",
};

const KEYS = Object.keys(COLOURS) as ColourKey[];
const CONFETTI_PALETTE = [
  "#2563eb", "#16a34a", "#dc2626", "#ea580c", "#eab308", "#9333ea",
  "#0891b2", "#db2777", "#f59e0b",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

interface Piece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  colour: string;
  rotate: number;
  size: number;
  star: boolean;
}

function makeConfetti(): Piece[] {
  const pieces: Piece[] = [];
  for (let i = 0; i < 40; i++) {
    pieces.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: 1.1 + Math.random() * 0.9,
      colour: pick(CONFETTI_PALETTE),
      rotate: Math.random() * 360,
      size: 10 + Math.random() * 14,
      star: Math.random() > 0.5,
    });
  }
  return pieces;
}

function ColourGame() {
  const [colour, setColour] = useState<ColourKey>("bleu");
  const [choices, setChoices] = useState<ColourKey[]>(["bleu", "vert", "rouge"]);
  const [cardKey, setCardKey] = useState(0);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [locked, setLocked] = useState(false);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [correctIdx, setCorrectIdx] = useState<number | null>(null);
  const [celebrate, setCelebrate] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const next = useCallback(() => {
    setLocked(false);
    setButtonsVisible(false);
    setWrongIdx(null);
    setCorrectIdx(null);
    setCelebrate(false);

    const c = pick(KEYS);
    const wrongs = shuffle(KEYS.filter((k) => k !== c)).slice(0, 2);
    setColour(c);
    setChoices(shuffle([c, ...wrongs]));
    setCardKey((k) => k + 1);

    // Reveal answer buttons after the card finishes rising in.
    timers.current.push(
      setTimeout(() => setButtonsVisible(true), 720),
    );
  }, []);

  useEffect(() => {
    next();
    return () => {
      timers.current.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = (idx: number) => {
    if (locked || correctIdx !== null) return;
    const chosen = choices[idx];

    if (chosen === colour) {
      setLocked(true);
      setCorrectIdx(idx);
      setCelebrate(true);
      setPieces(makeConfetti());
      setScore((s) => ({ correct: s.correct + 1, incorrect: s.incorrect }));
      timers.current.push(setTimeout(() => next(), 1900));
    } else {
      setWrongIdx(idx);
      setScore((s) => ({ correct: s.correct, incorrect: s.incorrect + 1 }));
      timers.current.push(
        setTimeout(() => setWrongIdx(null), 550),
      );
    }
  };

  const total = score.correct + score.incorrect;

  return (
    <div className="game-root">
      {/* Score counter */}
      <div className="score" aria-live="polite">
        <span className="score-ok">✓ {score.correct}</span>
        <span className="score-bad">✗ {score.incorrect}</span>
        <span className="score-tot">= {total}</span>
      </div>

      {/* Celebration layer */}
      {celebrate && (
        <div className="confetti" aria-hidden="true">
          {pieces.map((p) => (
            <span
              key={p.id}
              className={p.star ? "sparkle" : "confetti-bit"}
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.star ? p.size : p.size * 0.6,
                background: p.star ? "transparent" : p.colour,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                ["--rot" as string]: `${p.rotate}deg`,
                color: p.colour,
              }}
            />
          ))}
        </div>
      )}

      {/* Colour card */}
      <div className="stage">
        <div
          key={cardKey}
          className="colour-card"
          style={{ backgroundColor: COLOURS[colour] }}
          aria-label="colour card"
        />
      </div>

      {/* Answer buttons */}
      <div className={`answers${buttonsVisible ? " answers-in" : ""}`}>
        {choices.map((key, idx) => {
          const isWrong = wrongIdx === idx;
          const isCorrect = correctIdx === idx;
          const cls = [
            "answer-btn",
            isWrong ? "shake" : "",
            isCorrect ? "correct-flash" : "",
          ].join(" ").trim();
          return (
            <button
              key={`${cardKey}-${idx}`}
              className={cls}
              onClick={() => handleAnswer(idx)}
              disabled={correctIdx !== null}
              style={{ color: COLOURS[key] }}
            >
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
}
