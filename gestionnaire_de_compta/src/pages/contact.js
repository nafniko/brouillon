// src/pages/contacts.js
import { afficherContacts } from '../modules/List/contactList.js'

export function showContactsPage(container) {
  const fakeContacts = [
    { nom: 'Alice Dupont', email: 'alice@example.com', telephone: '0601020304', societe:'Novalis', adresse:'1 rue de la Paix' },
    { nom: 'Bob Martin', email: 'bob@example.com', telephone: '0611223344' },
    { nom: 'Carla Moreau', email: 'carla@example.com', telephone: '0655667788' }
  ]

  container.innerHTML = `<div id="contactsContainer" class="p-4 bg-white rounded shadow"></div>`
  afficherContacts('contactsContainer', fakeContacts)
}
