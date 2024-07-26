export function calculateTax(income, age, dependents) {

    if (typeof income !== 'number' || income < 0) return "Invalid income";
    if (typeof age !== 'number' || age < 0) return "Invalid age";
    if (typeof dependents !== 'number' || dependents < 0) return "Invalid dependents"; 
    if (age < 18) return "Not eligible for tax";

    let tax = 0;
    if (income <= 10000) {
      tax = income * 0.10;
    } else if (income <= 50000) {
      tax = income * 0.20;
    } else {
      tax = income * 0.30;
    }
  
    if (age >= 65) {
      tax *= 0.80; 
    }
  
    tax -= dependents * 500;
  
    if (tax < 0) tax = 0;
  
    return tax;
  }
  