class Card {
    path = '/brouillon/asset/son/';
  
    constructor(titre, artiste, audio, img) {
      this.titre = titre;
      this.artiste = artiste;
      this.audio = audio;
      this.img = img;
    }
  
    createCard() {
      // Création des éléments
      const div = document.createElement('div');
      div.classList.add('card');
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      const pochette = document.createElement('img');
      pochette.classList.add('card-img');
      pochette.src = `${this.img}`;
      pochette.alt = 'Pochette';
      const titre = document.createElement('h5');
      titre.innerHTML = this.titre;
      const artiste = document.createElement('p');
      const div_prix = document.createElement('div');
      div_prix.classList.add('prix');
      const prix = document.createElement('button');
      prix.classList.add('prix-button');

      prix.innerHTML = '19.99€';
      
      artiste.innerHTML = this.artiste;
  
      // Ajout des éléments à la carte
      const listeCard = document.querySelector('.liste_card');
      listeCard.appendChild(div);
      div.appendChild(cardBody);
      cardBody.appendChild(pochette);
      cardBody.appendChild(titre);
      cardBody.appendChild(artiste);
      cardBody.appendChild(div_prix);
      div_prix.appendChild(prix);
      // Gestion de l'événement click
      div.addEventListener('click', () => {
        const lecteur = new Lecteur(
          this.titre,
          this.artiste,
          this.path + this.audio,
          this.img
        );
        lecteur.getlecteur();
      });
  
      return div;
    }
  }

      const myAudio = [
        { titre: 'GO', audiofile: 'go_TK18220578.mp3.mp3',img:'asset/img/go.jpg' },
        { titre: 'BON', audiofile: 'grand-style-bon-master2.wav',img:'asset/img/zoo_arcadia.png' },
        { titre: 'FRAUDE', audiofile: 'grand-style-fraude-master.wav',img:'asset/img/zoo_arcadia.png' },
        { titre: 'GI JOE', audiofile: 'grand-style-gi-joe2.mp3',img:'asset/img/zoo_arcadia.png' },
      ];
      
      myAudio.forEach((element) => {
        const card = new Card(
          element.titre,
          'gs prod', // Remplace si tu as un artiste
          element.audiofile,
          element.img // Remplace avec un chemin valide
        );
        card.createCard();
      });
      