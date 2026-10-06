import { Suspense } from "react";
import Quiz from "../../components/Quiz";

export const metadata = {
  alternates: { canonical: "/quiz" },
  title: "Find Your Meal Delivery Match: 4-Question Quiz",
  description: "Answer 4 quick questions to get your top 3 Australian meal delivery services and meal kits, each with a discount code.",
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
