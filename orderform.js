$(document).ready(function() {
    function validateNonBlank(field, errorField, fieldName) {
      if ($.trim($(field).val()) === '') {
        $(errorField).text(fieldName + ' is required.');
          } else {
        $(errorField).text('');
      }
    }

    function validateEmail(field, errorField) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test($(field).val())) {
        $(errorField).text('Enter a valid email address.');
      } else {
        $(errorField).text('');
      }
    }
  
    function validateZip(field, errorField) {
      const zipPattern = /^\d{5}$/;
      if (!zipPattern.test($(field).val())) {
        $(errorField).text('Enter a valid 5-digit zip code.');
      } else {
        $(errorField).text('');
      }
    }
  
    $('#name').blur(function() {
      validateNonBlank(this, '#nameErr', 'Name');
    });
  
    $('#email').blur(function() {
      validateNonBlank(this, '#emailErr', 'Email');
      validateEmail(this, '#emailErr');
    });
  
    $('#email2').blur(function() {
      validateNonBlank(this, '#email2Err', 'Confirm email');
      if ($(this).val() !== $('#email').val()) {
        $('#email2Err').text('Emails do not match.');
      }
    });
  
    $('#address').blur(function() {
      validateNonBlank(this, '#addressErr', 'Billing address');
    });
  
    $('#city').blur(function() {
      validateNonBlank(this, '#cityErr', 'City');
    });
  
    $('#zip').blur(function() {
      validateNonBlank(this, '#zipErr', 'Zip code');
      validateZip(this, '#zipErr');
    });
  
    $('#shipaddr').blur(function() {
      validateNonBlank(this, '#shipaddrErr', 'Shipping address');
    });
  
    $('#shipcity').blur(function() {
      validateNonBlank(this, '#shipcityErr', 'Shipping city');
    });
  
    $('#shipzip').blur(function() {
      validateNonBlank(this, '#shipzipErr', 'Shipping zip code');
      validateZip(this, '#shipzipErr');
    });
$('#copy').change(function(){
  if(this.checked){
    $('#shipaddr').val($('#address').val());
    $('#shipcity').val($('#city').val());
    $('#shipzip').val($('#zip').val());
    const billingState= $('#state').val();
    $('#shipstate').empty().append('<option value="${billingState}"selected>${billingState}</option');

    }else{
      $('#shipaddr, #shipcity, #shipzip').val('');
      $('#shipstate').empty().append(`
        <option value="TX">Texas</option>
        <option value="OK">Oklahoma</option>
        <option value="NM">New Mexico</option>
        <option value="LA">Louisiana</option>
        <option value="AR">Arkansas</option>
        <option value="CO">Colorado</option>
        <option value="CA">California</option>
        <option value="NY">New York</option>
      `);
    }
});
$('.qty').blur(function() {
  let orderTotal = 0;

  $('.qty').each(function(index) {
    let qty = parseInt($(this).val());

    if (isNaN(qty) || qty < 0) {
      qty = 0;
      $(this).val(0); 
    }
    const price = parseFloat($('#price' + (index + 1)).text());
    const total = qty * price;

    $('#total' + (index + 1)).text(total.toFixed(2));

    orderTotal += total;
  });

  $('#subt').text(orderTotal.toFixed(2));

  let tax = 0;
  const shipState = $('#shipstate').val();
  if (shipState === 'TX') {
    tax = orderTotal * 0.08;
  }
  $('#tax').text(tax.toFixed(2));

  let shipping = 0;
  if (shipState === 'TX') {
    shipping = 5.00;
  } else if (shipState === 'CA' || shipState === 'NY') {
    shipping = 20.00;
  } else {
    shipping = 10.00;
  }
  $('#ship').text(shipping.toFixed(2));

  const grandTotal = orderTotal + tax + shipping;
  $('#gTotal').text(grandTotal.toFixed(2));
});
});