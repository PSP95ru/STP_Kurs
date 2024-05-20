<template>
  <v-app>
    <tool-panel>
      <!-- <hello-world /> -->
    </tool-panel>
    <Canvas/>
  </v-app>
</template>
<script>
// import HelloWorld from '../components/HelloWorld'
import ToolPanel from '../components/ToolPanel'
import Canvas from '../components/Canvas'
export default {
  name: 'Home',
  components: {
    // HelloWorld,
    ToolPanel,
    Canvas
  }
}
// const example = document.getElementById('example')
// const ctx = example.getContext('2d')
// ctx.fillRect(0, 0, example.width, example.height)
</script>
