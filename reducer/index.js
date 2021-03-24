export default function reducer(action, state) {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TODOS": {
      return Object.assign({}, state, {
        todo: {
          items: [...state.todo.items, payload],
        }
      });
    }

    default: {
      return state;
    }
  }
}
