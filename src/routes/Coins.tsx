import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./api";

const Container = styled.div`
  padding: 0 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    transition: color 0.2s ease-in;
    display: block;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  vertical-align: middle;
`;

const ToggleBtn = styled.button`
  width: 80px;
  height: 32px;
  border-radius: 25px;
  border: 1px solid ${(props) => props.theme.textColor};
  background: none;
  padding: 0;
  padding: 0 3px;
  outline: none;
  margin-top: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;

  &.light {
    justify-content: end;
  }
`;

const CircleBtn = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.textColor};
`;

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

interface IToggle {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

function Coins({ setToggle }: IToggle) {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async() => {
  //     const response = await fetch("http://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  const [toggleCircle, setToggleCircle] = useState("");

  const onClickToggle = () => {
    setToggle((prev) => !prev);
    
    if(toggleCircle === "") {
      setToggleCircle("light");
    }else{
      setToggleCircle("");
    }
  }

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <ToggleBtn className={toggleCircle} onClick={onClickToggle}>
        <CircleBtn />
      </ToggleBtn>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? <Loader>"Loading..."</Loader> : (
        <CoinsList>
        {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: { name: coin.name },
              }}>
                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={`${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;