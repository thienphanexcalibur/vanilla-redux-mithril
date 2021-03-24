import m from 'mithril';
import Todo from '../components/todo';
import Input from '../components/input';

const App = {
  view() {
    return m("div", [m(Input), m(Todo)]);
  }
};

export default App;


