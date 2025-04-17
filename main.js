document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("experience-list");
  
    fetch("http://localhost:3000/api/workexperience")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((item) => {
          const article = document.createElement("article");
          article.classList.add("experience");
  
          article.innerHTML = `
            <h2>${item.companyname}</h2>
            <p><strong>${item.jobtitle}</strong> – ${item.location}</p>
            <p>${formatDate(item.startdate)} → ${formatDate(item.enddate)}</p>
            <p>${item.description}</p>
          `;
  
          list.appendChild(article);
        });
      })
      .catch((err) => {
        console.error("Fel vid hämtning:", err);
        list.innerHTML = "<p>Kunde inte ladda data.</p>";
      });
  });
  
  //visa datum snyggt
  function formatDate(dateString) {
    const d = new Date(dateString);
    return d.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "short",
    });
  }
  