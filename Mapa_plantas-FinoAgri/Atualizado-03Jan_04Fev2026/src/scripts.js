const plantas = document.querySelector('#table-filas-plantas')
const plantaSalva = document.querySelectorAll('#table-filas-plantas td')

// Percorre os dados da tabela que contenha o valor 'B'
/* plantaSalva.forEach(element => {
  if (element.textContent === 'B') {
    element.localStorage.setItem('planta boa', 'Planta Boa')
  }
  if (element.textContent === 'R') {
    element.localStorage.setItem('planta replantio', 'Planta Replantio')
  }
}); */

plantas.addEventListener('click', function(event) {
  const plantaClicada = event.target.closest('td');
  if (plantaClicada) {
    console.log('planta clicada!', plantaClicada.textContent);

    // Usando a Biblioteca "sweetalert2" para interagir com o usuário
    Swal.fire({
      icon: "question",
      text: "Qual é o Status da planta clicada? ",
      title: "Salvando as informações da planta!",
      inputValue: plantaSalva, //Assim optmos pelo valor preenchido e salvo antes.
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: "Replantio", // era botão de Cancelar = OK
      confirmButtonText: "Planta Boa", // era botão de Confirm
      denyButtonText: `Falha`, // era botão de Negar = Não

      inputValidator: (value) => {
        if(!value) {
          return 'Falta definir em que estado está a planta!'
        }
      },
      
      /* Aqui adicionei um Botao para intergagir sobre espaços vazios no croqui de plantas. 
        Veja no "else" o "escutador de eventos" criado para isso.
      */
      footer:'<span>Se é espaço vazio como por exemplo: estrada, dreno; Clique abaixo!<span> <br>' +
      '<button id="planta-none" style="padding: 0.225rem 0.625rem; background-color: #47c2479e; color: #173ef0; font-weight: 700; ">Espaço Vazio</button>',
      
      //  Assim garantimos o anexo do "addEventListener" momento correto por meio do "didOPen".
      // O didOpen vai executar os comando assim após o "modal/janela de opções" ser inserida.
      didOpen: () => {
        const plantaNone = document.getElementById('planta-none')

        plantaNone.addEventListener('click', (event) => {
          //Assim evitamos a possível propagação do click que gera Erro ao clicar noutro elemento.
          event.stopPropagation();

          // My Logic
          console.log('Botão Footer Sweetalert2 clicado!')
          if(plantaNone) {
            plantaClicada.classList.remove('planta-F')
            plantaClicada.classList.remove('planta-B')
            plantaClicada.classList.remove('planta-R')
            plantaClicada.classList.add('planta-None')
            plantaClicada.innerText = ' '
            Swal.fire("Espaço Vazio salvo!");
          }
        })
      }
    }).then((result) => {

      // Read more about isConfirmed, isDenied below
      if (result.isConfirmed) {
        plantaClicada.innerText = 'B'
        plantaClicada.classList.remove('planta-None')
        plantaClicada.classList.remove('planta-F')
        plantaClicada.classList.remove('planta-R')
        plantaClicada.classList.add('planta-B')

        //Assim salvamos o estado da planta clicada no LocalStorage
        localStorage.setItem('Planta-Boa', result.value)
        Swal.fire("Planta Boa salva com sucesso!");
      } else if (result.isDenied) {
        plantaClicada.classList.remove('planta-None')
        plantaClicada.classList.remove('planta-B')
        plantaClicada.classList.remove('planta-R')
        plantaClicada.classList.add('planta-F')
        plantaClicada.innerText = 'F'

        //Assim salvamos o estado da planta clicada no LocalStorage
        localStorage.setItem('Planta Falha', result.value)
        Swal.fire("Planta-falha salva!");

        // Assim funciona para quando o usuário clicar 'NÃO = Replantio' que é o botão Cancelar.
        // Ou quando precionar ESC ou clicar fora da caixa de opções.
      } else if (result.dismiss === Swal.DismissReason.cancel){
        plantaClicada.classList.remove('planta-None')
        plantaClicada.classList.remove('planta-F')
        plantaClicada.classList.remove('planta-B')
        plantaClicada.classList.add('planta-R')
        plantaClicada.innerText = 'R'

        //Assim salvamos o estado da planta clicada no LocalStorage
        localStorage.setItem('Planta-Replantio', result.value)
        Swal.fire("Planta Replantada salva!");
      }
    });
  }

  // Botão extra criado no footer do sweet2 com escutador de eventos para remover plantas.
  /* Mas que somente assim apresentou o Erro no console (scripts.js:61 Uncaught TypeError: 
    Cannot read properties of null (reading 'addEventListener') 
    
    */

  /* setTimeout(() => {
    const plantaNone = document.getElementById('planta-none'); // Pega o botão extra criado.
    plantaNone.addEventListener('click', () => {
      if(plantaNone) {
        plantaClicada.classList.remove('planta-F')
        plantaClicada.classList.remove('planta-B')
        plantaClicada.classList.remove('planta-R')
        plantaClicada.classList.add('planta-None')
        plantaClicada.innerText = ' '
        Swal.fire("Espaço Vazio salvo!");
      } else {
        alert('ops')
      }
    }) 
  }, 500); // 100milissegundos */
});


/* Bandeiras e opções */

// Seleciona os inputs radio por meio do name "flag-selected"
const radios = window.document.querySelectorAll('input[name="flag-selected"]')

// Seleciona as bandeiras que terão sua classe modificada
const limeFlag = window.document.getElementById("lime-flag")
const orangeFlag = window.document.getElementById("orange-flag")
const redFlag = window.document.getElementById("red-flag")

// Ouvinte de eventos com parâmetro "change" a cada inputio radio
radios.forEach(radio => {
  radio.addEventListener('change', function() {
    // 'this' é exatamente o input que foi alterado
    const flagSelected = this.value; // flagSelected = valorSelecionado

    // Adicionando ou removendo classe mediante o valor
    if (flagSelected === 'flag-1') {
      /* Muda a cor da bolinha do input radio */
      radios[0].style.accentColor = 'lime'

      /* Se seleciona o radio 1 então adiciona a class=hidden na bandeira verde e 
      remove a class=hidden da bandeira laranja e da vermelha */
      limeFlag.classList.add('hidden')


      // Assim garantimos a remoção da classe se ela existir
      orangeFlag.classList.remove('hidden')
      redFlag.classList.remove('hidden')
    } else if (flagSelected === 'flag-2'){
      radios[1].style.accentColor = 'orange'
      orangeFlag.classList.add('hidden')
      redFlag.classList.remove('hidden')
      limeFlag.classList.remove('hidden')
    }
    else {
      radios[2].style.accentColor = 'red'
      redFlag.classList.add('hidden')
      orangeFlag.classList.remove('hidden')
      limeFlag.classList.remove('hidden')
    }
  })
})

// I- Seleciona as divs de classe div-flag para funcionar como opções
const divFlags = window.document.querySelectorAll('.div-flag')

// II- Adiciona o ouvinte de evento para cada div-flag e se for do tipo click exrcuta a function
divFlags.forEach(divOpcionFlag => {
  divOpcionFlag.addEventListener('click', function() {

  // III- Assim busca e encontra o input radio dentro da div ou associado a ela.
  // Pode-se usar um atributo de dados ex: (data-radio-id="name-exemple") ou querySelector.
  // O data-radio-id tem que estar na div, e o nome deve ser igual ao nome do id do input
  // Exemplo: <div data-radio-id="name-exemple> text <\div>
  //          <input type="radio" id="name-exemple">
  const radioId = this.getAttribute('data-radio-id')   
  const radioInput = document.getElementById(radioId)

  //Assim é outra maneira , se o input estiver dentro da div
  //const radioInput = this.querySelector('input[type="radio"]');

  // IV Marca o input radio como selecionado
    if(radioInput) {
      radioInput.checked = true // Assim marca o radio button
      //console.log(divOpcionFlag)

      /* Assim ao clicar numa bandeira, marcamos ela como selecionada. */
      if (divOpcionFlag === document.querySelector('[data-radio-id="lime-flag-selected"]')) {
  
        limeFlag.classList.add('hidden')
        orangeFlag.classList.remove('hidden')
        redFlag.classList.remove('hidden')
  
      }else if (divOpcionFlag === document.querySelector('[data-radio-id="orange-flag-selected"]')) {
        orangeFlag.classList.add('hidden')
        limeFlag.classList.remove('hidden')
        redFlag.classList.remove('hidden')
      }else /*if (divOpcionFlag === document.querySelector('[data-radio-id=red-flag-selected"]'))  */{
        redFlag.classList.add('hidden')
        orangeFlag.classList.remove('hidden')
        limeFlag.classList.remove('hidden')
      }
    }

  })
})