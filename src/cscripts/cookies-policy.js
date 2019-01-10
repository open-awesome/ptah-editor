export function initCookiesPolicy () {
  let container = document.getElementById('cookies-policy')
  if (!container) {
    return
  }

  let close = document.getElementById('cookies-policy-close')
  close.onclick = function () {
    container.remove()
    document.cookie = 'cookiePolicyViewed=true'
  }
}

void initCookiesPolicy()
