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

  //formulärhantering för add
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("experience-form");
    const msg = document.getElementById("status-msg");
  
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
  
        fetch("http://localhost:3000/api/workexperience", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("något gick fel");
            }
            return res.json();
          })
          .then((result) => {
            msg.textContent = "erfarenhet sparad";
            form.reset();
          })
          .catch((err) => {
            msg.textContent = "fel: " + err.message;
          });
      });
    }
  });
  
  