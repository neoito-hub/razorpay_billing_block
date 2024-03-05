import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, validateCurrencyObjects, healthCheck, getBody, sendResponse,  } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    if (!validateCurrencyObjects(reqBody.currencies)) {
     throw new Error("Bad Request")
    }
    const { currencies } = reqBody
    let addedCurrencies

    console.log("currencies are",currencies)

    if (currencies.length > 0) {
    addedCurrencies = await prisma.currency.createMany({
        data: currencies,
      })
    }
    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Currencies added successfully`, data: addedCurrencies })
  } catch (error) {
    console.log('error is', error)
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
