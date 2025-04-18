// gestionnaire_de_compta/src/main.js
import './style.css'
import { loadPage } from './router.js'

import { renderMenu } from './modules/menu.js'

const app = document.querySelector('#app')
renderMenu(app)
loadPage()





