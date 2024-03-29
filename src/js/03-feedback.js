import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

const formData = {};


function onFormData(e) {
    formData[e.target.name] = e.target.value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitForm(e) {
    if (!form.querySelector('input').value.trim() && !form.querySelector('textarea').value.trim()) {
        alert('Please fill out the form');
        return;
    }
    console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
    e.preventDefault();
    e.currentTarget.reset();
    localStorage.removeItem('feedback-form-state');
}

(function dataFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('feedback-form-state'));
    const email = document.querySelector('.feedback-form input');
    const message = document.querySelector('.feedback-form textarea');
    if (data) {
        email.value = data.email.trim();
        message.value = data.message.trim();
    }
})();
