<template>
  <div class="container col s12">
    <div class="row col s12 teal lighten-5">
      <div class="col s12 input-field">
        <button class="col s4 waves-effect waves-light btn" @click="openAdd">
          <i class="material-icons left">add</i> Добавить задачу
        </button>
      </div>

      <div @click.prevent class="col s12 input-field" v-show="addTask">
        <input
          v-model="zadachi.text"
          autoComplete="off"
          class="col s4"
          id="addTsk"
          placeholder=""
          type="text"
        />
        <label for="addTsk">Текст задачи</label>
        <button
          class="btn-floating btn waves-effect waves-light pulse"
          @click="addNewTask"
        >
          <i class="material-icons">add</i>
        </button>
      </div>

      <div class="col s12">
        <span
          class="col s4 waves-effect waves-light btn grey lighten-5"
          @click="setFilter('all')"
          style="color: teal; font-weight: bold"
          >Все</span
        >
        <span
          class="col s4 waves-effect waves-light btn"
          @click="setFilter('active')"
        >
          Активные<i class="material-icons right">done</i></span
        >
        <span
          class="col s4 waves-effect waves-light btn grey lighten-1"
          @click="setFilter('completed')"
          >Завершенные<i class="material-icons right">done_all</i></span
        >
      </div>
    </div>

    <div class="row col s12 teal lighten-3" style="margin-top: 15px">
      <div class="col s3 offset-s5">
        <p v-if="zadachi.length <= 0">Загружаю задачи</p>
        <p v-else>Общее количество задач: {{ zadachi.length }}</p>
      </div>
      <p class="col s2 offset-s2">{{ date }}</p>
      <hr />
      <!-- использовал v-show чтобы отрисовывать списки по фильтру вместо v-if, так как v-for и v-if не желательно использовать вместе -->
      <div class="col s12" v-if="activeFilter == 'all'">
        <div
          class="col s12"
          :class="{
            grey: todoList.active,
            'lighten-2': todoList.active,
            teal: !todoList.active,
            'lighten-4': !todoList.active,
          }"
          v-for="todoList in zadachi"
          :key="todoList.id"
          style="margin-bottom: 15px"
        >
          <p class="col s12">
            <strong>№ {{ todoList.id }}</strong
            ><br />
            <strong>Текст: {{ todoList.text }}</strong
            ><br />
            <strong>
              {{ !todoList.active ? 'Активная' : 'Завершенная' }}
            </strong>
          </p>
          <button
            class="col s12 btn-small"
            style="margin-bottom: 15px"
            @click="removeTask(todoList)"
          >
            Удалить
          </button>
        </div>
      </div>
      <div class="col s12" v-else-if="activeFilter == 'active'">
        <div
          class="col s12 card-panel"
          :class="{ teal: !todoList.active, 'lighten-4': !todoList.active }"
          v-for="todoList in zadachi"
          :key="todoList.id"
          v-show="!todoList.active"
        >
          <p class="col s12">
            <strong>№ {{ todoList.id }}</strong
            ><br />
            <strong>Текст: {{ todoList.text }}</strong
            ><br />
            <strong>
              {{ !todoList.active ? 'Активная' : 'Завершенная' }}
            </strong>
          </p>
          <button
            class="col s12 btn-small"
            style="margin-bottom: 15px"
            @click="removeTask(todoList)"
          >
            Удалить
          </button>
        </div>
      </div>
      <div class="col s12" v-else-if="activeFilter == 'completed'">
        <div
          class="col s12 card-panel"
          :class="{ grey: todoList.active, 'lighten-2': todoList.active }"
          v-for="todoList in zadachi"
          :key="todoList.id"
          v-show="todoList.active"
        >
          <p class="col s12">
            <strong>№ {{ todoList.id }}</strong
            ><br />
            <strong>Текст: {{ todoList.text }}</strong
            ><br />
            <strong>
              {{ !todoList.active ? 'Активная' : 'Завершенная' }}
            </strong>
          </p>
          <button
            class="col s12 btn-small"
            style="margin-bottom: 15px"
            @click="removeTask(todoList)"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
      date: 'Загружаю время',
      zadachi: [],
      activeFilter: 'all',
      addTask: false,
    }
  },

  methods: {
    // выгрузка списков
    async created() {
      try {
        setTimeout(async () => {
          const response = await axios.get(
            'https://my-json-server.typicode.com/falk20/demo/todos'
          )
          this.zadachi = [...response.data]
        }, 1000)
      } catch (e) {
        alert('Упс. список не загрузился, проверим подключение?')
      }
    },
    // открыть форму добавления задачи
    openAdd() {
      if (!this.addTask) {
        this.addTask = true
        console.log('open add')
        return
      }
      this.addTask = false
      console.log('close add')
    },
    // добавить новую задачу
    addNewTask() {
      this.addTask = false
      this.zadachi.push({
        id: this.zadachi.length + 1,
        text: this.zadachi.text,
        active: false,
      })
    },
    // удалить задачу
    removeTask(todoList) {
      /* this.zadachi.splice(todoList.id, 1) */
      // перезаписываем массив без выбранного объекта
      this.zadachi = this.zadachi.filter((p) => p.id !== todoList.id)
      /* this.zadachi.splice(this.zadachi.indexOf(todoList), 1) */
      console.log(this.zadachi)

      /*  for (var i = 0; i < todos.length; i++) {
        if (todos[i].name != t.name) {
          todos.push(todos[i]);
        }
      }
      this.$set(this.innerData, "zadachi", todos) */
    },
    // фильтры active
    setFilter(f) {
      this.activeFilter = f
    },
  },

  mounted() {
    // Выгружаем задачи по дефолту, можно добавить loader для красоты
    this.created()
    // Время самое ценное
    this.interval = setInterval(() => {
      this.date =
        new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
    }, 1000)
  },
}
</script>
