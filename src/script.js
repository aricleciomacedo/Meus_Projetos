// Menu Toogle Mobile
document.addEventListener('DOMContentLoaded', () => {
    const buttonOpen = document.querySelector('.button-open')
    const buttonCLose = document.querySelector('.menu-mobile .menu-closed i.button-close')
    const menuToggle = document.querySelector('#mobile-menu.menu-toogle')
    const menuToggleUl = document.querySelector('#mobile-menu.menu-toogle ul')
    const noScrollInBody = document.body
    
    buttonOpen.addEventListener('click', () => {
        if(buttonOpen) {
            noScrollInBody.classList.toggle('no-scroll')
            buttonOpen.style.display = 'none';
            buttonCLose.style.display = 'block';
            menuToggle.style.display = 'block'
            menuToggleUl.style.display = 'flex'
        }
        
        /* Modo simples com evento para o botão de fechar o menu mobile*/
        buttonCLose.addEventListener('click', (e) => {
            e.stopPropagation();// para impedir que o clique no botão acione o document
            noScrollInBody.classList.remove('no-scroll')
            buttonCLose.style.display = 'none';
            menuToggle.style.display = 'none'
            menuToggleUl.style.display = 'none'
            buttonOpen.style.display = 'block';
        })
    });
    
    /* 
        Maneira simples e com forEach para fechar o menu mobile ao clicar fora dele ou em algum botão..
        OBS: A maneira simples também fecha ao clicar fora do menu mobile.
            Na opção com forEach optei por apenas exibir uma alert de que não há links.
    */
    menuToggleUl.addEventListener('click', () => {
        noScrollInBody.classList.remove('no-scroll')
        buttonCLose.style.display = 'none';
        menuToggle.style.display = 'none'
        menuToggleUl.style.display = 'none'
        buttonOpen.style.display = 'block';
    })
    menuToggleUl.querySelectorAll('li').forEach(link => {
        link.addEventListener('click', () => {
            alert('Page Default.')
        })
    })
})



// Elementos do CARROSSEL
let cardImg = document.querySelectorAll('.group .card');
let proxButton = document.querySelector('#proximo');
let antButton = document.querySelector('#anterior');
let navButton = document.querySelectorAll('.grupo-de-marcadores .marcador');
let setor = document.querySelectorAll('.container-de-areas-e-setores div.setor')

// Controle
let contador_Img = cardImg.length; //O valor do contador é o total de imagens que temos no carrossel.
let img_Ativa = 0; // Inicialmente Ativa é índice = 0.

/* 
    Evento de click para os botões proximo e anterior
*/
proxButton.addEventListener('click', () => {
    img_Ativa++ // soma + 1 ao valor da const

    if(img_Ativa >= contador_Img) {
        img_Ativa = 0
    }

    
    /* Chamada das funções */
    exibirCards()
    scrollMarcadorAtivo()
})
antButton.addEventListener('click', () => {
    img_Ativa--;

    if(img_Ativa < 0) {
        img_Ativa = contador_Img -1;
    }

    exibirCards()
    scrollMarcadorAtivo()
})

/* Função de Classe Dinâmica */
function exibirCards() {
    let imgPassada = document.querySelector('.group .card.ativo');
    let btnPassado = document.querySelector('.grupo-de-marcadores .marcador.ativo');
    let setorPassado = document.querySelector('.container-de-areas-e-setores div.setor.ativo')

    imgPassada.classList.remove('ativo');
    btnPassado.classList.remove('ativo');
    setorPassado.classList.remove('ativo');

    cardImg[img_Ativa].classList.add('ativo');
    navButton[img_Ativa].classList.add('ativo');
    setor[img_Ativa].classList.add('ativo')
}

/* Evento de click para os Links Rápidos */
navButton.forEach((buttOn, indice) =>  {
    buttOn.addEventListener('click', () => {
        img_Ativa = indice

        exibirCards()
        scrollMarcadorAtivo()
    });
});

// Função para direcionar o scroll até o marcador ativo
function scrollMarcadorAtivo() {

    //const marcadorAtivoScroll = document.querySelectorAll('.grupo-de-marcadores .marcador')
    
    //Pega o marcador ativo que no caso está com a class = marcador ativo
    const activeMarcador = document.querySelector('.marcador.ativo')

    if(activeMarcador) {

        // Mover o scroll até o marcador ativo
        activeMarcador.scrollIntoView({
            behavior: 'smooth', // Rolar suave
            block: 'nearest', // Vertical: (Não tão importante no eixo X)
            //inline: 'center' // Horizontal: Assim o item ativo fica centralizado se preferir
        })
    }
}