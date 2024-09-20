document.addEventListener('DOMContentLoaded', function() {
    var acceptButton = document.getElementById('acceptButton');
    var cancelButton = document.getElementById('cancelButton');
    var agreeCheckbox = document.getElementById('agreeCheckbox');
    var termsModal = document.getElementById('termsModal');

    // Show the modal on page load
    termsModal.classList.add('show');

    agreeCheckbox.addEventListener('change', function() {
        acceptButton.disabled = !agreeCheckbox.checked;
    });

    acceptButton.addEventListener('click', function() {
        window.location.href = "../login_page/main_login_page/login.html";
    });

    cancelButton.addEventListener('click', function() {
        termsModal.classList.remove('show');
        window.location.href = "../main_page/index.html";
    });
});
