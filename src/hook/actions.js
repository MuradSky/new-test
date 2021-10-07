import { useReducer, useCallback, useEffect } from "react";
import shortid from "shortid";
import { reducers } from "./reducers";

const baseUrl = 'http://localhost:4000/contacts'

const init = {
  contacts: null,
  failed: false
};


export const useContactsData = () => {
  const [state, dispatch] = useReducer(reducers, init);

  const  getContacts = () => {
    fetch(baseUrl)
      .then(res => {
        if(res.ok) return res.json().then(data => dispatch({ type: "getContacts", payload: { contacts: data } }))
        dispatch({ type: "failedFetch", payload: { failed: true } })
      })
      .catch(err=> dispatch({ type: "failedFetch", payload: { failed: true } }))
  }

  useEffect(()=> {
    getContacts()
  }, [dispatch])

  const addAndEditContacts = useCallback(
    async (val, id = null) => {

      const url = id ? baseUrl + '/' + id : baseUrl
      const httpMethod = id ? 'PUT' : 'POST'

      const newId = shortid()
      const contact = {
        id: id || newId,
        name: val.name,
        phone: val.phone,
        email: val.email
      }
      
      await fetch(url, {
          method: httpMethod,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contact)
      })
      .then(res => res.json())
      .then(() => getContacts())
    },
    []
  );

  const deleteContacts = useCallback(
    async (id) => {
      await fetch(baseUrl + '/' + id, { method: 'DELETE' })
        .then(res=> res.ok ? getContacts() : null)
    },
    []
  );

  return { state, addAndEditContacts, deleteContacts };
};
