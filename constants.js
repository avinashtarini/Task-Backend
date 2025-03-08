const nameMinLength = process.env.MIN_TASK_NAME_LENGTH;
const nameMaxLength = process.env.MAX_TASK_NAME_LENGTH;
const descriptionMinLength = process.env.MIN_TASK_DESCRIPTION_LENGTH;
const descriptionMaxLength = process.env.MAX_TASK_DESCRIPTION_LENGTH;
const userNameMinLength = process.env.MIN_USERNAME_LENGTH;
const userNameMaxLength = process.env.MAX_USERNAME_LENGTH;

export const constants = {
  userNameMinCharErr: `Username cannot be less than ${userNameMinLength}`,
  userNameMaxCharErr: `Username cannot be more than ${userNameMaxLength}`,
  passwordAlert:
    "Password must be 8 characters with at least 1 Uppercase letter , 1 Lowercase letter,1 Number and1 Special character",
  emailAlert: "Invalid email",
  emailAlreadyRegistered: "Email already registered",
  userCreated: "User created successfully",
  noUserWithEmailAlert: "There is no user registered with this email",
  invalidPassword: "Invalid Password",
  loginSuccess: "Logged Successfully",
  taskNameMinCharError: `Name cannot be less than ${nameMinLength}`,
  taskNameMaxCharError: `Name cannot be more than ${nameMaxLength}`,
  taskDescriptionMinCharErr: `Description cannot be less than ${descriptionMinLength}`,
  taskDescriptionMaxCharErr: `Description cannot be more than ${descriptionMaxLength}`,
  taskCreated: "Task created successfully",
  taskUpdated: "Task updated successfully",
  taskDeleted: "Task updated successfully",
  taskFetched: "Fetched successfully",
  createdByIsEmpty: "createdBy key is empty",
  idIsEmpty: "id is empty",
  unAuthorized: "Unauthorized access",
  tokenMissMatch: "Unauthorized access, Token mismatch",
  userNotFount: "user not found",
  emailRegex: "^(?![_.])[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$",
  passwordRegex: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[W_]).{8,}$/",
};

export const emailRegex =
  "^(?![_.])[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$";
export const passwordRegex = `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W_]).{8,}$`;
