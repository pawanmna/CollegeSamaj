// Function to handle login
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userId = await checkUserAndGetStudentID(email, password);
        if (userId) {
            const userDetails = await getUserDetailsById(userId);
            if (userDetails) {
                appendUserDetailsToTemplate(userDetails);
            }
        } else {
            console.log('User not found');
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
    return false; // Prevent default form submission
}

// Function to check if user exists and get student ID
async function checkUserAndGetStudentID(email, password) {
    try {
        const response = await fetch('/check-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const userId = await response.json();
        return userId;
    } catch (error) {
        console.error('Error checking user and getting student ID:', error);
        return null;
    }
}

// Function to get all user details by ID in form of the object
async function getUserDetailsById(userId) {
    try {
        const response = await fetch(`/user-details/${userId}`);
        const userDetails = await response.json();
        return userDetails;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
}

// Function to append user details to the template
function appendUserDetailsToTemplate(userDetails) {
    try {
        const upperBdElement = document.querySelector('.upper.bd');
        upperBdElement.innerHTML = `
            <div class="photo bl">
                <img src="profile.png" alt="" class="bl">
                <span class="bl">${userDetails.name}</span>
            </div>
            <div class="year bl">${userDetails.year}</div>
            <div class="contact bl">${userDetails.contact}</div>
            <div class="performance bl">${userDetails.collegePerformance}</div>
            <div class="achievement bl">${userDetails.achievement}</div>
        `;
    } catch (error) {
        console.error('Error appending user details to template:', error);
    }
}
