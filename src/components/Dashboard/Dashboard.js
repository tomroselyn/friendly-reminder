import React from 'react';
import DashboardStats from './DashboardStats';
import DashboardCardList from './DashboardCardList';
import './Dashboard.css';

const Dashboard = () => (
    <div className="dashboardContainer">
        <DashboardStats />
        <DashboardCardList />
    </div>
)

export default Dashboard;