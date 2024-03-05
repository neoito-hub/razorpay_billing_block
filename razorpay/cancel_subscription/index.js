import getRazorpayInstance from '../module/index.js'
import prisma from '../../prisma/index.js'

const cancelRazorpaySubscription = async (req, subscriptionData) => {
  try {
    const razorpayInstance = await getRazorpayInstance(req)
    const { id, serviceId } = subscriptionData || {}

    await razorpayInstance.subscriptions.cancel(serviceId)

    await prisma.subscriptions.update({ where: { id }, data: { status: 'cancelled' } })
  } catch (error) {
    console.log('Error razorpay cancel subscription!!!')
    console.log(error)
  }
}

export default cancelRazorpaySubscription
