import { Base64 } from 'js-base64'
const salt1 = 'VUE-ANTD-PRO'
const salt2 = 'FRONTEND'
export function encryptpwd (pwd) {
  return Base64.encode(salt1 + pwd + salt2)
}
