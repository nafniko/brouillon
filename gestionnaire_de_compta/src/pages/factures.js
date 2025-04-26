// src/pages/factures.js
import { genererFactureHTML } from "../modules/factureGenerator.js";
import { initFactureForm,mettreAJourChampsClient,chargerClients } from "../modules/Forms/factureForm.js";
import { afficherTableauFactures } from "../modules/List/factureList.js";
import { create } from '../requeteApi/create.js';
import { extraireDonneesFacture } from "../modules/extraireFacture.js";

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
      id: "",
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
      <option value="1" data-desc="Consultation Web" data-prix="100">Consultation Web</option>
      <option value="2" data-desc="Maintenance serveur" data-prix="200">Maintenance serveur</option>
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
  type="button" 
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
    
  document.getElementById("clientSelect").addEventListener("change", function (e) {
    const selectedClientId = e.target.value;
    facture.client.id = selectedClientId; // <-- ajoute cette ligne pour mettre à jour l'id du client dans la facture
    mettreAJourChampsClient(selectedClientId);
  });
  
  
  // Charger les clients au démarrage
  chargerClients();

  const form = document.getElementById("factureForm");
  const preview = document.getElementById("facturePreview");
  const downloadBtn = document.getElementById("downloadBtn");
  
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


  const extraitFacture = document.getElementById("saveButton");
  extraitFacture.addEventListener("click", (e) => {
    e.preventDefault();
    const factureHTML = genererFactureHTML(facture);
    console.log(factureHTML); 
  
    const factureData = extraireDonneesFacture(factureHTML);
  
    // 🛠️ Ajout des totaux calculés depuis `facture`
    factureData.total_ht = facture.totalHt;
    factureData.total_tva = facture.totalHt * 0.2; // 20% TVA
    factureData.total_ttc = facture.totalHt * 1.2;
  
    console.log(factureData);
    create('http://127.0.0.1:8000/api/facture/new', factureData);
  });
  

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

}
