export const selectClassification = classification =>{
  return {
    type: 'CLASSIFICATION_SELECTED',
    payload: classification
  };
};

