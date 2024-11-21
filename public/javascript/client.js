class AdventCalendar {
    constructor(desktopSelector, mobileSelector) {
        this.desktopGrid = document.querySelector(desktopSelector);
        this.mobileGrid = document.querySelector(mobileSelector);
        this.logo = document.querySelector(`#logo`);
        this.currentDate = new Date();
        this.currentDay = this.currentDate.getDate();
        this.quoteJSON = {}; // Use an object instead of an array for quotes
        this.isMobile = isMobile;  // Use the passed `isMobile` value
        this.loadQuotes().then(() => {
            this.createCalendar();
            this.createLogoClick(); 
            console.log(this.isMobile)
        });
    }

    // Load quotes from the JSON file asynchronously
    async loadQuotes() {
        try {
            const response = await fetch('qoute.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch quotes: ${response.status}`);
            }
            this.quoteJSON = await response.json();
        } catch (error) {
            console.error('Error loading quotes:', error);
        }
    }

    assignQuote(day) {
        const dayString = String(day); 
        if (this.quoteJSON.hasOwnProperty(dayString)) {
            return this.quoteJSON[dayString];
        } else {
            return 'Ingen sitat tilgjengelig.';
        }
    }

    createCalendar() {
        for (let i = 1; i <= 24; i++) {
            if(this.isMobile){
                this.createMobileLuke(i);
            } else {
                this.createDesktopLuke(i);
            }
        }
    }

    // Function to check if a day has been opened
    isDayOpened(day) {
        return localStorage.getItem(`openedDay_${day}`) !== null;
    }

    // Function to save the opened day to localStorage
    saveOpenedDay(day) {
        localStorage.setItem(`openedDay_${day}`, day);
    }

    // Create a calendar day for the desktop view
    createDesktopLuke(day) {
        const gridLuke = document.createElement('div');
        gridLuke.className = 'grid_luke';
        gridLuke.id = day;

        const lukeText = document.createElement('p');
        lukeText.textContent = day;
        lukeText.className = 'luke_tekst';
        lukeText.id = day;

        gridLuke.appendChild(lukeText);

        if (day === this.currentDay) {
            gridLuke.classList.add('daily-gift'); // Mark the current day with 'daily-gift' class
            gridLuke.classList.add('bowtie');

            gridLuke.addEventListener('click', () => this.handleClick(day)); // Allow click for today


        } else if (this.isDayOpened(day)) {
            gridLuke.classList.add('opened'); // Day has been opened, add 'opened' class
            gridLuke.addEventListener('click', () => this.handleClick(day)); // Allow click for opened days
        } else if (day < this.currentDay) {
            gridLuke.classList.add('can_Open'); // Past days are clickable and can be opened
            gridLuke.addEventListener('click', () => this.handleClick(day));
        } else {
            gridLuke.classList.add('cant_Open'); // Future days cannot be opened
        }


        if (this.desktopGrid) {
            this.desktopGrid.appendChild(gridLuke);
        }
    }

    createLogoClick() {
        if (this.logo && !this.isMobile) {
            this.logo.addEventListener('click', () => {
                window.location.reload();  // Refresh the current page
                console.log('works');
            });
        } else {
             console.log('Logo element not found');
        }
    }
    
    // Create a calendar day for the mobile view
    createMobileLuke(day) {
        const mobileSection = document.createElement('section');
        mobileSection.className = 'mobile_section';
        mobileSection.id = `mobile_luke_${day}`;

        const quote = this.assignQuote(day);
        const quoteText = document.createElement('p');
        quoteText.textContent = quote;
        quoteText.className = 'quoteText';
        mobileSection.appendChild(quoteText);

        const mobileText = document.createElement('p');
        mobileText.textContent = day; // `Luke ${day}`
        mobileText.className = 'mobile_luke_text';
        mobileSection.appendChild(mobileText);

        const infoText = document.createElement('p');
        infoText.textContent = "Swipe left or right"; // `Luke ${day}`
        infoText.className = 'infoText';
        mobileSection.appendChild(infoText);

        // Check if day has been opened
        if (day === this.currentDay) {
            mobileSection.classList.add('daily-gift'); // Mark the current day with 'daily-gift' class
            mobileSection.classList.add('bowtie_mobile');

            mobileSection.addEventListener('click', () => this.handleClick(day)); // Allow click for today
        } else if (this.isDayOpened(day)) {
            mobileSection.classList.add('opened'); // Day has been opened, add 'opened' class
            mobileSection.addEventListener('click', () => this.handleClick(day)); // Allow click for opened days
        } else if (day < this.currentDay) {
            mobileSection.classList.add('can_Open'); // Past days are clickable and can be opened
            mobileSection.addEventListener('click', () => this.handleClick(day)); // Allow click for past days
        } else {
            mobileSection.classList.add('cant_Open'); // Future days cannot be opened
        }
        

        if (this.mobileGrid) {
            this.mobileGrid.appendChild(mobileSection);
        }
    }

    // Handle click event to open a day
    handleClick(day) {
        // Save the day as opened when clicked
        this.saveOpenedDay(day);

        // Redirect to the specific day
        const href = `/luker/${day}`;
        window.location.href = href;
    }



    
}

// Wait for the DOM to be loaded before initializing the calendar
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.isMobile
    new AdventCalendar('.grid_container', '.mobile_grid_container', isMobile);
});


