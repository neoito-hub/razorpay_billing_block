import Vault from 'hashi-vault-js'

// development config
const vault = new Vault({
  //   https: true,
  baseUrl: `${process.env.BB_RAZORPAY_BILLING_BLOCK_VAULT_ADDR}/v1`,
  rootPath: 'secret',
  timeout: 5000,
  proxy: false,
})

export default vault

// prod config
// {
//   // Indicates if the HTTP request to the Vault server should use
//   // HTTPS (secure) or HTTP (non-secure) protocol
//   https: true,
//   // If https is true, then provide client certificate, client key and
//   // the root CA cert
//   // Client cert and key are optional now
//   cert: './client.crt',
//   key: './client.key',
//   cacert: './ca.crt',
//   // Indicate the server name/IP, port and API version for the Vault,
//   // all paths are relative to this one
//   baseUrl: 'https://127.0.0.1:8200/v1',
//   // Sets the root path after the base URL, it translates to a
//   // partition inside the Vault where the secret engine / auth method was enabled
//   // Can be passed individually on each function through mount parameter
//   rootPath: 'secret',
//   // HTTP request timeout in milliseconds
//   timeout: 1000,
//   // If should use a proxy or not by the HTTP request
//   // Example:
//   // proxy: { host: proxy.ip, port: proxy.port }
//   proxy: false,
//   // Namespace (multi-tenancy) feature available on all Vault Enterprise versions
//   namespace: 'admin'
// }