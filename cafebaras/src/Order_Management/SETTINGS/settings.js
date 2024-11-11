function updateInfo() {
    const oldUsername = document.getElementById("old-username").value;
    const newUsername = document.getElementById("new-username").value;
    const oldPassword = document.getElementById("old-password").value;
    const newPassword = document.getElementById("new-password").value;

    if (oldUsername && newUsername && oldPassword && newPassword) {
        alert("Information updated successfully!");
        // Here, you could add code to handle the form submission to your backend
    } else {
        alert("Please fill in all fields.");
    }
}