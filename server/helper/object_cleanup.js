const Cleanup = {};

// when updating a row in the db, we need to validate input
Cleanup.normalize = (options, allowedOptions) => {
  let output = [];

  for (const [key, value] of Object.entries(options)) {
    // converting key to lowercase for more compatibility
    const option = key.toLowerCase();
    if (allowedOptions.includes(option)) {
      output.push({ [option]: value });
    }
  }

  return output;
};

Cleanup.repeat = (phrase, n) => {
  let output = "";

  for (let i = 0; i < n; i++) {
    output += phrase;
    if (i !== n - 1) output += ", ";
  }

  return output;
};

module.exports = Cleanup;
