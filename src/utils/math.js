export function evaluateExpression(str) {
    const safe = /^[0-9+\-*/().\s]+$/;
  
    if (!safe.test(str)) return NaN;
  
    try {
      // Safe evaluation using Function constructor
      const result = Function(`"use strict"; return (${str})`)();
      return isNaN(result) ? NaN : result;
    } catch {
      return NaN;
    }
  }
  