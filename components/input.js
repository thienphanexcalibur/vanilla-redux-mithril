import m from 'mithril';
import { dispatch } from "../store";
import { addItems } from "../actions";

const Input = {
  inputValue: '',
  addItem() {
    dispatch(addItems({
      text: this.inputValue
    }));
  },
  view(vnode) {
    return m("div", [
      m('input', {
        onchange: (e) => vnode.state.inputValue = e.target.value,
        value: vnode.state.inputValue
      }),
      m(
        "button",
        {
          onclick: () => this.addItem()
        },
        "Add"
      ),
    ]);
  }
};

export default Input;
