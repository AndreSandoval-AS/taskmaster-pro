const { ZodError } = require("zod");
const ApiError = require("../utils/apiError");

function buildValidationMessage(error) {
  const firstIssue = error.issues?.[0];
  return firstIssue?.message || "Validation failed";
}

function errorMiddleware(error, req, res, next) {
  if (error instanceof SyntaxError && error.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON request body",
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: buildValidationMessage(error),
    });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // eslint-disable-next-line no-console
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

module.exports = errorMiddleware;
