export async function fetchAll(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erreur fetchAll");
      return await response.json();
    } catch (err) {
      console.error("fetchAll Error:", err);
      return null;
    }
  }
  