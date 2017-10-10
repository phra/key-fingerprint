import {
  fingerprint,
  SUPPORTED_ALGORITHM,
  SUPPORTED_ENCODING,
} from '.'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000

// tslint:disable-next-line:no-debugger
debugger

const algs = [
  'md4',
  'md5',
  'rmd160',
  'sha1',
  'sha224',
  'sha256',
  'sha384',
  'sha512',
] as SUPPORTED_ALGORITHM[]

const encs = [
  'hex',
  'base64',
] as SUPPORTED_ENCODING[]

// tslint:disable-next-line:max-line-length
const cert = '-----BEGIN CERTIFICATE-----MIIFBzCCA++gAwIBAgISAxS6P2u4ohya9TEguUVdsVIfMA0GCSqGSIb3DQEBCwUAMEoxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1MZXQncyBFbmNyeXB0MSMwIQYDVQQDExpMZXQncyBFbmNyeXB0IEF1dGhvcml0eSBYMzAeFw0xNzA5MjUwNzU1MDBaFw0xNzEyMjQwNzU1MDBaMB0xGzAZBgNVBAMTEmJsb3Fob3VzZS5kZG5zLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALE6QB4DaP6mK8ABxzOhBL1b3PdVWN8CFK1bBNo1dSv0tCFZa1pDqW5IacMRvwn4EFEoZE8YsrMB9P5Qc/6Z2ZbResQ31DX3hEKCzUwE0VNvRldUCQs1oVSBsi+JXeGy5+MP3G9eq5MJHcJvN2UhUjsHWF0GdewQH0nVL96hDdFx6zQV9ynKkq79p6JFRoZi2LWg3NF3Bso3lDyaBEgIGGLxm0F6MLjFTzrFooUYtJjrf3PMNpn8aoAc1TBfESA3OPPolTMOawZt9pBcci/wTWWGLPb+L4WhHmh8VpfcT6+b+Kn0FoWOBws6mbidqtkf40m4/zOsIyaluTGW2JovbwcCAwEAAaOCAhIwggIOMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUvFA37bFgwWzgeZlibMmG1dFdhDwwHwYDVR0jBBgwFoAUqEpqYwR93brm0Tm3pkVl7/Oo7KEwbwYIKwYBBQUHAQEEYzBhMC4GCCsGAQUFBzABhiJodHRwOi8vb2NzcC5pbnQteDMubGV0c2VuY3J5cHQub3JnMC8GCCsGAQUFBzAChiNodHRwOi8vY2VydC5pbnQteDMubGV0c2VuY3J5cHQub3JnLzAdBgNVHREEFjAUghJibG9xaG91c2UuZGRucy5uZXQwgf4GA1UdIASB9jCB8zAIBgZngQwBAgEwgeYGCysGAQQBgt8TAQEBMIHWMCYGCCsGAQUFBwIBFhpodHRwOi8vY3BzLmxldHNlbmNyeXB0Lm9yZzCBqwYIKwYBBQUHAgIwgZ4MgZtUaGlzIENlcnRpZmljYXRlIG1heSBvbmx5IGJlIHJlbGllZCB1cG9uIGJ5IFJlbHlpbmcgUGFydGllcyBhbmQgb25seSBpbiBhY2NvcmRhbmNlIHdpdGggdGhlIENlcnRpZmljYXRlIFBvbGljeSBmb3VuZCBhdCBodHRwczovL2xldHNlbmNyeXB0Lm9yZy9yZXBvc2l0b3J5LzANBgkqhkiG9w0BAQsFAAOCAQEAWzyWSp6BZMZfw9c8LQX8ZARi9GJjA3gi6Tb2bQh6cBmqqYfXH/KphBrMJP8b8TKanRytfolH4FZ6xL3b427+wLddN8Xc9zHFPg7kq2JUJ8U4mRNA8CNi3qyF2QmvNP/cjV4ISqc1VSkdB6DMidjecj7VHoI84+T4tbNi6Advf2UMShReMkCRKFw0RKnzDr+1c6tawkOMOdJOmvTu9t5HasRttY6JxdI02Tl5ad99tuHPPoAa3SmkgSum22lAVjPp3Htfqpp7TnIDDWXLVkcouD8C1AAV0kzW9eSaH2YJEEV/7YtmS2NhveMn484mZ/99QLFwrqsO75fbCSfIQTh+nA==-----END CERTIFICATE-----'

beforeAll(() => void 0)

afterAll(() => void 0)

describe('key-fingerprint', () => {
  describe('algorithms', () => {
    it('default', () => {
      expect(fingerprint(cert)).toMatchSnapshot()
    })

    for (const alg of algs) {
        it(alg, () => {
          expect(fingerprint(cert, alg)).toMatchSnapshot()
        })
        it(alg + ' with colons', () => {
          expect(fingerprint(cert, alg, true)).toMatchSnapshot()
        })
    }

    for (const alg of algs) {
      for (const enc of encs) {
        it(alg + ' with ' + enc + ' encoding', () => {
          expect(fingerprint(cert, { algorithm: alg, encoding: enc })).toMatchSnapshot()
        })
        it(alg + ' with ' + enc + ' encoding and with colons', () => {
          expect(fingerprint(cert, { algorithm: alg, encoding: enc, colons: true })).toMatchSnapshot()
        })
      }
    }
  })
})
