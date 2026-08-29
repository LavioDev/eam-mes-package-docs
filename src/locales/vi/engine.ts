export default {
  title: 'Module Engine & Generator CLI',
  subtitle: 'Phân hệ Module Engine được thiết kế giúp package {pkg} hoạt động hoàn toàn độc lập, hỗ trợ {autoDiscovery} và cung cấp lệnh {cli} tạo module mới chỉ với 1 câu lệnh.',
  autoDiscovery: 'Tự động phát hiện (Auto-Discovery)',
  cli: 'Generator CLI',
  bodyTitle: 'Module Engine, Auto-Discovery & Generator CLI',
  bodyDesc: 'Kiến trúc bên trong và cơ chế vận hành của Module Engine:',
  sec1Title: '1. Kiến trúc Độc lập & Auto-Discovery',
  abstractProviderDesc: 'Mọi submodule trong package (như {submodules}) kế thừa lớp cơ sở này. Lớp tự động nạp {routes} và tự quản lý danh sách file migration trong phương thức {method} mà không cần phụ thuộc vào Host App.',
  moduleRegistryDesc: 'Tự động quét thư mục {dir} để đăng ký các module hoạt động. Hỗ trợ bật/tắt module linh hoạt qua cấu hình {config}.',
  providerHeader: 'Khai báo Module Provider (`Register.php`)',
  sec2Title: '2. Generator CLI (`php artisan eam:make-module`)',
  cliDesc: 'Cho phép lập trình viên tạo nhanh bộ khung module chuẩn (Scaffolding) bao gồm Register Provider, routes.php, Eloquent Model, Migration, Form Requests, Services và CRUD Actions.',
  cliHeader: 'Lệnh Generator CLI trong Terminal',
  sec3Title: '3. Cấu trúc Scaffolding Tự Động Sinh',
  cards: {
    registerTitle: 'Register.php & routes.php',
    registerDesc: 'Tự động kế thừa AbstractModuleProvider và định nghĩa các endpoints RESTful API chuẩn có versioning và middleware auth.',
    modelTitle: 'Eloquent Model & Migration',
    modelDesc: 'Tự động cấu hình HasUuids, mảng $fillable, casts() và file migration có tiền tố chuẩn eamo_.',
    actionsTitle: 'Actions & Service Layer (--crud)',
    actionsDesc: 'Sinh sẵn bộ 5 Single-Action Classes (Index, Store, Show, Update, Delete) áp dụng Lorisleiva\\Actions\\Concerns\\AsAction kèm Service layer độc lập.'
  }
}
