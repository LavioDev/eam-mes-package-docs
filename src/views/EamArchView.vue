<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  copySnippet?: (id: string) => void
}>()

const activeTab = ref('overview')
const activeSubmodule = ref('masterdata')

const handleCopy = (id: string) => {
  if (props.copySnippet) {
    props.copySnippet(id)
  } else {
    const el = document.getElementById(id)
    if (el) {
      navigator.clipboard.writeText(el.innerText)
    }
  }
}

// Hàm render lại các sơ đồ Mermaid khi chuyển tab
const renderMermaid = () => {
  nextTick(() => {
    if (window.mermaid) {
      try {
        // Chỉ chạy trên các element chưa được xử lý (không có data-processed)
        window.mermaid.run({
          querySelector: '.mermaid:not([data-processed])'
        })
      } catch (e) {
        try {
          window.mermaid.init(undefined, document.querySelectorAll('.mermaid:not([data-processed])'))
        } catch (err) {
          console.error('Local Mermaid render error:', err)
        }
      }
    }
  })
}

// Theo dõi sự thay đổi của tab chính và tab nghiệp vụ con để cập nhật Mermaid
watch([activeTab, activeSubmodule], () => {
  renderMermaid()
}, { immediate: true })
</script>

<template>
  <section id="view-eam-arch" class="view-panel active">
    <h1>Thiết kế &amp; Kiến trúc Module EAM</h1>
    <p class="subtitle-desc">Hệ thống EAM MES Package cung cấp các phân hệ lõi phục vụ giám sát thiết bị và vận hành nhà máy. Các thành phần được đóng gói dưới dạng Laravel Package chuẩn để dễ dàng cắm ghép vào dự án doanh nghiệp.</p>

    <!-- Menu điều hướng ngang dạng Tab -->
    <div class="tabs-nav">
      <button class="tab-btn" :class="{ active: activeTab === 'overview' }" @click="activeTab = 'overview'">
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        Tổng quan ứng dụng
      </button>
      <button class="tab-btn" :class="{ active: activeTab === 'submodules' }" @click="activeTab = 'submodules'">
        <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
        </svg>
        Nghiệp vụ &amp; Database
      </button>
    </div>

    <!-- TABS CONTENT -->
    
    <!-- 1. TAB TỔNG QUAN -->
    <div v-if="activeTab === 'overview'" class="tab-pane-content">
      <h2>Kiến trúc Tổng quan Backend Application</h2>
      <p>Hệ thống Backend được xây dựng trên nền tảng <strong>Laravel 13</strong> (PHP 8.4) áp dụng mô hình kết hợp giữa <strong>Layered Architecture (Kiến trúc phân lớp)</strong> và <strong>Modular Architecture (Kiến trúc mô-đun)</strong> giúp hệ thống đạt tính mô-đun hóa cao, dễ dàng bảo trì và đóng gói.</p>

      <div class="code-container" style="margin-top: 16px;">
        <div class="code-header">
          <span>Cấu trúc Thư mục Lõi Backend (backend/)</span>
          <button class="btn-copy" @click="handleCopy('code-backend-dir')">Copy</button>
        </div>
        <pre class="code-content" id="code-backend-dir" style="color: #a1a1aa; line-height: 1.7; font-family: var(--font-mono); font-size: 13px;">
backend/
├── <span style="color: #38bdf8; font-weight: 600;">app/</span>                      # Các thành phần lõi của ứng dụng
│   ├── <span style="color: #38bdf8; font-weight: 600;">Bridge/</span>               # Lớp cầu nối tinh chỉnh thư viện 3rd party (Laravel Passport JWT)
│   ├── <span style="color: #38bdf8; font-weight: 600;">Builders/</span>             # Eloquent Query Builders tùy chỉnh
│   ├── <span style="color: #38bdf8; font-weight: 600;">Concerns/</span>             # Traits tái sử dụng trong hệ thống
│   ├── <span style="color: #38bdf8; font-weight: 600;">Enums/</span>                # Các Enumerations định nghĩa hằng số nghiệp vụ
│   ├── <span style="color: #38bdf8; font-weight: 600;">Extensions/</span>           # Mở rộng các thành phần của Framework
│   ├── <span style="color: #38bdf8; font-weight: 600;">Http/</span>                 # Controllers, Requests, Resources, Middleware
│   ├── <span style="color: #38bdf8; font-weight: 600;">Models/</span>               # Eloquent Models cơ sở (User, Company, Department, Notification)
│   ├── <span style="color: #38bdf8; font-weight: 600;">Notifications/</span>        # Các thông báo hệ thống (Database, Mail...)
│   ├── <span style="color: #38bdf8; font-weight: 600;">Providers/</span>            # Service Providers đăng ký dịch vụ
│   ├── <span style="color: #38bdf8; font-weight: 600;">Rules/</span>                # Custom Validation Rules
│   └── <span style="color: #38bdf8; font-weight: 600;">Services/</span>             # Logic nghiệp vụ chung (Cascade Soft Delete...)
├── <span style="color: #38bdf8; font-weight: 600;">config/</span>                   # Cấu hình hệ thống (Auth, CORS, Passport...)
├── <span style="color: #38bdf8; font-weight: 600;">database/</span>                 # Migrations, Seeders, Factories
├── <span style="color: #38bdf8; font-weight: 600;">docs/</span>                     # Tài liệu kỹ thuật chi tiết của dự án
├── <span style="color: #38bdf8; font-weight: 600;">modules/</span>                  # Các Mô-đun nghiệp vụ chuyên biệt (EAM Package)
│   ├── <span style="color: #38bdf8; font-weight: 600;">Equipment/</span>            # Mô-đun Quản lý Thiết bị &amp; Vận hành
│   │   ├── Checklist/        # Quản lý &amp; Tự động sinh Lịch Kiểm tra
│   │   ├── ErrorMonitoring/  # Giám sát Lỗi &amp; Thời gian Vận hành
│   │   ├── Maintenance/      # Quản lý &amp; Tự động sinh Lịch Bảo trì
│   │   └── ParameterLog/     # Nhật ký Thông số Vận hành Thiết bị
│   └── <span style="color: #38bdf8; font-weight: 600;">Masterdata/</span>           # Mô-đun Quản lý Dữ liệu Danh mục
│       └── Equipment/        # Danh mục Thiết bị, Thông số, Lỗi, Trạng thái, Đơn vị
├── <span style="color: #38bdf8; font-weight: 600;">routes/</span>                   # Định tuyến ứng dụng (api.php, auth.php, console.php, web.php)
└── <span style="color: #38bdf8; font-weight: 600;">tests/</span>                    # Bộ kiểm thử tự động (Pest / PHPUnit)</pre>
      </div>

      <h3 style="margin-top: 24px;">Chi tiết Thành phần Lõi (`app/`)</h3>
      <ul>
        <li><strong>Bridge:</strong> Tùy biến hành vi mặc định của thư viện thứ 3. Điển hình là <code>AccessToken.php</code> &amp; <code>AccessTokenRepository.php</code> giúp override luồng phát hành JWT của Laravel Passport để nhúng thêm claim <code>roles</code> vào JWT Payload.</li>
        <li><strong>Builders:</strong> Tách biệt truy vấn Eloquent phức tạp ra khỏi Model/Controller. Ví dụ: <code>UserQueryBuilder.php</code> chứa truy vấn cho thực thể User.</li>
        <li><strong>Http (Giao tiếp HTTP &amp; Routing):</strong>
          <ul>
            <li><strong>Controllers:</strong> Áp dụng mô hình Single Action Controller (Invokable Controller) hoặc gói <code>lorisleiva/laravel-actions</code> giúp mỗi file chỉ xử lý duy nhất 1 hành động độc lập.</li>
            <li><strong>Requests/Resources:</strong> Form Request để validation đầu vào, API Resources định dạng dữ liệu trả về cho Frontend.</li>
            <li><strong>Middleware:</strong> Bộ lọc phân quyền như <code>own.user</code> (chính chủ), <code>admin</code>, <code>manager</code>, <code>engineer</code>.</li>
          </ul>
        </li>
        <li><strong>Services:</strong> Chứa logic nghiệp vụ hệ thống. Điển hình là <code>EquipmentCascadeSoftDeleteService</code> xử lý dọn dẹp và xóa liên hoàn (soft delete) các bản ghi phụ thuộc khi xóa thiết bị.</li>
      </ul>

      <h3 style="margin-top: 24px;">Các Nguyên tắc Thiết kế Quan trọng (Design Principles)</h3>
      <div class="grid-cards">
        <div class="card-item">
          <div class="card-title">1. Strict Types &amp; Declarations</div>
          <p>100% file PHP trong dự án đều khai báo nghiêm ngặt <code>declare(strict_types=1);</code> và khai báo kiểu dữ liệu trả về/tham số rõ ràng.</p>
        </div>
        <div class="card-item">
          <div class="card-title">2. Single Action Action/Controller</div>
          <p>Sử dụng <code>lorisleiva/laravel-actions</code> giúp cô lập nghiệp vụ. Controller chỉ làm nhiệm vụ nhận Request, ủy thác cho Action/Service xử lý và trả Response.</p>
        </div>
        <div class="card-item">
          <div class="card-title">3. Database UUID</div>
          <p>Toàn bộ bảng người dùng (users), token (oauth_*) và các bảng thực thể nghiệp vụ đều sử dụng UUID làm khóa chính Primary Key.</p>
        </div>
        <div class="card-item">
          <div class="card-title">4. Cascade Soft Delete</div>
          <p>Đảm bảo tính toàn vẹn dữ liệu. Khi xóa một thực thể cha, Service chuyên biệt sẽ thực hiện soft delete tất cả các bản ghi phụ thuộc liên quan.</p>
        </div>
        <div class="card-item" style="grid-column: span 2;">
          <div class="card-title">5. Response API Đồng nhất</div>
          <p>Toàn bộ API trả về response đồng nhất theo chuẩn: <code>{ "status": "success", "data": ... }</code> hoặc <code>{ "message": "...", "data": ... }</code>.</p>
        </div>
      </div>
    </div>

    <!-- 2. TAB NGHIỆP VỤ & DATABASE -->
    <div v-else-if="activeTab === 'submodules'" class="tab-pane-content">
      <h2>Thiết kế Cơ sở Dữ liệu &amp; Nghiệp vụ Lõi</h2>
      <p>Hệ thống chia làm hai lớp dữ liệu độc lập: Dữ liệu gốc (Master Data) và Dữ liệu vận hành (Operational Data):</p>

      <!-- Sub Navigation cho Submodules -->
      <div class="subtabs-nav">
        <button class="subtab-btn" :class="{ active: activeSubmodule === 'masterdata' }" @click="activeSubmodule = 'masterdata'">Masterdata Equipment</button>
        <button class="subtab-btn" :class="{ active: activeSubmodule === 'checklist' }" @click="activeSubmodule = 'checklist'">Checklist Management</button>
        <button class="subtab-btn" :class="{ active: activeSubmodule === 'maintenance' }" @click="activeSubmodule = 'maintenance'">Maintenance Management</button>
        <button class="subtab-btn" :class="{ active: activeSubmodule === 'error' }" @click="activeSubmodule = 'error'">Error &amp; Operating Time</button>
        <button class="subtab-btn" :class="{ active: activeSubmodule === 'parameter' }" @click="activeSubmodule = 'parameter'">Parameter Log</button>
      </div>

      <!-- 3.1. SUBMODULE MASTERDATA EQUIPMENT -->
      <div v-if="activeSubmodule === 'masterdata'">
        <h3>1. Masterdata Equipment (Dữ liệu gốc Thiết bị &amp; Cấu hình)</h3>
        <p>Quản lý cấu trúc dữ liệu nền tảng gồm thiết bị, phân nhóm, đơn vị đo, thông số vận hành tiêu chuẩn và danh mục mã lỗi sự cố.</p>

        <div class="diagram-box">
          <div class="diagram-title">Sơ đồ ERD Masterdata Equipment</div>
          <!-- v-pre ngăn Vue compile nội dung text trong pre tránh lỗi escaping dấu nháy kép -->
          <pre v-pre class="mermaid" style="background: transparent; border: none; overflow-x: auto;">
erDiagram
    companies ||--o{ departments : "chứa các phòng ban"
    departments ||--o{ users : "thuộc về"
    eamo_equipment_categories ||--o{ eamo_equipment : "phân loại (equipment_category_id)"
    eamo_equipment_states ||--o{ eamo_equipment : "trạng thái vận hành (equipment_state_id)"
    eamo_equipment ||--o{ eamo_equipment : "thiết bị cha - con (parent_id)"
    eamo_equipment ||--o{ eamo_equipment_parameters : "định nghĩa thông số"
    units ||--o{ eamo_equipment_parameters : "đơn vị đo"
    eamo_equipment ||--o{ eamo_equipment_error_pivot : "belongs to"
    eamo_equipment_errors ||--o{ eamo_equipment_error_pivot : "belongs to"

    eamo_equipment {
        string id PK "UUID"
        string parent_id FK "UUID tự tham chiếu"
        string code "Mã thiết bị"
        string name "Tên thiết bị"
        string qr_code "QR code thiết bị"
        string equipment_category_id FK
        string equipment_state_id FK
        integer maintenance_interval_hours "Chu kỳ bảo trì"
        json last_maintenance "Mốc bảo trì gần nhất"
        boolean is_active
    }
    eamo_equipment_parameters {
        string id PK
        string equipment_id FK
        string unit_id FK
        string name "Tên thông số"
        decimal min_value "Giá trị min an toàn"
        decimal max_value "Giá trị max an toàn"
    }
    eamo_equipment_errors {
        string id PK
        string error_code "Mã sự cố"
        string error_name "Tên sự cố"
    }
          </pre>
        </div>

        <h4 style="margin-top: 24px;">Logic Nghiệp vụ Đặc thù</h4>
        <ul>
          <li><strong>Giải mã QR Code tìm Thiết bị (<code>DecodeQrAndGetEquipmentAction</code>)</strong>: Kỹ sư tải lên file ảnh mã QR -> giải mã thành mã QR văn bản -> truy vấn chính xác thiết bị và load đầy đủ các thông tin quan hệ phụ thuộc (Category, Parameters, State, Images, Errors) để đưa lên giao diện thao tác nhanh.</li>
          <li><strong>Cây phân cấp Thiết bị Cha - Con</strong>: Sử dụng mối liên kết đệ quy <code>parent_id</code> để mô hình hóa toàn bộ dây chuyền sản xuất phức tạp: Nhà máy (Factory) → Khu vực/Dây chuyền (Line) → Cụm máy (Equipment System) → Chi tiết linh kiện máy (Sub-system/Component).</li>
          <li><strong>Dashboard Thống kê (<code>GetDashboardSummaryAction</code>)</strong>: Tổng hợp nhanh số lượng thiết bị theo từng trạng thái vận hành (đang hoạt động, dừng máy, đang sửa chữa...) và cảnh báo các thiết bị đã quá hạn hoặc sắp đến hạn bảo trì định kỳ.</li>
        </ul>

        <h4 style="margin-top: 24px;">Danh sách API Endpoints</h4>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Middleware</th>
              <th>Mục đích xử lý</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/equipment</code></td>
              <td><code>engineer</code></td>
              <td>Danh sách thiết bị (phân trang, tìm kiếm, lọc)</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/equipment/dashboard/summary</code></td>
              <td><code>engineer</code></td>
              <td>Thống kê tổng quan thiết bị vận hành và bảo trì</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/equipment/decode-qr</code></td>
              <td><code>engineer</code></td>
              <td>Quét và giải mã tệp tin ảnh QR Code thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/equipment/{id}</code></td>
              <td><code>engineer</code></td>
              <td>Xem chi tiết thông tin thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/equipment</code></td>
              <td><code>manager</code></td>
              <td>Tạo mới thiết bị vào hệ thống</td>
            </tr>
            <tr>
              <td><span class="badge badge-put">PUT</span></td>
              <td><code>/api/v1/equipment/{id}</code></td>
              <td><code>manager</code></td>
              <td>Cập nhật toàn bộ thông tin thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-patch">PATCH</span></td>
              <td><code>/api/v1/equipment/{id}/parent</code></td>
              <td><code>manager</code></td>
              <td>Cập nhật liên kết thiết bị cha - con</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/equipment/{id}/errors</code></td>
              <td><code>manager</code></td>
              <td>Gán danh sách mã lỗi sự cố cho thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-delete">DELETE</span></td>
              <td><code>/api/v1/equipment/{id}</code></td>
              <td><code>manager</code></td>
              <td>Xóa (Soft Delete) thiết bị và dọn dẹp liên kết</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 3.2. SUBMODULE CHECKLIST MANAGEMENT -->
      <div v-else-if="activeSubmodule === 'checklist'">
        <h3>2. Checklist Management (Quản lý &amp; Tự động sinh Lịch Kiểm tra)</h3>
        <p>Phân hệ chịu trách nhiệm lập kế hoạch, tạo các bộ câu hỏi kiểm tra ca/ngày và lưu lại vết đánh giá của kỹ sư vận hành.</p>

        <div class="diagram-box">
          <div class="diagram-title">Sơ đồ ERD Checklist Management</div>
          <pre v-pre class="mermaid" style="background: transparent; border: none; overflow-x: auto;">
erDiagram
    eamo_equipment ||--o{ eamo_checklist_sessions : "cấu hình mẫu (equipment_id)"
    eamo_checklist_sessions ||--o{ eamo_checklist_details : "chứa hạng mục (session_id)"
    eamo_checklist_sessions ||--o{ eamo_checklist_schedules : "sinh ra (checklist_session_id)"
    eamo_checklist_details ||--o{ eamo_checklist_schedules : "định nghĩa hạng mục (checklist_detail_id)"
    eamo_checklist_schedules ||--o{ eamo_checklist_logs : "kết quả thực tế (checklist_schedule_id)"
    
    eamo_checklist_sessions ||--o{ eamo_checklist_session_users : "belongs to"
    users ||--o{ eamo_checklist_session_users : "belongs to"
    
    eamo_checklist_schedules ||--o{ eamo_checklist_schedule_user : "belongs to"
    users ||--o{ eamo_checklist_schedule_user : "belongs to"
    
    eamo_checklist_logs ||--o{ eamo_checklist_log_users : "belongs to"
    users ||--o{ eamo_checklist_log_users : "belongs to"
          </pre>
        </div>

        <h4 style="margin-top: 24px;">Thuật toán Nghiệp vụ Lõi</h4>
        
        <div class="alert alert-warning">
          <div class="alert-title">Cơ chế Bảo vệ Giới hạn Lịch trình (MAX_SCHEDULES = 100)</div>
          <p>Hệ thống giới hạn số lượng bản ghi lịch kiểm tra được sinh ra đồng thời để tránh tràn dung lượng DB hoặc lỗi hết bộ nhớ (Out of Memory):</p>
          <div class="math-formula">
            Tổng số lượng lịch trình = Số lượng ngày x Số lượng hạng mục kiểm tra chi tiết &le; 100
          </div>
          <p>Nếu vượt quá ngưỡng 100, hệ thống sẽ tự động hủy tiến trình và gửi cảnh báo lỗi Validation cho người dùng tinh chỉnh lại chu kỳ/ngày kết thúc.</p>
        </div>

        <h5>1. Thuật toán tự động tính mốc ngày kiểm tra:</h5>
        <p>Khi tạo/cập nhật cấu hình mẫu, hệ thống sẽ tự động sinh các mốc ngày dựa theo chu kỳ:</p>
        <ul>
          <li><strong>daily:</strong> Cộng thêm <code>cycle_interval</code> ngày.</li>
          <li><strong>weekly:</strong> Cộng thêm <code>cycle_interval</code> tuần.</li>
          <li><strong>monthly:</strong> Cộng thêm <code>cycle_interval</code> tháng.</li>
          <li><strong>yearly:</strong> Cộng thêm <code>cycle_interval</code> năm.</li>
        </ul>

        <h5>2. Cơ chế Bảo vệ Lịch sử đã Thực hiện (<code>regenerateForSession</code>)</h5>
        <p>Khi người quản lý cập nhật lại chu kỳ của Checklist Session, thuật toán bảo vệ dữ liệu lịch sử bằng cách:</p>
        <ol>
          <li>Xác định các lịch trình đã có bản ghi kết quả thực tế (<code>status = completed</code>) hoặc đã được dời lịch thủ công (<code>is_rescheduled = true</code>). Các lịch này được đưa vào <strong>Protected IDs</strong>.</li>
          <li>Thực hiện xóa liên hoàn (soft delete) các lịch trình chưa kiểm tra nằm trong khoảng ngày cấu hình.</li>
          <li>Sinh bổ sung các lịch trình mới dựa trên ngày cấu hình và hạng mục mới mà không làm mất/ghi đè lên dữ liệu cũ đã kiểm tra.</li>
        </ol>

        <h5>3. Quy tắc Trạng thái hiển thị Lịch (Calendar Status Coloring)</h5>
        <ul>
          <li><span style="color: #f59e0b; font-weight: 700;">Màu Vàng (Pending)</span>: Ngày đó có tất cả hoặc một số đầu việc kiểm tra vẫn đang ở trạng thái chờ (<code>pending</code>).</li>
          <li><span style="color: #ef4444; font-weight: 700;">Màu Đỏ (Failed)</span>: Phát hiện có <strong>ít nhất một</strong> đầu việc trong ngày bị đánh giá không đạt (<code>result = fail</code>).</li>
          <li><span style="color: #10b981; font-weight: 700;">Màu Xanh lá (Passed)</span>: Tất cả hạng mục trong ngày đều đã được kiểm tra (<code>status = completed</code>) và <strong>đều đạt yêu cầu</strong> (<code>result = pass</code>).</li>
        </ul>

        <h4 style="margin-top: 24px;">Danh sách API Endpoints</h4>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Middleware</th>
              <th>Mục đích xử lý</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/checklist-sessions/equipment-status</code></td>
              <td><code>engineer</code></td>
              <td>Lấy trạng thái checklist của tất cả thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/checklist-sessions/daily</code></td>
              <td><code>engineer</code></td>
              <td>Danh sách checklist cần thực hiện trong ngày hiện tại</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/checklist-sessions</code></td>
              <td><code>engineer</code></td>
              <td>Danh sách cấu hình mẫu checklist</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/checklist-sessions/{id}</code></td>
              <td><code>engineer</code></td>
              <td>Chi tiết cấu hình mẫu checklist và các hạng mục con</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/checklist-schedules/{id}/complete</code></td>
              <td><code>engineer</code></td>
              <td>Ghi nhận và hoàn thành kết quả đánh giá 1 lịch kiểm tra</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/checklist-sessions</code></td>
              <td><code>manager</code></td>
              <td>Tạo cấu hình mẫu checklist mới (tự động sinh lịch)</td>
            </tr>
            <tr>
              <td><span class="badge badge-put">PUT</span></td>
              <td><code>/api/v1/checklist-sessions/{id}</code></td>
              <td><code>manager</code></td>
              <td>Cập nhật cấu hình checklist mẫu (tái sinh lịch thông minh)</td>
            </tr>
            <tr>
              <td><span class="badge badge-delete">DELETE</span></td>
              <td><code>/api/v1/checklist-sessions/{id}</code></td>
              <td><code>manager</code></td>
              <td>Xóa cấu hình mẫu checklist</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/checklist-sessions/judge</code></td>
              <td><code>manager</code></td>
              <td>Người quản lý phê duyệt/đánh giá kết quả phiên kiểm tra</td>
            </tr>
          </tbody>
        </table>

        <h4 style="margin-top: 24px;">Chạy kiểm thử tự động (Unit Test)</h4>
        <p>Thuật toán sinh lịch kiểm tra được bao phủ bởi các ca kiểm thử trong <code>tests/Unit/ChecklistScheduleGeneratorTest.php</code>. Chạy lệnh sau để kiểm tra:</p>
        <div class="code-container">
          <pre class="code-content" style="padding: 12px; font-family: var(--font-mono); font-size: 13px; color: #a1a1aa;"><span class="kw">php artisan test</span> <span class="str">--filter=ChecklistScheduleGeneratorTest --compact</span></pre>
        </div>
      </div>

      <!-- 3.3. SUBMODULE MAINTENANCE MANAGEMENT -->
      <div v-else-if="activeSubmodule === 'maintenance'">
        <h3>3. Maintenance Management (Quản lý &amp; Tự động sinh Lịch Bảo trì)</h3>
        <p>Phân hệ quản lý kế hoạch bảo dưỡng định kỳ cho máy móc dựa trên chu kỳ kế hoạch thiết lập sẵn và ghi nhận nhật ký kết quả bảo trì.</p>

        <div class="diagram-box">
          <div class="diagram-title">Sơ đồ ERD Maintenance Management</div>
          <pre v-pre class="mermaid" style="background: transparent; border: none; overflow-x: auto;">
erDiagram
    eamo_maintenance_categories ||--o{ eamo_maintenance_items : "chứa hạng mục"
    eamo_maintenance_categories ||--o{ eamo_maintenance_plans : "phân loại kế hoạch"
    eamo_equipment ||--o{ eamo_maintenance_plans : "áp dụng kế hoạch"
    eamo_maintenance_plans ||--o{ eamo_maintenance_schedules : "sinh ra các mốc lịch"
    eamo_maintenance_items ||--o{ eamo_maintenance_schedules : "xác định công việc"
    eamo_maintenance_schedules ||--o{ eamo_maintenance_logs : "kết quả thực hiện"
          </pre>
        </div>

        <h4 style="margin-top: 24px;">Thuật toán &amp; Quy trình Tự động sinh Lịch Bảo trì</h4>
        
        <h5>1. Thuật toán tính toán chu kỳ mốc ngày bảo trì (<code>generateDates</code>)</h5>
        <p>Mốc ngày thứ \(i\) trong lịch bảo trì được xác định theo công thức toán học dưới đây:</p>
        <div class="math-formula">
          Mốc ngày thứ i = Ngày bắt đầu (startDate) + (i x cycleInterval x Đơn vị chu kỳ lặp)
        </div>
        <p>Với \(i\) chạy từ \(0\) đến \(\text{occurrences} - 1\). Đơn vị chu kỳ tương ứng với loại chu kỳ <code>cycle_type</code> (daily, weekly, monthly, yearly).</p>

        <h5>2. Giới hạn An toàn tạo Lịch (Safety Limit Check)</h5>
        <p>Để ngăn chặn hành vi cấu hình sai (chu kỳ quá ngắn nhưng số lượng occurrences quá lớn làm đầy cơ sở dữ liệu), hệ thống kiểm tra điều kiện bảo vệ trước khi sinh lịch:</p>
        <div class="math-formula">
          Tổng số mốc bảo trì = Số lần lặp (occurrences) x Số lượng hạng mục bảo trì (Maintenance Items) &le; 100
        </div>
        <p>Nếu vượt quá 100, hệ thống từ chối tạo và ném ngoại lệ <code>ValidationException</code>.</p>

        <h5>3. Cơ chế Bảo vệ Lịch sử khi Cập nhật Kế hoạch (<code>regenerateForPlan</code>)</h5>
        <p>Khi kế hoạch bảo trì thay đổi, hệ thống sẽ:</p>
        <ol>
          <li>Thu thập các <strong>Lịch trình được bảo vệ</strong> bao gồm: Lịch trình đã có nhật ký ghi nhận kết quả bảo trì (<code>MaintenanceLog</code>) và các lịch trình đã được thay đổi ngày bảo trì thủ công (<code>is_rescheduled = true</code>).</li>
          <li>Xóa các mốc lịch trình rỗng chưa thực hiện của các hạng mục bị loại khỏi danh mục bảo trì.</li>
          <li>Sinh bổ sung các mốc lịch mới tương thích với các giá trị cấu hình chu kỳ và ngày bắt đầu mới cập nhật.</li>
        </ol>

        <h4 style="margin-top: 24px;">Danh sách API Endpoints</h4>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Middleware</th>
              <th>Mục đích xử lý</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/maintenance-plans</code></td>
              <td><code>engineer</code></td>
              <td>Danh sách các kế hoạch bảo trì thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/maintenance-plans/{id}</code></td>
              <td><code>engineer</code></td>
              <td>Chi tiết một kế hoạch bảo trì cụ thể</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/maintenance-schedules</code></td>
              <td><code>engineer</code></td>
              <td>Danh sách các mốc lịch bảo trì thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/maintenance-logs</code></td>
              <td><code>engineer</code></td>
              <td>Lịch sử nhật ký kết quả thực thi bảo trì</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/maintenance-schedules/{id}/complete</code></td>
              <td><code>engineer</code></td>
              <td>Hoàn thành và ghi nhận kết quả 1 mốc lịch bảo trì</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/maintenance-plans</code></td>
              <td><code>manager</code></td>
              <td>Tạo mới kế hoạch bảo trì (tự động sinh lịch)</td>
            </tr>
            <tr>
              <td><span class="badge badge-put">PUT</span></td>
              <td><code>/api/v1/maintenance-plans/{id}</code></td>
              <td><code>manager</code></td>
              <td>Cập nhật kế hoạch bảo trì (tái tính toán các mốc lịch)</td>
            </tr>
            <tr>
              <td><span class="badge badge-delete">DELETE</span></td>
              <td><code>/api/v1/maintenance-plans/{id}</code></td>
              <td><code>manager</code></td>
              <td>Xóa kế hoạch bảo trì</td>
            </tr>
            <tr>
              <td><span class="badge badge-put">PUT</span></td>
              <td><code>/api/v1/maintenance-schedules/{id}</code></td>
              <td><code>manager</code></td>
              <td>Điều chỉnh ngày bảo trì thủ công (ghi nhận dời lịch)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 3.4. SUBMODULE ERROR MONITORING & OPERATING TIME -->
      <div v-else-if="activeSubmodule === 'error'">
        <h3>4. Error Monitoring &amp; Operating Time (Giám sát lỗi máy &amp; Thời gian vận hành)</h3>
        <p>Phân hệ theo dõi và ghi nhận các sự cố dừng máy (Downtime), giờ chạy máy thực tế và thuật toán dự đoán mốc bảo trì định kỳ sắp tới.</p>

        <div class="diagram-box">
          <div class="diagram-title">Sơ đồ ERD Error Monitoring &amp; Operating Time</div>
          <pre v-pre class="mermaid" style="background: transparent; border: none; overflow-x: auto;">
erDiagram
    eamo_equipment ||--o{ eamo_equipment_error_logs : "xảy ra sự cố lỗi"
    eamo_equipment_errors ||--o{ eamo_equipment_error_logs : "mã lỗi chi tiết"
    eamo_equipment ||--o{ eamo_operating_times : "ghi nhận giờ vận hành"
    users ||--o{ eamo_operating_times : "người nhập liệu"
          </pre>
        </div>

        <h4 style="margin-top: 24px;">Thuật toán Nghiệp vụ Quan trọng</h4>
        
        <h5>1. Thuật toán tính toán số giờ chạy máy còn lại trước bảo trì định kỳ:</h5>
        <p>Sử dụng API <code>GET /api/v1/equipment/error-monitoring/operating-times/maintenance-status</code> để lấy số giờ chạy máy an toàn còn lại trước khi máy bắt buộc phải dừng để bảo dưỡng định kỳ:</p>
        <ol>
          <li>Hệ thống lọc ra các thiết bị đang hoạt động (<code>is_active = true</code>) và có cài đặt ngưỡng chu kỳ bảo trì (<code>maintenance_interval_hours > 0</code>).</li>
          <li>Tìm mốc thời gian bảo trì thành công gần nhất của thiết bị từ thuộc tính <code>last_maintenance['datetime']</code>.</li>
          <li>Tính tổng số giờ máy chạy thực tế (\(\text{actualOp}\)) đã tích lũy kể từ mốc bảo trì gần nhất:
            <div class="math-formula">
              actualOp = &sum; actual_operating_time (với start_time &ge; lastMaintenanceDate)
            </div>
          </li>
          <li>Tính số giờ chạy máy còn lại trước khi bắt buộc bảo trì (\(\text{remaining}\)):
            <div class="math-formula">
              remaining = maintenance_interval_hours - actualOp
            </div>
          </li>
          <li>Danh sách kết quả trả về được sắp xếp <strong>tăng dần theo \(\text{remaining}\)</strong> để đưa các thiết bị có nguy cơ trễ hạn bảo trì lên đầu biểu đồ cảnh báo.</li>
        </ol>

        <h5>2. Nhập dữ liệu hàng loạt thời gian vận hành từ Excel (Import Excel)</h5>
        <p>Để tối giản hóa thao tác của người vận hành, hệ thống cung cấp API cho phép người dùng đăng tải file Excel (Import) chứa thông số thời gian chạy máy hàng ngày của toàn bộ dây chuyền sản xuất để hệ thống phân tích tự động.</p>

        <h4 style="margin-top: 24px;">Danh sách API Endpoints</h4>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Middleware</th>
              <th>Mục đích xử lý</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/equipment/error-monitoring/equipment-error-logs</code></td>
              <td><code>engineer</code></td>
              <td>Lấy lịch sử danh sách nhật ký lỗi dừng máy thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/equipment/error-monitoring/equipment-error-logs</code></td>
              <td><code>manager</code></td>
              <td>Ghi nhận một sự cố lỗi mới phát sinh trên thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-put">PUT</span></td>
              <td><code>/api/v1/equipment/error-monitoring/equipment-error-logs/{id}</code></td>
              <td><code>manager</code></td>
              <td>Cập nhật quá trình xử lý sự cố / thời gian khắc phục lỗi</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/equipment/error-monitoring/operating-times</code></td>
              <td><code>engineer</code></td>
              <td>Xem lịch sử ghi nhận giờ chạy máy thực tế</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/equipment/error-monitoring/operating-times/maintenance-status</code></td>
              <td><code>engineer</code></td>
              <td>Lấy dữ liệu biểu đồ số giờ vận hành còn lại trước bảo trì</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/equipment/error-monitoring/operating-times</code></td>
              <td><code>manager</code></td>
              <td>Ghi nhận giờ chạy máy thủ công của thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/equipment/error-monitoring/operating-times/import</code></td>
              <td><code>manager</code></td>
              <td>Import dữ liệu giờ vận hành hàng loạt từ file đính kèm Excel</td>
            </tr>
            <tr>
              <td><span class="badge badge-delete">DELETE</span></td>
              <td><code>/api/v1/equipment/error-monitoring/operating-times/{id}</code></td>
              <td><code>manager</code></td>
              <td>Xóa bản ghi thời gian vận hành</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 3.5. SUBMODULE PARAMETER LOG -->
      <div v-else-if="activeSubmodule === 'parameter'">
        <h3>5. Parameter Log (Ghi nhận thông số Sensor / Dữ liệu Timeseries)</h3>
        <p>Phân hệ lưu trữ dữ liệu chuỗi thời gian các thông số kỹ thuật thu thập từ sensor của máy (Nhiệt độ, áp suất, độ rung...) phục vụ dự đoán lỗi.</p>

        <div class="diagram-box">
          <div class="diagram-title">Sơ đồ ERD Parameter Log</div>
          <pre v-pre class="mermaid" style="background: transparent; border: none; overflow-x: auto;">
erDiagram
    eamo_equipment ||--o{ eamo_equipment_parameter_logs : "ghi nhận"
    eamo_equipment_parameters ||--o{ eamo_equipment_parameter_logs : "thông số"
    units ||--o{ eamo_equipment_parameter_logs : "đơn vị"
    users ||--o{ eamo_equipment_parameter_logs : "người đo"

    eamo_equipment_parameter_logs {
        string id PK "UUID"
        string equipment_id FK
        string equipment_parameter_id FK
        string unit_id FK
        string user_id FK
        decimal value "Giá trị đo thực tế"
        timestamp recorded_at "Thời điểm đo"
        text note "Ghi chú thêm"
    }
          </pre>
        </div>

        <h4 style="margin-top: 24px;">Logic Nghiệp vụ Chính</h4>
        <ul>
          <li><strong>Ma trận Nhật ký Thông số 7 Ngày (<code>GetWeeklyEquipmentParameterLogsAction</code>)</strong>:
            <ol>
              <li>Thiết lập mốc thời gian 7 ngày trước: <code>$oneWeekAgo = CarbonImmutable::now()->subDays(7)->startOfDay();</code>.</li>
              <li>Truy vấn các bản ghi ghi nhận thông số <code>eamo_equipment_parameter_logs</code> của thiết bị có thời gian đo đạc <code>recorded_at >= $oneWeekAgo</code>.</li>
              <li>Load các liên kết đối tượng: <code>equipment</code>, <code>parameter</code>, <code>unit</code>, <code>user</code> để chuẩn bị vẽ biểu đồ diễn biến thông số 7 ngày của thiết bị trên Frontend.</li>
            </ol>
          </li>
          <li><strong>Lưu Thông số Hàng loạt (<code>SaveEquipmentParameterLogAction</code>)</strong>: Cho phép người vận hành ghi lại nhiều giá trị đo lường cùng một lúc trong một đợt đi ca kiểm tra nhà máy nhằm giảm tải thao tác và tránh gửi nhiều request.</li>
          <li><strong>Import Thông số từ Excel</strong>: Hỗ trợ nạp lịch sử các giá trị đo từ các hệ thống IoT cũ hoặc ghi tay thông qua file Excel mẫu.</li>
        </ul>

        <h4 style="margin-top: 24px;">Danh sách API Endpoints</h4>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Middleware</th>
              <th>Mục đích xử lý</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/equipment/equipment-parameter/logs</code></td>
              <td><code>engineer</code></td>
              <td>Danh sách nhật ký thông số đo đạc thiết bị (phân trang)</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/equipment/equipment-parameter/logs/weekly/{equipmentId}</code></td>
              <td><code>engineer</code></td>
              <td>Lấy lịch sử thông số của 1 thiết bị cụ thể trong 7 ngày qua</td>
            </tr>
            <tr>
              <td><span class="badge badge-get">GET</span></td>
              <td><code>/api/v1/equipment/equipment-parameter/logs/overview/{id}</code></td>
              <td><code>engineer</code></td>
              <td>Thống kê tổng quan số lượng thông số ghi nhận được</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/equipment/equipment-parameter/logs</code></td>
              <td><code>manager</code></td>
              <td>Ghi nhận một giá trị thông số kỹ thuật đơn lẻ</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/equipment/equipment-parameter/logs/save</code></td>
              <td><code>manager</code></td>
              <td>Lưu hàng loạt danh sách các giá trị thông số thiết bị</td>
            </tr>
            <tr>
              <td><span class="badge badge-post">POST</span></td>
              <td><code>/api/v1/equipment/equipment-parameter/logs/import</code></td>
              <td><code>manager</code></td>
              <td>Nhập lịch sử thông số hàng loạt từ file Excel tải lên</td>
            </tr>
            <tr>
              <td><span class="badge badge-delete">DELETE</span></td>
              <td><code>/api/v1/equipment/equipment-parameter/logs/{id}</code></td>
              <td><code>manager</code></td>
              <td>Xóa bản ghi lịch sử thông số</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* CSS Scoped cho giao diện tài liệu kiến trúc EAM */
.subtitle-desc {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

/* Tabs Navigation */
.tabs-nav {
  display: flex;
  gap: 8px;
  border-bottom: 1.5px solid var(--border-muted);
  margin-bottom: 28px;
}

.tab-btn {
  background: none;
  border: none;
  padding: 14px 22px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  border-bottom: 2.5px solid transparent;
  margin-bottom: -1.5px;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-btn:hover {
  color: var(--text-primary);
  border-bottom-color: var(--border-muted);
}

.tab-btn.active {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

.tab-icon {
  width: 17px;
  height: 17px;
}

.tab-pane-content {
  animation: fadeIn 0.25s ease-in-out;
}

/* Sub Navigation (Submodules) */
.subtabs-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  background-color: var(--color-accent-light);
  padding: 6px;
  border-radius: var(--radius);
  margin-top: 14px;
  margin-bottom: 24px;
}

.subtab-btn {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent);
  cursor: pointer;
  border-radius: var(--radius);
  transition: all 0.15s ease;
}

.subtab-btn:hover {
  background-color: rgba(37, 99, 235, 0.08);
}

.subtab-btn.active {
  background-color: var(--color-accent);
  color: #ffffff;
}

/* Alert styles */
.alert {
  padding: 16px;
  margin: 20px 0;
  border-left: 4px solid transparent;
  border-radius: var(--radius);
}

.alert-note {
  border-left-color: #3b82f6;
  background-color: #eff6ff;
}

.alert-warning {
  border-left-color: #f59e0b;
  background-color: #fffbeb;
}

.alert-important {
  border-left-color: #ef4444;
  background-color: #fef2f2;
}

.alert-title {
  font-weight: 700;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  text-transform: uppercase;
}

.alert-note .alert-title { color: #1d4ed8; }
.alert-warning .alert-title { color: #b45309; }
.alert-important .alert-title { color: #b91c1c; }

/* Grid layout for design principles */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.card-item {
  border: 1px solid var(--border-primary);
  border-radius: var(--radius);
  padding: 20px;
  background-color: #fcfcfc;
  transition: var(--transition);
}

.card-item:hover {
  border-color: var(--border-active);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.03);
}

.card-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 8px;
}

/* API Badge styles */
.badge {
  display: inline-block;
  padding: 2px 8px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
  color: #ffffff;
  text-align: center;
  min-width: 60px;
}

.badge-get { background-color: #10b981; }      /* Green */
.badge-post { background-color: #3b82f6; }     /* Blue */
.badge-put { background-color: #f59e0b; }      /* Amber */
.badge-delete { background-color: #ef4444; }   /* Red */
.badge-patch { background-color: #8b5cf6; }    /* Purple */

/* Math Formula display */
.math-formula {
  background-color: #f8fafc;
  border: 1px solid var(--border-muted);
  border-radius: var(--radius);
  padding: 14px 18px;
  margin: 14px 0;
  font-family: var(--font-mono);
  font-size: 13.5px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  overflow-x: auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
