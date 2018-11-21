
const makeRule = (t, m = "Invalid value for {}.") => ({
    test: t,
    message: field => m.replace('{}', field)
});

const REQUIRED = makeRule(val => val && val.length, "Value for {} is required.");
const MAXLENGTH = len => makeRule(
  val => !val || (val.length <= len), "Maximum length is " + len + ".");
const MINLENGTH = len => makeRule(
  val => !val || (val.length >= len), "Minimum length is " + len + ".");
const ISNUMBER = makeRule(val => !isNaN(Number(val)), "Not a valid number");
const VALIDEMAIL = makeRule(
  val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val),
  "Not a valid email address.");

export {REQUIRED, MAXLENGTH, MINLENGTH, ISNUMBER, VALIDEMAIL};
