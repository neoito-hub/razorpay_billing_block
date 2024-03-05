import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { razorpay, prisma, healthCheck, getBody, sendResponse, validateBody } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'updateSubscriptionSchema')

    const data = await prisma.subscriptions.findFirst({
      where: { userId: req.user.id, id: reqBody.subscriptionId },
    })

    if (!data) throw new Error('Subscription for user not found')

    let plan
    if (reqBody.planId) {
      plan = await prisma.plans.findFirst({
        where: { isSynced: true, id: reqBody.planId },
      })

      if (!plan) throw new Error('Plan not found')
    }

    delete reqBody.subscriptionId

    await razorpay.updateRazorpaySubscription(req, { ...data, ...reqBody, planServiceId: plan?.serviceId })

    sendResponse(res, 200, { success: true, msg: `Subscription updated successfully` })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
