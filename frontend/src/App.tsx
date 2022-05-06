import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import Routes from "pages/Routes";
import { useRecoilValue } from "recoil";
import { toggleThemeAtom } from "atoms";
import React, { FC, ReactNode, useEffect, useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import { Outlet } from "react-router-dom";

const App: FC = () => {
  const isDark = useRecoilValue(toggleThemeAtom);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Context>
        <GlobalStyle />
        <Routes />
        {/* <Content /> */}
      </Context>
    </ThemeProvider>
  );
};

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  useEffect(() => {
    console.log(wallets);
  }, [wallets]);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Outlet />
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

const Content: FC = () => {
  return <WalletMultiButton />;
};

export default App;
