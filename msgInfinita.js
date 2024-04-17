async function enviarScript(scriptText){
	const lines = scriptText.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
	main = document.querySelector("#main"),
	textarea = main.querySelector(`div[contenteditable="true"]`)

	if(!textarea) throw new Error("Não há uma conversa aberta")

	for(const line of lines){
		console.log(line)

		textarea.focus();
		document.execCommand('insertText', false, line);
		textarea.dispatchEvent(new Event('change', {bubbles: true}));

		setTimeout(() => {
			(main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
		}, 100);
	
		if(lines.indexOf(line) !== lines.length - 1) await new Promise(resolve => setTimeout(resolve, 250));
	}

	return lines.length;
}

async function loop(text, timeout = 1000) {
	while(true) {
		await enviarScript(text);
		await new Promise(resolve => setTimeout(resolve, timeout));
	}
}

loop("Teste"); // Altera o texto aqui, o segundo parâmetro opcional é o tempo de espera até a próxima msg em milesegundos.
