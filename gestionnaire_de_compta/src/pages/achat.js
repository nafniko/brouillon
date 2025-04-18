import { renderAchatForm } from '../modules/achatForm.js'
import { renderListeAchats, setAchats } from '../modules/achatList.js'
import { achatDetails } from '../modules/achatDetails.js'

export function showAchatPage(container) {
  // Liste des ventes (initialisée vide ou avec des données d’exemple)
  const achats = [
  
  ]

  // Met à jour la liste utilisée pour la pagination
  setAchats(achats)

  // Création des blocs
  const pageWrapper = document.createElement('div')
  pageWrapper.className = 'flex gap-6 p-6'

  // FORMULAIRE
  const formContainer = document.createElement('div')
  formContainer.className = 'w-1/2'
  const form = renderAchatForm(nouvelleAchat => {
    // 1. Ajouter la nouvelle vente au tableau
    achats.push(nouvelleAchat)

    // 2. Mettre à jour la pagination
    setAchats(achats)

    // 3. Re-rendre la liste (supprimer l’ancienne et remettre la nouvelle)
    const newList = renderListeAchats()
    listContainer.replaceWith(newList)
    listContainer = newList
  })
  formContainer.appendChild(form)

  // LISTE
  let listContainer = renderListeAchats()
  listContainer.className += ' w-full'

  // DETAILS
  achatDetails.className += ' w-full mb-4'

  // Layout final
  const leftSide = document.createElement('div')
  leftSide.className = 'w-1/2 flex flex-col'
  leftSide.appendChild(achatDetails)
  leftSide.appendChild(listContainer)

  pageWrapper.appendChild(formContainer)
  pageWrapper.appendChild(leftSide)

  container.innerHTML = ''
  container.appendChild(pageWrapper)
}
