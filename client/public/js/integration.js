let apiUrl = 'http://localhost:3002/start';

document.querySelector("#login-button").addEventListener("click", async () => {
    const name = document.querySelector("#player-name").value;
    const password = document.querySelector("#player-password").value;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                name, password
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição: ' + response.status);
        }

        if (response.status === 409) {
            console.log("O nome de usuário já está em uso...")
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
