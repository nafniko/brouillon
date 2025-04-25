export async function create(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erreur create");
      return await response.json();
    } catch (err) {
      console.error("create Error:", err);
      return null;
    }
  }
  