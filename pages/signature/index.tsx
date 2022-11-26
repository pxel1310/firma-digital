import { Layout } from "../../components/layouts";
import { NextPage } from "next";

import { SignatureBox } from "../../components/swr/SignatureBox";
import { useContext } from "react";
import { AuthContext } from "../../context";

export const CipherPage: NextPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Layout title="Signature - Form" pageDescription="">
      {isLoggedIn ? <SignatureBox /> : <h1>Debes iniciar sesión</h1>}
    </Layout>
  );
};

export default CipherPage;
