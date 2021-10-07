export const reducers = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "getContacts":
      return {
        ...state,
        contacts: payload.contacts
      };
    case "failedFetch":
      return {
        ...state,
        failed: payload.failed
      };
    default:
      return state;
  }
};
