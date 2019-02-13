# Incepto - Inline Try - Catch Clause for Async Functions

[![NPM](https://nodei.co/npm/incepto.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/incepto/)

[![CircleCI](https://circleci.com/gh/alex-ppg/incepto.svg?style=svg)](https://circleci.com/gh/alex-ppg/incepto)

## Installation

```bash
npm i incepto -s
```

## Usage

```javascript
const incepto = require("incepto");

// Latin Usage
async function myFunc() {
  const result = await incepto(throwableAsyncFunction()).capturam(
    "Function Failed"
  );
  return result;
}
// English Usage
async function myFunc() {
  const result = await incepto(throwableAsyncFunction()).catch(
    "Function Failed"
  );
  return result;
}
// If function throws, below line will throw an Error object with the "Function Failed" argument in construction
const result = await myFunc();

/**
 * We can override the error handler and provide alternative behaviour.
 * The error handler takes two arguments as input, the actual error in
 * the first element and the custom message or object passed to "catch"
 * in the second element.
 */
// Latin Usage
incepto.tracto = (e, message) => message;
// English Usage
incepto.errorHandler = (e, message) => message;

/**
 * For instance, asynchronous servers can benefit from this package
 * such as fastify by creating a custom error handler and creating
 * a custom Error object in the error handler.
 */
// Custom Error Class
class HTTPException extends Error {
  constructor(code, message) {
    super(message);
    this.status = code;
    this.error = message;
  }
}
// Declare Verbose Error Code Packs
const NOT_FOUND = [404, "Not Found"];
// Set the Error Handler to throw an HTTPException and deconstruct the Error Code Pack
incepto.errorHandler = (e, ERROR) => throw new HTTPException(...ERROR);
// Override default error handler by extracting the status and error of the HTTPException and if it does not exist, assign default values
fastify.setErrorHandler(
  ({ status = 500, error = "Internal Server Error" }, req, reply) => {
    reply.status(status).send({ error });
  }
);
// Use incepto with asynchronous functions that might throw
fastify.get("/", async (req, res) => {
  const result = await incepto(throwableAsyncFunction()).catch(NOT_FOUND);
});
/**
 * Another use case for the library, apart from cleaner code,
 * is its usage within libraries to return an err variable
 * wherever the code throws.
 */
incepto.errorHandler = (e, ERROR) => {
  return { err: { message: ERROR, info: e } };
};
async function myAPI() {
  const result = await incepto(throwableAsyncFunction()).catch("Failed");
  return { data: result.data };
}
const { err, data } = await myAPI();
if (err !== undefined) {
  console.log(err.message);
  console.error(err.info);
}
// Continue Execution
```

## Description

This plugin introduces an inline try-catch approach. While the name `try` would be more preferable, it is a reserved keyword and `attempt` was taken on `npm` so I chose to name it `incepto` after the latin translation of "attempt".

It takes a `Promise` as input (`async` functions by default return a `Promise` when invoked) and, after calling `catch`, `capture` or `capturam` ("catch" in latin) with what you wish to pass to the error handler or throw via the default behavior, it attempts to resolve the `Promise` and on failure executes its error handler.

The default behaviour is to `throw` with what was passed in `catch` etc. as in the following line:

```
throw new Error(catchInput);
```

## Options

You can override the default `throw` behaviour by overriding the `errorHandler` or `tracto` ("handler" in, you guessed it, latin) variable of the function object. With it, you can choose to return a value, throw a specific type of error or whichever you basically wish.

## Author

[Alex Papageorgiou](alex.ppg@pm.me)

## License

Licensed under [GPLv3](./LICENSE).
