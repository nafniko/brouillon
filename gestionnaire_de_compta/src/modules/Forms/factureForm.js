// src/modules/factureForm.js
import { fetchAll } from '../../requeteApi/fetchAll.js';

export function initFactureForm(facture, updatePreview) {
  const form = document.getElementById('factureForm')

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    facture.client.nom = document.getElementById('clientNom').value
    facture.client.adresse = document.getElementById('clientAdresse').value

    const ligne = {
      produit_id: Number(document.getElementById('produitId').value), // AJOUT
      description: document.getElementById('desc').value,
      qte: Number(document.getElementById('qte').value),
      puHt: Number(document.getElementById('pu').value)
    }

    if (ligne.qte && ligne.puHt) {
      facture.lignes.push(ligne)
      updatePreview()
    }
  })
}
export async function chargerClients() {
  const clients = await fetchAll("http://127.0.0.1:8000/api/client/all");

  if (clients && Array.isArray(clients)) {
    const select = document.getElementById("clientSelect");

    // Remplir le select avec les clients
    clients.forEach(client => {
      const option = document.createElement("option");
      option.value = client.id;
      option.textContent = client.societe || `${client.nom} ${client.prenom}`;
      // Ajouter les données du client à l'attribut data-client
      option.dataset.client = JSON.stringify(client); // Stocker l'objet client complet
      select.appendChild(option);
    });
  } else {
    console.error("Erreur lors du chargement des clients");
  }
}

  // Mettre à jour les champs lorsque le client est sélectionné
 export function mettreAJourChampsClient(clientId) {
    const clients = document.querySelector("#clientSelect").options;
    let client = null;
  
    // Chercher le client sélectionné parmi les options
    for (let i = 0; i < clients.length; i++) {
      if (clients[i].value == clientId) {
        // Accéder aux données client stockées dans data-client
        client = JSON.parse(clients[i].dataset.client); // Récupérer l'objet client
        break;
      }
    }
  
    // Si un client est trouvé, mettre à jour les champs
    if (client) {
      document.getElementById("clientNom").value = client.societe || ''; // S'assurer qu'il n'est pas undefined
      document.getElementById("clientAdresse").value = client.adresse+' '+client.codePostal+' ' +client.ville; // S'assurer qu'il n'est pas undefined
      document.getElementById("clientId").value = client.id || ''; // S'assurer qu'il n'est pas undefined
    }
  }

  