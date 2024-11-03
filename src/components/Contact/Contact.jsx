import styles from "./Contact.module.css";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import { setCurentContact } from "../../redux/contactsSlice";

const Contact = ({ name, number, id, created, email, contact }) => {
  const dispatch = useDispatch();

  const onDeleteContact = (id) => {
    const action = deleteContact(id);
    dispatch(action);
  };

  const onEditContact = (id) => {
    const action = setCurentContact({ id, name, number, email });
    dispatch(action);
  };

  return (
    <>
      <li className={styles.contactListItem}>
        <div>
          <p className={styles.info}>
            <FaUser className={styles.icon} />
            &nbsp;
            {name}
          </p>
          <p className={styles.info}>
            <FaPhone className={styles.icon} />
            &nbsp;
            {number}
          </p>
          <p className={styles.email}>
            <MdEmail className={styles.icon} />
            &nbsp;
            {email}
          </p>
          <p className={styles.created}>
            Updated: {created.substring(0, 10)} {created.substring(11, 19)}
          </p>
        </div>

        <button
          className={styles.btnDel}
          onClick={() => {
            onDeleteContact(id);
          }}
        >
          <MdDelete />
        </button>
        <button
          className={styles.btnEdit}
          onClick={() => {
            onEditContact(id, contact);
          }}
        >
          <CiEdit />
        </button>
      </li>
    </>
  );
};

export default Contact;
