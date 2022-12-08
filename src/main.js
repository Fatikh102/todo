import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize'
import 'material-icons/iconfont/material-icons.css'

createApp(App).use(router).mount('#app')
M.AutoInit()
document.addEventListener('DOMContentLoaded', function () {
  var elemsAutoCompl = document.querySelectorAll('.autocomplete')
  M.Autocomplete.init(elemsAutoCompl)

  var elemsDate = document.querySelectorAll('.datepicker')
  M.Datepicker.init(elemsDate, { format: 'dd-mmmm-yyyy' })

  var elemsTime = document.querySelectorAll('.timepicker')
  M.Timepicker.init(elemsTime)

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
})
