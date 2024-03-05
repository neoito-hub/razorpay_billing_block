import vine from '@vinejs/vine'

const createPlanSchema = vine.object({
  name: vine.string(),
  amount: vine.number({ strict: true }).min(1),
  currency: vine.string(),
  interval: vine.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
  intervalCount: vine.number({ strict: true }),
  description: vine.string().optional(),
  metadata: vine.object({}).allowUnknownProperties().optional(),
})

const createSubscriptionSchema = vine.object({
  planId: vine.string(),
  userId: vine.string(),
  cycleCount: vine.number(),
  startDate: vine.string().optional(),
  expiryDate: vine.string().optional(),
  metadata: vine.object({}).allowUnknownProperties().optional(),
  serviceMeta: vine.object({}).allowUnknownProperties().optional(),
})

const createUserSubscriptionSchema = vine.object({
  planId: vine.string(),
  cycleCount: vine.number(),
  startDate: vine.string().optional(),
  expiryDate: vine.string().optional(),
  metadata: vine.object({}).allowUnknownProperties().optional(),
  serviceMeta: vine.object({}).allowUnknownProperties().optional(),
})

const availableCurrencySchema = vine.object({
  searchKeyword: vine.string().optional(),
  count: vine.number().optional(),
  skip: vine.number().optional(),
})

const updateSubscriptionSchema = vine.object({
  planId: vine.string().optional(),
  cycleCount: vine.number().optional(),
  metadata: vine.object({}).allowUnknownProperties().optional(),
})

const setDefaultCurrencySchema = vine.object({
  currencyID: vine.string(),
})

const addUserAddressSchema = vine.object({
  isPrimary: vine.boolean().optional(),
  name: vine.string(),
  line1: vine.string(),
  line2: vine.string().optional(),
  line3: vine.string().optional(),
  city: vine.string(),
  state: vine.string(),
  country: vine.string(),
  postalCode: vine.string(),
  addressType: vine.enum(['billing_address', 'shipping_address']),
})

const updateUserAddressSchema = vine.object({
  id: vine.string(),
  isPrimary: vine.boolean().optional(),
  name: vine.string().optional(),
  line1: vine.string(),
  line2: vine.string().optional(),
  line3: vine.string().optional(),
  city: vine.string().optional(),
  state: vine.string().optional(),
  country: vine.string().optional(),
  postalCode: vine.string().optional(),
  addressType: vine.enum(['billing_address', 'shipping_address']).optional(),
})

export default {
  createPlanSchema,
  createUserSubscriptionSchema,
  createSubscriptionSchema,
  updateSubscriptionSchema,
  availableCurrencySchema,
  setDefaultCurrencySchema,
  addUserAddressSchema,
  updateUserAddressSchema,
}
