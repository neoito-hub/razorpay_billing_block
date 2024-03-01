import getRazorpayInstance from '../module/index.js'

const listRazorpaySubscriptionInvoices = async (req, data) => {
  const razorpayInstance = await getRazorpayInstance(req)

  const subscriptionInvoices = await razorpayInstance.invoices.all(data)
  return subscriptionInvoices
}

export default listRazorpaySubscriptionInvoices
