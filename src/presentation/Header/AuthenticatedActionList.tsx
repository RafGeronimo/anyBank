import { toast } from "react-toastify";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { IconAvatar } from "../../components/Icons";
import { TransparentButton } from "../../components/TransparentButton";
import { List, ListItem } from "./styles";
import { useNavigate } from "react-router";

const AuthenticatedActionList = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const onAskForLogout = () => {
    try {
      logout();
      toast.success("Deslogado com sucesso, volte sempre!");
      navigate("/auth/login");
    } catch (error) {
      console.log("Falha ao deslogar", error);
      toast.error("Não foi possível efetuar o logout!");
    }
  };

  return (
    <List>
      <ListItem>Bem vindo!</ListItem>
      <ListItem>
        <IconAvatar />
      </ListItem>
      <ListItem>
        <TransparentButton onClick={onAskForLogout}>Logout</TransparentButton>
      </ListItem>
    </List>
  );
};

export default AuthenticatedActionList;
