export default async function handler(req, res) {
  try {
    // Get the path after /api/
    const { path } = req.query;
    const targetPath = Array.isArray(path) ? path.join("/") : path || "";

    // Construct the target URL
    const targetUrl = `http://74.225.190.5:8000/${targetPath}`;

    console.log("Proxy request:", {
      originalPath: req.url,
      queryPath: path,
      targetPath,
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
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to proxy request" });
  }
}
