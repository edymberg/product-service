class InsufficientProductArgsException extends Error {
  constructor(values) {
    super(`Insufficient product arguments: ${values}`);
  }
}

module.exports = InsufficientProductArgsException;
