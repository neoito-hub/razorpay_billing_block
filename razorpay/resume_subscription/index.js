import getRazorpayInstance from '../module/index.js'
import prisma from '../../prisma/index.js'

const resumeRazorpaySubscription = async (req, subscriptionData) => {
  try {
    const razorpayInstance = await getRazorpayInstance(req)
    const { id, serviceId } = subscriptionData || {}

    await razorpayInstance.subscriptions.resume(serviceId)

    await prisma.subscriptions.update({ where: { id }, data: { status: 'active' } })
  } catch (error) {
    console.log('Error razorpay resume subscription!!!')
    console.log(error)
  }
}

export default resumeRazorpaySubscription
