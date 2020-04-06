module.exports.getDate = () => {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    return today.toLocaleDateString("en-us",options);
};


module.exports.getDay = () => {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",   
    };
    return today.toLocaleDateString("en-us",options);
};

console.log(module.exports);