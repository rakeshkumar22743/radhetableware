export default async function handler(req, res) {
  try {
    // For the root /api/ path, proxy to the backend root
    const targetUrl = "http://74.225.190.5:8000/";

    console.log("Root API proxy request:", {
      originalPath: req.url,
      targetUrl,
      method: req.method,
    });

    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
        // Forward other relevant headers
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        }),
      },
      ...(req.method !== "GET" &&
        req.method !== "HEAD" && { body: JSON.stringify(req.body) }),
    });

    // Get the response data
    const data = await response.text();

    // Return the response with the same status code
    res.status(response.status);

    // Try to parse as JSON, if it fails, return as text
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch {
      res.send(data);
    }
  } catch (error) {
    console.error("Root API proxy error:", error);
    res.status(500).json({ error: "Failed to proxy request" });
  }
}
