import {document} from './main'
const fs = require('fs');
const { pdfCreateName } = require('./datatest');
const pages = [];

//Função captura os screenshots do page e adiciona no PDF
async function takescreenshot(page) {
    try {
        pages.push(await page.screenshot())
    } catch (error) {
        console.log("Erro ao capturar tela: " + error);
    }
}

//Finaliza a criação do documento
function createPDF() {
    try {
        console.log("Gerando PDF...");
        const path = `evidencia/${pdfCreateName().titulo}_${pdfCreateName().data}${pdfCreateName().hora}.pdf`
        document(pages).pipe(fs.createWriteStream(path))
        console.log("PDF gerado com sucesso.");
    } 
    catch (error) 
    {
        console.log("Erro ao Gerar PDF: " + error);
    }

}
module.exports = { takescreenshot, createPDF }