// Listening for submit
document.querySelector("#loan-form").addEventListener("submit", function(e){
   
   // Hide Results
   document.querySelector('#results').style.display = 'none';

   // Show Loader
   document.querySelector('#loading').style.display = 'block';

   setTimeout(calculateLoan, 2000);
   
    e.preventDefault();
});



// Loan Calculation
function calculateLoan(){
    // UI Variables

    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalInterest = document.querySelector("#total-interest");
    const totalPayment = document.querySelector("#total-payment");


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;
  
    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
  
    if(isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2);
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);


      // Clear Input Fields
      amount.value = '';
      interest.value = '';
      years.value = '';

      
      // Show Results
   document.querySelector('#results').style.display = 'block';
   
      // hide Loader
      document.querySelector('#loading').style.display = 'none';
    } else {
      showError('Please check your numbers');
    }

    
}

// Show Error
function showError(error){
    // Hide Results
    document.querySelector('#results').style.display = 'none';
 
    // Hide Loader
    document.querySelector('#loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Add Class
    errorDiv.className = 'alert alert-danger';

    // Create Text Node
    const textNode = document.createTextNode(error);

    // Append the textNode to Div
    errorDiv.appendChild(textNode);
    
    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Insert error before heading
    card.insertBefore(errorDiv, heading);

    // cLear error
    setTimeout(clearError, 2000);

}

// Clear the error after 2 seconds
    function clearError(){
        document.querySelector('.alert').remove();
    }