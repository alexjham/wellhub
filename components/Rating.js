import { Star } from "./Icons";

export default function Rating({ value }) {
  return (
    <span className="rating" aria-label={`Nutritionist rating ${value.toFixed(1)} out of 5`}>
      <Star /> <span className="num">{value.toFixed(1)}</span>
    </span>
  );
}
