import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const storage = loadFromLocalStorage('feedback-form-state');

// console.log(storage);

function formFill(obj) {
  if (obj) {
    refs.form.elements.email.value = obj.email;
    refs.form.elements.message.value = obj.message;
  } else {
    refs.form.elements.email.value = '';
    refs.form.elements.message.value = '';
  }
}

formFill(storage);

refs.form.addEventListener('input', throttle(handleInput, 500));
refs.form.addEventListener('submit', handleSubmit);

function handleInput() {
  const obj = {
    email: refs.form.elements.email.value,
    message: refs.form.elements.message.value,
  };
  saveToLocalStorage('feedback-form-state', obj);
}

function handleSubmit(evt) {
  evt.preventDefault();

  if (!refs.form.elements.email.value || !refs.form.elements.message.value) {
    alert('Всі поля мають бути заповнені');
    return;
  }

  console.log(loadFromLocalStorage('feedback-form-state'));
  localStorage.removeItem('feedback-form-state');
  refs.form.reset();
}

function saveToLocalStorage(key, value) {
  try {
    const localStorageValue = JSON.stringify(value);
    localStorage.setItem(key, localStorageValue);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

function loadFromLocalStorage(key) {
  try {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue === null ? undefined : JSON.parse(localStorageValue);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}
