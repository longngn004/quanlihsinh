import React, { useState, useMemo } from 'react';
import Card, { CardTitle, CardContent } from '../ui/Card';
import { students as initialStudents, teachers as initialTeachers, counselors as initialCounselors, attendance, notes, emergencyRequests, alerts } from '../../constants';
import type { Emotion, Student, User } from '../../types';
import { UserRole } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

type Tab = 'attendance' | 'emotions' | 'notes' | 'requests' | 'alerts' | 'data-management';
type DataManagementTab = 'students' | 'teachers' | 'counselors';

// Generic editable table component
const EditableTable = ({ title, columns, data, setData, rowType }: any) => {
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [rowData, setRowData] = useState<any>(null);

    const handleEdit = (row: any) => {
        setEditingRowId(row.id);
        setRowData({ ...row });
    };

    const handleCancel = () => {
        setEditingRowId(null);
        setRowData(null);
    };

    const handleSave = () => {
        setData((prevData: any) => prevData.map((row: any) => (row.id === editingRowId ? rowData : row)));
        handleCancel();
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowData({ ...rowData, [e.target.name]: e.target.value });
    };

    return (
        <Card>
            <CardTitle>{title}</CardTitle>
            <CardContent className="mt-4">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                {columns.map((col: any) => <th key={col.key} scope="col" className="px-6 py-3">{col.label}</th>)}
                                <th scope="col" className="px-6 py-3">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row: any) => (
                                <tr key={row.id} className="bg-white border-b hover:bg-gray-50">
                                    {columns.map((col: any) => (
                                        <td key={col.key} className="px-6 py-4">
                                            {editingRowId === row.id ? (
                                                <input
                                                    type="text"
                                                    name={col.key}
                                                    value={rowData[col.key]}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                />
                                            ) : (
                                                row[col.key]
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4">
                                        {editingRowId === row.id ? (
                                            <div className="flex space-x-2">
                                                <button onClick={handleSave} className="font-medium text-green-600 hover:underline">Lưu</button>
                                                <button onClick={handleCancel} className="font-medium text-gray-600 hover:underline">Hủy</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => handleEdit(row)} className="font-medium text-blue-600 hover:underline">Sửa</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};


const DataManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<DataManagementTab>('students');
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [teachers, setTeachers] = useState<User[]>(initialTeachers);
    const [counselors, setCounselors] = useState<User[]>(initialCounselors);

    const studentCols = [
        { key: 'stt', label: 'STT' },
        { key: 'student_code', label: 'Mã HS' },
        { key: 'full_name', label: 'Họ và tên' },
        { key: 'class', label: 'Lớp' },
        { key: 'password', label: 'Mật khẩu' },
    ];
    
    const staffCols = [
        { key: 'id', label: 'ID' },
        { key: 'full_name', label: 'Họ và tên' },
        { key: 'password', label: 'Mật khẩu' },
    ];


    return (
        <div>
            <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <button onClick={() => setActiveTab('students')} className={`${activeTab === 'students' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}>Học sinh</button>
                    <button onClick={() => setActiveTab('teachers')} className={`${activeTab === 'teachers' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}>Giáo viên</button>
                    <button onClick={() => setActiveTab('counselors')} className={`${activeTab === 'counselors' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500'} whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}>Giáo viên TL</button>
                </nav>
            </div>
            <div className="space-y-4">
              {activeTab === 'students' && <EditableTable title="Danh sách học sinh" columns={studentCols} data={students} setData={setStudents} />}
              {activeTab === 'teachers' && <EditableTable title="Danh sách giáo viên" columns={staffCols} data={teachers} setData={setTeachers} />}
              {activeTab === 'counselors' && <EditableTable title="Danh sách giáo viên tâm lý" columns={staffCols} data={counselors} setData={setCounselors} />}
            </div>
        </div>
    )
}


const SystemAnalytics: React.FC = () => {
    const { user } = useAuth();

    const allTabs: { id: Tab, label: string, roles: UserRole[] }[] = [
        { id: 'attendance', label: 'Điểm danh', roles: [UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.COUNSELOR] },
        { id: 'emotions', label: 'Cảm xúc', roles: [UserRole.PRINCIPAL, UserRole.TEACHER, UserRole.COUNSELOR] },
        { id: 'notes', label: 'Ghi chú ẩn danh', roles: [UserRole.PRINCIPAL, UserRole.COUNSELOR] },
        { id: 'requests', label: 'Hỗ trợ gấp', roles: [UserRole.PRINCIPAL, UserRole.COUNSELOR] },
        { id: 'alerts', label: 'Cảnh báo', roles: [UserRole.PRINCIPAL, UserRole.COUNSELOR, UserRole.TEACHER] },
        { id: 'data-management', label: 'Quản lý dữ liệu', roles: [UserRole.PRINCIPAL] },
    ];

    const availableTabs = allTabs.filter(tab => user && tab.roles.includes(user.role));
    const [activeTab, setActiveTab] = useState<Tab>(availableTabs[0]?.id || 'attendance');


    const studentMap = useMemo(() => {
        return initialStudents.reduce((map, student) => {
            map[student.id] = student.full_name;
            return map;
        }, {} as Record<string, string>);
    }, []);

    const emotionDataByDay = useMemo(() => {
        const data: Record<string, Record<Emotion, number> & { name: string }> = {};
        attendance.forEach(att => {
            const dateStr = new Date(att.timestamp).toLocaleDateString('vi-VN');
            if (!data[dateStr]) {
                data[dateStr] = { name: dateStr, 'Vui': 0, 'Buồn': 0, 'Mệt': 0 };
            }
            data[dateStr][att.emotion]++;
        });
        return Object.values(data).reverse();
    }, []);

    const latePatternData = useMemo(() => {
        const data: Record<string, { name: string, 'Số lần đi muộn': number }> = {};
        const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        weekdays.forEach(day => data[day] = { name: day, 'Số lần đi muộn': 0 });
        
        attendance.filter(a => a.status === 'Muộn').forEach(att => {
            const dayOfWeek = weekdays[new Date(att.timestamp).getDay()];
            data[dayOfWeek]['Số lần đi muộn']++;
        });
        return Object.values(data);
    }, []);
    
    const renderContent = () => {
        switch (activeTab) {
            case 'data-management':
                return <DataManagement />;
            case 'attendance':
                return (
                    <Card>
                        <CardTitle>Mẫu hình đi muộn theo ngày trong tuần</CardTitle>
                        <CardContent className="h-96 mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={latePatternData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Số lần đi muộn" fill="#fbbf24" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                );
            case 'emotions':
                return (
                    <Card>
                        <CardTitle>Xu hướng cảm xúc theo thời gian</CardTitle>
                         <CardContent className="h-96 mt-4">
                             <div className="text-xs text-gray-500 mb-2 italic">Lưu ý: Dữ liệu cảm xúc là một tín hiệu gợi ý, không phải là công cụ chẩn đoán. Đây là điểm khởi đầu cho một cuộc trò chuyện, không phải là kết luận cuối cùng.</div>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={emotionDataByDay}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Vui" stroke="#22c55e" />
                                    <Line type="monotone" dataKey="Mệt" stroke="#f59e0b" />
                                    <Line type="monotone" dataKey="Buồn" stroke="#ef4444" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                );
            case 'notes':
                 return (
                    <Card>
                        <CardTitle>Ghi chú ẩn danh gần đây</CardTitle>
                        <CardContent className="mt-4 space-y-3 max-h-96 overflow-y-auto">
                            {notes.map(note => (
                                <div key={note.id} className="p-3 bg-gray-50 rounded-lg border">
                                    <p className="text-gray-700">"{note.content}"</p>
                                    <p className="text-right text-xs text-gray-400 mt-2">- {note.alias} lúc {new Date(note.created_at).toLocaleString('vi-VN')}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                );
            case 'requests':
                return (
                     <Card>
                        <CardTitle>Yêu cầu hỗ trợ gấp</CardTitle>
                        <CardContent className="mt-4">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Bí danh</th>
                                            <th scope="col" className="px-6 py-3">Ghi chú</th>
                                            <th scope="col" className="px-6 py-3">Thời gian</th>
                                            <th scope="col" className="px-6 py-3">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emergencyRequests.map(req => (
                                            <tr key={req.id} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900">{req.alias}</td>
                                                <td className="px-6 py-4">{req.note}</td>
                                                <td className="px-6 py-4">{new Date(req.created_at).toLocaleString('vi-VN')}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        req.status === 'Pending' ? 'bg-danger-100 text-danger-800' : 
                                                        req.status === 'In Progress' ? 'bg-warning-100 text-warning-800' :
                                                        'bg-success-100 text-success-800'
                                                    }`}>{req.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                );
            case 'alerts':
                return (
                     <Card>
                        <CardTitle>Cảnh báo hệ thống</CardTitle>
                        <CardContent className="mt-4 space-y-3">
                            {alerts.map(alert => (
                                <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                                    alert.severity === 'High' ? 'border-danger-500 bg-danger-50' :
                                    alert.severity === 'Medium' ? 'border-warning-500 bg-warning-50' :
                                    'border-primary-500 bg-primary-50'
                                }`}>
                                    <div className="flex justify-between">
                                        <p className="font-semibold">{studentMap[alert.student_id]} - {alert.alert_type.replace(/_/g, ' ')}</p>
                                        <span className="text-xs text-gray-500">{new Date(alert.triggered_at).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                );
            default:
                return null;
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Phân tích dữ liệu hệ thống</h2>
            <div className="mb-6 border-b border-gray-200">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {availableTabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${
                                activeTab === tab.id
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            {renderContent()}
        </div>
    );
};

export default SystemAnalytics;
