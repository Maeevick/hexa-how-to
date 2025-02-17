import test from "node:test";
import assert from "node:assert";

import { makeAFightBetweenCharacterAndOpponent } from "./makeAFightBetweenCharacterAndOpponent.ts";

import { forLaunchingADice } from "./forLaunchingADice.ts";

// An impactless refactoring to clean up the project's structure
import {
  forRetrievingTheCharacter,
  forPickingTheOpponent,
} from "./characterRepository.double.ts";

test("When the character is 100% certain to win the opponent, Then the fight declares Chebacca as the winner", async (t) => {
  const makeAFightInitialized = makeAFightBetweenCharacterAndOpponent(
    forRetrievingTheCharacter,
    forPickingTheOpponent,
    forLaunchingADice
  );
  const result = await makeAFightInitialized("some_uuidv4_0", "some_uuidv4_1");

  assert.strictEqual(result, "Chewbacca the Wookie wins");
});
