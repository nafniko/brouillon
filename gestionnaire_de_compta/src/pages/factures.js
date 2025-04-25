// src/pages/factures.js
import { genererFactureHTML } from "../modules/factureGenerator.js";
import { initFactureForm } from "../modules/Forms/factureForm.js";
import { afficherTableauFactures } from "../modules/List/factureList.js";
import { create } from '../requeteApi/create.js';
import { fetchAll } from '../requeteApi/fetchAll.js';

export function showFacturePage(container) {
  const facture = {
    numero: "2025-001",
    emetteur: {
      nom: "Commerce Emoi",
      adresse: "22 rue pottier, 78150 le Chesnay-Rocquencourt",
      siret: "123 456 789 00010",
      tva: "FR12 123456789",
    },
    client: {
      nom: "",
      adresse: "",
    },
    date: new Date().toLocaleDateString("fr-FR"),
    lignes: [],
    tva: 20,
    totalHt: 0,
    totalTtc: 0,
    conditions: "Paiement sous 30 jours",
  };

  container.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-8 p-4">
      <!-- Formulaire -->
      <form id="factureForm" class="lg:w-1/2 space-y-4 bg-white p-4 shadow rounded-md">
  <h2 class="text-xl font-bold">Créer une facture</h2>

<!-- Sélection du client -->
<div>
  <label class="block text-sm">Client</label>
  <select id="clientSelect" class="w-full p-2 border rounded">
    <option value="">-- Choisissez un client --</option>
  </select>
</div>

<!-- Champs auto-remplis pour le client -->
<input type="hidden" id="clientId" />
<div>
  <label class="block text-sm">Nom</label>
  <input id="clientNom" type="text" class="w-full p-2 border rounded" readonly>
</div>
<div>
  <label class="block text-sm">Adresse</label>
  <textarea id="clientAdresse" class="w-full p-2 border rounded" readonly></textarea>
</div>



  <!-- Sélection de la prestation/produit -->
  <div>
    <label class="block text-sm">Prestation</label>
    <select id="produitSelect" class="w-full p-2 border rounded">
      <option value="">-- Choisissez un service --</option>
      <option value="10" data-desc="Consultation Web" data-prix="100">Consultation Web</option>
      <option value="11" data-desc="Maintenance serveur" data-prix="200">Maintenance serveur</option>
    </select>
  </div>

  <!-- Champs auto-remplis pour la prestation -->
  <input type="hidden" id="produitId" />
  <div>
    <label class="block text-sm">Description</label>
    <input id="desc" type="text" class="w-full p-2 border rounded" readonly>
  </div>
  <div class="flex gap-4">
    <input id="qte" type="number" placeholder="Quantité" class="w-1/2 p-2 border rounded" />
    <input id="pu" type="number" placeholder="Prix unitaire" step="0.01" class="w-1/2 p-2 border rounded" readonly />
  </div>

  <!-- Champs cachés -->
  <input type="hidden" id="tva" value="20" />
  <input type="hidden" id="totalHt" />
  <input type="hidden" id="totalTva" />
  <input type="hidden" id="totalTtc" />

  <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Ajouter ligne</button>
</form>


      <!-- Aperçu -->
      <div class="lg:w-1/2">
        <div id="facturePreview" class="bg-gray-100 p-4 rounded shadow"></div>
         <button 
  id="saveButton" 
  class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  data-endpoint="/api/facture/new"
>
  💾 Enregistrer
</button>
        <button id="downloadBtn" class="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700">Télécharger PDF</button>
      </div>
     

      
      </div>
      <div id="factureTable" class="mt-8"></div>
  `;
  async function chargerClients() {
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
  function mettreAJourChampsClient(clientId) {
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
  
    console.log("Client sélectionné : ", client);
  
    // Si un client est trouvé, mettre à jour les champs
    if (client) {
      document.getElementById("clientNom").value = client.societe || ''; // S'assurer qu'il n'est pas undefined
      document.getElementById("clientAdresse").value = client.adresse || ''; // S'assurer qu'il n'est pas undefined
      document.getElementById("clientId").value = client.id || ''; // S'assurer qu'il n'est pas undefined
    }
  }
  
  // Ajouter un écouteur d'événement pour la sélection d'un client
  document.getElementById("clientSelect").addEventListener("change", function (e) {
    mettreAJourChampsClient(e.target.value); // Appeler uniquement la fonction correcte pour mettre à jour les champs
  });
  
  // Charger les clients au démarrage
  chargerClients();
  

  // ...
  const form = document.getElementById("factureForm");
  const preview = document.getElementById("facturePreview");
  const downloadBtn = document.getElementById("downloadBtn");

  // document.getElementById("clientSelect").addEventListener("change", function () {
  //   const selected = this.options[this.selectedIndex];
  //   document.getElementById("clientId").value = selected.value;
  //   document.getElementById("clientNom").value = selected.dataset.nom || '';
  //   document.getElementById("clientAdresse").value = selected.dataset.adresse || '';
  // });
  
  document.getElementById("produitSelect").addEventListener("change", function () {
    const selected = this.options[this.selectedIndex];
    document.getElementById("produitId").value = selected.value;
    document.getElementById("desc").value = selected.dataset.desc || '';
    document.getElementById("pu").value = selected.dataset.prix || '';
  });
  

  const updatePreview = () => {
    facture.totalHt = facture.lignes.reduce(
      (sum, l) => sum + l.qte * l.puHt,
      0
    );
    facture.totalTtc = facture.totalHt * (1 + facture.tva / 100);
    preview.innerHTML = genererFactureHTML(facture);
  };


  // Utilisation du module formulaire
  initFactureForm(facture, updatePreview);

  downloadBtn.addEventListener("click", () => {
    const factureHTML = genererFactureHTML(facture);

    const newWindow = window.open("", "_blank");

    if (!newWindow) {
      alert("Pop-up bloquée. Autorisez les pop-ups pour ce site.");
      return;
    }

    const html = `
      <html>
        <head>
          <title>Facture</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
        </head>
        <body class="bg-gray-100 p-8">
          <div id="factureContent" class="bg-white p-8 rounded shadow max-w-2xl mx-auto">
            ${factureHTML}
          </div>
  
          <script>
            window.onload = function () {
              const element = document.getElementById('factureContent')
              html2pdf().from(element).save('Facture - ${facture.numero}.pdf').then(() => {
                window.close()
              })
            }
          </script>
        </body>
      </html>
    `;

    newWindow.document.open();
    newWindow.document.write(html);
    newWindow.document.close();
  });

  updatePreview();
  const tableContainer = document.getElementById("factureTable");

  // Affiche le tableau
  tableContainer.innerHTML = afficherTableauFactures(tableContainer);

// Par exemple, dans un fichier app.js ou index.js

document.getElementById("saveButton").addEventListener("click", async function() {

  const endpoint = document.getElementById("saveButton").getAttribute("data-endpoint");
  
  const factureEnregistree = await create(`http://127.0.0.1:8000${endpoint}`, facture);
console.log("Facture : ", facture);
  
  if (factureEnregistree) {
    alert("Facture enregistrée avec succès !");
  } else {
    alert("Erreur lors de l'enregistrement de la facture.");
  }
});


}
