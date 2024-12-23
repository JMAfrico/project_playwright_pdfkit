const PDFDocument = require('pdfkit')
const { infoTeste ,getPages} = require('./datatest');

/**
 * https://pdfkit.org/
 * Responsável por gerar e manipular documentos PDF a partir de dados e screenshots capturados durante a execução de testes.
 **/
function document() {
	
	const doc = new PDFDocument({ margin: 30, size : 'A4' })

	doc.font('Courier')

	doc.fontSize(18);

	//Informações da primeira página
	doc.text('Test Report', { align: 'center', stroke: 'true', underline: 'true' })
	doc.text(`Projeto: ${infoTeste().autor}`, { align: 'center' })
	doc.text(`Cenário: ${infoTeste().titulo}`, { align: 'center' })
	doc.text(`Data: ${infoTeste().data} - ${infoTeste().hora}`, { align: 'center' })
	if (infoTeste().status == 'passed') {
		doc.fillColor('green').text(`Status: ${infoTeste().status}`, { align: 'center' })
		doc.image(infoTeste().srcimgsucess, 250, 250, { fit: [100, 100] })

	} else {
		doc.fillColor('red').text(`Status: ${infoTeste().status}`, { align: 'center' })
		doc.image(infoTeste().srcimgfail, 250, 250, { fit: [100, 100] })
	}

	//Paginas contendo nome dos steps e imagens geradas
	doc.addPage();
	for (let index = 0; index < getPages().print.length; index++) {
		doc.text(getPages().step[index])
		doc.image(getPages().print[index], 0, 0, { fit:  [595.28, 841.89], align: 'justify', valign: 'center' })
		if (getPages().print.length != index + 1) {
			doc.addPage()
		}
	}

	//finaliza o preenchimento do documento
	doc.end()

	//Retorna o documento criado para ser salvo
	return doc
}
module.exports= {document}