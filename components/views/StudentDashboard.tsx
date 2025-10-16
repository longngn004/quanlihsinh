import React, { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Emotion, Student } from '../../types';
import { QUOTES } from '../../constants';
import Card, { CardTitle, CardContent } from '../ui/Card';

type StudentView = 'home' | 'checkin' | 'checkin-note' | 'checkin-complete' | 'anonymous-note' | 'note-complete' | 'support' | 'support-complete';

const QuoteCard: React.FC = () => {
    const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], []);
    const parts = quote.replace(/"/g, '').split(' - ');
    const quoteText = parts.slice(0, -1).join(' - ');
    const author = parts[parts.length - 1];

    return (
        <Card className="bg-white/80 backdrop-blur-sm border-primary-200">
            <CardContent>
                <blockquote className="text-center">
                    <p className="text-lg italic text-primary-800">"{quoteText}"</p>
                    <footer className="mt-2 text-sm text-primary-600 font-semibold">- {author}</footer>
                </blockquote>
            </CardContent>
        </Card>
    );
}

const NavigationCard: React.FC<{ title: string, description: string, icon: React.ReactNode, onClick: () => void, color: string }> = ({ title, description, icon, onClick, color }) => (
    <button onClick={onClick} className={`text-left p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all transform ${color}`}>
        <div className="flex items-center space-x-4">
            <div className="w-12 h-12">{icon}</div>
            <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-white/90 text-sm">{description}</p>
            </div>
        </div>
    </button>
);

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const student = user as Student;
  const [view, setView] = useState<StudentView>('home');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [note, setNote] = useState('');

  const resetState = () => {
      setSelectedEmotion(null);
      setNote('');
  }

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    setView('checkin-note');
  };

  const handleBackToHome = () => {
      resetState();
      setView('home');
  }

  const renderContent = () => {
      switch(view) {
        case 'home':
            return (
                <div className="space-y-8">
                    <QuoteCard />
                    <div className="grid grid-cols-1 gap-6">
                        <NavigationCard title="Điểm danh hôm nay" description="Hãy cho chúng tôi biết cảm xúc của em" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} onClick={() => setView('checkin')} color="bg-gradient-to-br from-blue-500 to-indigo-600" />
                        <NavigationCard title="Gửi ghi chú ẩn danh" description="Chia sẻ tâm sự một cách riêng tư" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>} onClick={() => setView('anonymous-note')} color="bg-gradient-to-br from-purple-500 to-pink-600" />
                        <NavigationCard title="Cần hỗ trợ khẩn cấp" description="Liên hệ giáo viên tâm lý ngay" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} onClick={() => setView('support')} color="bg-gradient-to-br from-red-500 to-orange-600" />
                    </div>
                </div>
            )
        case 'checkin':
            return (
                <Card>
                    <CardTitle>Hôm nay em cảm thấy thế nào?</CardTitle>
                    <CardContent className="mt-4">
                        <div className="grid grid-cols-3 gap-4">
                            <button onClick={() => handleEmotionSelect(Emotion.Happy)} className="text-center p-4 border-2 border-transparent rounded-lg hover:bg-green-100 hover:border-green-400 transition-all">
                                <span className="text-6xl">😊</span>
                                <p className="mt-2 font-semibold text-green-700">{Emotion.Happy}</p>
                            </button>
                             <button onClick={() => handleEmotionSelect(Emotion.Tired)} className="text-center p-4 border-2 border-transparent rounded-lg hover:bg-yellow-100 hover:border-yellow-400 transition-all">
                                <span className="text-6xl">😴</span>
                                <p className="mt-2 font-semibold text-yellow-700">{Emotion.Tired}</p>
                            </button>
                             <button onClick={() => handleEmotionSelect(Emotion.Sad)} className="text-center p-4 border-2 border-transparent rounded-lg hover:bg-red-100 hover:border-red-400 transition-all">
                                <span className="text-6xl">😔</span>
                                <p className="mt-2 font-semibold text-red-700">{Emotion.Sad}</p>
                            </button>
                        </div>
                        <button onClick={handleBackToHome} className="w-full mt-6 text-sm text-gray-600 hover:text-gray-900">Quay lại</button>
                    </CardContent>
                </Card>
            )
        case 'checkin-note':
        case 'anonymous-note':
            const isCheckin = view === 'checkin-note';
            return (
                <Card>
                    <CardTitle>{isCheckin ? 'Hoàn tất điểm danh' : 'Gửi ghi chú ẩn danh'}</CardTitle>
                    <CardContent className="mt-4">
                        {isCheckin && (
                             <div className="flex items-center justify-center mb-4">
                                <p className="mr-4">Cảm xúc của em hôm nay là:</p>
                                <span className="text-4xl">{selectedEmotion === Emotion.Happy ? '😊' : selectedEmotion === Emotion.Tired ? '😴' : '😔'}</span>
                                <span className="ml-2 font-bold text-lg">{selectedEmotion}</span>
                            </div>
                        )}
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full h-28 p-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                            placeholder={isCheckin ? "Nếu muốn, em có thể chia sẻ thêm đôi điều ở đây... (không bắt buộc)" : "Hãy chia sẻ điều em đang suy nghĩ. Mọi thông tin đều được giữ bí mật."}
                        ></textarea>
                        <button
                            onClick={() => setView(isCheckin ? 'checkin-complete' : 'note-complete')}
                            className="w-full mt-4 bg-primary-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                        >
                           {isCheckin ? 'Hoàn tất' : 'Gửi đi'}
                        </button>
                         <button onClick={handleBackToHome} className="w-full mt-2 text-sm text-gray-600 hover:text-gray-900">Hủy</button>
                    </CardContent>
                </Card>
            )
        case 'support':
             return (
                <Card className="border-danger-200 bg-danger-50">
                     <CardTitle>Hỗ trợ khẩn cấp</CardTitle>
                     <CardContent className="mt-4">
                        <p className="text-sm text-danger-800 mb-4">Nếu em đang gặp khó khăn và cần nói chuyện với giáo viên tâm lý ngay, hãy bấm nút bên dưới. Yêu cầu của em sẽ được gửi đi một cách bảo mật.</p>
                         <button
                            onClick={() => setView('support-complete')}
                            className="w-full bg-danger-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-danger-700 transition-colors"
                        >
                            Cần tham vấn tâm lý
                        </button>
                        <button onClick={handleBackToHome} className="w-full mt-2 text-sm text-gray-600 hover:text-gray-900">Quay lại</button>
                     </CardContent>
                </Card>
             )
        case 'checkin-complete':
        case 'note-complete':
        case 'support-complete':
            const messages = {
                'checkin-complete': { title: "Điểm danh thành công!", text: "Cảm ơn em đã chia sẻ. Chúc em một ngày học tập tốt lành!" },
                'note-complete': { title: "Đã gửi ghi chú!", text: "Cảm ơn em đã tin tưởng và chia sẻ. Giáo viên tâm lý sẽ xem xét ghi chú của em." },
                'support-complete': { title: "Đã gửi yêu cầu!", text: "Yêu cầu của em đã được gửi. Giáo viên tâm lý sẽ liên hệ với em sớm nhất có thể." }
            }
            const { title, text } = messages[view];
            return (
                <Card>
                    <CardContent>
                        <div className="text-center p-8 bg-success-50 rounded-lg">
                            <h3 className="text-xl font-bold text-success-800">{title}</h3>
                            <p className="text-success-700 mt-2">{text}</p>
                            <button onClick={handleBackToHome} className="mt-6 bg-primary-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors">Về trang chủ</button>
                        </div>
                    </CardContent>
                </Card>
            )
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-indigo-200 font-sans">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div className="text-center flex-1">
                <h1 className="text-xl font-bold text-primary-700">Mỗi ngày đến trường là một niềm vui</h1>
                <p className="text-sm text-gray-600">Chào buổi sáng, {student.full_name}!</p>
            </div>
            <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
            >
                Đăng xuất
            </button>
        </div>
      </header>
      
      <main className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;
