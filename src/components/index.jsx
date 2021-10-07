import { Alert } from "antd";
import { useContactsStore } from "../context";
import { ContactsList } from "./ContactsList";

export const Contacts = () => {
  const {
    state: { contacts, failed },
    deleteContacts
  } = useContactsStore();
  
  const deleteContact = (id) => deleteContacts(id);

  return (
    <div className="contact-list">
      {contacts ? 
        <ContactsList contacts={contacts} deleteContact={deleteContact} /> :
        failed ? 
        <Alert type="error" message="Сервер временно не доступен"/> : 
        <p>Загрузка...</p>
      }
      <br />
    </div>
  );
};
