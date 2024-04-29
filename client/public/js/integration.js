let apiUrl = 'http://localhost:3002/start';

document.querySelector("#login-button").addEventListener("click", async () => {
    const inputName = document.querySelector("#player-name").value;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Definindo o cabeçalho Content-Type como application/json
            },
            body: JSON.stringify({ // Serializando os dados do formulário para JSON
                name: inputName
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response.status);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);

        apiUrl = 'http://localhost:3002/';

        const response2 = await fetch(apiUrl);

        if (!response2.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response2.status);
        }

        const data2 = await response2.json();
        console.log('Dados recebidos:', data2);
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
});
