import { fetchAll } from "../../requeteApi/fetchAll.js"

export async function afficherTableauFactures(container) {
  try {
    const factures = await fetchAll('http://127.0.0.1:8000/api/facture/all') 
    if (!factures.length) {
      container.innerHTML = `<p class="text-sm text-gray-500">Aucune facture enregistrée.</p>`
      return
    }

    const rows = factures.map(facture => `
      <tr class="border-t">
        <td class="p-2">${facture.id}</td>
        <td class="p-2">${facture.client.societe}</td>
        <td class="p-2">${facture.date}</td>
        <td class="p-2 text-right">${Number(facture.totalHt).toFixed(2)} €</td>
        <td class="p-2 text-right">${Number(facture.totalTva).toFixed(2)} €</td>
        <td class="p-2 text-right">${Number(facture.totalTtc).toFixed(2)} €</td>
        <td class="p-2 text-right">${facture.statut}</td>
      </tr>
    `).join('')

    container.innerHTML = `
      <table class="w-full text-sm bg-white border rounded shadow mt-6">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-2 text-left">n°facture</th>
            <th class="p-2 text-left">Client</th>
            <th class="p-2 text-left">Date</th>
            <th class="p-2 text-right">Total HT</th>
            <th class="p-2 text-right">Total TVA</th>
            <th class="p-2 text-right">Total TTC</th>
            <th class="p-2 text-right">Statut</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    `
  } catch (error) {
    console.error('Erreur lors du chargement des factures :', error)
    container.innerHTML = `<p class="text-sm text-red-500">Erreur lors du chargement des factures.</p>`
  }
}
