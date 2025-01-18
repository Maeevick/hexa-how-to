import { eq } from "drizzle-orm";
import { db } from "./db/index.ts";
import { characters } from "./db/schema.ts";

import type {
  Character,
  Opponent,
} from "./makeAFightBetweenCharacterAndOpponent.ts";

// We keep the nomenclature defined by Alistair Cockburn here regardless if it's class-based or function-based
export const forRetrievingTheCharacter = async (
  id: string
): Promise<Character> => {
  const [character] = await db
    .select()
    .from(characters)
    .where(eq(characters.id, id))
    .limit(1);

  // The purpose of the secondary adapter is to "adapt" the external data to the Port's contract of the application
  // Here there is not so much to do but imagine some data-mapping and technical transformations.

  return {
    id: character.id,
    name: character.name,
    attack: character.attack,
    defense: character.defense,
    health: character.health,
  };
};

// We keep the nomenclature defined by Alistair Cockburn here regardless if it's class-based or function-based
export const forPickingTheOpponent = async (id: string): Promise<Opponent> => {
  const [opponent] = await db
    .select()
    .from(characters)
    .where(eq(characters.id, id))
    .limit(1);

  // The purpose of the secondary adapter is to "adapt" the external data to the Port's contract of the application
  // Here there is not so much to do but imagine some data-mapping and technical transformations.

  return {
    id: opponent.id,
    name: opponent.name,
    attack: opponent.attack,
    defense: opponent.defense,
    health: opponent.health,
  };
};
