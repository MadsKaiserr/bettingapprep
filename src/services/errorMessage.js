module.exports = {
    setNotiMessage: function(type, message) {
        document.getElementById("messageConsole").classList.add("message-" + type);
        document.getElementById("messageConsoleP").innerHTML = message;
    },
    remNotiMessage: function() {
        document.getElementById("messageConsole").className = "message-none";
        document.getElementById("messageConsoleP").innerHTML = "";
    }
}