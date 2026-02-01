export const errormessage = (message, statusCode, sucessStatus) => {
  return ({ message: message, success: sucessStatus }, { status: statusCode });
};
