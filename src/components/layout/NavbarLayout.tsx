import { FC, ReactNode } from 'react';
import Container from '@component/Container';
import Navbar from '@component/navbar/Navbar';
import AppLayout from './AppLayout';

// ======================================================
type Props = { children: ReactNode };
// ======================================================

const NavbarLayout: FC<Props> = ({ children }) => (
  <AppLayout navbar={<Navbar />}>
    <Container my="2rem">{children}</Container>
  </AppLayout>
);

export default NavbarLayout;
