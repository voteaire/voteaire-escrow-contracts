import * as helios from "./helios.js";
import fs from "fs";

console.log(process.argv);

const validatorSrc = fs
  .readFileSync("./src/scripts/escrow_script.helios")
  .toString();

const data_types = fs.readFileSync("./src/utils/data_types.helios").toString();

const escrow_utils = fs
  .readFileSync("./src/utils/escrow_utils.helios")
  .toString();

const validator = helios.Program.new(validatorSrc, [
  data_types,
  escrow_utils,
]).compile();

fs.writeFileSync("./assets/contract.json", validator.serialize());

const valHash = validator.validatorHash;

console.log(validator.serialize());

console.log(helios.Address.fromValidatorHash(valHash, null, true).toBech32());
