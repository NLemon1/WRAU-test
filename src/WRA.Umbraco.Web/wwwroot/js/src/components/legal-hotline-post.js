const legalHotlinePost = () => {

    //DOM Elements
    const hotlineForm = document.querySelector('.hot-tip-question > form');


    //Vars
    const apiEndpointUrl = "/legalhotlinecall";


    const handlePostData = () => {

        let bodyObject = {
            "memberId": "string",
            "question": "string",
            "responseMethod": "string",
            "letterRequested": true,
            "emailAddress": "string",
            "responsePhone": "string",
            "callbackWindowStart": "2024-07-02T16:17:48.256Z",
            "callbackWindowEnd": "2024-07-02T16:17:48.256Z"
        }


        const bodyRequest = JSON.stringify(bodyObject);

      //  console.log(bodyRequest)

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
          //  console.log(res);
        });
    }



    if (hotlineForm) {
        hotlineForm.addEventListener("submit", (e) => {
            console.log(e);
            //handlePostData();
        });
    }

};

export default legalHotlinePost;