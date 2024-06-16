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
    events.forEach(function(event, index) {
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

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.onclick = function() {
            editEvent(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = function() {
            deleteEvent(index);
        };

        eventBox.appendChild(eventInfo);
        eventBox.appendChild(editButton);
        eventBox.appendChild(deleteButton);
        scheduleList.appendChild(eventBox);
    });
}

// Function to delete an event
function deleteEvent(index) {
    const events = loadEventsFromLocalStorage();
    events.splice(index, 1);
    saveEventsToLocalStorage(events);
    displayEventsFromLocalStorage();
}

// Function to edit an event
function editEvent(index) {
    const events = loadEventsFromLocalStorage();
    const event = events[index];

    document.getElementById('eventTitle').value = event.title;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventNote').value = event.note || '';
    document.getElementById('eventReminder').value = event.reminder || '';

    // Update form submit event to handle editing
    const form = document.getElementById('addEventForm');
    form.onsubmit = function(event) {
        event.preventDefault();
        updateEvent(index);
    };
}

// Function to update an event
function updateEvent(index) {
    const events = loadEventsFromLocalStorage();

    events[index] = {
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        note: document.getElementById('eventNote').value,
        reminder: document.getElementById('eventReminder').value
    };

    saveEventsToLocalStorage(events);
    displayEventsFromLocalStorage();

    // Reset form submit event to handle adding new events
    const form = document.getElementById('addEventForm');
    form.onsubmit = addEvent;

    // Clear form inputs
    form.reset();
}

// Function to add a new event
function addEvent(event) {
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
    document.getElementById('addEventForm').reset();

    // Display events after adding new event
    displayEventsFromLocalStorage();
}

// Load and display events when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayEventsFromLocalStorage();

    // Set form submit event to add new events
    document.getElementById('addEventForm').onsubmit = addEvent;
});
