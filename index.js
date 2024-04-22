
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("botao2").addEventListener("click", function () {
        botaoClicado("botao2");
        window.location.href = "atc.html";
    });

    document.getElementById("botao1").addEventListener("click", function () {
        window.location.href = "login.html";
    });

    var botao1atc = document.getElementById("botao1atc");
    if (botao1atc) {
        botao1atc.addEventListener("click", function () {
            // Sua lógica aqui
            window.location.href = "Entrega.html";
        });
    } else {
        console.error('Elemento #botao1atc não foi encontrado no DOM.');
    }

    var botao2atc = document.getElementById("botao2atc");
    if (botao2atc) {
        botao2atc.addEventListener("click", function () {
            // Sua lógica aqui
            window.location.href = "Pos.html";
        });
    } else {
        console.error('Elemento #botao2atc não foi encontrado no DOM.');
    }

    const options = document.querySelectorAll('input[name="answer"]');


    /*document.getElementById("botao3").addEventListener("click", function () {
        botaoClicado("botao3");
        window.location.href = "login.html";
    });*/

    ajustarVisibilidade();

    localStorage.setItem('pergunt2', JSON.stringify([]));
});

var botao1atc = document.getElementById("botao1atc");
if (botao1atc) {
    botao1atc.addEventListener("click", function () {
        // Sua lógica aqui
        window.location.href = "Entrega.html";
    });
} else {
    console.error('Elemento #botao1atc não foi encontrado no DOM.');
}

var botao2atc = document.getElementById("botao2atc");
if (botao2atc) {
    botao2atc.addEventListener("click", function () {
        // Sua lógica aqui
        window.location.href = "Pos.html";
    });
} else {
    console.error('Elemento #botao2atc não foi encontrado no DOM.');
}

var botao3atc = document.getElementById("botao3atc");
if (botao3atc) {
    botao3atc.addEventListener("click", function () {
        // Sua lógica aqui
        window.location.href = "assistec.html";
    });
} else {
    console.error('Elemento #botao3atc não foi encontrado no DOM.');
}

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

function verificarEFinalizar() {
    if (indiceAtual === 0) {
        mudarPergunta(1);
    } else {
        salvarRespostas(); // Salva as respostas
        window.location.href = 'questions-atc5.html'; // Redireciona para outra página
    }
}

function salvarRespostas() {
    const resposta1 = document.querySelector('input[name="construtora"]:checked')?.value;
    const resposta2 = document.querySelector('input[name="obra"]:checked')?.value;

    const respostas = {
        construtora: resposta1,
        obra: resposta2
    };

    localStorage.setItem('respostasFeedback', JSON.stringify(respostas));
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
    var dadosFormulario2 = {
        qtFuncionario: document.getElementById('qtdFuncionario').value,
    };

    localStorage.setItem('dadosFormulario', JSON.stringify(dadosFormulario));
    localStorage.setItem('dadosFormulario2', JSON.stringify(dadosFormulario2));
    window.location.href = "dados.html";
}

function enviarFormulario2() {
    // Obtem os valores dos campos
    var nomeCliente = document.getElementById('nomeCliente').value.trim();
    var obra = document.getElementById('obraatc').value.trim();
    var dataAvaliacao = document.getElementById('dataAvaliacaoatc').value.trim();
    var nomeAvaliador = document.getElementById('nomeAvaliadoratc').value.trim();

    // Verifica se algum dos campos está vazio
    if (nomeCliente === "" || obra === "" || dataAvaliacao === "" || nomeAvaliador === "") {
        alert("Por favor, preencha todos os campos antes de prosseguir.");
        return; // Interrompe a execução da função, evitando o redirecionamento
    }

    // Se todos os campos estiverem preenchidos, armazena os dados e redireciona
    var dadosFormularioatc = {
        nomeCliente: nomeCliente,
        obra: obra,
        dataAvaliacao: dataAvaliacao,
        nomeAvaliador: nomeAvaliador
    };

    localStorage.setItem('dadosFormulario', JSON.stringify(dadosFormularioatc));
    window.location.href = "questions-atc.html";
}

function enviarFormulario3() {
    // Obtem os valores dos campos
    var opniao = document.getElementById('opniao').value.trim();
    // Verifica se algum dos campos está vazio
    if (opniao === "") {
        var opniao = "não respondido";  // Interrompe a execução da função, evitando o redirecionamento
    }

    // Se todos os campos estiverem preenchidos, armazena os dados e redireciona
    var dadosFormularioatc2 = {
        opniao: opniao
    };

    localStorage.setItem('dadosFormulario2', JSON.stringify(dadosFormularioatc2));
    window.location.href = "questions-atc.html";
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
    const botoesOpcao2 = document.querySelectorAll('input[name="importante"]');
    for (const botao of botoesOpcao2) {
        if (botao.checked) {
            return botao.value;
        }
    }
    return null; // Retorna null se nenhuma opção estiver selecionada
}

function ajustarVisibilidade() {
    document.getElementById('question1-container').style.display = indiceAtual === 0 ? 'block' : 'none';
    document.getElementById('question2-container').style.display = indiceAtual === 1 ? 'block' : 'none';
}

function mudarPergunta(direcao) {
    indiceAtual += direcao;
    if (indiceAtual < 0) indiceAtual = 0;
    if (indiceAtual > 1) indiceAtual = 1;
    ajustarVisibilidade();
}

function optionSIM() {
    window.location.href = "questions-atc3.html";
}

function optionNAO() {
    window.location.href = "questions-atc4.html";
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

function proximaPergunta2() {
    indiceAtual++;
    if (indiceAtual < perguntas2.length) {
        console.log(perguntas2[indiceAtual]);
        document.getElementById("question").textContent = perguntas2[indiceAtual];
        document.querySelectorAll('input[name="answer"]').forEach(botao => botao.checked = false);
        document.querySelectorAll('input[name="importante"]').forEach(botao => botao.checked = false);
    } else {
        window.location.href = "questions-atc2.html";
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

function adicionarRespostaEProximaPergunta2() {
    var respostaSelecionada = obterRespostaUsuario();

    if (respostaSelecionada === null) {
        alert("Por favor, selecione uma opção antes de continuar.");
        return;
    }

    var pergunt2 = JSON.parse(localStorage.getItem('pergunt2') || '[]');
    pergunt2.push(respostaSelecionada);
    localStorage.setItem('pergunt2', JSON.stringify(pergunt2));

    proximaPergunta2();
}

function adicionarRespostaEProximaPergunta3() {
    var respostaSelecionada = obterRespostaUsuario();

    if (respostaSelecionada === null) {
        alert("Por favor, selecione uma opção antes de continuar.");
        return;
    }

    var pergunt3 = JSON.parse(localStorage.getItem('pergunt3') || '[]');
    pergunt3.push(respostaSelecionada);
    localStorage.setItem('pergunt3', JSON.stringify(pergunt3));

    window.location.href = "questions-atc4.html";
}

function adicionarRespostaEProximaPergunta4() {
    var respostaSelecionada = obterRespostaUsuario();

    if (respostaSelecionada === null) {
        alert("Por favor, selecione uma opção antes de continuar.");
        return;
    }

    var pergunt4 = JSON.parse(localStorage.getItem('pergunt4') || '[]');
    pergunt4.push(respostaSelecionada);
    localStorage.setItem('pergunt4', JSON.stringify(pergunt4));

    window.location.href = "questions-atc4.html";
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

function salvarRespostas2() {
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
