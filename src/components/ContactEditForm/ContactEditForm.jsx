import * as Yup from "yup";
import { useId } from "react";
import MaskedInput from "react-text-mask";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./ContactEditForm.module.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { editContact } from "../../redux/contactsOps";
import { setCurentContact } from "../../redux/contactsSlice";

const ContsctSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(
      /^\d{3}-\d{3}-\d{4}$/,
      "Phone number must be in the format 777-777-7777"
    )
    .required("Required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ContactEditForm = ({ id, name, number, email }) => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const numberFieldId = useId();
  const emailFieldId = useId();

  const handleSubmit = (values, actions) => {
    dispatch(editContact({ ...values, id }));

    actions.resetForm();
  };

  const closeEdit = () => {
    dispatch(setCurentContact(null));
  };

  return (
    <Formik
      initialValues={{ name, number, email }}
      onSubmit={handleSubmit}
      validationSchema={ContsctSchema}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          <button onClick={closeEdit} className={styles.btnClose} type="button">
            <IoMdClose />
          </button>
          <div className={styles.formItem}>
            <label className={styles.formItemLabel} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              className={styles.field}
              type="text"
              name="name"
              id={nameFieldId}
              placeholder="Anna Kuper"
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.formItem}>
            <label className={styles.formItemLabel} htmlFor={numberFieldId}>
              Number
            </label>
            <MaskedInput
              mask={[
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
              ]}
              value={values.number}
              onChange={(event) => setFieldValue("number", event.target.value)}
              placeholder="777-777-7777"
              className={styles.field}
              name="number"
              id={numberFieldId}
            />
            <ErrorMessage
              name="number"
              component="span"
              className={styles.errorMessage}
            />
          </div>
          <div className={styles.formItem}>
            <label className={styles.formItemLabel} htmlFor={emailFieldId}>
              Email
            </label>
            <Field
              className={styles.field}
              type="email"
              name="email"
              id={emailFieldId}
              placeholder="example@gmail.com"
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.errorMessage}
            />
          </div>
          <button className={styles.btn} type="submit">
            <span>Save contact</span>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactEditForm;
