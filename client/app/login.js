const errorMessage = document.getElementById('error-message-container');

// Checagem se o usuário está autenticado ou não para redirecionar para a home
document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem('authToken');

    if(token) {
        window.location.href = "http://127.0.0.1:5500/client/hm.html";
    }
})

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries()); 

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data) 
        });

        if (response.ok) {
            const responseData = await response.json();
            
            errorMessage.innerHTML = ``;

            // Armazenando o token
            console.log(responseData)
            localStorage.setItem('authToken', responseData.token);
            localStorage.setItem('email', responseData.email);
            localStorage.setItem('name', responseData.name);

            //Fazendo o redirecionamento para a Home
            window.location.href = "http://127.0.0.1:5500/client/hm.html";
        } else {
            const errorText = await response.text();
            const errorMsg = errorText || "Email ou senha incorretos";
            errorMessage.innerHTML = `<p class="error-message" id="error-message">${errorMsg}</p>`;
        }
    } catch (error) {
        errorMessage.innerHTML = `<p class="error-message" id="error-message">${errorMsg}</p>`;
    }
});

