export async function update(url, id, data) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erreur update");
      return await response.json();
    } catch (err) {
      console.error("update Error:", err);
      return null;
    }
  }
  