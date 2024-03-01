import getRazorpayInstance from '../module/index.js'
import prisma from '../../prisma/index.js'

const pauseRazorpaySubscription = async (req, subscriptionData) => {
  try {
    const razorpayInstance = await getRazorpayInstance(req)
    const { id, serviceId } = subscriptionData || {}

    await razorpayInstance.subscriptions.pause(serviceId)

    await prisma.subscriptions.update({ where: { id }, data: { status: 'paused' } })
  } catch (error) {
    console.log('Error razorpay pause subscription!!!')
    console.log(error)
  }
}

export default pauseRazorpaySubscription
