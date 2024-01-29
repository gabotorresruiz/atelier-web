import { FC, useEffect, useState } from 'react';
import Menu from '../Menu';
import Image from '../Image';
import Icon from '../icon/Icon';
import FlexBox from '../FlexBox';
import NavLink from '../nav-link';
import MenuItem from '../MenuItem';
import Container from '../Container';
import { Small } from '../Typography';
import StyledTopbar from './styles';

const languageList = [
  { title: 'EN', imgUrl: '/assets/images/flags/usa.png' },
  { title: 'BN', imgUrl: '/assets/images/flags/bd.png' },
  { title: 'HN', imgUrl: '/assets/images/flags/in.png' }
];

const currencyList = [
  { title: 'USD', imgUrl: '/assets/images/flags/usa.png' },
  { title: 'EUR', imgUrl: '/assets/images/flags/uk.png' },
  { title: 'BDT', imgUrl: '/assets/images/flags/bd.png' },
  { title: 'INR', imgUrl: '/assets/images/flags/in.png' }
];

const Topbar: FC = () => {
  const [currency, setCurrency] = useState(currencyList[0]);
  const [language, setLanguage] = useState(languageList[0]);

  const handleCurrencyClick = (curr: typeof currency) => () => setCurrency(curr);

  const handleLanguageClick = (lang: typeof language) => () => setLanguage(lang);

  useEffect(() => {
    // get language from browser
    // console.log(navigator.language);
  }, []);

  return (
    <StyledTopbar>
      <Container display="flex" justifyContent="space-between" alignItems="center" height="100%">
        <FlexBox className="topbar-left">
          <div className="logo">
            <Image src="/assets/images/logo.svg" alt="logo" />
          </div>
          <FlexBox alignItems="center">
            <Icon size="14px">phone-call</Icon>
            <span>+88012 3456 7894</span>
          </FlexBox>

          <FlexBox alignItems="center" ml="20px">
            <Icon size="14px">mail</Icon>
            <span>support@ui-lib.com</span>
          </FlexBox>
        </FlexBox>
      </Container>
    </StyledTopbar>
  );
};

export default Topbar;
