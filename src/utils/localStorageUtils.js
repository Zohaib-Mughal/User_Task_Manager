// Validate Email
export function isEmail(data) {
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  return emailRegex.test(data);
}

// Get all users
export function getAllUsers() {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
  } catch {
    localStorage.setItem("users", JSON.stringify([]));
    return [];
  }
}

// Add new user
export function addUser(data) {
  const users = getAllUsers();

  const emailExists = users.some((user) => user.email === data.email);
  if (emailExists) {
    return "emailExist";
  }

  const usernameExists = users.some((user) => user.username === data.username);
  if (usernameExists) {
    return "usernameExist";
  }

  users.unshift(data);
  localStorage.setItem("users", JSON.stringify(users));

  return "success";
}

// Validate Login
export function validateLogin(key, password) {
  const users = getAllUsers();
  return users.some((user) => {
    if (isEmail(key)) {
      return user.email === key && user.password === password;
    } else {
      return user.username === key && user.password === password;
    }
  });
}

//Check LoggedIn user
export function checkUser(username, email) {
  const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedIn) return false;

  return loggedIn.key === username || loggedIn.key === email;
}

// Delete user
export function deleteUser(username, email) {
  let users = getAllUsers();
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  users = users.filter(
    (user) => !(user.username === username && user.email === email)
  );

  tasks = tasks.map((task) =>
    task.assignTo === username ? { ...task, assignTo: "Unassigned" } : task
  );

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  return users;
}

//Deleet Task
export function deleteTask(title) {
  let tasks = getAllTasks();
  tasks = tasks.filter((task) => task.title !== title);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return tasks;
}
// Add Task
export const addTask = (task) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskExists = tasks.some(
    (t) => t.title.toLowerCase() === task.title.toLowerCase()
  );
  if (taskExists) return "exist";

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  return "success";
};

export function getAllTasks() {
  try {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  } catch {
    localStorage.setItem("tasks", JSON.stringify([]));
    return [];
  }
}

export function isLoggedIn() {
  const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedIn) {
    return true;
  }
  return false;
}
// Update User
export function updateUser(updatedUser, originalUsername, originalEmail) {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if username already exists (excluding the current user being updated)
  const usernameExists = users.some(
    (user) =>
      user.username === updatedUser.username &&
      user.username !== originalUsername
  );

  if (usernameExists) {
    return "usernameExist";
  }

  // Check if email already exists (excluding the current user being updated)
  const emailExists = users.some(
    (user) => user.email === updatedUser.email && user.email !== originalEmail
  );

  if (emailExists) {
    return "emailExist";
  }

  // Update the user
  users = users.map((user) =>
    user.username === originalUsername && user.email === originalEmail
      ? updatedUser
      : user
  );

  console.log("Updated Users: ", users);
  localStorage.setItem("users", JSON.stringify(users));

  return "success";
}

//Update TAssk
export function updateTask(updatedTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.map((task) =>
    task.title === updatedTask.title ? updatedTask : task
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));
  return "success";
}

export function stripHtmlTags(html) {
  return html.replace(/<[^>]*>?/gm, "").trim();
}
