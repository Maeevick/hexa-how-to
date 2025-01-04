// Extracted from the Test Suite as used by both Test Suite and HTTP Server
// The last dependency that's unpredictible due to 'Math.random', same goes with new Date(), Date.now(), uuidv4(), ...
export const forLaunchingADice = (numberOfFaces: number) => {
  if (numberOfFaces === 0) return 0;
  return Math.floor(Math.random() * numberOfFaces) + 1;
};
