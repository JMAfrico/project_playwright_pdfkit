const PDFDocument = require('pdfkit')
const { step,infoTeste } = require('./datatest');

function document(pages) {

	//Import para preencher o nome do step sendo executado
	const stepName = step()

	//Documentação para criação de PDF : https://pdfkit.org/
	const doc = new PDFDocument({ margin: 30, size : 'A4' })

	//Fonte
	doc.font('Courier')

	//Tamanho
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
	for (let index = 0; index < pages.length; index++) {
		doc.text(stepName[index])
		doc.image(pages[index], 0, 0, { fit:  [595.28, 841.89], align: 'justify', valign: 'center' })
		if (pages.length != index + 1) {
			doc.addPage()
		}
	}

	//Faz a escrita dos dados no pdf e cria o arquivo
	//doc.pipe(fs.createWriteStream('/path/to/file.pdf'));

	//finaliza o preenchimento do documento
	doc.end()
	return doc
}
module.exports= {document}