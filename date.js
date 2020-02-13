exports.getDate = function() {

  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-GB", options);

}

exports.getYear = function() {

  const today = new Date();

  return today.getFullYear();

}
