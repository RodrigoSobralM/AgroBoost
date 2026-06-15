const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", (event) => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    event.target.value = digits ? `(${digits}` : "";
    return;
  }

  if (digits.length <= 6) {
    event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return;
  }

  if (digits.length <= 10) {
    event.target.value =
      `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return;
  }

  event.target.value =
    `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
});

function validarNome(valor) {
  const nome = valor.trim().replace(/\s+/g, " ");

  if (!nome) return "Informe seu nome completo.";

  const partes = nome.split(" ");

  if (partes.length < 2) {
    return "Digite o nome e o sobrenome (não apenas um nome).";
  }

  const letras = /^[A-Za-zÀ-ÿ]+$/;
  const partesOk = partes.every((parte) => parte.length >= 2 && letras.test(parte));

  if (!partesOk) return "Nome e sobrenome devem ter ao menos 2 letras cada.";

  return "";
}

function validarEmail(valor) {
  const email = valor.trim();

  if (!email) return "Informe seu e-mail.";

  const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!padrao.test(email)) return "Digite um e-mail válido (ex.: nome@dominio.com).";

  return "";
}

function validarMensagem(valor) {
  const mensagem = valor.trim();

  if (!mensagem) return "Escreva sua mensagem.";
  if (valor.length > 500) return "A mensagem deve ter no máximo 500 caracteres.";

  return "";
}

function validarTelefone(valor) {
  const numeros = valor.replace(/\D/g, "");

  if (!numeros) return "Informe seu telefone.";
  if (numeros.length < 10 || numeros.length > 11) return "Telefone inválido. Use DDD + número.";

  return "";
}

function validarCidade(valor) {
  const cidade = valor.trim();

  if (!cidade) return "Informe sua cidade.";
  if (cidade.length < 2) return "Cidade inválida.";

  return "";
}

function validarAssunto(valor) {
  const assunto = valor.trim();

  if (!assunto) return "Informe o assunto.";
  if (assunto.length < 5) return "O assunto deve ter ao menos 5 caracteres.";

  return "";
}

const campos = [
  { id: "name", validar: validarNome },
  { id: "email", validar: validarEmail },
  { id: "phone", validar: validarTelefone },
  { id: "city", validar: validarCidade },
  { id: "subject", validar: validarAssunto },
  { id: "message", validar: validarMensagem },
];

function verificarCampo(campo) {
  const input = document.getElementById(campo.id);
  const erro = document.getElementById(`${campo.id}-error`);
  const mensagem = campo.validar(input.value);

  if (mensagem) {
    input.classList.add("is-invalid");
    erro.innerText = mensagem;
    return false;
  }

  input.classList.remove("is-invalid");
  erro.innerText = "";
  return true;
}

const form = document.querySelector(".contact-form");
const messageInput = document.getElementById("message");
const messageCount = document.getElementById("message-count");

messageInput.addEventListener("input", () => {
  messageCount.innerText = messageInput.value.length;
});

campos.forEach((campo) => {
  const input = document.getElementById(campo.id);

  input.addEventListener("blur", () => verificarCampo(campo));
  input.addEventListener("input", () => {
    if (input.classList.contains("is-invalid")) verificarCampo(campo);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let valido = true;
  let primeiroErro = null;

  campos.forEach((campo) => {
    if (!verificarCampo(campo)) {
      valido = false;
      if (!primeiroErro) primeiroErro = document.getElementById(campo.id);
    }
  });

  const consent = document.getElementById("consent");
  const consentErro = document.getElementById("consent-error");

  if (!consent.checked) {
    valido = false;
    consentErro.innerText = "É necessário autorizar o contato.";
    if (!primeiroErro) primeiroErro = consent;
  } else {
    consentErro.innerText = "";
  }

  const feedback = document.getElementById("form-feedback");

  if (!valido) {
    feedback.innerText = "Por favor, corrija os campos destacados.";
    feedback.classList.remove("is-success");
    feedback.classList.add("is-error");
    if (primeiroErro) primeiroErro.focus();
    return;
  }

  feedback.innerText =
    "Mensagem enviada com sucesso! Em breve a equipe AgroBoost entrará em contato.";
  feedback.classList.remove("is-error");
  feedback.classList.add("is-success");

  form.reset();
  messageCount.innerText = "0";

  campos.forEach((campo) => {
    document.getElementById(campo.id).classList.remove("is-invalid");
  });
});
