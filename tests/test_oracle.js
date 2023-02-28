import * as helios from "../src/helios.js";
import fs from "fs";

const validator = fs
  .readFileSync("../src/scripts/oracle_script.helios")
  .toString();

const data_types = fs.readFileSync("../src/utils/data_types.helios").toString();

const testParams = fs
  .readFileSync("../src/utils/oracle_test_params.helios")
  .toString();

// Concat validator src and test params src
const program = helios.Program.new(validator + testParams, [data_types]);

async function testSuccess(testName, paramNames) {
  console.log(`Test: ${testName}`);

  const args = paramNames.map((p) => program.evalParam(p));

  program
    .compile()
    .runWithPrint(args)
    .then((res) => {
      const assertion = res[0].toString() == "()";

      if (assertion) {
        console.log(`Test ${testName} was successful!`);
      } else {
        console.log(res[0]);

        console.log(
          "ARGS: ",
          args.map((v) => v.toString())
        );

        console.log(res);
        console.log(`Test ${testName} failed!`);
      }
    })
    .catch((err) => {
      console.log("Error happened!");
      console.log(
        "ARGS: ",
        args.map((v) => v.toString())
      );

      console.log(err);
      console.log(`Test ${testName} failed!`);
    });
}

async function testFailure(testName, paramNames) {
  console.log(`Test: ${testName}`);

  const args = paramNames.map((p) => program.evalParam(p));

  program
    .compile()
    .runWithPrint(args)
    .then((res) => {
      const assertion = res[0].toString() != "()";
      if (assertion) {
        console.log(`Test ${testName} was successful!`);
      } else {
        console.log(res[0].toString());

        console.log(
          "ARGS: ",
          args.map((v) => v.toString())
        );

        console.log(res);
        console.log(`Test ${testName} failed!`);
      }
    })
    .catch((err) => {
      console.log("Error happened!");
      console.log(
        "ARGS: ",
        args.map((v) => v.toString())
      );

      console.log(err);
      console.log(`Test ${testName} failed!`);
    });
}

await testSuccess("testBaseCase", [
  "test1_datum",
  "test1_redeemer",
  "test1_ctx",
]);

await testFailure("testNotEnoughSigs", [
  "test2_datum",
  "test2_redeemer",
  "test2_ctx",
]);

await testFailure("testNoDatum", [
  "test3_datum",
  "test3_redeemer",
  "test3_ctx",
]);

await testFailure("testInsufficientPayment", [
  "test4_datum",
  "test4_redeemer",
  "test4_ctx",
]);

await testSuccess("testPaymentBackCase", [
  "test5_datum",
  "test5_redeemer",
  "test5_ctx",
]);

await testFailure("testPaymentBackDeadlineNotPassedCase", [
  "test6_datum",
  "test6_redeemer",
  "test6_ctx",
]);

await testFailure("testPaymentBackNotSignedCase", [
  "test7_datum",
  "test7_redeemer",
  "test7_ctx",
]);

await testFailure("testPaymentBackScriptOutputCase", [
  "test8_datum",
  "test8_redeemer",
  "test8_ctx",
]);
