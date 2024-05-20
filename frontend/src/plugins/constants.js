import { getVectorByBoundingBox } from '../plugins/functions'

const Instruments = Object.freeze({
  UNSELECT_TOOLS: -1,
  BLOCK_DEFALULT: 0,
  BLOCK_DATA: 0,
  BLOCK_RECORDED_DATA: 1,
  BLOCK_RAM: 2,
  BLOCK_SEQUENTIAL_ACCESS_MEMORY: 3,
  BLOCK_DIRECT_ACCESS_MEMORY: 4,
  BLOCK_DOCUMENT: 5,
  BLOCK_MANUAL_INPUT: 6,
  BLOCK_CARD: 7,
  BLOCK_PAPER_TAPE: 8,
  BLOCK_DISPLAY: 9,
  BLOCK_PROCESS: 10,
  BLOCK_DEFINED_PROCESS: 11,
  BLOCK_MANUAL_OPERATION: 12,
  BLOCK_PREPARATION: 13,
  BLOCK_DECISION: 14,
  ARROW_DEFAULT: 15,
  PARAMETERS_SELECT: 16
})

function isValidInstrument (toolIndex) {
  // console.log(toolIndex)
  let retVal = false
  for (const tool in Instruments) {
    const toolValue = Instruments[tool]
    if (toolValue === toolIndex) {
      retVal = true
    }
  }
  // console.log(retVal)
  return retVal
}

const Blocks = {
  [Instruments.BLOCK_DATA]: {
    img: 'Data',
    description: 'Данные',
    getPath (block) {
      const angleCoeffic = 0.25
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2), cY + (h / 2))
      retPath.lineTo(cX - (w / 2) + angleCoeffic * h, cY - (h / 2))
      retPath.lineTo(cX + (w / 2), cY - (h / 2))
      retPath.lineTo(cX + (w / 2) - angleCoeffic * h, cY + (h / 2))
      retPath.closePath() */
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2) + angleCoeffic * h) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2) - angleCoeffic * h) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'Z'
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const slopeCoef = 0.25
      const w = block.sizeX - slopeCoef * block.sizeY * 2
      const h = block.sizeY
      const t = block.centerY - block.sizeY / 2
      const l = block.centerX - block.sizeX / 2 + block.sizeY * slopeCoef
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_RECORDED_DATA]: {
    img: 'RecData',
    description: 'Запоминаемые данные',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const radius = h
      const arcAngle = Math.asin((h / 2) / radius) * 2
      const xOffset = radius * (1 - Math.cos(arcAngle / 2))
      /* const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2) + xOffset, cY + (h / 2))
      retPath.arc(cX - (w / 2) + radius, cY, radius, Math.PI - (arcAngle / 2), Math.PI + (arcAngle / 2))
      retPath.lineTo(cX + (w / 2), cY - (h / 2))
      retPath.arc(cX + (w / 2) + radius - xOffset, cY, radius, Math.PI + (arcAngle / 2), Math.PI - (arcAngle / 2), true)
      retPath.lineTo(cX - (w / 2) + xOffset, cY + (h / 2))
      retPath.closePath() */
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2) + xOffset) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + (cX - (w / 2) + xOffset) + ' ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + (cX + (w / 2)) + ' ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2) + xOffset) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'Z'
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const arcOffset = block.sizeY * (1 - Math.cos(1 / 2))
      const w = block.sizeX - arcOffset * 2
      const h = block.sizeY
      const t = block.centerY - block.sizeY / 2
      const l = block.centerX - block.sizeX / 2 + arcOffset
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_RAM]: {
    img: 'RAM',
    description: 'Оперативное ЗУ',
    getPath (block) {
      // const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const offset = 0.15 * h
      let retPath = ''
      retPath += 'M ' + (cX - (h / 2)) + ', ' + (cY - (h / 2)) + '\n'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (h / 2), cY - (h / 2))
      */
      // outline
      retPath += 'L ' + (cX - (h / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX + (h / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX + (h / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX - (h / 2)) + ', ' + (cY - (h / 2)) + '\n'
      /*
      retPath.lineTo(cX - (h / 2), cY + (h / 2))
      retPath.lineTo(cX + (h / 2), cY + (h / 2))
      retPath.lineTo(cX + (h / 2), cY - (h / 2))
      retPath.lineTo(cX - (h / 2), cY - (h / 2))
      */
      // offset lines
      retPath += 'M ' + (cX - (h / 2) + offset) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX - (h / 2) + offset) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'M ' + (cX - (h / 2)) + ', ' + (cY - (h / 2) + offset) + '\n'
      retPath += 'L ' + (cX + (h / 2)) + ', ' + (cY - (h / 2) + offset) + '\n'
      retPath += 'Z'
      /*
      retPath.moveTo(cX - (h / 2) + offset, cY - (h / 2))
      retPath.lineTo(cX - (h / 2) + offset, cY + (h / 2))
      retPath.moveTo(cX - (h / 2), cY - (h / 2) + offset)
      retPath.lineTo(cX + (h / 2), cY - (h / 2) + offset)
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const offset = block.sizeY * 0.15
      const w = block.sizeY - offset
      const h = block.sizeY - offset
      const t = block.centerY - block.sizeY / 2 + offset
      const l = block.centerX - block.sizeY / 2 + offset
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_SEQUENTIAL_ACCESS_MEMORY]: {
    img: 'SeqMem',
    description: 'ЗУ с последовательным доступом',
    getPath (block) {
      // const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const radius = h / 2
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX, cY + radius)
      retPath.arc(cX, cY, radius, Math.PI / 2, Math.PI * 5 / 2)
      retPath.lineTo(cX + radius, cY + radius)
      retPath.closePath()
      */
      let retPath = ''
      retPath += 'M ' + (cX) + ', ' + (cY + radius) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 1 + ' ' + 1 + ' ' + (cX) + ' ' + (cY - radius) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 1 + ' ' + 1 + ' ' + (cX) + ' ' + (cY + radius) + '\n'
      retPath += 'L ' + (cX + radius) + ', ' + (cY + radius) + '\n'
      retPath += 'Z'
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const insideSize = block.sizeY / Math.SQRT2
      const w = insideSize
      const h = insideSize
      const t = block.centerY - insideSize / 2
      const l = block.centerX - insideSize / 2
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_DIRECT_ACCESS_MEMORY]: {
    img: 'DirectMem',
    description: 'ЗУ с прямым доступом',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const radius = h
      const arcAngle = Math.asin((h / 2) / radius) * 2
      const xOffset = radius * (1 - Math.cos(arcAngle / 2))
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2) + xOffset) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + (cX - (w / 2) + xOffset) + ' ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2) - xOffset) + ', ' + (cY - (h / 2)) + '\n'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2) + xOffset, cY + (h / 2))
      retPath.arc(cX - (w / 2) + radius, cY, radius, Math.PI - (arcAngle / 2), Math.PI + (arcAngle / 2))
      retPath.lineTo(cX + (w / 2) - xOffset, cY - (h / 2))
      */
      // right arcs (have to end at lower point)
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + (cX + (w / 2) - xOffset) + ' ' + (cY + (h / 2)) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + (cX + (w / 2) - xOffset) + ' ' + (cY - (h / 2)) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + (cX + (w / 2) - xOffset) + ' ' + (cY + (h / 2)) + '\n'
      /*
      retPath.arc(cX + (w / 2) + radius - (xOffset * 2), cY, radius, Math.PI + (arcAngle / 2), Math.PI - (arcAngle / 2), true)
      retPath.arc(cX + (w / 2) + radius - (xOffset * 2), cY, radius, Math.PI - (arcAngle / 2), Math.PI + (arcAngle / 2), false)
      retPath.arc(cX + (w / 2) - radius, cY, radius, 0 - (arcAngle / 2), 0 + (arcAngle / 2), false)
      */
      // ending block
      retPath += 'L ' + (cX - (w / 2) + xOffset) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'Z'
      /*
      retPath.lineTo(cX - (w / 2) + xOffset, cY + (h / 2))
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const arcOffset = block.sizeY * (1 - Math.cos(1 / 2))
      const w = block.sizeX - arcOffset * 3
      const h = block.sizeY
      const t = block.centerY - block.sizeY / 2
      const l = block.centerX - block.sizeX / 2 + arcOffset
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_DOCUMENT]: {
    img: 'Document',
    description: 'Документ',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const radius = h
      const arcAngle = Math.asin((w / 4) / radius) * 2
      const yOffset = radius * (1 - Math.cos(arcAngle / 2))
      // uses looks similar to modern standard
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY + (h / 2) - yOffset) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + (cX) + ' ' + (cY + (h / 2) - yOffset) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + (cX + (w / 2)) + ' ' + (cY + (h / 2) - yOffset) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'Z'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2), cY - (h / 2))
      retPath.lineTo(cX - (w / 2), cY + (h / 2) - yOffset)
      retPath.arc(cX - (w / 4), cY - (h / 2), radius, Math.PI / 2 + (arcAngle / 2), Math.PI / 2 - (arcAngle / 2), true)
      retPath.arc(cX + (w / 4), cY + (h / 2) - yOffset * 2 + radius, radius, Math.PI * 3 / 2 - (arcAngle / 2), Math.PI * 3 / 2 + (arcAngle / 2), false)
      retPath.lineTo(cX + (w / 2), cY - (h / 2))
      retPath.lineTo(cX - (w / 2), cY - (h / 2))
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const arcOffset = block.sizeY * (1 - Math.cos(Math.asin(block.sizeX / 4 / block.sizeY)))
      const w = block.sizeX
      const h = block.sizeY - arcOffset * 2
      const t = block.centerY - block.sizeY / 2
      const l = block.centerX - block.sizeX / 2 + arcOffset
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_MANUAL_INPUT]: {
    img: 'ManualInput',
    description: 'Ручной ввод',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const slopeSideOffest = 0.25 * h
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY - (h / 2) + slopeSideOffest) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'Z'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2), cY + (h / 2))
      retPath.lineTo(cX - (w / 2), cY - (h / 2) + slopeSideOffest)
      retPath.lineTo(cX + (w / 2), cY - (h / 2))
      retPath.lineTo(cX + (w / 2), cY + (h / 2))
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const slopeCoef = 0.25
      const w = block.sizeX
      const h = block.sizeY * (1 - slopeCoef)
      const t = block.centerY - block.sizeY / 2 + slopeCoef * block.sizeY
      const l = block.centerX - block.sizeX / 2
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_CARD]: {
    img: 'Card',
    description: 'Карта',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const slopeSideOffest = 0.25 * h
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY - (h / 2) + slopeSideOffest) + '\n'
      retPath += 'L ' + (cX - (w / 2) + slopeSideOffest) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'Z'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2), cY + (h / 2))
      retPath.lineTo(cX - (w / 2), cY - (h / 2) + slopeSideOffest)
      retPath.lineTo(cX - (w / 2) + slopeSideOffest, cY - (h / 2))
      retPath.lineTo(cX + (w / 2), cY - (h / 2))
      retPath.lineTo(cX + (w / 2), cY + (h / 2))
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const slopeCoef = 0.25
      const w = block.sizeX - (block.sizeY * slopeCoef / 2)
      const h = block.sizeY * (1 - slopeCoef / 2)
      const t = block.centerY - block.sizeY / 2 + slopeCoef * block.sizeY / 2
      const l = block.centerX - block.sizeX / 2 + block.sizeY * slopeCoef / 2
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_PAPER_TAPE]: {
    img: 'PaperTape',
    description: 'Бумажная лента',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const radius = h
      const arcAngle = Math.asin((w / 4) / radius) * 2
      const yOffset = radius * (1 - Math.cos(arcAngle / 2))
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2)) + ', ' + (cY - (h / 2) + yOffset) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY + (h / 2) - yOffset) + '\n'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2), cY - (h / 2) + yOffset)
      retPath.lineTo(cX - (w / 2), cY + (h / 2) - yOffset)
      */
      // lower side
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + (cX) + ' ' + (cY + (h / 2) - yOffset) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + (cX + (w / 2)) + ' ' + (cY + (h / 2) - yOffset) + '\n'
      /*
      retPath.arc(cX - (w / 4), cY - (h / 2), radius, Math.PI / 2 + (arcAngle / 2), Math.PI / 2 - (arcAngle / 2), true)
      retPath.arc(cX + (w / 4), cY + (h / 2) - yOffset * 2 + radius, radius, Math.PI * 3 / 2 - (arcAngle / 2), Math.PI * 3 / 2 + (arcAngle / 2), false)
      */
      // upper side
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY - (h / 2) + yOffset) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 0 + ' ' + (cX) + ' ' + (cY - (h / 2) + yOffset) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + (cX - (w / 2)) + ' ' + (cY - (h / 2) + yOffset) + '\n'
      /*
      retPath.arc(cX + (w / 4), cY + (h / 2) - yOffset * 2 + radius - (h - yOffset), radius, Math.PI * 3 / 2 + (arcAngle / 2), Math.PI * 3 / 2 - (arcAngle / 2), true)
      retPath.arc(cX - (w / 4), cY - (h / 2) - (h - yOffset), radius, Math.PI / 2 - (arcAngle / 2), Math.PI / 2 + (arcAngle / 2), false)
      */
      // ending block
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY - (h / 2) + yOffset) + '\n'
      retPath += 'Z'
      /*
      retPath.lineTo(cX - (w / 2), cY - (h / 2) + yOffset)
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const arcOffset = block.sizeY * (1 - Math.cos(Math.asin(block.sizeX / 4 / block.sizeY)))
      const w = block.sizeX
      const h = block.sizeY - arcOffset * 4
      const t = block.centerY - block.sizeY / 2 + arcOffset * 2
      const l = block.centerX - block.sizeX / 2 + arcOffset
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_DISPLAY]: {
    img: 'Display',
    description: 'Дисплей',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const radius = h
      // right end of lower arc (also start point)
      let retPath = ''
      retPath += 'M ' + (cX + (w / 2) - h) + ', ' + (cY + (h / 2)) + '\n'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX + (w / 2) - h, cY + (h / 2))
      */
      // drawing left side arcs
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + (cX - (w / 2)) + ' ' + (cY) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + (cX + (w / 2) - h) + ' ' + (cY - (h / 2)) + '\n'
      /*
      // coords of chorde to a center of left side (intersection of arcs)
      const sideChordeX = h - w
      const sideChordeY = (-1) * (h / 2)
      const sideChordeLength = Math.sqrt(sideChordeX * sideChordeX + sideChordeY * sideChordeY)
      // angle of sideArc
      const sideArcAngle = Math.asin((sideChordeLength / 2) / radius) * 2
      // distance from chorde to center of arc
      const chordeToCenter = radius * Math.cos(sideArcAngle / 2)
      // coords to center of chorde
      const chordeCenterX = sideChordeX / 2
      const chordeCenterY = sideChordeY / 2
      // coords from center of chorde to
      const toCenterX = sideChordeY * (-1) / sideChordeLength * chordeToCenter
      const toCenter1Y = sideChordeX * (1) / sideChordeLength * chordeToCenter
      // coords of centers of 2 side arcs
      const centerX = cX - (w / 2) - chordeCenterX + toCenterX
      const center1Y = cY + (h / 2) + chordeCenterY + toCenter1Y
      const center2Y = 2 * cY - center1Y
      // determining an angle to draw arcs
      const angleToCenterOfArc = Math.atan(sideChordeY / sideChordeX)
      // for lower arc(arc1): go clockwise from PI / 2
      // for arc2: go counter-clockwise from PI * 3 / 2
      retPath.arc(centerX, center1Y, radius, Math.PI * 1 / 2 + angleToCenterOfArc - (sideArcAngle / 2), Math.PI * 1 / 2 + angleToCenterOfArc + (sideArcAngle / 2))
      retPath.arc(centerX, center2Y, radius, Math.PI * 3 / 2 - angleToCenterOfArc - (sideArcAngle / 2), Math.PI * 3 / 2 - angleToCenterOfArc + (sideArcAngle / 2))
      */
      // rightside arc and the rest of the block
      const arcAngle = Math.asin((h / 2) / radius) * 2
      const xOffset = radius * (1 - Math.cos(arcAngle / 2))
      retPath += 'L ' + (cX + (w / 2) - xOffset) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'A ' + radius + ' ' + radius + ' ' + 0 + ' ' + 0 + ' ' + 1 + ' ' + (cX + (w / 2) - xOffset) + ' ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2) - h) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'Z'
      /*
      retPath.lineTo(cX + (w / 2) - xOffset, cY - (h / 2))
      retPath.arc(cX + (w / 2) - radius, cY, radius, 0 - (arcAngle / 2), 0 + (arcAngle / 2))
      retPath.moveTo(cX + (w / 2) - xOffset, cY + (h / 2))
      retPath.lineTo(cX + (w / 2) - h, cY + (h / 2))
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const rightArcOffset = block.sizeY * (1 - Math.cos(1 / 2))
      const leftArcsOffset = block.sizeX - block.sizeY
      const w = block.sizeX - rightArcOffset - leftArcsOffset
      const h = block.sizeY
      const t = block.centerY - block.sizeY / 2
      const l = block.centerX - block.sizeX / 2 + leftArcsOffset
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_PROCESS]: {
    img: 'Process',
    description: 'Процесс',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'Z'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - w / 2, cY - h / 2)
      retPath.lineTo(cX - w / 2, cY + h / 2)
      retPath.lineTo(cX + w / 2, cY + h / 2)
      retPath.lineTo(cX + w / 2, cY - h / 2)
      retPath.lineTo(cX - w / 2, cY - h / 2)
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const w = block.sizeX
      const h = block.sizeY
      const t = block.centerY - block.sizeY / 2
      const l = block.centerX - block.sizeX / 2
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_DEFINED_PROCESS]: {
    img: 'DefProcess',
    description: 'Предопределенный процесс',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const offset = 0.15 * w
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'M ' + (cX - (w / 2) + offset) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2) + offset) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'M ' + (cX + (w / 2) - offset) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2) - offset) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'Z'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - w / 2, cY - h / 2)
      retPath.lineTo(cX - w / 2, cY + h / 2)
      retPath.lineTo(cX + w / 2, cY + h / 2)
      retPath.lineTo(cX + w / 2, cY - h / 2)
      retPath.lineTo(cX - w / 2, cY - h / 2)
      retPath.moveTo(cX - w / 2 + offset, cY - h / 2)
      retPath.lineTo(cX - w / 2 + offset, cY + h / 2)
      retPath.moveTo(cX + w / 2 - offset, cY - h / 2)
      retPath.lineTo(cX + w / 2 - offset, cY + h / 2)
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const offset = block.sizeX * 0.15
      const w = block.sizeX - offset * 2
      const h = block.sizeY
      const t = block.centerY - block.sizeY / 2
      const l = block.centerX - block.sizeX / 2 + offset
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_MANUAL_OPERATION]: {
    img: 'ManualOperation',
    description: 'Ручная операция',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const slopeSideOffest = (w - h) / 2
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2) - slopeSideOffest) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2) + slopeSideOffest) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'Z'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2), cY - (h / 2))
      retPath.lineTo(cX + (w / 2), cY - (h / 2))
      retPath.lineTo(cX + (w / 2) - slopeSideOffest, cY + (h / 2))
      retPath.lineTo(cX - (w / 2) + slopeSideOffest, cY + (h / 2))
      retPath.lineTo(cX - (w / 2), cY - (h / 2))
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const slopeOffset = (block.sizeX - block.sizeY) / 2
      const w = block.sizeX - slopeOffset * 2
      const h = block.sizeY
      const t = block.centerY - block.sizeY / 2
      const l = block.centerX - block.sizeX / 2 + slopeOffset
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_PREPARATION]: {
    img: 'Prep',
    description: 'Подготовка',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      const slopeSideOffest = (w - h) / 2
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2) + slopeSideOffest) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2) - slopeSideOffest) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY) + '\n'
      retPath += 'L ' + (cX + (w / 2) - slopeSideOffest) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2) + slopeSideOffest) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY) + '\n'
      retPath += 'L ' + (cX - (w / 2) + slopeSideOffest) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'Z'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2) + slopeSideOffest, cY - (h / 2))
      retPath.lineTo(cX + (w / 2) - slopeSideOffest, cY - (h / 2))
      retPath.lineTo(cX + (w / 2), cY)
      retPath.lineTo(cX + (w / 2) - slopeSideOffest, cY + (h / 2))
      retPath.lineTo(cX - (w / 2) + slopeSideOffest, cY + (h / 2))
      retPath.lineTo(cX - (w / 2), cY)
      retPath.lineTo(cX - (w / 2) + slopeSideOffest, cY - (h / 2))
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const slopeOffset = (block.sizeX - block.sizeY) / 2
      const w = block.sizeX - slopeOffset * 2
      const h = block.sizeY
      const t = block.centerY - block.sizeY / 2
      const l = block.centerX - block.sizeX / 2 + slopeOffset
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  },
  [Instruments.BLOCK_DECISION]: {
    img: 'Decision',
    description: 'Решение',
    getPath (block) {
      const w = block.sizeX
      const h = block.sizeY
      const cX = block.centerX
      const cY = block.centerY
      let retPath = ''
      retPath += 'M ' + (cX - (w / 2)) + ', ' + (cY) + '\n'
      retPath += 'L ' + (cX) + ', ' + (cY - (h / 2)) + '\n'
      retPath += 'L ' + (cX + (w / 2)) + ', ' + (cY) + '\n'
      retPath += 'L ' + (cX) + ', ' + (cY + (h / 2)) + '\n'
      retPath += 'L ' + (cX - (w / 2)) + ', ' + (cY) + '\n'
      retPath += 'Z'
      /*
      const retPath = new Path2D()
      retPath.moveTo(cX - (w / 2), cY)
      retPath.lineTo(cX, cY - (h / 2))
      retPath.lineTo(cX + (w / 2), cY)
      retPath.lineTo(cX, cY + (h / 2))
      retPath.lineTo(cX - (w / 2), cY)
      retPath.closePath()
      */
      return retPath
    },
    getSectorVector (block, closePoint, farPoint) {
      return getVectorByBoundingBox(block, closePoint, farPoint)
    },
    getTextArea (block) {
      const w = block.sizeX / 2
      const h = block.sizeY / 2
      const t = block.centerY - block.sizeY / 4
      const l = block.centerX - block.sizeX / 4
      return {
        top: t,
        left: l,
        width: w,
        height: h
      }
    }
  }
}
const BlocksCount = 15

function isValidBlock (blockIndex) {
  // console.log(blockIndex)
  // console.log(Blocks[0])
  let retVal = false
  for (const block in Blocks) {
    if ((block <= blockIndex) && (block >= blockIndex)) {
      retVal = true
    }
  }
  // console.log(retVal)
  return retVal
}

const OperationStep = Object.freeze({
  SELECT_NONE_SELECTED: 0,
  SELECT_BLOCK_SELECTED: 1,
  SELECT_ARROW_SEGMENT_SELECTED: 2,
  MOVE_BLOCK_IS_BEING_MOVED: 3,
  MOVE_ARROW_SEGMENT_IS_BEING_MOVED: 4,
  ARROWPLACING_STARTPOINT_DEFINED: 5
})

const STANDARD_BLOCK_WIDTH = 180

const STANDARD_BLOCK_HEIGHT_MULTIPLYER = 2 / 3

const EPS = 1E-06

// const XOFFSET = 1.2
let XOFFSET = 1

function setXOFFSET (newX) {
  XOFFSET = newX
}

export { Instruments, Blocks, BlocksCount, OperationStep, STANDARD_BLOCK_WIDTH, STANDARD_BLOCK_HEIGHT_MULTIPLYER, EPS, XOFFSET, isValidInstrument, isValidBlock, setXOFFSET }
