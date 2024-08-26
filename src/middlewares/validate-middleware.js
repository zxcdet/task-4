import status from 'http-status';

export function validateMiddleware(schema, type = 'body') {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[type]);
      next();
    } catch (err) {
      res.status(status.BAD_REQUEST).json({ error: err.details[0].message });
    }
  };
}
