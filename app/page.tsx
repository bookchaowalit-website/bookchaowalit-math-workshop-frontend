"use client";

import { useState } from "react";

type Problem = { id: string; number: string; title: string; question: string; givens: string[]; notation: string; diagram: string; steps: { label: string; detail: string }[] };

const problems: Problem[] = [
  { id: "diagonal", number: "A", title: "The quiet diagonal", question: "Can the diagonal be proved without measuring it?", givens: ["a = 3", "b = 4", "right angle"], notation: "c² = a² + b²", diagram: "3—4", steps: [{ label: "Name the relationship", detail: "A right triangle gives us two perpendicular legs and one unknown hypotenuse." }, { label: "Substitute the known lengths", detail: "c² = 3² + 4², so the square of the diagonal is 9 + 16." }, { label: "Take the root", detail: "c² = 25. The positive length is c = 5." }] },
  { id: "slope", number: "B", title: "A line's intention", question: "How steep is the line between two points?", givens: ["P₁ = (1, 2)", "P₂ = (5, 10)", "rise / run"], notation: "m = Δy / Δx", diagram: "↗ 2", steps: [{ label: "Read the vertical change", detail: "The line rises from 2 to 10. That gives Δy = 8." }, { label: "Read the horizontal change", detail: "The x-coordinate travels from 1 to 5. That gives Δx = 4." }, { label: "Divide change by change", detail: "m = 8 / 4, so every one step right rises by 2." }] },
  { id: "area", number: "C", title: "The shared rectangle", question: "Why does the sum of two areas stay equal?", givens: ["x + 2", "x + 3", "same whole", "x ≥ 0"], notation: "x² + 5x + 6", diagram: "□ + □", steps: [{ label: "Keep the whole visible", detail: "Both expressions describe the same rectangle: width x + 2 and height x + 3." }, { label: "Distribute by strips", detail: "The four regions are x², 3x, 2x, and 6." }, { label: "Collect like regions", detail: "x² + 3x + 2x + 6 becomes x² + 5x + 6." }] },
];

export default function Home() {
  const [problemId, setProblemId] = useState("diagonal");
  const [revealed, setRevealed] = useState(0);
  const problem = problems.find((item) => item.id === problemId) ?? problems[0];
  const selectProblem = (id: string) => { setProblemId(id); setRevealed(0); };
  const revealNext = () => setRevealed((value) => Math.min(value + 1, problem.steps.length));
  const reset = () => setRevealed(0);

  return (
    <main className="math-page">
      <div className="math-shell">
        <header className="math-header"><a className="math-brand" href="#workbench" aria-label="Math Workshop home"><span className="math-mark">∑</span><span>MATH WORKSHOP</span></a><span>PROOF DESK / OPEN STUDY</span><span className="math-status">{String(revealed).padStart(2, "0")} / {String(problem.steps.length).padStart(2, "0")} STEPS</span></header>

        <section className="math-hero"><div><h1>Make the proof<br /><em>visible.</em></h1><p>Choose one idea. Keep its givens on the page. Reveal the next move only when you are ready to see why it works.</p></div><div className="math-equation" aria-label={`Selected notation ${problem.notation}`}><span>NOW ON THE BOARD</span><strong>{problem.notation}</strong><small>illustrative problem set</small></div></section>

        <section className="math-workbench" id="workbench">
          <aside className="problem-index"><div className="math-label"><span>OPEN PROBLEMS</span><span>3 SHEETS</span></div><p>Pick the question that deserves a slower look.</p><div className="problem-list">{problems.map((item) => <button key={item.id} type="button" className={item.id === problem.id ? "problem-row is-active" : "problem-row"} onClick={() => selectProblem(item.id)}><span>{item.number}</span><strong>{item.title}</strong><small>{item.givens.join(" · ")}</small></button>)}</div><div className="margin-note"><span>MARGIN NOTE</span><p>Proof is not a performance. Leave the scratch marks where the idea changed.</p></div></aside>

          <section className="proof-sheet" aria-labelledby="problem-title"><div className="sheet-rule"><span>SHEET {problem.number} / {problem.title.toUpperCase()}</span><span>REASONING IN THREE MOVES</span></div><div className="problem-question"><span>THE QUESTION</span><h2 id="problem-title">{problem.question}</h2></div><div className="visual-proof"><div className="diagram-frame"><div className="diagram-glyph" aria-hidden="true">{problem.diagram}</div><div className="diagram-label diagram-label-a">known</div><div className="diagram-label diagram-label-b">unknown</div></div><div className="givens"><span>GIVENS</span>{problem.givens.map((given) => <strong key={given}>{given}</strong>)}</div></div><div className="step-stack">{problem.steps.map((step, index) => <article key={step.label} className={index < revealed ? "proof-step is-open" : "proof-step"}><div className="step-number">{String(index + 1).padStart(2, "0")}</div><div><h3>{step.label}</h3>{index < revealed ? <p>{step.detail}</p> : <span className="step-closed">Next move is folded away</span>}</div>{index < revealed && <span className="step-check" aria-label="Revealed">✓</span>}</article>)}</div><div className="proof-actions"><button type="button" className="math-primary" onClick={revealNext} disabled={revealed === problem.steps.length}>{revealed === problem.steps.length ? "Proof complete" : "Reveal next move"}</button><button type="button" className="math-reset" onClick={reset}>Start the sheet over</button></div></section>
        </section>
        <footer className="math-footer"><span>MATH WORKSHOP / PROOF DESK</span><span>SYNTHETIC EXAMPLES · NOT AN ASSESSMENT</span></footer>
      </div>
    </main>
  );
}
