// Function to fetch candidate details based on the URL parameters
function getCandidateDetails() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    
    // Simulate fetching candidate data (In real implementation, this would come from a database)
    const candidate = {
        name: name || "John Doe",
        skills: "JavaScript, HTML, CSS, React",
        experience: "2 years in frontend development",
        education: "Bachelor's degree in Computer Science",
        applicationHistory: [
            "Applied for Frontend Developer - Under Consideration",
            "Applied for Backend Developer - Unsuccessful"
        ]
    };

    // Populate the candidate details in the HTML
    document.getElementById('candidate-name').innerText = candidate.name;
    document.getElementById('application-history').innerHTML = candidate.applicationHistory.map(item => `<li>${item}</li>`).join('');
}

// Call the function to fetch and display candidate details when the page loads
window.onload = getCandidateDetails;

// Function to change the candidate status
function changeCandidateStatus() {
    const dropdown = document.getElementById('status-dropdown');
    const selectedStatus = dropdown.value;
    alert(`Status changed to: ${selectedStatus} for ${document.getElementById('candidate-name').innerText}`);
    // You might want to update the application history or candidate data here
}

// Function to send an email to the candidate
function sendEmail() {
    const candidateName = document.getElementById('candidate-name').innerText;
    alert(`Email sent to ${candidateName}`); // Replace with actual email sending logic
    // You might integrate with an email API or service here
}
