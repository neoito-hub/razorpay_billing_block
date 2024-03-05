import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, sendResponse, getBody } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    const whereQuery = {}

    if (reqBody.subscriptionId) {
      whereQuery.subscriptionId = reqBody.subscriptionId
    }

    const data = await prisma.subscription_invoices.findMany({
      where: whereQuery,
      include: { subscription: true, plan: true },
    })

    if (!data) throw new Error('Subscription not found')

    sendResponse(res, 200, { success: true, msg: `Invoices retrieved successfully`, data })
  } catch (error) {
    console.log('error is', error)
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
