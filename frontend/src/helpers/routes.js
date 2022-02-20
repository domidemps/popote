import { forEach } from "lodash"

export const encodeParamsToUrl = (params) => {
  let formBody = []
  forEach(params, (paramValue, paramKey) => {
    const encodedKey = encodeURIComponent(paramKey)
    const encodedValue = encodeURIComponent(paramValue)
    formBody.push(encodedKey + "=" + encodedValue)
  })
  return formBody.join("&")
}
