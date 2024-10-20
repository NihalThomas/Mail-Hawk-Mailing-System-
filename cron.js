// Function to handle button click
function sendButtonClick(timeInterval = 1) {
    let subject = document.getElementById('subject').value;
    const config = new MailConfig(timeInterval, subject);
    config.start();
}


