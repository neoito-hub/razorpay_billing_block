import getRazorpayInstance from '../module/index.js'
import prisma from '../../prisma/index.js'
import utils from '../../utils/index.js'

const createRazorpayPlan = async (req, planData) => {
  try {
    const razorpayInstance = await getRazorpayInstance(req)

    const { id, ...data } = planData || {}
    const razorpayRes = await razorpayInstance.plans.create({
      item: {
        name: data.name,
        amount: utils.currencyConvertor(data.amount),
        currency: data.currency,
        description: data.description,
      },
      period: data.interval,
      interval: data.intervalCount,
      notes: data.metadata,
    })

    await prisma.plans.update({
      where: { id },
      data: { isSynced: true, serviceId: razorpayRes.id, service: 'razorpay' },
    })
  } catch (error) {
    console.log('Error razorpay create plan!!!')
    console.log(error)
  }
}

export default createRazorpayPlan
