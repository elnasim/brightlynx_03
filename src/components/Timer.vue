<template>
  <div class="timer">{{minutes}}:{{seconds}}</div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Timer',
    computed: {
      ...mapState(['timer']),
      minutes () {
        return Math.floor(this.timer / 6000)
      },

      seconds () {
        return (this.timer - this.minutes * 6000) / 100
      },
    },
  }
</script>

<style scoped lang="scss">

</style>
