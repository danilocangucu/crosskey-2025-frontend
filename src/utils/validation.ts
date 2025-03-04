export interface ValidationErrors {
    [field: string]: string;
}
  
export interface ProspectFormData {
    customerName: string;
    totalLoan: string;
    interest: string;
    years: string;
}
  
export const validateProspectForm = (formData: ProspectFormData): ValidationErrors => {
    const errors: ValidationErrors = {};
  
    if (!formData.customerName.trim()) {
      errors.customerName = 'Customer name cannot be empty';
    }
  
    const totalLoanValue = parseFloat(formData.totalLoan);
    if (isNaN(totalLoanValue) || totalLoanValue <= 0) {
      errors.totalLoan = 'Total loan must be a positive number';
    }
  
    const interestValue = parseFloat(formData.interest);
    if (isNaN(interestValue) || interestValue <= 0) {
      errors.interest = 'Interest must be a positive number';
    }
  
    const yearsValue = parseInt(formData.years, 10);
    if (isNaN(yearsValue) || yearsValue <= 0) {
      errors.years = 'Years must be a positive integer';
    }
  
    return errors;
};
