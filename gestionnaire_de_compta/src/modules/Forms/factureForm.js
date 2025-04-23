// src/modules/factureForm.js

export function initFactureForm(facture, updatePreview) {
    const form = document.getElementById('factureForm')
  
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
      }
    })
  }
  