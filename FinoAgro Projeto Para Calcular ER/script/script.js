const plantasHora = window.document.querySelector("input#plantas-por-hora")
const horasTrabalhadas = document.querySelector("input#horas-trabalhadas")
const plantasPorDia = document.querySelector("p.plantas-por-dia")

const diaria = document.querySelector("input#diaria")
//const meta_doDia = document.querySelector("input#meta-do-dia")
const valorPlanta_porHora = document.querySelector("div.valor-planta-por-hora")

function calcular() {
    const meta_doDia = plantasHora.value * horasTrabalhadas.value 
    const diariaValue = diaria.value
    plantasPorDia.innerHTML = plantasHora.value * horasTrabalhadas.value + " plantas"
    //meta_doDia = plantasHora.value * horasTrabalhadas.value 
    
    const $valorPlanta_porHora = diariaValue / meta_doDia
    valorPlanta_porHora.innerHTML = `${$valorPlanta_porHora.toFixed(2)}R$`
    
    if (plantasHora.value === '' || horasTrabalhadas.value === '') {
        window.alert('Por favor; Não deixe campo vazio ou digite números válidos!')
    } 
}
