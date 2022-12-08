<template>
  <h5 class="row center">
    <span>Single page Task Manager на vue 3</span>
  </h5>

  <!-- добавить задачу -->
  <div class="row col s12">
    <div class="card-panel grey lighten-5 col s12">
      <form @submit.prevent="addItem">
        <div class="col s12">
          <div class="input-field col s6">
            <label for="my-textarea">Текст задачи</label>
            <textarea
              v-model="itemTitle"
              id="my-textarea"
              class="materialize-textarea autocomplete"
              required
            ></textarea>
          </div>

          <div class="input-field col s3">
            <label for="addTskDate">Дата завершения</label>
            <input type="text" class="datepicker" id="addTskDate" required />
          </div>
          <div class="input-field col s3">
            <label for="addTskTime">Время завершения</label>
            <input
              id="addTskTime"
              type="text"
              class="timepicker autocomplete"
              required
            />
          </div>
        </div>
        <div class="col s12" style="display: flex; align-items: flex-end">
          <div class="col s8">
            <div class="chips mychips" id="mychips">
              <input class="custom-class" />
            </div>
          </div>

          <div class="input-field col s4">
            <button type="submit" class="btn teal right bottom">
              добавить
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <!-- список задач -->
  <div class="items grey lighten-5" v-if="items.length">
    <div class="row col s-12">
      <div class="col s-12" style="width: 100%; font-size: 16px">
        <div class="col s-12 left">
          <p v-if="items.length <= 0">Загружаю задачи</p>
          <p v-else>Общее количество задач: {{ items.length }}</p>
        </div>
        <p class="col s-12 right">{{ date }}</p>
      </div>
      <div class="col s-12" style="width: 100%"><hr /></div>
    </div>
    <ul
      style="
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        font-size: 14px;
        font-weight: 600;
        justify-content: center;
      "
    >
      <li
        style="display: flex; flex-direction: column; gap: 10px"
        class="card-panel"
        :class="{
          lineThrough: item.done,
          opacityCard: item.done,
          grey: item.done,
          'lighten-2': item.done,
          teal: !item.done,
          'lighten-4': !item.done,
        }"
        v-for="(item, index) in items"
        :key="index"
      >
        <strong> Задача#{{ item.id }} </strong>
        <span
          style="cursor: pointer"
          class="label"
          @click="showUpdateTitle = !showUpdateTitle"
          >{{ item.title }} <i class="material-icons">create</i></span
        >
        <div class="input-field col s6" v-show="showUpdateTitle">
          <label for="new-textarea">Введите новый текст для задачи!</label>
          <textarea
            v-model="newItemTitle"
            id="new-textarea"
            class="materialize-textarea autocomplete"
            required
          ></textarea>
          <button type="submit" @click="updateItemInputs(index)" class="btn">
            заменить
          </button>
        </div>
        <strong
          ><span class="textInCard">Завершить до:</span> {{ item.date }}
          {{ item.time }}</strong
        >
        <div>
          <div class="chip" v-for="(i, index) in item.tags" :key="index">
            {{ i.tag }}
            <i class="close material-icons">close</i>
          </div>
        </div>

        <div class="actions">
          <button
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              gap: 10px;
              border: 0;
            "
            class="btn teal lighten-6 left"
            type="button"
            @click="changeItemStatus(index)"
          >
            <i aria-hidden="true" class="material-icons">{{
              item.done ? 'check_box' : 'check_box_outline_blank'
            }}</i>
            {{ !item.done ? 'Завершить' : 'Вернуть' }}
          </button>
          <button
            style="
              display: flex;
              align-items: center;
              flex-direction: row;
              gap: 10px;
              border: 0;
            "
            class="btn teal lighten-3 right"
            type="button"
            aria-label="Delete"
            title="Delete"
            @click="deleteItem(index)"
          >
            <i aria-hidden="true" class="material-icons">delete</i>
          </button>
        </div>
      </li>
    </ul>
  </div>
  <!-- задач нет -->
  <div class="card-panel teal lighten-4 emptylist center" v-else>
    <strong>Список задач пуст</strong>
  </div>

  <h6>
    <p>Свяжитесь со мной удобным для Вас способом</p>
    <p>
      <a href="https://t.me/vladislav_fatikhov">Телеграм</a> |
      <a href="mailto:fatikhov.vl@icloud.com">Почта</a>
    </p>
    <p>Владислав Фатихов</p>
  </h6>
</template>

<script>
const myKey = 'tasks'
export default {
  name: 'Home',
  data() {
    return {
      date: '',
      itemTitle: '',
      items: [],
      newItemTitle: '',
      showUpdateTitle: false,
    }
  },
  methods: {
    addItem(e) {
      try {
        let countId = this.items.length + 1
        const taskData = {
          id: countId,
          title: this.itemTitle,
          date: document.querySelectorAll('.datepicker')[0].value,
          time: document.querySelectorAll('.timepicker')[0].value,
          tags: document.querySelectorAll('.custom-class')[0].parentElement
            .M_Chips.chipsData,
          done: false,
        }
        this.items.push(taskData)
      } catch (e) {
        console.log('addNewTask', e)
      } finally {
        //очистить поля
        this.itemTitle = ''
        e.target.reset()
        var elemsChips = document.querySelectorAll('.chips')
        var options = {
          placeholder: 'Укажите теги',
          secondaryPlaceholder: '+ добавьте тег',
          autocompleteOptions: {
            data: {
              'Принять душ': null,
              'Съесть яблоко': null,
              'Прочитать книгу': null,
            },
            limit: Infinity,
            minLenght: 1,
          },
          data: [
            {
              tag: 'Купить хлеб',
            },
            {
              tag: 'Сварить кофе',
            },
          ],
        }
        M.Chips.init(elemsChips, options)
        this.items.sort(function (a, b) {
          if (a.done === true) {
            return 1
          }
          if (a.done === false) {
            return -1
          }
          return 0
        })
        console.log('Успешно', this.items)
      }
    },
    deleteItem(index) {
      this.items.splice(index, 1)
    },
    changeItemStatus(index) {
      const item = this.items[index]
      this.items[index].done = !item.done
      this.items.sort(function (a, b) {
        if (a.done === true) {
          return 1
        }
        if (a.done === false) {
          return -1
        }
        return 0
      })
    },
    updateItemInputs(index) {
      this.items[index].title = this.newItemTitle
      this.showUpdateTitle = false
      this.newItemTitle = ''
    },
  },

  mounted() {
    this.interval = setInterval(() => {
      this.date =
        new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
    }, 1000)
    const items = localStorage.getItem(myKey) || '[]'
    this.items = JSON.parse(items)
    this.items.sort(function (a, b) {
      if (a.done === true) {
        return 1
      }
      if (a.done === false) {
        return -1
      }
      return 0
    })
    console.log('items', this.items)
  },
  watch: {
    items: {
      deep: true,
      handler(items) {
        localStorage.setItem(myKey, JSON.stringify(items))
      },
    },
  },
}
</script>

<style scoped>
.chip {
  font-size: 12px;
}
.lineThrough {
  text-decoration: line-through;
}
.opacityCard {
  opacity: 0.5;
}
form {
  margin-top: 0;
  display: block;
}
.textInCard {
  font-weight: 300;
  font-size: 14px;
}
p {
  margin: 0;
}
[type='checkbox'] {
  border: 2px solid white;
}
.deleteBtn {
  color: black;
}
label {
  color: black;
  font-size: 14px;
}
.blockTasks {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
.myPopupBtn {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.popup {
  position: fixed;
  overflow: auto;
  top: 60px;
  margin: 0 auto;
  width: inherit;
  height: fit-content;
  z-index: 10;
}
.popup-overlay {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;
}
.card-panel {
  margin: 0px;
  padding: 14px;
}
.blockTasks > .card-panel {
  width: 340px;
}
</style>
