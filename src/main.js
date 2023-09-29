import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Importa los iconos específicos que desees utilizar
import { faHouse, faStore, faUsers, faBook, faWarehouse, faThLarge, faThList, faUserTie,
    faSignOutAlt, 
    faTrash} from '@fortawesome/free-solid-svg-icons'


// Agrega los iconos a la biblioteca de Font Awesome
library.add(faHouse, faStore, faUsers, faBook, faWarehouse, faThLarge, faThList, faUserTie,
    faSignOutAlt,faTrash)

const app = createApp(App)

// Registra el componente FontAwesomeIcon globalmente
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store).use(router).mount('#app')
