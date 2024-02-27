import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import Box from '../Box';
import Icon from '../icon/Icon';
import { Button } from '../buttons';
import TextField from '../text-field';
import SearchBoxStyle from './styled';

const SearchInput: FC = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/product/search/${searchValue}`);
  };

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <form onSubmit={handleSearch}>
        <SearchBoxStyle>
          <Icon className="search-icon" size="18px">
            search
          </Icon>

          <TextField
            fullwidth
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-field"
            placeholder="Busca un producto..."
          />

          <Button className="search-button" variant="contained" btnColor="primary" type="submit">
            Buscar
          </Button>

          <Box className="menu-button" ml="14px" cursor="pointer">
            <Icon color="primary">menu</Icon>
          </Box>
        </SearchBoxStyle>
      </form>
    </Box>
  );
};

export default SearchInput;
