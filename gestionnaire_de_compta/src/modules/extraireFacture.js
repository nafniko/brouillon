function nettoyerDate(dateString) {
    const date = new Date(dateString.trim());
    return isNaN(date.getTime()) ? null : date;
  }
  
  export function extraireDonneesFacture(factureHTML) {
    const container = document.createElement('div');
    container.innerHTML = factureHTML;
  
    // Récupération du client_id
    const clientP = container.querySelector('#p-id');
    const clientId = clientP ? parseInt(clientP.getAttribute('data-client-id')) || 0 : 0;
  
    // Récupération de la date
    const dateBlock = container.querySelectorAll('.mb-4')[2];
    const dateText = dateBlock?.querySelector('p')?.textContent?.split('Date :')[1]?.trim();
    const dateObj = nettoyerDate(dateText);
  
    const date = dateObj
      ? dateObj.toISOString().slice(0, 19).replace('T', ' ')
      : new Date().toISOString().slice(0, 19).replace('T', ' '); // fallback sur date actuelle
  
    // Récupération des lignes de facture
    const lignesElements = container.querySelectorAll('table tbody tr');
    const lignes = [];
  
    lignesElements.forEach((ligne) => {
        const tds = ligne.querySelectorAll('td');
        if (tds.length >= 4) {
          const produitId = Number(ligne.getAttribute('data-produit-id')) || 0; // AJOUT
          const description = tds[0].textContent.trim();
          const quantite = parseInt(tds[1].textContent.trim());
          const prixUnitaire = parseFloat(tds[2].textContent.trim().replace(' €', '').replace(',', '.'));
          const totalHT = parseFloat(tds[3].textContent.trim().replace(' €', '').replace(',', '.'));
      
          lignes.push({
            produit_id: produitId, // UTILISATION
            quantite: quantite,
            prix_unitaire: prixUnitaire,
            total_ht: totalHT
          });
        }
      });
      
  
    // Récupération des totaux
    const totalBlock = container.querySelector('.text-right');
    const totalP = totalBlock?.querySelectorAll('p') || [];
  
    const totalHTText = totalP[0]?.textContent?.split(':')[1]?.trim().replace(' €', '').replace(',', '.');
    const tvaMatch = totalP[1]?.textContent?.match(/TVA\s*\((\d+)%\)/);
    const totalTTCText = totalP[2]?.textContent?.split(':')[1]?.trim().replace(' €', '').replace(',', '.');
  
    const totalHT = parseFloat(totalHTText || 0);
    const totalTva = tvaMatch ? (totalHT * (parseFloat(tvaMatch[1]) / 100)) : 0;
    const totalTTC = parseFloat(totalTTCText || 0);
  
    const facture = {
      client_id: clientId || 0,
      date: date,
      total_ht: totalHT,
      total_tva: totalTva,
      total_ttc: totalTTC,
      statut: "en attente",
      lignes: lignes
    };
  
    return facture;
  }
  