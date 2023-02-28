export async function scriptIsConsumed(program, paramNames) {
  const args = paramNames.map((p) => program.evalParam(p));
  const result = await program.compile().runWithPrint(args)

  console.log("beep")
  console.log(result)

  return result[0].toString() == "()"
}