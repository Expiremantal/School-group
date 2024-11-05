import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios'; // Import Axios

// Register the ArcElement and other necessary components
Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ title }) => {
    const [interviewedCount, setInterviewedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    
    // Fetch statistics from your API
    const fetchStatistics = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/candidates/statistics');
            setInterviewedCount(response.data.interviewed);
            setTotalCount(response.data.total);
        } catch (error) {
            console.error("Error fetching statistics:", error);
        }
    };

    useEffect(() => {
        fetchStatistics(); // Fetch statistics when the component mounts
    }, []);

    // Calculate remaining candidates for the pie chart
    const remainingCount = totalCount - interviewedCount;
    const percentage = totalCount > 0 ? ((interviewedCount / totalCount) * 100).toFixed(2) : 0; // Calculate percentage

    const data = {
        labels: ['Interviewed', 'Remaining'],
        datasets: [
            {
                data: [interviewedCount, remainingCount],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide legend if you don't want it
            },
        },
    };

    return (
        <div className="pie-chart-container">
            <h3>{title}</h3>
            <Pie data={data} options={options} />
            <p>{interviewedCount} ({percentage}%)</p>
        </div>
    );
};

export default PieChart;
