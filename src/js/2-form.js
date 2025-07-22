const refs = {
  form: document.querySelector('.feedback-form'),
};

let formData = {
  email: '',
  message: '',
};

const fillFeedbackForm = feedbackForm => {
  try {
    const feedbackFormLS = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );

    if (feedbackFormLS === null) {
      return;
    }

    Object.assign(formData, feedbackFormLS);

    const feedbackFormLSKeys = Object.keys(feedbackFormLS);

    feedbackFormLSKeys.forEach(key => {
      refs.form.elements[key].value = feedbackFormLS[key];
    });
  } catch (err) {
    console.log(err);
  }
};

fillFeedbackForm(formData);

const onFormInput = evn => {
  const { email, message } = evn.currentTarget;
  formData.email = email.value.trim();
  formData.message = message.value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const onFormSubmit = evn => {
  evn.preventDefault();
  if (
    evn.currentTarget.email.value === '' ||
    evn.currentTarget.message.value === ''
  ) {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  evn.target.reset();
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
};

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);