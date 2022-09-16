export const sleep = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res()
    }, time)
  })
}

export const isFirefox =
    navigator.userAgent.indexOf('Firefox') >= 0 &&
    navigator.userAgent.indexOf('Windows') >= 0

export const getRandom = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min)
}

export const getImg = (width, height) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = width
  canvas.height = height
  ctx.fillStyle = `rgb(
    ${getRandom(100, 255)},
    ${getRandom(100, 255)},
    ${getRandom(100, 255)}
  )`
  ctx.fillRect(0, 0, width, height)
  // 随机画10个图形
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = `rgb(
      ${getRandom(100, 255)},
      ${getRandom(100, 255)},
      ${getRandom(100, 255)}
    )`
    ctx.strokeStyle = `rgb(
      ${getRandom(100, 255)},
      ${getRandom(100, 255)},
      ${getRandom(100, 255)}
    )`

    if (getRandom(0, 2) > 1) {
      // 矩形
      ctx.save()
      ctx.rotate((getRandom(-90, 90) * Math.PI) / 180)
      ctx.fillRect(
        getRandom(-20, canvas.width - 20),
        getRandom(-20, canvas.height - 20),
        getRandom(10, canvas.width / 2 + 10),
        getRandom(10, canvas.height / 2 + 10)
      )
      ctx.restore()
    } else {
      // 圆
      ctx.beginPath()
      const ran = getRandom(-Math.PI, Math.PI)
      ctx.arc(
        getRandom(0, canvas.width),
        getRandom(0, canvas.height),
        getRandom(10, canvas.height / 2 + 10),
        ran,
        ran + Math.PI * 1.5
      )
      ctx.closePath()
      ctx.fill()
    }
  }
  return canvas.toDataURL('image/png')
}
