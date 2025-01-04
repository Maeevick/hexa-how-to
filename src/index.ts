// STANDARD MINIMALIST SETUP FOR FASTIFY
import Fastify from "fastify";

// The primary adapter depends on application
import { makeAFightBetweenCharacterAndOpponent } from "./makeAFightBetweenCharacterAndOpponent.ts";

// At this point the primary adapter acts as the configurator because it's the very
import { forLaunchingADice } from "./forLaunchingADice.ts";
import { forPickingTheOpponent } from "./forPickingTheOpponent.double.ts";
import { forRetrievingTheCharacter } from "./forRetrievingTheCharacter.double.ts";

const fastify = Fastify({
  logger: true,
});

// A Health Chek route to validate the setup
fastify.get("/", async function handler(request, reply) {
  return { hello: "port & adapters" };
});

// The Primary Adapter (simplest implementation in the HTTP Router)
fastify.post<{ Body: { characterId: string; opponentId: string } }>(
  "/fight",
  async function handler(request, reply) {
    const { characterId, opponentId } = request.body;
    // Imagine all the HTTP specific stuff here (and in middleware/plugin) as authentication, schema validation, ...
    // ...
    // It's not relevant for this simple example, but let me know if necessary.

    // Prepare the application's dependencies as in the Test Suite (later the configurator will do it)
    const makeAFightInitialized = makeAFightBetweenCharacterAndOpponent(
      forRetrievingTheCharacter,
      forPickingTheOpponent,
      forLaunchingADice
    );

    // Call the application's use case with the expected data
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
