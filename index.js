"use strict";

function incepto(promissum) {
  const capturam = async erratum => {
    try {
      return await promissum;
    } catch (e) {
      if (incepto.tracto || (incepto.tracto = incepto.errorHandler)) {
        return incepto.tracto(e, erratum);
      } else {
        throw new Error(erratum);
      }
    }
  };
  return {
    capturam,
    capture: capturam,
    catch: capturam
  };
}

module.exports = incepto;
