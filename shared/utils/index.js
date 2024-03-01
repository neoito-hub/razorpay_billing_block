/**
 * Function to format and send response
 * @param {*} res
 * @param {*} code
 * @param {*} data
 * @param {*} type
 */
const sendResponse = (res, code, data, type = 'application/json') => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    'Content-Type': type,
  }

  res.writeHead(code, headers)
  res.write(JSON.stringify(data))
  res.end()
}

/**
 * Function to extract the body from the request
 * @param {*} req
 * @returns
 */
const getBody = async (req) => {
  const bodyBuffer = []
  for await (const chunk of req) {
    bodyBuffer.push(chunk)
  }
  const data = Buffer.concat(bodyBuffer).toString()
  return JSON.parse(data || '{}')
}

const healthCheck = (req, res) => {
  if (req.params.health === 'health') {
    sendResponse(res, 200, { success: true, message: 'Health check success' })
    return true
  }
  return false
}

const currencyConvertor = (currency) => (currency ?? 0) * 100

const convertToUnixTimeStamp = (dateString) => {
  const date = new Date(dateString)
  const unixTimestamp = date.getTime()
  return Math.floor(unixTimestamp / 1000)
}

const checkDefaultPlan = async (prisma, planName, planPeriod, currency) => {
  const defaultCurrencyData = await prisma.$queryRaw`
  with dc as (select cu.id,cu."currencyCode" from currency cu where "isDefault"),
  pl as (select p.id,dc."currencyCode" from plans p,dc where p.currency=dc."currencyCode" and 
  p.name=${planName} and p.interval=${planPeriod} )
  select coalesce(pl.id,'') as "defaultPlanID",dc."currencyCode" as "defaultCurrencyCode" from dc left join pl on true
    `

  const { defaultPlanID, defaultCurrencyCode } = defaultCurrencyData[0] ?? {}

  if (defaultCurrencyCode !== currency && !(defaultPlanID?.length > 0)) {
    throw new Error('Please create plan in default currency first')
  }
}

export default { healthCheck, getBody, sendResponse, currencyConvertor, convertToUnixTimeStamp, checkDefaultPlan }
