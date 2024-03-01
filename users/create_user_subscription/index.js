import { shared } from '@appblocks/node-sdk'
import { nanoid } from 'nanoid'

const handler = async (event) => {
  const { req, res } = event

  const { razorpay, prisma, healthCheck, getBody, sendResponse, validateBody, constants } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'createUserSubscriptionSchema')

    const planData = await prisma.plans.findFirst({
      where: { id: reqBody.planId, isSynced: true },
      select: { id: true, serviceId: true },
    })
    if (!planData) throw new Error('No plans found')

    const trailDate = new Date()
    trailDate.setDate(trailDate.getDate() + constants.DEFAULT_TRAIL_DAYS)

    reqBody.startDate = trailDate

    const savedData = await prisma.subscriptions.create({
      data: { id: nanoid(), userId: req.user.id, ...reqBody },
    })

    savedData.planId = planData.serviceId

    const subscribedData = await razorpay.createRazorpaySubscription(req, savedData)

    if (subscribedData.error) throw subscribedData.error

    sendResponse(res, 200, {
      success: true,
      msg: `Subscription created successfully`,
      data: { paymentUrl: subscribedData.short_url },
    })
  } catch (error) {
    console.log(error)
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
