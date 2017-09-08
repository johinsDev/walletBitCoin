export default function (req, res, next) {
  if (req.headers['content-type'] === 'application/json'){
    res.setHeader('content-type', 'application/json'); 
  }
  next()
};