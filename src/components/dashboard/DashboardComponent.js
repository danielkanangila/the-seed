import Vue from "vue"
import Component from 'vue-class-component'
import template from './dashboardTemplate.html'

@Component({
    template
})
class DashboardComponent extends Vue {
    title = 'Dashboard'
}

export default DashboardComponent