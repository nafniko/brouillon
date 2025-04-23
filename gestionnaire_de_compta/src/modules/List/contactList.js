// src/modules/contactList.js
import { createExportExcelButton } from "../Boutons/exportExcelButton.js";
export function afficherContacts(containerId, contacts) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = `
      <div class="space-y-4">
        <h2 class="text-xl font-bold">Liste des contacts</h2>
        <table id="contactTable" class="w-full border border-collapse text-left">
          <thead>
            <tr class="bg-gray-200">
              <th class="border p-2">Nom</th>
              <th class="border p-2">societe</th>
              <th class="border p-2">adresse</th>
              <th class="border p-2">Email</th>
              <th class="border p-2">Téléphone</th>
            </tr>
          </thead>
          <tbody>
            ${contacts
              .map(
                (contact) => `
              <tr>
                <td class="border p-2">${contact.nom}</td>
                <td class="border p-2">${contact.societe}</td>
                <td class="border p-2">${contact.adresse}</td>
                <td class="border p-2">${contact.email}</td>
                <td class="border p-2">${contact.telephone}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
    <div id="excelBtnContainer"></div>
    </div>
    `;

  const excelBtn = createExportExcelButton(
    contacts.map((c) => ({
      Nom: c.nom,
      Email: c.email,
      Téléphone: c.telephone,
      Société: c.societe,
      Adresse: c.adresse,
    })),
    "contacts.xlsx"
  );

  document.getElementById("excelBtnContainer").appendChild(excelBtn);
}
