import { shared } from '@appblocks/node-sdk'

/**
 * Retrieve a list of plans based on specified filters.
 *
 * @swagger
 * /list_plans:
 *   get:
 *     summary: Retrieve a list of plans
 *     description: |
 *       Retrieves a list of plans created by the authenticated user, optionally filtered by start date, end date, count, and skip.
 *     tags:
 *       - Plans
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         description: Start date filter.
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         description: End date filter.
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Number of plans to retrieve.
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           format: int32
 *         description: Number of plans to skip.
 *     responses:
 *       '200':
 *         description: Successful response with the list of plans.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 msg:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                 data:
 *                   type: array
 *       '400':
 *         description: Bad request with an error message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                 msg:
 *                   type: string
 *                   description: A message indicating the error.
 *                 error:
 *                   type: object
 *                   description: Details of the error.
 *     security:
 *       - bearerAuth: []
 */
const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, sendResponse } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const { from, to, count, skip } = req.query || {}
    const query = { where: { createdBy: req.user.id } }
    if (from) query.where = { ...query.where, startDate: { gte: new Date(from) } }
    if (to) query.where = { ...query.where, endDate: { lte: new Date(to) } }
    if (count) query.take = Number(count)
    if (skip) query.skip = Number(skip)

    const plans = await prisma.plans.findMany(query)


    sendResponse(res, 200, { success: true, msg: `Plan retrieved successfully`, data: plans })
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
