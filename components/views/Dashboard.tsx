import React from 'react';
import Card, { CardTitle, CardContent } from '../ui/Card';
import { students, attendance, emergencyRequests, alerts } from '../../constants';
import { Emotion } from '../../types';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAttendance = attendance.filter(a => {
        const attDate = new Date(a.timestamp);
        attDate.setHours(0, 0, 0, 0);
        return attDate.getTime() === today.getTime();
    });

    const attendanceRate = (todayAttendance.length / students.length) * 100;
    const pendingRequests = emergencyRequests.filter(r => r.status === 'Pending').length;
    const activeAlerts = alerts.length; // Assuming all alerts in mock are active

    const emotionCounts = todayAttendance.reduce((acc, curr) => {
        acc[curr.emotion] = (acc[curr.emotion] || 0) + 1;
        return acc;
    }, {} as Record<Emotion, number>);

    const emotionData = Object.entries(emotionCounts).map(([name, value]) => ({ name, value }));
    const PIE_COLORS = { [Emotion.Happy]: '#22c55e', [Emotion.Tired]: '#f59e0b', [Emotion.Sad]: '#ef4444' };

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        return d.toLocaleDateString('vi-VN', { weekday: 'short' });
    }).reverse();

    const attendanceTrendData = last7Days.map(dayLabel => {
        const count = attendance.filter(a => new Date(a.timestamp).toLocaleDateString('vi-VN', { weekday: 'short' }) === dayLabel).length;
        return { name: dayLabel, 'Số học sinh': count };
    });

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Bảng điều khiển tổng quan</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardTitle>Tỷ lệ điểm danh hôm nay</CardTitle>
                    <CardContent className="mt-2">
                        <p className="text-4xl font-bold text-primary-600">{attendanceRate.toFixed(1)}%</p>
                        <p className="text-sm text-gray-500">{todayAttendance.length} trên {students.length} học sinh</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardTitle>Yêu cầu hỗ trợ gấp</CardTitle>
                    <CardContent className="mt-2">
                        <p className={`text-4xl font-bold ${pendingRequests > 0 ? 'text-danger-600' : 'text-success-600'}`}>{pendingRequests}</p>
                        <p className="text-sm text-gray-500">yêu cầu đang chờ xử lý</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardTitle>Cảnh báo hệ thống</CardTitle>
                    <CardContent className="mt-2">
                        <p className={`text-4xl font-bold ${activeAlerts > 0 ? 'text-warning-600' : 'text-gray-700'}`}>{activeAlerts}</p>
                        <p className="text-sm text-gray-500">cảnh báo đang hoạt động</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardTitle>Cảm xúc hôm nay</CardTitle>
                    <CardContent className="mt-2">
                         <div className="flex items-center space-x-2">
                            <span className="text-2xl">😊</span><span className="text-lg font-semibold">{emotionCounts[Emotion.Happy] || 0}</span>
                            <span className="text-2xl">😴</span><span className="text-lg font-semibold">{emotionCounts[Emotion.Tired] || 0}</span>
                            <span className="text-2xl">😔</span><span className="text-lg font-semibold">{emotionCounts[Emotion.Sad] || 0}</span>
                        </div>
                        <p className="text-sm text-gray-500">phân bố cảm xúc đã ghi nhận</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardTitle>Xu hướng điểm danh (7 ngày qua)</CardTitle>
                    <CardContent className="mt-4 h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={attendanceTrendData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="Số học sinh" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardTitle>Phân bố cảm xúc (Hôm nay)</CardTitle>
                    <CardContent className="mt-4 h-80">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                {/* FIX: Explicitly convert percent to a number before multiplication to prevent type errors. */}
                                <Pie data={emotionData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(Number(percent ?? 0) * 100).toFixed(0)}%`}>
                                    {emotionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name as Emotion]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;