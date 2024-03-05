import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, sendResponse, constants } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const { from, to, count, skip, currency } = req.query || {}
    const query = { where: { isSynced: true, currency: currency ?? constants.DEFAULT_CURRENCY  } }
    if (from) query.where = { ...query.where, startDate: { gte: new Date(from) } }
    if (to) query.where = { ...query.where, endDate: { lte: new Date(to) } }
    query.take = Number(count ?? constants.DEFAULT_PAGE_COUNT)
    query.skip = Number(skip ?? 0)

    const plans = await prisma.plans.findMany(query)

    sendResponse(res, 200, { success: true, msg: `Plan retrieved successfully`, data: plans })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
