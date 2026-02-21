const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(user => user.email === email);

    if (userExists) {
        alert("User already registered");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
        todos: []
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "index.html";
});
