# Hexa: How To

Examples to illustrate my articles in my newsletter Marevick's Bazaar (https://maeevick.substack.com/t/hexagonalarchitecture)

## Branch dedicated to "Hexagonal Architecture: How To #2": A Simple Case from Scratch

We follow the "official" blueprint from Alistair Cockburn's Hexagonal Architecture Explained.

### Step 0: the Setup

For this first case:

- I will use TypeScript on NodeJS 22
- Some NodeJS flags to strip types and the Native Test Runner

```shell
npm run start
# executes the setup code and displays "Hello TS in NodeJS!" in the console.

npm run test
# executes the setup test and displays the passing test results.
```

### Step 1: Test-to-Test

- the Application's Business Use Case:

```
As part of our game development, a character can initiate combat against an opponent.

- Combat takes place in turns using random dice rolls.
- A turn consists of two rounds so that the character and opponent each take turns being attacker and defender.
- As soon as one of the fighters drops to 0 hit points, the combat ends.

Consider the following characteristics for the fighters:
- attack: integer > 0
- defense: integer > 0
- hit points: integer > 10

The character always starts as the attacker in the first round, the opponent as defender.

A round corresponds to rolling an X-sided die (X = attack value) vs a Y-sided die (Y = defense value). When the result D is greater than 0 (D = r(X) > r(Y)), then D hit points are subtracted from the defender.
```

According to Alistair Cockburn's terminology, here we have:

- The Test Suite is the **Primary Actor**
- There is no need for a **Primary Adapter** _(at this point)_
- `makeAFightBetweenCharacterAndOpponent.ts` is inside the application and defines the **Primary Port** and the **Secondary Port**.
  - Three dependencies must follow the Secondary Port's contract:
    - ForRetrievingTheCharacter
    - ForPickingTheOpponent
    - ForLaunchingADice
  - Two input/inbound data parameter must follow the Primary Port's contract:
    - characterId
    - opponentId
- The Test Doubles defined in the Test Suite _(which also acts as the Configurator)_ are used as **Secondary Actors** without **Secondary Adapters** _(at this point)_

There is no Configurator for the application expect the Test Suite _(at this point again)_

### Step 2: Real-to-Test

We are switching the Primary Actor from Test Suite to HTTP API (as a Web Server Backend) for this example.

According to Alistair Cockburn's terminology, here we have:

- The HTTP Request through HTTP Server is the **Primary Actor**
- The HTTP Router (to keep the example simple) is the **Primary Adapter**
- The **Primary Port** and the **Secondary Port** stay the same, it's the principle!
- The **Secondary Actors** and the **Secondary Adapters** don't change in this step (still the Test Doubles but extracted from the Test Suite)

Try it:

```shell
# Health Check
curl http://localhost:3000

> {"hello":"port & adapters"}
```

```shell
# Use case
curl \
-H 'Content-Type: application/json' \
-X POST \
-d '{ "characterId": "char", "opponentId": "opp" }' \
http://localhost:3000/fight

> {"winner":"Chewbacca the Wookie wins"}
```
