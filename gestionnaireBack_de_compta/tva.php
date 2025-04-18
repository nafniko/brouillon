<?php
header('Content-Type: application/json'); // Pour indiquer que c'est du JSON
// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");




function gestionTVA(array $ventesTTC, array $achatsTTC, float $tauxTVA = 20.0): array {
    $taux = $tauxTVA / 100;
    $totalVentesTTC = array_sum($ventesTTC);
    $totalAchatsTTC = array_sum($achatsTTC);
    $totalVentesHT = $totalVentesTTC / (1 + $taux);
    $totalAchatsHT = $totalAchatsTTC / (1 + $taux);
    $tvaCollectee = $totalVentesTTC - $totalVentesHT;
    $tvaDeductible = $totalAchatsTTC - $totalAchatsHT;
    $soldeTVA = $tvaCollectee - $tvaDeductible;
    $etatTVA = $soldeTVA > 0 ? "À reverser à l'État" : "Crédit de TVA (récupérable)";

    return [
        'total_ventes_ttc' => round($totalVentesTTC, 2),
        'total_achats_ttc' => round($totalAchatsTTC, 2),
        'tva_collectee' => round($tvaCollectee, 2),
        'tva_deductible' => round($tvaDeductible, 2),
        'solde_tva' => round(abs($soldeTVA), 2),
        'etat_tva' => $etatTVA
    ];
}

// Récupérer les données envoyées en POST
$ventes = explode(',', $_POST['ventes']);
$achats = explode(',', $_POST['achats']);
$taux = $_POST['taux'] ?? 20.0;

$ventes = array_map('floatval', $ventes);
$achats = array_map('floatval', $achats);

$resultat = gestionTVA($ventes, $achats, $taux);

// Retourner la réponse au format JSON
echo json_encode($resultat);
