import type { User, Student, Attendance, Note, EmergencyRequest, Alert } from './types';
import { Emotion, UserRole } from './types';

// =======================================================================
// === DATA FOR LOCAL AUTHENTICATION (Replaces Google Sheets) ===
// =======================================================================

export const principal: User = {
  id: 'Long KHTN',
  name: 'Long KHTN',
  full_name: 'Long KHTN',
  role: UserRole.PRINCIPAL,
  password: '123123cc'
};

export const teachers: User[] = [
  { id: 'gv01', name: 'Nguyễn Văn An', full_name: 'Nguyễn Văn An', role: UserRole.TEACHER, password: 'AnP@ssw0rd9' },
  { id: 'gv02', name: 'Trần Thị Bình', full_name: 'Trần Thị Bình', role: UserRole.TEACHER, password: 'BinhSecure10' },
  { id: 'gv03', name: 'Lê Hoàng Cường', full_name: 'Lê Hoàng Cường', role: UserRole.TEACHER, password: 'Cuong_Pass11' },
];

export const counselors: User[] = [
  { id: 'gvtl01', name: 'Nguyễn Thị Hạnh', full_name: 'Nguyễn Thị Hạnh', role: UserRole.COUNSELOR, password: 'HanhP@ssw0rd9' },
  { id: 'gvtl02', name: 'Trần Văn Phúc', full_name: 'Trần Văn Phúc', role: UserRole.COUNSELOR, password: 'PhucSecure10' },
];

export const students: Student[] = [
  { id: 's1', stt: 1, student_code: 'HS001', full_name: 'Nguyễn Thị Mai', class: '10A1', password: '123123', role: UserRole.STUDENT },
  { id: 's2', stt: 2, student_code: 'HS002', full_name: 'Trần Văn Hùng', class: '10A1', password: '123123', role: UserRole.STUDENT },
  { id: 's3', stt: 3, student_code: 'HS003', full_name: 'Lê Thu Thủy', class: '10A1', password: '123123', role: UserRole.STUDENT },
  { id: 's4', stt: 4, student_code: 'HS004', full_name: 'Phạm Minh Đức', class: '10A1', password: '123123', role: UserRole.STUDENT },
  { id: 's5', stt: 5, student_code: 'HS005', full_name: 'Hoàng Hải Yến', class: '10A1', password: '123123', role: UserRole.STUDENT },
  { id: 's6', stt: 6, student_code: 'HS006', full_name: 'Đỗ Anh Tuấn', class: '10A1', password: '123123', role: UserRole.STUDENT },
  { id: 's7', stt: 7, student_code: 'HS007', full_name: 'Bùi Thanh Hương', class: '10A1', password: '123123', role: UserRole.STUDENT },
  { id: 's8', stt: 8, student_code: 'HS008', full_name: 'Vũ Quốc Trung', class: '10A1', password: '123123', role: UserRole.STUDENT },
];


// =======================================================================
// === MOCK DATA FOR APP FUNCTIONALITY (No changes needed below) ===
// =======================================================================

export const attendance: Attendance[] = [];
const today = new Date();
for (let i = 0; i < 30; i++) {
  const date = new Date(today);
  date.setDate(today.getDate() - i);
  students.forEach(student => {
    if (Math.random() > 0.1) { // 10% chance of being absent
      const hour = 7;
      const minute = Math.floor(Math.random() * 30);
      const timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
      const minutes_late = minute > 0 ? minute : 0;
      
      let emotion: Emotion;
      const randEmotion = Math.random();
      if (randEmotion < 0.6) emotion = Emotion.Happy;
      else if (randEmotion < 0.9) emotion = Emotion.Tired;
      else emotion = Emotion.Sad;

      // Simulate exam stress
      if (i > 5 && i < 10) {
         if (Math.random() > 0.5) emotion = Emotion.Tired;
      }
      
      attendance.push({
        id: `att_${student.id}_${i}`,
        student_id: student.id,
        timestamp: timestamp,
        emotion: emotion,
        status: minutes_late > 0 ? 'Muộn' : 'Đúng giờ',
        minutes_late: minutes_late,
      });
    }
  });
}

export const notes: Note[] = [
  { id: 'n1', student_id: 's2', alias: 'Thỏ Con', content: 'Dạo này em thấy hơi áp lực vì bài tập nhiều quá.', created_at: new Date(new Date().setDate(today.getDate() - 2)) },
  { id: 'n2', student_id: 's4', alias: 'Mèo Ú', content: 'Em cảm thấy khó kết bạn trong lớp mới, mọi người có vẻ đã có nhóm riêng hết rồi.', created_at: new Date(new Date().setDate(today.getDate() - 5)) },
  { id: 'n3', student_id: 's1', alias: 'Gấu Trúc', content: 'Kỳ thi sắp tới làm em lo lắng. Em sợ sẽ không đạt được kết quả như ba mẹ mong đợi.', created_at: new Date(new Date().setDate(today.getDate() - 7)) },
  { id: 'n4', student_id: 's2', alias: 'Thỏ Con', content: 'Hôm nay em nhận được điểm tốt môn Toán, cảm thấy vui và có động lực hơn nhiều.', created_at: new Date() },
];

export const emergencyRequests: EmergencyRequest[] = [
  { id: 'er1', student_id: 's3', alias: 'Người Vô Hình', note: 'Em đang gặp một chuyện rất khó nói và cần được nói chuyện với ai đó ngay ạ.', created_at: new Date(new Date().setDate(today.getDate() - 3)), status: 'Resolved' },
  { id: 'er2', student_id: 's5', alias: 'Sao Băng', note: 'Em cảm thấy rất hoảng sợ và không biết phải làm gì.', created_at: new Date(), status: 'Pending' },
];

export const alerts: Alert[] = [
  { id: 'al1', student_id: 's4', alert_type: 'Negative_Emotion_Streak', severity: 'Medium', description: 'Học sinh Phạm Thị Dung đã chọn cảm xúc "Buồn" hoặc "Mệt" 3 ngày liên tiếp.', triggered_at: new Date(new Date().setDate(today.getDate() - 4)) },
  { id: 'al2', student_id: 's5', alert_type: 'Late_Pattern', severity: 'Low', description: 'Học sinh Võ Minh Hải đã đi muộn 3 lần trong tuần này.', triggered_at: new Date(new Date().setDate(today.getDate() - 1)) },
   { id: 'al3', student_id: 's3', alert_type: 'Absence_Pattern', severity: 'High', description: 'Học sinh Lê Hoàng Cường đã vắng 2 ngày không lý do trong tuần.', triggered_at: new Date() },
];

export const QUOTES: string[] = [
    // --- Triết học & Suy ngẫm ---
    '"Cách tốt nhất để dự đoán tương lai là tạo ra nó." - Abraham Lincoln',
    '"Cuộc sống không được đo bằng số lần ta thở, mà bằng những khoảnh khắc khiến ta nghẹt thở." - Maya Angelou',
    '"Chúng ta là những gì chúng ta liên tục làm. Do đó, sự xuất sắc không phải là một hành động, mà là một thói quen." - Aristotle',
    '"Cuộc sống thực sự bắt đầu ở nơi kết thúc vùng an toàn của bạn." - Neale Donald Walsch',
    '"Hành trình ngàn dặm bắt đầu bằng một bước chân." - Lão Tử',
    '"Người không có mục đích giống như con tàu không có bánh lái." - Thomas Carlyle',
    '"Cuộc sống là 10% những gì xảy ra với bạn và 90% cách bạn phản ứng với nó." - Charles R. Swindoll',
    '"Thứ duy nhất không đổi là sự thay đổi." - Heraclitus',
    '"Tôi tư duy, nên tôi tồn tại." - René Descartes',
    '"Biết mình là sự khôn ngoan đích thực." - Socrates',
    '"Thử thách là điều làm cho cuộc sống trở nên thú vị, và vượt qua chúng là điều làm cho cuộc sống trở nên ý nghĩa."',
    '"Đời người chỉ sống có một lần. Nhưng nếu bạn sống đúng, một lần là đủ." - Mae West',
    '"Hãy là sự thay đổi mà bạn muốn thấy trên thế giới." - Mahatma Gandhi',
    '"Logic sẽ đưa bạn từ A đến B. Trí tưởng tượng sẽ đưa bạn đến mọi nơi." - Albert Einstein',
    '"Cuộc sống không phải là đi tìm chính mình. Cuộc sống là tạo ra chính mình." - George Bernard Shaw',
    '"Sự khác biệt giữa bình thường và phi thường chỉ là một chút nỗ lực cộng thêm."',
    '"Tương lai thuộc về những người tin vào vẻ đẹp của ước mơ." - Eleanor Roosevelt',
    '"Người bi quan phàn nàn về cơn gió. Người lạc quan hy vọng nó thay đổi. Người thực tế điều chỉnh lại cánh buồm." - William Arthur Ward',
    '"Trong ba người cùng đi, ắt có một người là thầy của ta." - Khổng Tử',
    '"Bí mật của hạnh phúc không nằm ở việc tìm kiếm nhiều hơn, mà ở việc tận hưởng ít đi." - Socrates',

    // --- Truyền cảm hứng & Động lực ---
    '"Tin vào chính mình, và phần còn lại sẽ vào đúng vị trí của nó."',
    '"Thất bại là gia vị mang lại hương vị cho thành công."',
    '"Đừng chờ đợi cơ hội. Hãy tạo ra nó."',
    '"Hôm nay bạn đọc, ngày mai bạn sẽ lãnh đạo."',
    '"Hãy nhắm đến mặt trăng. Dù có trượt, bạn cũng sẽ ở giữa những vì sao."',
    '"Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc là chìa khóa của thành công." - Albert Schweitzer',
    '"Không có gì là không thể với một người luôn biết cố gắng."',
    '"Người duy nhất bạn nên cố gắng để trở nên tốt hơn chính là bạn của ngày hôm qua."',
    '"Hãy làm những việc khó khăn khi chúng còn dễ dàng." - Lão Tử',
    '"Kỷ luật là cầu nối giữa mục tiêu và thành quả."',
    '"Bạn không cần phải vĩ đại để bắt đầu, nhưng bạn phải bắt đầu để trở nên vĩ đại." - Zig Ziglar',
    '"Đừng bao giờ từ bỏ ước mơ chỉ vì thời gian để thực hiện nó quá dài. Thời gian rồi cũng sẽ trôi qua."',
    '"Mỗi ngày đều là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình."',
    '"Khó khăn không tồn tại mãi mãi, nhưng người cứng rắn thì có."',
    '"Nếu bạn muốn cầu vồng, bạn phải chấp nhận những cơn mưa."',
    '"Hãy can đảm theo đuổi những gì thắp lên ngọn lửa trong bạn."',
    '"Nơi nào có ý chí, nơi đó có con đường."',
    '"Đừng đếm ngày, hãy làm cho mỗi ngày đều đáng nhớ."',
    '"Thành công là tổng hợp của những nỗ lực nhỏ được lặp đi lặp lại mỗi ngày."',
    '"Tất cả ước mơ của chúng ta đều có thể trở thành hiện thực nếu chúng ta có can đảm để theo đuổi chúng." - Walt Disney',

    // --- Tình yêu & Lòng tốt ---
    '"Nơi nào có tình yêu, nơi đó có sự sống." - Mahatma Gandhi',
    '"Chúng ta sống bằng những gì ta nhận được, nhưng chúng ta tạo nên cuộc đời bằng những gì ta cho đi." - Winston Churchill',
    '"Không có hành động tử tế nào, dù nhỏ đến đâu, là lãng phí."',
    '"Hãy đối xử với mọi người bằng sự tử tế, không phải vì họ tốt, mà vì bạn tốt."',
    '"Cách tốt nhất để tìm thấy chính mình là quên mình đi trong sự phục vụ người khác." - Mahatma Gandhi',
    '"Một trái tim biết ơn là khởi đầu của sự vĩ đại."',
    '"Tình yêu không phải là nhìn về phía nhau, mà là cùng nhau nhìn về một hướng." - Antoine de Saint-Exupéry',
    '"Hãy lan tỏa tình yêu ở bất cứ nơi nào bạn đến."',
    '"Lòng tốt là ngôn ngữ mà người điếc có thể nghe và người mù có thể thấy." - Mark Twain',
    '"Hạnh phúc lớn nhất của cuộc đời là niềm tin rằng chúng ta được yêu thương." - Victor Hugo',
    '"Sự dịu dàng và lòng tốt không phải là dấu hiệu của sự yếu đuối, mà là biểu hiện của sức mạnh."',
    '"Yêu thương là cho đi mà không cần nhận lại."',
    '"Hãy sống sao cho khi bạn ra đi, mọi người đều tiếc thương."',
    '"Ba thứ quan trọng trong cuộc sống: lòng tốt, lòng tốt và lòng tốt." - Henry James',
    '"Một người bạn thực sự là người bước vào khi cả thế giới bỏ đi."',

    // --- Thành ngữ & Tục ngữ Việt Nam ---
    '"Có công mài sắt, có ngày nên kim."',
    '"Kiến tha lâu cũng đầy tổ."',
    '"Thất bại là mẹ thành công."',
    '"Ăn quả nhớ kẻ trồng cây."',
    '"Gần mực thì đen, gần đèn thì sáng."',
    '"Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao."',
    '"Nước chảy đá mòn."',
    '"Đi một ngày đàng, học một sàng khôn."',
    '"Đói cho sạch, rách cho thơm."',
    '"Uống nước nhớ nguồn."',
    '"Giấy rách phải giữ lấy lề."',
    '"Lá lành đùm lá rách."',
    '"Chớ thấy sóng cả mà ngã tay chèo."',
    '"Tốt gỗ hơn tốt nước sơn."',
    '"Nói chín thì phải làm mười, nói mười làm chín, kẻ cười người chê."',

    // --- Các câu nói ngắn gọn, ý nghĩa khác ---
    '"Hãy sống trọn vẹn từng khoảnh khắc."',
    '"Hạnh phúc là một cuộc hành trình, không phải là đích đến."',
    '"Hãy biết ơn những gì bạn đang có."',
    '"Sự đơn giản là đỉnh cao của sự tinh tế." - Leonardo da Vinci',
    '"Hãy lắng nghe nhiều hơn nói."',
    '"Mỗi sai lầm là một bài học."',
    '"Hãy tin vào điều kỳ diệu."',
    '"Hãy là chính mình, những người khác đã có người đảm nhận rồi." - Oscar Wilde',
    '"Không có gì quý hơn độc lập, tự do." - Hồ Chí Minh',
    '"Sự im lặng đôi khi là câu trả lời hay nhất."',
    '"Hãy tha thứ cho người khác, không phải vì họ xứng đáng, mà vì bạn xứng đáng được bình yên."',
    '"Ước mơ không có ngày hết hạn."',
    '"Hãy làm điều bạn yêu, yêu điều bạn làm."'
];