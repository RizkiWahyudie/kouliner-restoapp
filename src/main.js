import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './styles/index.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faFire, faHeart, faStar, faCartShopping, faClipboard, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faFire, faHeart, faStar, faCartShopping, faClipboard, faAngleLeft)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.mount('#app')