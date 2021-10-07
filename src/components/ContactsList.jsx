import { Link } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Item = ({ id, name, phone, email, deleteContact }) => (
  <li>
    <div className="contact-list__item">
      <span>{name}</span>
      <span>
        <a href={'tel:' + phone}>{phone}</a>
      </span>
      <span>
        <a href={'mailto:' + email}>{email}</a>  
      </span>
    </div>
    <div className="contact-list__item">
      <Link to={"/edit/" + id}>
        <AiOutlineEdit />
      </Link>
      <AiOutlineDelete onClick={deleteContact} />
    </div>
  </li>
);

export const ContactsList = ({ contacts, deleteContact }) => (
  <>
    <div className="contact-list__header">
      <span>Имя</span>
      <span>Телефон</span>
      <span>Email</span>
    </div>
    { contacts.length === 0 ? <p>Нет контактов</p> :
      <ul>
        {contacts.map((x) => (
          <Item
            key={x.id}
            id={x.id}
            name={x.name}
            phone={x.phone}
            email={x.email}
            deleteContact={() => deleteContact(x.id)}
          />
        ))}
      </ul>
    }
    <Link to="/add">Добавить контакт</Link>
  </>
);
