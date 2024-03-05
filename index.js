
document.addEventListener("DOMContentLoaded", function () {
    /*document.getElementById("botao2").addEventListener("click", function () {
        botaoClicado("botao2");
        window.location.href = "login.html";
    });

    document.getElementById("botao3").addEventListener("click", function () {
        botaoClicado("botao3");
        window.location.href = "login.html";
    });*/

    localStorage.setItem('pergunt', JSON.stringify([]));
});


var firebaseConfig = {
    apiKey: "AIzaSyCpSZJiaj-tTSxJEMeAVV9GScqPQwYEKhs",
    authDomain: "apptop-cbda7.firebaseapp.com",
    projectId: "apptop-cbda7",
    storageBucket: "apptop-cbda7.appspot.com",
    messagingSenderId: "973152398765",
    appId: "1:973152398765:web:7e08ef176508fa707d0524",
    measurementId: "G-8TDG9G2M5X"
};

firebase.initializeApp(firebaseConfig);

var respostas = [];

var dadosJaSalvos = false;

function addLoading() {
    const button = document.getElementById('button');
    button.innerHTML = '<img src="imagens/loading.png" class="loading">';
}


function loginUser() {
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    addLoading();

    // Autenticação com e-mail e senha
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

            var user = userCredential.user;
            localStorage.setItem('userEmail', email);

            console.log("Login bem-sucedido:", user);

            window.location.href = "formulario.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error("Erro ao fazer login:", errorMessage);
            alert("Erro ao fazer login. Verifique suas credenciais.");
        });

    // Retorna false para impedir o envio do formulário
    return false;
}


// scripts.js da pagina inicial

document.getElementById("botao1").addEventListener("click", function () {
    window.location.href = "login.html";
});

/*document.getElementById("botao2").addEventListener("click", function () {
    botaoClicado("botao2");
    window.location.href = "login.html";
});*/

/*document.getElementById("botao3").addEventListener("click", function () {
    botaoClicado("botao3");
    window.location.href = "login.html";
});*/

function botaoClicado(botaoId) {
    console.log("Botão clicado: " + botaoId);

}

// botão de retornar
function retornarParaAbaInicial() {
    window.location.href = "index.html";
}

function enviarFormulario() {
    var dadosFormulario = {
        obra: document.getElementById('obra').value,
        dataAvaliacao: document.getElementById('dataAvaliacao').value,
        nomeAvaliador: document.getElementById('nomeAvaliador').value
    };

    localStorage.setItem('dadosFormulario', JSON.stringify(dadosFormulario));
    window.location.href = "dados.html";
}

function enviarFormulario2() {
    var dadosFormulario2 = {
        qtFuncionario: document.getElementById('qtdFuncionario').value,
    };
    localStorage.setItem('dadosFormulario2', JSON.stringify(dadosFormulario2));
    window.location.href = "questions.html";
}



//final da pagina formulario



//questions
function obterRespostaUsuario() {
    const botoesOpcao = document.querySelectorAll('input[name="answer"]');
    for (const botao of botoesOpcao) {
        if (botao.checked) {
            return botao.value;
        }
    }
    return null; // Retorna null se nenhuma opção estiver selecionada
}


function proximaPergunta() {
    indiceAtual++;
    if (indiceAtual < perguntas.length) {
        document.getElementById("question").textContent = perguntas[indiceAtual];
        document.getElementById("titulo").textContent = titulos[indiceAtual];
        document.querySelectorAll('input[name="answer"]').forEach(botao => botao.checked = false);
    } else {
        salvarRespostas();
    }
}

function adicionarRespostaEProximaPergunta() {
    var respostaSelecionada = obterRespostaUsuario();

    if (respostaSelecionada === null) {
        alert("Por favor, selecione uma opção antes de continuar.");
        return;
    }

    var pergunt = JSON.parse(localStorage.getItem('pergunt') || '[]');
    pergunt.push(respostaSelecionada);
    localStorage.setItem('pergunt', JSON.stringify(pergunt));

    proximaPergunta();
}


function anteriorPergunta() {
    if (indiceAtual > 0) {
        indiceAtual--;
        var paragrafo = document.getElementById("question");
        paragrafo.textContent = perguntas[indiceAtual]
        atualizarTitulo();

        var pergunt = JSON.parse(localStorage.getItem('pergunt')) || [];
        pergunt.pop(); // Remove o último elemento
        localStorage.setItem('pergunt', JSON.stringify(pergunt)); // Salva o array atualizado de volta no localStorage

        // Atualizar o estado da resposta selecionada baseada na nova pergunta
        var respostaAtual = pergunt[indiceAtual]; // assumindo que a resposta está alinhada com o índice da pergunta
        if (respostaAtual !== undefined) {
            document.querySelector(`input[name="answer"][value="${respostaAtual}"]`).checked = true;
        } else {
            // Caso não haja uma resposta armazenada para a pergunta atual, desmarque todas as opções
            document.querySelectorAll('input[name="answer"]').forEach(botao => botao.checked = false);
        }
    }
}

function atualizarTitulo() {
    var paragrafo = document.getElementById("titulo");
    if (paragrafo) {
        paragrafo.textContent = titulos[indiceAtual]
    }
}

function salvarRespostas() {
    if (dadosJaSalvos) {
        return; // Se os dados já foram salvos, não faça nada
    }
    var userEmail = localStorage.getItem('userEmail') || 'Usuário não logado';
    var dadosFormulario = JSON.parse(localStorage.getItem('dadosFormulario')) || {};
    var dadosFormulario2 = JSON.parse(localStorage.getItem('dadosFormulario2')) || {};
    var pergunt = JSON.parse(localStorage.getItem('pergunt')) || [];

    // Criar um único objeto com todos os dados
    var linhaDados = {
        Email: userEmail,
        Obra: dadosFormulario.obra || '',
        Data: dadosFormulario.dataAvaliacao || '',
        Avaliador: dadosFormulario.nomeAvaliador || '',
        QtdFuncionarios: dadosFormulario2.qtFuncionario || '',
        ...pergunt.reduce((obj, resposta, index) => {
            obj['Pergunta ' + (index + 1)] = resposta;
            return obj;
        }, {})
    };

    // URL fornecida pelo Sheet Monkey após a configuração
    var sheetMonkeyUrl = 'https://api.sheetmonkey.io/form/ik4CTXSsTWg5mdM4NAPAwh';

    // Faça uma solicitação POST para o Sheet Monkey com os dados do formulário
    fetch(sheetMonkeyUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(linhaDados)
    })

        .then(response => {
            // Primeiro, verifica o status da resposta
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(text => {
            console.log('Resposta recebida:', text);
            alert('Dados salvos com sucesso!');
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error('Erro:', error);
            alert('Ocorreu um erro. Os dados não foram salvos.');
            window.location.href = "index.html";
        });
    dadosJaSalvos = true;    
}
