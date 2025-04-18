import { renderVenteForm } from '../modules/venteForm.js'
import { renderListeVentes, setVentes } from '../modules/venteList.js'
import { venteDetails } from '../modules/venteDetails.js'

export function showVentePage(container) {
  // Liste des ventes (initialisée vide ou avec des données d’exemple)
  const ventes = [
  
  ]

  // Met à jour la liste utilisée pour la pagination
  setVentes(ventes)

  // Création des blocs
  const pageWrapper = document.createElement('div')
  pageWrapper.className = 'flex gap-6 p-6'

  // FORMULAIRE
  const formContainer = document.createElement('div')
  formContainer.className = 'w-1/2'
  const form = renderVenteForm(nouvelleVente => {
    // 1. Ajouter la nouvelle vente au tableau
    ventes.push(nouvelleVente)

    // 2. Mettre à jour la pagination
    setVentes(ventes)

    // 3. Re-rendre la liste (supprimer l’ancienne et remettre la nouvelle)
    const newList = renderListeVentes()
    listContainer.replaceWith(newList)
    listContainer = newList
  })
  formContainer.appendChild(form)

  // LISTE
  let listContainer = renderListeVentes()
  listContainer.className += ' w-full'

  // DETAILS
  venteDetails.className += ' w-full mb-4'

  // Layout final
  const leftSide = document.createElement('div')
  leftSide.className = 'w-1/2 flex flex-col'
  leftSide.appendChild(venteDetails)
  leftSide.appendChild(listContainer)

  pageWrapper.appendChild(formContainer)
  pageWrapper.appendChild(leftSide)

  container.innerHTML = ''
  container.appendChild(pageWrapper)
}
