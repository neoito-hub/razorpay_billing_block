import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { vault, healthCheck, getBody, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    const savedData = await vault.createKVSecret(process.env.BB_RAZORPAY_BILLING_BLOCK_VAULT_TOKEN, reqBody.key, reqBody.value)

    sendResponse(res, 200, { success: true, msg: `KV created successfully`, data: savedData })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
