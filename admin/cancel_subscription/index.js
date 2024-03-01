import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { razorpay, prisma, healthCheck, getBody, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    const data = await prisma.subscriptions.findFirst({
      where: { createdBy: req.user.id, id: reqBody.subscriptionId },
    })

    if (!data) throw new Error('Subscription for user not found')

    await razorpay.cancelRazorpaySubscription(req, data)

    sendResponse(res, 200, { success: true, msg: `Subscription cancelled successfully` })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
