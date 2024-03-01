/* eslint-disable no-prototype-builtins */
const validateCurrencyObjects = (arr) => {
  // Check if input is an array
  if (!Array.isArray(arr)) {
    return false
  }

  // Iterate through each object in the array
  for (const obj of arr) {
    // Check if the current item is an object
    if (typeof obj !== 'object' || obj === null) {
      return false
    }

    // Add your custom validation rules for each object property
    if (!obj.hasOwnProperty('countryName') || typeof obj.countryName !== 'string') {
      return false
    }

    if (!obj.hasOwnProperty('currencyCode') || typeof obj.currencyCode !== 'string') {
      return false
    }

    if (!obj.hasOwnProperty('timeZone') || !(obj.timeZone.length > 0)) {
      return false
    }

    // Add more validation rules as needed
  }

  // If all objects pass the validation, return true
  return true
}


export default { validateCurrencyObjects }
