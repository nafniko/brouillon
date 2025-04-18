import { showTvaPage } from "./pages/tva.js";
import { showVentePage } from "./pages/vente.js"; // Décommente cette ligne lorsque tu veux utiliser la page vente.
import { showAchatPage } from "./pages/achat.js"; // Décommente cette ligne lorsque tu veux utiliser la page vente.
import { showFacturePage } from './pages/factures.js'

export function loadPage() {
  // Récupérer le hash actuel de l'URL (ou "#dashboard" si aucun hash n'est spécifié)
  const hash = window.location.hash || "#dashboard";
  const content = document.getElementById("mainContent");

  // Switch pour charger le contenu de la page en fonction du hash
  switch (hash) {
    case "#tva":
      // Afficher la page TVA
      showTvaPage(content);
      break;
    case "#dashboard":
      // Afficher la page Dashboard
      content.innerHTML = '<h2 class="text-2xl">Dashboard</h2>';
      break;
    case "#facture":
      // Afficher la page facture
      showFacturePage(content);
      break;
    case "#ventes":
      // Afficher la page Ventes (en attente de la mise en place de la page vente)
      showVentePage(content);

      break;
    case "#achats":
      // Afficher la page Achats
      showAchatPage(content);
      break;
    default:
      // Si le hash ne correspond à aucune page, afficher une page d'erreur
      content.innerHTML = "<p>Page introuvable</p>";
  }
}

// Charger la page au démarrage en écoutant l'événement hashchange
window.addEventListener("hashchange", loadPage);

// Appeler loadPage au chargement initial pour gérer la première page (en fonction du hash)
