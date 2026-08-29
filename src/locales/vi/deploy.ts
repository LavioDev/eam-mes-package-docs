export default {
  title: 'Quy trình Triển khai Package',
  subtitle: 'Hướng dẫn chi tiết quy trình chèn thư viện vào hệ thống Laravel và publish tài nguyên tương ứng:',
  envReqTitle: 'Yêu cầu môi trường',
  envReqDesc: 'Đảm bảo dự án của bạn sử dụng {laravel} và {php}. Gói Laravel Package này yêu cầu định dạng UUID cho khoá chính (Primary Key) trong toàn bộ cơ sở dữ liệu.',
  step1: {
    title: 'Cài đặt gói Package',
    desc: 'Thêm khai báo repository và yêu cầu gói vào tệp composer.json của bạn:',
    updateDesc: 'Sau đó chạy lệnh cập nhật để cài đặt:'
  },
  step2: {
    title: 'Publish file cấu hình chính',
    desc: 'File config chính sẽ được copy từ vendor sang đường dẫn config/eam.php để quản lý whitelist bảng, middleware và danh sách class mở rộng:'
  },
  step3: {
    title: 'Publish phân hệ Cốt lõi (Core Submodule)',
    desc: 'Phân hệ Cốt lõi chứa bảng quản lý yêu cầu mở rộng Schema động (eamo_extension_requests). Đây là nền tảng bắt buộc để hệ thống vận hành và đồng bộ dữ liệu:'
  },
  step4: {
    title: 'Publish module Dữ liệu gốc Thiết bị (Masterdata Equipment Module)',
    desc: 'Định nghĩa cấu trúc dữ liệu gốc của thiết bị (bảng eamo_equipment, eamo_equipment_categories, eamo_equipment_states, eamo_equipment_images, eamo_equipment_parameters, và eamo_equipment_errors) giúp thiết lập nền tảng liên kết cho mọi nghiệp vụ vận hành:'
  },
  step5: {
    title: 'Publish các Module nghiệp vụ khác & Submodule',
    desc: 'Bạn có thể publish toàn bộ các module và submodule cùng lúc, hoặc lựa chọn cụ thể theo nhu cầu của dự án:'
  },
  step6: {
    title: 'Thực thi migrate cơ sở dữ liệu',
    desc: 'Tạo các bảng cơ sở dữ liệu eamo_* trong DB:'
  },
  warningTitle: 'Cảnh báo khi chạy migrations',
  warningDesc: 'Đảm bảo đã sao lưu cơ sở dữ liệu trước khi chạy lệnh php artisan migrate trên môi trường production.'
}
