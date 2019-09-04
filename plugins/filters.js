import moment from 'moment'
import Vue from 'vue'

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value), 'YYYY-MM-DD hh:mm').format('DD/MM/YYYY hh:mm')
  }
})
