// Lộ trình ôn thi TOEIC 30 Ngày dành cho người mất gốc
// Nội dung được biên soạn từ file lo-trinh-toeic-30-ngay.md

export const TOEIC_30_DAYS_CURRICULUM = [
  // WEEK 1
  {
    day: 1,
    week: 1,
    title: "Ngày 1: Cấu trúc đề thi & Chủ đề Văn phòng",
    objective: "Tìm hiểu cấu trúc 7 phần của đề thi TOEIC. Học 10 từ vựng chủ đề Văn phòng & Công ty. Luyện nghe Part 1 (Tranh tả người).",
    grammarFocus: "Cấu trúc đề thi TOEIC",
    practiceType: "listening_part1",
    vocabTopic: "Văn phòng & Công ty",
    vocabSubGroups: ["Board meetings and Committees (Họp Hội đồng và Phòng ban)", "Office Technology (Công nghệ văn phòng)", "Office procedures (Thủ tục văn phòng)"],
    theory: `### Tổng Quan Cấu Trúc Đề Thi TOEIC (200 câu - 120 phút)

Để đạt mục tiêu **400 điểm**, bạn không cần trả lời đúng hết tất cả các câu hỏi. Bạn chỉ cần đúng khoảng **90 - 100 câu** (đúng 50% đề thi). Do đó, hãy tập trung vào các câu hỏi dễ và vừa.

| Phần thi | Part | Dạng bài | Số câu | Mục tiêu cần đạt |
|---|---|---|---|---|
| **LISTENING (45 phút)** | Part 1 | Mô tả tranh | 6 câu | Đúng 4-5 câu (Dễ ăn điểm nhất) |
| | Part 2 | Hỏi - Đáp ngắn | 25 câu | Đúng 12-15 câu (Nghe từ hỏi) |
| | Part 3 | Hội thoại ngắn | 39 câu | Đúng 15-18 câu (Đọc trước đề) |
| | Part 4 | Độc thoại ngắn | 30 câu | Đúng 10-12 câu (Nắm ý chính) |
| **READING (75 phút)** | Part 5 | Điền từ vào câu | 30 câu | Đúng 18-20 câu (Ngữ pháp cốt lõi) |
| | Part 6 | Điền từ vào đoạn | 16 câu | Đúng 6-8 câu (Liên kết câu) |
| | Part 7 | Đọc hiểu văn bản | 54 câu | Đúng 20-25 câu (Scan thông tin đoạn đơn) |

### Kỹ năng nghe Part 1 (Tranh tả người)
- **Quy tắc vàng:** Quan sát hành động của người trong tranh (đang cầm nắm, nhìn, đứng, ngồi, đi bộ...).
- **Cảnh giác:** Tránh chọn những câu có danh từ xuất hiện trong tranh nhưng động từ sai, hoặc câu chứa từ phát âm tương tự (bẫy đồng âm).`,
    staticVocab: [
      { en: "meeting", vi: "cuộc họp", category: "Danh từ", example: "The meeting is scheduled for Monday.", exampleVi: "Cuộc họp được lên lịch vào thứ Hai." },
      { en: "deadline", vi: "hạn chót", category: "Danh từ", example: "Please submit before the deadline.", exampleVi: "Vui lòng nộp trước hạn chót." },
      { en: "report", vi: "báo cáo / bản báo cáo", category: "Danh từ / Động từ", example: "She submitted the monthly report.", exampleVi: "Cô ấy đã nộp báo cáo hàng tháng." },
      { en: "department", vi: "phòng ban", category: "Danh từ", example: "Which department do you work in?", exampleVi: "Bạn làm việc ở phòng ban nào?" },
      { en: "employee", vi: "nhân viên", category: "Danh từ", example: "All employees must attend the training.", exampleVi: "Tất cả nhân viên phải tham gia buổi đào tạo." },
      { en: "manager", vi: "quản lý", category: "Danh từ", example: "The manager approved the budget.", exampleVi: "Người quản lý đã phê duyệt ngân sách." },
      { en: "supervisor", vi: "người giám sát", category: "Danh từ", example: "Contact your supervisor for approval.", exampleVi: "Hãy liên hệ với người giám sát của bạn để được phê duyệt." },
      { en: "colleague", vi: "đồng nghiệp", category: "Danh từ", example: "My colleagues are very supportive.", exampleVi: "Các đồng nghiệp của tôi rất hỗ trợ." },
      { en: "headquarters", vi: "trụ sở chính", category: "Danh từ", example: "The headquarters is in New York.", exampleVi: "Trụ sở chính nằm ở New York." },
      { en: "branch", vi: "chi nhánh", category: "Danh từ", example: "We have branches in 10 cities.", exampleVi: "Chúng tôi có các chi nhánh ở 10 thành phố." }
    ]
  },
  {
    day: 2,
    week: 1,
    title: "Ngày 2: Ngữ pháp Loại từ (Word Forms) & Chủ đề Mua sắm",
    objective: "Nắm vững đuôi và vị trí của Danh từ, Tính từ, Trạng từ, Động từ. Học 10 từ vựng chủ đề Mua sắm & Đặt hàng.",
    grammarFocus: "Loại từ (Word Forms)",
    practiceType: "grammar_quiz",
    vocabTopic: "Mua Sắm & Đặt Hàng",
    vocabSubGroups: ["Shopping (Mua sắm)", "Ordering Supplies (Đặt hàng nhà cung cấp)", "Invoices (Hóa đơn)"],
    theory: `### Ngữ Pháp Loại Từ (Word Forms)
Đây là phần quan trọng nhất trong đề thi Part 5 (chiếm 30-40% số câu hỏi). Bạn hoàn toàn có thể chọn đáp án đúng trong 5 giây mà không cần dịch nghĩa toàn câu chỉ bằng cách nhìn từ trước và sau chỗ trống.

#### 1. Nhận dạng loại từ qua đuôi (Suffixes)
- **Danh từ:** \`-tion, -ment, -ness, -ity, -er, -or, -ance, -ence\` (Ví dụ: *production, management, darkness, worker*)
- **Tính từ:** \`-ful, -less, -ive, -al, -able, -ous, -ent, -ed, -ing\` (Ví dụ: *helpful, active, final, usable*)
- **Trạng từ:** Tính từ + \`-ly\` (Ví dụ: *quickly, carefully, recently*)
- **Động từ:** Thường không có đuôi đặc trưng rõ rệt, là các từ chỉ hành động cơ bản (Ví dụ: *deliver, order*).

#### 2. Vị trí loại từ trong câu
- **Trước Danh từ** cần điền **Tính từ** (Ví dụ: *a reliable supplier*).
- **Sau Giới từ** (in, on, at, for...) hoặc **Mạo từ** (a, an, the) cần điền **Danh từ** hoặc **Tính từ + Danh từ**.
- **Giữa động từ chính và trợ động từ** hoặc **bổ nghĩa cho động từ** cần điền **Trạng từ**.
- **Sau chủ ngữ** cần điền **Động từ** làm vị ngữ.`,
    staticVocab: [
      { en: "order", vi: "đơn hàng / đặt hàng", category: "Danh từ / Động từ", example: "Your order has been confirmed.", exampleVi: "Đơn hàng của bạn đã được xác nhận." },
      { en: "purchase", vi: "mua hàng", category: "Động từ / Danh từ", example: "She purchased 3 units online.", exampleVi: "Cô ấy đã mua 3 sản phẩm trực tuyến." },
      { en: "receipt", vi: "biên lai", category: "Danh từ", example: "Keep your receipt for returns.", exampleVi: "Giữ lại biên lai của bạn để đổi trả." },
      { en: "invoice", vi: "hóa đơn", category: "Danh từ", example: "The invoice was sent by email.", exampleVi: "Hóa đơn đã được gửi qua email." },
      { en: "discount", vi: "giảm giá", category: "Danh từ / Động từ", example: "Members receive a 10% discount.", exampleVi: "Thành viên nhận được giảm giá 10%." },
      { en: "refund", vi: "hoàn tiền", category: "Danh từ / Động từ", example: "Request a refund within 30 days.", exampleVi: "Yêu cầu hoàn tiền trong vòng 30 ngày." },
      { en: "exchange", vi: "đổi hàng", category: "Động từ / Danh từ", example: "Exchanges are allowed within 14 days.", exampleVi: "Đổi hàng được phép trong vòng 14 ngày." },
      { en: "delivery", vi: "giao hàng", category: "Danh từ", example: "Free delivery on orders over $50.", exampleVi: "Giao hàng miễn phí cho các đơn hàng trên $50." },
      { en: "shipment", vi: "lô hàng / chuyến hàng", category: "Danh từ", example: "The shipment arrived this morning.", exampleVi: "Lô hàng đã đến sáng nay." },
      { en: "stock", vi: "hàng tồn kho", category: "Danh từ", example: "This item is out of stock.", exampleVi: "Mặt hàng này đã hết hàng." }
    ]
  },
  {
    day: 3,
    week: 1,
    title: "Ngày 3: Luyện nghe Part 2 (Hỏi đáp) & Chủ đề Du lịch",
    objective: "Học kỹ năng bắt từ khóa đầu câu hỏi Part 2. Học 10 từ vựng chủ đề Du lịch & Giao thông.",
    grammarFocus: "Kỹ năng nghe TOEIC Part 2",
    practiceType: "listening_part2",
    vocabTopic: "Du Lịch & Giao Thông",
    vocabSubGroups: ["General Travel (Du lịch)", "Airlines (Hàng không)", "Trains (Xe lửa)"],
    theory: `### Kỹ Năng Chinh Phục TOEIC Part 2 (Hỏi - Đáp)
Part 2 gồm 25 câu hỏi ngắn. Bạn sẽ nghe 1 câu hỏi/phát biểu và 3 lựa chọn trả lời (A, B, C).

#### 1. Lắng nghe từ khóa nghi vấn đầu tiên
- **Who:** Câu trả lời thường là tên người, chức danh hoặc phòng ban (Ví dụ: *Mr. John, The manager, HR department*).
- **Where:** Câu trả lời chỉ địa điểm (Ví dụ: *On the desk, In the meeting room, Second floor*).
- **When:** Câu trả lời chỉ thời gian, mốc ngày/giờ (Ví dụ: *At 3 PM, Next Monday, Yesterday*).
- **Why:** Câu trả lời nêu nguyên nhân, thường bắt đầu bằng \`Because\` hoặc chỉ hành động mục đích \`To + V\`.
- **How:** Cách thức, phương tiện đi lại (Ví dụ: *By bus, By credit card*).

#### 2. Tránh bẫy lặp từ
- Nếu một đáp án có phát âm hoặc từ vựng giống hệt từ trên câu hỏi, **90% đó là đáp án bẫy (sai)**. Người bản xứ thường dùng từ đồng nghĩa để trả lời.`,
    staticVocab: [
      { en: "flight", vi: "chuyến bay", category: "Danh từ", example: "The flight departs at 7 AM.", exampleVi: "Chuyến bay khởi hành lúc 7 giờ sáng." },
      { en: "departure", vi: "sự khởi hành / điểm đi", category: "Danh từ", example: "Check departure time at Gate B3.", exampleVi: "Kiểm tra giờ khởi hành tại Cổng B3." },
      { en: "arrival", vi: "sự đến nơi / điểm đến", category: "Danh từ", example: "Estimated arrival is 3 PM.", exampleVi: "Thời gian đến dự kiến là 3 giờ chiều." },
      { en: "boarding", vi: "lên máy bay / tàu", category: "Danh từ / Động từ", example: "Boarding begins 30 minutes before.", exampleVi: "Quá trình lên máy bay bắt đầu trước 30 phút." },
      { en: "reservation", vi: "sự đặt chỗ trước", category: "Danh từ", example: "I'd like to make a reservation.", exampleVi: "Tôi muốn đặt chỗ trước." },
      { en: "accommodation", vi: "chỗ ở / nơi trú ngụ", category: "Danh từ", example: "Accommodation is included in the package.", exampleVi: "Chỗ ở đã được bao gồm trong gói." },
      { en: "itinerary", vi: "lịch trình chuyến đi", category: "Danh từ", example: "The travel itinerary has been confirmed.", exampleVi: "Lịch trình chuyến đi đã được xác nhận." },
      { en: "luggage", vi: "hành lý", category: "Danh từ", example: "No extra baggage fees.", exampleVi: "Không có phí hành lý phụ thu." },
      { en: "customs", vi: "hải quan", category: "Danh từ", example: "Declare items at customs.", exampleVi: "Khai báo hàng hóa tại hải quan." },
      { en: "passport", vi: "hộ chiếu", category: "Danh từ", example: "A valid passport is required.", exampleVi: "Yêu cầu có hộ chiếu hợp lệ." }
    ]
  },
  {
    day: 4,
    week: 1,
    title: "Ngày 4: Hiện tại đơn vs Hiện tại tiếp diễn & Chủ đề Tài chính",
    objective: "Phân biệt công thức, dấu hiệu nhận biết của 2 thì hiện tại. Học 10 từ vựng chủ đề Tài chính & Ngân hàng.",
    grammarFocus: "Thì Hiện tại đơn & Hiện tại tiếp diễn",
    practiceType: "grammar_quiz",
    vocabTopic: "Tài Chính & Ngân Hàng",
    vocabSubGroups: ["Banking (Giao dịch ngân hàng)", "Investments (Đầu tư)", "Taxes (Thuế)"],
    theory: `### Hiện Tại Đơn vs Hiện Tại Tiếp Diễn

#### 1. Thì Hiện Tại Đơn (Simple Present)
- **Công thức:** \`S + V(s/es)\` / \`S + do/does + not + V-inf\`
- **Mục đích:** Diễn tả thói quen, lịch trình tàu xe, hoặc thực tế công việc hàng ngày.
- **Từ nhận biết:** \`every day/week, daily, always, usually, often, normally, scheduled\`
- *Ví dụ:* *The store opens at 9 AM daily.*

#### 2. Thì Hiện Tại Tiếp Diễn (Present Continuous)
- **Công thức:** \`S + am/is/are + V-ing\`
- **Mục đích:** Diễn tả hành động đang xảy ra tại thời điểm nói hoặc kế hoạch/xu hướng ngắn hạn đang tiến triển.
- **Từ nhận biết:** \`now, right now, currently, at the moment, at present, temporarily\`
- *Ví dụ:* *We are currently launching a new website.*`,
    staticVocab: [
      { en: "budget", vi: "ngân sách", category: "Danh từ", example: "The annual budget was approved.", exampleVi: "Ngân sách hàng năm đã được phê duyệt." },
      { en: "expense", vi: "chi phí", category: "Danh từ", example: "Track all business expenses carefully.", exampleVi: "Theo dõi tất cả các chi phí kinh doanh một cách cẩn thận." },
      { en: "revenue", vi: "doanh thu", category: "Danh từ", example: "Revenue grew by 15% last year.", exampleVi: "Doanh thu tăng trưởng 15% trong năm ngoái." },
      { en: "profit", vi: "lợi nhuận", category: "Danh từ", example: "The company made a significant profit.", exampleVi: "Công ty đã tạo ra lợi nhuận đáng kể." },
      { en: "loss", vi: "thua lỗ / tổn thất", category: "Danh từ", example: "The firm reported a net loss.", exampleVi: "Công ty đã báo cáo một khoản lỗ ròng." },
      { en: "investment", vi: "sự đầu tư", category: "Danh từ", example: "Long-term investment yields better returns.", exampleVi: "Đầu tư dài hạn mang lại lợi nhuận tốt hơn." },
      { en: "loan", vi: "khoản vay", category: "Danh từ", example: "Apply for a business loan online.", exampleVi: "Đăng ký khoản vay kinh doanh trực tuyến." },
      { en: "interest", vi: "lãi suất / sự quan tâm", category: "Danh từ", example: "The interest rate is 5% annually.", exampleVi: "Lãi suất là 5% mỗi năm." },
      { en: "tax", vi: "thuế", category: "Danh từ / Động từ", example: "File your tax returns by April 15.", exampleVi: "Nộp hồ sơ khai thuế của bạn trước ngày 15 tháng 4." },
      { en: "balance", vi: "số dư tài khoản", category: "Danh từ", example: "Check your account balance online.", exampleVi: "Kiểm tra số dư tài khoản của bạn trực tuyến." }
    ]
  },
  {
    day: 5,
    week: 1,
    title: "Ngày 5: Luyện nghe Part 3 (Hội thoại) & Chủ đề Y tế",
    objective: "Học cách đọc trước câu hỏi Part 3 để chủ động bắt thông tin. Học 10 từ vựng chủ đề Y tế.",
    grammarFocus: "Kỹ năng nghe TOEIC Part 3",
    practiceType: "listening_part3",
    vocabTopic: "Y tế & Sức khỏe",
    vocabSubGroups: ["Hospitals (Bệnh viện)", "Doctor’s Office (Phòng khám bác sĩ)", "Pharmacy (Hiệu thuốc)"],
    theory: `### Kỹ Năng Nghe TOEIC Part 3 (Hội thoại)
Part 3 gồm 39 câu hỏi chia làm 13 nhóm (mỗi nhóm 3 câu hỏi cho 1 đoạn hội thoại giữa 2-3 người).

#### Chiến lược làm bài 3 bước:
1. **Đọc trước câu hỏi (Quan trọng nhất):** Dùng thời gian máy đọc hướng dẫn đầu bài hoặc đọc đáp án câu trước để lướt qua 3 câu hỏi của đoạn tiếp theo. Xác định:
   - **Ai đang nói?** (man hay woman)
   - **Chủ đề là gì?** (problem, request, schedule...)
2. **Nghe và bám theo mạch câu hỏi:** Thông tin trả lời thường xuất hiện tuần tự theo thứ tự câu hỏi từ trên xuống dưới.
3. **Tô đáp án nhanh:** Tô ngay khi nghe được từ khóa tương đồng, không chần chừ để dành thời gian đọc trước 3 câu tiếp theo.`,
    staticVocab: [
      { en: "appointment", vi: "cuộc hẹn (bác sĩ, công việc)", category: "Danh từ", example: "I have a dentist appointment at 2 PM.", exampleVi: "Tôi có một cuộc hẹn với nha sĩ lúc 2 giờ chiều." },
      { en: "clinic", vi: "phòng khám", category: "Danh từ", example: "The clinic is open from Monday to Saturday.", exampleVi: "Phòng khám mở cửa từ thứ Hai đến thứ Bảy." },
      { en: "prescription", vi: "đơn thuốc", category: "Danh từ", example: "The pharmacist filled my prescription.", exampleVi: "Dược sĩ đã kê đơn thuốc cho tôi." },
      { en: "symptom", vi: "triệu chứng", category: "Danh từ", example: "Headache is a common symptom of flu.", exampleVi: "Đau đầu là một triệu chứng phổ biến của bệnh cúm." },
      { en: "treatment", vi: "sự điều trị / phương pháp", category: "Danh từ", example: "The doctor suggested a new treatment.", exampleVi: "Bác sĩ đã đề xuất một phương pháp điều trị mới." },
      { en: "patient", vi: "bệnh nhân", category: "Danh từ", example: "The doctor is examining the patient.", exampleVi: "Bác sĩ đang khám bệnh cho bệnh nhân." },
      { en: "insurance", vi: "bảo hiểm", category: "Danh từ", example: "Does your insurance cover this surgery?", exampleVi: "Bảo hiểm của bạn có chi trả cho ca phẫu thuật này không?" },
      { en: "examine", vi: "khám / kiểm tra", category: "Động từ", example: "The physician will examine you now.", exampleVi: "Bác sĩ sẽ kiểm tra bạn ngay bây giờ." },
      { en: "recover", vi: "hồi phục", category: "Động từ", example: "It took him a week to recover from the cold.", exampleVi: "Anh ấy mất một tuần để phục hồi sau cơn cảm lạnh." },
      { en: "medication", vi: "dược phẩm / thuốc", category: "Danh từ", example: "Take this medication after meals.", exampleVi: "Uống thuốc này sau bữa ăn." }
    ]
  },
  {
    day: 6,
    week: 1,
    title: "Ngày 6: Ôn tập Từ vựng & Luyện kỹ năng Đọc Email ngắn",
    objective: "Ôn tập 50 từ vựng đã học qua Flashcard. Học kỹ năng quét thông tin (scanning) trong email ngắn Part 7.",
    grammarFocus: "Kỹ năng quét thông tin email Part 7",
    practiceType: "reading_part7",
    vocabTopic: "Hợp đồng & Thư tín",
    vocabSubGroups: ["Contracts (Hợp đồng)", "Correspondences (Thư tín)"],
    theory: `### Kỹ Năng Đọc Hiểu Email Ngắn (TOEIC Part 7)
Phần thi Đọc hiểu thường gây nản chí cho người mất gốc vì bài đọc dài. Tuy nhiên, các câu hỏi trong email ngắn thường rất dễ lấy điểm nếu bạn biết cách tìm.

#### Các bước quét thông tin nhanh:
1. **Đọc tiêu đề Email:** Xác định Người gửi (From), Người nhận (To), Ngày gửi (Date) và Chủ đề (Subject).
2. **Đọc câu hỏi trước:** Xác định từ khóa (keywords) trong câu hỏi. Ví dụ: *Why, When, What request...*
3. **Dò từ khóa (Scan) trong bài:** Không đọc dịch từng từ từ đầu đến cuối. Hãy đưa mắt nhanh qua các đoạn để tìm đúng dòng có chứa từ khóa của câu hỏi. Câu trả lời thường nằm ngay trước hoặc sau từ khóa đó.`,
    staticVocab: [
      { en: "notify", vi: "thông báo", category: "Động từ", example: "Please notify us of any changes.", exampleVi: "Vui lòng thông báo cho chúng tôi về bất kỳ thay đổi nào." },
      { en: "postpone", vi: "hoãn lại", category: "Động từ", example: "The meeting was postponed to Thursday.", exampleVi: "Cuộc họp đã được hoãn lại đến thứ Năm." },
      { en: "cancel", vi: "hủy bỏ", category: "Động từ", example: "The event was canceled due to bad weather.", exampleVi: "Sự kiện đã bị hủy do thời tiết xấu." },
      { en: "policy", vi: "chính sách", category: "Danh từ", example: "Follow the company policy at all times.", exampleVi: "Tuân thủ chính sách của công ty mọi lúc." },
      { en: "procedure", vi: "quy trình / thủ tục", category: "Danh từ", example: "The procedure has been updated.", exampleVi: "Thủ tục đã được cập nhật." }
    ]
  },
  {
    day: 7,
    isWeeklyReview: true,
    week: 1,
    title: "Ngày 7: Đánh giá Tuần 1 (Mini-test 20 câu)",
    objective: "Tự kiểm tra kiến thức về Loại từ, Thì hiện tại và Từ vựng của Tuần 1 qua bài kiểm tra trắc nghiệm tổng hợp.",
    grammarFocus: "Loại từ & Thì hiện tại tổng hợp",
    practiceType: "grammar_quiz",
    vocabTopic: "Kế hoạch & Báo cáo",
    vocabSubGroups: ["Business planning (Kế hoạch kinh doanh)", "Financial Statements (Báo cáo tài chính)"],
    theory: `### Đánh giá Tuần 1
Hôm nay bạn sẽ làm một bài kiểm tra ngắn gồm 20 câu hỏi trắc nghiệm ngữ pháp và từ vựng tổng hợp của Tuần 1 để đánh giá mức độ tiếp thu kiến thức.

**Quy tắc tự kiểm tra:**
1. Hãy cố gắng tự làm trước khi xem giải thích của AI.
2. Với các câu sai, hãy ghi chép lại cấu trúc ngữ pháp bị nhầm lẫn vào "sổ tay lỗi sai" của bạn.
3. Ôn lại các từ vựng chưa thuộc của Tuần 1 trước khi bắt đầu Tuần 2.`,
    staticVocab: []
  },

  // WEEK 2
  {
    day: 8,
    week: 2,
    title: "Ngày 8: Ngữ pháp Loại từ Nâng cao & Chủ đề Nhân sự",
    objective: "Học các vị trí nâng cao của Loại từ. Học 10 từ vựng chủ đề Nhân sự & Tuyển dụng.",
    grammarFocus: "Loại từ Nâng cao (Word Forms)",
    practiceType: "grammar_quiz",
    vocabTopic: "Nhân Sự & Tuyển Dụng",
    vocabSubGroups: ["Job Advertising and Recruiting (Mô tả công việc và Tuyển dụng)", "Hiring and Training (Tuyển dụng và Đào tạo)", "Applying and Interviewing (Ứng tuyển và Phỏng vấn)", "Salaries and Benefits (Lương và Phúc lợi)"],
    theory: `### Vị Trí Loại Từ Nâng Cao
Ngoài các vị trí cơ bản ở Tuần 1, bạn cần chú ý các trường hợp đặc biệt sau:

- **Trạng từ bổ nghĩa cho Tính từ:** \`Trạng từ + Tính từ + Danh từ\`. Trạng từ sẽ đứng trước để bổ nghĩa trực tiếp cho tính từ.
  *Ví dụ:* *a extremely productive employee* (không dùng *extreme*).
- **Tính từ ghép dạng Phân từ (V-ed / V-ing):**
  - Dùng **V-ed** cho tính từ mang nghĩa bị động hoặc cảm xúc bị tác động (Ví dụ: *interested customer, updated report*).
  - Dùng **V-ing** cho tính từ mang nghĩa chủ động hoặc bản chất sự vật (Ví dụ: *exciting seminar, growing company*).`,
    staticVocab: [
      { en: "recruit", vi: "tuyển dụng", category: "Động từ / Danh từ", example: "We are recruiting for 5 positions.", exampleVi: "Chúng tôi đang tuyển dụng cho 5 vị trí." },
      { en: "application", vi: "đơn xin việc / sự ứng dụng", category: "Danh từ", example: "Submit your application by Friday.", exampleVi: "Nộp đơn ứng tuyển của bạn trước thứ Sáu." },
      { en: "resume", vi: "sơ yếu lý lịch / CV", category: "Danh từ", example: "Send your resume to HR.", exampleVi: "Gửi sơ yếu lý lịch của bạn cho phòng nhân sự." },
      { en: "interview", vi: "phỏng vấn", category: "Danh từ / Động từ", example: "The interview is on Wednesday.", exampleVi: "Cuộc phỏng vấn diễn ra vào thứ Tư." },
      { en: "hire", vi: "thuê / tuyển dụng", category: "Động từ", example: "We hired 10 new employees.", exampleVi: "Chúng tôi đã thuê 10 nhân viên mới." },
      { en: "position", vi: "vị trí (công việc)", category: "Danh từ", example: "We have an opening for this position.", exampleVi: "Chúng tôi có một vị trí đang mở cho chức vụ này." },
      { en: "vacancy", vi: "vị trí còn trống", category: "Danh từ", example: "There is a vacancy in accounting.", exampleVi: "Có một vị trí trống trong phòng kế toán." },
      { en: "qualifications", vi: "bằng cấp / năng lực chuyên môn", category: "Danh từ", example: "Strong qualifications required.", exampleVi: "Yêu cầu trình độ chuyên môn cao." },
      { en: "salary", vi: "lương (tính theo tháng/năm)", category: "Danh từ", example: "Competitive salary offered.", exampleVi: "Đưa ra mức lương cạnh tranh." },
      { en: "benefit", vi: "phúc lợi / lợi ích", category: "Danh từ / Động từ", example: "Benefits include health insurance.", exampleVi: "Các quyền lợi bao gồm bảo hiểm y tế." }
    ]
  },
  {
    day: 9,
    week: 2,
    title: "Ngày 9: Các thì Quá khứ & Tương lai & Luyện nghe Part 4",
    objective: "Nắm công thức Quá khứ đơn, Hiện tại hoàn thành và Tương lai đơn. Học kỹ năng nghe độc thoại ngắn Part 4.",
    grammarFocus: "Thì Quá khứ & Tương lai",
    practiceType: "grammar_quiz",
    vocabTopic: "Tiếp thị & Sự kiện",
    vocabSubGroups: ["Marketing (Tiếp thị)", "Events (Sự kiện)"],
    theory: `### Thì Quá Khứ Đơn, Hiện Tại Hoàn Thành & Tương Lai Đơn

#### 1. Quá Khứ Đơn (Simple Past)
- **Công thức:** \`S + V-ed / V2\`
- **Dấu hiệu:** \`yesterday, ago, last week/month, in + năm quá khứ\`
- *Ví dụ:* *They signed the contract yesterday.*

#### 2. Hiện Tại Hoàn Thành (Present Perfect)
- **Công thức:** \`S + have/has + V-ed / V3\`
- **Dấu hiệu:** \`since, for, already, yet, just, recently, so far\`
- *Ví dụ:* *We have already sent the invoice.*

#### 3. Tương Lai Đơn (Simple Future)
- **Công thức:** \`S + will + V-inf\`
- **Dấu hiệu:** \`tomorrow, next year, soon, shortly\`
- *Ví dụ:* *The manager will announce the results tomorrow.*

### Kỹ năng nghe Part 4 (Độc thoại ngắn)
- Giống như Part 3, bạn phải **đọc trước câu hỏi** trước khi nghe.
- Chú ý thông tin ở **câu đầu tiên** (thường giới thiệu địa điểm/ngữ cảnh) và **câu cuối cùng** (thường là hành động tiếp theo người nói sẽ làm).`,
    staticVocab: [
      { en: "probation", vi: "thời gian thử việc", category: "Danh từ", example: "A 3-month probation period applies.", exampleVi: "Áp dụng thời gian thử việc 3 tháng." },
      { en: "retire", vi: "nghỉ hưu", category: "Động từ", example: "She will retire at the end of the year.", exampleVi: "Cô ấy sẽ nghỉ hưu vào cuối năm nay." },
      { en: "reference", vi: "người tham khảo / tài liệu tham khảo", category: "Danh từ", example: "Please provide two references.", exampleVi: "Vui lòng cung cấp hai người giới thiệu." },
      { en: "onboarding", vi: "sự hội nhập / đào tạo nhân viên mới", category: "Danh từ", example: "Onboarding begins your first day.", exampleVi: "Quá trình giới thiệu nhân viên mới bắt đầu vào ngày đầu tiên của bạn." }
    ]
  },
  {
    day: 10,
    week: 2,
    title: "Ngày 10: Ngữ pháp Đại từ & Mạo từ & Chủ đề Bất động sản",
    objective: "Nắm vững cách dùng Đại từ nhân xưng, Đại từ sở hữu, Tính từ sở hữu và Mạo từ (a/an/the). Học từ vựng Bất động sản.",
    grammarFocus: "Đại từ & Mạo từ",
    practiceType: "grammar_quiz",
    vocabTopic: "Bất Động Sản",
    vocabSubGroups: ["Renting and Leasing (Thuê và Cho thuê)", "Property and Departments (Tài sản và Phòng ban)"],
    theory: `### Ngữ Pháp Đại Từ & Mạo Từ

#### 1. Mạo từ (Articles)
- **a/an:** Dùng cho danh từ số ít, đếm được, nhắc đến lần đầu. \`an\` dùng khi từ bắt đầu bằng nguyên âm (u, e, o, a, i).
- **the:** Dùng cho danh từ xác định (cả người nói và người nghe đều biết là cái nào).

#### 2. Đại từ nhân xưng & Tính từ sở hữu
- **Tính từ sở hữu** (my, your, his, her, its, our, their) **BẮT BUỘC** phải có danh từ đứng sau. (Ví dụ: *my office*).
- **Đại từ sở hữu** (mine, yours, his, hers, ours, theirs) đứng độc lập làm chủ ngữ hoặc tân ngữ thay thế cho cụm \`Tính từ sở hữu + Danh từ\`. (Ví dụ: *This desk is mine*).
- **Đại từ phản thân** (myself, yourself, himself...) dùng khi chủ ngữ và tân ngữ là cùng một đối tượng, hoặc để nhấn mạnh tự thân làm việc gì.`,
    staticVocab: [
      { en: "rent", vi: "thuê nhà / tiền thuê", category: "Động từ / Danh từ", example: "We rented a small office space.", exampleVi: "Chúng tôi đã thuê một không gian văn phòng nhỏ." },
      { en: "lease", vi: "hợp đồng cho thuê / cho thuê", category: "Danh từ / Động từ", example: "The lease expires next month.", exampleVi: "Hợp đồng thuê hết hạn vào tháng tới." },
      { en: "property", vi: "bất động sản / tài sản", category: "Danh từ", example: "The property is located downtown.", exampleVi: "Bất động sản này nằm ở trung tâm thành phố." },
      { en: "landlord", vi: "chủ nhà", category: "Danh từ", example: "The landlord agreed to repair the roof.", exampleVi: "Chủ nhà đã đồng ý sửa mái nhà." },
      { en: "tenant", vi: "người thuê nhà", category: "Danh từ", example: "The tenant must pay rent on the first day.", exampleVi: "Người thuê nhà phải trả tiền thuê vào ngày đầu tiên." },
      { en: "location", vi: "vị trí / địa điểm", category: "Danh từ", example: "We are looking for a convenient location.", exampleVi: "Chúng tôi đang tìm kiếm một địa điểm thuận tiện." },
      { en: "renovate", vi: "cải tạo / nâng cấp nhà cửa", category: "Động từ", example: "They renovated the kitchen last year.", exampleVi: "Họ đã cải tạo nhà bếp vào năm ngoái." },
      { en: "sublet", vi: "cho thuê lại", category: "Động từ", example: "He sublet his room during the summer.", exampleVi: "Anh ấy đã cho thuê lại phòng của mình trong suốt mùa hè." },
      { en: "deposit", vi: "tiền đặt cọc", category: "Danh từ / Động từ", example: "We paid a deposit of one month rent.", exampleVi: "Chúng tôi đã trả một khoản tiền đặt cọc bằng một tháng tiền thuê." },
      { en: "inspect", vi: "thanh tra / kiểm tra kỹ", category: "Động từ", example: "Inspect the house before buying.", exampleVi: "Kiểm tra ngôi nhà trước khi mua." }
    ]
  },
  {
    day: 11,
    week: 2,
    title: "Ngày 11: Ngữ pháp Giới từ & Luyện đọc Part 7",
    objective: "Học cách dùng giới từ chỉ Thời gian, Địa điểm và 10 cụm giới từ phổ biến nhất. Thực hành đọc đoạn đơn Part 7.",
    grammarFocus: "Giới từ thông dụng",
    practiceType: "grammar_quiz",
    vocabTopic: "Sản xuất & Chất lượng",
    vocabSubGroups: ["Product Development (Phát triển sản phẩm)", "Quality Control (Quản trị chất lượng)"],
    theory: `### Giới Từ Chỉ Thời Gian & Địa Điểm

#### 1. Giới từ chỉ Thời gian
- **in:** Dùng cho tháng, năm, thế kỷ, buổi trong ngày (Ví dụ: *in August, in 2025, in the morning*).
- **on:** Dùng cho ngày cụ thể hoặc thứ trong tuần (Ví dụ: *on Monday, on October 12*).
- **at:** Dùng cho giờ cụ thể hoặc thời điểm (Ví dụ: *at 9 AM, at noon*).
- **within:** Trong vòng bao lâu (Ví dụ: *within 5 days*).

#### 2. Giới từ chỉ Địa điểm
- **in:** Bên trong không gian kín, thành phố, quốc gia.
- **on:** Trên bề mặt phẳng, tầng lầu.
- **at:** Địa điểm cụ thể, số nhà.

#### 3. Các cụm giới từ phổ biến trong TOEIC
- **in charge of:** chịu trách nhiệm về.
- **in advance:** trước / sớm (Ví dụ: *register in advance*).
- **on behalf of:** thay mặt cho ai.
- **due to / because of:** do bởi / vì.`,
    staticVocab: [
      { en: "utility", vi: "dịch vụ điện nước / tiện ích", category: "Danh từ", example: "Water and electricity are utilities.", exampleVi: "Nước và điện là các tiện ích." },
      { en: "furnished", vi: "được trang bị đồ đạc sẵn", category: "Tính từ", example: "The apartment is fully furnished.", exampleVi: "Căn hộ được trang bị đầy đủ nội thất." }
    ]
  },
  {
    day: 12,
    week: 2,
    title: "Ngày 12: Liên từ & Từ nối & Chủ đề Nhà hàng",
    objective: "Phân biệt Liên từ và Giới từ chỉ nguyên nhân/nhượng bộ. Học 10 từ vựng chủ đề Nhà hàng & Ăn uống.",
    grammarFocus: "Liên từ & Từ nối",
    practiceType: "grammar_quiz",
    vocabTopic: "Ăn uống & Nhà hàng",
    vocabSubGroups: ["Eating out (Đi ăn ngoài)", "Selecting A Restaurant (Chọn nhà hàng)", "Ordering Lunch (Đặt bữa trưa)", "Cooking As A Career (Nấu ăn là sự nghiệp)"],
    theory: `### Liên Từ vs Giới Từ
Học viên mất gốc thường sai ở phần này vì không phân biệt được cấu trúc sau Liên từ và Giới từ mặc dù chúng có nghĩa giống nhau.

- **QUY TẮC CỐT LÕI:**
  - **Liên từ (Conjunction) + Mệnh đề (Chủ ngữ + Động từ)**
  - **Giới từ (Preposition) + Cụm danh từ / V-ing**

#### Các cặp từ tương đương hay gặp:
1. **Bởi vì:**
   - Liên từ: \`because, since, as\`
   - Giới từ: \`because of, due to, owing to\`
2. **Mặc dù:**
   - Liên từ: \`although, even though, though\`
   - Giới từ: \`despite, in spite of\`
3. **Trong khi / Trong suốt:**
   - Liên từ: \`while\` (Ví dụ: *while I was working*)
   - Giới từ: \`during\` (Ví dụ: *during the meeting*)`,
    staticVocab: [
      { en: "chef", vi: "đầu bếp trưởng", category: "Danh từ", example: "The chef prepared a special dish.", exampleVi: "Đầu bếp đã chuẩn bị một món ăn đặc biệt." },
      { en: "menu", vi: "thực đơn", category: "Danh từ", example: "May I see the menu, please?", exampleVi: "Tôi có thể xem thực đơn được không?" },
      { en: "beverage", vi: "đồ uống", category: "Danh từ", example: "Beer and soda are popular beverages.", exampleVi: "Bia và nước có ga là các đồ uống phổ biến." },
      { en: "reservation", vi: "sự đặt chỗ trước", category: "Danh từ", example: "We made a reservation for four.", exampleVi: "Chúng tôi đã đặt chỗ cho bốn người." },
      { en: "service", vi: "dịch vụ / sự phục vụ", category: "Danh từ", example: "The food is good but the service is slow.", exampleVi: "Thức ăn rất ngon nhưng phục vụ lại chậm." },
      { en: "tip", vi: "tiền boa / mẹo nhỏ", category: "Danh từ / Động từ", example: "Leave a tip for the waiter.", exampleVi: "Hãy để lại tiền boa cho người phục vụ." },
      { en: "ingredient", vi: "thành phần / nguyên liệu", category: "Danh từ", example: "Mix all the ingredients in a bowl.", exampleVi: "Trộn tất cả các nguyên liệu vào một cái bát." },
      { en: "delicious", vi: "ngon miệng", category: "Tính từ", example: "This chocolate cake is delicious.", exampleVi: "Chiếc bánh sô cô la này rất ngon." },
      { en: "catering", vi: "dịch vụ cung cấp tiệc ăn uống", category: "Danh từ", example: "She runs a catering business.", exampleVi: "Cô ấy điều hành một dịch vụ cung cấp đồ ăn uống." },
      { en: "review", vi: "nhận xét / đánh giá", category: "Danh từ / Động từ", example: "Read restaurant reviews before going.", exampleVi: "Hãy đọc các đánh giá nhà hàng trước khi đi." }
    ]
  },
  {
    day: 13,
    week: 2,
    title: "Ngày 13: Ngữ pháp So sánh & Luyện nghe Part 2",
    objective: "Nắm vững công thức So sánh hơn, So sánh nhất và So sánh bằng. Ôn luyện phản xạ nghe Part 2.",
    grammarFocus: "Cấu trúc So sánh",
    practiceType: "grammar_quiz",
    vocabTopic: "Vận chuyển & Hàng hóa",
    vocabSubGroups: ["Shipping (Vận chuyển)", "Inventory (Hàng hóa)"],
    theory: `### Các Cấu Trúc So Sánh Cần Nhớ

#### 1. So sánh bằng (Equal comparison)
- **Công thức:** \`as + Tính từ / Trạng từ + as\`
- *Ví dụ:* *This copier is as fast as the old one.*

#### 2. So sánh hơn (Comparative)
- **Tính từ/Trạng từ ngắn:** \`Từ-er + than\` (Ví dụ: *cheaper than, faster than*)
- **Tính từ/Trạng từ dài:** \`more + Từ + than\` (Ví dụ: *more expensive than*)
- **Dạng bất quy tắc:** \`good/well -> better\`, \`bad/badly -> worse\`

#### 3. So sánh nhất (Superlative)
- **Tính từ/Trạng từ ngắn:** \`the + Từ-est\` (Ví dụ: *the cheapest, the fastest*)
- **Tính từ/Trạng từ dài:** \`the most + Từ\` (Ví dụ: *the most reliable*)
- **Dạng bất quy tắc:** \`good -> the best\`, \`bad -> the worst\``,
    staticVocab: [
      { en: "appetizer", vi: "món khai vị", category: "Danh từ", example: "We ordered appetizers first.", exampleVi: "Chúng tôi đã gọi món khai vị trước." },
      { en: "entree", vi: "món chính", category: "Danh từ", example: "Fish is my favorite entree.", exampleVi: "Cá là món ăn chính yêu thích của tôi." },
      { en: "recipe", vi: "công thức nấu ăn", category: "Danh từ", example: "Follow the recipe to cook this.", exampleVi: "Làm theo công thức để nấu món này." }
    ]
  },
  {
    day: 14,
    isWeeklyReview: true,
    week: 2,
    title: "Ngày 14: Đánh giá Tuần 2 (Mini-test 30 câu)",
    objective: "Kiểm tra toàn bộ phần ngữ pháp và từ vựng cốt lõi của tuần 2 (Liên từ, So sánh, Giới từ, Đại từ).",
    grammarFocus: "Ngữ pháp Tuần 2 tổng hợp",
    practiceType: "grammar_quiz",
    vocabTopic: "Bảo hành & Bảo hiểm",
    vocabSubGroups: ["Warranties (bảo hành)", "Health Insurance (Bảo hiểm sức khỏe)"],
    theory: `### Đánh giá Tuần 2
Hôm nay bạn sẽ thực hiện bài kiểm tra trắc nghiệm tổng hợp gồm 30 câu Part 5 để đánh giá tiến độ. 

**Mục tiêu điểm số:** Đúng trên 15 câu là đạt yêu cầu. 
Hãy đọc kỹ phần giải thích đáp án của AI cho các câu làm sai để ghi lại kiến thức cần bổ sung.`,
    staticVocab: []
  },

  // WEEK 3
  {
    day: 15,
    week: 3,
    title: "Ngày 15: Luyện đề chuyên sâu Part 1 & Part 2",
    objective: "Luyện đề thi thử Part 1 (6 câu) và Part 2 (25 câu). Nghe lại và phân tích bản dịch transcript.",
    grammarFocus: "TOEIC Listening Part 1 & 2",
    practiceType: "listening_part2",
    vocabTopic: "Công nghệ & Điện tử",
    vocabSubGroups: ["Computers (Máy tính)", "Electronics (Điện tử)"],
    theory: `### Chiến Thuật Phòng Thi Cho Part 1 & Part 2

- **Part 1 (Mô tả tranh):** 
  - Hãy loại trừ đáp án có từ ngữ "quá chi tiết" hoặc mang tính suy diễn suy đoán không có sẵn trong ảnh.
  - Chú ý dạng bị động của hiện tại tiếp diễn \`being + V-ed\` chỉ xuất hiện khi có người đang tác động vào vật trong tranh.
- **Part 2 (Hỏi - Đáp):**
  - Tránh các đáp án có từ đồng âm nhưng khác nghĩa.
  - Hãy linh hoạt với các câu trả lời gián tiếp (Ví dụ: Hỏi *Who has the key?* -> Trả lời *Ask John* thay vì chỉ trả lời tên người trực tiếp).`,
    staticVocab: []
  },
  {
    day: 16,
    week: 3,
    title: "Ngày 16: Luyện đề chuyên sâu Part 3 & Part 4",
    objective: "Luyện nghe hiểu Part 3 và Part 4. Áp dụng triệt để kỹ thuật đọc trước câu hỏi.",
    grammarFocus: "TOEIC Listening Part 3 & 4",
    practiceType: "listening_part3",
    vocabTopic: "Thăng tiến & Lương hưu",
    vocabSubGroups: ["Promotions, Pensions and Awards (Thăng tiến, Lương hưu và Giải thưởng)", "Accounting (Kế toán)"],
    theory: `### Kỹ Thuật Đọc Trước Câu Hỏi (Previewing)
Khi loa bắt đầu đọc hướng dẫn, bạn phải tận dụng từng giây để đọc lướt 3 câu hỏi tiếp theo. 

#### Các thông tin cần gạch chân trong đầu:
1. **Who is talking?** (Người nói là ai? Ví dụ: *customer, repairperson*)
2. **What problem is mentioned?** (Vấn đề gì xảy ra? Ví dụ: *broken device, late delivery*)
3. **What will the listener do next?** (Người nghe sẽ làm gì tiếp theo? Ví dụ: *send email, make payment*)

Khi nghe thấy từ khóa trùng khớp trong bài nói, hãy chọn ngay đáp án và chuyển sang đọc tiếp 3 câu hỏi của đoạn tiếp theo.`,
    staticVocab: []
  },
  {
    day: 17,
    week: 3,
    title: "Ngày 17: Chiến thuật tăng tốc độ Part 5",
    objective: "Luyện làm 30 câu trắc nghiệm Part 5 dưới áp lực thời gian (tối đa 15 phút).",
    grammarFocus: "TOEIC Reading Part 5",
    practiceType: "grammar_quiz",
    vocabTopic: "Dịch vụ & Khách sạn",
    vocabSubGroups: ["Car Rentals (Thuê ô tô)", "Hotels (Khách sạn)"],
    theory: `### Chiến Thuật Quản Lý Thời Gian Part 5
Lỗi lớn nhất của người mới học là tốn quá nhiều thời gian cho Part 5 khiến không kịp làm Part 7. Bạn chỉ được phép làm Part 5 trong tối đa **15 phút** (trung bình 30 giây/câu).

#### Quy tắc phân loại câu hỏi:
1. **Câu hỏi ngữ pháp (Vị trí từ loại, đại từ, so sánh):** Làm trong **10-15 giây**. Chỉ cần nhìn từ trước và sau chỗ trống để chọn ngay loại từ thích hợp.
2. **Câu hỏi thì động từ / liên từ:** Làm trong **20-30 giây**. Tìm trạng từ chỉ thời gian hoặc mối quan hệ giữa 2 vế câu.
3. **Câu hỏi từ vựng:** Làm trong **35-40 giây**. Nếu đọc không hiểu nghĩa trong vòng 20 giây, hãy chọn đại một đáp án khả thi nhất và đi tiếp để dành thời gian cho phần khác.`,
    staticVocab: []
  },
  {
    day: 18,
    week: 3,
    title: "Ngày 18: Chiến thuật điền đoạn văn Part 6",
    objective: "Thực hành làm 16 câu điền từ vào đoạn văn Part 6. Học cách chọn câu văn liên kết phù hợp.",
    grammarFocus: "TOEIC Reading Part 6",
    practiceType: "reading_part6",
    vocabTopic: "Giải trí & Truyền thông",
    vocabSubGroups: ["Media (Truyền thông)", "Movies (Phim ảnh)"],
    theory: `### Kỹ Năng Điền Từ Vào Đoạn Văn (Part 6)
Part 6 gồm 4 đoạn văn, mỗi đoạn có 4 câu hỏi. Các câu hỏi bao gồm điền từ loại, thì động từ, từ vựng và điền cả một câu văn thích hợp.

#### Mẹo làm bài:
1. **Không làm rời rạc:** Hãy đọc lướt qua cả đoạn văn để nắm rõ chủ đề chung và mốc thời gian của đoạn trước khi chọn từ.
2. **Điền câu văn phù hợp:** Để điền được câu văn thích hợp vào chỗ trống, bạn cần đọc kỹ câu ngay trước và câu ngay sau nó để tìm mối liên kết logic (tương phản, nguyên nhân, hay bổ sung thông tin).`,
    staticVocab: []
  },
  {
    day: 19,
    week: 3,
    title: "Ngày 19: Luyện kỹ năng Đọc hiểu Đoạn đơn (Part 7)",
    objective: "Học phương pháp định vị thông tin nhanh (scanning) để xử lý các bài đọc đơn Part 7.",
    grammarFocus: "TOEIC Reading Part 7 Đoạn đơn",
    practiceType: "reading_part7",
    vocabTopic: "Nghệ thuật & Sự kiện",
    vocabSubGroups: ["Theater (Rạp phim)", "Museums (Bảo tàng)"],
    theory: `### Kỹ Thuật Đọc Hiểu Đoạn Đơn (Part 7)
Mục tiêu 400 điểm yêu cầu bạn làm tốt phần đoạn đơn (câu 147 - 175) vì thông tin ngắn và dễ tìm hơn các đoạn kép/ba phía sau.

#### Phương pháp đọc 3 bước:
1. **Xác định thể loại bài đọc:** Đây là thư điện tử (email), thông báo (announcement), quảng cáo (advertisement) hay bài báo (article)?
2. **Đọc câu hỏi trước và định vị từ khóa:** Ví dụ câu hỏi hỏi về *deadline* -> Tìm các con số hoặc ngày tháng trong bài.
3. **Đọc lướt xung quanh vị trí tìm thấy từ khóa:** Thường câu trả lời sẽ dùng từ đồng nghĩa hoặc cách diễn đạt khác của thông tin trong bài viết.`,
    staticVocab: []
  },
  {
    day: 20,
    week: 3,
    title: "Ngày 20: Ôn tập Từ vựng Tổng hợp",
    objective: "Ôn tập 120 từ vựng đã học và kiểm tra phản xạ từ vựng ngẫu nhiên.",
    grammarFocus: "Trắc nghiệm từ vựng tổng hợp",
    practiceType: "grammar_quiz",
    vocabTopic: "Âm nhạc & Nha khoa",
    vocabSubGroups: ["Music (Âm nhạc)", "Dentist’s Office (Phòng khám nha khoa)"],
    theory: `### Ôn Tập Từ Vựng Tổng Hợp
Từ vựng chính là chìa khóa quyết định điểm số TOEIC của bạn. Hôm nay chúng ta sẽ dành thời gian để ôn tập lại toàn bộ các nhóm từ vựng của 3 tuần vừa qua.

**Mẹo nhớ từ lâu:**
- Đừng học từ đơn lẻ, hãy đọc lại các câu ví dụ mẫu.
- Kết hợp nghe loa đọc để gắn liền phát âm với mặt chữ.`,
    staticVocab: []
  },
  {
    day: 21,
    isWeeklyReview: true,
    week: 3,
    title: "Ngày 21: Đánh giá Tuần 3 (Luyện đề Đọc / Nghe)",
    objective: "Thực hiện bài kiểm tra hỗn hợp để tự đánh giá điểm số và phản xạ thực chiến.",
    grammarFocus: "Học chung",
    practiceType: "grammar_quiz",
    vocabTopic: "Hội nghị",
    vocabSubGroups: ["Conferences (Hội nghị)"],
    theory: `### Đánh giá Tuần 3
Hôm nay bạn sẽ làm một bài test tổng hợp để đo lường khả năng phản xạ và ghi điểm sau 3 tuần ôn tập chăm chỉ. 

Hãy tập trung làm bài trong không gian yên tĩnh và ghi lại các câu sai để rút kinh nghiệm sâu sắc.`,
    staticVocab: []
  },

  // WEEK 4
  {
    day: 22,
    week: 4,
    title: "Ngày 22: Thi thử Full Listening (100 câu)",
    objective: "Bấm giờ làm bài thi nghe hoàn chỉnh trong 45 phút để rèn luyện sự tập trung liên tục.",
    grammarFocus: "Full Listening Mock Test",
    practiceType: "listening_part3",
    vocabTopic: "Học chung",
    vocabSubGroups: [],
    theory: `### Kỹ Thuật Tập Trung Trong Phần Nghe (Listening)
Nghe 100 câu liên tục trong 45 phút rất dễ gây mệt mỏi và mất tập trung. 

**Lời khuyên phòng thi:**
- Nếu bạn lỡ bỏ qua một câu hỏi, **hãy bỏ qua nó hoàn toàn** và tập trung ngay vào câu tiếp theo. Việc tiếc nuối câu cũ sẽ khiến bạn mất tiếp 3-4 câu sau.
- Luôn giữ nhịp đọc trước câu hỏi cho Part 3 và Part 4.`,
    staticVocab: []
  },
  {
    day: 23,
    week: 4,
    title: "Ngày 23: Thi thử Full Reading (100 câu)",
    objective: "Bấm giờ làm bài thi đọc hoàn chỉnh trong 75 phút để thử nghiệm chiến lược phân bổ thời gian.",
    grammarFocus: "Full Reading Mock Test",
    practiceType: "reading_part7",
    vocabTopic: "Học chung",
    vocabSubGroups: [],
    theory: `### Chiến Thuật Phân Bổ Thời Gian 75 Phút Phần Đọc
- **Part 5:** Làm trong **15 phút**.
- **Part 6:** Làm trong **10 phút**.
- **Part 7:** Làm trong **50 phút**.

**Chú ý:** Gặp câu hỏi khó hoặc bài đọc quá dài, hãy bỏ qua để làm các bài đọc ngắn/dễ trước. Đảm bảo bạn trả lời hết các câu hỏi dễ để ăn trọn điểm.`,
    staticVocab: []
  },
  {
    day: 24,
    week: 4,
    title: "Ngày 24: Khắc phục điểm yếu & Tổng ôn Ngữ pháp",
    objective: "Xem lại sổ lỗi sai từ 2 bài thi thử. Tổng ôn tập 6 điểm ngữ pháp cốt lõi.",
    grammarFocus: "Hệ thống ngữ pháp cốt lõi",
    practiceType: "grammar_quiz",
    vocabTopic: "Học chung",
    vocabSubGroups: [],
    theory: `### Hệ Thống Lại 6 Điểm Ngữ Pháp Quyết Định Điểm Số
1. **Loại từ (Word Forms):** Đuôi từ và vị trí đứng trong câu.
2. **Thì động từ:** Hiện tại đơn, hiện tại tiếp diễn, quá khứ đơn, hiện tại hoàn thành, tương lai đơn.
3. **Giới từ:** in, on, at, by, for, within... và các cụm giới từ thông dụng.
4. **Liên từ:** because, although, while, during...
5. **Đại từ:** my, mine, myself... và mạo từ.
6. **So sánh:** So sánh hơn, so sánh nhất.`,
    staticVocab: []
  },
  {
    day: 25,
    week: 4,
    title: "Ngày 25: Nhận diện bẫy trong phần thi Nghe",
    objective: "Tìm hiểu và cách phòng tránh các bẫy đồng âm, bẫy thông tin nhiễu trong Part 1, 2, 3.",
    grammarFocus: "Nhận diện bẫy TOEIC Listening",
    practiceType: "listening_part2",
    vocabTopic: "Học chung",
    vocabSubGroups: [],
    theory: `### Các Bẫy Phổ Biến Trong Phần Nghe

#### 1. Bẫy đồng âm (Part 1 & Part 2)
- Từ trên câu hỏi và đáp án có phát âm giống nhau nhưng nghĩa khác nhau (Ví dụ: *copy* và *coffee*, *key* và *quay*). 

#### 2. Bẫy thông tin nhiễu (Part 3 & Part 4)
- Đáp án chứa chính xác từ nghe được trong bài nhưng thông tin xung quanh bị sai lệch hoặc không phải là câu trả lời cho câu hỏi cụ thể đó. Hãy đọc kỹ câu hỏi hỏi về ai hoặc cái gì trước khi chọn.`,
    staticVocab: []
  },
  {
    day: 26,
    week: 4,
    title: "Ngày 26: Nhận diện bẫy trong phần thi Đọc",
    objective: "Tránh các bẫy từ loại, bẫy thông tin tương tự trong phần đọc hiểu Part 5, 7.",
    grammarFocus: "Nhận diện bẫy TOEIC Reading",
    practiceType: "grammar_quiz",
    vocabTopic: "Học chung",
    vocabSubGroups: [],
    theory: `### Các Bẫy Phổ Biến Trong Phần Đọc

#### 1. Bẫy loại từ (Word forms)
- Nhầm lẫn giữa Danh từ chỉ người (worker, supervisor) và danh từ chỉ vật/sự việc (work, supervision). 

#### 2. Bẫy phủ định ngầm (Part 7)
- Bài viết dùng các từ phủ định nhẹ hoặc trạng từ tần suất thấp như \`rarely, except, unless, postpone\` để thay đổi bản chất thông tin.`,
    staticVocab: []
  },
  {
    day: 27,
    week: 4,
    title: "Ngày 27: Thi thử Full Listening Test 2",
    objective: "Luyện thi thử nghe lần cuối để củng cố phản xạ nghe.",
    grammarFocus: "Listening Mock Test 2",
    practiceType: "listening_part3",
    vocabTopic: "Học chung",
    vocabSubGroups: [],
    theory: `### Giữ Vững Tâm Lý Phòng Thi
Hãy cố gắng nghe trọn vẹn 45 phút, áp dụng triệt để phương pháp loại trừ và ghi điểm ở những câu hỏi dễ.`,
    staticVocab: []
  },
  {
    day: 28,
    isWeeklyReview: true,
    week: 4,
    title: "Ngày 28: Thi thử Full Reading Test 2",
    objective: "Luyện thi thử đọc lần cuối để ổn định tốc độ và kỹ năng quản lý thời gian.",
    grammarFocus: "Reading Mock Test 2",
    practiceType: "reading_part7",
    vocabTopic: "Học chung",
    vocabSubGroups: [],
    theory: `### Ổn Định Tốc Độ Làm Bài
Kiểm tra xem bạn có hoàn thành phần Part 5 trong đúng 15 phút hay không. Hãy dành nhiều thời gian hơn cho các đoạn đơn của Part 7 để ăn điểm chắc chắn.`,
    staticVocab: []
  },
  {
    day: 29,
    week: 4,
    title: "Ngày 29: Tổng ôn tập Sổ lỗi sai",
    objective: "Đọc lại toàn bộ các lỗi sai đã ghi chép. Ôn lại 120 từ vựng cốt lõi qua Flashcard.",
    grammarFocus: "Học chung",
    practiceType: "grammar_quiz",
    vocabTopic: "Học chung",
    vocabSubGroups: [],
    theory: `### Đọc Lại Sổ Lỗi Sai - Phương Pháp Vàng
Xem lại những lỗi bạn hay mắc phải trong các bài thi thử trước. Bộ não có xu hướng lặp lại sai lầm cũ, vì vậy việc đọc lại các câu sai sẽ giúp bạn khắc sâu quy tắc đúng ngay trước ngày thi.`,
    staticVocab: []
  },
  {
    day: 30,
    week: 4,
    title: "Ngày 30: Chuẩn bị tâm lý & Nghỉ ngơi trước giờ G",
    objective: "Nghỉ ngơi đầu óc. Xem lại 5 quy tắc vàng làm bài thi. Đi ngủ sớm.",
    grammarFocus: "Chiến lược phòng thi",
    practiceType: "grammar_quiz",
    vocabTopic: "Học chung",
    vocabSubGroups: [],
    theory: `### 5 Quy Tắc Vàng Khi Đi Thi TOEIC
1. **KHÔNG bỏ trống câu nào:** Điền đầy đủ đáp án vào tờ trả lời (Answer sheet) kể cả khi không biết câu trả lời. TOEIC không trừ điểm câu sai.
2. **Quyết đoán:** Không dành quá 45 giây cho một câu Part 5. Cứ đi tiếp.
3. **Đọc trước câu hỏi:** Luôn duy trì thói quen đọc câu hỏi trước loa trong phần Listening Part 3 & 4.
4. **Loại trừ đáp án bẫy:** Chú ý các bẫy đồng âm trong Part 2.
5. **Giữ tinh thần thoải mái:** Đi thi với tâm thế tự tin nhất! Bạn đã chuẩn bị rất tốt trong 30 ngày qua.`,
    staticVocab: []
  }
];
