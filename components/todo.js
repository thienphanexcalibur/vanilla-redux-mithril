import m from "mithril";
import { connect } from "../store";


export default connect((state) => ({
  items: state.todo.items
}))({
  view(vnode) {
    const { items } = vnode.attrs;
    return m('ul', items.map((item) => m('li', item.text)));
  }
});
