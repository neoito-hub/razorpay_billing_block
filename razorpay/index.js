/* eslint-disable import/extensions */
// eslint-disable-next-line import/extensions
import getRazorpayInstance from './module/index.js'
import createRazorpayPlan from './create_plan/index.js'
import listRazorpayPlans from './list_plans/index.js'
import listRazorpaySubscriptions from './list_subscriptions/index.js'
import cancelRazorpaySubscription from './cancel_subscription/index.js'
import createRazorpaySubscription from './create_subscription/index.js'
import updateRazorpaySubscription from './update_subscription/index.js'
import resumeRazorpaySubscription from './resume_subscription/index.js'
import pauseRazorpaySubscription from './pause_subscription/index.js'
import listRazorpaySubscriptionInvoices from './list_subscription_invoices/index.js'

export default {
  getRazorpayInstance,
  createRazorpayPlan,
  createRazorpaySubscription,
  listRazorpayPlans,
  listRazorpaySubscriptions,
  updateRazorpaySubscription,
  resumeRazorpaySubscription,
  pauseRazorpaySubscription,
  cancelRazorpaySubscription,
  listRazorpaySubscriptionInvoices,
}
