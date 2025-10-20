// Firebase Configuration
// Les clés sont chargées depuis les variables d'environnement pour la sécurité

// Fonction pour charger la configuration Firebase depuis le serveur
async function loadFirebaseConfig() {
    try {
        const response = await fetch('/api/firebase-config');
        if (!response.ok) {
            throw new Error('Impossible de charger la configuration Firebase');
        }
        const config = await response.json();
        return config;
    } catch (error) {
        console.error('Erreur lors du chargement de la configuration Firebase:', error);
        throw error;
    }
}

export { loadFirebaseConfig };
