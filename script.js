// Variables to hold username and profile picture
let username = '';
let profilePic = '';

// HTML Elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const settingsButton = document.getElementById('settings-button');
const settingsMenu = document.getElementById('settings-menu');
const usernameInput = document.getElementById('username');
const profilePicInput = document.getElementById('profile-pic');
const saveSettingsButton = document.getElementById('save-settings');

// Default profile picture URL
const defaultProfilePic = 'https://files.catbox.moe/05ycvk.png'; // Placeholder image URL

// Load messages from localStorage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.forEach(({ message, username, profilePic }) => {
        displayMessage(message, username, profilePic);
    });
}

// Display a message in the chat
function displayMessage(message, username, profilePic) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `
        <img src="${profilePic || defaultProfilePic}" class="pfp">
        <strong>${username}</strong>: ${message}
    `;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the latest message
}

// Send message
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message && username) {
        const profilePicToUse = profilePic || defaultProfilePic;
        const messageData = { message, username, profilePic: profilePicToUse };

        // Store in localStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(messageData);
        localStorage.setItem('messages', JSON.stringify(messages));

        // Display the message locally
        displayMessage(message, username, profilePicToUse);

        // Clear input
        messageInput.value = '';
    }
});

// Load chat history on page load
loadMessages();

// Toggle settings menu
settingsButton.addEventListener('click', () => {
    settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
});

// Save settings
saveSettingsButton.addEventListener('click', () => {
    username = usernameInput.value || 'Anonymous';
    profilePic = profilePicInput.value || defaultProfilePic;
    settingsMenu.style.display = 'none';
});
