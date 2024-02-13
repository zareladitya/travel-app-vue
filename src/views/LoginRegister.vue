<script setup>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import router from '@/router';
import { users, saveUserData, loadUserData, removeUserData } from '@/data/userData.js';
import { user, userEmail, userPassword } from '@/data/userState'; 


const containerRef = ref(null);
const isActive = ref(false);
let timeoutId;

const alertData = ref({
  title: null,
  message: null,
  type: null,
  timeoutId: null
});
const toggleContainer = (type) => {
  isActive.value = type === 'register';
};

const userData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

onMounted(() => {
    loadUserData();
    document.body.style.overflow = 'hidden';

    document.querySelectorAll('input').forEach(input => {
        input.value = "";

        // Add event listener for the "focusout" event
        input.addEventListener('focusout', function() {
            // Check if the input value is not empty
            if (this.value !== "") {
                // Add the "has-content" class
                this.classList.add("has-content");
            } else {
                // Remove the "has-content" class
                this.classList.remove("has-content");
            }
        });
    });

    window.scrollTo(0,0);
});


onUnmounted(() => {
    document.body.style.overflow = 'auto';
    
    router.push('/');
});

const loginData = {
  email: '',
  password: ''
};


const registerUser = () => {
  if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
    showAlert('Error', 'Please fill in all fields', 'danger');
    return;
  }

  if (userData.password !== userData.confirmPassword) {
    showAlert('Error', 'Passwords do not match', 'danger');
    return;
  }

  const newUser = { ...userData };
  users.push(newUser);

//   resetError();
  showAlert('Success', `User ${userData.name} has been registered!`, 'success');
  saveUserData();

  toggleContainer('login');
};

const loginUser = () => {
  if (!loginData.email || !loginData.password) {
    showAlert('Error', 'Please fill in all fields', 'danger');
    return;
  }

  const matchingUser = users.find((user) => user.email === loginData.email && user.password === loginData.password);

  if (!matchingUser) {
    showAlert('Error', 'Invalid email or password', 'danger');
    return;
  }
  user.value = matchingUser.name;
  userEmail.value = matchingUser.email;
  userPassword.value = matchingUser.password;
  //   resetError();

  //Redirecting to home page ('/') when user login data matches the register data
  showAlert('Success','Login successfully!', 'success');
  console.log('User matching : ' + matchingUser.name);
  console.log('Userdata name : ' + userData.name);
  console.log('User logindata email : ' + loginData.email);
  console.log('User value : ' + user.value)

//   clearTimeout(timeoutId);
//   timeoutId = setTimeout(() => {
//       router.push('/');
//   }, 15000);
};


const showAlert = (title, message, type, timeout = 5000) => {
  alertData.value = { title, message, type, timeoutId: null };
  alertData.value.timeoutId = setTimeout(resetAlert, timeout);
};

const resetAlert = () => {
  clearTimeout(alertData.value.timeoutId);
  alertData.value = { title: null, message: null, type: null, timeoutId: null };
};

const closeAlert = () => {
  resetAlert();
};


</script>


<template>
<div class="login-page section__margin">
    <div class="back-icon">
        <RouterLink to="/">
            <IconArrowLeft width="30"/>
        </RouterLink>
    </div>
    <div v-if="alertData.title" :class="`absolute alert alert-${alertData.type}`">
      <div class="alert__content">
        <h3 class="fw-600">{{ alertData.title }}</h3>
        <p>{{ alertData.message }}</p>
      </div>
      <button class="" @click="closeAlert()"><i class="ri-close-line icon-30"></i></button>
    </div>
<div class="login pd-2">
    <div class="container" :id="container"  :class="{ 'active': isActive }" ref="containerRef">
        <div class="form-container sign-up" v-show="isActive">
      <form @submit.prevent="registerUser">
        <h1>Create Account</h1>
        <input v-model="userData.name" type="text" placeholder="Name" required>
        <input v-model="userData.email" type="email" placeholder="Email" required>
        <input v-model="userData.password" type="password" placeholder="Password" required>
        <input v-model="userData.confirmPassword" type="password" placeholder="Confirm Password" required>
        <button type="submit">Sign Up</button>
      </form>
    </div>

    <div class="form-container sign-in" v-show="!isActive">
      <form @submit.prevent="loginUser">
        <h1>Sign In</h1>
        <div class="input-group">
            <input v-model="loginData.email" type="email" required :class="{ filled: loginData.email }">
            <label class="placeholder">Email</label>
        </div>
        <div class="input-group">
            <input v-model="loginData.password" type="password"  required>
            <label class="placeholder">Password</label>
        </div>
        <a href="#">Forget Your Password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>

        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1 class="fw-600">Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button class="hidden" :id="login" @click="toggleContainer('login')">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1 class="fw-600">Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button class="hidden" :id="register" @click="toggleContainer('register')">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<style scoped>

a:hover {
    background-color: transparent;
}
.section__margin{
    margin: 2rem;
}
.login{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.form-container h1{
    color: #000;
    margin-bottom: 1rem;
}
.container{
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.container p{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

.container span{
    font-size: 12px;
}

.container a{
    color: #333;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
}

.container button{
    background-color: var(--color-blue);
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
}

.container button.hidden{
    background-color: transparent;
    border-color: #fff;
}

.container form{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
}

.container input{
    background-color: #fff;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: 1.5px solid #d5d5d5;
}

.form-container{
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in{
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.active .sign-in{
    transform: translateX(100%);
}

.sign-up{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.active .sign-up{
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
}

@keyframes move{
    0%, 49.99%{
        opacity: 0;
        z-index: 1;
    }
    50%, 100%{
        opacity: 1;
        z-index: 5;
    }
}

.social-icons{
    margin: 20px 0;
}

.social-icons a{
    border: 1px solid #ccc;
    border-radius: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    width: 40px;
    height: 40px;
}

.toggle-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 150px 0 0 100px;
    z-index: 100;
}

.container.active .toggle-container{
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
}

.toggle{
    background-color: var(--color-dark-blue);
    height: 100%;
    background: linear-gradient(to right, var(--color-blue), var(--color-dark-blue));
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.container.active .toggle{
    transform: translateX(50%);
}

.toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.toggle-left{
    transform: translateX(-200%);
}

.container.active .toggle-left{
    transform: translateX(0);
}

.toggle-right{
    right: 0;
    transform: translateX(0);
}

.container.active .toggle-right{
    transform: translateX(200%);
}


.input-group {
    position: relative;
    margin-bottom: 0.4rem;
}

.input-group input {
    min-width: 16rem;
    max-width: 20rem;
}

.placeholder{
    position: absolute;
    top: 15px;
    left: 8px;
    color: #d5d5d5;
    font-size: 13px;
    padding: 0 6px;
    transition: all 0.3s;
}
.input-group input:focus + .placeholder,
.input-group input.has-content + .placeholder {
    top: -7px;
    background-color: #fff;
    color: var(--color-lighter-blue);
}

.input-group input:focus,
.input-group input.has-content{
    outline: 1.5px solid var(--color-lighter-blue);
}

</style>