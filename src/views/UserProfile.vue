<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import VueDatePicker from '@vuepic/vue-datepicker';
import { user, userEmail, userPassword } from '@/data/userState'; 
import { removeUserData, loadUserData } from '@/data/userData';
import '@vuepic/vue-datepicker/dist/main.css';
import Navbar from '@/components/Navbar.vue';

// Define reactive references for component data
const date = ref();
const isOpen = ref(false);
const selectedGender = ref('Select Gender');
const gender = ['Male', 'Female', 'Prefer not to say'];
const username = ref(user);
const usernameDraft = ref(null);
const email = ref(userEmail);
const showPassword = ref(false);

const router = useRouter();

// Function to toggle dropdown menu
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

// Function to select option in dropdown menu
const selectOption = (option) => {
    selectedGender.value = option;
    isOpen.value = false;
};

// Function to filter input
const filterInput = (event) => {
    const allowedChars = /[a-zA-Z\s'-]/;
    if (!allowedChars.test(event.key)) {
        event.preventDefault();
    }
};

// Function to update username
const updateUsername = (event) => {
    usernameDraft.value = event.target.value;
};

// Function to save changes
const saveChanges = () => {
    username.value = usernameDraft.value;
};

// Function to cancel changes
const cancelChanges = () => {
    usernameDraft.value = username.value;
};

// Function to check if changes are made
const isChanged = () => {
    return usernameDraft.value !== username.value;
};

// Function to delete account
const deleteAccount = () => {
    removeUserData();
    window.location.reload();
    router.push("/")
    localStorage.setItem('redirectRoute', '/');
};

// Load user data when component is mounted
onMounted(() => {
    loadUserData();
    usernameDraft.value = username.value;
});
</script>


<template>
<Navbar/>
<section class="user-profile pd-4">
    <h1 class="fw-600">Settings</h1>
    <div class="personal-data-container sm-top-1">
        <h3 class="fw-600">Personal Data</h3>
        <div class="personal-data-details" v-if="user">
            <label for="username">Full Name</label>
            <input type="text" id="username" v-model="usernameDraft" @keydown="filterInput" @input="updateUsername">
            <p class="tc-grey">Your full name will also appear as your profile name</p>
            <div class="flex fd-row gap">
                <div class="personal-data__gender">
                    <label for="gender">Gender</label>
                    <div class="gender-select-wrapper" @click="toggleDropdown">
                    <div class="selected-option">
                        <p>{{ selectedGender }}</p>
                    </div>
                    <ul class="dropdown-menu" v-if="isOpen">
                        <li v-for="option in gender" :key="option" @click="selectOption(option)">{{ option }}</li>
                    </ul>
                    </div>
                </div>
                <div class="personal-data__birthdate">
                    <label for="birthdate">Your Birthdate</label>
                    <VueDatePicker v-model="date" :enable-time-picker="false" placeholder="Birthdate" /> 
                </div>
            </div>
            <label for="location">City or Province</label>
            <input type="text" name="location" id="location">
            <div class="personal-data__cta-container">
                <button :class="{'cancel-active' : isChanged()}" @click="cancelChanges">Cancel</button>
                <button :class="{'save-active' : isChanged()}" @click="saveChanges">Save Changes</button>
            </div>
        </div>
        <p v-else>Please log in to view your profile</p>
    </div>

    <div class="account-settings-container sm-top-1">
        <h3 class="fw-600">Account Settings</h3>
        <div class="account-settings-details" v-if="user">
            <label for="">Email Address</label>
            <p>Your email address is <span class="fw-600">{{ email }}</span></p>
            <label for="">Password</label>
            <div class="flex fd-row gap">
                <input type="password" :placeholder="password" :value="password">
                <input type="password" :placeholder="password" :value="password">
            </div>
            <div class="account-settings__cta-container">
                <button :class="{'cancel-active' : isChanged()}" @click="cancelAccChanges">Cancel</button>
                <button :class="{'save-active' : isChanged()}" @click="saveAccChanges">Save Changes</button>
            </div>
            <div class="account-settings__cta-delete-container">
                <label for="">Delete Account</label>
                <p class="fw-200">Are you sure you want to delete your account?</p>
                <button class="btn tc-white bg-red" @click="deleteAccount(email.value)">Delete Account</button>
            </div>
        </div>
        <p v-else>Please log in to view your account</p>
    </div>
</section>
</template>

<style>
.user-profile{
    width: 100%;
    background-color: var(--color-lightest-grey);
}
.user-profile label{
    padding: 0;
    margin-top: 0.5rem;
}

.personal-data-container,
.account-settings-container{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.personal-data-details,
.account-settings-details{
    width: 100%;
    border-top: 1px solid #000;
    padding-top: 1rem;
}
.personal-data-details input,
.account-settings-details input{
    height: 2.5rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    width: 100%;
    font-size: 1rem;
    letter-spacing: 0.3px;
}
input.dp__input{
    padding: 1rem 2rem;
}
.personal-data-details input::placeholder{
    color: var(--color-grey);
}

.personal-data__birthdate, .personal-data__gender{
    width: 100%;
}

.gender-select-wrapper {
    position: relative;
    cursor: pointer;
}

.selected-option {
    height: 2.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
}
.selected-option p {
    padding: 0.5rem;
    font-size: 15px;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    background-color: #fff;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 0.25rem 0.25rem;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    
}

.dropdown-menu li {
    padding: 0.5rem;
    cursor: pointer;
}

.dropdown-menu li:hover {
    background-color: #f3f3f3;
}
.dropdown-menu.show {
    max-height: 150px /* Adjust as needed */
}

.personal-data__cta-container,
.account-settings__cta-container{
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}
.personal-data__cta-container button,
.account-settings__cta-container button {
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    opacity: 50%;
}
.personal-data__cta-container .cancel-active{
    background-color: var(--color-lightest-grey);
    opacity: 100%;
    color: var(--color-light-blue);
}
.personal-data__cta-container .save-active{
    background-color: var(--color-blue);
    opacity: 100%;
    color: #fff;
}

.account-settings__cta-delete-container{
    border-top: 1px solid var(--color-grey);
    width: 100%;
    margin-top: 1rem;
    padding-top: 1rem;
}

.account-settings__cta-delete-container button{
    margin-top: 1rem;
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
}

</style>