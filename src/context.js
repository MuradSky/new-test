import { createContext, useContext } from "react";
import { useContactsData } from "./hook/actions";

const ContactsContext = createContext(null);

export const ContactsProvider = ({ children }) => {
  const store = useContactsData();
  return (
    <ContactsContext.Provider value={store}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsStore = () => {
  const context = useContext(ContactsContext);
  return context;
};
