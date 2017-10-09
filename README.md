# key-fingerprint [![Build Status](https://travis-ci.org/phra/key-fingerprint.svg?branch=master)](https://travis-ci.org/phra/key-fingerprint) [![Coverage Status](https://coveralls.io/repos/github/phra/key-fingerprint/badge.svg?branch=master)](https://coveralls.io/github/phra/key-fingerprint?branch=master)
Node.js library to easy calculate MD*, SHA*, etc fingerprint of a public/private key.

## Installation

`npm install key-fingerprint`

OR

`yarn add key-fingerprint`

## Usage

`fingerprint(key: string, algorithm: string = 'sha512', colons: boolean = false)`

## Supported algorithms

- MD4
- MD5
- RMD160
- SHA1
- SHA224
- SHA256
- SHA384
- SHA512

## Example

```typescript
import { fingerprint } from 'key-fingerprint'

const key = '-----BEGIN PUBLIC KEY-----\n.........'
const sha256 = fingerprint(key, 'sha256') // => 'ab12ef12....
const sha256WithColons = fingerprint(key, 'sha256', true) // => 'ab:12:ef:12....
```
