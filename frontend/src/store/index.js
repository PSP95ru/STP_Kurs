import Vue from 'vue'
import Vuex from 'vuex'
import { OperationStep, Instruments, isValidInstrument } from '../plugins/constants'
import { constructBlock, constructArrow, copyPoint } from '../plugins/functions'
import { eventBus } from '../main.js'
import $ from 'jquery'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tool: 1,
    currentStep: 0,
    selectedBlockID: null,
    selectedArrowID: null,
    selectedSegmentPointIndex: null,
    arrowStartPoint: {
      x: null,
      y: null
    },
    graphicsSemaphore: 0,
    schema: {
      internalCounter: -1,
      blocks: [],
      arrows: [],
      points: []
    }
  },
  getters: {
    getArrowStartPoint (state) {
      return {
        x: state.arrowStartPoint.x,
        y: state.arrowStartPoint.y
      }
    },
    getGraphicsSemaphore (state) {
      return state.graphicsSemaphore
    },
    getTool (state) {
      return state.tool
    },
    getSelectedBlockID (state) {
      return state.selectedBlockID
    },
    getSelectedArrowID (state) {
      return state.selectedArrowID
    },
    getSelectedSegmentPointIndex (state) {
      return state.selectedSegmentPointIndex
    },
    getCurrentStep (state) {
      return state.currentStep
    },
    getSchema (state) {
      return state.schema
    },
    getBlocks (state) {
      // console.log('inside of a getter')
      // console.log(state.schema.blocks)
      const retVal = []
      state.schema.blocks.forEach(block => {
        retVal.push(constructBlock(block.centerX, block.centerY, block.type, block.sizeX, block.sizeY, block.id, block.text))
      })
      // console.log(retVal)
      return retVal
      // return state.schema.blocks
    },
    getArrows (state) {
      const retVal = []
      state.schema.arrows.forEach(arrow => {
        retVal.push(constructArrow(arrow.idStart, arrow.idEnd, arrow.angleStart, arrow.angleEnd, arrow.id))
      })
      return retVal
    },
    getPoints (state) {
      const retVal = []
      state.schema.points.forEach(point => {
        retVal.push(copyPoint(point))
      })
      return retVal
    },
    getArrowPoints: (state) => (arrow) => {
      let retVal = []
      state.schema.points.forEach(point => {
        retVal.push(copyPoint(point))
      })
      retVal = retVal.filter(point => point.arrowId === arrow.id)
      retVal.sort((p1, p2) => { return p1.order - p2.order })
      return retVal
    }
  },
  mutations: {
    setArrowStartPoint (state, payload) {
      state.arrowStartPoint.x = payload.x
      state.arrowStartPoint.y = payload.y
    },
    setGraphicsSemaphore (state, payload) {
      state.graphicsSemaphore = payload
    },
    setTool (state, payload) {
      state.tool = payload
    },
    setSelectedBlockID (state, payload) {
      // console.log('before: ' + state.selectedBlockID)
      state.selectedBlockID = payload
      // console.log('after: ' + state.selectedBlockID)
    },
    setSelectedArrowID (state, payload) {
      state.selectedArrowID = payload
    },
    setSelectedSegmentPointIndex (state, payload) {
      state.selectedSegmentPointIndex = payload
    },
    setCurrentStep (state, payload) {
      state.currentStep = payload
    },
    clearSchema (state) {
      state.schema = {
        internalCounter: state.schema.internalCounter,
        blocks: [],
        arrows: [],
        points: []
      }
    },
    addBlock (state, payload) {
      state.schema.internalCounter--
      const constructedBlock = constructBlock(payload.centerX, payload.centerY, payload.type, payload.sizeX, payload.sizeY, state.schema.internalCounter)
      state.schema.blocks.push(constructedBlock)
    },
    moveBlock (state, payload) {
      // console.log('actually moving as')
      // console.log(payload)
      state.schema.blocks.forEach(block => {
        if (block.id === payload.id) {
          // console.log('block before')
          // console.log(block)
          block.centerX = payload.X
          block.centerY = payload.Y
          // console.log('block after')
          // console.log(block)
        }
      })
    },
    changeBlockText (state, payload) {
      state.schema.blocks.forEach(block => {
        if (block.id === payload.id) {
          block.text = payload.text
        }
      })
    },
    changeArrowAngles (state, payload) {
      state.schema.arrows.forEach(arrow => {
        if (arrow.id === payload.id) {
          arrow.angleStart = payload.angleStart
          arrow.angleEnd = payload.angleEnd
        }
      })
    },
    addArrow (state, payload) {
      state.schema.internalCounter--
      const constructedArrow = constructArrow(payload.idStart, payload.idEnd, payload.angleStart, payload.angleEnd, state.schema.internalCounter)
      state.schema.arrows.push(constructedArrow)
      // console.log(this.getters.getArrows)
    },
    addPoint (state, payload) {
      state.schema.internalCounter--
      const constructedPoint = copyPoint(payload)
      constructedPoint.id = state.schema.internalCounter
      state.schema.points.forEach(point => {
        if (point.arrowId === constructedPoint.arrowId && point.order >= constructedPoint.order) {
          point.order = point.order + 1
        }
      })
      state.schema.points.push(constructedPoint)
    },
    removePoint (state, payload) {
      const constructedPoint = copyPoint(payload)
      state.schema.points.forEach(point => {
        if (point.arrowId === constructedPoint.arrowId && point.order >= constructedPoint.order) {
          point.order = point.order - 1
        }
      })
      state.schema.points.splice(state.schema.points.findIndex(p => p.id === constructedPoint.id), 1)
    },
    movePoint (state, payload) {
      const pointToMove = state.schema.points.find(point => payload.id === point.id)
      pointToMove.x = payload.x
      pointToMove.y = payload.y
    },
    addFromLoadBlock (state, payload) {
      const constructedBlock = constructBlock(payload.centerX, payload.centerY, payload.type, payload.sizeX, payload.sizeY, payload.id, payload.text)
      state.schema.blocks.push(constructedBlock)
    },
    addFromLoadArrow (state, payload) {
      const constructedArrow = constructArrow(payload.idStart, payload.idEnd, payload.angleStart, payload.angleEnd, payload.id)
      state.schema.arrows.push(constructedArrow)
      // console.log(this.getters.getArrows)
    },
    addFromLoadPoint (state, payload) {
      const constructedPoint = copyPoint(payload)
      state.schema.points.forEach(point => {
        if (point.arrowId === constructedPoint.arrowId && point.order >= constructedPoint.order) {
          point.order = point.order + 1
        }
      })
      state.schema.points.push(constructedPoint)
    }
  },
  actions: {
    async changeArrowStartPoint (context, point) {
      context.commit('setArrowStartPoint', point)
    },
    async changeCurrentStep (context, step) {
      context.commit('setCurrentStep', step)
    },
    async countUpGraphicsSemaphore (context) {
      context.commit('setGraphicsSemaphore', this.getGraphicsSemaphore + 1)
    },
    async countDownGraphicsSemaphore (context) {
      context.commit('setGraphicsSemaphore', this.getGraphicsSemaphore - 1)
    },
    async changeTool (context, index) {
      // console.log(index)
      // TODO: check for parameters tools
      if (isValidInstrument(index) === true) {
        context.commit('setTool', index)
      } else {
        context.commit('setTool', Instruments.UNSELECT_TOOLS)
      }
    },
    async selectBlock (context, id) {
      // console.log('sending to search in id of ' + id)
      // console.log(this.getters.getBlocks)
      const block = this.getters.getBlocks.find(block => block.id === id)
      // console.log('found block:')
      // console.log(block)
      if (block === null) {
        this.dispatch('unselect')
      } else {
        context.commit('setSelectedBlockID', block.id)
        context.commit('setCurrentStep', OperationStep.SELECT_BLOCK_SELECTED)
        eventBus.$emit('selectionChanged')
      }
    },
    async selectArrow (context, payload) {
      const arrow = this.getters.getArrows.find(storeArrow => storeArrow.id === payload.arrowId)
      if (arrow === null) {
        this.dispatch('unselect')
      } else {
        context.commit('setSelectedArrowID', payload.arrowId)
        context.commit('setSelectedSegmentPointIndex', payload.pointIndex)
        context.commit('setCurrentStep', OperationStep.SELECT_ARROW_SEGMENT_SELECTED)
        eventBus.$emit('selectionChanged')
      }
    },
    async defineStartPoint (context, point) {
      context.commit('setArrowStartPoint', point)
      context.commit('setCurrentStep', OperationStep.ARROWPLACING_STARTPOINT_DEFINED)
    },
    async unselect (context) {
      context.commit('setSelectedBlockID', null)
      context.commit('setSelectedArrowID', null)
      context.commit('setSelectedSegmentPointIndex', null)
      context.commit('setCurrentStep', OperationStep.SELECT_NONE_SELECTED)
      context.commit('setArrowStartPoint', { x: null, y: null })
      eventBus.$emit('selectionChanged')
    },
    async moveBlock (context, payload) {
      const blockToMove = this.getters.getBlocks.find(block => block.id === payload.id)
      if (blockToMove != null) {
        context.commit('moveBlock', {
          id: payload.id,
          X: payload.X,
          Y: payload.Y
        })
      }
      eventBus.$emit('timeToDraw')
    },
    async clearSchema (context) {
      context.commit('clearSchema')
      eventBus.$emit('timeToDraw')
    },
    async addBlock (context, payload) {
      context.commit('addBlock', payload)
      eventBus.$emit('timeToDraw')
    },
    async addArrow (context, payload) {
      context.commit('addArrow', payload)
      eventBus.$emit('timeToDraw')
    },
    async addPoint (context, payload) {
      context.commit('addPoint', payload)
      eventBus.$emit('timeToDraw')
    },
    async removePoint (context, payload) {
      context.commit('removePoint', payload)
      eventBus.$emit('timeToDraw')
    },
    async movePoint (context, payload) {
      if (this.getters.getPoints.findIndex(point => point.id === payload.id) > -1) {
        context.commit('movePoint', payload)
        eventBus.$emit('timeToDraw')
      }
    },
    async moveArrowSegment (context, payload) {
      // перемещаем, затем удаляем, затем добавляем, затем меняем углы у стрелки
      if (payload.moved[0] != null) context.commit('movePoint', payload.moved[0])
      if (payload.moved[1] != null) context.commit('movePoint', payload.moved[1])
      if (payload.deleted[0] != null) context.commit('removePoint', payload.deleted[0])
      if (payload.deleted[1] != null) context.commit('removePoint', payload.deleted[1])
      if (payload.added[0] != null) {
        const firstPoint = copyPoint(payload.added[0])
        firstPoint.order = 0
        context.commit('addPoint', firstPoint)
      }
      const lastOrder = this.getters.getArrowPoints(payload.arrow).length
      if (payload.added[1] != null) {
        const lastPoint = copyPoint(payload.added[1])
        lastPoint.order = lastOrder
        context.commit('addPoint', lastPoint)
      }
      context.commit('changeArrowAngles', payload.arrow)
      eventBus.$emit('timeToDraw')
    },
    async changeBlockText (context, payload) {
      if (this.getters.getBlocks.findIndex(block => block.id === payload.id) > -1) {
        this.dispatch('unselect')
        context.commit('changeBlockText', payload)
        eventBus.$emit('timeToDraw')
      }
    },
    async saveSchema (context, payload) {
      if ((payload != null) && (payload.length > 0)) {
        const sendObject = {
          blocks: this.getters.getBlocks,
          arrows: this.getters.getArrows,
          points: this.getters.getPoints
        }
        $.ajax({
          url: 'http://localhost:8081/saveSchema/' + payload,
          method: 'POST',
          processData: false,
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
            blocks: sendObject.blocks,
            arrows: this.getters.getArrows,
            points: this.getters.getPoints
          }),
          success: function (res) {
            // console.log(res)
          },
          error: function (err) {
            console.log(err)
          }
        })
        /*
        await axios.post('http://localhost:8081/saveSchema/' + payload, {
          data: {
            blocks: sendObject.blocks,
            arrows: this.getters.getArrows,
            points: this.getters.getPoints
          }
        })
          .then(response => {
            if (response !== 1) console.log('error saving schema'); else console.log('success')
          }).catch(e => {
            console.log(e)
          }) */
      }
    },
    async loadSchema (context, payload) {
      if ((payload != null) && (payload.length > 0)) {
        await $.ajax({
          url: 'http://localhost:8081/getSchema/' + payload,
          method: 'Get',
          processData: false,
          contentType: 'application/json',
          dataType: 'json',
          data: null,
          success: function (response) {
            context.commit('clearSchema')
            response.blocks.forEach((block) => {
              context.commit('addFromLoadBlock', block)
            })
            response.arrows.forEach((arrow) => {
              context.commit('addFromLoadArrow', arrow)
            })
            response.points.forEach((point) => {
              context.commit('addFromLoadPoint', point)
            })
          },
          error: function (err) {
            console.log(err)
          },
          complete: function (context) {
          }
        })
        eventBus.$emit('timeToDraw')
        /* await axios.get('http://localhost:8081/getSchema/' + payload)
          .then(response => {
            // JSON responses are automatically parsed.
            context.commit('clearSchema')
            response.blocks.forEach((block) => {
              context.commit('addBlock', block)
            })
            response.arrows.forEach((arrow) => {
              context.commit('addArrow', arrow)
            })
            response.points.forEach((point) => {
              context.commit('addPoint', point)
            })
          })
          .catch(e => {
            console.log(e)
          }) */
      }
    }
  },
  methods: {
  },
  modules: {
  }
})
