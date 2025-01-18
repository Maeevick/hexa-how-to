import Fastify from "fastify";

import { makeAFightBetweenCharacterAndOpponent } from "./makeAFightBetweenCharacterAndOpponent.ts";

import { forLaunchingADice } from "./forLaunchingADice.ts";
import {
  forPickingTheOpponent,
  forRetrievingTheCharacter,
} from "./characterRepository.ts";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async function handler(request, reply) {
  return { hello: "port & adapters" };
});

fastify.post<{ Body: { characterId: string; opponentId: string } }>(
  "/fight",
  async function handler(request, reply) {
    const { characterId, opponentId } = request.body;

    const makeAFightInitialized = makeAFightBetweenCharacterAndOpponent(
      forRetrievingTheCharacter,
      forPickingTheOpponent,
      forLaunchingADice
    );

    const result = await makeAFightInitialized(characterId, opponentId);

    return { winner: result };
  }
);

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
