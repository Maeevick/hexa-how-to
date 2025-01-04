// AS EXPECTED THIS FILE HASN'T BEEN CHANGED

// Domain data structures
// No problem with duplication because I don't know if Character and Opponent data structures will stays the same.
export type Character = {
  id: string;
  name: string;
  attack: number;
  defense: number;
  health: number;
};

export type Opponent = {
  id: string;
  name: string;
  attack: number;
  defense: number;
  health: number;
};

// Secondary Ports
// Same here. No problem with duplication because I don't know if Character and Opponent are the same concept or not.
export type ForRetrievingTheCharacter = (id: string) => Promise<Character>;
export type ForPickingTheOpponent = (id: string) => Promise<Opponent>;
export type ForLaunchingADice = (numberOfFaces: number) => number;

// Primary Ports
// It's a personal choice but I like to prefix the application's use case with an "I".
// Not a reference to "Interface" but to the first person of singular "I" : "As a user, I make a fight between character and opponent".
export type IMakeAFightBetweenCharacterAndOpponent = (
  forRetrievingTheCharacter: ForRetrievingTheCharacter,
  forPickingTheOpponent: ForPickingTheOpponent,
  forLaunchingADice: ForLaunchingADice
) => (characterId: string, opponentId: string) => Promise<string>;

// Application's use case to handle buisiness logic
export const makeAFightBetweenCharacterAndOpponent: IMakeAFightBetweenCharacterAndOpponent =

    (forRetrievingTheCharacter, forPickingTheOpponent, forLaunchingADice) =>
    async (characterId, opponentId) => {
      // Naive implementation but it's enough in our context
      const character = await forRetrievingTheCharacter(characterId);
      const opponent = await forPickingTheOpponent(opponentId);

      let i = 0;
      while (character.health > 0 || opponent.health > 0 || i > 120) {
        const characterAttackResult = forLaunchingADice(character.attack);
        const opponentDefenseResult = forLaunchingADice(opponent.defense);
        const diffTurn1 = characterAttackResult - opponentDefenseResult;
        if (diffTurn1 > 0) {
          opponent.health -= diffTurn1;

          if (opponent.health <= 0) {
            return `${character.name} wins`;
          }
        }

        const opponentAttackResult = forLaunchingADice(opponent.attack);
        const characterDefenseResult = forLaunchingADice(character.defense);
        const diffTurn2 = opponentAttackResult - characterDefenseResult;
        if (diffTurn2 > 0) {
          character.health -= diffTurn2;

          if (character.health <= 0) {
            return `${opponent.name} wins`;
          }
        }
        i++;
      }
      return "nobody wins";
    };
