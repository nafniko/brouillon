// src/pages/factures.js
import { genererFactureHTML } from '../modules/factureGenerator.js'


export function showFacturePage(container) {
  const facture = {
    numero: '2025-001',
    emetteur: {
      nom: 'Mon Entreprise',
      adresse: '123 Rue de la République, 75001 Paris',
      siret: '123 456 789 00010',
      tva: 'FR12 123456789'
    },
    client: {
      nom: '',
      adresse: ''
    },
    date: new Date().toLocaleDateString('fr-FR'),
    lignes: [],
    tva: 20,
    totalHt: 0,
    totalTtc: 0,
    conditions: 'Paiement sous 30 jours'
  }

  container.innerHTML = `
    <div class="flex flex-col lg:flex-row gap-8 p-4">
      <!-- Formulaire -->
      <form id="factureForm" class="lg:w-1/2 space-y-4 bg-white p-4 shadow rounded-md">
        <h2 class="text-xl font-bold">Créer une facture</h2>

        <div>
          <label class="block text-sm">Client</label>
          <input id="clientNom" type="text" placeholder="Nom du client" class="input input-bordered w-full p-2 border rounded">
        </div>

        <div>
          <label class="block text-sm">Adresse client</label>
          <textarea id="clientAdresse" class="input input-bordered w-full p-2 border rounded"></textarea>
        </div>

        <div>
          <label class="block text-sm">Description</label>
          <input id="desc" type="text" class="input input-bordered w-full p-2 border rounded">
        </div>

        <div class="flex gap-4">
          <input id="qte" type="number" placeholder="Quantité" class="w-1/2 p-2 border rounded" />
          <input id="pu" type="number" placeholder="Prix unitaire" step="0.01" class="w-1/2 p-2 border rounded" />
        </div>

        <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Ajouter ligne</button>
      </form>

      <!-- Aperçu -->
      <div class="lg:w-1/2">
        <div id="facturePreview" class="bg-gray-100 p-4 rounded shadow"></div>
        <button id="downloadBtn" class="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700">Télécharger PDF</button>
      </div>
    </div>
  `

  const form = document.getElementById('factureForm')
  const preview = document.getElementById('facturePreview')
  const downloadBtn = document.getElementById('downloadBtn')

  const updatePreview = () => {
    facture.totalHt = facture.lignes.reduce((sum, l) => sum + l.qte * l.puHt, 0)
    facture.totalTtc = facture.totalHt * (1 + facture.tva / 100)
    preview.innerHTML = genererFactureHTML(facture)
  
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    facture.client.nom = document.getElementById('clientNom').value
    facture.client.adresse = document.getElementById('clientAdresse').value

    const ligne = {
      description: document.getElementById('desc').value,
      qte: Number(document.getElementById('qte').value),
      puHt: Number(document.getElementById('pu').value)
    }

    if (ligne.qte && ligne.puHt) {
      facture.lignes.push(ligne)
      updatePreview()
    //   form.reset()
    }
  })


  
  downloadBtn.addEventListener('click', () => {
    const factureHTML = genererFactureHTML(facture)
  
    const newWindow = window.open('', '_blank')
  
    if (!newWindow) {
      alert('Pop-up bloquée. Autorisez les pop-ups pour ce site.')
      return
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
    `
  
    newWindow.document.open()
    newWindow.document.write(html)
    newWindow.document.close()
  })
  
  
  

  updatePreview()
}
