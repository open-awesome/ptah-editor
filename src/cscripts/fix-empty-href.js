export function fixEmptyHref () {
  // --- find all empty links
  // --- and replace empty href for each
  document
    .querySelectorAll('a[href=""]')
    .forEach(link => link.setAttribute('href', 'javascript:void(0)'))
}

void fixEmptyHref()
