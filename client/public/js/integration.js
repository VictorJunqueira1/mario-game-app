document.querySelector("#login-button").addEventListener("click", async () => {
    const name = document.querySelector("#auth-name").value;
    const password = document.querySelector("#auth-password").value;

    if (!name || !password) {
        throw new Error('Campos faltantes!');
    }

    try {
        const response = await fetch("http://localhost:3002/start", {
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
            console.log("O nome de usuário já está em uso...");
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
    }
});
