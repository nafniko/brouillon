export function renderAchatForm(onSubmit) {
  const form = document.createElement('form')
  form.className = 'bg-white p-4 rounded shadow space-y-4'

  form.innerHTML = `
    <!-- Tes inputs ici... -->
    <div class="flex flex-col">
      <label for="date">Date :</label>
      <input type="date" id="date" required class="p-2 border rounded" />
    </div>
    <div class="flex flex-col">
      <label for="societe">Société :</label>
      <input type="text" id="societe" required class="p-2 border rounded" />
    </div>
    <div class="flex flex-col">
      <label for="service">Service :</label>
      <input type="text" id="service" required class="p-2 border rounded" />
    </div>
    <div class="flex flex-col">
      <label for="montantHt">Montant HT :</label>
      <input type="number" id="montantHt" step="0.01" required class="p-2 border rounded" />
    </div>
    <div class="flex flex-col">
      <label for="tva">TVA (%) :</label>
      <input type="number" id="tva" step="0.01" required class="p-2 border rounded" />
    </div>
    <div class="flex justify-center">
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Ajouter</button>
    </div>
  `

  form.addEventListener('submit', e => {
    e.preventDefault()

    const achat = {
      date: form.querySelector('#date').value,
      societe: form.querySelector('#societe').value,
      service: form.querySelector('#service').value,
      montantHt: parseFloat(form.querySelector('#montantHt').value),
      tauxTva: parseFloat(form.querySelector('#tva').value)
    }
    achat.montantTva = achat.montantHt * (achat.tauxTva / 100)
    achat.montantTtc = achat.montantHt + achat.montantTva

    onSubmit(achat)
    form.reset()
  })

  return form
}
