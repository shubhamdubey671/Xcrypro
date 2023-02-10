import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Button,
  Container,
  HStack,
  
} from "@chakra-ui/react";
import { useState } from "react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCart from "./CoinCart";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");


  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true)
  }

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}coins/markets?vs_currency=${currency}&page=${page}`
        );
        console.log(data);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error while fethcing Coins"} />;

  return (
    <Container maxW={"95%"} >
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCart
                id={i.id}
                key={i.id}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
                price={i.current_price}
              />
            ))}
          </HStack>

          <HStack p={4} justifyContent={"flex-end"} w={"98%"} >
            <Button bgColor={"blackAlpha.900"} color={"white"} onClick={() => changePage(page + 1)} css={{
              "&:hover": {
                backgroundColor:"#203de5",
                transform: " scale(1.1)",
              },
            }} >
              Next Page
            </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
