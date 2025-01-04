// A simple Test Double (Stub) returning predefined data.
// Regarding the business rules, Chebacca will pick between 1 and 10 on his attack dice
export const forRetrievingTheCharacter = async (id: string) => ({
  id: "some_uuidv4_1",
  name: "Chewbacca the Wookie",
  attack: 10,
  defense: 10,
  health: 10,
});
