const formDOM = document.querySelector("form");

formDOM.addEventListener('submit', event => {
    if (!formDOM.checkValidity()) {
        event.preventDefault();
    }

    formDOM.classList.add('was-validated');
});