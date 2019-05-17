import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let timer

export default new Vuex.Store({
  state: {
    squares: [
      {
        id: 1,
        color: '#1abc9c',
        isActive: false,
        pair: false,
      },
      {
        id: 2,
        color: '#2ecc71',
        isActive: false,
        pair: false,
      },
      {
        id: 3,
        color: '#3498db',
        isActive: false,
        pair: false,
      },
      {
        id: 4,
        color: '#9b59b6',
        isActive: false,
        pair: false,
      },
      {
        id: 5,
        color: '#34495e',
        isActive: false,
        pair: false,
      },
      {
        id: 6,
        color: '#f1c40f',
        isActive: false,
        pair: false,
      },
      {
        id: 7,
        color: '#e67e22',
        isActive: false,
        pair: false,
      },
      {
        id: 8,
        color: '#000',
        isActive: false,
        pair: false,
      },
      {
        id: 9,
        color: '#1abc9c',
        isActive: false,
        pair: false,
      },
      {
        id: 10,
        color: '#2ecc71',
        isActive: false,
        pair: false,
      },
      {
        id: 11,
        color: '#3498db',
        isActive: false,
        pair: false,
      },
      {
        id: 12,
        color: '#9b59b6',
        isActive: false,
        pair: false,
      },
      {
        id: 13,
        color: '#34495e',
        isActive: false,
        pair: false,
      },
      {
        id: 14,
        color: '#f1c40f',
        isActive: false,
        pair: false,
      },
      {
        id: 15,
        color: '#e67e22',
        isActive: false,
        pair: false,
      },
      {
        id: 16,
        color: '#000',
        isActive: false,
        pair: false,
      },
    ], // массив с ячейками
    currentColor: null, // текущий цвет
    currentID: null, // текущий ID
    prevID: null, // предыдущий ID
    prevPrevID: null, // пред предыдущий ID
    numOfPairs: 0, // количество найденных пар
    timer: 0, // время игры
    game: false, // активна ли игра
  },

  mutations: {

    //-----------------------------------------------------
    // Показываем ячейку и записываем ее ID и предыдущий ID
    //-----------------------------------------------------
    SQUARE_SHOW (state, ID) {
      let square = state.squares.find(item => {
        return item.id === ID
      })
      square.isActive = true

      state.prevPrevID = state.prevID
      state.prevID = state.currentID
      state.currentID = ID
    },

    //-----------------------------------------------------
    // Скрываем ячейки при несовпадении
    //-----------------------------------------------------
    RESET_SQUARES (state) {
      if (state.prevID && state.prevPrevID) {
        let square1 = state.squares.find(item => {
          return item.id === state.prevID
        })
        let square2 = state.squares.find(item => {
          return item.id === state.prevPrevID
        })
        square1.isActive = false
        square2.isActive = false
      }
    },

    //-----------------------------------------------------
    // Отмечаем ячейки как найденные и
    // увеличиваем счетчик найденных пар
    //-----------------------------------------------------
    PAIR_SQUARES (state, color) {
      let pair = state.squares.filter(item => {
        return item.color === color
      })
      pair.forEach(item => {
        item.pair = true
      })
      state.numOfPairs++
    },

    //-----------------------------------------------------
    // Записываем цвет текущего блока,
    // если он совпадает с предыдущим, то выполняем PAIR_SQUARES
    // Обнуляем цвет
    //-----------------------------------------------------
    CURR_COLOR (state, color) {
      if (state.currentColor === null) {
        state.currentColor = color
        this.commit('RESET_SQUARES') // Если открыты 2 рызных ячейки, то клик по 3ей скрывает предыдущие
      } else {
        if (state.currentColor === color) {
          this.commit('PAIR_SQUARES', color)
        }
        state.currentColor = null
      }
    },

    //-----------------------------------------------------
    // Сброс таймера и состояний ячеек
    //-----------------------------------------------------
    RESET_TIMER (state) {
      state.squares.forEach((item) => {
        item.isActive = false
        item.pair = false
      })

      state.numOfPairs = 0

      state.timer = 0

      state.game = false
    },

    //-----------------------------------------------------
    // Старт игры
    //-----------------------------------------------------
    START_GAME (state) {

      clearInterval(timer)
      state.game = true

      timer = setInterval(() => {
        if (state.game) {
          state.timer++
        } else {
          clearInterval(timer) // останавливаем таймер, если игра закончена
        }
      }, 10)

    },

    //-----------------------------------------------------
    // Перемешивание ячеек
    //-----------------------------------------------------
    SORT_SQUARES (state) {
      function randomSort () {
        return Math.random() - 0.5
      }

      state.squares.sort(randomSort)
    },

    //-----------------------------------------------------
    // Условие победы
    //-----------------------------------------------------
    WIN (state) {
      let minutes = Math.floor(state.timer / 6000)
      let seconds = (state.timer - minutes * 6000) / 100
      let time = `${minutes}:${seconds}`
      alert(`Подбеда - ${time}`)
      state.game = false
    },

  },

  actions: {
    squareClick ({ commit, state }, payload) {
      commit('SQUARE_SHOW', payload[0]) // передаем ID
      commit('CURR_COLOR', payload[1]) // передаем color

      // Условие победы
      if (state.numOfPairs === 8) {
        commit('WIN')
      }
    },

    startGame ({ commit }) {
      commit('SORT_SQUARES')
      commit('RESET_TIMER')
      commit('START_GAME')
    },
  },
})
