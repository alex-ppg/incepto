"use strict";

const tap = require("tap");
const incepto = require("./index");

// Custom error handler declaration
const errorHandler = (err, message) => {
  return message;
};

tap.test("fastify sentry error handler exist", async test => {
  test.plan(6);

  // Successful Resolution
  test.strictEqual(
    await incepto(
      new Promise((resolve, reject) => setTimeout(() => resolve("success")))
    ).capturam("failure"),
    "success"
  );

  // Default Failure Resolution
  try {
    await incepto(
      new Promise((resolve, reject) => setTimeout(() => reject("success")))
    ).capturam("failure");
  } catch (e) {
    test.strictEqual(e.message, "failure");
  }

  // Overriden Failure Resolution
  incepto.errorHandler = errorHandler;
  test.strictEqual(
    await incepto(
      new Promise((resolve, reject) =>
        setTimeout(() => reject("inner-failure"))
      )
    ).capturam("failure"),
    "failure"
  );
  // Alias
  test.strictEqual(
    await incepto(
      new Promise((resolve, reject) =>
        setTimeout(() => reject("inner-failure"))
      )
    ).capture("failure"),
    "failure"
  );
  // Alias
  test.strictEqual(
    await incepto(
      new Promise((resolve, reject) =>
        setTimeout(() => reject("inner-failure"))
      )
    ).catch("failure"),
    "failure"
  );

  // Error Handler Alias
  incepto.tracto = (e, err) => e;
  test.strictEqual(
    await incepto(
      new Promise((resolve, reject) =>
        setTimeout(() => reject("inner-failure"))
      )
    ).catch("failure"),
    "inner-failure"
  );

  test.end();
});
