import * as helios from '@hyperionbt/helios'
import fs from 'fs'

const validatorSrc = fs.readFileSync("./oracle_script.helios").toString();
const testParamsSrc = fs.readFileSync("./tests/test-params.helios").toString();

// Concat validator src and test params src
const program = helios.Program.new(validatorSrc + testParamsSrc);

const datum = program.evalParam("test1_datum")
console.log(datum.data.toSchemaJson())

const redeemer = program.evalParam("test1_redeemer")
console.log(redeemer.data.toSchemaJson())

// const validator = program.compile(false)
