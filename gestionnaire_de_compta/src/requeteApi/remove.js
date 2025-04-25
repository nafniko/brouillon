export async function remove(url, id) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur remove");
      return true;
    } catch (err) {
      console.error("remove Error:", err);
      return false;
    }
  }
  