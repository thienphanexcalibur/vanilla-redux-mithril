import m from "mithril";
import reducer from './reducer';

/**
 * A redux-like store management for Mithril
 * Author: Thien Phan | thienphan@cococc.com
 */

class Store {
  constructor(state, reducer, namespace) {
    this.state = state;
    this.prevState = state;
    this.reducer = reducer;
    this.reducer._callbacks = [];
    this.dispatch = this.dispatch.bind(this);
    this.namespace = namespace;
    this.connect = this.connect.bind(this);
    this.getState = this.getState.bind(this);
  }
  subscribe(callback) {
    // Subscribe middlewares
    const idxCb = this.reducer._callbacks.push(callback);
    return () => this.reducer._callbacks.splice(idxCb - 1, 1);
  }

  getState() {
    return this.state;
  }

  connect(mappedFunc = () => {}, opts = {}) {
    const context = this;
    let root;
    if (opts.hasOwnProperty("root")) {
      root = opts.root;
    }
    const _state = {
      get newState() {
        return mappedFunc(context.getState());
      },
    };

    return (component) =>
      function () {
        return {
          view(vnode) {
            return m(component, { ..._state.newState, ...vnode.attrs });
          },
        };
      };
  }

  dispatch(actionType) {
    this.prevState = { ...this.state };
    this.state = this.reducer(actionType, this.state);
    if (this.reducer._callbacks && this.reducer._callbacks.length > 0) {
      this.reducer._callbacks.map((callback) => callback(actionType));
    }
  }
}


/* Define initial state, hydrate */
const initialState = {
  count: 0,
  todo: {
    items: [],
  },
};


/* Init Store */
const store = new Store(initialState, reducer);

//  Middlewares
const unsub = store.subscribe((actionType) => {
  console.log("Mutate", {
    type: actionType.type,
    payload: actionType.payload,
  });
});

// Logger
store.subscribe((action) => {
  console.log(`ACTION: ${action.type} : MUTATION`, action.payload);
  console.log(store.getState());
});

const { dispatch, connect, subscribe } = store;

export { store, dispatch, connect, subscribe };
