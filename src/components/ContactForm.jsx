import { Form, Input, Button } from "antd";
import MaskedInput from "antd-mask-input";
import { Link, useHistory, useParams } from "react-router-dom";
import { useContactsStore } from "../context";

export const ContactForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const {
    state: { contacts },
    addAndEditContacts,
  } = useContactsStore();

  const onFinish = (values) => {
    console.log(values)
    history.push("/");
    if (!id) addAndEditContacts(values);
    if (id) addAndEditContacts(values, id);
  };

  const user = id ? contacts.find((x) => x.id === id) : null;

  const fields = user && [
    {
      name: ['name'],
      value: user.name,
    },
    {
      name: ['phone'],
      value: user.phone,
    },
    {
      name: ['email'],
      value: user.email,
    }
  ]

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      className="contact-form"
      fields={fields}
    >
      <Form.Item
        label="Имя"
        name="name"
        rules={[{ required: true, message: "Это важное поле" }]}
        
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: "Это важное поле" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Телефон"
        name="phone"
        rules={[{ required: true, message: "Это важное поле" }]}
      >
        <MaskedInput
          mask="+7 (111) 111-11-11"
          name="phone"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
        <Link to="/">Отмена</Link>
      </Form.Item>
    </Form>
  );
};
