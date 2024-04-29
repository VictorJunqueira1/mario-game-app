let apiUrl = 'http://172.16.11.8:3002/start';
document.querySelector("#login-button").addEventListener("click", async () => {
    const inputName = document.querySelector("#player-name").value;

    fetch(apiUrl, {
        body: {
            name: inputName
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data);
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
        });

    apiUrl = 'http://172.16.11.8:3002/';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao fazer a requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data);
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição:', error);
        });
});

