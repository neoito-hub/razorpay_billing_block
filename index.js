import { shared } from '@appblocks/node-sdk'
import { nanoid } from 'nanoid'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, getBody, sendResponse, validateBody, checkDefaultPlan, razorpay } =
    await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'createPlanSchema')

    await checkDefaultPlan(prisma, reqBody.name, reqBody.interval, reqBody.currency)

    const savedData = await prisma.plans.create({
      data: { id: nanoid(), createdBy: req.user.id, ...reqBody },
    })

    sendResponse(res, 200, { success: true, msg: `Plan created successfully`, data: savedData })

    await razorpay.createRazorpayPlan(req, savedData)
  } catch (error) {
    console.log('error is', error)
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
