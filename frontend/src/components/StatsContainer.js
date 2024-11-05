import PieChart from './pieChart'; // Adjust the path as necessary

const StatsContainer = () => {
    return (
        <div className="stats-container">
            <PieChart title="Interviews" value={256} percentage={20} />
            <PieChart title="Shortlisted" value={20} percentage={5} />
            <PieChart title="Hired" value={6} percentage={5} />
        </div>
    );
};

export default StatsContainer;
