const { datetime } = require("zenaton");

module.exports.handle = function*({ email, date }) {
  // Get the event date as a timestamp in seconds
  const timestamp = Math.floor(new Date(date).getTime() / 1000);

  // Send a reminder 7 days before the event
  yield this.wait.until(datetime.timestamp(timestamp - 7 * 24 * 3600));
  yield this.run.task("SendEmail", email, "J-7 ! ...", "...");

  // Send a reminder 3 days before the event
  yield this.wait.until(datetime.timestamp(timestamp - 3 * 24 * 3600));
  yield this.run.task("SendEmail", email, "J-3 ! ...", "...");

  // Send a reminder 2 hours before the event
  yield this.wait.until(datetime.timestamp(timestamp - 2 * 3600));
  yield this.run.task("SendEmail", email, "H-2 ! ...", "...");
};
