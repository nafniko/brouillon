// src/modules/Form/clientForm.js

// Fonction pour créer le formulaire de gestion de client
export function createClientForm(containerId, clientData = null) {
    const container = document.getElementById(containerId);
  
    if (!container) return;
  
    // Si un client est fourni, remplir les champs avec les données existantes
    const isEdit = clientData !== null;
  
    container.innerHTML = `
<form id="clientForm" class="space-y-4 p-4 bg-white rounded shadow max-h-screen overflow-y-auto">
  <h2 class="text-xl font-bold">${isEdit ? 'Modifier' : 'Ajouter'} un client</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Ligne 1 -->
    <div>
      <label for="nom" class="block">Nom</label>
      <input type="text" id="nom" name="nom" class="border p-2 w-full" value="${isEdit ? clientData.nom : ''}" required />
    </div>
    <div>
      <label for="prenom" class="block">Prénom</label>
      <input type="text" id="prenom" name="prenom" class="border p-2 w-full" value="${isEdit ? clientData.prenom : ''}" />
    </div>

    <!-- Ligne 2 -->
    <div>
      <label for="societe" class="block">Société</label>
      <input type="text" id="societe" name="societe" class="border p-2 w-full" value="${isEdit ? clientData.societe : ''}" />
    </div>
    <div>
      <label for="email" class="block">Email</label>
      <input type="email" id="email" name="email" class="border p-2 w-full" value="${isEdit ? clientData.email : ''}" required />
    </div>

    <!-- Ligne 3 -->
    <div>
      <label for="adresse" class="block">Adresse</label>
      <textarea id="adresse" name="adresse" class="border p-2 w-full" required>${isEdit ? clientData.adresse : ''}</textarea>
    </div>
    <div>
      <label for="telephone" class="block">Téléphone</label>
      <input type="tel" id="telephone" name="telephone" class="border p-2 w-full" value="${isEdit ? clientData.telephone : ''}" required />
    </div>

    <!-- Ligne 4 -->
    <div>
      <label for="code_postal" class="block">Code Postal</label>
      <input type="text" id="code_postal" name="code_postal" class="border p-2 w-full" value="${isEdit ? clientData.code_postal : ''}" required />
    </div>
    <div>
      <label for="ville" class="block">Ville</label>
      <input type="text" id="ville" name="ville" class="border p-2 w-full" value="${isEdit ? clientData.ville : ''}" required />
    </div>

    <!-- Ligne 5 -->
    <div>
      <label for="pays" class="block">Pays</label>
      <input type="text" id="pays" name="pays" class="border p-2 w-full" value="${isEdit ? clientData.pays : ''}" required />
    </div>
    <div>
      <label for="siret" class="block">Numéro SIRET</label>
      <input type="text" id="siret" name="siret" class="border p-2 w-full" value="${isEdit ? clientData.siret : ''}" required />
    </div>
  </div>

  <div class="mt-4">
    <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full">
      ${isEdit ? 'Mettre à jour' : 'Ajouter'} le client
    </button>
  </div>
</form>


    `;
  
    // Gérer la soumission du formulaire
    const form = document.getElementById('clientForm');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const formData = new FormData(form);
      const data = {
        nom: formData.get('nom'),
        prenom: formData.get('prenom'),
        societe: formData.get('societe'),
        adresse: formData.get('adresse'),
        email: formData.get('email'),
        telephone: formData.get('telephone'),
        code_postal: formData.get('code_postal'),
        ville: formData.get('ville'),
        pays: formData.get('pays'),
        siret: formData.get('siret'),
      };
  
      // Envoyer la requête au serveur (ajout ou mise à jour du client)
      if (isEdit) {
        // Mise à jour du client
        fetch(`http://127.0.0.1:8000/api/client/${clientData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            alert('Client mis à jour avec succès');
            // Ajouter ici une fonction pour mettre à jour l'interface ou rediriger l'utilisateur
          })
          .catch((error) => console.error('Erreur:', error));
      } else {
        // Ajout d'un nouveau client
        fetch('http://127.0.0.1:8000/api/client/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((result) => {
            alert('Client ajouté avec succès');
            // Ajouter ici une fonction pour actualiser la liste des clients ou rediriger l'utilisateur
          })
          .catch((error) => console.error('Erreur:', error));
      }
    });
  }
  