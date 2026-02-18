let postedJobs = [];
let editingId = null;

const form = document.getElementById("jobForm");
const jobsList = document.getElementById("jobsList");

/* ----- FORM SUBMIT ----- */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const imageInput = document.getElementById("jobImage");
  const file = imageInput.files[0];

  const title = document.getElementById("jobTitle").value.trim();
  const company = document.getElementById("companyName").value.trim();
  const location = document.getElementById("location").value.trim();
  const salary = document.getElementById("salary").value.trim();
  const jobType = document.getElementById("jobType").value.trim();
  const experience = document.getElementById("experience").value.trim();
  const description = document.getElementById("description").value.trim();

  if (file) {

    const reader = new FileReader();

    reader.onload = function(event) {

      const job = {
        id: editingId || Date.now(),
        title,
        company,
        location,
        salary,
        jobType,
        experience,
        description,
        image: event.target.result
      };

      submitJob(job);
    };

    reader.readAsDataURL(file);

  } 
  else if (editingId) {

    const existingJob = postedJobs.find(j => j.id === editingId);

    const job = {
      id: editingId,
      title,
      company,
      location,
      salary,
      jobType,
      experience,
      description,
      image: existingJob.image
    };

    submitJob(job);

  } 
  else {
    alert("Please select an image file!");
  }
});

/* ----- ADD / UPDATE JOB ----- */
function submitJob(job) {

  if (editingId) {

    const index = postedJobs.findIndex(j => j.id === editingId);
    postedJobs[index] = job;

    editingId = null;
    form.querySelector("button").innerText = "Post This Job";
    alert("Job updated!");

  } else {

    postedJobs.push(job);
    alert("Job posted successfully!");
  }

  form.reset();
  displayJobs();
}

/* ----- DISPLAY JOBS ----- */
function displayJobs() {

  jobsList.innerHTML = "";

  if (postedJobs.length === 0) {
    jobsList.innerHTML = "<p>No jobs posted yet.</p>";
    return;
  }

  postedJobs.forEach(job => {

    const card = document.createElement("div");
    card.className = "job-card";

    card.innerHTML = `
      <img src="${job.image}" alt="${job.title}">
      <h3>${job.title}</h3>
      <p><b>Company:</b> ${job.company}</p>
      <p><b>Location:</b> ${job.location}</p>
      <p><b>Salary:</b> ${job.salary}</p>
      <p><b>Job Type:</b> ${job.jobType}</p>
      <p><b>Experience:</b> ${job.experience}</p>
      <p>${job.description}</p>

      <div class="card-actions">
        <button class="btn-edit" onclick="editJob(${job.id})">Edit</button>
        <button class="btn-delete" onclick="deleteJob(${job.id})">Delete</button>
      </div>
    `;

    jobsList.appendChild(card);
  });
}

/* ----- EDIT JOB ----- */
function editJob(id) {

  const job = postedJobs.find(j => j.id === id);

  document.getElementById("jobTitle").value = job.title;
  document.getElementById("companyName").value = job.company;
  document.getElementById("location").value = job.location;
  document.getElementById("salary").value = job.salary;
  document.getElementById("jobType").value = job.jobType;
  document.getElementById("experience").value = job.experience;
  document.getElementById("description").value = job.description;
  document.getElementById("jobImage").value = "";

  editingId = id;
  form.querySelector("button").innerText = "Update Job";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* ----- DELETE JOB ----- */
function deleteJob(id) {

  if (confirm("Delete this job?")) {

    postedJobs = postedJobs.filter(j => j.id !== id);
    displayJobs();

    alert("Job deleted!");
  }
}

/* ----- CONTACT FORM ALERT ----- */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! We will contact you soon.");
    contactForm.reset();
  });
}

/* ----- INITIAL LOAD ----- */
displayJobs();
