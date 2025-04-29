document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("experience-list");
    if (!list) return;
  
    fetch("https://nosql3-production.up.railway.app/api/experiences")
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

          //ta bort knapp
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Radera";
          deleteBtn.classList.add("delete-btn");
          deleteBtn.addEventListener("click", () => {
            if (confirm("Vill du verkligen ta bort den här erfarenheten?")) {
              fetch(`https://nosql3-production.up.railway.app/api/experiences/${item._id}`, {
                method: "DELETE"
              })
                .then(res => {
                  if (!res.ok) throw new Error("Kunde inte radera posten");
                  article.remove();
                })
                .catch(err => {
                  console.error("Fel vid radering:", err);
                });
            }
          });
  
          article.appendChild(deleteBtn);
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

        if (Object.values(data).some(val => val.trim() === "")) {
          msg.textContent = "alla fält måste fyllas i";
          return;
        }
  
        fetch("https://nosql3-production.up.railway.app/api/experiences", {
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
  
  