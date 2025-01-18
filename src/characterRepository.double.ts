// A simple Test Double (Stub) returning predefined data.
// Regarding the business rules, Chebacca will pick between 1 and 10 on his attack dice
export const forRetrievingTheCharacter = async (id: string) => ({
  id: "some_uuidv4_1",
  name: "Chewbacca the Wookie",
  attack: 10,
  defense: 10,
  health: 10,
});

// A simple Test Double (Stub) returning predefined data.
// Regarding the business rules, Jabba will pick 0 on his defense dice, so he will lose betwwen 1 and 10 points of health and will fall at 0 after a few turns.
export const forPickingTheOpponent = async (id: string) => ({
  id: "some_uuidv4_0",
  name: "Jabba the Hutt",
  attack: 0,
  defense: 0,
  health: 10,
});
