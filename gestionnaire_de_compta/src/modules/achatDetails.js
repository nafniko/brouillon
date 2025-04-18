// src/components/venteDetails.js
export const achatDetails = document.createElement('div');
achatDetails.id = 'achatDetails';
achatDetails.className = 'bg-gray-100 p-6 rounded-md shadow';

export function afficherDetails(achat) {
  achatDetails.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Détails de l'achat</h2>
    <p><strong>Société :</strong> ${achat.societe}</p>
    <p><strong>Service :</strong> ${achat.service}</p>
    <p><strong>Montant HT :</strong> ${achat.montantHt} €</p>
    <p><strong>TVA (${achat.tauxTva}%) :</strong> ${achat.montantTva} €</p>
    <p><strong>Montant TTC :</strong> ${achat.montantTtc} €</p>
    <p><strong>Date :</strong> ${achat.date}</p>
  `;
}
