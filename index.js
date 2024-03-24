let base64DataVar;
function sendmail(e) {
    e.preventDefault();
    const name = getValue('full_name');
    const email = getValue('email');
    const file = getValue('fileInput');
    const message = getValue('message');
    console.log("clicked on submit button", name, email, file);

    const emailBody = `
        <div style="padding: 10px; background: #f2d7d7; border-radius: 6px; font-family: 'Google Sans';">
            <p>
                <b>Name:</b> ${name} <br> 
                <b>Email:</b> ${email} <br>
            </p>
        </div>`;

    
    Email.send({
        // SecureToken : "a0fdaa45-8b58-4f4c-9165-3fa57cba41bc",
        Host : "smtp.elasticemail.com",      
        Username : "klvamshi.dev@gmail.com",
        Password : "0D519CF56D18263DEF02371C1B6D86939B42",
        To : 'klvamshi.dev@gmail.com',
        From : "klvamshi.dev@gmail.com",
        Subject : "This is the subject",
        Body : emailBody,
        Attachments : [
            {
                name : "smtpjs.png",
                data : "file"
            }]
    }).then(
      message => console.log(message)
    );
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
}

// function createBase64String(event){
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = function(event) {
//         const base64Data = event.target.result;
//         console.log(base64Data);
//     };
//     // Read the file as base64 data
//     reader.readAsDataURL(file);
// }

// Assuming you have an input element with id="fileInput" in your HTML
const fileInput = document.getElementById('fileInput');

// Event listener to trigger when a file is selected
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the selected file

    // Create a new FileReader object
    const reader = new FileReader();

    // Event listener to trigger when the FileReader has finished reading the file
    reader.onload = function(event) {
        const base64Data = arrayBufferToBase64(event.target.result); // Convert ArrayBuffer to base64

        // Now you can use 'base64Data' to attach the file in base64 format
        // Here, you would use 'base64Data' in place of "YourBase64EncodedPDFDataHere" in your script
        console.log(base64Data); // You can log the base64 data to the console to verify
        base64DataVar = base64Data
    };

    // Read the file as ArrayBuffer
    reader.readAsArrayBuffer(file);
});

// Function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
