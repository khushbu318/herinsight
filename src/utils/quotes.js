/**
 * Motivational quotes for women
 * Combines local quotes with fetched quotes from external API
 */

const localQuotes = [
  "You are beautiful in every version of yourself.",
  "Your cycle is a superpower, not a weakness.",
  "Listen to your body—it's always speaking wisdom.",
  "Strong women know their cycles and own them.",
  "Your rhythm, your rules. You create your story.",
  "Every phase of your cycle is a gift to yourself.",
  "Hormones aren't your enemy—they're your guide.",
  "Self-awareness starts with understanding your body.",
  "You are more than your cycle, but your cycle matters.",
  "Embrace your natural rhythm—it's your strength.",
  "Your body creates life—that deserves respect.",
  "Every woman should understand her own cycle.",
  "Balance comes from understanding, not fighting.",
  "You've got this. One cycle at a time.",
  "Clarity brings confidence. Know your body.",
  "Your cycle is your supercomputer—learn its language.",
  "A woman who knows her cycle IS a woman in control.",
  "Track it. Understand it. Own it.",
  "Your body is not a problem to solve—it's wisdom to learn."
];

let fetchedQuotes = [];
let quoteFetchError = false;

// Fetch quotes from Quotable API on component mount
const fetchQuotesFromAPI = async () => {
  try {
    // Using Quotable API - free and no auth required
    const response = await fetch('https://api.quotable.io/random?tags=inspirational,wisdom&maxLength=200');
    if (response.ok) {
      const data = await response.json();
      return data.content;
    }
  } catch (error) {
    if (!quoteFetchError) {
      console.log('Quote API unavailable, using local quotes only');
      quoteFetchError = true;
    }
  }
  return null;
};

export const getRandomQuote = async () => {
  // Try to use a fetched quote if available (60% chance)
  if (Math.random() > 0.4 && fetchedQuotes.length > 0) {
    return fetchedQuotes[Math.floor(Math.random() * fetchedQuotes.length)];
  }
  
  // Otherwise use local quotes
  return localQuotes[Math.floor(Math.random() * localQuotes.length)];
};

export const getAllQuotes = () => localQuotes;

// Initialize fetching of quotes from API
export const initializeQuoteFetching = async () => {
  for (let i = 0; i < 10; i++) {
    const fetchedQuote = await fetchQuotesFromAPI();
    if (fetchedQuote) {
      fetchedQuotes.push(fetchedQuote);
    }
    // Add small delay between requests to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};
