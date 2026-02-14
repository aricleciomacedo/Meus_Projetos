// Ouvinte de Evento que garante a execução do código após o total carregamneto do HTML.
document.addEventListener('DOMContentLoaded', () => { 
    //Scroll Automático para Croqui Ativo
    function scrollToActiveCroqui() {
      //Pega o croqui ativo que no caso está com a class = navigation-menu-nav-li-a-active
      const activeCroqui = document.querySelector('#a-active')

      if(activeCroqui) {

        // Mover o contâiner até o croqui ativo
        activeCroqui.scrollIntoView({
          behavior: 'smooth', // Rolar suave
          block: 'nearest', // Vertical: (Não tão importante no eixo X)
          inline: 'center' // Horizontal: o item ativo fica centralizado.
        })
        console.log(`Active Croqui is`, activeCroqui)
      } else {
        console.log('Not Active Croqui!')
      }
    }

    // Quando a página carregar a função é chamada
    window.addEventListener('load', scrollToActiveCroqui)


    // ---Se o mouse estiver sobre uma célula então marca a linha e a coluna que ela pertence

    // Seleciona a tabela
    const table_FP = document.getElementById('table-filas-plantas')
    // Seleção de todas as (th)´s da tabela
    const cells_TH = document.querySelectorAll('#table-filas-plantas th')
    // Seleção de todas as células da tabela; isto é: os (td)´s
    const cells_FP = document.querySelectorAll("#table-filas-plantas td")
    // Assim quando o mouse passar sobre cada uma das células chama a função passarMouseSobre(handleMouseOver)
    // e chama a função passarMouseFora(handleMouseOut) quando o mouse sair de cima da célula.
    cells_FP.forEach(cell => {
    cell.addEventListener('mouseover', passarMouseSobre); //também pode ser o evento 'mouseenter'
    cell.addEventListener('mouseout', passarMouseFora); // também pode ser o evento 'mouseleave'
    })

    // Função para quando o mouse passar sobre alguma td, e realçando a linha a que ela pertence
    
    // 1- celulaAtual(cell) recebe o evento do tipo target pois refere-se a celula que dispara o evento
    // 2- indexLinha(rowIndex) recebe o indíce referente a linha
    // 3- indexColuna(cellIndex) recebe o indíce referente a coluna
    // 4- const linha(row) e estruturas de controle for para percorrer cada célula e adcionar a classe = destacar
    //    para realçar ambos (linhas e colunas).
    function passarMouseSobre(event) {
    //console.log('Mouse Passou Sobre')

    const celulaAtual = event.target
    const indexLinha = celulaAtual.parentNode.rowIndex
    const indexColuna = celulaAtual.cellIndex

    const linha = table_FP.rows[indexLinha]

        //Linhas
    for (let i = 0; i < linha.cells.length; i++) { 
        linha.cells[i].classList.add('destacar')
    };
        // Colunas
    for (let i = 0; i < table_FP.rows.length; i++) {
        table_FP.rows[i].cells[indexColuna].classList.add('destacar')
    };
    }

    // Função para quando o mouse sair de sobre alguma td ou th

    // 1- Remoção da classe destacar.
    function passarMouseFora(event) {
    cells_FP.forEach(celulas => {
        celulas.classList.remove('destacar')
    })
    cells_TH.forEach(celulasTH => {
        celulasTH.classList.remove('destacar')
    })
    //console.log('Mouse Saiu de Sobre')
    };
})

//<!-- Estilo das <td>´s de planta Travada = "T"  -->

// Pegamos todos os <td class="planta-B">T</td>
const planta_status = document.querySelectorAll(".planta-B")

/* 
    Aqui modificamos o estilo para as planas Travadas, Variedade  2 e 3.
Então dizemos que para cada <td class="planta-B"> que conter o texto "T", ou "V2", ou "V3", então receberá o estilo de cor de fundo e cor de letra diferente dos outros.
*/
planta_status.forEach(planta => {
    if(planta.textContent === "T") {
        planta.style.backgroundColor = "gray"
        planta.style.color = "black"
    } else if (planta.textContent === "V2") {
        planta.style.backgroundColor = "gray"
        planta.style.color = "black"
    } else if(planta.textContent === "V3") {
        planta.style.backgroundColor = "gray"
        planta.style.color = "black"
    }
})