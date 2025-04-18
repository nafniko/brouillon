// src/pages/tva.js
import { calculerTotalTVA } from '../modules/tvaCalculator.js'

export function showTvaPage(container) {
  // Exemple de données de ventes et d'achats
  const ventes = [
    { montant: 100 },
    { montant: 150 },
    { montant: 200 },
  ]
  
  const achats = [
    { montant: 80 },
    { montant: 120 },
  ]
  
  // Taux de TVA
  const tauxVente = 20 // Taux de TVA sur les ventes
  const tauxAchat = 20 // Taux de TVA sur les achats
  
  const { tvaVentes, tvaAchats, tvaNette } = calculerTotalTVA(ventes, achats, tauxVente, tauxAchat)
  
  container.innerHTML = `
    <div class="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-8">
      <h2 class="text-3xl font-bold text-center text-indigo-600 mb-6">Gestion de la TVA</h2>
      
      <!-- TVA des ventes -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-800">TVA générée par les ventes</h3>
        <p class="text-2xl font-bold text-green-500">${tvaVentes.toFixed(2)} €</p>
      </div>

      <!-- TVA des achats -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-800">TVA générée par les achats</h3>
        <p class="text-2xl font-bold text-red-500">${tvaAchats.toFixed(2)} €</p>
      </div>

      <!-- TVA nette à payer ou récupérer -->
      <div class="mb-6">
        <h3 class="text-xl font-semibold text-gray-800">TVA nette à payer ou récupérer</h3>
        <p class="text-2xl font-bold ${tvaNette < 0 ? 'text-red-500' : 'text-green-500'}">
          ${tvaNette.toFixed(2)} €
        </p>
      </div>
      
      <!-- CTA - Ajouter une transaction (si tu veux plus tard) -->
      <div class="flex justify-center mt-8">
        <button class="btn btn-primary">Ajouter une transaction</button>
      </div>
    </div>
  `
}
