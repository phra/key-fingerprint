import { createHash } from 'crypto'

// tslint:disable-next-line:max-line-length
const regex = /\n| |-----BEGIN CERTIFICATE-----|-----END CERTIFICATE-----|-----BEGIN RSA PRIVATE KEY-----|-----END RSA PRIVATE KEY-----|-----BEGIN RSA PUBLIC KEY-----|-----END RSA PUBLIC KEY-----|-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|ssh-rsa|(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g

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

function _colons(fingerprintHex: string) {
  return fingerprintHex.replace(/(.{2})(?=.)/g, '$1:')
}

export function fingerprint(
  cert: string,
  config: IConfig | string = SUPPORTED_ALGORITHM.SHA256,
  colons: null | boolean = false,
) {
  const algorithm = typeof config === 'string' ? config : config.algorithm
  colons = typeof config === 'object' && config.encoding  ? config.colons : colons
  const encoding = typeof config === 'object' && config.encoding || SUPPORTED_ENCODING.HEX
  const cleanKey = cert.replace(regex, '')
  const buffer = new Buffer(cleanKey, 'base64')
  const hash = createHash(algorithm.toLowerCase()).update(buffer).digest(encoding)
  return colons ? _colons(hash) : hash
}

export default fingerprint
