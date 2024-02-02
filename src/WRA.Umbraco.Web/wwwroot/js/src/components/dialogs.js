import A11yDialog from 'a11y-dialog';

const dialogs = () => {
    const dialogs = document.querySelectorAll('.js-dialog');

    if (!dialogs.length) return;

    dialogs.forEach(dialog => {
        const el = new A11yDialog(dialog);

        el.on('show', () => {
            document.documentElement.classList.add('overflow-hidden');
        });

        el.on('hide', () => {
            document.documentElement.classList.remove('overflow-hidden');
        });
    });
}

const formsAccessDialog = () => {
    const dialog = document.querySelector('#forms-library-dialog');

    if (!dialog) return;

    const hiddenTrigger = document.querySelector('[data-a11y-dialog-show="forms-library-dialog"]');
    const closeTrigger = dialog.querySelector('[data-a11y-dialog-hide]');
    const checkbox = dialog.querySelector('.dialog-content-footer input[type="checkbox"]');
    const submit = dialog.querySelector('.dialog-content-footer .btn-primary');
    
    window.addEventListener('DOMContentLoaded', (e) => {
        if (!localStorage.getItem('forms-access-approved')) {
            hiddenTrigger.click();
        }
    });

    checkbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            submit.removeAttribute('disabled');
        } else {
            submit.setAttribute('disabled', 'disabled');
        }
    });

    submit.addEventListener('click', (e) => {
        if (!localStorage.getItem('forms-access-approved')) {
            localStorage.setItem('forms-access-approved', true);
        }

        closeTrigger.click();
    });
}

export { dialogs, formsAccessDialog };