// src/modules/contactList.js
import { createExportExcelButton } from "../Boutons/exportExcelButton.js";

export function afficherContacts(containerId, contacts) {
  const container = document.getElementById(containerId);

  if (!container) return;

  // Vérifier si contacts est un tableau valide et non vide
  if (!Array.isArray(contacts) || contacts.length === 0) {
    container.innerHTML = `<p>Aucun contact disponible.</p>`;
    return;
  }

  container.innerHTML = `
      <div class="space-y-4">
        <h2 class="text-xl font-bold">Liste des contacts</h2>
        <table id="contactTable" class="w-full border border-collapse text-left">
          <thead>
            <tr class="bg-gray-200">
              <th class="border p-2">Nom</th>
              <th class="border p-2">Société</th>
              <th class="border p-2">Adresse</th>
              <th class="border p-2">Email</th>
              <th class="border p-2">Téléphone</th>
            </tr>
          </thead>
          <tbody>
            ${contacts
              .map(
                (contact) => `
              <tr>
                <td class="border p-2">${contact.nom || 'Non renseigné'}</td>
                <td class="border p-2">${contact.societe || 'Non renseignée'}</td>
                <td class="border p-2">${contact.adresse || 'Non renseignée'}</td>
                <td class="border p-2">${contact.email || 'Non renseigné'}</td>
                <td class="border p-2">${contact.telephone || 'Non renseigné'}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <div id="excelBtnContainer"></div>
      </div>
    `;

  // Créer le bouton d'export Excel si contacts sont valides
  const excelBtn = createExportExcelButton(
    contacts.map((c) => ({
      Nom: c.nom || 'Non renseigné',
      Email: c.email || 'Non renseigné',
      Téléphone: c.telephone || 'Non renseigné',
      Société: c.societe || 'Non renseignée',
      Adresse: c.adresse || 'Non renseignée',
    })),
    "contacts.xlsx"
  );

  document.getElementById("excelBtnContainer").appendChild(excelBtn);
}
