export function gallerySwitch() {
  const TARGET_PREVIEW = 'gallery-one-preview'
  const TARGET_STAGE = 'gallery-one-stage'
  const PREVIEW_ACTIVE_CLASS = 'b-preview_active'
  const ACTIVE_STAGE_CLASS = 'loader__content_show'

  const galleries = Array
    .from(document.querySelectorAll('.b-gallery-switch'))
    .map((node, id) => { return { node, id } })

  galleries.forEach((gallery) => {
    gallery.stages = setStages(gallery)
  })

  galleries.forEach((gallery) => {
    gallery.previews = setPreviews(gallery)
  })

  function setPreviews(gallery) {
    let previews = Array
      .from(gallery.node.querySelectorAll(`[${TARGET_PREVIEW}]`))
      .map((node, id) => {
        return {
          node,
          id
        }
      })

    previews.forEach((preview) => {
      addEvent(preview, gallery)
    })

    return previews
  }

  function setStages(gallery) {
    return Array.from(gallery.node.querySelectorAll(`[${TARGET_STAGE}]`))
  }

  function addEvent(preview, gallery) {
    preview.node.addEventListener('click', function (e) {
      e.preventDefault()
      gallery.previews.forEach(item => item.node.classList.remove(PREVIEW_ACTIVE_CLASS))
      gallery.stages.forEach(stage => stage.classList.remove(ACTIVE_STAGE_CLASS))

      preview.node.classList.add(PREVIEW_ACTIVE_CLASS)
      gallery.stages[preview.id].classList.add(ACTIVE_STAGE_CLASS)
    })
  }
}

gallerySwitch()
