export function createSaveButton({ endpoint, getData, onSuccess, onError }) {
    const button = document.createElement("button");
    button.textContent = "💾 Enregistrer";
    button.className = "px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition";
  
    button.addEventListener("click", async () => {
      const data = getData();
      try {
        const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) throw new Error("Erreur lors de l’enregistrement");
  
        const result = await response.json();
        if (onSuccess) onSuccess(result);
      } catch (err) {
        console.error(err);
        if (onError) onError(err);
      }
    });
  
    return button;
  }
  