let postedJobs = [];
let editingId = null;

const STORAGE_KEY = 'jobFinder.postedJobs';
const form = document.getElementById("jobForm");
const jobsList = document.getElementById("jobsList");

function saveJobsToStorage(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(postedJobs));}catch(e){console.warn('Could not save jobs to localStorage',e);}}
function loadJobsFromStorage(){try{const raw=localStorage.getItem(STORAGE_KEY);postedJobs=raw?JSON.parse(raw):[];}catch(e){postedJobs=[];console.warn('Could not load jobs from localStorage',e);}}

if(form)form.addEventListener('submit',e=>{e.preventDefault();const imageInput=document.getElementById('jobImage');const file=imageInput&&imageInput.files?imageInput.files[0]:null;const title=document.getElementById('jobTitle').value.trim();const company=document.getElementById('companyName').value.trim();const location=document.getElementById('location').value.trim();const salary=document.getElementById('salary').value.trim();const jobType=document.getElementById('jobType').value.trim();const experience=document.getElementById('experience').value.trim();const description=document.getElementById('description').value.trim();const placeholderImage=encodeURI('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400"><rect width="100%" height="100%" fill="%23222226"/><text x="50%" y="50%" fill="%23b9b9b9" font-family="Arial,Helvetica,sans-serif" font-size="28" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>');function processJobWithImage(imageData){const job={id:editingId||Date.now(),title,company,location,salary,jobType,experience,description,image:imageData||placeholderImage};submitJob(job);}if(file){const reader=new FileReader();reader.onload=function(ev){processJobWithImage(ev.target.result);};reader.readAsDataURL(file);}else if(editingId){const existingJob=postedJobs.find(j=>j.id===editingId)||{};processJobWithImage(existingJob.image||placeholderImage);}else{processJobWithImage(placeholderImage);} });

/* ----- ADD / UPDATE JOB ----- */
function submitJob(job){if(editingId){const i=postedJobs.findIndex(j=>j.id===editingId);postedJobs[i]=job;editingId=null;if(form)form.querySelector('button').innerText='Post This Job';alert('Job updated!');}else{postedJobs.push(job);alert('Job posted successfully!');}if(form)form.reset();saveJobsToStorage();displayJobs();}

/* ----- DISPLAY JOBS ----- */
function displayJobs(){
  if(!jobsList) return;
  if(postedJobs.length===0){ jobsList.innerHTML='<p>No jobs posted yet.</p>'; return; }
  jobsList.innerHTML = postedJobs.map(job=>`
    <div class="job-card">
      <img src="${job.image}" alt="${job.title}">
      <div class="job-content">
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
      </div>
    </div>
  `).join('');
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
  const imgInput = document.getElementById("jobImage");
  if (imgInput) imgInput.value = "";

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
    saveJobsToStorage();
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
loadJobsFromStorage();
displayJobs();
