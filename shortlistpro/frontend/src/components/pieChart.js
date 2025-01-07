// PieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ title, refresh }) => {
    const [interviewedCount, setInterviewedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const fetchStatistics = async () => {
        try {
            const response = await axios.get('http://localhost:8001/api/v1/candidates/statistics');
            setInterviewedCount(response.data.interviewed);
            setTotalCount(response.data.total);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    useEffect(() => {
        fetchStatistics(); // Fetch statistics when component mounts or when refresh prop changes
    }, [refresh]);

    const remainingCount = totalCount - interviewedCount;
    const percentage = totalCount > 0 ? ((interviewedCount / totalCount) * 100).toFixed(2) : 0;

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
                display: false,
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
