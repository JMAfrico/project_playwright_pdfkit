import { once } from 'events';
import { document } from './main'
const fs = require('fs');
const { pdfCreateName, pages } = require('./datatest');


//Finaliza a criação do documento
async function createPDF() {
    try {
        if (pages.length > 0) {
            console.log("Gerando PDF...");
            const path = `evidencia/${pdfCreateName().titulo}_${pdfCreateName().data}${pdfCreateName().hora}.pdf`
            const write = document(pages).pipe(fs.createWriteStream(path))
            await once(write, 'finish')
            console.log("PDF gerado com sucesso.");
        }

    }
    catch (error) {
        console.log("Erro ao Gerar PDF: " + error);
    }

}
module.exports = { createPDF }