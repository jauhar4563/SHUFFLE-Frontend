import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { chartData } from "../../services/api/admin/apiMethods";

const ApexChart: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [postData, setPostData] = useState<any[]>([]);

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
      text: "User Growth and Post Creation",
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
        gradientToColors: ["#7E3AF2", "#3BA55D"], // Purple and Green
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
    chartData()
      .then((response: any) => {
        const { userJoinStats, postCreationStats } = response.data;

        // Set user data
        setUserData(userJoinStats.map((item: any) => ({
          month: new Date(item._id).toISOString(), // Convert month to ISO string
          userCount: item.userCount,
        })));

        // Set post data
        setPostData(postCreationStats.map((item: any) => ({
          month: new Date(item._id).toISOString(),
          postCount: item.postCount,
        })));
        console.log(userJoinStats);
        console.log(postCreationStats)
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });

  }, []);

  const userSeries = [
    {
      name: "Users Joined",
      data: userData.map((data) => [new Date(data.month).getTime(), data.userCount]),
    },
  ];

  const postSeries = [
    {
      name: "Posts Created",
      data: postData.map((data) => [new Date(data.month).getTime(), data.postCount]),
    },
  ];

  return (
    <>
      <div id="chart" className="ms-20 mt-5 items-center w-5/6">
        <ReactApexChart
          options={options}
          series={userSeries.concat(postSeries)}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </>
  );
};

export default ApexChart;
