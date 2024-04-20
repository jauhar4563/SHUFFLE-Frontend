import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { chartData } from "../../services/api/admin/apiMethods";

const ApexChart: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [options] = useState<any>({
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value: any, timestamp: any, opts: any) {
          return opts.dateFormatter(new Date(value), "MMM yyyy");
        },
      },
    },
    title: {
      text: "User Growth",
      align: "left",
      style: {
        fontSize: "16px",
        color: "#666",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#7E3AF2"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    yaxis: {
      min: 0,
    },
  });

  useEffect(() => {
    // Fetch data from backend API
    chartData()
      .then((response: any) => {
        setUserData(response.data.map((item: any) => ({
          month: new Date(item._id).toISOString(), // Convert month to ISO string
          userCount: item.userCount,
        })));
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const series = [
    {
      name: "Users Joined",
      data: userData.map((data) => [new Date(data.month).getTime(), data.userCount]),
    },
  ];

  return (
    <>
      <div id="chart" className="ms-20 mt-5 items-center w-5/6">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </>
  );
};

export default ApexChart;
