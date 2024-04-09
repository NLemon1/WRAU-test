//https://github.com/vkurko/calendar 

const calendar = () => {

    const calendarContainer = document.getElementById("ec");
    const calendarFilters = document.querySelector(".js-calendar-filters");
    const apiEndpointUrl = "/GetProducts";
    const styleSet = document.querySelector('.js-filter-styles');

    //console.log(window.setResources)

    let bodyObject = {
        "productType": "Events",
        "categories": Array.from(window.setResources, (x) => x.title),
        "subCategories": [],
        "taxonomy": "",
        "pagination": {
            "pageNumber": 1,
            "pageSize": 100
        }
    };

    const bodyRequest = JSON.stringify(bodyObject);

    const getValue = (checkBoxes) => {

        styleSet.innerHTML = "";

        checkBoxes.forEach((checkBox) => {
            if (!checkBox.checked) {
                styleSet.innerHTML += (`[data-resource="${checkBox.value}"] { opacity: 0 }`);
            } else {
                styleSet.innerHTML += (`[data-resource="${checkBox.value}"] { opacity: 1 }`);
            }
        });
    }

    new EventCalendar(calendarContainer, {
        view: 'dayGridMonth',
        headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek resourceTimeGridWeek'
        },
        buttonText: function (texts) {
            texts.resourceTimeGridWeek = 'resources';
            return texts;
        },
        resources: window.setResources,
        scrollTime: '09:00:00',
        views: {
            timeGridWeek: { pointer: true },
            resourceTimeGridWeek: { pointer: true }
        },
        nowIndicator: true,
        eventClassNames: ['wra-event'],
        selectable: false,
        editable: false,
        eventStartEditable: false, // need to disable event drop n'drag
        eventDurationEditable: false, // need to disable event drop n'drag
        eventSources: [
            {
                events: function (fetchInfo, successCallback, failureCallback) { 

                    fetch(apiEndpointUrl,
                        {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": "*"
                            },
                            referrerPolicy: "no-referrer",
                            body: bodyRequest
                        }).then(res => {
                            return res.json();
                        }).then(res => {
                            //console.log(res);
                            successCallback(res);
                    });
                }

            }
        ],
        eventDidMount: function (info) { //adding data id attribute to each event

            const getEventsResourceId = info.event.resourceIds[0] !== undefined ? info.event.resourceIds[0].toString() : null;

            if (!info.el.getAttribute("data-resource") && getEventsResourceId !== null) {
                info.el.setAttribute("data-resource", getEventsResourceId);
            }
        },
        loading: function (isLoading) {
           // console.log(isLoading);

            if (isLoading == false) {
                //console.log("loading done");
                //remove if exists
                calendarFilters.innerHTML = "";

                //build out 
                setResources.forEach((resource) => {
                    calendarFilters.innerHTML += (
                        `
                        <div class="calendar-filter d-flex flex-row gap-3 rounded p-1 ps-2 mb-3 text-white" style="background-color:${resource.eventBackgroundColor}">
                            <input type="checkbox" id="${resource.id}" name="resource" class="js-calendar-filter form-check-input" checked value="${resource.id}" />
                            <label class="form-check-label" for="${resource.id}">${resource.title}</label>
                        </div>
                        `
                    );
                });

                //attach event handlers
                calendarFilters.addEventListener("change", (e) => {
                    getValue(document.querySelectorAll('.js-calendar-filter'));
                });

            }
        },
        eventClick: function (info) { // handles opening event into new tab
            if (info.event.extendedProps !== "" || info.event.extendedProps !== null) {
                window.open(info.event.extendedProps, '_blank').focus();
            } 
        }
    });

};

export default calendar;



