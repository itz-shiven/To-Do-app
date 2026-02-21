const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPass").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
        user => user.email === email && user.password === password
    );

    if (foundUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", foundUser.email);
        window.location.href = "dashboard.html";
    } else {
        alert("User not registered or wrong password");
    }
});
