import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }:ChartProps ) {
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), { refetchInterval: 5000 });

  return (
    <div>
      {isLoading ? ("Loading chart...") : (
        <ApexChart
          type="candlestick"
          series={[{
            data: data?.map((price) => ({
              x: price.time_close,
              y: [price.open, price.high, price.low, price.close],
            }))
          }]}
          options={{
            chart: {
              type: 'candlestick',
              height: 350,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            title: {
              text: 'CandleStick Chart',
              align: 'left'
            },
            xaxis: {
              type: 'datetime',
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            yaxis: {
              show: false,
            },
            theme: {
              mode: "dark",
            },
          }}
        />
      // <ApexChart 
      //   type="line"
      //   series={[
      //     {
      //       name: "Price",
      //       data: data?.map((price) => price.close),
      //     },
      //   ]}
      //   options={{
      //     theme: {
      //       mode: "dark",
      //     },
      //     chart: {
      //       height: 300,
      //       width: 500,
      //       toolbar: {
      //         show: false,
      //       },
      //       background: "transparent",
      //     },
      //     grid: { show: false },
      //     stroke: {
      //       curve: "smooth",
      //       width: 4,
      //     },
      //     yaxis: {
      //       show: false,
      //     },
      //     xaxis: {
      //       axisBorder: { show: false },
      //       axisTicks: { show: false },
      //       labels: { show: false },
      //       type: "datetime",
      //       categories: data?.map((price) => price.time_close),
      //     },
      //     fill: {
      //       type: "gradient",
      //       gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
      //     },
      //     colors: ["#0fbcf9"],
      //     tooltip: {
      //       y: {
      //         formatter: (value) => `$${value.toFixed(2)}`,
      //       },
      //     },
      //   }}
      // />
      )}
    </div>
  );
}

export default Chart;