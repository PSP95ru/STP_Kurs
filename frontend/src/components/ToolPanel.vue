<style scoped>
  v-btn img {
    width: 30px;
  }
</style>

<template>
  <v-navigation-drawer
  app
  location="bottom"
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Блоки</v-list-item-title>
          <v-btn-toggle v-model="blocksSelection" exclusive>
            <div id = "wrapper_basic" width='100%'>
              <v-tooltip  v-for = "i in ((BlocksCount))" :key="i">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" v-on:click="selectionChanged(i - 1)">
                    <img :src="require('../assets/img' + Blocks[i - 1].img + 'Small.svg')" width="30px">
                  </v-btn>
                </template>
                <span> {{Blocks[i - 1].description}} </span>
              </v-tooltip>
            </div>
          </v-btn-toggle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Инструменты</v-list-item-title>
        <v-tooltip>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" v-on:click=" properDelete()">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </template>
          <span> Очистить схему </span>
        </v-tooltip>
        <v-btn-toggle v-model="parametersSelection" exclusive>
          <v-tooltip>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" v-on:click="selectSelect()">
                <v-icon>mdi-select</v-icon>
              </v-btn>
            </template>
            <span> Выбор элемента </span>
          </v-tooltip>
          <v-tooltip>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" v-on:click="selectArrow()">
                <v-icon>mdi-ray-start-arrow</v-icon>
              </v-btn>
            </template>
            <span> Стрелка между блоками </span>
          </v-tooltip>
        </v-btn-toggle>
      </v-list-item>
      <v-list-item>
        <v-text-field label="Текст элемента" v-model="text"></v-text-field>
        <v-tooltip>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" v-on:click="confirmTextChange()">Подтвердить</v-btn>
          </template>
        </v-tooltip>
      </v-list-item>
      <v-list-item>
        <v-text-field label="имя загружаемой схемы" v-model="loadSchemaName"></v-text-field>
      </v-list-item>
      <v-list-item>
        <v-tooltip>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" v-on:click="getTheSchema()">Загрузить</v-btn>
          </template>
        </v-tooltip>
      </v-list-item>
      <v-list-item>
        <v-text-field label="Название сохранемой схемы" v-model="saveSchemaName"></v-text-field>
      </v-list-item>
      <v-list-item>
        <v-tooltip>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" v-on:click="loadTheSchema()">Сохранить</v-btn>
          </template>
        </v-tooltip>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { Blocks, BlocksCount, Instruments } from '../plugins/constants'
import { copyBlock } from '../plugins/functions'
import { mapGetters, mapActions } from 'vuex'
import { eventBus } from '../main.js'
export default {
  data: () => {
    return {
      Blocks,
      BlocksCount,
      blocksSelection: 0,
      parametersSelection: -1,
      text: '',
      saveSchemaName: '',
      loadSchemaName: ''
    }
  },
  methods: {
    ...mapActions(['changeTool', 'clearSchema', 'changeBlockText', 'saveSchema', 'loadSchema']),
    selectionChanged (i) {
      this.changeTool(i)
      this.parametersSelection = -1
      // console.log(this.$store.getters.getTool)
    },
    selectSelect () {
      this.changeTool(Instruments.PARAMETERS_SELECT)
      this.blocksSelection = -1
    },
    selectArrow () {
      this.changeTool(Instruments.ARROW_DEFAULT)
      this.blocksSelection = -1
    },
    properDelete () {
      this.clearSchema()
    },
    confirmTextChange () {
      const blockToSend = copyBlock(this.getBlocks.find(block => block.id === this.getSelectedBlockID))
      blockToSend.text = this.text
      this.changeBlockText(blockToSend)
    },
    getTheSchema () {
      this.loadSchema(this.loadSchemaName)
    },
    loadTheSchema () {
      this.saveSchema(this.saveSchemaName)
    }
  },
  computed: {
    ...mapGetters(['getBlocks', 'getSelectedBlockID'])
  },
  created () {
    eventBus.$on('selectionChanged', () => {
      if (this.getSelectedBlockID != null) {
        this.text = this.getBlocks.find(block => block.id === this.getSelectedBlockID).text
      }
    })
  }
}
</script>
