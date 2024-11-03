import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import ContactForm from "./ContactForm/ContactForm";
import ContactEditForm from "./ContactEditForm/ContactEditForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import Loader from "./Loader/Loader";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contactsOps";
import {
  selectCuretnContact,
  selectError,
  selectLoading,
} from "../redux/contactsSlice";

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const curetnContact = useSelector(selectCuretnContact);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      <h1>Phonebook</h1>
      {!curetnContact ? (
        <ContactForm />
      ) : (
        <ContactEditForm {...curetnContact} />
      )}
      <SearchBox />
      {isLoading && <Loader />}
      {error && (
        <p>
          Oops, some error occured &quot;{error}&quot;. Please, try again later
          🤷‍♂️.
        </p>
      )}
      <ContactList />
    </div>
  );
}

export default App;
