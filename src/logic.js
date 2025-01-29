// Account Details Object
let account_Details = {};
let selectedSeats = [];
let selected_movie = null;
let selectedTime = null;
let date = null;
let myseat=document.querySelector('.myseat')

let dateee=document.querySelector('.dateee')
let venue=document.querySelector('.venue')
// Movie Selection
let finalTicket = document.querySelector('.imgg');

// Movie Selection
document.querySelectorAll('.cardWrapper').forEach((element, idx, arr) => {
    element.addEventListener('click', () => {
        arr.forEach((el, i) => el.classList.toggle('active', i === idx));
        selected_movie = element.classList.contains('active') ? idx : null;

        // Update final ticket image dynamically
        if (selected_movie !== null) {
            if (selected_movie === 0) {
                finalTicket.innerHTML = `<img src="./public/Imgs/joker2.jpg" alt="Joker">`;
            } else {
                finalTicket.innerHTML = `<img src="./public/Imgs/venom.jpg" alt="Venom">`;
            }
        } else {
            finalTicket.innerHTML = ""; // Clear the ticket if no movie is selected
        }

        console.log("Selected Movie:", selected_movie);
    });
});


// Seat Creation
function createSeats(rows, columns) {
    const movie_hall = document.querySelector('.movie_hall');
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const seatName = `R${row}C${col}`;
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.textContent = seatName;
            seat.dataset.seatName = seatName;

            seat.addEventListener('click', () => {
                seat.classList.toggle('selected');
                if (seat.classList.contains('selected')) {
                    selectedSeats.push(seatName);
                    alert(`Seat ${seatName} selected!`);
                } else {
                    selectedSeats = selectedSeats.filter(seat => seat !== seatName);
                    alert(`Seat ${seatName} deselected!`);
                }
                console.log("Selected Seats:", selectedSeats);
                myseat.innerHTML=`Selected Seat Is ${selectedSeats}`
                document.querySelector('.selectedSeats').textContent = `Your Selected Seats: ${selectedSeats.join(', ')}`;
            });

            movie_hall.appendChild(seat);

        }
    }
}
createSeats(4, 3);


let user=document.querySelector('.userdetail')


// User Details Submission
document.querySelector('#submit').addEventListener('click', () => {
    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const contact = document.querySelector('#contact').value;

    if (email && name && contact) {
        account_Details.email = email;
        account_Details.name = name;
        account_Details.contact = contact;

        // Alert for successful form submission
        alert(`Form Submitted Successfully!\n
Name: ${name}\n
Email: ${email}\n
Contact: ${contact}`);
        console.log("User Details:", account_Details);

            user.innerHTML=`<span>Name: </span> ${account_Details.name} <br>
                             <span>Email: </span>${account_Details.email}<br> 
                             <span>Contact No.: </span>${account_Details.contact}<br> `
    } else {
 
        alert("Please fill all the fields: Name, Email, and Contact!");
    }
});


// Date and Time Selection
document.querySelectorAll('.Time').forEach((element, idx, arr) => {
    element.addEventListener('click', () => {
        arr.forEach((el, i) => el.classList.toggle('active', i === idx));
        selectedTime = element.classList.contains('active') ? element.innerText : null;
        if (selectedTime) {
            alert(`Time ${selectedTime} selected!`);
        } else {
            alert("No time selected!");
        }
        console.log("Selected Time:", selectedTime);
    });
});

document.querySelector('#submit_date').addEventListener('click', () => {
    date = document.querySelector('#date_input').value;

    if (date && selectedTime) {
        account_Details.date = date;
        account_Details.selectedTime = selectedTime;

      
        alert(`Date and Time Submitted Successfully!\n
Date: ${date}\n
Time: ${selectedTime}`);

dateee.innerHTML+= account_Details.date;
venue.innerHTML= `<span>Vishal Mall, Rajouri Garden</span><br>
                    ${account_Details.selectedTime} `
        console.log("Account Details:", account_Details);
    } else {
        
        alert("Please select both Date and Time before submitting!");
    }
});

document.querySelector('#seatsSubmit').addEventListener('click', () => {
    if (selectedSeats.length > 0) {
        account_Details.seats = selectedSeats;

       
        alert(`Seats Submitted Successfully!\n
Selected Seats: ${selectedSeats.join(', ')}`);
        console.log("Final Account Details:", account_Details);
    } else {

        alert("Please select at least one seat before submitting!");
    }
});



//finalTicket
