import { shared } from '@appblocks/node-sdk'
import { nanoid } from 'nanoid'

const handler = async (event) => {
  const { req, res } = event

  const { razorpay, prisma, healthCheck, getBody, sendResponse, validateBody, constants } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'createSubscriptionSchema')

    const planData = await prisma.plans.findFirst({
      where: { id: reqBody.planId },
      select: { id: true, serviceId: true },
    })
    if (!planData) throw new Error('No plans found')

    if (!reqBody.startDate) {
      const trailDate = new Date()
      trailDate.setDate(trailDate.getDate() + constants.DEFAULT_TRAIL_DAYS)
      reqBody.startDate = trailDate
    }

    const savedData = await prisma.subscriptions.create({
      data: { id: nanoid(), createdBy: req.user.id, ...reqBody },
    })

    savedData.planId = planData.serviceId
    sendResponse(res, 200, { success: true, msg: `Subscription created successfully`, data: { savedData } })

    await razorpay.createRazorpaySubscription(req, savedData)
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
