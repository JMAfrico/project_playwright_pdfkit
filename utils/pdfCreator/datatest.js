const test = require('@playwright/test');

//Função a ser chamada dentro do Page object
const titulodostep = []
const pages=[]
const newDate = new Date();

//Função captura os screenshots do page e adiciona no PDF
async function takescreenshot(page) {
    try {
        pages.push(await page.screenshot())
    } catch (error) {
        console.log("Erro ao capturar tela: " + error);
    }
}

//Função a ser chamada dentro do Page object
//Descreve o nome do step no console e na pagina pdf
function step(stepname) {
    try {
        console.log("Step: " + stepname);
        titulodostep.push(stepname)
        return titulodostep;
    } catch (error) {
        console.log(error)
    }

}

//Informações do teste executado a ser chamada no main.js do PDFKIT
function infoTeste() {
    return {
        titulo: test.info().title,
        status: test.info().status,
        autor: "Automação",
        data: newDate.toLocaleDateString(),
        hora: newDate.toLocaleTimeString(),
        srcimgsucess: 'utils/pdfCreator/img/pngsucess.png',
        srcimgfail: 'utils/pdfCreator/img/pngfail.png'
    }
}

//Informações do nome do pdf a ser chamado no generate PDF
function pdfCreateName() {
    return {
        titulo: test.info().title.replaceAll(' ', '_'),
        data: newDate.toLocaleDateString().replaceAll('/', ''),
        hora: newDate.toLocaleTimeString().replaceAll(':', ''),
    }
}
module.exports = { pdfCreateName, step ,infoTeste,takescreenshot,pages}