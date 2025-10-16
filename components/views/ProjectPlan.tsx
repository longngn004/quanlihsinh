
import React, { useState } from 'react';
import Card, { CardTitle, CardContent } from '../ui/Card';
import { BeakerIcon, DocumentTextIcon } from '../ui/Icon';

type Section = 'overview' | 'phase1' | 'phase2' | 'phase3' | 'analysis' | 'ethics' | 'timeline';

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Card className="mb-6">
        <CardTitle className="text-primary-700">{title}</CardTitle>
        <CardContent className="mt-4 prose prose-sm max-w-none text-gray-600">
            {children}
        </CardContent>
    </Card>
);

const ProjectPlan: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Chi tiết Kế hoạch Nghiên cứu</h2>

            <SectionCard title="📋 Tổng quan nghiên cứu">
                <h4>Câu hỏi nghiên cứu chính:</h4>
                <ul>
                    <li>Hệ thống có giúp nhà trường phát hiện sớm các dấu hiệu bất thường về sức khỏe tinh thần học sinh không?</li>
                    <li>Học sinh có sẵn lòng sử dụng và tin tưởng vào tính bảo mật của hệ thống không?</li>
                    <li>Hệ thống có cải thiện môi trường học đường và mối quan hệ giữa giáo viên - học sinh không?</li>
                </ul>
                <h4>Phương pháp tiếp cận: Mixed-Methods Research</h4>
                <ul>
                    <li><b>Định tính (Qualitative):</b> Phỏng vấn, quan sát, phân tích nội dung.</li>
                    <li><b>Định lượng (Quantitative):</b> Số liệu từ hệ thống, khảo sát, thống kê.</li>
                    <li><b>Kỹ thuật (Technical):</b> Đo lường hiệu suất, kiểm thử bảo mật.</li>
                </ul>
            </SectionCard>

            <SectionCard title="🎯 Giai đoạn 1: Nghiên cứu trước triển khai">
                <p><b>Mục tiêu:</b> Hiểu rõ nhu cầu thực tế và xây dựng baseline để so sánh sau này.</p>
                <h4>Phương pháp thu thập dữ liệu:</h4>
                <ol>
                    <li><b>Khảo sát nhu cầu (Baseline Survey):</b> Đối tượng 36 học sinh + 5-10 giáo viên về mức độ căng thẳng, khó khăn, mong đợi. Công cụ: Google Forms.</li>
                    <li><b>Phỏng vấn sâu (In-depth Interviews):</b> Với 5-8 học sinh và 3-5 giáo viên về trải nghiệm và nhu cầu.</li>
                    <li><b>Quan sát (Observation):</b> Tương tác giữa giáo viên-học sinh trong 1 tuần.</li>
                </ol>
            </SectionCard>

            <SectionCard title="🚀 Giai đoạn 2: Triển khai thử nghiệm (4-8 tuần)">
                <p><b>Mục tiêu:</b> Thu thập dữ liệu vận hành thực tế và phản hồi người dùng.</p>
                <h4>Phương pháp thu thập dữ liệu:</h4>
                <ul>
                    <li><b>Đánh giá quy trình điểm danh QR:</b> Đo lường thời gian, tỷ lệ thành công, phân tích điểm nghẽn.</li>
                    <li><b>Dữ liệu từ hệ thống (System Analytics):</b> Thu thập tự động từ Database về tỷ lệ điểm danh, phân bố cảm xúc, số lượng ghi chú.</li>
                    <li><b>Phân tích nội dung ghi chú:</b> Phân tích thủ công và định lượng các chủ đề chính.</li>
                    <li><b>Đánh giá chức năng "Hỗ trợ Gấp":</b> Đo lường thời gian và chất lượng phản hồi.</li>
                    <li><b>Khảo sát giữa kỳ & Nhật ký sử dụng của giáo viên.</b></li>
                </ul>
            </SectionCard>

            <SectionCard title="📊 Giai đoạn 3: Đánh giá sau triển khai">
                <p><b>Mục tiêu:</b> So sánh trước và sau, đo lường tác động thực tế.</p>
                <h4>Phương pháp thu thập dữ liệu:</h4>
                <ol>
                    <li><b>Khảo sát hậu triển khai:</b> Sử dụng lại bộ câu hỏi baseline để so sánh sự thay đổi.</li>
                    <li><b>Phỏng vấn chuyên sâu (Exit Interviews):</b> Thu thập trải nghiệm tổng thể và khuyến nghị.</li>
                    <li><b>Thảo luận nhóm (Focus Group Discussion):</b> Thảo luận về tác động, câu chuyện thành công và rào cản.</li>
                    <li><b>Phân tích case studies:</b> Chọn 3-5 trường hợp điển hình để phân tích sâu.</li>
                </ol>
            </SectionCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardTitle className="flex items-center"><span className="w-5 h-5 mr-2"><BeakerIcon/></span>Phương pháp phân tích dữ liệu</CardTitle>
                    <CardContent className="mt-4 prose prose-sm max-w-none text-gray-600">
                        <p><b>Dữ liệu định lượng:</b> Thống kê mô tả (tần suất, trung bình), biểu đồ, phân tích xu hướng. So sánh trước-sau bằng Paired t-test.</p>
                        <p><b>Dữ liệu định tính:</b> Phân tích nội dung theo chủ đề (Thematic Analysis) từ phỏng vấn và ghi chú.</p>
                        <p><b>Triangulation:</b> Kết hợp nhiều nguồn dữ liệu (khảo sát + phỏng vấn + dữ liệu hệ thống) để tăng độ tin cậy.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardTitle>⚖️ Vấn đề đạo đức nghiên cứu</CardTitle>
                    <CardContent className="mt-4 prose prose-sm max-w-none text-gray-600">
                        <ul>
                            <li><b>Đồng ý tham gia (Informed Consent):</b> Giải thích rõ mục đích cho học sinh và phụ huynh.</li>
                            <li><b>Quyền riêng tư và ẩn danh:</b> Mã hóa định danh, không công bố dữ liệu thô.</li>
                            <li><b>Quyền rút lui:</b> Học sinh có thể ngừng tham gia bất cứ lúc nào.</li>
                            <li><b>An toàn dữ liệu:</b> Bảo mật truy cập, xóa dữ liệu sau khi nghiên cứu kết thúc.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ProjectPlan;
