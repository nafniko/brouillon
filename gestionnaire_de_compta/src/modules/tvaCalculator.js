// src/modules/tvaCalculator.js
export function calculerTVA(montant, taux) {
    return (montant * taux) / 100
  }
  
  export function calculerTotalTVA(ventes, achats, tauxVente, tauxAchat) {
    const tvaVentes = ventes.reduce((total, vente) => total + calculerTVA(vente.montant, tauxVente), 0)
    const tvaAchats = achats.reduce((total, achat) => total + calculerTVA(achat.montant, tauxAchat), 0)
    
    return {
      tvaVentes,
      tvaAchats,
      tvaNette: tvaVentes - tvaAchats
    }
  }
  