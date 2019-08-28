;
export function galleryTwo() {
  const TARGET_LINK = 'gallery-two-popup-link';
  const TARGET_IMAGE_URl = 'gallery-two-popup-image-url';
  const TARGET_VIDEO_URl = 'gallery-two-popup-video-url';
  const TARGET_POPUP = 'gallery-two-popup';
  const TARGET_POPUP_PADD = 'gallery-two-popup-padd';
  const TARGET_POPUP_CONTENT = 'gallery-two-popup-content';
  const TARGET_POPUP_CLOSE = 'gallery-two-popup-close';
  const TARGET_POPUP_PREV = 'gallery-two-popup-prev';
  const TARGET_POPUP_NEXT = 'gallery-two-popup-next';
  const TARGET_POPUP_TYPE_CONTENT = 'gallery-two-popup-type-content';

  var links = document.querySelectorAll('[' + TARGET_LINK + ']');
  var popup = document.querySelectorAll('[' + TARGET_POPUP + ']')[0];
  var popupP = document.querySelectorAll('[' + TARGET_POPUP_PADD + ']')[0];
  var popupC = document.querySelectorAll('[' + TARGET_POPUP_CONTENT + ']')[0];
  var popupX = document.querySelectorAll('[' + TARGET_POPUP_CLOSE + ']')[0];
  var prev = document.querySelectorAll('[' + TARGET_POPUP_PREV + ']')[0];
  var next = document.querySelectorAll('[' + TARGET_POPUP_NEXT + ']')[0];
  var typeContent = document.querySelectorAll('[' + TARGET_POPUP_TYPE_CONTENT + ']')[0];
  var defUrl = 'https://gn652.cdn.gamenet.ru/TY0Xv2riHu/772iV/o_cDot3.png';
  var index = null;

  if (links.length === 0) {
    return;
  }

  [].forEach.call(links, function (el, i) {
    el.onclick = function (e) {
      clickLink(el, i);
    };
  });

  if (popupX) {
    popupX.onclick = function (e) {
      closePopup();
    };
  }

  if (prev) {
    prev.onclick = function (e) {
      clickArr(index - 1);
    };
  }

  if (next) {
    next.onclick = function (e) {
      clickArr(index + 1);
    };
  }

  function clickLink(el, i) {
    var content = '';
    let youtubeVideoUrl = false
    let contentPopup = ''
    let imageUrl = el.getAttribute(TARGET_IMAGE_URl);
    let videoUrl = el.getAttribute(TARGET_VIDEO_URl);
    let typeContent = el.getAttribute(TARGET_POPUP_TYPE_CONTENT);
    let url = ''


    if (imageUrl !== '' && imageUrl !== null && typeContent === 'default') {
      url = imageUrl
    } else if (videoUrl !== '') {
      url = videoUrl
    } else {
      url = defUrl
    }

    youtubeVideoUrl = matchYoutubeUrl(url);
    if (typeContent === 'default') {
      contentPopup = '<img style="max-width: 100%; max-height: 100%;" id="content" src="' + url + '"></img>'
    } else {
      if (youtubeVideoUrl) {
        contentPopup = '<iframe allow="autoplay" id="popupIframeVideo" width="100%" height="100%" src="https://www.youtube.com/embed/' + youtubeVideoUrl + '?rel=0&amp;wmode=transparent&amp;autoplay=1&amp;enablejsapi=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>'
      } else {
        contentPopup = '<video autoplay="autoplay" style="width: 100%; height: 100%;" id="popupVideo" controls="controls" src="' + videoUrl + '" loop="loop" type="video/mp4"></video>'
      }
    }

    index = i;
    popupP.style.width = "100%";
    popupP.style.height = "100%";
    popupP.style.margin = "0 auto";
    popupC.innerHTML = contentPopup;

    setTimeout(opepPopup(), 500);
  }

  function opepPopup() {
    popup.style.display = "flex";

    if (index === 0) {
      prev.style.display = "none";
      next.style.display = "flex";
    } else if (index === links.length - 1) {
      prev.style.display = "flex";
      next.style.display = "none";
    } else {
      prev.style.display = "flex";
      next.style.display = "flex";
    }

    mainClassToggle(true);
  }

  function mainClassToggle(value) {
    let bl = document.getElementById('main')

    if (value) {
      bl.classList.add("main_showPopup");
    } else if (bl.classList.contains("main_showPopup")) {
      bl.classList.remove("main_showPopup");
    }
  }

  function closePopup() {
    var c = document.getElementById('layoutContent');

    popupC.innerHTML = "";
    c.style.width = '';
    c.style.height = '';
    popup.style.display = "none";

    mainClassToggle(false);
  }

  function matchYoutubeUrl(url) {
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    let matches = url.match(p)
    if (matches) {
      return matches[1]
    }
    return false
  }

  function clickArr(i) {
    clickLink(links[i], i);
  }

}

galleryTwo();
