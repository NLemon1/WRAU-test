
const findRealtor = () => {

    //DOM Elements
    const realtorForm = document.querySelector('.js-realtor-form');
    const suggestFields = document.querySelectorAll('.js-suggest');
    const relatorResultsContainer = document.querySelector('.js-results-container');
    const realtorResults = document.querySelector('.js-realtor-results');
    const paginationContainer = document.querySelector('.js-realtor-pagination');
    const resultsCount = document.querySelector('.js-result-count');
    const resultsLoader = document.querySelector('.js-results-loader');
    const sortByBtns = document.querySelectorAll('.js-orderby');
    const searchEndpoint = '/umbraco/surface/findrealtorsurface/searchasync'
    const completionEndpoint = '/umbraco/surface/findrealtorsurface/completeasync'


    let filtersArray = [];
    let storedResults = {};
    let resultOrder = null;

    let pageNumber = 1;
    const pageSize = 10;

    let totalResults = 0;
    let totalResultPages = 0;

    let resultsContainerHeight = 0;

    //Functions

    const renderModel = (content) => {
        const data = content[0];

        // Modal Title
        const modalTitle = document.querySelector('.js-modal-title');
        modalTitle.textContent = data.fullName;

        // Modal Detail Header
        const modalHeaderZone = document.querySelector('.js-modal-header');
        const address3 = data.address3 !== "" ? `${data.address3}<br>` : "";
        const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24' fill='none' stroke='%23c3c3c3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
        const image = data.imageUrl !== "" && data.imageUrl !== null ? data.imageUrl : fallbackImage;
        const imageAlt = data.imageUrl !== "" || data.imageUrl !== null ? data.fullName : "";

        modalHeaderZone.innerHTML = (`
            <div class="col-12 col-sm-8">
                ${data.companyName !== null ? `<h4 class="font-family-1 text-normal">${data.companyName}</h4>` : ''}
                <p>
                    ${data.address1} ${data.address2}<br />
                    ${address3}
                    ${data.city}, ${data.stateProvince} ${data.zip}
                </p>
            </div>
            <div class="col-12 col-sm-4 text-sm-end ">
                <img src="${image}" width="96" height="96" class="img-fluid" alt="${imageAlt}" />
            </div>
        `);

        // Modal Detail Table
        const modalDetailsZone = document.querySelector('.js-modal-details');

        // Clear existing content
        modalDetailsZone.innerHTML = "";

        // Function to build a single detail row
        const buildDetailRow = (label, value, i) => {
            return `
            <li class="d-flex w-100 flex-column flex-sm-row border-bottom border-medium py-1">
                <span style="min-width: 150px;">${label}</span>
                <span class="text-body">${value}</span>
            </li>
        `;
        };

        // Array of fields to check
        const fieldsToCheck = [
            { key: "workPhone", label: "Office Phone" },
            { key: "fax", label: "Personal Fax" },
            { key: "directWorkPhone", label: "Direct Office Phone" },
            { key: "cellPhone", label: "Mobile Phone" },
            { key: "marketingEmail", label: "Email" },
            { key: "brokerWebsite", label: "Broker Website" },
            { key: "personalWebsite", label: "Agent Website" },
            { key: "primaryLocalBoardName", label: "Primary Local Board" },
            { key: "memberTypeCode", label: "Member Type" },
            { key: "primaryCounties", label: "Primary Counties" },
            { key: "areaOfSpecialty", label: "Area of Specialty" },
            { key: "secondaryLanguage", label: "Secondary Language" }
        ];

        // Array to hold all rows
        const rows = [];

        // Check each data field and build rows
        fieldsToCheck.forEach((field) => {
            if (data[field.key] && data[field.key] !== null) {
                rows.push(buildDetailRow(field.label, data[field.key]));
            }
        });

        // Join all rows into a single string and set innerHTML once
        modalDetailsZone.innerHTML = `
            ${rows.join('')}
        `;
    };

    const loadModal = (memberId) => {
        const modalContent = storedResults.filter((item) => item.id === memberId);
        renderModel(modalContent);
    }

    const modalPopHandler = () => {

        const modalButtons = document.querySelectorAll('.js-realtor-pop');

        modalButtons.forEach((modalButton) => {
            modalButton.addEventListener("click", (e) => {
                e.preventDefault();

                const memberId = modalButton.dataset.id;
                loadModal(memberId);

            });
        });
    }

    const resultsHeight = () => {
        if (realtorResults.offsetHeight > resultsContainerHeight) {
            resultsContainerHeight = realtorResults.offsetHeight;
        } else {
            resultsContainerHeight = resultsContainerHeight;
        }

        realtorResults.setAttribute("height", resultsContainerHeight);
    }

    const killResults = () => {
        realtorResults.innerHTML = "";
    }

    const handleIndicators = (show, waitLoaderElement) => {
        if (show == true) {
            waitLoaderElement.hidden = false;
        } else {
            waitLoaderElement.hidden = true;
        }
    }

    const renderResultsCount = (currentPage, pages, total) => {

        const currentStart = currentPage == 1 ? 1 : (currentPage * pageSize) - pageSize + 1;
        const currentEnd = (currentStart + pageSize) - 1;
        const currentEndAdjust = currentEnd > total ? total : currentEnd;

        resultsCount.innerHTML = (
            `
            Showing ${currentStart} to ${currentEndAdjust} of ${total} entries
            `
        )
    }

    const renderResults = (res) => {

        const resultData = res.data;
        storedResults = res.data;

        resultData.forEach((data) => {

            realtorResults.innerHTML += (
                `
            <tr>
                <td class="p-2 ps-4 text-body">${data.imisId ?? ""}</td>
                <td class="p-2 text-body">${data.memberTypeCode ?? ""}</td>
                <td class="p-2 text-body">
                    <button class="js-realtor-pop text-link border-0 bg-transparent px-0 py-2 text-start" onclick="return false;" data-a11y-dialog-show="realtor_info" data-id="${data.id}">${data.lastName}, ${data.firstName}</button>
                </td>
                <td class="p-2 text-body">${data.companyName ?? ""}</td>
                <td class="p-2 text-body">${data.city ?? ""}</td>
                <td class="p-2 pe-3 text-body text-nowrap">${data.workPhone ?? ""}</td>
            </tr>
            `
            );
        });

        modalPopHandler();
        resultsHeight();
    }


    const handleFormFieldPostData = (isSubmit, fdata) =>
    {
        // Show spinner
        handleIndicators(true, resultsLoader);

        let formData = fdata;

        // Set page number, size and orderby from globals.
        formData.append('pageNumber', pageNumber);
        formData.append('pageSize', pageSize);
        formData.append('orderBy', resultOrder !== null ? [`${resultOrder}`] : null);

        fetch(searchEndpoint,
        {
            method: "POST",
            body: formData,
            type: 'json'
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json(); 
        })
        .then(data => {
            console.log(data);
            renderResults(data);
            totalResults = data.totalCount;
            totalResultPages = data.totalPages;
            renderResultsCount(pageNumber, totalResultPages, totalResults);
            createPagination(paginationContainer, totalResultPages);
            handleIndicators(false, resultsLoader);
        })
        .catch(error => {
            console.error('Error:', error);
            handleIndicators(false, resultsLoader);
        });

    }


    const handlePostDataOld = (isSubmit, request) => {

        handleIndicators(true, resultsLoader);

        const data = request;

        /*  FORM DATA

        const data = {
            "LastName": "geiger",
            "FirstName": "robert",
            "CompanyName": "lightburn",
            "City": "Milwaukee",
            "StateProvince": "WI",
            "PrimaryLocalBoard": "8865",
            "SecondaryLanguage": "German",
            "designations": [
                "SRES",
                "SRS"
            ],
            "MemberTypeId": "A"
        };
        */


        //Build out filters objects
        const buildOutFilters = () => {

            if (data["LastName"] !== "") {
                const lastName = {
                    "field": "LastName",
                    "operator": "contains",
                    "value": data["LastName"]
                }
                filtersArray.push(lastName)
            }

            if (data["FirstName"] !== "") {
                const firstName = {
                    "field": "FirstName",
                    "operator": "contains",
                    "value": data["FirstName"]
                }
                filtersArray.push(firstName)
            }

            if (data["CompanyName"] !== "") {
                const companyName = {
                    "field": "CompanyName",
                    "operator": "contains",
                    "value": data["CompanyName"]
                }
                filtersArray.push(companyName)
            }

            if (data["City"] !== "") {
                const city = {
                    "field": "City",
                    "operator": "eq",
                    "value": data["City"]
                }
                filtersArray.push(city)
            }

            if (data["StateProvince"] !== "") {
                const stateProvince = {
                    "field": "StateProvince",
                    "operator": "eq",
                    "value": data["StateProvince"]
                }
                filtersArray.push(stateProvince)
            }

            if (data["PrimaryLocalBoard"] !== "") {
                const primaryLocalBoard = {
                    "field": "PrimaryLocalBoard",
                    "operator": "eq",
                    "value": data["PrimaryLocalBoard"]
                }
                filtersArray.push(primaryLocalBoard)
            }

            if (data["SecondaryLanguage"] !== "") {
                const secondaryLanguage = {
                    "field": "SecondaryLanguage",
                    "operator": "contains",
                    "value": data["SecondaryLanguage"]
                }
                filtersArray.push(secondaryLanguage)
            }

            if (data["designations"].length > 0) {
                const designations = {
                    "field": "FullName",
                    "operator": "contains",
                    "value": data["designations"].toString() //comma delimted list certificate abbreviations
                }
                filtersArray.push(designations)
            }

            if (data["MemberTypeId"] !== "") {
                const memberTypeId = {
                    "field": "MemberTypeId",
                    "operator": "eq",
                    "value": data["MemberTypeId"]
                }
                filtersArray.push(memberTypeId)
            }

            return filtersArray;
        }


        let bodyObject = {
            "advancedFilter": {
                "logic": "and",
                "filters": isSubmit ? buildOutFilters() : filtersArray
            },
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "orderBy": resultOrder !== null ? [`${resultOrder}`] : null
        }

       // console.log(bodyObject);

        /* SAMPLE WORKING REQUEST */

        /*
        {
            "advancedFilter": {
                "logic": "and",
                    "filters": [
                        {
                            "field": "LastName",
                            "operator": "contains",
                            "value": "Smith"
                        }
                    ]
            },
            "pageNumber": 1,
            "pageSize": 10,
            "orderBy": null
        }
        */

        /*
        let bodyObject = {
            "advancedSearch": null,
            "advancedFilter": {
                "logic": "and",
                "filters": [
                    {
                        "field": "FirstName",
                        "operator": "contains",
                        "value": "M"
                    },
                    {
                        "field": "LastName",
                        "operator": "contains",
                        "value": "Smith"
                    },
                    {
                        "field": "CompanyName",
                        "operator": "contains",
                        "value": "Shorewest"
                    },
                    {
                        "field": "City",
                        "operator": "eq",
                        "value": "Milwaukee"
                    },
                    {
                        "field": "StateProvince",
                        "operator": "eq",
                        "value": "WI"
                    },
                    //////NEED FIX
                    {
                        "field": "PrimaryLocalBoard",
                        "operator": "eq",
                        "value": "8655DD5E-5703-4BDA-1940-08DBFA99C6BB" GUID or other ID??
                    },
                    {
                        "field": "SecondaryLanguage",
                        "operator": "contains",
                        "value": "English"
                    },
                    {
                        "field": "FullName", //Designations
                        "operator": "contains",
                        "value": "GRI"  //comma delimted list certificate abbreviations
                    },
                    {
                        "field": "MemberTypeId",
                        "operator": "eq",
                        "value": "8655DD5E-5703-4BDA-1940-08DBFA99C6BB"
                    },
                ]
            },
            "pageNumber": pageNumber,
            "pageSize": pageSize,
            "orderBy": null
        }
        */

        console.log(bodyObject);

        const bodyRequest = JSON.stringify(bodyObject);

        fetch(apiEndpointUrl,
        {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            referrerPolicy: "no-referrer",
            body: bodyRequest
        }).then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);

            renderResults(res);
            totalResults = res.totalCount;
            totalResultPages = res.totalPages;

            renderResultsCount(pageNumber, totalResultPages, totalResults);
            createPagination(paginationContainer, totalResultPages);

            handleIndicators(false, resultsLoader);
        });
    }


    const handleClearPagination = (paginationElement) => {

        if (paginationElement.nextElementSibling !== null) {
            if (paginationElement.nextElementSibling.tagName == 'BUTTON') {
                paginationElement.nextElementSibling.remove();
            }
        }

        if (paginationElement.previousElementSibling !== null) {
            if (paginationElement.previousElementSibling.tagName == 'BUTTON') {
                paginationElement.previousElementSibling.remove();
            }
        }

        paginationElement.innerHTML = "";

    }  

    const createPagination = (paginationElement, resultPageCount) => {

        const totalPages = parseInt(resultPageCount);

        handleClearPagination(paginationContainer);//clear first

        //numbered page buttons
        if (totalPages > 1) {

            for (var i = 0; i < totalPages; i++) {

                let li = document.createElement('li');

                li.setAttribute("role", "button");
                li.setAttribute("title", `Go to page ${i + 1}`);

                if (pageNumber == (i + 1)) {
                    li.classList.add("current");
                }

                //only shows pagination numbers -+3 of current for results more than 7 pages
                if (totalPages > 6) {
                    if ((i < pageNumber && i > (pageNumber - 5)) || (i > (pageNumber - 1) && i < ((pageNumber - 1) + 4))) {
                        li.classList.add("d-inline-block");
                    } else {
                        li.classList.add("d-none");
                        li.setAttribute("aria-hidden", "true");
                    }
                }

                li.textContent = i + 1;

                li.addEventListener('click', (e) => {
                    e.preventDefault();
                    pageNumber = e.target.textContent;
                    killResults();
                    handleFormFieldPostData(false);
                });

                paginationElement.appendChild(li);
            }
        }

        //next/prev buttons
        if (totalPages > 1) {

            if (pageNumber > 1) { //show previous button

                let prevBtn = document.createElement('button');
                prevBtn.classList.add("btn-prev");
                prevBtn.setAttribute("title", "Go to previous page");

                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    pageNumber -= 1;
                    killResults();
                    handleFormFieldPostData(false);
                });

                paginationElement.before(prevBtn);
            }

            if (pageNumber < totalPages) { //show next button

                let nextBtn = document.createElement('button');
                nextBtn.classList.add("btn-next");
                nextBtn.setAttribute("title", "Go to next page");

                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();

                    pageNumber += 1;
                    killResults();
                    handleFormFieldPostData(false);
                });

                paginationElement.after(nextBtn);
            }
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        relatorResultsContainer.hidden = false;

        const data = new FormData(e.target);
        debugger;
        const formJSON = Object.fromEntries(data.entries());
        formJSON.designations = data.getAll('designations');//used for mutli-select field

        const request = formJSON;//also store original request so we can use pagination
        filtersArray = [];
        killResults();
        pageNumber = 1;
        handleFormFieldPostData(true, data);
    }


    // Auto-populate

    let activeDropdown = false;

    const populateInput = (data, input, parentList) => {
        input.value = data;
        input.focus();
        parentList.innerHTML = "";
        activeDropdown = false;
    }

    const buildSuggestList = (data, input) => {

        const targetedListElement = input.nextElementSibling;
        targetedListElement.innerHTML = ""; //clear ahead
        let selectedIndex = -1; // Track currently selected item index

        data.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('suggest-list__item');
            li.textContent = item;
            li.setAttribute('role', 'button');
            li.setAttribute('tabindex', '0');

            targetedListElement.appendChild(li);

            li.addEventListener("click", (e) => {
                populateInput(e.target.textContent, input, targetedListElement);
            });

            li.addEventListener("keydown", (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent submitting forms or other default actions
                    populateInput(e.target.textContent, input, targetedListElement);
                }
            });

        });

        activeDropdown = true;

        document.addEventListener("keydown", (e) => {

            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {

                if (activeDropdown) {
                    e.preventDefault(); // Prevent scrolling the page with arrow keys
                }

                const listItems = targetedListElement.querySelectorAll('.suggest-list__item');
                const maxIndex = listItems.length - 1;

                // Adjust selectedIndex based on arrow key direction
                if (e.key === 'ArrowUp') {
                    selectedIndex = selectedIndex <= 0 ? maxIndex : selectedIndex - 1;
                } else if (e.key === 'ArrowDown') {
                    selectedIndex = selectedIndex >= maxIndex ? 0 : selectedIndex + 1;
                }

                // Remove focus from all items and focus on the newly selected item
                listItems.forEach((item, idx) => {
                    if (idx === selectedIndex) {
                        item.focus();
                        item.classList.add('selected');
                    } else {
                        item.classList.remove('selected');
                    }
                });

            }

            if (e.key === 'Backspace') {
                input.focus();
            }

        });

    }


    const postText = (textString, input) => {

        const inputProperty = input.dataset.property;

        const suggestionUniqueResults = (data) => {
            if (data.length) {

                const uniqueArray = [...new Set(data.map(item => item[inputProperty]))].filter(item => item !== null && item !== undefined);//create new array and filter out nulls
                buildSuggestList(uniqueArray, input)
            }
        }

        // Get the antiforgery token from the main form.
        const antiforgeryToken = realtorForm.querySelector('input[name="__RequestVerificationToken"]').value;

        
        let formData = new FormData();
        formData.append('field', `${inputProperty}`);
        formData.append('query', textString);
        formData.append('__RequestVerificationToken', antiforgeryToken)

        fetch(completionEndpoint,
        {
            method: "POST",
            data: 'json',
            body: formData
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(responseData => {
            console.log(responseData);
            suggestionUniqueResults(responseData.data);
        });
    }

    suggestFields.forEach((field) => {

        let searchtimer;

        field.addEventListener("input", (e) => {
            const inputType = e.target.type;

            if (inputType === "text") {
                clearTimeout(searchtimer);

                searchtimer = setTimeout(() => {
                    if (e.target.value !== "" && e.target.value.length > 2) {
                        inputText = e.target.value;
                        postText(inputText, field);

                    } else {
                        clearTimeout(searchtimer);
                        field.nextElementSibling.innerHTML = "";
                    }

                }, 200);
            }
        });

    })


    //Event Listeners

    realtorForm.addEventListener('submit', handleSubmit);

    sortByBtns.forEach((sortByBtn) => {
        sortByBtn.addEventListener("click", (e) => {
            e.preventDefault();

            const orderSelected = sortByBtn.dataset.sort;

            killResults();

            if (orderSelected === resultOrder) {
                resultOrder = null;
            } else {
                resultOrder = orderSelected;
            }

            handlePoshandleFormFieldPostData(false);
        });
    });

};

export default findRealtor;