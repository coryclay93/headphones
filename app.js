const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
];

//Selectors to get the attention between html and js
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");


//future year,month,day,hours,mins,secs of giveaway.
let futureDate = new Date(2022,11,14,20,30,0);


//year, hours, minutes, months, date, weekday variables have a 'futureDate' object 
//that is given a '.get' method that will later help assist textContent to display giveaway date. 
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
let month = futureDate.getMonth();
month = months[month];
 
const date = futureDate.getDate();

 
const weekday = weekdays[futureDate.getDay()];


//giveaway date given a textContent that assist display the time and date of the giveaway in the <p>
giveaway.textContent =`giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}`;

//future time in milliseconds
const futureTime = futureDate.getTime();

//Function is created to subtract the giveaway time from the present time.
function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;
    //The variable 'today' was given a new date and time
    //With the new date and time it is subtracted by the futureTime of the giveaway date that is equal to the 't' variable
    
    //1s = 1000ms
    //1m = 60s
    //1hr = 60min
    //1day = 24hrs

    //amount of milliseconds in a day, hour and minute
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    //calculate the time and date using math.floor to activate integers from remaining number = (%)
    let days = t / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    //set values array;
    const values = [days,hours,minutes,seconds];

    //if the item is less than 10 when displayed on the clock then add a zero infront of the item. if greater, leave the item.
    function format(item){
        if(item < 10){
            return item = `0${item}`
        }
        return item
    }

    //For each item in the countdown clock a value is given 
    items.forEach(function (item, index) {
        //Commanding the items in the html to be given an activated value to be displayed on the clock*
        item.innerHTML = format(values[index]);
    });// If the time is less than zero (if the date and time go past the giveway date, then display"Sorry, the giveaway expired)
    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">Sorry, The giveaway expired.</h4>`
    }
}
//Displays the countdown clock in real time
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();

