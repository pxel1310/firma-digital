import { useContext } from "react";

import { AuthContext } from "../../context";
import { useSignatures, useUsers } from "../../hooks";

import { Layout } from "../../components/layouts";

import { FirmaBox } from "../../components/swr/FirmaBox";
import { FullScreenLoading } from "../../components/ui";

export const SharePage = () => {
  const { user, isLoggedIn } = useContext(AuthContext);

  const { dataSigs, isLoading1 } = useSignatures({
    refreshInterval: 60 * 1000,
  });
  const { users, isLoading3 } = useUsers({
    refreshInterval: 60 * 1000,
  });

  if (!isLoggedIn) {
    return <h1>Debes iniciar sesión para ver esta página</h1>;
  }

  return (
    <Layout
      title={"AES - Share"}
      pageDescription={"Comparte tus mensajes cifrados"}
    >
      {isLoading1 && isLoading3 ? (
        <FullScreenLoading />
      ) : (
        <FirmaBox data={dataSigs} users={users} />
      )}
    </Layout>
  );
};

export default SharePage;
