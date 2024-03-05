import { shared } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  const { healthCheck, sendResponse, getBody, validateBody, constants } = await shared.getShared()

  const allowedCurrencyData = constants.ALLOWED_CURRENCY_DATA

  try {
    // health check
    if (healthCheck(req, res)) return
    const reqBody = await getBody(req)

    await validateBody(reqBody, 'availableCurrencySchema')

    // eslint-disable-next-line prefer-const
    let { searchKeyword = '', count = 10, skip = 0 } = reqBody

    let currencyData = Object.keys(allowedCurrencyData.countries)
      .map((k) => allowedCurrencyData.countries[k])
      .sort((a, b) => a.countryName - b.countryName)
    const responseData = {}

    if (searchKeyword.length > 0) {
      searchKeyword = searchKeyword.toLowerCase()
      currencyData = currencyData.filter((item) => {
        const { countryName } = item
        if (countryName?.toLowerCase().includes(searchKeyword)) return item

        return null
      })
    }

    responseData.totalCount = currencyData.length

    if (count) {
      const startIndex = skip * count
      const endIndex = startIndex + count
      responseData.data = currencyData.slice(startIndex, endIndex)
    }

    // Add your code here
    sendResponse(res, 200, { success: true, msg: `Available currencies retrieved successfully`, data: responseData })
  } catch (error) {
    sendResponse(res, 400, { success: false, msg: `Something went wrong`, error })
  }
}

export default handler
