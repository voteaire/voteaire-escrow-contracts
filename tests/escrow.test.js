import { Program } from "../src/helios.js";
import fs from "fs";

import { scriptIsConsumed } from "./tester.js";

const validator = fs
  .readFileSync("../src/scripts/escrow_script.helios")
  .toString();

const data_types = fs.readFileSync("../src/utils/data_types.helios").toString();

const escrow_utils = fs
  .readFileSync("../src/utils/escrow_utils.helios")
  .toString();

const testParams = fs
  .readFileSync("../src/utils/escrow_test_params.helios")
  .toString();

// Concat validator src and test params src
const program = Program.new(validator + testParams, [data_types, escrow_utils]);

// Test 1: Test base case
test("Test 1: Test base case", async () => {
  const result = await scriptIsConsumed(program, [
    "base_case_datum",
    "base_case_redeemer",
    "base_case_context",
  ]);

  expect(result).toBe(true);
});
