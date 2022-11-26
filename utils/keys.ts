import crypto from "crypto";

export function getKeys() {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "der",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "der",
    },
  });
  return {
    publicKey: publicKey.toString("base64"),
    privateKey: privateKey.toString("base64"),
  };
}

export function getSignature(privateKey: string, file: any) {
  const sign = crypto.createSign("SHA256");
  sign.write(JSON.stringify(file));
  sign.end();

  const signature = sign.sign({
    key: Buffer.from(privateKey, "base64"),
    type: "pkcs8",
    format: "der",
  });

  return signature.toString("base64");
}

export function verifySignature(
  publicKey: string,
  file: string,
  signature: string
) {
  const verify = crypto.createVerify("SHA256");
  verify.write(JSON.stringify(file));
  verify.end();

  return verify.verify(
    {
      key: Buffer.from(publicKey, "base64"),
      type: "spki",
      format: "der",
    },
    Buffer.from(signature, "base64")
  );
}
