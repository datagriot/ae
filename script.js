// script.js

document.addEventListener('DOMContentLoaded', function() {
  const surveyOption = document.getElementById('survey-option');
  const questionsContainer = document.getElementById('survey-questions');

  surveyOption.addEventListener('change', function() {
    const selection = this.value;
    questionsContainer.innerHTML = ''; // Clear previous questions

    if (selection === 'Me') {
      displayMeQuestions();
    } else if (selection === 'AfroTech') {
      displayAfroTechQuestions();
    } else if (selection === 'Us') {
      displayUsQuestions();
    }

    if (selection) {
      questionsContainer.classList.remove('hidden');
    } else {
      questionsContainer.classList.add('hidden');
    }
  });

  // Display "Me" Questions
  function displayMeQuestions() {
    const questions = `
      <div class="question">
        <label for="feel">How you feel?</label>
        <input type="range" id="feel" name="feel" min="0" max="2" step="1" oninput="updateFeelLabel(this.value)">
        <span id="feel-label">0 💙</span>
      </div>

      <div class="question">
        <label for="photo">May I take a photo?</label>
        <select id="photo" name="photo">
          <option value="">--Select an option--</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
          <option value="2">Maybe</option>
        </select>
      </div>

      <button id="submit-me">Submit</button>
    `;

    questionsContainer.innerHTML = questions;

    // Add event listener for Submit button
    document.getElementById('submit-me').addEventListener('click', function() {
      handleMeSubmit();
    });
  }

  // Update "How you feel?" label with emojis
  window.updateFeelLabel = function(value) { // Exposed globally for inline oninput
    const label = document.getElementById('feel-label');
    if (value == 0) {
      label.textContent = '0 💙';
    } else if (value == 1) {
      label.textContent = '1 ❤️';
    } else if (value == 2) {
      label.textContent = '2 ⚠️';
    }
  }

  // Handle "Me" Submit
  function handleMeSubmit() {
    const feel = document.getElementById('feel').value;
    const photo = document.getElementById('photo').value;

    if (photo === '0') {
      triggerDataVisualization();
    } else if (photo === '1') {
      triggerCameraAccess();
    } else if (photo === '2') {
      triggerMaybeOption();
    }

    // Trigger celebration animation and sound
    triggerCelebration();
  }

  // Trigger Data Visualization (Redirect)
  function triggerDataVisualization() {
    // Replace with actual data visualization page URL
    window.location.href = 'data-visualization.html'; // Example redirect
  }

  // Trigger Camera Access and Photo Capture
  function triggerCameraAccess() {
    // Request camera access
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        // Create video element to stream camera
        const video = document.createElement('video');
        video.style.display = 'none'; // Hide video element
        video.srcObject = stream;
        video.play();
        document.body.appendChild(video);

        // Create canvas to capture photo
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // When video is ready, capture the photo
        video.addEventListener('canplay', function() {
          // Set canvas dimensions to video dimensions
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Draw the current frame from video to canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Convert canvas to image
          const img = document.createElement('img');
          img.src = canvas.toDataURL('image/png');
          img.alt = 'User Photo';
          img.style.maxWidth = '100%';
          document.body.appendChild(img);

          // Stop all video streams
          stream.getTracks().forEach(track => track.stop());

          // Remove video element
          video.remove();

          // Optionally, send the photo data to your server or process it as needed
          // Example: console.log(img.src);
        }, { once: true }); // Trigger only once
      })
      .catch(function(err) {
        alert('Camera access denied or not available.');
        console.error(err);
      });
  }

  // Handle "Maybe" Option
  function triggerMaybeOption() {
    alert('Maybe option selected. Further action can be implemented.');
    // Implement additional logic if needed
  }

  // Trigger Celebration Animation and Sound
  function triggerCelebration() {
    const celebration = document.getElementById('celebration');
    const sound = document.getElementById('celebration-sound');
    celebration.style.display = 'block';
    sound.play();

    // Hide celebration after 3 seconds
    setTimeout(function() {
      celebration.style.display = 'none';
    }, 3000);
  }

  // Display "AfroTech" Questions (Placeholder)
  function displayAfroTechQuestions() {
    const questions = `
      <div class="question">
        <label for="session-interest">Which AfroTech session are you most interested in?</label>
        <select id="session-interest" name="session-interest">
          <option value="">--Select an option--</option>
          <option>Keynote Speakers</option>
          <option>Workshops</option>
          <option>Networking Events</option>
          <option>Exhibits</option>
          <option>Others</option>
        </select>
      </div>

      <div class="question">
        <label for="event-feedback">Provide your feedback for AfroTech events.</label>
        <textarea id="event-feedback" name="event-feedback" rows="4"></textarea>
      </div>

      <button id="submit-afrotech">Submit</button>
    `;

    questionsContainer.innerHTML = questions;

    // Add event listener for Submit button
    document.getElementById('submit-afrotech').addEventListener('click', function() {
      handleAfroTechSubmit();
    });
  }

  // Handle "AfroTech" Submit
  function handleAfroTechSubmit() {
    const sessionInterest = document.getElementById('session-interest').value;
    const feedback = document.getElementById('event-feedback').value;

    // Process the AfroTech survey responses
    console.log('Session Interest:', sessionInterest);
    console.log('Feedback:', feedback);

    // Trigger celebration animation and sound
    triggerCelebration();

    // Optionally, redirect or perform other actions
    // Example: window.location.href = 'thank-you.html';
  }

  // Display "Us" Questions (Placeholder)
  function displayUsQuestions() {
    const questions = `
      <div class="question">
        <label for="team-collaboration">How would you rate our team collaboration?</label>
        <input type="range" id="team-collaboration" name="team-collaboration" min="0" max="2" step="1" oninput="updateCollaborationLabel(this.value)">
        <span id="collaboration-label">0 🤝</span>
      </div>

      <div class="question">
        <label for="improvement-suggestions">Any suggestions for improvement?</label>
        <textarea id="improvement-suggestions" name="improvement-suggestions" rows="4"></textarea>
      </div>

      <button id="submit-us">Submit</button>
    `;

    questionsContainer.innerHTML = questions;

    // Add event listener for Submit button
    document.getElementById('submit-us').addEventListener('click', function() {
      handleUsSubmit();
    });
  }

  // Update "How would you rate our team collaboration?" label with emojis
  window.updateCollaborationLabel = function(value) { // Exposed globally for inline oninput
    const label = document.getElementById('collaboration-label');
    if (value == 0) {
      label.textContent = '0 🤝';
    } else if (value == 1) {
      label.textContent = '1 👍';
    } else if (value == 2) {
      label.textContent = '2 🚀';
    }
  }

  // Handle "Us" Submit
  function handleUsSubmit() {
    const collaboration = document.getElementById('team-collaboration').value;
    const suggestions = document.getElementById('improvement-suggestions').value;

    // Process the Us survey responses
    console.log('Team Collaboration:', collaboration);
    console.log('Suggestions:', suggestions);

    // Trigger celebration animation and sound
    triggerCelebration();

    // Optionally, redirect or perform other actions
    // Example: window.location.href = 'thank-you.html';
  }
});
