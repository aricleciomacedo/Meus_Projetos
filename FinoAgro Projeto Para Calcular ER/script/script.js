function calcular() {
    //Defimos um padrão com base no salário de R$ 1.621,20 para caso o usuário não digite algum valor.
    const valorPadraoDiaria = 54.04;
    

    //Pegamos o valor digitado no input ID diria
    const inputDiaria = document.getElementById('diaria').value

    /* "A constante diaria recebe o seguinte: se a variável inputDiaria existir (ou for verdadeira), ela assume o valor de inputDiaria convertido para número decimal (parseFloat). Caso contrário, ela assume o valor de valorPadraoDiaria." */
    const diaria = inputDiaria ? parseFloat(inputDiaria) : valorPadraoDiaria;

    /* As constante "meta" e "producao" recebe o valor do elemento com ID 'meta' e 'input-producao' convertido para número (parseFloat). Caso o resultado não seja um número válido (como NaN ou vazio), ela assume o valor 0. */
    const meta = parseFloat(document.getElementById('meta').value) || 0
    const producao = parseFloat(document.getElementById('input-producao').value) || 0

    //guard clause
    /* "Se a meta for menor ou igual a zero, mostre um alerta avisando para definir a meta e pare a execução da função imediatamente (return)." */
    if (meta <= 0) {
        alert("Defina a meta para o cálculo.")
        return;
    }

    //Salário Base calcula o valor da diária multiplicada por 30 dias
    const salarioBase = diaria * 30;

    /* A contante valorDaPlanta vem da divisão de valorPadraoDiaria pela meta(da empresa) ; Assim cada planta apartir da meta da empresa vai valer esse valor:*/
    const valorDaPlanta = valorPadraoDiaria / meta

    /* Assim a "constante bonusExtra" recebe(=) o seguinte: se(if) a "produção" for maior(>) que a "meta", calcule a diferença entre elas (producao - meta) e multiplique(*) pelo valor da diária dividido(/) pela meta (diaria / meta). Caso contrário (se a produção não superou a meta), o bônus será = zero. */
    const bonusExtra = producao > meta ? (producao - meta) * (diaria / meta) : 0


    /* Assim a constante total recebe o valor da Soma do valor da producao extra + o salario  */
    const total = salarioBase + bonusExtra

    /* Essa "constante format" é uma função que recebe um valor "v" e o transforma em uma string no formato de moeda brasileira (Real). */
    const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    
    /* Mostrando o Resultado

        Primeiro pegamos a div resultado e fazemos aparecer na tela usando o display flex; pois por padrão definimos um display none.
    */
    document.getElementById('resultado').style.display = 'flex'

    /* Salário em (30d)
        Pegamos a "span ID salario" para nela inserir o valor da base salárial em 30 dias e chamamos a função formatar para formatar a string para moeda corrente nacional com valor de const salarioBase = diaria * 30 */
    document.getElementById('salario').innerText = formatar(salarioBase);

    /* Extra por produtividade 
            Aqui pegamos o "span ID valor-producao" e nele vamos inserir uma string formatada com o valor da "constante bonusExtra" que mostra o quanto o colaborador ganhou após ultrapassar a meta da empresa:*/

    if(producao - meta < 0) {
        document.getElementById('valor-producao').innerHTML = `<span style="color: #ff0000;font-weight: 400;"> Você não ultrapassou a meta da empresa!</span>`
    } else if (producao - meta == 0) {
        document.getElementById('valor-producao').innerHTML = `<span style="color:var(--cor_1a);"> Você atingiu somente a meta da empresa!</span>`
    } else {
        document.getElementById('valor-producao').innerHTML = `<i>Você ultrapassou ${producao - meta} plantas após a meta da empresa; Então será somado:<i> <br> + <span style="color:var(--cor_4);">${formatar(bonusExtra)}</span> ao seu salário`;
    }

    /*Valor Líquido:
        Aqui pegamos o elemento "span ID resultado-total" e nele inserimos o valor que vem da "contante total", pois é aqui onde soma a produção extra com o salário e formata para o padrão de moeda nacional. 
    */
    document.getElementById('resultado-total').innerText = formatar(total)

    /*Valor por Planta:
        Aqui pegamos o elemento "span ID valor-planta" e nele inserimos o valor de uma planta feita após ultrapassar a "meta" da empresa. Esse valor vem de (const valorDaPlanta = valorPadraoDiaria / meta)
    */
   document.querySelector('#valor-planta').innerHTML = `${formatar(valorDaPlanta)} por planta`;

    /* Aplicação do efeito FADE no botão limpar em conjunto com sua aparição: */

    //  Assim fazemos o botão limpar aparecer
    document.querySelector('#btnLimpar').style.display = "block";
    //    Pegamos o botão assim que ele aparece
    const btnLimpar = document.querySelector('#btnLimpar'); 
    //  Deixa o botão presente
    btnLimpar.style.display = 'block'; 
    //  Funcão com definição de limite de tempo em 10s desde o ínicio ao fim da aparição da classe showe aplicação da classe ao elemento.
    setTimeout(() => btnLimpar.classList.add('show'), 10)

    //Adcionei ao .container um pseudo-elemento after para dar um efeito mais escuro ao fundo:
    document.querySelector('.container').classList.add('com-after');

    console.log('...!')
}

/* Essa é a função para Limpara a tela de resultado */
function limpar() {
    // 1. Limpa os valores de todos os campos de entrada
    document.getElementById('diaria').value = "";
    document.getElementById('meta').value = "";
    document.getElementById('input-producao').value = "";

    // 2. Esconde a caixa de resultado que antes estava com display flex
    const resultado = document.getElementById('resultado');
    resultado.style.display = 'none';

    // 3. (Opcional) Reseta os textos internos para o padrão
    document.getElementById('salario').innerText = "R$ 0,00";
    document.getElementById('valor-producao').innerText = "+ R$ 0,00";
    document.getElementById('resultado-total').innerText = "R$ 0,00";

    // Esconde o botão limpar novamente
    document.getElementById('btnLimpar').style.display = 'none';
    /* Remove o elemento after do container */
    document.querySelector('.container').classList.remove('com-after');

        // Faz o botão desaparecer
    const btn = document.getElementById('btnLimpar');
    btn.classList.remove('show'); // Inicia o fade out
    
    // Espera a animação (0.5s) terminar para tirar do layout
    setTimeout(() => {
        btn.style.display = 'none';
        // Reseta textos internos
        document.getElementById('salario').innerText = "R$ 0,00";
        document.getElementById('valor-producao').innerText = "+ R$ 0,00";
        document.getElementById('resultado-total').innerText = "R$ 0,00";
    }, 500);
}


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


/* Para Instalar no Celular */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}