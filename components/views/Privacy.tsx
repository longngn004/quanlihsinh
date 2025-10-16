import React from 'react';
import Card, { CardTitle, CardContent } from '../ui/Card';

const Privacy: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Bảo mật & Quyền riêng tư</h2>
      
      <Card className="mb-6">
        <CardTitle>Cam kết của chúng tôi</CardTitle>
        <CardContent className="mt-4 prose prose-sm max-w-none text-gray-600">
          <p>
            Dự án "Trường Học Hạnh Phúc" đặt sự an toàn, bảo mật và quyền riêng tư của học sinh lên hàng đầu. 
            Chúng tôi cam kết xây dựng một môi trường số an toàn, nơi học sinh có thể chia sẻ mà không lo ngại. 
            Tài liệu này giải thích rõ ràng cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu của bạn.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardTitle>Dữ liệu nào được thu thập?</CardTitle>
            <CardContent className="mt-4 prose prose-sm max-w-none text-gray-600">
                <ul>
                    <li><b>Thông tin điểm danh:</b> Thời gian bạn điểm danh và lựa chọn cảm xúc (Vui, Buồn, Mệt).</li>
                    <li><b>Ghi chú ẩn danh:</b> Nội dung bạn viết trong phần ghi chú cá nhân. Tên của bạn sẽ được thay thế bằng một bí danh ngẫu nhiên.</li>
                    <li><b>Yêu cầu hỗ trợ gấp:</b> Ghi chú bạn gửi khi cần hỗ trợ. Thông tin này chỉ được gửi đến giáo viên tâm lý.</li>
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardTitle>Ai có thể xem dữ liệu của bạn?</CardTitle>
            <CardContent className="mt-4 prose prose-sm max-w-none text-gray-600">
                <p>Quyền truy cập dữ liệu được phân quyền chặt chẽ theo vai trò:</p>
                 <ul>
                    <li><b>Bạn (Học sinh):</b> Bạn có thể xem lịch sử điểm danh và cảm xúc của chính mình.</li>
                    <li><b>Giáo viên chủ nhiệm:</b> Chỉ xem được các báo cáo TỔNG HỢP, ẩn danh (ví dụ: "Hôm nay lớp có 5 bạn cảm thấy mệt"). Họ <b>KHÔNG</b> thể xem được ghi chú cá nhân hay cảm xúc của từng học sinh cụ thể.</li>
                    <li><b>Giáo viên tâm lý:</b> Có thể xem các ghi chú ẩn danh và yêu cầu hỗ trợ gấp để thực hiện can thiệp và giúp đỡ kịp thời.</li>
                    <li><b>Hiệu trưởng:</b> Xem các báo cáo tổng hợp và các cảnh báo hệ thống để có cái nhìn bao quát về toàn trường.</li>
                </ul>
            </CardContent>
        </Card>
         <Card>
            <CardTitle>Dữ liệu được bảo vệ như thế nào?</CardTitle>
            <CardContent className="mt-4 prose prose-sm max-w-none text-gray-600">
                <ul>
                    <li><b>Ẩn danh hóa:</b> Mọi dữ liệu nhạy cảm như ghi chú cá nhân đều được ẩn danh trước khi được phân tích cho mục đích nghiên cứu.</li>
                    <li><b>Truy cập hạn chế:</b> Chỉ những người có thẩm quyền mới được cấp quyền truy cập vào hệ thống dashboard.</li>
                    <li><b>Không chia sẻ bên thứ ba:</b> Chúng tôi cam kết không chia sẻ dữ liệu cá nhân của học sinh cho bất kỳ bên thứ ba nào không thuộc dự án.</li>
                </ul>
            </CardContent>
        </Card>
         <Card>
            <CardTitle>Quyền của bạn</CardTitle>
            <CardContent className="mt-4 prose prose-sm max-w-none text-gray-600">
                 <ul>
                    <li><b>Quyền được biết:</b> Bạn có quyền biết dữ liệu nào đang được thu thập và sử dụng như thế nào.</li>
                    <li><b>Quyền rút lui:</b> Việc tham gia dự án là hoàn toàn tự nguyện. Bạn có thể ngừng tham gia bất kỳ lúc nào mà không bị ảnh hưởng gì.</li>
                    <li><b>Quyền đặt câu hỏi:</b> Nếu có bất kỳ thắc mắc nào về quyền riêng tư, bạn có thể liên hệ trực tiếp với giáo viên tâm lý hoặc ban giám hiệu nhà trường.</li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;