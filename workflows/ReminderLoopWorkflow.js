module.exports.handle = function*({email, max_wait, nb_max_reminder}) {
  let nb_reminder = 0;
  let event = null;

  do {
    // Wait for the event EventA
    event = yield this.wait.event("EventA").for(max_wait);
    if(event === null) {
      yield this.run.task("SendEmail", email, `ReminderA #${nb_reminder + 1}...`, "...");
    }

    nb_reminder++;
  } while ((nb_reminder < nb_max_reminder) && event === null);
  
  if(event) {
    yield this.run.task("SendEmail", email, 'Congrats for EventA', "...");
  }

  // Reset the number of reminder
  nb_reminder = 0;
  do {
    // Wait for the event EventB
    event = yield this.wait.event("EventB").for(max_wait);
    if(event === null) {
      yield this.run.task("SendEmail", email, `ReminderB #${nb_reminder + 1}...`, "...");
    }

    nb_reminder++;
  } while ((nb_reminder < nb_max_reminder) && event === null);
  
  if(event) {
    yield this.run.task("SendEmail", email, 'Congrats for EventB', "...");
  }
};
