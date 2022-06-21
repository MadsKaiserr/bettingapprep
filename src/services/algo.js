module.exports = {
    getKupon: function(type,homeTeam,visitorTeam) {
        if (type === "3Way Result") {
            return "Kampresultat";
        } else if (type === "3Way Result 1st Half") {
            return "Kampresultat - 1. Halvleg";
        } else if (type === "3Way Result 2nd Half") {
            return "Kampresultat - 2. Halvleg";
        } else if (type === "Team To Score First") {
            return "Første målscorer";
        } else if (type === "Double Chance") {
            return "Dobbelt chance";
        } else if (type === "Double Chance - 1st Half") {
            return "Dobbelt chance - 1. halvleg";
        } else if (type === "Highest Scoring Half") {
            return "Flest mål i halvleg";
        } else if (type === "Both Teams To Score") {
            return "Begge hold scorer";
        } else if (type === "Clean Sheet - Home") {
            return "Clean sheet " + homeTeam;
        } else if (type === "Clean Sheet - Away") {
            return "Clean sheet " + visitorTeam;
        } else if (type === "Corner Match Bet") {
            return "Flest hjørnespark";
        } else if (type === "First Match Corner") {
            return "Første hjørnespark";
        } else if (type === "Last Match Corner") {
            return "Sidste hjørnespark";
        } else if (type === "Team To Score Last") {
            return "Sidste målscorer";
        } else if (type === "Odd/Even") {
            return "Lige/Ulige mål";
        } else if (type === "Own Goal") {
            return "Selvmål";
        }
    },
    getString: function(type,result,homeTeam,visitorTeam) {
        if (type === "3Way Result" || type === "3Way Result 1st Half" || type === "3Way Result 2nd Half") {
            if (result === "0") {
                return homeTeam;
            } else if (result === "1") {
                return "Uafgjort";
            } else if (result === "2") {
                return visitorTeam;
            }
        } else if (type === "Team To Score First" || type === "Team To Score Last") {
            if (result === "0") {
                return homeTeam;
            } else if (result === "1") {
                return "Ingen mål";
            } else if (result === "2") {
                return visitorTeam;
            }
        } else if (type === "Corner Match Bet") {
            if (result === "0") {
                return homeTeam;
            } else if (result === "1") {
                return "Ingen hjørnespark";
            } else if (result === "2") {
                return visitorTeam;
            }
        } else if (type === "Double Chance" || type === "Double Chance - 1st Half") {
            if (result === "0") {
                return homeTeam + " eller uafgjort";
            } else if (result === "1") {
                return "Uafgjort eller " + visitorTeam;
            } else if (result === "2") {
                return homeTeam + " eller " + visitorTeam;
            }
        } else if (type === "Own Goal" || type === "Clean Sheet - Away" || type === "Clean Sheet - Home" || type === "Both Teams To Score") {
            if (result === "0") {
                return "Ja";
            } else if (result === "1") {
                return "Nej";
            }
        } else if (type === "Last Match Corner" || type === "First Match Corner") {
            if (result === "0") {
                return homeTeam;
            } else if (result === "1") {
                return visitorTeam;
            }
        } else if (type === "Odd/Even") {
            if (result === "0") {
                return "Lige";
            } else if (result === "1") {
                return "Ulige";
            }
        } else if (type === "Highest Scoring Half") {
            if (result === "0") {
                return "1. halvleg";
            } else if (result === "1") {
                return "2. halvleg";
            } else if (result === "2") {
                return "Uafgjort";
            }
        }
    }
}