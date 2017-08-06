"use strict";
/**
 * `UserNotFoundError` error.
 *
 * @api public
 */
 
function UserNotFoundError(message, code, uri, status) {
  Error.call(this);
  this.message = message;
  this.code = code || 'server_error';
  this.uri = uri;
  this.status = status || 500;
}

/**
 * Inherit from `Error`.
 */
UserNotFoundError.prototype.__proto__ = Error.prototype;

/**
 * `WrongPassword` error.
 *
 * @api public
 */
 
function WrongPassword(message, code, uri, status) {
  Error.call(this);
  this.message = message;
  this.code = code || 'server_error';
  this.uri = uri;
  this.status = status || 500;
}

/**
 * Inherit from `Error`.
 */
WrongPassword.prototype.__proto__ = Error.prototype;


/**
 * `Email` error.
 *
 * @api public
 */
 
function EmailError(message, code, uri, status) {
  Error.call(this);
  this.message = message;
  this.code = code || 'server_error';
  this.uri = uri;
  this.status = status || 500;
}

/**
 * Inherit from `Error`.
 */
EmailError.prototype.__proto__ = Error.prototype;

/**
 * `Token Expired` error.
 *
 * @api public
 */
 
function ExpiredToken(message, code, uri, status) {
  Error.call(this);
  this.message = message || 'The token has expired.Use the refresh token';
  this.code = code || '401 unauthorized';
  this.uri = uri;
  this.status = status || 401;
}

/**
 * Inherit from `Error`.
 */
EmailError.prototype.__proto__ = Error.prototype;


/**
 * `Not Token` error.
 *
 * @api public
 */
 
function NotToken(message, code, uri, status) {
  Error.call(this);
  this.message = message || 'Not Token Found';
  this.code = code || '401 unauthorized';
  this.uri = uri;
  this.status = status || 401;
}

/**
 * Inherit from `Error`.
 */
EmailError.prototype.__proto__ = Error.prototype;

function BadRequestError(message) {
  Error.call(this);
  this.code = 'Validation error';
  this.name = 'BadRequestError';
  this.data = message;
  this.status = 400;
}

/**
 * Inherit from `Error`.
 */
BadRequestError.prototype.__proto__ = Error.prototype;

/**
 * Expose Errors.
 */
module.exports = {
    EmailError,
    UserNotFoundError,
    WrongPassword,
    ExpiredToken,
    NotToken,
    BadRequestError
 };