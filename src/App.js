import "./styles.css";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Contacts } from "./components/index";
import { ContactForm } from "./components/ContactForm";
import { ContactsProvider } from "./context";

export default function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Контакты</h1>
      </div>
      <ContactsProvider>
        <Router>
          <Switch>
            <Route path="/" component={Contacts} exact />
            <Route path="/add" component={ContactForm} />
            <Route path="/edit/:id" component={ContactForm} />
          </Switch>
        </Router>
      </ContactsProvider>
    </div>
  );
}
