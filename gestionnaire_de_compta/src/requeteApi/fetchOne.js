export async function fetchOne(url, id) {
    try {
      const response = await fetch(`${url}/${id}`);
      if (!response.ok) throw new Error("Erreur fetchOne");
      return await response.json();
    } catch (err) {
      console.error("fetchOne Error:", err);
      return null;
    }
  }
  