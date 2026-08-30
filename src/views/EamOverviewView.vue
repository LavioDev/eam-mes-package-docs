<script setup lang="ts">
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'

const props = defineProps<{
  copySnippet?: (id: string) => void
}>()

const { t, isEn } = useLocale()

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

const directoryComments = computed(() => {
  if (isEn.value) {
    return {
      app: 'Core package components',
      bridge: 'Bridge layer customizing 3rd party libraries (Laravel Passport JWT)',
      builders: 'Custom Eloquent Query Builders',
      concerns: 'Reusable system traits',
      enums: 'Business constant enumerations',
      extensions: 'Framework component extensions',
      http: 'Controllers, Requests, Resources, Middleware',
      models: 'Base Eloquent Models (User, Company, Department, Notification)',
      notifications: 'System notifications (Database, Mail...)',
      providers: 'Service Providers for service registration',
      rules: 'Custom Validation Rules',
      services: 'Common business logic (Cascade Soft Delete...)',
      config: 'System configuration (Auth, CORS, Passport...)',
      database: 'Migrations, Seeders, Factories',
      docs: 'Detailed technical project documentation',
      modules: 'Dedicated business modules (EAM Package)',
      equipment: 'Equipment Management & Operation Module',
      checklist: 'Inspection Schedule & Checklist Management',
      errorMonitoring: 'Error Monitoring & Operating Time',
      maintenance: 'Maintenance Schedule Management',
      parameterLog: 'Equipment Parameter Operating Logs',
      masterdata: 'Master Data Management Module',
      masterdataEquipment: 'Equipment, Parameter, Error, Status, Unit Catalogs',
      routes: 'Package routing (api.php, auth.php, console.php, web.php)',
      tests: 'Automated test suites (Pest / PHPUnit)'
    }
  }
  return {
    app: 'Các thành phần lõi của package',
    bridge: 'Lớp cầu nối tinh chỉnh thư viện 3rd party (Laravel Passport JWT)',
    builders: 'Eloquent Query Builders tùy chỉnh',
    concerns: 'Traits tái sử dụng trong hệ thống',
    enums: 'Các Enumerations định nghĩa hằng số nghiệp vụ',
    extensions: 'Mở rộng các thành phần của Framework',
    http: 'Controllers, Requests, Resources, Middleware',
    models: 'Eloquent Models cơ sở (User, Company, Department, Notification)',
    notifications: 'Các thông báo hệ thống (Database, Mail...)',
    providers: 'Service Providers đăng ký dịch vụ',
    rules: 'Custom Validation Rules',
    services: 'Logic nghiệp vụ chung (Cascade Soft Delete...)',
    config: 'Cấu hình hệ thống (Auth, CORS, Passport...)',
    database: 'Migrations, Seeders, Factories',
    docs: 'Tài liệu kỹ thuật chi tiết của dự án',
    modules: 'Các Mô-đun nghiệp vụ chuyên biệt (EAM Package)',
    equipment: 'Mô-đun Quản lý Thiết bị & Vận hành',
    checklist: 'Quản lý & Tự động sinh Lịch Kiểm tra',
    errorMonitoring: 'Giám sát Lỗi & Thời gian Vận hành',
    maintenance: 'Quản lý & Tự động sinh Lịch Bảo trì',
    parameterLog: 'Nhật ký Thông số Vận hành Thiết bị',
    masterdata: 'Mô-đun Quản lý Dữ liệu Danh mục',
    masterdataEquipment: 'Danh mục Thiết bị, Thông số, Lỗi, Trạng thái, Đơn vị',
    routes: 'Định tuyến package (api.php, auth.php, console.php, web.php)',
    tests: 'Bộ kiểm thử tự động (Pest / PHPUnit)'
  }
})
</script>

<template>
  <section id="view-eam-overview" class="view-panel active">
    <h1>{{ t('overview.title') }}</h1>
    <p class="subtitle-desc">{{ t('overview.subtitle') }}</p>

    <div class="content-body">
      <h2>{{ t('overview.architectureTitle') }}</h2>
      <p v-if="!isEn">
        Hệ thống Package được xây dựng trên nền tảng <strong>Laravel 13</strong> (PHP 8.4) áp dụng mô hình kết hợp giữa <strong>Layered Architecture (Kiến trúc phân lớp)</strong> và <strong>Modular Architecture (Kiến trúc mô-đun)</strong> giúp hệ thống đạt tính mô-đun hóa cao, dễ dàng bảo trì và đóng gói.
      </p>
      <p v-else>
        The Package is built on <strong>Laravel 13</strong> (PHP 8.4) combining <strong>Layered Architecture</strong> and <strong>Modular Architecture</strong>, ensuring high modularity, maintainability, and seamless packaging.
      </p>

      <div class="code-container" style="margin-top: 16px;">
        <div class="code-header">
          <span>{{ t('overview.structureHeader') }}</span>
          <button class="btn-copy" @click="handleCopy('code-backend-dir')">{{ t('common.copy') }}</button>
        </div>
        <pre class="code-content" id="code-backend-dir" style="color: #a1a1aa; line-height: 1.7; font-family: var(--font-mono); font-size: 13px;">
backend/
├── <span style="color: #38bdf8; font-weight: 600;">app/</span>                      # {{ directoryComments.app }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Bridge/</span>               # {{ directoryComments.bridge }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Builders/</span>             # {{ directoryComments.builders }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Concerns/</span>             # {{ directoryComments.concerns }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Enums/</span>                # {{ directoryComments.enums }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Extensions/</span>           # {{ directoryComments.extensions }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Http/</span>                 # {{ directoryComments.http }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Models/</span>               # {{ directoryComments.models }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Notifications/</span>        # {{ directoryComments.notifications }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Providers/</span>            # {{ directoryComments.providers }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Rules/</span>                # {{ directoryComments.rules }}
│   └── <span style="color: #38bdf8; font-weight: 600;">Services/</span>             # {{ directoryComments.services }}
├── <span style="color: #38bdf8; font-weight: 600;">config/</span>                   # {{ directoryComments.config }}
├── <span style="color: #38bdf8; font-weight: 600;">database/</span>                 # {{ directoryComments.database }}
├── <span style="color: #38bdf8; font-weight: 600;">docs/</span>                     # {{ directoryComments.docs }}
├── <span style="color: #38bdf8; font-weight: 600;">modules/</span>                  # {{ directoryComments.modules }}
│   ├── <span style="color: #38bdf8; font-weight: 600;">Equipment/</span>            # {{ directoryComments.equipment }}
│   │   ├── Checklist/        # {{ directoryComments.checklist }}
│   │   ├── ErrorMonitoring/  # {{ directoryComments.errorMonitoring }}
│   │   ├── Maintenance/      # {{ directoryComments.maintenance }}
│   │   └── ParameterLog/     # {{ directoryComments.parameterLog }}
│   └── <span style="color: #38bdf8; font-weight: 600;">Masterdata/</span>           # {{ directoryComments.masterdata }}
│       └── Equipment/        # {{ directoryComments.masterdataEquipment }}
├── <span style="color: #38bdf8; font-weight: 600;">routes/</span>                   # {{ directoryComments.routes }}
└── <span style="color: #38bdf8; font-weight: 600;">tests/</span>                    # {{ directoryComments.tests }}</pre>
      </div>

      <h3 style="margin-top: 24px;">{{ t('overview.coreComponentsTitle') }}</h3>
      <ul v-if="!isEn">
        <li><strong>Bridge:</strong> Tùy biến hành vi mặc định của thư viện thứ 3. Điển hình là <code>AccessToken.php</code> &amp; <code>AccessTokenRepository.php</code> (đăng ký qua <code>Passport::useAccessTokenEntity</code>) giúp override luồng phát hành JWT của Laravel Passport để nhúng thêm custom claims <code>roles</code> và <code>role</code> vào JWT Payload.</li>
        <li><strong>Builders:</strong> Tách biệt truy vấn Eloquent phức tạp ra khỏi Model/Controller. Ví dụ: <code>UserQueryBuilder.php</code> chứa truy vấn cho thực thể User.</li>
        <li><strong>Concerns &amp; Models:</strong> Tận dụng tối đa các tính năng sẵn có của Laravel 13 Eloquent (Route Model Binding mặc định theo Primary Key UUID, Attribute Casting, chuẩn hóa boolean trong FormRequest) mà không phát minh lại bánh xe qua các Trait dư thừa.</li>
        <li><strong>Http (Giao tiếp HTTP &amp; Routing):</strong>
          <ul>
            <li><strong>Controllers:</strong> Áp dụng mô hình Single Action Controller (Invokable Controller) hoặc gói <code>lorisleiva/laravel-actions</code> giúp mỗi file chỉ xử lý duy nhất 1 hành động độc lập.</li>
            <li><strong>Requests/Resources:</strong> Form Request để validation đầu vào, API Resources định dạng dữ liệu trả về cho Frontend.</li>
            <li><strong>Middleware:</strong> Bộ lọc phân quyền như <code>own.user</code> (chính chủ), <code>admin</code>, <code>manager</code>, <code>engineer</code>.</li>
          </ul>
        </li>
        <li><strong>Services:</strong> Chứa logic nghiệp vụ hệ thống. Điển hình là <code>EquipmentCascadeSoftDeleteService</code> xử lý dọn dẹp và xóa liên hoàn (soft delete) các bản ghi phụ thuộc khi xóa thiết bị.</li>
      </ul>
      <ul v-else>
        <li><strong>Bridge:</strong> Customizes default 3rd-party library behavior. Notably, <code>AccessToken.php</code> &amp; <code>AccessTokenRepository.php</code> (registered via <code>Passport::useAccessTokenEntity</code>) overrides Laravel Passport JWT issuance to inject custom claims <code>roles</code> and <code>role</code> into the JWT payload.</li>
        <li><strong>Builders:</strong> Separates complex Eloquent queries from Models/Controllers. For example, <code>UserQueryBuilder.php</code> handles query logic for the User entity.</li>
        <li><strong>Concerns &amp; Models:</strong> Leverages built-in Laravel 13 Eloquent features (UUID primary key Route Model Binding, Attribute Casting, boolean normalization in FormRequest) without reinventing redundant traits.</li>
        <li><strong>Http (HTTP Communication &amp; Routing):</strong>
          <ul>
            <li><strong>Controllers:</strong> Adopts Single Action Controllers (Invokable Controllers) or <code>lorisleiva/laravel-actions</code> to ensure each file handles a single isolated business action.</li>
            <li><strong>Requests/Resources:</strong> Form Requests for input validation, API Resources for standardized frontend response formatting.</li>
            <li><strong>Middleware:</strong> Authorization filters including <code>own.user</code> (owner), <code>admin</code>, <code>manager</code>, <code>engineer</code>.</li>
          </ul>
        </li>
        <li><strong>Services:</strong> Contains core business logic. Notably, <code>EquipmentCascadeSoftDeleteService</code> handles cascading soft deletes of related records upon equipment deletion.</li>
      </ul>

      <h3 style="margin-top: 24px;">{{ t('overview.designPrinciplesTitle') }}</h3>
      <div class="grid-cards">
        <div class="card-item">
          <div class="card-title">{{ t('overview.principles.strictTypesTitle') }}</div>
          <p v-if="!isEn">100% file PHP trong dự án đều khai báo nghiêm ngặt <code>declare(strict_types=1);</code> và khai báo kiểu dữ liệu trả về/tham số rõ ràng.</p>
          <p v-else>100% of PHP files strictly declare <code>declare(strict_types=1);</code> with explicit parameter and return type declarations.</p>
        </div>
        <div class="card-item">
          <div class="card-title">{{ t('overview.principles.singleActionTitle') }}</div>
          <p v-if="!isEn">Sử dụng <code>lorisleiva/laravel-actions</code> giúp cô lập nghiệp vụ. Controller chỉ làm nhiệm vụ nhận Request, ủy thác cho Action/Service xử lý và trả Response.</p>
          <p v-else>Uses <code>lorisleiva/laravel-actions</code> to encapsulate business actions. Controllers only receive requests, delegate to Actions/Services, and return responses.</p>
        </div>
        <div class="card-item">
          <div class="card-title">{{ t('overview.principles.uuidTitle') }}</div>
          <p v-if="!isEn">Toàn bộ bảng người dùng (users), token (oauth_*) và các bảng thực thể nghiệp vụ đều sử dụng UUID làm khóa chính Primary Key.</p>
          <p v-else>All user tables (users), auth tokens (oauth_*), and core domain entity tables use UUID as Primary Key.</p>
        </div>
        <div class="card-item">
          <div class="card-title">{{ t('overview.principles.softDeleteTitle') }}</div>
          <p v-if="!isEn">Đảm bảo tính toàn vẹn dữ liệu. Khi xóa một thực thể cha, Service chuyên biệt sẽ thực hiện soft delete tất cả các bản ghi phụ thuộc liên quan.</p>
          <p v-else>Ensures data integrity. When deleting a parent entity, a dedicated Service soft-deletes all dependent records in cascade.</p>
        </div>
        <div class="card-item">
          <div class="card-title">{{ t('overview.principles.uniformResponseTitle') }}</div>
          <p v-if="!isEn">Toàn bộ API trả về response đồng nhất theo chuẩn: <code>{ "status": "success", "data": ... }</code> hoặc <code>{ "message": "...", "data": ... }</code>.</p>
          <p v-else>All APIs return uniform JSON structures: <code>{ "status": "success", "data": ... }</code> or <code>{ "message": "...", "data": ... }</code>.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-body {
  animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
