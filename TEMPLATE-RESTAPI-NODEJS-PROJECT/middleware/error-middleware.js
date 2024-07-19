exports.errorMiddleware = (error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const detail = error.message;
  const data = error.data;
  const title = error.title || "INTERNAL_SERVER_ERROR";
  res.status(status).json({
    code: status,
    title: title,
    detail: detail,
    data: data,
  });
};
