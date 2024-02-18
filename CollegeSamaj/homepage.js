// Function to append a message to the UI
function appendMessage(message) {
    try {
        const msgContainer = document.querySelector('.msg_container.bl');
        const messageElement = document.createElement('div');
        messageElement.classList.add('msg');
        messageElement.textContent = message;
        msgContainer.appendChild(messageElement);
    } catch (error) {
        console.error('Error appending message to container:', error);
    }
}

// Load previous messages when the page is refreshed
window.addEventListener('load', async function() {
    try {
        const response = await fetch('/get-messages');
        if (response.ok) {
            const messages = await response.json();
            messages.forEach(message => {
                appendMessage(message.text);
            });
        } else {
            console.error('Failed to retrieve messages');
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
});

// Save messages to MongoDB before refreshing or leaving the page
window.addEventListener('beforeunload', async function() {
    try {
        const messages = document.querySelectorAll('.msg_container.bl .msg');
        const messageList = Array.from(messages).map(message => message.textContent);
        const response = await fetch('/save-messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: messageList })
        });
        if (!response.ok) {
            console.error('Failed to save messages to MongoDB');
        }
    } catch (error) {
        console.error('Error saving messages to MongoDB:', error);
    }
});
