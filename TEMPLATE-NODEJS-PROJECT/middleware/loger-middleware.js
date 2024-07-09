exports.loggerMiddleware = (req, res, next) => {
    console.log("Headers:", req.headers);
    console.log("Query:", req.query);
    console.log("Body:", req.body);
    console.log("Params:", req.params);
    next();
}