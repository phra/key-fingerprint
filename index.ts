import { createHash } from 'crypto'

// tslint:disable-next-line:max-line-length
const regex = /\n| |-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|ssh-rsa|(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

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

function _colons(fingerprintHex: string) {
  return fingerprintHex.replace(/(.{2})(?=.)/g, '$1:')
}

export function fingerprint(
  cert: string,
  algorithm: SUPPORTED_ALGORITHM = SUPPORTED_ALGORITHM.SHA256,
  colons: boolean = false,
) {
  const cleanKey = cert.replace(regex, '')
  const buffer = new Buffer(cleanKey, 'base64')
  const hash = createHash(algorithm.toLowerCase()).update(buffer).digest('hex')
  return colons ? _colons(hash) : hash
}

export default fingerprint
