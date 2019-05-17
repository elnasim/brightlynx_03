<template>
  <div id="app">
    <div class="container">
      <div class="squares">
        <Square v-for="item in squares" :key="item.id"
                :color=item.color
                :isActive="item.isActive"
                :id="item.id"
                :pair="item.pair"
        />
      </div>
      <StartButton/>
      <Timer/>
    </div>
  </div>
</template>

<script>

  import StartButton from './components/StartButton'
  import Timer from './components/Timer'
  import Square from './components/Square'

  import { mapState } from 'vuex'

  export default {
    name: 'app',
    components: { Square, Timer, StartButton },
    computed: {
      ...mapState(['squares', 'game']),
    },
  }
</script>

<style lang="scss">
  @import "assets/style.scss";

  .container {
    width: 300px;
    padding: 20px;
    border: 2px solid #000;
  }

  .squares {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -2px 30px;
  }
</style>
