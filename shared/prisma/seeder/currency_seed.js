// eslint-disable-next-line import/extensions
import allowedCurrencyData from '../../constants/allowedCurrencyData.js'

async function createCurrency(prisma) {
  Object.keys(allowedCurrencyData.countries).forEach((item) => {
    console.log('item is', item)
  })

  console.log('prisma is', prisma)

  // const tenant = await prisma.tenant.upsert({
  //   where: {
  //     id: tenantID,
  //   },
  //   update: {},
  //   create: {
  //     id: tenantID,
  //     name: 'Appblocks',
  //     display_name: 'Appblocks',
  //   },
  // })

  // console.log('tenant is \n', tenant)
}

export {
  // eslint-disable-next-line import/prefer-default-export
  createCurrency,
}
