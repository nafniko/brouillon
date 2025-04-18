// src/components/venteList.js
// src/components/venteList.js
import { afficherDetails } from './venteDetails.js'


export function ajouterVente(vente) {
    ventes.push(vente);
    updateListe();
}
export let ventes = [];
let currentPage = 1
const ventesParPage = 5

export function setVentes(data) {
  ventes = data
}

function getPaginatedVentes() {
  const start = (currentPage - 1) * ventesParPage
  const end = start + ventesParPage
  return ventes.slice(start, end)
}

function updateList(container) {
  const ul = container.querySelector('ul')
  ul.innerHTML = ''

  getPaginatedVentes().forEach((vente, index) => {
    const li = document.createElement('li')
    li.className = 'cursor-pointer hover:bg-gray-100 p-2 rounded'
    li.textContent = `${vente.date} - ${vente.societe}`
    li.onclick = () => afficherDetails(vente)
    ul.appendChild(li)
  })
}

function updatePagination(container) {
  const pagination = container.querySelector('.pagination')
  pagination.innerHTML = ''

  const totalPages = Math.ceil(ventes.length / ventesParPage)

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

export function renderListeVentes() {
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
  ventes.forEach((vente, index) => {
    const li = document.createElement('li');
    li.className = 'cursor-pointer p-2 hover:bg-gray-100 border-b';
    li.textContent = `${vente.societe} - ${vente.montantTtc.toFixed(2)} €`;
    li.addEventListener('click', () => {
      afficherDetails(vente);
    });
    ul.appendChild(li);
  });
}
