module.exports = {
    showLogin: function() {
        const popup = document.getElementById("login-container");
        popup.classList.add("block");

        const body = document.getElementById("body");
        body.classList.add("no-scroll");
    },
    remLogin: function() {
        const popup = document.getElementById("login-container");
        popup.classList.remove("block");

        const body = document.getElementById("body");
        body.classList.remove("no-scroll");
    }
}