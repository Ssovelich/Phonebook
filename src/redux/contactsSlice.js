import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  contacts: [],
};

// export const contactsReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case "contacts/addContact": {
//       return { ...state, contacts: [...state.contacts, action.payload] };
//     }
//     case "contacts/deleteContact": {
//       return {
//         ...state,
//         contacts: state.contacts.filter(
//           (contact) => contact.id !== action.payload
//         ),
//       };
//     }
//     default:
//       return state;
//   }
// };

// Створюємо slice

const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

//Генеруємо reducer
export const contactsReducer = contactsSlice.reducer;
//Генеруємо функцію команди
export const { addContact, deleteContact } = contactsSlice.actions;
