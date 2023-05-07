import * as yup from 'yup';

const REGEX_PASSWORD = /[a-z0-9]/;

yup.addMethod(yup.string, 'password', (message) => {
  return yup.string().matches(REGEX_PASSWORD, {
    message,
    excludeEmptyString: true
  });
});
