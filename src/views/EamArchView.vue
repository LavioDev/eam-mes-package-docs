<template>
  <section id="view-eam-arch" class="view-panel active">
      <h1>Thiết kế &amp; Kiến trúc Module EAM</h1>
      <p>Hệ thống EAM MES Package cung cấp 4 phân hệ lõi phục vụ giám sát thiết bị và vận hành nhà máy. Các thành phần được đóng gói dưới dạng Laravel Package chuẩn để cắm ghép vào dự án của doanh nghiệp.</p>

      <h2>Các Module Nghiệp vụ Lõi (Submodules)</h2>
      <ul>
          <li><strong>Checklist (Kiểm tra thiết bị - <code>src/Checklist/</code>):</strong> Quản lý quy trình thiết lập các bộ câu hỏi kiểm tra, tạo phiên (session) thực thi cho nhân viên vận hành trước ca, và ghi nhận chi tiết (details) kết quả kiểm tra từng hạng mục.</li>
          <li><strong>Error Monitoring (Giám sát lỗi máy - <code>src/ErrorMonitoring/</code>):</strong> Theo dõi thời gian dừng máy (downtime), thu nhận thông tin mã lỗi và tự động phân tích các chỉ số quản lý thiết bị quan trọng như OEE, MTBF, MTTR.</li>
          <li><strong>Maintenance (Bảo trì vòng đời - <code>src/Maintenance/</code>):</strong> Cấu trúc danh mục bảo trì (categories), hạng mục chi tiết (items), quản lý kế hoạch tuần hoàn (plans), phân phối lịch trình (schedules) và ghi lại nhật ký thực thi (logs).</li>
          <li><strong>Parameter Log (Ghi nhận thông số sensor - <code>src/ParameterLog/</code>):</strong> Hệ thống lưu trữ dữ liệu chuỗi thời gian (Timeseries) thu thập các thông số vận hành của thiết bị như nhiệt độ, áp suất, điện áp... trực tiếp từ các sensor.</li>
          <li><strong>Equipment (Quản lý Equipment - <code>src/Equipment/Management/</code>):</strong> Lớp quản lý hoạt động và ghi nhận seeding lỗi dừng ngắn cho các thiết bị.</li>
          <li><strong>Masterdata Equipment (Dữ liệu gốc Thiết bị - <code>src/Masterdata/Equipment/</code>):</strong> Định nghĩa cấu trúc dữ liệu gốc của thiết bị (equipment), nhóm thiết bị (categories), thông số kỹ thuật và các ngưỡng tiêu chuẩn (parameters), trạng thái thiết bị (states), ảnh thiết bị (images) và phân loại lỗi hệ thống (errors).</li>
      </ul>

      <h2>Sơ đồ luồng phối hợp dữ liệu</h2>
      <p>Nghiệp vụ hoạt động phối hợp chặt chẽ giữa các tầng dữ liệu:</p>
      <div class="diagram-box">
          <div class="diagram-title">Sơ đồ luồng nghiệp vụ liên kết</div>
          <div class="arch-flow">
              <div class="arch-block">
                  <div class="arch-block-title">Parameter Log</div>
                  <div class="arch-block-desc">Thu nhận thông số máy trực tiếp từ sensor</div>
              </div>
              <div class="arch-arrow">→</div>
              <div class="arch-block">
                  <div class="arch-block-title">Error Monitoring</div>
                  <div class="arch-block-desc">Phân tích ngưỡng bất thường để ghi lỗi &amp; tính OEE</div>
              </div>
              <div class="arch-arrow">→</div>
              <div class="arch-block">
                  <div class="arch-block-title">Maintenance</div>
                  <div class="arch-block-desc">Sinh lịch trình bảo trì sửa chữa ứng phó khẩn cấp</div>
              </div>
          </div>
      </div>

      <h2>Cấu trúc tệp tin khi tích hợp (File &amp; Code Location)</h2>
      <p>Cấu trúc thư mục của package khi được cài đặt và sao chép (publish) sang ứng dụng của bạn:</p>
      <div class="code-container" style="margin-top: 16px;">
          <div class="code-header">
              <span>Cấu trúc thư mục tích hợp trong Laravel Host App</span>
          </div>
          <pre class="code-content" style="color: #a1a1aa; line-height: 1.8;">laravel-project-root/
├── <span style="color: #38bdf8; font-weight: 600;">modules/</span>
│   ├── <span style="color: #38bdf8; font-weight: 600;">Equipment/</span> <span class="cmt">(Vị trí lưu mã nguồn các submodules sau khi publish)</span>
│   │   ├── <span style="color: #38bdf8; font-weight: 600;">Checklist/</span>
│   │   │   ├── <span style="color: #38bdf8; font-weight: 600;">Actions/</span> <span class="cmt">(Xử lý nghiệp vụ tách biệt - Laravel Action)</span>
│   │   │   ├── <span style="color: #38bdf8; font-weight: 600;">Models/</span> <span class="cmt">(Eloquent Model liên kết bảng eamo_*)</span>
│   │   │   ├── <span style="color: #fbbf24;">Register.php</span> <span class="cmt">(Service Provider nội bộ)</span>
│   │   │   └── <span style="color: #fbbf24;">routes.php</span> <span class="cmt">(Khai báo các Router API nội bộ)</span>
│   │   ├── <span style="color: #38bdf8; font-weight: 600;">ErrorMonitoring/</span>
│   │   ├── <span style="color: #38bdf8; font-weight: 600;">Maintenance/</span>
│   │   ├── <span style="color: #38bdf8; font-weight: 600;">ParameterLog/</span>
│   │   └── <span style="color: #38bdf8; font-weight: 600;">Management/</span> <span class="cmt">(Quản lý Thiết bị - Seeding lỗi dừng ngắn, Actions cũng chia theo Model)</span>
│   └── <span style="color: #38bdf8; font-weight: 600;">Masterdata/</span>
│       └── <span style="color: #38bdf8; font-weight: 600;">Equipment/</span> <span class="cmt">(Dữ liệu gốc Thiết bị)</span>
│           ├── <span style="color: #38bdf8; font-weight: 600;">Actions/</span> <span class="cmt">(Các action được chia thư mục đại diện cho từng Model)</span>
│           │   ├── <span style="color: #38bdf8; font-weight: 600;">Equipment/</span>
│           │   ├── <span style="color: #38bdf8; font-weight: 600;">EquipmentCategory/</span>
│           │   ├── <span style="color: #38bdf8; font-weight: 600;">EquipmentParameter/</span>
│           │   └── <span style="color: #38bdf8; font-weight: 600;">EquipmentError/</span>
│           ├── <span style="color: #38bdf8; font-weight: 600;">Models/</span>
│           ├── <span style="color: #fbbf24;">Register.php</span>
│           └── <span style="color: #fbbf24;">routes.php</span>
├── <span style="color: #38bdf8; font-weight: 600;">database/</span>
│   └── <span style="color: #38bdf8; font-weight: 600;">migrations/</span> <span class="cmt">(Các file migration của package được copy sang đây)</span>
│       ├── <span style="color: #fbbf24;">2025_06_22_080000_eamo_create_eamo_equipment_categories_table.php</span>
│       ├── <span style="color: #fbbf24;">2025_06_23_084823_eamo_create_eamo_equipment_table.php</span>
│       ├── <span style="color: #fbbf24;">2025_06_23_084824_eamo_create_eamo_equipment_states_table.php</span>
│       ├── <span style="color: #fbbf24;">2025_06_23_084825_eamo_create_eamo_equipment_images_table.php</span>
│       └── <span style="color: #fbbf24;">2025_07_03_095341_eamo_create_eamo_equipment_parameters_table.php</span>
└── <span style="color: #38bdf8; font-weight: 600;">config/</span>
    └── <span style="color: #fbbf24;">eam.php</span> <span class="cmt">(Cấu hình chính: prefix, whitelist, routes, extensions)</span></pre>
      </div>

      <h2>Sơ đồ cơ sở dữ liệu chi tiết (Database Schema ERD)</h2>
      <p>Hệ thống chia làm hai lớp dữ liệu độc lập: Dữ liệu gốc (Master Data) và Dữ liệu vận hành (Operational Data):</p>

      <h3>Tổng quan toàn bộ database</h3>
      <table>
          <thead>
              <tr>
                  <th>Submodule</th>
                  <th>Bảng</th>
                  <th>Vai trò</th>
                  <th>Quan hệ hiển thị trong ERD</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Masterdata Equipment</td>
                  <td><code>eamo_equipment_categories</code>, <code>eamo_equipment</code>, <code>eamo_equipment_states</code>, <code>eamo_equipment_images</code></td>
                  <td>Thiết bị cốt lõi</td>
                  <td>Category → Equipment → State / Images</td>
              </tr>
              <tr>
                  <td>Masterdata Equipment</td>
                  <td><code>eamo_units</code>, <code>eamo_equipment_parameters</code></td>
                  <td>Thông số và đơn vị đo</td>
                  <td>Unit → Equipment parameters</td>
              </tr>
              <tr>
                  <td>Masterdata Equipment</td>
                  <td><code>eamo_equipment_errors</code></td>
                  <td>Danh mục lỗi (gán qua bản ghi định nghĩa trong eamo_equipment_error_logs)</td>
                  <td>Equipment error mapping</td>
              </tr>
              <tr>
                  <td>Checklist</td>
                  <td><code>eamo_checklist_sessions</code>, <code>eamo_checklist_details</code>, <code>eamo_checklist_schedules</code>, <code>eamo_checklist_logs</code></td>
                  <td>Lập lịch và ghi nhận kiểm tra</td>
                  <td>Session → Detail / Schedule → Log</td>
              </tr>
              <tr>
                  <td>Maintenance</td>
                  <td><code>eamo_maintenance_categories</code>, <code>eamo_maintenance_items</code>, <code>eamo_maintenance_plans</code>, <code>eamo_maintenance_schedules</code>, <code>eamo_maintenance_logs</code></td>
                  <td>Danh mục, kế hoạch, lịch và log bảo trì</td>
                  <td>Category → Item / Plan → Schedule → Log</td>
              </tr>
              <tr>
                  <td>Error Monitoring</td>
                  <td><code>eamo_equipment_error_logs</code>, <code>eamo_operating_times</code></td>
                  <td>Log lỗi và thời gian vận hành</td>
                  <td>Bảng log độc lập</td>
              </tr>
              <tr>
                  <td>Parameter Log</td>
                  <td><code>eamo_equipment_parameter_logs</code></td>
                  <td>Timeseries thông số thiết bị</td>
                  <td>Bảng log độc lập</td>
              </tr>
              <tr>
                  <td>Extension</td>
                  <td><code>eamo_extension_requests</code></td>
                  <td>Theo dõi yêu cầu sinh migration động</td>
                  <td>Bảng độc lập</td>
              </tr>
          </tbody>
      </table>
      
      <h3>1. Dữ liệu gốc (Master Data - Thiết bị &amp; Cấu hình)</h3>
      <div class="diagram-box">
          <div class="diagram-title">Masterdata Equipment — Thiết bị cốt lõi</div>
          <pre class="mermaid" style="background: transparent; border: none; overflow-x: auto; display: flex; justify-content: center;">
erDiagram
    eamo_equipment ||--o| eamo_equipment_categories : "belongs to"
    eamo_equipment ||--o| eamo_equipment_states : "has state"
    eamo_equipment ||--o{ eamo_equipment_images : "has images"
    eamo_equipment_categories ||--o{ eamo_equipment : "categorizes"

    eamo_equipment {
        string id PK
        string parent_id FK
        string code
        string name
        string equipment_category_id FK
        string device_id
        integer maintenance_interval_hours
        json last_maintenance
        boolean is_active
    }

    eamo_equipment_categories {
        string id PK
        string code
        string name
    }

    eamo_equipment_states {
        string id PK
        string equipment_id FK
        string state
    }

    eamo_equipment_images {
        string id PK
        string equipment_id FK
        string image_id
        string path
    }
          </pre>
      </div>

      <div class="diagram-box" style="margin-top: 16px;">
          <div class="diagram-title">Masterdata Equipment — Thông số &amp; đơn vị đo</div>
          <p><code>equipment_id</code>, <code>equipment_category_id</code> và <code>product_category_id</code> là các ID tham chiếu; không vẽ line để giữ sơ đồ gọn.</p>
          <pre class="mermaid" style="background: transparent; border: none; overflow-x: auto; display: flex; justify-content: center;">
erDiagram
    eamo_units ||--o{ eamo_equipment_parameters : "unit"

    eamo_units {
        string id PK
        string code UK
        string name
        string description
    }
    eamo_equipment_parameters {
        string id PK
        string code UK
        string equipment_id
        string equipment_category_id
        string product_category_id
        string unit_id FK
        string name
        decimal standard
        decimal standard_min
        decimal standard_max
    }
          </pre>
      </div>

      <div class="diagram-box" style="margin-top: 16px;">
          <div class="diagram-title">Masterdata Equipment — Danh mục lỗi</div>
          <p>Mã lỗi thiết bị được định nghĩa và gán cho thiết bị thông qua các bản ghi định nghĩa trong <code>eamo_equipment_error_logs</code> (khi <code>occurred_at IS NULL</code>).</p>
          <pre class="mermaid" style="background: transparent; border: none; overflow-x: auto; display: flex; justify-content: center;">
erDiagram
    eamo_equipment_errors {
        string id PK
        string name
        text reason
        text fix
        text protection_measures
    }
          </pre>
      </div>

      <h3>2. Mô hình dữ liệu vận hành &amp; logs (Mermaid ERD)</h3>
      <p>Các sơ đồ dưới đây được tách theo submodule. ID tham chiếu sang submodule khác hoặc ứng dụng host chỉ hiển thị dưới dạng cột, không vẽ đường nối.</p>
      <div class="diagram-box" style="margin-top: 16px;">
          <div class="diagram-title">Checklist</div>
          <pre class="mermaid" style="background: transparent; border: none; overflow-x: auto; display: flex; justify-content: center;">
erDiagram
    eamo_checklist_sessions ||--o{ eamo_checklist_details : "has"
    eamo_checklist_sessions ||--o{ eamo_checklist_schedules : "schedules"
    eamo_checklist_details ||--o{ eamo_checklist_schedules : "scheduled detail"
    eamo_checklist_schedules ||--o{ eamo_checklist_logs : "records"

    eamo_checklist_sessions {
        string id PK
        string name
        string equipment_id
        datetime session_date
        string user_id FK
        string cycle_type
        integer cycle_interval
    }

    eamo_checklist_details {
        string id PK
        string checklist_id
        string session_id FK
        string description
    }

    eamo_checklist_schedules {
        string id PK
        string equipment_id FK
        string checklist_session_id FK
        string checklist_detail_id FK
        string user_id FK
        date date
        boolean is_rescheduled
        date original_date
    }

    eamo_checklist_logs {
        string id PK
        string checklist_schedule_id FK
        string user_id FK
        enum result
        enum status
        timestamp checked_at
    }
          </pre>
      </div>

      <div class="diagram-box" style="margin-top: 16px;">
          <div class="diagram-title">Maintenance</div>
          <pre class="mermaid" style="background: transparent; border: none; overflow-x: auto; display: flex; justify-content: center;">
erDiagram
    eamo_maintenance_categories ||--o{ eamo_maintenance_items : "contains"
    eamo_maintenance_categories ||--o{ eamo_maintenance_plans : "classifies"
    eamo_maintenance_plans ||--o{ eamo_maintenance_schedules : "generates"
    eamo_maintenance_items ||--o{ eamo_maintenance_schedules : "schedules"
    eamo_maintenance_schedules ||--o{ eamo_maintenance_logs : "records"

    eamo_maintenance_categories {
        string id PK
        string name
        string description
    }
    eamo_maintenance_items {
        string id PK
        string maintenance_category_id FK
        string user_id
        string name
    }
    eamo_maintenance_plans {
        string id PK
        string maintenance_category_id FK
        string equipment_id
        string user_id
        string plan_code
        string cycle_type
        integer cycle_interval
    }
    eamo_maintenance_schedules {
        string id PK
        string maintenance_plan_id FK
        string maintenance_item_id FK
        string equipment_id
        string user_id
        date date
        boolean is_rescheduled
        date original_date
    }
    eamo_maintenance_logs {
        string id PK
        string maintenance_schedule_id FK
        date log_date
        string result
    }
          </pre>
      </div>

      <div class="diagram-box" style="margin-top: 16px;">
          <div class="diagram-title">Error Monitoring</div>
          <p>Hai bảng log độc lập; các ID equipment/error/user thuộc module hoặc host app khác nên không vẽ đường nối.</p>
          <pre class="mermaid" style="background: transparent; border: none; overflow-x: auto; display: flex; justify-content: center;">
erDiagram
    eamo_equipment_error_logs {
        string id PK
        string equipment_id
        string equipment_error_id
        string handler_id
        datetime occurred_at
        datetime restarted_at
        datetime handled_at
    }
    eamo_operating_times {
        string id PK
        string equipment_id
        decimal working_time
        decimal planned_stop_time
        decimal unplanned_stop_time
        timestamp start_time
        timestamp end_time
    }
          </pre>
      </div>

      <div class="diagram-box" style="margin-top: 16px;">
          <div class="diagram-title">Parameter Log</div>
          <p>Log timeseries độc lập ghi nhận thông số; các cột ID là tham chiếu sang Masterdata hoặc ứng dụng host.</p>
          <pre class="mermaid" style="background: transparent; border: none; overflow-x: auto; display: flex; justify-content: center;">
erDiagram
    eamo_equipment_parameter_logs {
        string id PK
        string equipment_id
        string equipment_parameter_id
        string unit_id
        string user_id
        string value
        timestamp recorded_at
    }
          </pre>
      </div>
  </section>
</template>
