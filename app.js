$(document).ready(AppLoaded)


function AppLoaded() {
    //submit input form on enter
    $("#weightInput").keypress(function(event) {
        if (event.keyCode == 13) {
            $("#calcBtn").click();
        }
    });

    apply_event_handlers();
}

let shipping_time = 5;
let shipping_cost = 0;
let arrival_date = '';
let weightG = 0;

/********************
 * will add event handlers to all of the appropriate elements
 *@params: none
 *@return: none
 ********************/
function apply_event_handlers() {
    calculateButton(); //trigger calculations
}

/********************
 * function that triggers when calculate button is pressed
 *@params: none
 *@return: none
 ********************/
function calculateButton() {
    $("#calcBtn").click(function () {
        let inputValidation = $("#weightInput").val()
        if (inputValidation == '') {
            $('.btnValidation').addClass('red');
            return false;
        } else {
            $('btn-validation').val('');
            calculate_shipping(inputValidation, shipping_time)
            $("#weightInput").val('');
            $('.btnValidation').removeClass('red');
            calculateData()
            $('.icon-img').addClass('bounce');
            setTimeout(function () {
                $('.icon-img').removeClass('bounce');
            }, 1000);
        }
    });
}

/********************
 * checks the incoming values. If anything other than a number or period is pressed, it returns false.
 *@params: event {object} the object that holds the details of the event
 *@return: true if the key pressed is a number or the period key, false if it is not
 ********************/

function validate_keydown(evt, obj) {
    let charCode = (evt.which) ? evt.which : event.keyCode
    let value = obj.value;
    let dotcontains = value.indexOf(".") != -1;
    if (dotcontains)
        if (charCode == 46) return false;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

/********************
* update the stored value for the shipping based on the clicked radio button.
*@global: shipping_time
@params: none
*@return: none
********************/
function change_shipping_type(time) {
    shipping_time = time;

    let currentDate = new Date();
    let numberOfDaysToAdd = time;
    currentDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

    let dd = currentDate.getDate();
    let mm = currentDate.getMonth() + 1;
    let y = currentDate.getFullYear();

    arrival_date = dd + '/' + mm + '/' + y;
}

/********************
 * process the shipping time and weight, and return an object with the shipping time and weight
 *@params: weight, shipping_time
 *@return: an object with the following properties and values: weight and cost.
 ********************/
function calculate_shipping(weight, shipping_time) {
    weightG = weight * 1000;

    if (weightG <= 1200) {
        shipping_cost = 20;
    } else if (weightG > 1200 && weightG <= 1600) {
        shipping_cost = 25;
    } else if (weightG > 1600 && weightG <= 2200) {
        shipping_cost = 30;    
    } else if (weightG >= 3800) {
        shipping_cost = 35;
    }

    if (shipping_time === 5) {
        shipping_cost = shipping_cost * 1;
    } else if (shipping_time === 3) {
        shipping_cost = shipping_cost * 1.5;
    } else if (shipping_time === 2) {
        shipping_cost = shipping_cost * 2;
    }
    change_shipping_type(shipping_time);
}

/********************
 * Populate Data on the DOM
 *@params: none
 *@return: an object with the following properties and values: arrival_date, weight and cost.
 ********************/
function calculateData() {
    $('#totalG').text(weightG);
    $('#totalKgs').text(weightG / 1000);
    $('#eta').text(arrival_date);
    $('#TotalCost').text("€" + shipping_cost.toFixed(2));
}