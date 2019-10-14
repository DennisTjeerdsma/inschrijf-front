import moment from 'moment'
import Vue from 'vue'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value), 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm')
  }
})
