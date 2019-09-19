;
export function tabsClick() {
  let tabs = (section) => {
    const TARGET_TABS_LINKS = 'tabs-link';
    const TARGET_TABS_CONTENTS = 'tabs-content';

    let links = section.querySelectorAll('['+ TARGET_TABS_LINKS +']');
    let content = section.querySelectorAll('['+ TARGET_TABS_CONTENTS +']');
    for(var i=0; i < links.length; i++) {
      (function(i) {
        var link = links[i];
        link.onclick = function() {
          if (link.classList.contains('b-system-platforms__item_active')) {
            return false
          }
          for(var k=0; k < links.length; k++) {
            var l = links[k];

            if (k != i) {
              l.classList.remove('b-system-platforms__item_active');
            }
          }
          link.classList.toggle('b-system-platforms__item_active');
          for(var j=0; j < content.length; j++) {
            var display = window.getComputedStyle(content[j]).display;
            if(display == "block") {
              content[j].style.display = "none";
            }
          }
          content[i].style.display = "block";
        }
      })(i);
    }
  }

  Array
    .from(document.querySelectorAll('.b-system'))
    .forEach((section) => {
      tabs(section)
    })
}

tabsClick();
