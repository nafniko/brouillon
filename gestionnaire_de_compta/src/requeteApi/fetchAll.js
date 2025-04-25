export async function fetchAll(url) {
    try {
      const response = await fetch(url);
      console.log("Response:", response); // Log the response object
      if (!response.ok) throw new Error("Erreur fetchAll");
      return await response.json();
    } catch (err) {
      console.error("fetchAll Error:", err);
      return null;
    }
  }
  