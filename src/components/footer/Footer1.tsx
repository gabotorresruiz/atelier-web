import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Box from '@component/Box';
import Image from '@component/Image';
import Grid from '@component/grid/Grid';
import Container from '@component/Container';
import Typography from '@component/Typography';
import Branding from '@models/branding.model';
import { colors } from '@utils/themeColors';

// styled component
const StyledGrid = styled(Grid)`
  justify-content: space-between;

  @media screen and (max-width: 900px) {
    padding-bottom: 50px;
  }
`;

const StyledLeftGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15%;
`;

const StyledLogoWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;

  @media screen and (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

const StyledLogoImage = styled(Image)`
  width: 55%;
  height: auto;

  @media screen and (min-width: 500px) {
    width: 40%;
  }

  @media screen and (min-width: 800px) {
    width: 50%;
  }

  @media screen and (min-width: 1024px) {
    width: 55%;
  }
`;

const StyledContactGrid = styled(Grid)`
  text-align: center;

  @media screen and (min-width: 800px) {
    text-align: left;
  }
`;

type Footer1Props = {
  brandingResource: Branding;
};

const Footer1: FC<Footer1Props> = ({ brandingResource }) => (
  <footer>
    <Box bg="secondary.main">
      <Container p="1rem" color="white">
        <Box py="1rem" overflow="hidden">
          <StyledGrid container spacing={6}>
            <StyledLeftGrid item lg={4} md={6} sm={12} xs={12}>
              <Link href="/">
                <a>
                  <StyledLogoWrapper>
                    <StyledLogoImage src={brandingResource.logoImageUrl} alt="logo" />
                  </StyledLogoWrapper>
                </a>
              </Link>
            </StyledLeftGrid>
            <StyledContactGrid item lg={3} md={6} sm={12} xs={12}>
              <Typography mb="1.25rem" lineHeight="1" fontSize="25px" fontWeight="600">
                Contactanos
              </Typography>
              <Typography py="0.3rem" color="gray.white">
                Dirección: {brandingResource.address}
              </Typography>
              <Typography py="0.3rem" color="gray.white">
                Email:{' '}
                <a
                  style={{ color: colors.gray.white, textDecoration: 'underline' }}
                  href={`mailto:${brandingResource.email}`}
                >
                  {brandingResource.email}
                </a>
              </Typography>
              <Typography py="0.3rem" mb="1rem" color="gray.white">
                Teléfono: {brandingResource.phone}
              </Typography>
            </StyledContactGrid>
          </StyledGrid>
        </Box>
      </Container>
    </Box>
  </footer>
);

export default Footer1;
