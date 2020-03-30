const confirmPassword = document.querySelector('#pwconfirm');
const password = document.querySelector('#password');
const submit = document.querySelector('#submit_button');
submit.disabled = true;

class SecurityAlert {
    constructor(element, message) {
        this.element = element;
        this.message = message;
        this.alerts = 0;
    }
    clear() {
        this.element.innerHTML = '';
        this.alerts = 0;
        checkSubmit();
    }
    activate() {
        this.element.innerHTML = this.message;
        this.alerts = 1;
        checkSubmit();
    }
}

const confAlert = new SecurityAlert(document.querySelector('#conf_alert'), 'Passwords do not match');
const pwAlert = new SecurityAlert(document.querySelector('#pw_alert'), 'Please choose a password with at least 6 characters');
const warnings = [confAlert, pwAlert];

function pwIsSame() {
    let conf = confirmPassword.value;
    let pw = password.value;

    if (pw === conf) {
        confAlert.clear();
    } else {
        confAlert.activate();
    }
}

function validPW() {
    let pw = password.value;
    if(pw.length < 6){
        pwAlert.activate();
    } else {
        pwAlert.clear();
    }
}

function checkSubmit() {
    submit.disabled = false;
    warnings.forEach(e => {
        if (e.alerts > 0) {
            submit.disabled = true;
        }
    })
}

