import test from "node:test";
import assert from "node:assert";

import { makeAFightBetweenCharacterAndOpponent } from "./makeAFightBetweenCharacterAndOpponent.ts";

import { forLaunchingADice } from "./forLaunchingADice.ts";
import { forPickingTheOpponent } from "./forPickingTheOpponent.double.ts";
import { forRetrievingTheCharacter } from "./forRetrievingTheCharacter.double.ts";

// Compare with the previous step, we refactored the test code without changing the behavior.
// We extracted the Test Double in their own files and the test has become simplier.
test("When the character is 100% certain to win the opponent, Then the fight declares Chebacca as the winner", async (t) => {
  const makeAFightInitialized = makeAFightBetweenCharacterAndOpponent(
    forRetrievingTheCharacter,
    forPickingTheOpponent,
    forLaunchingADice
  );
  const result = await makeAFightInitialized("some_uuidv4_0", "some_uuidv4_1");

  assert.strictEqual(result, "Chewbacca the Wookie wins");
});
