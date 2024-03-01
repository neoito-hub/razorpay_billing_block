import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { prisma, healthCheck, getBody, sendResponse, validateBody } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    await validateBody(reqBody, 'updateUserAddressSchema')

    const { id, ...updateData } = reqBody

    await prisma.address.create({
      where: {
        userId: req.user.id,
        id,
      },
      data: updateData,
    })

    sendResponse(res, 200, { success: true, msg: `Address updated successfully` })
  } catch (error) {
    console.log(error)
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
