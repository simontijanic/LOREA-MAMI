class AdventCalendar {
    constructor(desktopSelector, mobileSelector) {
        this.desktopGrid = document.querySelector(desktopSelector);
        this.mobileGrid = document.querySelector(mobileSelector);
        this.logo = document.querySelector(`#logo`);
        this.currentDate = new Date();
        this.currentDay = this.currentDate.getDate();
        this.quoteJSON = {}; 
        this.isMobile = isMobile; 
        this.loadQuotes().then(() => {
            this.createCalendar();
            this.createLogoClick(); 
            console.log(this.isMobile)
        });
    }

    async loadAccessibleDays() {
        try {
            const response = await fetch('/api/accessible-days');
            if (!response.ok) throw new Error('Failed to fetch accessible days.');
    
            const data = await response.json();
            this.accessibleDays = data.accessibleDays;
        } catch (error) {
            console.error('Error fetching accessible days:', error);
        }
    }
    isDayAccessible(day) {
        return this.accessibleDays.includes(day);
    }

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

    async createCalendar() {
        await this.loadAccessibleDays();
    
        for (let i = 1; i <= 24; i++) {
            if (this.isDayAccessible(i)) {
                this.isMobile ? this.createMobileLuke(i) : this.createDesktopLuke(i);
            }
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

    isDayOpened(day) {
        return localStorage.getItem(`openedDay_${day}`) !== null;
    }

    saveOpenedDay(day) {
        localStorage.setItem(`openedDay_${day}`, day);
    }

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
        gridLuke.classList.add('daily-gift'); 
        gridLuke.classList.add('bowtie');
        gridLuke.addEventListener('click', () => this.handleClick(day));
    } else if (this.isDayOpened(day)) {
        gridLuke.classList.add('opened');
        gridLuke.addEventListener('click', () => this.handleClick(day));
    } else if (day < this.currentDay) {
        gridLuke.classList.add('can_Open'); 
        gridLuke.addEventListener('click', () => this.handleClick(day));
    } else {
        // Inaccessible future days
        gridLuke.classList.add('cant_Open');
        gridLuke.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent any default behavior
           // alert('This day is not accessible yet!');
        });
    }

    if (this.desktopGrid) {
        this.desktopGrid.appendChild(gridLuke);
    }
}

    createLogoClick() {
        if (this.logo && !this.isMobile) {
            this.logo.addEventListener('click', () => {
                window.location.reload();
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
        mobileText.textContent = day;
        mobileText.className = 'mobile_luke_text';
        mobileSection.appendChild(mobileText);
    
        const infoText = document.createElement('p');
        infoText.textContent = "Swipe left or right";
        infoText.className = 'infoText';
        mobileSection.appendChild(infoText);
    
        if (day === this.currentDay) {
            mobileSection.classList.add('daily-gift'); 
            mobileSection.classList.add('bowtie_mobile');
            mobileSection.addEventListener('click', () => this.handleClick(day));
        } else if (this.isDayOpened(day)) {
            mobileSection.classList.add('opened');
            mobileSection.addEventListener('click', () => this.handleClick(day));
        } else if (day < this.currentDay) {
            mobileSection.classList.add('can_Open');
            mobileSection.addEventListener('click', () => this.handleClick(day));
        } else {
            // Inaccessible future days
            mobileSection.classList.add('cant_Open');
            mobileSection.addEventListener('click', (e) => {
                e.stopPropagation();
               // alert('This day is not accessible yet!');
            });
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


