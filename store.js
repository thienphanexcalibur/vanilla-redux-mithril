import m from 'mithril';

class Store {
    constructor(state, reducer, namespace) {
        this.state = state;
        this.reducer = reducer;
        this.reducer._callbacks = [];
        this.dispatch = this.dispatch.bind(this);
        this.namespace = namespace;
        this.connect = this.connect.bind(this, this.state);
        this.getState = this.getState.bind(this);
    }
    subscribe(callback) {
        // Subscribe middlewares
        const idxCb = this.reducer._callbacks.push(callback);
        return () => this.reducer._callbacks.splice(idxCb - 1, 1);
    }
    getState() {
        return this.state
    }

    connect(state, mappedFunc) {
        let isEmpty = false;
        const context = this;
        return (component => ({
            view(vnode) {
                return m(component, mappedFunc(mappedFunc(context.getState())));
            }
        }));
    }

    dispatch(actionType) {
        // Fire all middlewares
        if (this.reducer._callbacks && this.reducer._callbacks.length > 0) {
            this.reducer._callbacks.map(_callback => _callback(actionType));
        }
        this.state = this.reducer(actionType, this.state);
    }
}

const initialState = {
    count: 0,
    todo: {
        items: []
    }
}

function storeReducer(action, state) {
    const type = action.type;
    switch (type) {
        case 'ADD_TODOS': {
            return Object.assign({}, state, {
                todo: [...state.todo.items, action.payload]
            })
        }

        case 'INCREMENT': {
            return Object.assign({}, state, {
                count: state.count + action.payload
            });
        }

        default: {
            return state;
        }
    }
}

const actions = {
    increment(payload) {
        return {
            type: 'INCREMENT',
            payload
        }
    },
    addItems(payload) {
        return {
            type: 'ADD_TODOS',
            payload
        }
    }
}

const store = new Store(initialState, storeReducer);
const unsub = store.subscribe((actionType) => {
    console.log('Mutate', {
        type: actionType.type,
        payload: actionType.payload
    })
});

store.dispatch(actions.addItems({
    text: 'aaaa'
}));

console.log(store.state);
