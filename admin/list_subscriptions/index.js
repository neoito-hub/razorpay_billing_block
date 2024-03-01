import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { razorpay, prisma, healthCheck, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const { from, to, count, skip } = req.query || {}
    const query = { where: { createdBy: req.user.id } }
    if (from) query.where = { ...query.where, startDate: { gte: new Date(from) } }
    if (to) query.where = { ...query.where, endDate: { lte: new Date(to) } }
    if (count) query.take = Number(count)
    if (skip) query.skip = Number(skip)

    const subscriptions = await prisma.subscriptions.findMany(query)

    const razSubs = await razorpay.listRazorpaySubscriptions(req)

    sendResponse(res, 200, {
      success: true,
      msg: `Subscription retrieved successfully`,
      data: { subscriptions, razSubs },
    })
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
