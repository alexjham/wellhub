import { Suspense } from "react";
import Quiz from "../../components/Quiz";

export const metadata = {
  title: "Find my match",
  description: "Answer 5 quick questions to get your top 3 Australian meal delivery services and meal kits, each with a discount code.",
};

export default function QuizPage() {
  return (
    <div className="wrap" style={{ maxWidth: 680, paddingBlock: "48px 0" }}>
      <h1 className="visually-hidden">Find my match</h1>
      <Suspense fallback={<p>Loading the quiz…</p>}>
        <Quiz />
      </Suspense>
    </div>
  );
}
