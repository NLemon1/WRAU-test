const print = () => {

	const printBtns = document.querySelectorAll('.js-print');
	// .js-print button requires data-printid with unique target id of printable div

	printBtns.forEach((printBtn) => {

		printBtn.addEventListener("click", (e) => {
			e.preventDefault();

			const printDivId = printBtn.dataset.printid;
			const printContent = document.getElementById(printDivId).querySelector('.printer_area');
			const WinPrint = window.open('', '', 'width=900,height=650');

			let link = WinPrint.document.createElement('link');
			link.rel = "stylesheet";
			link.type = "text/css";
			link.href = "https://localhost:44336/css/dist/global.css";

			WinPrint.document.write(printContent.innerHTML);
			WinPrint.document.body.appendChild(link);

			setTimeout(() => {  // need to give the above append/css to load first
				WinPrint.focus();
				WinPrint.print();
				WinPrint.close();
			}, 1000);

		})

	});

};

export default print;