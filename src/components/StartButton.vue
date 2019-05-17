<template>
  <button class="start-btn" @click="this.startGame">Старт</button>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'StartButton',
    methods: {
      ...mapActions(['startGame'])
    }
  }
</script>

<style scoped lang="scss">
  .start-btn {
    margin-bottom: 10px;
  }
</style>
