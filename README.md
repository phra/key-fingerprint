# key-fingerprint [![Build Status](https://travis-ci.org/phra/key-fingerprint.svg?branch=master)](https://travis-ci.org/phra/key-fingerprint) [![Coverage Status](https://coveralls.io/repos/github/phra/key-fingerprint/badge.svg?branch=master)](https://coveralls.io/github/phra/key-fingerprint?branch=master)
Node.js library to easy calculate MD*, SHA*, etc fingerprint of a public/private key.

## Installation

`npm install key-fingerprint`

OR

`yarn add key-fingerprint`

## Usage

```typescript
fingerprint(key: string, algorithm: string = 'sha512', colons: boolean = false)
```

OR

```typescript
export enum SUPPORTED_ALGORITHM {
  MD4 = 'md4',
  MD5 = 'md5',
  RMD160 = 'rmd160',
  SHA1 = 'sha1',
  SHA224 = 'sha224',
  SHA256 = 'sha256',
  SHA384 = 'sha384',
  SHA512 = 'sha512',
}

export enum SUPPORTED_ENCODING {
  HEX = 'hex',
  LATIN1 = 'latin1',
  BASE64 = 'base64',
}

interface IConfig {
  algorithm: SUPPORTED_ALGORITHM,
  colons: boolean,
  encoding: SUPPORTED_ENCODING,
}

const DEFAULT_CONFIGURATION: IConfig = {
  algorithm: SUPPORTED_ALGORITHM.SHA256,
  colons: false,
  encoding: SUPPORTED_ENCODING.HEX,
}

fingerprint(key: string, configuration: Partial<IConfig>)
```

## Supported algorithms

- MD4
- MD5
- RMD160
- SHA1
- SHA224
- SHA256
- SHA384
- SHA512

## Examples

```typescript
import { fingerprint } from 'key-fingerprint'

const key = '-----BEGIN PUBLIC KEY-----\n.........'
const sha256 = fingerprint(key, 'sha256') // => 'ab12ef12....
const sha256WithColons = fingerprint(key, 'sha256', true) // => 'ab:12:ef:12....
```

```typescript
import { fingerprint } from 'key-fingerprint'

const key = '-----BEGIN PUBLIC KEY-----\n.........'
const config = { encoding: 'base64', algorithm: 'sha512' } // options fallback to default if missing
const sha512 = fingerprint(key, config) // => 'ZGlvIHBvcmN...
```
