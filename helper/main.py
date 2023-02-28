from nacl.signing import SigningKey, VerifyKey

import json


def generate(name: str):
    skey = SigningKey.generate()
    vkey = skey.verify_key

    skey_hex, vkey_hex = skey.encode().hex(), vkey.encode().hex()

    with open("keys.json", "r") as f:
        keys = json.load(f)

    if name in keys:
        return keys[name]["skey"], keys[name]["vkey"]

    with open("keys.json", "w") as f:
        keys[name] = {"skey": skey_hex, "vkey": vkey_hex}

        json.dump(keys, f)

    return skey_hex, vkey_hex


def sign(skey_hex: str, message_hex: str):
    skey = SigningKey(bytes.fromhex(skey_hex))

    signed = skey.sign(bytes.fromhex(message_hex))

    return signed


def verify(vkey_hex: str, message_hex: str, signature_hex: str):
    vkey = VerifyKey(bytes.fromhex(vkey_hex))

    return vkey.verify(
        bytes.fromhex(message_hex),
        bytes.fromhex(signature_hex),
    )


def main():
    # skey, vkey = generate("alice")
    # skey, vkey = generate("bob")
    skey, vkey = generate("charlie")
    # skey, vkey = generate("daniel")

    signed = sign(skey, bytes("test", "utf-8").hex())

    print("vkey", vkey)
    print("signature", signed.signature.hex())

    print(
        "verification",
        verify(vkey, bytes("test", "utf-8").hex(), signed.signature.hex()),
    )


if __name__ == "__main__":
    main()


# vkey = "57d74e4c8d25988a0fa6693dcd3f97153813bc487c84473e5e785b054b17712c"
# message = "74657374"
# signature = "10477086e3f3c599abeed37465804213f655a7d213d49cba4525f611b26e792548cc8165a93852ba23716f3e88f13dab954d187514926cc36c469a76d619d703"

# print(verify(vkey, message, signature))
