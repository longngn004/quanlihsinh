
import React, { useState } from 'react';
import Card, { CardTitle, CardContent } from '../ui/Card';
import { notes } from '../../constants';
import { summarizeStudentNotes } from '../../services/geminiService';
import { SparklesIcon } from '../ui/Icon';

const AIAssistant: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await summarizeStudentNotes(notes);
      setSummary(result);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Trợ lý AI Phân tích Ghi chú</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle>Ghi chú ẩn danh của học sinh</CardTitle>
          <CardContent className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto">
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              Dữ liệu dưới đây là các ghi chú ẩn danh được thu thập từ hệ thống. Nhấn nút "Tóm tắt" để AI phân tích và đưa ra các chủ đề chính.
            </div>
            {notes.map(note => (
              <div key={note.id} className="p-3 bg-white rounded-lg border">
                <p className="text-gray-700">"{note.content}"</p>
                <p className="text-right text-xs text-gray-400 mt-2">- {note.alias}</p>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <div className="flex flex-col">
            <Card className="flex-grow">
                <CardTitle className="flex items-center">
                    <span className="w-6 h-6 mr-2 text-primary-600"><SparklesIcon /></span>
                    Báo cáo tóm tắt từ AI
                </CardTitle>
                <CardContent className="mt-4">
                    <button
                        onClick={handleSummarize}
                        disabled={isLoading}
                        className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-700 disabled:bg-primary-300 flex items-center justify-center transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang phân tích...
                            </>
                        ) : "Tạo tóm tắt"}
                    </button>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg min-h-[300px] max-h-[50vh] overflow-y-auto">
                        {error && <div className="text-red-600 bg-red-100 p-3 rounded-lg">{error}</div>}
                        {summary ? (
                            <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />
                        ) : (
                            <div className="text-gray-500 text-center pt-10">Báo cáo tóm tắt sẽ xuất hiện ở đây...</div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
