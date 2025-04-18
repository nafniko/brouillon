// src/components/venteDetails.js
export const venteDetails = document.createElement('div');
venteDetails.id = 'venteDetails';
venteDetails.className = 'bg-gray-100 p-6 rounded-md shadow';

export function afficherDetails(vente) {
  venteDetails.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Détails de la vente</h2>
    <p><strong>Société :</strong> ${vente.societe}</p>
    <p><strong>Service :</strong> ${vente.service}</p>
    <p><strong>Montant HT :</strong> ${vente.montantHt} €</p>
    <p><strong>TVA (${vente.tauxTva}%) :</strong> ${vente.montantTva} €</p>
    <p><strong>Montant TTC :</strong> ${vente.montantTtc} €</p>
    <p><strong>Date :</strong> ${vente.date}</p>
  `;
}
