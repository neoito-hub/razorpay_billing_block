import getRazorpayInstance from '../module/index.js'
import prisma from '../../prisma/index.js'
import utils from '../../utils/index.js'

const createRazorpaySubscription = async (req, subscriptionData) => {
  try {
    const razorpayInstance = await getRazorpayInstance(req)
    const { id, ...data } = subscriptionData || {}

    const razorpayRes = await razorpayInstance.subscriptions.create({
      plan_id: data.planId,
      total_count: data.cycleCount,
      addons: data.serviceMeta?.addons,
      offer_id: data.serviceMeta?.offerId,
      customer_notify: data.serviceMeta?.customerNotify,
      quantity: data.serviceMeta?.quantity,
      notes: data.metadata,
      start_at: data.startDate ? utils.convertToUnixTimeStamp(data.startDate) : undefined, // can be used for trial period setup
      expire_by: data.expiryDate ? utils.convertToUnixTimeStamp(data.expiryDate) : undefined,
    })

    if (!data.serviceMeta) data.serviceMeta = {}

    await prisma.subscriptions.update({
      where: { id },
      data: {
        isSynced: true,
        serviceId: razorpayRes.id,
        service: 'razorpay',
        serviceMeta: { ...data.serviceMeta, ...razorpayRes },
      },
    })

    return razorpayRes
  } catch (error) {
    console.log('Error razorpay create subscription!!!')
    console.log(error)
    return { error }
  }
}

export default createRazorpaySubscription
