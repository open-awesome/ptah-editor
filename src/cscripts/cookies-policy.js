import { setCookie, getCookie } from '../editor/util'

const POLICY_NAME = 'cookiePolicy'

export function initCookiesPolicy () {
  let container = document.getElementById('cookies-policy')
  if (!container) {
    return
  }

  let close = document.getElementById('cookies-policy-close')
  close.onclick = function () {
    container.remove()
    void setCookie(POLICY_NAME, 'true', { expires: 60 })
  }

  let policyViewed = getCookie(POLICY_NAME)
  if (policyViewed) {
    close.click()
  }
}

void initCookiesPolicy()
