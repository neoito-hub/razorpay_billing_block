import Razorpay from 'razorpay'
import vault from '../../vault/index.js'

const getRazorpayInstance = async (req) => {
  const { vendor } = req.headers

  await vault.healthCheck()

  const readData = await vault.readKVSecret(process.env.BB_RAZORPAY_BILLING_BLOCK_VAULT_TOKEN, vendor)
  const config = readData.data

  const razorpayInstance = new Razorpay(config)

  return razorpayInstance
}

export default getRazorpayInstance