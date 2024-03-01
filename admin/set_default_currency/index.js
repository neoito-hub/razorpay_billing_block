import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, validateBody, healthCheck, getBody, sendResponse,  } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'setDefaultCurrencySchema')

    const { currencyID } = reqBody


    if (currencyID.length>0) {
     await prisma.$queryRaw`
    update currency cu set "isDefault"=case when 
    cu.id=${currencyID} then true else false end `
    }
    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Default Currency set successfully`, data: {} })
  } catch (error) {
    console.log('error is', error)
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
