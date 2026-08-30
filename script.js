/* =========================================
   WANDERLUX TRAVEL AGENCY
   JavaScript
   ========================================= */


/* ---------- Scroll Reveal Animation ---------- */

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

    revealElements.forEach((element) => {

        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight - 100;

        if (elementPosition < screenPosition) {
            element.classList.add("show");
        }

    });

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


/* ---------- Hero Destination Rotation ---------- */

const heroDestinations = [
    {
        title: "Discover Your<br><span>Next Adventure</span>",
        text: "Let WanderLux turn your travel dreams into unforgettable experiences with personalised holiday planning and carefully designed travel packages."
    },
    {
        title: "Escape to<br><span>Beautiful Bali</span>",
        text: "Experience tropical beaches, rich culture and unforgettable island adventures with WanderLux."
    },
    {
        title: "Explore<br><span>Wonderful Europe</span>",
        text: "Discover iconic cities, historic landmarks, delicious food and unforgettable European experiences."
    },
    {
        title: "Relax in<br><span>Maldives Luxury</span>",
        text: "Enjoy peaceful beaches, crystal-clear waters and premium holiday experiences in a tropical paradise."
    }
];

let currentDestination = 0;

const heroTitle = document.querySelector(".hero h1");
const heroText = document.querySelector(".hero-content > p:not(.hero-small-text)");

function rotateHero() {

    if (!heroTitle || !heroText) {
        return;
    }

    currentDestination++;

    if (currentDestination >= heroDestinations.length) {
        currentDestination = 0;
    }

    heroTitle.style.opacity = "0";
    heroText.style.opacity = "0";

    setTimeout(() => {

        heroTitle.innerHTML = heroDestinations[currentDestination].title;

        heroText.textContent =
            heroDestinations[currentDestination].text;

        heroTitle.style.opacity = "1";
        heroText.style.opacity = "1";

    }, 400);
}

setInterval(rotateHero, 5000);


/* ---------- Form Validation ---------- */

function validateRequiredFields(form) {

    const fields = form.querySelectorAll("[required]");
    let valid = true;

    fields.forEach((field) => {

        if (!field.value.trim()) {

            field.style.borderColor = "#c79a45";
            valid = false;

        } else {

            field.style.borderColor = "";

        }

    });

    if (!valid) {
        alert("Please complete all required fields.");
    }

    return valid;
}

// ==========================================
// WANDERLUX TRIP COST CALCULATOR
// ==========================================

const tripCalculator = document.getElementById("tripCalculator");

if (tripCalculator) {

    tripCalculator.addEventListener("submit", function (event) {

        event.preventDefault();

        const destination =
            document.getElementById("destination").value;

        const travellers =
            Number(document.getElementById("travellers").value);

        const days =
            Number(document.getElementById("days").value);

        const travelStyle =
            document.getElementById("travelStyle").value;

        const result =
            document.getElementById("calculatorResult");


        // Basic validation
        if (!destination || !travellers || !days || !travelStyle) {

            result.innerHTML = `
                <div class="result-icon">⚠️</div>
                <h3>Please Complete the Form</h3>
                <p>
                    Please select your destination, number of travellers,
                    number of days and travel style.
                </p>
            `;

            return;
        }


        if (travellers < 1 || days < 1) {

            result.innerHTML = `
                <div class="result-icon">⚠️</div>
                <h3>Invalid Information</h3>
                <p>
                    Number of travellers and days must be at least 1.
                </p>
            `;

            return;
        }


        // Base daily costs for each destination
        const destinationRates = {

            Bali: 220,

            Maldives: 380,

            Paris: 350,

            Sydney: 250,

            Dubai: 300,

            Switzerland: 400

        };


        // Travel style multipliers
        const styleMultipliers = {

            budget: 0.8,

            standard: 1,

            luxury: 1.5

        };


        const baseRate =
            destinationRates[destination];

        const multiplier =
            styleMultipliers[travelStyle];


        // Calculate estimated cost
        const estimatedCost =
            baseRate *
            travellers *
            days *
            multiplier;


        // Format price
        const formattedCost =
            estimatedCost.toLocaleString("en-AU", {
                style: "currency",
                currency: "AUD",
                maximumFractionDigits: 0
            });


        // Display travel style
        const styleName =
            travelStyle.charAt(0).toUpperCase() +
            travelStyle.slice(1);


        // Display result
        result.innerHTML = `

            <div class="result-icon">✈️</div>

            <p class="result-label">
                ESTIMATED TRAVEL COST
            </p>

            <h3>${formattedCost}</h3>

            <p>
                Estimated cost for
                <strong>${travellers}</strong>
                traveller${travellers > 1 ? "s" : ""}
                to
                <strong>${destination}</strong>
                for
                <strong>${days}</strong>
                day${days > 1 ? "s" : ""}.
            </p>

            <div class="result-package">

                ${styleName} Travel Package

            </div>

            <small>
                This is an estimated price only.
                Final costs may vary depending on flights,
                accommodation, seasonal prices and selected services.
            </small>

        `;

    });

}


// ==========================================
// WANDERLUX CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!validateRequiredFields(contactForm)) {
            return;
        }

        const contactMessage =
            document.getElementById("contactMessage");

        contactMessage.innerHTML = `
            <h3>Message Sent Successfully!</h3>
            <p>
                Thank you for contacting WanderLux.
                Our travel team will get back to you soon.
            </p>
        `;

        contactMessage.classList.add("show");

        contactForm.reset();

    });

}


// ==========================================
// WANDERLUX APPOINTMENT FORM
// ==========================================

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {

    appointmentForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!validateRequiredFields(appointmentForm)) {
            return;
        }

        const preferredDate =
            document.getElementById("preferredDate").value;

        const selectedDate = new Date(preferredDate);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {

            alert("Please select a future appointment date.");

            return;
        }

        alert(
            "Appointment request submitted successfully! " +
            "A WanderLux travel consultant will contact you soon."
        );

        appointmentForm.reset();

    });

}