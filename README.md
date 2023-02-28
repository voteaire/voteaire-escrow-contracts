# Voteaire Smart Contracts

The purpose of this repository is to define the on-chain components which will allow Voteaire information to be used by smart contracts.

## Disclaimer

This repository is under heavy development and currently lacks some tests, use it at your own risk.

## Oracle Script

The oracle validator can be found inside `oracle_script.helios`. It's general purpose is to allow any person to request some kind of information from a set of oracles. The information is then written to the datum of the script only if a minimum number of oracles agree with it. Agreement is determined by cryptographic signatures.

### Oracle Datum

To achieve this functionality, the script datum contains:

* proposal_id
* minting_policy_identifier
* creator
* deadline
* oracles
* min_signatures
* payment_address
* results

Since the purpose of Votaires oracle is to retrieve voting information for a specific ballot proposal, `proposal_id` is a string that identifies which ballot voting information is being requested.

Currently `minting_policy_identifier` is not used at all, it might be removed in the future.

`creator` is the public key hash of whoever created this request and is needed so that he can retrieve his tokens in the future in the case where no oracles respond and the tokens would otherwise get locked forever.

`deadline` is the slot after which the creator is able to retrieve his tokens like explained above.

`oracles` is a list of public keys whose responsibility is to provide signatures with what they believe to be the right voting results.

`min_signatures` is an integer which determines how many oracles need to agree in order for a voting result to be accepted.

`payment_address` is an address to which the funds from this script will be sent to once the results are published. It serves as an incentive for oracles to participate in the protocol. This address could, for example, be a script which splits equally the amount of tokens it holds between the oracles. Or it could be a key shared between them. It's abstract enough to accept any kind of address.

`results` is either a string representing the results or `None`. While we are waiting for the results it is None, but once we reach a consensus (and the script is consumed and its datum updated), it becomes a string representation of the results.

### Oracle Redeemer

The redeemer is a temporary piece of information useful at that moment for the script, but which does not get kept inside the UTxO.

In the case of our oracle the two pieces of data that fit this description are the results, which are being written to the datum, and the signatures, which are a way of the oracles to prove they accept a certain result.

* results
* signatures

It's important to pay attention to the way signatures are passed. They should have the same indexes as the oracles.

So, say we have the following oracles:
* Alice
* Bob
* Charlie

Our signatures would then need to be:
* Alices signature
* Bobs signature
* Charlies signature

Notice they are kept in the same order and we don't skip any oracles. If Bob didn't provide any signature at all, then we can replace it with the `#aa` bytestring and the script will ignore it, but we cannot skip it. This is done for performance and script simplicity reasons.

### Script Logic

The script enforces the following behaviour:

* Number of valid signatures is greater or equal `min_signatures`
* We only have one script input (to avoid double satisfaction problems)
* We have exactly one script output with datum equal to its input one, but with the results written in
* At least the value inside the script input UTxO minus 3 ADA is sent to `payment_address`

## Testting

We have a series of unit-tests for our script, which can be found inside `src/utils/*test*.helios` files. It's execution is made in the `tests` directory and in order to run the unit tests, you can move to the `tests` folder and run `node test_oracle.js` and `node test_escrow_utils.js`.

## Utils

Inside the `utils` folder, we have a `main.py` file with some useful code to generate some sample public keys and their signatures. This can be useful for testing the correct functionality of the script in relation to the oracles and their signatures.