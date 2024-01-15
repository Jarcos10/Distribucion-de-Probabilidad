
const startBtn = document.querySelector(".btn"),
    quiz = document.querySelector(".quiz"),
    startScreen = document.querySelector(".start-screen");

let preguntaActual = document.querySelector(".question"),
    estado = "0", 
    numPregunta = 0,
    distribucion;


const startQuiz = () => {

    loadingAnimation();
    setTimeout(() => {
        startScreen.classList.add("hide");
        quiz.classList.remove("hide");
        showQuestion(preguntaActual.textContent);
    }, 1000);
};



startBtn.addEventListener("click", startQuiz);

const showQuestion = (question) => {
    const questionText = document.querySelector(".question"),
        answersWrapper = document.querySelector(".answer-wrapper");
    questionNumber = document.querySelector(".number");

    questionText.innerHTML = question;

    const answers = ["Si", "No"];
    answersWrapper.innerHTML = "";
    answers.forEach((answer) => {
        answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
    });

    questionNumber.innerHTML = ` Pregunta <span class="current">${numPregunta + 1
        }`;


    // Incluimos el evento click a las respuestas
    const answersDiv = document.querySelectorAll(".answer");

    answersDiv.forEach((answer) => {
        answer.addEventListener("click", () => {
            if (!answer.classList.contains("checked")) {
                answersDiv.forEach((answer) => {
                    answer.classList.remove("selected");
                    answer.classList.remove("correct");
                });
                answer.classList.add("selected");
                answer.classList.add("correct");
                submitBtn.disabled = false;
            }
        });
    });
};


const loadingAnimation = () => {
    startBtn.innerHTML = "Loading";
    const loadingInterval = setInterval(() => {
        if (startBtn.innerHTML.length === 10) {
            startBtn.innerHTML = "Loading";
        } else {
            startBtn.innerHTML += ".";
        }
    }, 500);
};


const submitBtn = document.querySelector(".submit");

submitBtn.addEventListener("click", () => {
    checkAnswer();
    nextQuestion();
});

const checkAnswer = () => {
    const selectedAnswer = document.querySelector(".answer.selected");
    const answer = selectedAnswer.querySelector(".text").innerHTML;

    if(selectedAnswer.textContent.includes("Si"))
        estado = adivinarDistribucion(estado, 1);

    else
        estado = adivinarDistribucion(estado, 0);
    
};



const nextQuestion = () => {
    if (estado != "G" && estado != "B" && estado != "P" && estado != "H" && estado != "U" && estado != "N" && estado != "EXP" && estado != "E")
        showQuestion(preguntaActual);
    else 
        showDistribution();
};

const endScreen = document.querySelector(".end-screen"),
answerDistribution = document.querySelector(".distribution-answer"),
img_distribution = document.getElementById("img-2");

const showDistribution = () => {
    endScreen.classList.remove("hide");
    quiz.classList.add("hide");
    answerDistribution.innerHTML = distribucion;

    if(estado == "E")
        img_distribution.src = "imagenes/perrito_fracaso.png"
};

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", () => {
    window.location.reload();
});


function adivinarDistribucion(estado, respuesta) {

    numPregunta++;

    switch (estado) {

      case "0":
        if (respuesta) {
           preguntaActual = "¿La distribucion tiene un parámetro?";
           return "11";
        }


        else {
          preguntaActual = "¿Tiene más de un ensayo?";
          return "1";
        }

        break;

      case "1":

        if (respuesta) {
          preguntaActual = "¿Son ensayos hasta obtener un éxito?"
          return "2";
        }

        else {
          preguntaActual = "¿El ensayo solo tiene dos posibles resultados?";
          return "8";
        }

        break;

      case "2":

        if (respuesta) {
          distribucion = "Geométrica"
          return "G"
        }

        else {
          preguntaActual = "¿Son ensayos independientes?";
          return "3";
        }

        break;

        case "3":

        if (respuesta) {
          preguntaActual = "¿La distribucion emplea el experimento hasta el primer éxito?"
          return "6";
        }

        else {
          preguntaActual = "¿La distribucion considera ensayos sin reemplazo?";
          return "4";
        }

        break;

        case "4":

        if (respuesta) {
          distribucion = "Hipergeométrica";
          return "H";
        }

        else {
          preguntaActual = "¿Seguro que los ensayos no son independientes?";
          return "5";
        }

        break;

        case "5":

        if (respuesta) {
          distribucion = "¡Lo siento! No pude adivinar la distribucion"
          return "E";
        }

        else {
          preguntaActual = "¿La distribucion emplea el experimento hasta el primer éxito?"
          return "6";
        }

        break;

        case "6":

        if (respuesta) {
          distribucion = "Geométrica"
          return "G";
        }

        else {
          preguntaActual = "¿El tamaño de la muestra es grande?";
          return "7";
        }

        break;

        case "7":

        if (respuesta) {
          distribucion = "Binomial: Se puede aproximar con una Poisson"
          return "B";
        }

        else {
          distribucion = "Binomial";
          return "B";
        }

        break;

        case "8":

        if (respuesta) {
          distribucion = "Bernoulli";
          return "B";
        }

        else {
          preguntaActual = "¿La distribucion representa las ocurrencias durante un periodo de tiempo o espacio?";
          return "9";
        }

        break;

        case "9":

        if (respuesta) {
          distribucion = "Poisson";
          return "P";
        }

        else {
          preguntaActual = "¿Seguro que el ensayo tiene solo dos resultados posibles?";
          return "10";
        }

        break;

        case "10":

        if (respuesta) {
          distribucion = "¡Lo siento! No pude adivinar la distribucion";
          return "E";
        }

        else {
          distribucion = "Poisson";
          return "P";
        }

        break;

        case "11":

        if (respuesta) {
          distribucion = "Exponencial";
          return "EXP";
        }

        else {
          preguntaActual = "¿La distribucion tiene igual probabilidad en cualquier rango dentro de su dominio?";
          return "12";
        }

        break;

        case "12":

        if (respuesta) {
          distribucion = "Uniforme";
          return "U";
        }

        else {
          preguntaActual = "¿Es simétrica con respecto a su media y tiene forma de campana?";
          return "13";
        }

        break;

        case "13":

        if (respuesta) {
          distribucion = "Normal";
          return "N";
        }

        else {
          preguntaActual = "¿La distribucion puede modelar la suma de varios ensayos exponenciales independientes?";
          return "14";
        }

        break;

        case "14":

        if (respuesta) {
          distribucion = "Gamma";
          return "G";
        }

        else {
          distribucion = "¡Lo siento! No pude adivinar la distribucion";
          return "E";
        }

        break;

    }


  }
