import { afficherContacts } from '../modules/List/contactList.js';
import { fetchAll } from '../requeteApi/fetchAll.js';
import { createClientForm } from '../modules/Forms/clientForm.js';

export async function showContactsPage(container) {
  // Récupérer les contacts depuis l'API
  const contacts = await fetchAll("http://127.0.0.1:8000/api/client/all");



  // Préparer le conteneur pour afficher les contacts
  container.innerHTML = `
   <div class="flex flex-col lg:flex-row gap-4 p-4">
  <div id="contactsContainer" class="p-4 bg-white rounded mb-4 shadow"></div>
  <div id="contactContainer" class="p-4 bg-white rounded shadow"></div>
  </div>
  `;

  // Afficher le formulaire de gestion de client
  
  // Afficher les contacts dans le conteneur
  createClientForm('contactsContainer', null); // Créer le formulaire de gestion de client (pour ajouter ou modifier un client)
  afficherContacts('contactContainer', contacts);
}

