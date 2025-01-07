import PieChart from './pieChart'; // Adjust the path as necessary

const StatsContainer = () => {
    return (
        <div className="stats-container">
            <PieChart title="Under consideration" value={256} percentage={20} />
            <PieChart title="Interviews scheduled" value={20} percentage={5} />
            <PieChart title="Rejected" value={6} percentage={5} />
        </div>
    );
};

export default StatsContainer;
