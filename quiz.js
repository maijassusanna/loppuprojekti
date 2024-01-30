const kysymykset = [
    { kysymys: 'What is the capital of France?', oikeaVastaus: 'Paris' },
    { kysymys: 'What is the capital of Estonia?', oikeaVastaus: 'Tallinn' },
    { kysymys: 'What is the capital of Australia?', oikeaVastaus: 'Canberra' },
    { kysymys: 'What is the capital of India?', oikeaVastaus: 'New Delhi' },
    { kysymys: 'What is the capital of Canada?', oikeaVastaus: 'Ottawa' },
    { kysymys: 'What is the capital of China?', oikeaVastaus: 'Beijing' },
    { kysymys: 'What is the capital of Germany?', oikeaVastaus: 'Berlin' },
    { kysymys: 'What is the capital of Spain?', oikeaVastaus: 'Madrid' },
    { kysymys: 'What is the capital of Italy?', oikeaVastaus: 'Rome' },
    { kysymys: 'What is the capital of Greece?', oikeaVastaus: 'Athens' },
  ];

  let peliTila = {
    aloitettu: false,
    suoritetty: false,
  };
  
  function luoKysymykset() {
    const quizContainer = document.getElementById('quiz-container');
  
    kysymykset.forEach((kysymysObj, indeksi) => {
      const kysymysElementti = document.createElement('div');
      kysymysElementti.innerHTML = `<p>${indeksi + 1}. ${kysymysObj.kysymys}</p>
                                   <input type="text" id="vastaus${indeksi + 1}" placeholder="Answer here...">`;
      quizContainer.appendChild(kysymysElementti);
    });

    peliTila.aloitettu = true;
  }
  
  function tarkistaVastaukset() {
    let oikein = 0;
    const tuloksetContainer = document.getElementById('tulokset-container');

    kysymykset.forEach((kysymysObj, indeksi) => {
      const kayttajanVastaus = document.getElementById(`vastaus${indeksi + 1}`).value.trim();
      const oikeaVastaus = kysymysObj.oikeaVastaus.toLowerCase();
  
      const vastausElementti = document.createElement('p');
      vastausElementti.textContent = `Question ${indeksi + 1}: Your answer - ${kayttajanVastaus}, Correct answer - ${oikeaVastaus}`;
      tuloksetContainer.appendChild(vastausElementti);
  
      if (kayttajanVastaus.toLowerCase() === oikeaVastaus) {
        vastausElementti.classList.add('correct'); // Lisää oikein-luokka oikein menneille vastauksille
        oikein++;
      } else {
        vastausElementti.classList.add('wrong'); // Lisää vaarin-luokka väärin menneille vastauksille
      }
  
});

//lopputulokset
const lopputulosElementti = document.createElement('p');
lopputulosElementti.textContent = `Correct answers ${oikein} / 10!`;
tuloksetContainer.appendChild(lopputulosElementti);


// Näytä tulokset-container, piilota peli-sivu
document.getElementById('peli-sivu').style.display = 'none';
tuloksetContainer.style.display = 'block';


const uudelleenButton = document.createElement('button');
    uudelleenButton.textContent = 'Play again';
    uudelleenButton.addEventListener('click', aloitaUudestaan);
    tuloksetContainer.appendChild(uudelleenButton);
}

function nollaaTulokset() {
  const tuloksetContainer = document.getElementById('tulokset-container');
  // Tyhjennä edelliset tulokset
  document.getElementById('tulokset-container').innerHTML = "";
  // Piilota tulokset-container
  document.getElementById('tulokset-container').style.display = 'none';
}

function aloitaUudestaan() {
  nollaaTulokset();
  
    // Näytä peli-sivu
    document.getElementById('peli-sivu').style.display = 'block';

    peliTila.aloitettu = false;

}

  
  function aloitaPeli() {
    nollaaTulokset();
    peliTila.aloitettu = false;
    document.getElementById('aloitus-sivu').style.display = 'none';
    document.getElementById('peli-sivu').style.display = 'block';
    document.getElementById('tulokset-container').style.display = 'none';
    luoKysymykset();
  }
  
  window.onload = function () {
  }
  