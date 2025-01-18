import test from "node:test";
import assert from "node:assert";

import { makeAFightBetweenCharacterAndOpponent } from "./makeAFightBetweenCharacterAndOpponent.ts";

import { forLaunchingADice } from "./forLaunchingADice.ts";

// We use the real implementation of characterRepository here instead of the test double
import {
  forPickingTheOpponent,
  forRetrievingTheCharacter,
} from "./characterRepository.ts";

test("When the character is 100% certain to win the opponent, Then the fight declares Chebacca as the winner", async (t) => {
  const makeAFightInitialized = makeAFightBetweenCharacterAndOpponent(
    forRetrievingTheCharacter,
    forPickingTheOpponent,
    forLaunchingADice
  );
  const result = await makeAFightInitialized(
    "977f791d-0d5f-4d54-b543-c125d8f3ee96",
    "5485460e-9604-47fe-8bc5-9207a7e979f7"
  );

  assert.strictEqual(result, "Chewbacca the Wookie wins");
});
