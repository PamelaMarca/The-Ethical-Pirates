document.getElementById("searchButton").addEventListener("click", async () => {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  const response = await fetch(`/api/buscar?query=${query}`);
  const data = await response.json();

  const resultadosDiv = document.getElementById("resultados");
  resultadosDiv.innerHTML = ""; // Limpiar resultados anteriores

  if (data.length === 0) {
      resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
  } else {
      data.forEach(item => {
          const div = document.createElement("div");
          div.classList.add("resultado-item");
          div.innerHTML = `
              <h3>${item.nombre}</h3>
              <p>Plataforma: ${item.plataforma}</p>
          `;
          resultadosDiv.appendChild(div);
      });
  }
});
