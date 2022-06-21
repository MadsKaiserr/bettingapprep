module.exports = {
    getUser: function() {
        const user = localStorage.getItem("auth");
        if (user === "undefined" || !user) {
            return null
        } else {
            return JSON.parse(user);
        }
    },
    getToken: function() {
        return JSON.parse(localStorage.getItem("auth")).token;
    },

    setUserSession: function(user, token) {
        user.auth_token = token;
        localStorage.setItem("auth", JSON.stringify(user));
        localStorage.setItem("email", user.email);
        localStorage.setItem("favoritter", "");
    },

    resetUserSession: function() {
        localStorage.clear();
        sessionStorage.clear();
    }
}