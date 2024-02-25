---
title: "Hashing passwords on Cloudflare Workers"
date: 2024-02-21 20:30:00 +00:00
categories:
  - web-development
tags:
  - Cloudflare Workers
  - Cloudflare Developer Platform
  - security
  - cryptography
---

I've recently needed to hash passwords as part of authentication endpoints for an API I'm building using Cloudflare Workers. My complete code is below as I failed to find a single place with this as an example ready to go.

Something to remember and be careful with when using Cloudflare Workers is not all Node features are available or implemented as you would expect typically. Luckily [this is documented by Cloudflare](https://developers.cloudflare.com/workers/runtime-apis/) pretty well but it can catch you out. I've had instances where I've got something working locally and then deployed, only for things to break - it's something to be aware of.

I've set the PBKDF2 iterations to 100,000 as this appears to be the maximum value allowed by `crypto.subtle` on Cloudflare.

```tsx
export async function hashPassword(
  password: string,
  providedSalt?: Uint8Array
): Promise<string> {
  const encoder = new TextEncoder();
  // Use provided salt if available, otherwise generate a new one
  const salt = providedSalt || crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  const exportedKey = (await crypto.subtle.exportKey(
    "raw",
    key
  )) as ArrayBuffer;
  const hashBuffer = new Uint8Array(exportedKey);
  const hashArray = Array.from(hashBuffer);
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${saltHex}:${hashHex}`;
}

export async function verifyPassword(
  storedHash: string,
  passwordAttempt: string
): Promise<boolean> {
  const [saltHex, originalHash] = storedHash.split(":");
  const matchResult = saltHex.match(/.{1,2}/g);
  if (!matchResult) {
    throw new Error("Invalid salt format");
  }
  const salt = new Uint8Array(matchResult.map((byte) => parseInt(byte, 16)));
  const attemptHashWithSalt = await hashPassword(passwordAttempt, salt);
  const [, attemptHash] = attemptHashWithSalt.split(":");
  return attemptHash === originalHash;
}
```
