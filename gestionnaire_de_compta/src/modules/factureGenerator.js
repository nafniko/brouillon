export function genererFactureHTML(facture) {
    return `
      <div class="bg-white shadow-md rounded-md p-6 max-w-3xl mx-auto text-sm">
        <h1 class="text-2xl font-bold text-center mb-6">Facture n°${facture.numero}</h1>
  
        <div class="mb-4">
          <p><strong>Émetteur :</strong> ${facture.emetteur.nom}</p>
          <p>${facture.emetteur.adresse}</p>
          <p>SIRET : ${facture.emetteur.siret}</p>
          <p>TVA : ${facture.emetteur.tva}</p>
        </div>
  
        <div class="mb-4">
          <p><strong>Client :</strong> ${facture.client.nom}</p>
          <p>${facture.client.adresse}</p>
        </div>
  
        <div class="mb-4">
          <p><strong>Date :</strong> ${facture.date}</p>
        </div>
  
        <table class="w-full border border-gray-300 mb-4 text-sm">
          <thead>
            <tr class="bg-gray-100">
              <th class="border px-2 py-1 text-left">Description</th>
              <th class="border px-2 py-1 text-right">Quantité</th>
              <th class="border px-2 py-1 text-right">Prix Unitaire HT</th>
              <th class="border px-2 py-1 text-right">Total HT</th>
            </tr>
          </thead>
          <tbody>
            ${facture.lignes.map(ligne => `
              <tr>
                <td class="border px-2 py-1">${ligne.description}</td>
                <td class="border px-2 py-1 text-right">${ligne.qte}</td>
                <td class="border px-2 py-1 text-right">${ligne.puHt.toFixed(2)} €</td>
                <td class="border px-2 py-1 text-right">${(ligne.qte * ligne.puHt).toFixed(2)} €</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
  
        <div class="text-right">
          <p><strong>Total HT :</strong> ${facture.totalHt.toFixed(2)} €</p>
          <p><strong>TVA (${facture.tva}%) :</strong> ${(facture.totalHt * (facture.tva / 100)).toFixed(2)} €</p>
          <p class="text-lg font-bold"><strong>Total TTC :</strong> ${facture.totalTtc.toFixed(2)} €</p>
        </div>
  
        <p class="text-xs mt-6 italic">Conditions : ${facture.conditions}</p>
      </div>
    `
  }
  