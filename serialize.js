import * as helios from "./helios.js"
import fs from 'fs'

const validatorSrc = fs.readFileSync('./oracle_script.helios').toString()

const validator = helios.Program.new(validatorSrc).compile()

fs.writeFileSync('./contract.json', validator.serialize())

const valHash = validator.validatorHash

console.log(validator.serialize())

console.log(helios.Address.fromValidatorHash(true, valHash).toBech32())
