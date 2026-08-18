import { useRef, useState } from "react";
import Footer from "../components/Footer.jsx";

function validarNome(valor) {
  const nome = valor.trim().replace(/\s+/g, " ");

  if (!nome) return "Informe seu nome completo.";

  const partes = nome.split(" ");

  if (partes.length < 2) {
    return "Digite o nome e o sobrenome (não apenas um nome).";
  }

  const letras = /^[A-Za-zÀ-ÿ]+$/;
  const partesOk = partes.every(
    (parte) => parte.length >= 2 && letras.test(parte),
  );

  if (!partesOk) return "Nome e sobrenome devem ter ao menos 2 letras cada.";

  return "";
}

function validarEmail(valor) {
  const email = valor.trim();

  if (!email) return "Informe seu e-mail.";

  const padrao = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!padrao.test(email)) {
    return "Digite um e-mail válido (ex.: nome@dominio.com).";
  }

  return "";
}

function validarTelefone(valor) {
  const numeros = valor.replace(/\D/g, "");

  if (!numeros) return "Informe seu telefone.";
  if (numeros.length < 10 || numeros.length > 11) {
    return "Telefone inválido. Use DDD + número.";
  }

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

function validarMensagem(valor) {
  const mensagem = valor.trim();

  if (!mensagem) return "Escreva sua mensagem.";
  if (valor.length > 500) return "A mensagem deve ter no máximo 500 caracteres.";

  return "";
}

function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);

  if (digitos.length <= 2) return digitos ? `(${digitos}` : "";
  if (digitos.length <= 6) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  }
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }

  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
}

const campos = [
  {
    id: "name",
    rotulo: "Nome Completo",
    tipo: "text",
    placeholder: "Seu nome",
    validar: validarNome,
  },
  {
    id: "email",
    rotulo: "E-mail",
    tipo: "email",
    placeholder: "email@exemplo.com",
    validar: validarEmail,
  },
  {
    id: "phone",
    rotulo: "Telefone",
    tipo: "tel",
    placeholder: "(11) 99999-9999",
    validar: validarTelefone,
  },
  {
    id: "city",
    rotulo: "Cidade",
    tipo: "text",
    placeholder: "Sua cidade",
    validar: validarCidade,
  },
  {
    id: "subject",
    rotulo: "Assunto",
    tipo: "text",
    placeholder: "Assunto da mensagem",
    validar: validarAssunto,
    largura: "span-full",
  },
  {
    id: "message",
    rotulo: "Mensagem",
    tipo: "textarea",
    placeholder: "Digite sua mensagem",
    validar: validarMensagem,
    largura: "span-full",
  },
];

const valoresIniciais = {
  name: "",
  email: "",
  phone: "",
  city: "",
  subject: "",
  message: "",
};

export default function FaleConosco() {
  const [valores, setValores] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  const [autorizado, setAutorizado] = useState(false);
  const [erroAutorizacao, setErroAutorizacao] = useState("");
  const [feedback, setFeedback] = useState({ texto: "", tipo: "" });

  const referencias = useRef({});

  function aoDigitar(campo, valor) {
    const novoValor = campo.id === "phone" ? formatarTelefone(valor) : valor;

    setValores({ ...valores, [campo.id]: novoValor });

    if (erros[campo.id]) {
      setErros({ ...erros, [campo.id]: campo.validar(novoValor) });
    }
  }

  function aoSair(campo) {
    setErros({ ...erros, [campo.id]: campo.validar(valores[campo.id]) });
  }

  function aoEnviar(event) {
    event.preventDefault();

    const novosErros = {};
    campos.forEach((campo) => {
      novosErros[campo.id] = campo.validar(valores[campo.id]);
    });

    const mensagemAutorizacao = autorizado
      ? ""
      : "É necessário autorizar o contato.";
    const primeiroInvalido = campos.find((campo) => novosErros[campo.id]);

    setErros(novosErros);
    setErroAutorizacao(mensagemAutorizacao);

    if (primeiroInvalido || mensagemAutorizacao) {
      setFeedback({
        texto: "Por favor, corrija os campos destacados.",
        tipo: "is-error",
      });

      const alvo = primeiroInvalido
        ? referencias.current[primeiroInvalido.id]
        : referencias.current.consent;

      if (alvo) alvo.focus();
      return;
    }

    setFeedback({
      texto:
        "Mensagem enviada com sucesso! Em breve a equipe AgroBoost entrará em contato.",
      tipo: "is-success",
    });

    setValores(valoresIniciais);
    setErros({});
    setAutorizado(false);
  }

  return (
    <>
      <main className="contact-main">
        <div className="page-heading">
          <h2 className="page-title">Fale Conosco</h2>
          <p className="page-description">
            Entre em contato com a equipe AgroBoost.
          </p>
        </div>

        <form className="contact-form" noValidate onSubmit={aoEnviar}>
          {campos.map((campo) => (
            <div
              key={campo.id}
              className={`form-group${campo.largura ? " span-full" : ""}`}
            >
              <label htmlFor={campo.id}>{campo.rotulo}</label>

              {campo.tipo === "textarea" ? (
                <textarea
                  id={campo.id}
                  className={`field${erros[campo.id] ? " is-invalid" : ""}`}
                  rows="5"
                  maxLength="500"
                  placeholder={campo.placeholder}
                  value={valores[campo.id]}
                  ref={(el) => (referencias.current[campo.id] = el)}
                  onChange={(event) => aoDigitar(campo, event.target.value)}
                  onBlur={() => aoSair(campo)}
                />
              ) : (
                <input
                  id={campo.id}
                  className={`field${erros[campo.id] ? " is-invalid" : ""}`}
                  type={campo.tipo}
                  placeholder={campo.placeholder}
                  value={valores[campo.id]}
                  ref={(el) => (referencias.current[campo.id] = el)}
                  onChange={(event) => aoDigitar(campo, event.target.value)}
                  onBlur={() => aoSair(campo)}
                />
              )}

              {campo.id === "message" && (
                <div className="char-counter">
                  <span>{valores.message.length}</span>/500 caracteres
                </div>
              )}

              <span className="field-error">{erros[campo.id] || ""}</span>
            </div>
          ))}

          <div className="span-full">
            <label className="checkbox-line">
              <input
                type="checkbox"
                checked={autorizado}
                ref={(el) => (referencias.current.consent = el)}
                onChange={(event) => setAutorizado(event.target.checked)}
              />
              <span>Autorizo contato da equipe AgroBoost.</span>
            </label>
            <span className="field-error">{erroAutorizacao}</span>
          </div>

          <div className="span-full form-actions">
            <p className={`form-feedback ${feedback.tipo}`.trim()}>
              {feedback.texto}
            </p>
            <button className="btn submit-button" type="submit">
              Enviar Mensagem
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}
