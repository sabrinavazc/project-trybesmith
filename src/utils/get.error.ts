const getError = (errorMessage: string): boolean => {
  const errorMessageSplitted = errorMessage.split(' ');
  
  const unprocessableWords = ['must'];
  
  return errorMessageSplitted.some((word) => unprocessableWords.includes(word));
};
  
export default getError;