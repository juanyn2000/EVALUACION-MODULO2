$(document).ready(function () {
  // Manejar el clic en las cards
  $(".card").click(function () {
    // Primero colapsamos todas las demás cards
    $(".card").not(this).removeClass("card-expanded");
    $(".card").not(this).find(".card-text-content").slideUp();

    // Luego manejamos la card clickeada
    $(this).toggleClass("card-expanded");
    $(this).find(".card-text-content").slideToggle();
  });
});

// Respuestas correctas
const correctAnswers = {
  q1: "b",
  q2: "c",
  q3: "b",
  q4: "a",
  q5: "b",
  q6: "b",
  q7: "c",
  q8: "a",
  q9: "b",
  q10: "b",
};

// Explicaciones de las respuestas
const explanations = {
  q1: "El phishing es una técnica fraudulenta para obtener información confidencial haciéndose pasar por una comunicación confiable.",
  q2: "Se recomiendan contraseñas de al menos 12 caracteres para mayor seguridad.",
  q3: "El ransomware encripta los archivos de la víctima y exige un rescate para liberarlos.",
  q4: "La regla 3-2-1 recomienda: 3 copias de los datos, en 2 medios diferentes, con 1 copia fuera del sitio.",
  q5: "Un ataque DDoS (Denegación de Servicio Distribuido) inunda un objetivo con tráfico desde múltiples fuentes.",
  q6: "Las actualizaciones frecuentemente incluyen parches para vulnerabilidades descubiertas.",
  q7: "Nunca debes interactuar con emails sospechosos. Contacta directamente a la institución.",
  q8: "Malware es cualquier software malicioso diseñado para dañar sistemas o redes.",
  q9: "Los gestores de contraseñas permiten almacenar y generar contraseñas seguras únicas para cada sitio.",
  q10: "El 'https://' y el candado indican que la conexión está cifrada y es más segura.",
};

function calculateScore() {
  let score = 0;
  const userAnswers = {};
  let allAnswered = true;

  // Verificar respuestas y si todas fueron contestadas
  for (let i = 1; i <= 10; i++) {
    const questionName = "q" + i;
    const selectedOption = document.querySelector(
      `input[name="${questionName}"]:checked`
    );

    if (selectedOption) {
      userAnswers[questionName] = selectedOption.value;
      if (selectedOption.value === correctAnswers[questionName]) {
        score++;
      }
    } else {
      allAnswered = false;
      break;
    }
  }

  if (!allAnswered) {
    alert(
      "Por favor responde todas las preguntas antes de ver los resultados."
    );
    return;
  }

  // Mostrar resultados
  const percentage = (score / 10) * 100;
  document.getElementById("progressBar").style.width = percentage + "%";
  document.getElementById(
    "scoreText"
  ).textContent = `Obtuviste ${score} de 10 (${percentage}%)`;

  // Generar feedback por pregunta
  let feedbackHtml = "<h5 class='mt-4'>Detalle por pregunta:</h5>";
  for (let i = 1; i <= 10; i++) {
    const q = "q" + i;
    const isCorrect = userAnswers[q] === correctAnswers[q];

    feedbackHtml += `
          <div class="mb-3 p-3 ${
            isCorrect ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10"
          }">
            <p><strong>Pregunta ${i}:</strong> ${
      isCorrect ? "✅ Correcto" : "❌ Incorrecto"
    }</p>
            <p class="mb-1"><strong>Tu respuesta:</strong> ${document
              .querySelector(`input[name="${q}"][value="${userAnswers[q]}"]`)
              .parentNode.textContent.trim()}</p>
            ${
              !isCorrect
                ? `<p class="mb-1"><strong>Respuesta correcta:</strong> ${document
                    .querySelector(
                      `input[name="${q}"][value="${correctAnswers[q]}"]`
                    )
                    .parentNode.textContent.trim()}</p>`
                : ""
            }
            <p class="mb-0"><small>${explanations[q]}</small></p>
          </div>
        `;
  }

  document.getElementById("answersFeedback").innerHTML = feedbackHtml;
  document.getElementById("result").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
}

function resetTest() {
  // Limpiar selecciones
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.checked = false;
  });

  // Ocultar resultados
  document.getElementById("result").style.display = "none";
  document.getElementById("progressBar").style.width = "0%";

  // Regresar al inicio del test
  window.scrollTo(0, 0);
}
