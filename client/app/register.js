// Checagem se o usuário está autenticado ou não para redirecionar para a home
document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem('authToken');

    if(token) {
        window.location.href = "http://127.0.0.1:5500/client/hm.html";
    }
})

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); 

    try {
        const response = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data) 
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log('Registro bem-sucedido:', responseData);
            // Aqui você pode redirecionar ou armazenar o token

            window.location.href = "http://127.0.0.1:5500/client/login.html";
        } else {
            console.error('Erro no registro:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});
