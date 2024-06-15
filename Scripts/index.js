// Function to save events to localStorage
function saveEventsToLocalStorage(events) {
    localStorage.setItem('events', JSON.stringify(events));
}

// Function to load events from localStorage
function loadEventsFromLocalStorage() {
    const eventsString = localStorage.getItem('events');
    return JSON.parse(eventsString) || []; // Return empty array if no events found
}

// Function to display events from localStorage
function displayEventsFromLocalStorage() {
    const events = loadEventsFromLocalStorage();
    const scheduleList = document.getElementById('scheduleList');

    // Clear existing events to prevent duplication
    scheduleList.innerHTML = '';

    // Loop through stored events and create HTML elements
    events.forEach(function(event) {
        const eventBox = document.createElement('div');
        eventBox.classList.add('event-box');

        const eventInfo = document.createElement('div');
        eventInfo.innerHTML = `<h3>${event.title}</h3><p>${event.date} ${event.time}</p>`;

        if (event.note) {
            const eventNote = document.createElement('p');
            eventNote.textContent = `Note: ${event.note}`;
            eventInfo.appendChild(eventNote);
        }

        if (event.reminder) {
            const eventReminder = document.createElement('p');
            eventReminder.textContent = `Reminder: ${event.reminder} minutes before`;
            eventInfo.appendChild(eventReminder);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = function() {
            // Apply slide-up animation class
            eventBox.classList.add('deleting');
            
            // Create poof animation element
            var poof = document.createElement('div');
            poof.classList.add('poof');
            eventBox.appendChild(poof);
            
            // Remove the event box after animation completes
            setTimeout(function() {
                const index = events.indexOf(event);
                if (index > -1) {
                    events.splice(index, 1);
                    saveEventsToLocalStorage(events);
                    displayEventsFromLocalStorage();
                }
            }, 500); // Adjust timing to match animation duration
        };

        eventBox.appendChild(eventInfo);
        eventBox.appendChild(deleteButton);
        scheduleList.appendChild(eventBox);
    });
}

// Event listener for form submission
document.getElementById('addEventForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const note = document.getElementById('eventNote').value;
    const reminder = document.getElementById('eventReminder').value;

    // Create new event object
    const newEvent = {
        title: title,
        date: date,
        time: time,
        note: note,
        reminder: reminder
    };

    // Load existing events from localStorage
    const events = loadEventsFromLocalStorage();

    // Add new event to the events array
    events.push(newEvent);

    // Save updated events array back to localStorage
    saveEventsToLocalStorage(events);

    // Clear form inputs after adding event
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventNote').value = '';
    document.getElementById('eventReminder').value = '';

    // Display events after adding new event
    displayEventsFromLocalStorage();
});

// Load and display events when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayEventsFromLocalStorage();
});
