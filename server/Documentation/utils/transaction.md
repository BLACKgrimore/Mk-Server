## runTransaction

## Purpose

Executes multiple DB operations atomically using Mongoose transactions.

## Example

--js
import { runTransaction } from './runTransaction.js';

await runTransaction(async (session) => {
  await User.create([{ name: "John" }], { session });
  await Wallet.create([{ userId: user._id }], { session });
});

---