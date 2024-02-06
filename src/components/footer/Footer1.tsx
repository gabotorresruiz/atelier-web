import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Box from '@component/Box';
import Image from '@component/Image';
import Grid from '@component/grid/Grid';
import Icon from '@component/icon/Icon';
import FlexBox from '@component/FlexBox';
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
  justify-content: flex-start;
`;

const StyledLogoImage = styled(Image)`
  width: 55%;
  height: auto;
`;

// const iconList = [
//   { iconName: 'facebook', url: 'https://www.facebook.com/UILibOfficial' },
//   { iconName: 'twitter', url: '/' },
//   {
//     iconName: 'youtube',
//     url: 'https://www.youtube.com/channel/UCsIyD-TSO1wQFz-n2Y4i3Rg'
//   },
//   { iconName: 'google', url: '/' },
//   { iconName: 'instagram', url: '/' }
//   { iconName: 'linkedin', url: '/' }
// ];

type Footer1Props = {
  brandingResource: Branding;
};

const Footer1: FC<Footer1Props> = ({ brandingResource }) => (
  <footer>
    <Box bg="secondary.main">
      <Container p="1rem" color="white">
        <Box py="1rem" overflow="hidden">
          <StyledGrid container spacing={6}>
            <StyledLeftGrid item lg={4} md={6} sm={6} xs={12}>
              <Link href="/">
                <a>
                  <StyledLogoWrapper>
                    <StyledLogoImage src={brandingResource.logoImageUrl} alt="logo" />
                  </StyledLogoWrapper>
                </a>
              </Link>
              {/* <FlexBox className="flex" mx="-5px">
                {iconList.map((item) => (
                  <a href={item.url} target="_blank" key={item.iconName} rel="noreferrer noopener">
                    <Box m="5px" p="10px" size="small" borderRadius="50%" bg="rgba(0,0,0,0.2)">
                      <Icon size="12px" defaultcolor="auto">
                        {item.iconName}
                      </Icon>
                    </Box>
                  </a>
                ))}
              </FlexBox> */}
            </StyledLeftGrid>
            <Grid item lg={3} md={6} sm={6} xs={12}>
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
            </Grid>
          </StyledGrid>
        </Box>
      </Container>
    </Box>
  </footer>
);

export default Footer1;
