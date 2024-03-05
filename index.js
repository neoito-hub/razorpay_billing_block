import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, sendResponse, constants } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const { from, to, count, skip } = req.query || {}
    const query = { where: { userId: req.user.id } }
    if (from) query.where = { ...query.where, startDate: { gte: new Date(from) } }
    if (to) query.where = { ...query.where, endDate: { lte: new Date(to) } }
    query.take = Number(count ?? constants.DEFAULT_PAGE_COUNT)
    query.skip = Number(skip ?? 0)

    const addresses = await prisma.addresses.findMany(query)

    sendResponse(res, 200, { success: true, msg: `Addresses retrieved successfully`, data: addresses })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
