// thunk
export const addItems = (payload) => {
  return {
    type: "ADD_TODOS",
    payload,
  };
};

