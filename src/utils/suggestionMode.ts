import { useState } from "react";

export const useSuggestionMode = () => {
  const [suggestions] = useState<string[]>(["4188", "5549", "7577"]);
  const [suggestionsMode] = useState<string[]>(["cashback", "investment"]);

  return { suggestions, suggestionsMode };
};
