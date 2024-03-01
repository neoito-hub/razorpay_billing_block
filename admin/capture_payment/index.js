import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { healthCheck, getBody, sendResponse, prisma } = await shared.getShared()

  try {
    // health check
    if (healthCheck(req, res)) return

    const reqBody = await getBody(req)

    console.log(`======WEBHOOK ${reqBody.event}======\n`)
    console.log(JSON.stringify(reqBody))
    console.log(`\n======WEBHOOK payload END======\n`)

    // ==== Subscribed Webhooks ====
    // subscription.activated
    // subscription.authenticated
    // invoice.paid

    if (reqBody.event.includes('subscription.')) {
      const subscribedData = reqBody.payload.subscription.entity

      await prisma.subscriptions.update({
        where: {
          serviceId: subscribedData.id,
          service: 'razorpay',
        },
        data: {
          status: subscribedData.status,
        },
      })
    } else if (reqBody.event.includes('invoice.')) {
      const invoiceData = reqBody.payload.invoice.entity

      const subscriptionData = await prisma.subscriptions.findFirst({
        where: {
          serviceId: invoiceData.subscription_id,
        },
        include: {
          plan: true,
        },
      })

      await prisma.subscription_invoices.create({
        data: {
          serviceId: invoiceData.id,
          serviceMeta: invoiceData,
          subscriptionId: subscriptionData.id,
          planId: subscriptionData.plan.id,
        },
      })
    }

    sendResponse(res, 200, { success: true, msg: `success` })
  } catch (error) {
    console.log('capture payment error ', error)
    sendResponse(res, 400, { success: false, msg: error.message || `Something went wrong`, error })
  }
}

export default handler
