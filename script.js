const form = document.querySelector("#student-form");
const nameInput = document.querySelector("#student-name");
const courseInput = document.querySelector("#student-course");
const studentList = document.querySelector("#student-list");
const studentCount = document.querySelector("#student-count");
const message = document.querySelector("#message");

let students = [
  { name: "Asha Rao", course: "Computer Science" },
  { name: "Rahul Das", course: "Information Technology" }
];

function renderStudents() {
  studentList.replaceChildren();

  if (students.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty";
    emptyItem.textContent = "No students yet. Add one above!";
    studentList.appendChild(emptyItem);
  }

  students.forEach((student, index) => {
    const item = document.createElement("li");

    const info = document.createElement("div");
    info.className = "student-info";

    const name = document.createElement("strong");
    name.textContent = student.name;

    const course = document.createElement("span");
    course.textContent = student.course;

    info.append(name, course);

    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.setAttribute("aria-label", `Remove ${student.name}`);
    removeButton.addEventListener("click", () => {
      students.splice(index, 1);
      renderStudents();
      message.textContent = `${student.name} was removed.`;
    });

    item.append(info, removeButton);
    studentList.appendChild(item);
  });

  studentCount.textContent =
    `${students.length} ${students.length === 1 ? "student" : "students"}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const course = courseInput.value.trim();

  if (!name || !course) {
    message.textContent = "Please enter both a name and a course.";
    return;
  }

  students.push({ name, course });
  renderStudents();
  form.reset();
  nameInput.focus();
  message.textContent = `${name} was added successfully.`;
});

renderStudents();
