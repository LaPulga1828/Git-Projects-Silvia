import {
    validateEmail,
    validatePassword,
    showValidationMessage,
    hideValidationMessage,
    arePasswordsMatching,
    isCheckboxChecked
} from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // Handle Registration Form
    const registroForm = document.getElementById('registroForm');
    if (registroForm) {
        registroForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const nombreCompletoInput = document.getElementById('nombreCompleto');
            const emailRegistroInput = document.getElementById('emailRegistro');
            const passwordRegistroInput = document.getElementById('passwordRegistro');
            const confirmPasswordRegistroInput = document.getElementById('confirmPasswordRegistro');
            const terminosCheckbox = document.getElementById('terminos');
            const mensajeRegistro = document.getElementById('mensajeRegistro');

            let isValid = true;

            // Validate Nombre Completo
            if (nombreCompletoInput.value.trim() === '') {
                showValidationMessage(nombreCompletoInput, 'Por favor, introduce tu nombre completo.');
                isValid = false;
            } else {
                hideValidationMessage(nombreCompletoInput);
            }

            // Validate Email
            if (!validateEmail(emailRegistroInput.value)) {
                showValidationMessage(emailRegistroInput, 'Por favor, introduce un correo electrónico válido.');
                isValid = false;
            } else {
                // Check if email already exists in localStorage
                if (localStorage.getItem('registeredUserEmail') === emailRegistroInput.value) {
                    showValidationMessage(emailRegistroInput, 'Este correo electrónico ya está registrado.');
                    isValid = false;
                } else {
                    hideValidationMessage(emailRegistroInput);
                }
            }

            // Validate Password
            if (!validatePassword(passwordRegistroInput.value)) {
                showValidationMessage(passwordRegistroInput, 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.');
                isValid = false;
            } else {
                hideValidationMessage(passwordRegistroInput);
            }

            // Validate Confirm Password
            if (!arePasswordsMatching(passwordRegistroInput.value, confirmPasswordRegistroInput.value)) {
                showValidationMessage(confirmPasswordRegistroInput, 'Las contraseñas no coinciden.');
                isValid = false;
            } else {
                hideValidationMessage(confirmPasswordRegistroInput);
            }

            // Validate Terms and Conditions
            if (!isCheckboxChecked(terminosCheckbox)) {
                showValidationMessage(terminosCheckbox, 'Debes aceptar los términos y condiciones.');
                isValid = false;
            } else {
                hideValidationMessage(terminosCheckbox);
            }

            if (isValid) {
                // Store user data in localStorage (for demonstration purposes only)
                localStorage.setItem('registeredUserName', nombreCompletoInput.value);
                localStorage.setItem('registeredUserEmail', emailRegistroInput.value);
                localStorage.setItem('registeredUserPassword', passwordRegistroInput.value); // In a real app, hash this!
                // No configuramos 'isLoggedIn' aquí, ya que el usuario irá al login

                mensajeRegistro.textContent = '¡Registro exitoso! Redireccionando al login...';
                mensajeRegistro.className = 'mt-3 text-center alert alert-success';
                setTimeout(() => {
                    window.location.href = 'login.html'; // Redirigir a login.html
                }, 2000);
            } else {
                mensajeRegistro.textContent = 'Por favor, corrige los errores en el formulario.';
                mensajeRegistro.className = 'mt-3 text-center alert alert-danger';
            }
        });
    }

    // Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailLoginInput = document.getElementById('emailLogin');
            const passwordLoginInput = document.getElementById('passwordLogin');
            const mensajeLogin = document.getElementById('mensajeLogin');

            let isValid = true;

            // Validate Email
            if (!validateEmail(emailLoginInput.value)) {
                showValidationMessage(emailLoginInput, 'Por favor, introduce un correo electrónico válido.');
                isValid = false;
            } else {
                hideValidationMessage(emailLoginInput);
            }

            // Validate Password
            if (passwordLoginInput.value.trim() === '') {
                showValidationMessage(passwordLoginInput, 'Por favor, introduce tu contraseña.');
                isValid = false;
            } else {
                hideValidationMessage(passwordLoginInput);
            }

            if (isValid) {
                // Retrieve stored credentials
                const storedEmail = localStorage.getItem('registeredUserEmail');
                const storedPassword = localStorage.getItem('registeredUserPassword');

                if (emailLoginInput.value === storedEmail && passwordLoginInput.value === storedPassword) {
                    localStorage.setItem('isLoggedIn', 'true'); // Simulate session
                    mensajeLogin.textContent = '¡Inicio de sesión exitoso! Redireccionando al dashboard...';
                    mensajeLogin.className = 'mt-3 text-center alert alert-success';
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else {
                    mensajeLogin.textContent = 'Correo o contraseña incorrectos.';
                    mensajeLogin.className = 'mt-3 text-center alert alert-danger';
                }
            } else {
                mensajeLogin.textContent = 'Por favor, introduce tus credenciales.';
                mensajeLogin.className = 'mt-3 text-center alert alert-danger';
            }
        });
    }
});