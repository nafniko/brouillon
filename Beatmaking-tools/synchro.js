import Meyda from 'meyda';

// Variables globales
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const mainTrackBuffer = null;
const harmonyBuffers = [];

// Charger un fichier audio et le convertir en AudioBuffer
async function loadAudio(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await audioContext.decodeAudioData(arrayBuffer);
}

// Trouver le premier pic sonore dans une piste
function detectTransient(buffer) {
    const channelData = buffer.getChannelData(0);
    const features = Meyda.extract('rms', channelData);
    
    let maxIndex = 0;
    let maxValue = 0;
    
    for (let i = 0; i < features.length; i++) {
        if (features[i] > maxValue) {
            maxValue = features[i];
            maxIndex = i;
        }
    }
    
    return maxIndex / audioContext.sampleRate; // Convertir en temps (secondes)
}

// Synchroniser les pistes
function syncTracks(mainBuffer, harmonyBuffers) {
    const mainStart = detectTransient(mainBuffer);
    const syncBuffers = harmonyBuffers.map(buffer => {
        const harmonyStart = detectTransient(buffer);
        return {
            buffer,
            delay: harmonyStart - mainStart
        };
    });

    playSyncedTracks(mainBuffer, syncBuffers);
}

// Jouer les pistes synchronisées
function playSyncedTracks(mainBuffer, syncBuffers) {
    const mainSource = audioContext.createBufferSource();
    mainSource.buffer = mainBuffer;
    mainSource.connect(audioContext.destination);
    mainSource.start();
    
    syncBuffers.forEach(({ buffer, delay }) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(audioContext.currentTime + delay);
    });
}

// Exemple d'utilisation
document.getElementById('startSync').addEventListener('click', async () => {
    mainTrackBuffer = await loadAudio('mainTrack.mp3');
    harmonyBuffers.push(await loadAudio('harmony1.mp3'));
    harmonyBuffers.push(await loadAudio('harmony2.mp3'));
    
    syncTracks(mainTrackBuffer, harmonyBuffers);
});
