import * as helios from "./helios.js";
import fs from "fs";

console.log(process.argv);

const validatorSrc = fs
  .readFileSync("./src/scripts/oracle_script.helios")
  .toString();

const validator = helios.Program.new(validatorSrc).compile();

fs.writeFileSync("./assets/contract.json", validator.serialize());

const valHash = validator.validatorHash;

console.log(validator.serialize());

console.log(helios.Address.fromValidatorHash(valHash, null, true).toBech32());
