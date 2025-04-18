// gestionnaire_de_compta/src/modules/achatList.js
import { afficherDetails } from './achatDetails.js'


export function ajouterAchat(achat) {
    achats.push(achat);
    updateListe();
}
export let achats = [];
let currentPage = 1
const achatsParPage = 5

export function setAchats(data) {
  achats = data
}

function getPaginatedachats() {
  const start = (currentPage - 1) * achatsParPage
  const end = start + achatsParPage
  return achats.slice(start, end)
}

function updateList(container) {
  const ul = container.querySelector('ul')
  ul.innerHTML = ''

  getPaginatedachats().forEach((achat, index) => {
    const li = document.createElement('li')
    li.className = 'cursor-pointer hover:bg-gray-100 p-2 rounded'
    li.textContent = `${achat.date} - ${achat.societe}`
    li.onclick = () => afficherDetails(achat)
    ul.appendChild(li)
  })
}

function updatePagination(container) {
  const pagination = container.querySelector('.pagination')
  pagination.innerHTML = ''

  const totalPages = Math.ceil(achats.length / achatsParPage)

  const prevBtn = document.createElement('button')
  prevBtn.textContent = '← Précédent'
  prevBtn.disabled = currentPage === 1
  prevBtn.className = 'px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
  prevBtn.onclick = () => {
    currentPage--
    updateList(container)
    updatePagination(container)
  }

  const nextBtn = document.createElement('button')
  nextBtn.textContent = 'Suivant →'
  nextBtn.disabled = currentPage === totalPages
  nextBtn.className = 'px-3 py-1 bg-gray-200 rounded disabled:opacity-50'
  nextBtn.onclick = () => {
    currentPage++
    updateList(container)
    updatePagination(container)
  }

  pagination.appendChild(prevBtn)
  pagination.appendChild(nextBtn)
}

export function renderListeAchats() {
  const container = document.createElement('div')
  container.className = 'bg-white p-4 rounded shadow'

  const title = document.createElement('h2')
  title.textContent = 'Liste '
  title.className = 'text-xl font-semibold mb-4'

  const ul = document.createElement('ul')
  ul.className = 'space-y-2'

  const pagination = document.createElement('div')
  pagination.className = 'pagination mt-4 flex gap-4'

  container.appendChild(title)
  container.appendChild(ul)
  container.appendChild(pagination)

  updateList(container)
  updatePagination(container)

  return container
}


function updateListe() {
  ul.innerHTML = '';
  achats.forEach((achat, index) => {
    const li = document.createElement('li');
    li.className = 'cursor-pointer p-2 hover:bg-gray-100 border-b';
    li.textContent = `${achat.societe} - ${achat.montantTtc.toFixed(2)} €`;
    li.addEventListener('click', () => {
      afficherDetails(achat);
    });
    ul.appendChild(li);
  });
}
