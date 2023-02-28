import * as helios from "@hyperionbt/helios";
import fs from "fs";

const validatorSrc = fs
  .readFileSync("./src/scripts/oracle_script.helios")
  .toString();
const testParamsSrc = fs
  .readFileSync("./src/utils/oracle_test_params.helios")
  .toString();

// Concat validator src and test params src
const program = helios.Program.new(validatorSrc + testParamsSrc);

const datum = program.evalParam("test1_datum");
console.log(datum.data.toSchemaJson());

const redeemer = program.evalParam("test1_redeemer");
console.log(redeemer.data.toSchemaJson());

const escrowSrc = fs
  .readFileSync("./src/scripts/escrow_script.helios")
  .toString();

const escrowParams = fs
  .readFileSync("./src/utils/escrow_test_params.helios")
  .toString();

const data_types = fs.readFileSync("./src/utils/data_types.helios").toString();

const escrow_utils = fs
  .readFileSync("./src/utils/escrow_utils.helios")
  .toString();

// Concat validator src and test params src
const escrowProgram = helios.Program.new(escrowSrc + escrowParams, [data_types, escrow_utils]);

const escrowDatum = escrowProgram.evalParam("base_case_datum");
console.log(escrowDatum.data.toSchemaJson());

const escrowRedeemer = escrowProgram.evalParam("base_case_redeemer");
console.log(escrowRedeemer.data.toSchemaJson());
