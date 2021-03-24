import store from '../store';

// Subscribe middleware for mutation listening
store.subscribe((action) => {
  console.log(`ACTION: ${action.type} : MUTATION`, action.payload);
  console.log(store.getState());
});

