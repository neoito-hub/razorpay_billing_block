import getRazorpayInstance from '../module/index.js'
import prisma from '../../prisma/index.js'
import utils from '../../utils/index.js'

const updateRazorpaySubscription = async (req, subscriptionData) => {
  try {
    const razorpayInstance = await getRazorpayInstance(req)
    const { id, ...data } = subscriptionData || {}

    const updateData = {
      addons: data.serviceMeta?.addons,
      offer_id: data.serviceMeta?.offerId,
      customer_notify: data.serviceMeta?.customerNotify,
      quantity: data.serviceMeta?.quantity,
      notes: data.metadata,
      start_at: data.startDate ? utils.convertToUnixTimeStamp(data.startDate) : undefined,
      expire_by: data.expiryDate ? utils.convertToUnixTimeStamp(data.expiryDate) : undefined,
    }

    if (data.planServiceId) updateData.plan_id = data.planServiceId
    else if (data.cycleCount) updateData.total_count = data.cycleCount

    await razorpayInstance.subscriptions.update(data.serviceId, updateData)

    delete data.planServiceId

    await prisma.subscriptions.update({ where: { id }, data })

  } catch (error) {
    console.log('Error razorpay update subscription!!!\n', error)
    throw error
  }
}

export default updateRazorpaySubscription
