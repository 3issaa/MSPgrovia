export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) {
  void next;
  console.error(error);
  const status = error.name === "ValidationError" ? 400 : error.status || 500;
  res.status(status).json({ message: status === 500 ? "Server error." : error.message });
}
