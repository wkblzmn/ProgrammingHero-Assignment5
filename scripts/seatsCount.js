// Get all checkboxes with the class 'seat-checkbox'
var checkboxes = document.querySelectorAll('.seat-checkbox');

// Get the element to display the total number of selected seats
var totalSeatsElement = document.getElementById('totalSeats');

// Get the element to display the remaining seats
var remainingSeatsElement = document.getElementById('remainingSeats');

// Get the element to display the selected seats
var selectedSeatsElement = document.getElementById('selectedSeats');

// Get the element to display the total cost
var totalCostElement = document.getElementById('totalCost');

// Get the element for the coupon code input
var couponCodeInput = document.getElementById('couponCode');

// Get the element for the full name input
var fullNameInput = document.getElementById('fullName');

// Get the element for the phone number input
var phoneNumberInput = document.getElementById('phoneNumber');

// Get the modal element
var modal = document.getElementById('my_modal_1');

// Initialize the total number of selected seats and cost per seat
var totalSelectedSeats = 0;
var costPerSeat = 550;
var discountPercentage = 0; // Default discount

// Add event listeners to each checkbox
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    // If the checkbox is checked, increment the total; otherwise, decrement
    if (checkbox.checked) {
      totalSelectedSeats++;
    } else {
      totalSelectedSeats--;
    }

    // Update the total seats element
    totalSeatsElement.textContent = totalSelectedSeats;

    // Update the remaining seats element
    var remainingSeats = 8 - totalSelectedSeats;
    remainingSeatsElement.innerText = remainingSeats + " seat" + (remainingSeats !== 1 ? "s" : "") + " left";

    // Update the selected seats element
    selectedSeatsElement.innerText = getSelectedSeats();

    // Calculate the total cost and update the total cost element
    var totalCost = calculateTotalCost(totalSelectedSeats, costPerSeat, discountPercentage);
    totalCostElement.innerText = totalCost;
  });
});

// Function to get the list of selected seats
function getSelectedSeats() {
  var selectedSeats = [];
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedSeats.push(checkbox.getAttribute('aria-label'));
    }
  });
  return selectedSeats.join(', ');
}

// Function to calculate total cost with discount
function calculateTotalCost(selectedSeats, costPerSeat, discountPercentage) {
  var totalCost = selectedSeats * costPerSeat;
  var discountAmount = (totalCost * discountPercentage) / 100;
  return totalCost - discountAmount;
}

// Function to apply coupon code
function applyCoupon() {
  var couponCode = couponCodeInput.value.toUpperCase();
  switch (couponCode) {
    case 'NEW15':
      discountPercentage = 15;
      break;
    case 'COUPLE20':
      discountPercentage = 20;
      break;
    default:
      discountPercentage = 0;
  }

  // Recalculate total cost with the applied discount
  var totalCost = calculateTotalCost(totalSelectedSeats, costPerSeat, discountPercentage);
  totalCostElement.innerText =totalCost;
}

// Function to show the modal with validation
function showModalWithValidation() {
  if (totalSelectedSeats > 0 && phoneNumberInput.value.trim().length > 0) {
    modal.showModal();
  } else {
    alert('Please select at least one seat and enter a valid phone number.');
  }
}

// Add an event listener to the "Next" button
var nextButton = document.getElementById('nextButton');
nextButton.addEventListener('click', showModalWithValidation);
