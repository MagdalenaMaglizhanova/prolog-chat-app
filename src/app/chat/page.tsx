async function sendQuery() {
  if (!query.trim() || isLoading) return;

  setMessages((prev) => [...prev, { user: true, text: query }]);
  setQuery("");
  setIsLoading(true);

  try {
    // Debug log
    console.log("Sending query:", { 
      query: query.replace(/\.$/, ''), 
      file: "mineral_water.pl" 
    });

    const res = await fetch("https://prolog-api-server-1.onrender.com/prolog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        query: query.replace(/\.$/, ''), // Remove trailing dot
        file: "mineral_water.pl" 
      }),
    });

    // Debug logs
    if (!res.ok) {
      console.error("Error response:", await res.text());
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Response data:", data);

    setMessages((prev) => [
      ...prev,
      { 
        user: false, 
        text: data.result || data.error || "No response" 
      },
    ]);
  } catch (error) {
    console.error("Request failed:", error);
    setMessages((prev) => [
      ...prev,
      { 
        user: false, 
        text: `Грешка: ${error instanceof Error ? error.message : "Неизвестна грешка"}` 
      },
    ]);
  } finally {
    setIsLoading(false);
  }
}
