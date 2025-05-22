import { useState } from "react";
import { Button } from "../../components/Button";
import { Fieldset } from "../../components/Fieldset";
import { Figure, Form, FormActions, Heading, Image } from "../../components/Form";
import { FormLabel } from "../../components/FormLabel";
import { TextField } from "../../components/TextField";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const loginUser = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(credentials);
    try {
      await login(credentials.email, credentials.password);
      toast.success("Seja bem vindo ao anyBank");
      navigate("/");
    } catch (error) {
      console.error("Falha ao logar");
      toast.error("Falha ao efetuar login. Confirme se e-mail e senha");
    }
  };

  return (
    <>
      <Figure>
        <Image src="/imgs/login.png" />
      </Figure>
      <div>
        <Heading>Login</Heading>
        <p>Preencha os dados do login.</p>
        <Form onSubmit={loginUser}>
          <Fieldset>
            <FormLabel>Email</FormLabel>
            <TextField
              name="email"
              type="email"
              placeholder="Digite seu email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </Fieldset>
          <Fieldset>
            <FormLabel>Senha</FormLabel>
            <TextField
              name="password"
              type="password"
              placeholder="Digite sua senha"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </Fieldset>
          <FormActions>
            <Button type="submit">Efetuar login</Button>
          </FormActions>
        </Form>
      </div>
    </>
  );
};
