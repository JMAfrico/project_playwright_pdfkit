import { once } from 'events';
import { document } from './main'
const fs = require('fs');
const { pdfCreateName,getPages} = require('./datatest');

/**
 * Responsável por salvar o documento PDF no sistema de arquivos.
 */
async function createPDF() {
    try {
        if (getPages().print.length > 0) {
            console.log("Gerando PDF...");
            const path = `evidencia/${pdfCreateName().titulo}_${pdfCreateName().data}${pdfCreateName().hora}.pdf`
            const write = document().pipe(fs.createWriteStream(path))
            await once(write, 'finish')
            console.log("PDF gerado com sucesso.");
        }

    }
    catch (error) {
        console.log("Erro ao Gerar PDF: " + error);
    }

}
module.exports = { createPDF }