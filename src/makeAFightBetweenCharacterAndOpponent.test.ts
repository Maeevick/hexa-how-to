import test from "node:test";
import assert from "node:assert";

import { makeAFightBetweenCharacterAndOpponent } from "./makeAFightBetweenCharacterAndOpponent.ts";

test("When the character is 100% certain to win the opponent, Then the fight declares Chebacca as the winner", async (t) => {
  // Regarding the business rules, Chebacca will pick between 1 and 10 on his attack dice
  const forRetrievingTheCharacter = async (id: string) => ({
    id: "some_uuidv4_1",
    name: "Chewbacca the Wookie",
    attack: 10,
    defense: 10,
    health: 10,
  });
  // Regarding the business rules, Jabba will pick 0 on his defense dice, so he will lose betwwen 1 and 10 points of health and will fall at 0 after a few turns.
  const forPickingTheOpponent = async (id: string) => ({
    id: "some_uuidv4_0",
    name: "Jabba the Hutt",
    attack: 0,
    defense: 0,
    health: 10,
  });
  // The last dependency that's unpredictible due to 'Math.random', same goes with new Date(), Date.now(), uuidv4(), ...
  // Later, it will become the real implementation but for the moment it stays here.
  const forLaunchingADice = (numberOfFaces: number) => {
    if (numberOfFaces === 0) return 0;
    return Math.floor(Math.random() * numberOfFaces) + 1;
  };

  // Here, we initialize the dependencies and inject them in our application respecting the Secondary Port's contract
  const makeAFightInitialized = makeAFightBetweenCharacterAndOpponent(
    forRetrievingTheCharacter,
    forPickingTheOpponent,
    forLaunchingADice
  );

  // Here, we initialize some dummies data following the Primary Port's contract
  const characterId = "some_uuidv4_0";
  const opponentId = "some_uuidv4_1";

  // Here, we use our application with the expected data
  const result = await makeAFightInitialized(characterId, opponentId);

  assert.strictEqual(result, "Chewbacca the Wookie wins");
});
