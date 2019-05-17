<template>
  <div class="square-col">
    <div class="square"
         :style="isActive || pair ? `background-color: ${color}` : `background-color: #fff`"
         @click="show"
    ></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Square',
    props: ['color', 'isActive', 'id', 'pair'],
    computed: {
      ...mapState(['game']),
    },
    methods: {
      show () {
        // Блокируем нажатие на квадраты, если пара уже найдены, если квадрат активен или игра не начата
        if (this.pair || this.isActive || !this.game) return
        this.$store.dispatch('squareClick', [this.id, this.color])
      },
    },
  }
</script>

<style scoped lang="scss">
  .square-col {
    width: 25%;
    padding: 2px;
  }

  .square {
    border: 1px solid #000;
    overflow: hidden;

    &::before {
      content: "";
      padding-top: 100%;
      float: left;
    }
  }

</style>
