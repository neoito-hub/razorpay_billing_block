import getRazorpayInstance from '../module/index.js'

const listRazorpayPlans = async (req) => {

  const razorpayInstance = await getRazorpayInstance(req)

  const { from, to, count, skip } = req.query || {}
  const query = {}
  if (from) query.from = from
  if (to) query.to = to
  if (count) query.count = count
  if (skip) query.skip = skip

  const plans = await razorpayInstance.plans.all(query)
  return plans
}

export default listRazorpayPlans
