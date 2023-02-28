import * as helios from "../src/helios.js";
import assert from "assert";
import fs from "fs";

import { Buffer } from "buffer";

const fromHex = (hex) => Buffer.from(hex, "hex");

const testing = fs
  .readFileSync("../src/utils/escrow_utils_test_params.helios")
  .toString();

const data_types = fs.readFileSync("../src/utils/data_types.helios").toString();
const utils = fs.readFileSync("../src/utils/escrow_utils.helios").toString();

const program = helios.Program.new(testing, [data_types, utils]);

const result = program.evalParam("test_parse_results");
const resultString = fromHex(result.data.toString().slice(1)).toString();

if (resultString !== "1:2,3:4|5:6,7:8|9:10,11:12") {
  console.log("Test parse_results failed!");
} else {
  console.log("Test parse_results passed!");
}

console.log(resultString);

console.log("===================");

const result2Index = program.evalParam("test_most_voted_index");
const result2IndexInt = Number(result2Index.data.int);

if (result2IndexInt !== 3) {
  console.log("Test most_voted_index failed!");
} else {
  console.log("Test most_voted_index passed!");
}

console.log(result2IndexInt);

const result2Result = program.evalParam("test_most_voted_result");
const result2ResultInt = Number(result2Result.data.int);

if (result2ResultInt !== 16) {
  console.log("Test most_voted_result failed!");
} else {
  console.log("Test most_voted_result passed!");
}

console.log(result2ResultInt);
