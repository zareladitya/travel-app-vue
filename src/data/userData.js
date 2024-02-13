const users = [];

const saveUserData = () => {
  localStorage.setItem('users', JSON.stringify(users));
};

const loadUserData = () => {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users.push(...JSON.parse(storedUsers));
  }
};

const removeUserData = () => {
  localStorage.removeItem('users');
}


export { users, saveUserData, loadUserData, removeUserData };