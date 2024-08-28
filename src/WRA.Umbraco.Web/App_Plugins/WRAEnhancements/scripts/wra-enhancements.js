(function() {
    var link = document.createElement("link");
    link.href = "/css/dist/backoffice.css";
    link.type = "text/css";
    link.rel = "stylesheet";
    document.getElementsByTagName("head")[0].appendChild(link);

    console.log('WRA Enhancements loaded.');
})();