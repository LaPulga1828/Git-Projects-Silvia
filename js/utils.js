export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number, one symbol
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return re.test(password);
}

export function arePasswordsMatching(password, confirmPassword) {
    return password === confirmPassword;
}

export function isCheckboxChecked(checkboxElement) {
    return checkboxElement.checked;
}

export function showValidationMessage(inputElement, message) {
    inputElement.classList.add('is-invalid');
    const feedbackElement = inputElement.nextElementSibling;
    if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
        feedbackElement.textContent = message;
    }
}

export function hideValidationMessage(inputElement) {
    inputElement.classList.remove('is-invalid');
    const feedbackElement = inputElement.nextElementSibling;
    if (feedbackElement && feedbackElement.classList.contains('invalid-feedback')) {
        feedbackElement.textContent = '';
    }
}