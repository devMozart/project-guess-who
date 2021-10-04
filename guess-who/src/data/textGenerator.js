const getRandomNumber = (max) => {
    return Math.floor(Math.random() * (max + 1));
}

const toCapitalLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};


const getHairClue = (color) => {
    const nr = getRandomNumber(3);

    switch(nr) {
        case 0:
            return `Whoever is hiding has ${color} hair.`
        case 1:
            return `Our sources say the champion is ${color}-haired.`
        case 2:
            return `Last I saw the champion was ${color}-haired.`
        case 3:
            return `${toCapitalLetter(color)}-haired! I'm pretty sure.`
    }
}

const getRoleClue = (role) => {
    const nr = getRandomNumber(2);

    switch(nr) {
        case 0:
            return `${toCapitalLetter(role)} is what this character is listed as.`;
        case 1:
            return `I hear it's a ${toCapitalLetter(role)} we are looking for.`;
        case 2:
            return `${toCapitalLetter(role)}! I think...`;
    }
}

const getHomelandClue = (homeland) => {
    const nr = getRandomNumber(2);

    switch(nr) {
        case 0:
            return `We've traced the character to ${toCapitalLetter(homeland)}.`;
        case 1:
            return `My records say this champion is from ${toCapitalLetter(homeland)}.`;
        case 2:
            return `${toCapitalLetter(homeland)}, is a good place to look!`;
    }
}

const getSuccessMsg = (champion) => {
    const nr = getRandomNumber(3);

    switch(nr) {
        case 0:
            return `You got it! The hidden champion is ${champion}!`;
        case 1:
            return `That's right - it's ${champion}!`;
        case 2:
            return `Wohoo, great guess! It's ${champion} alright!`;
        case 3:
            return `Yup, it's a sneaky ${champion}!`;
    }
}

const getWrongMsg = (champion) => {
    const nr = getRandomNumber(3);

    switch(nr) {
        case 0:
            return `Nope, it's not ${champion}!`;
        case 1:
            return `${champion}?! No way!`;
        case 2:
            return `Haha, it's not ${champion}!`;
        case 3:
            return `Oof nope. It's not ${champion}!`;
    }
}

export { getHairClue, getRoleClue, getHomelandClue, getSuccessMsg, getWrongMsg };