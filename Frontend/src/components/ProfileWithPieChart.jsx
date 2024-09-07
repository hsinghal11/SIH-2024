import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./inventory.css";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import Rating from "@mui/material/Rating";
// import { Button } from "@mui/material";
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// import Swal from "sweetalert2";
// import EditStockPrice from "./inventory_edit";
import BASE_URL from '../Server/base_url';

const ProfileWithPieChart = () => {
  // Sample data for the pie chart
  const dataa = [
    { name: 'Cereals', value: 60 },
    { name: 'Fresh', value: 40 },
  ];
  let token = localStorage.getItem("token");
  const [data, setData] = useState("");

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/inventory/show`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const json = await response.json();
        setData(json.product);
        console.log(data); // Handle the fetched data here
      } catch (error) {
        console.log(error.message);
      }
    };

    getItems(); // Call the getItems function when component mounts
  }, []);

  // Colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Profile Photo and Name */}
      <div style={{ marginRight: '20px', textAlign: 'center' }}>
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          style={{ borderRadius: '50%', width: '100px', height: '100px' }}
        />
        <h3>{data.owner}</h3>
      </div>

      {/* Pie Chart */}
      <div style={{ width: '200px', height: '200px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={dataa}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {dataa.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {/* Tooltip for hover effect */}
            <Tooltip formatter={(value, name) => `${value}% ${name}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfileWithPieChart;
