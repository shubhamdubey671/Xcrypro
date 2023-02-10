import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import Loader from "./Loader";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";
const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [days,setDays]=useState("24h ")
  const [chartArray,setChartArray]=useState([])
  const params = useParams();


  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1year", "max"];


  const switchChartStats=(key)=>{
      switch(key){
        case "24h":
          setDays("24h")
          setLoading(true);
        break;
        case "7d":
          setDays("7d")
          setLoading(true);
        break;
        case "14d":
          setDays("14d")
          setLoading(true);
        break;
        case "30d":
          setDays("30d")
          setLoading(true);
        break;
        case "60d":
          setDays("60d")
          setLoading(true);
        break;
        case "1year":
          setDays("365d")
          setLoading(true);
        break;
        case "200d":
          setDays("200d")
          setLoading(true);
        break;
        case "max":
          setDays("max")
          setLoading(true);
        break;
        default:
          setDays("24h")
          setLoading(true);
        break;
      }
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}coins/${params.id}`);
        const { data:chartData} = await axios.get(`${server}coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoin(data);
        setChartArray(chartData.prices)
        setLoading(false);
        console.log(data);
        console.log(chartData.prices)
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id,days]);
  const currency = "inr";
  const currencySymbol = "₹";
  if (error) return <ErrorComponent message={"Error while fethcing Coin"} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            <Chart arr={chartArray} days={days} currency={currencySymbol} />
          </Box>

          

          <HStack p="4" justifyContent={"space-between"}  overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>


          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
              Last Updated On{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image
              src={coin.image.large}
              width={"16"}
              height={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol} {coin.market_data.current_price["inr"]}
              </StatNumber>

              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h["inr"]}`}
            />
            <Box w={"full"}>
                 <Item title={"Max Supply"} value={coin.market_data.max_supply} ></Item>
                 <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} ></Item>
                 <Item title={"Market Capital"} value={` ${currencySymbol}${coin.market_data.market_cap[currency]}`} ></Item>
                 <Item title={"All Time High"} value={` ${currencySymbol}${coin.market_data.ath[currency]}`} ></Item>
                 <Item title={"All Time Low"} value={` ${currencySymbol}${coin.market_data.atl[currency]}`} ></Item>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};


const Item=({title,value})=>(
<HStack justifyContent={"space-between"} my={"4"} w="full" >
  <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"} >{title}</Text>
  <Text>{value}</Text>
</HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetails;
