//https://github.com/vkurko/calendar 

const calendar = () => {

    //Event Object

    const filterBtn = document.querySelector(".js-filter");
    const calendarContainer = document.getElementById("ec");

    const testData = [
        {
            "start": "2024-01-07 00:00",
            "end": "2024-01-07 09:00",
            "resourceId": 1,
            "display": "background"
        },
        {
            "start": "2024-01-08 12:00",
            "end": "2024-01-08 14:00",
            "resourceId": 2,
            "display": "background"
        },
        {
            "start": "2024-01-09 17:00",
            "end": "2024-01-09 24:00",
            "resourceId": 1,
            "display": "background"
        },
        {
            "start": "2024-01-07 10:00",
            "end": "2024-01-07 14:00",
            "resourceId": 1,
            "title": "The calendar can display background and regular events",
            "color": "#FE6B64"
        },
        {
            "start": "2024-01-08 16:00",
            "end": "2024-01-09 08:00",
            "resourceId": 2,
            "title": "An event may span to another day",
            "color": "#B29DD9"
        },
        {
            "start": "2024-01-09 09:00",
            "end": "2024-01-09 13:00",
            "resourceId": 2,
            "title": "Events can be assigned to resources and the calendar has the resources view built-in",
            "color": "#779ECB"
        },
        {
            "start": "2024-01-10 14:00",
            "end": "2024-01-10 20:00",
            "resourceId": 1,
            "title": "",
            "color": "#FE6B64"
        },
        {
            "start": "2024-01-10 15:00",
            "end": "2024-01-10 18:00",
            "resourceId": 1,
            "title": "Overlapping events are positioned properly",
            "color": "#779ECB"
        },
        {
            "start": "2024-01-12 10:00",
            "end": "2024-01-12 16:00",
            "resourceId": 2,
            "title": {
                "html": "You have complete control over the <i><b>display</b></i> of events"
            },
            "color": "#779ECB"
        },
        {
            "start": "2024-01-12 14:00",
            "end": "2024-01-12 19:00",
            "resourceId": 2,
            "title": "And you can drag and drop the events!",
            "color": "#FE6B64"
        },
        {
            "start": "2024-01-12 18:00",
            "end": "2024-01-12 21:00",
            "resourceId": 2,
            "title": "",
            "color": "#B29DD9"
        },
        {
            "start": "2024-01-08",
            "end": "2024-01-10",
            "resourceId": 1,
            "title": "All-day events can be displayed at the top",
            "color": "#B29DD9",
            "allDay": true
        }
    ]

    const ec = new EventCalendar(calendarContainer, {
        view: 'timeGridWeek',
        headerToolbar: {
            start: 'resourceTimeGridWeek, prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        buttonText: function (texts) {
            texts.resourceTimeGridWeek = 'Filters';
            return texts;
        },
        resources: [
            { id: 1, title: 'Resource A' },
            { id: 2, title: 'Resource B' }
        ],
        scrollTime: '09:00:00',
        events: testData,
        views: {
            timeGridWeek: { pointer: true },
            resourceTimeGridWeek: { pointer: true }
        },
        dayMaxEvents: true,
        nowIndicator: true,
        selectable: true,
        editable: false,
        eventStartEditable: false, // need to disable event drop n'drag
        eventDurationEditable: false, // need to disable event drop n'drag
        filterResourcesWithEvents: true,
        eventClick: function (info) {
            console.log(info)
        }
    });


    filterBtn.addEventListener("click", (e) => {

        ec(calendarContainer);


    });

};

export default calendar;



