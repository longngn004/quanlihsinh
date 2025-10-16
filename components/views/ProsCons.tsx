import React from 'react';
import Card, { CardTitle, CardContent } from '../ui/Card';

const benefits = [
    { title: "Phát hiện sớm vấn đề", description: "Hệ thống giúp nhà trường nhận diện các dấu hiệu bất thường về sức khỏe tinh thần của học sinh một cách kịp thời thông qua phân tích dữ liệu cảm xúc và hành vi." },
    { title: "Tạo kênh giao tiếp an toàn", description: "Tính năng ghi chú ẩn danh và yêu cầu hỗ trợ gấp cung cấp một kênh an toàn để học sinh chia sẻ những điều khó nói mà không sợ bị phán xét." },
    { title: "Cải thiện mối quan hệ Thầy-Trò", description: "Giáo viên có cái nhìn sâu sắc hơn về tâm lý học sinh, từ đó có những tương tác và hỗ trợ phù hợp hơn, giúp xây dựng môi trường học đường tích cực." },
    { title: "Ra quyết định dựa trên dữ liệu", description: "Ban giám hiệu có thể sử dụng các báo cáo tổng hợp để đưa ra các chiến lược can thiệp và cải thiện môi trường học đường một cách hiệu quả." },
];

const limitationsWithMitigations = [
  { 
    title: "Quan ngại về quyền riêng tư", 
    description: "Học sinh và phụ huynh có thể lo lắng về việc dữ liệu cá nhân và nhạy cảm bị lạm dụng.",
    mitigation: {
        title: "Giải pháp: Chính sách bảo mật minh bạch",
        description: "Xây dựng và công khai một trang 'Chính sách Bảo mật', giải thích rõ dữ liệu nào được thu thập, ai có quyền truy cập (theo vai trò), và cam kết ẩn danh hóa toàn bộ dữ liệu nhạy cảm cho mục đích phân tích."
    }
  },
  { 
    title: "Độ tin cậy của công nghệ", 
    description: "Hệ thống IoT (thiết bị ESP32) có thể gặp sự cố kỹ thuật, mạng không ổn định, ảnh hưởng đến trải nghiệm.",
    mitigation: {
        title: "Giải pháp: Có phương án dự phòng",
        description: "Luôn có một phương án điểm danh thủ công (ví dụ: giáo viên ghi nhận) khi hệ thống gặp sự cố. Thông báo rõ cho học sinh và giáo viên về quy trình này để đảm bảo tính liên tục."
    }
  },
  { 
    title: "Rủi ro diễn giải sai dữ liệu", 
    description: "Việc diễn giải cảm xúc chỉ dựa trên một lựa chọn có thể không phản ánh đúng toàn bộ vấn đề.",
    mitigation: {
        title: "Giải pháp: Nhấn mạnh vai trò hỗ trợ",
        description: "Thêm các chú thích trong dashboard, nhấn mạnh rằng dữ liệu cảm xúc là một 'tín hiệu gợi ý', không phải là công cụ chẩn đoán. Nó là điểm khởi đầu cho một cuộc trò chuyện, không phải là kết luận cuối cùng."
    }
  },
  { 
    title: "Sự phụ thuộc vào công nghệ", 
    description: "Quá phụ thuộc vào hệ thống có thể làm giảm các tương tác trực tiếp, vốn rất quan trọng.",
    mitigation: {
        title: "Giải pháp: Khuyến khích tương tác trực tiếp",
        description: "Hệ thống được thiết kế để 'bổ sung', không phải 'thay thế'. Đào tạo giáo viên sử dụng dữ liệu như một cách để bắt đầu các cuộc trò chuyện ý nghĩa, và khuyến khích học sinh tìm đến phòng tham vấn tâm lý."
    }
  },
  { 
    title: "Vấn đề công bằng", 
    description: "Yêu cầu học sinh sử dụng smartphone để quét QR có thể gây khó khăn cho những em không có thiết bị.",
    mitigation: {
        title: "Giải pháp: Cung cấp nhiều phương thức truy cập",
        description: "Bằng cách cho phép học sinh đăng nhập bằng ID và mật khẩu, hệ thống có thể được truy cập từ bất kỳ máy tính nào trong thư viện hoặc phòng máy của trường, đảm bảo mọi học sinh đều có thể tham gia."
    }
  },
];


const MitigationCard: React.FC<{data: typeof limitationsWithMitigations[0]}> = ({data}) => (
    <Card>
        <CardContent>
            <h4 className="font-semibold text-danger-800">{data.title}</h4>
            <p className="text-gray-600 text-sm mt-1 mb-3">{data.description}</p>
            <div className="border-t border-gray-200 pt-3">
                 <h5 className="font-semibold text-success-800 text-sm">{data.mitigation.title}</h5>
                 <p className="text-gray-600 text-xs mt-1">{data.mitigation.description}</p>
            </div>
        </CardContent>
    </Card>
)

const ProsCons: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Phân tích Ưu điểm & Giải pháp</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-primary-700 mb-4">✅ Ưu điểm (Lợi ích)</h3>
          <div className="space-y-4">
            {benefits.map((item, index) => (
              <Card key={index}>
                <CardTitle>{item.title}</CardTitle>
                <CardContent className="mt-2">
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">❌ Hạn chế & Giải pháp giảm thiểu</h3>
          <div className="space-y-4">
            {limitationsWithMitigations.map((item, index) => (
              <MitigationCard key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProsCons;