
    // const barre_lecture = document.getElementById("barre_lecture");
    // const barre = document.querySelector(".barre");
    // const controle = document.querySelector(".controle");
    // const info_musique = document.querySelector(".info_musique");
    // const btn_precedent = document.getElementById("btn_precedent");
    // const btn_play = document.getElementById("btn_play");
    // const btn_suivant = document.getElementById("btn_suivant");
    // const btn_volume = document.getElementById("btn_volume");
    // const barre_progression = document.querySelector(".barre_progression");
    // // const pochette = document.querySelector(".pochette");
    // const tag = document.querySelector(".h_p");
    // const titre = document.createElement("h4");
    // const artiste = document.createElement("p");
    // const path = "asset/son/";
    // const audiofile ='' ;
    // let musique = document.createElement("audio");
    // musique.src = path + audiofile;
    // titre.innerHTML = "Titre";
    // artiste.innerHTML = "Artiste";
    // barre_lecture.appendChild(barre);
    // barre_lecture.appendChild(temps_musique);
    // barre_lecture.appendChild(barre_progression);
    // barre.appendChild(info_musique);
    // barre.appendChild(controle);
    // barre.appendChild(btn_volume);
    // // info_musique.appendChild(pochette);
    // tag.appendChild(titre);
    // tag.appendChild(artiste);
    // info_musique.appendChild(tag);
    // controle.appendChild(btn_precedent);
    // controle.appendChild(btn_play);
    // controle.appendChild(btn_suivant);
   
    class Lecteur {
        static currentAudio = null; // Stocke l'audio en cours de lecture
        static currentBtnPlay = null; // Stocke le bouton play actuel
      
        constructor(titre, artiste, audio, img) {
          this.titre = titre;
          this.artiste = artiste;
          this.audio = new Audio(audio);
          this.img = img;
        }
      
        getlecteur() {
          const barreLecture = document.getElementById('barre_lecture');
          barreLecture.classList.remove('hidden');
          barreLecture.classList.add('visible');
      
          // Mettre à jour les infos du lecteur
          const pochette = document.querySelector('#image');
          const tempsMusique = document.querySelector('.temps_musique');
          const btnPlay = document.getElementById('btn_play');
          const btnPrecedent = document.getElementById('btn_precedent');
            const btnSuivant = document.getElementById('btn_suivant');

            const titre = document.querySelector('h4');
            const artiste = document.querySelector('#artiste');
            titre.textContent = this.titre;
            artiste.textContent = this.artiste;
          pochette.src = this.img;
          const formatTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
          };
          this.audio.onloadedmetadata = () => {
            tempsMusique.textContent = formatTime(this.audio.duration);
          };
      
          // Gestion de la lecture/pause
          const playPauseHandler = () => {
            // Pause de l'audio actuel si différent
            if (Lecteur.currentAudio && Lecteur.currentAudio !== this.audio) {
              Lecteur.currentAudio.pause();
              if (Lecteur.currentBtnPlay) {
                Lecteur.currentBtnPlay.textContent = '⏯️'; // Remettre l'icône play
              }
            }
      
            // Gestion du bouton et de la lecture/pause
            if (this.audio.paused) {
              this.audio.play();
              btnPlay.innerHTML = '<i class="bi bi-pause"></i>';
              Lecteur.currentAudio = this.audio;
              Lecteur.currentBtnPlay = btnPlay;
            } else {
              this.audio.pause();
              btnPlay.innerHTML = '<i class="bi bi-play"></i>';
              Lecteur.currentAudio = null;
              Lecteur.currentBtnPlay = null;
            }
          };
          btnPrecedent.onclick = () => {
            // Mettre à jour l'audio
            this.audio.currentTime = 0;
            this.audio.play();
            btnPlay.innerHTML = '<i class="bi bi-pause"></i>';
            Lecteur.currentAudio = this.audio;
            Lecteur.currentBtnPlay = btnPlay;
          };
          btnPlay.onclick = playPauseHandler;
          playPauseHandler(); // Démarre la musique au clic sur la carte

            btnSuivant.onclick = () => {
                // Logique pour passer à la carte suivante
                const nextCard = this.getNextCard();
                if (nextCard) {
                    this.audio.pause();
                    this.audio.currentTime = 0;
                    nextCard.audio.play();
                    btnPlay.innerHTML = '<i class="bi bi-pause"></i>';
                    Lecteur.currentAudio = nextCard.audio;
                    Lecteur.currentBtnPlay = btnPlay;
                    nextCard.updateLecteurInfo();
                }
            };

            // Méthode pour obtenir la carte suivante
            // getNextCard() {
            //     // Implémentez la logique pour obtenir la carte suivante
            //     // Cela peut dépendre de la structure de vos données
            //     // Par exemple, si vous avez un tableau de cartes, vous pouvez obtenir la suivante
            //     // return nextCard;
            // }

            // // Méthode pour mettre à jour les informations du lecteur
            // updateLecteurInfo() {
            //     const titre = document.querySelector('h4');
            //     const artiste = document.querySelector('#artiste');
            //     const pochette = document.querySelector('#image');
            //     titre.textContent = this.titre;
            //     artiste.textContent = this.artiste;
            //     pochette.src = this.img;
            // }      }
      }
    }