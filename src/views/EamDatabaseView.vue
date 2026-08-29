<script setup lang="ts">
import { ref } from 'vue'
import DbSchemaFlow from '../components/DbSchemaFlow.vue'
import { useLocale } from '../composables/useLocale'

const props = defineProps<{
  copySnippet?: (id: string) => void
}>()

const { t, isEn } = useLocale()
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
</script>

<template>
  <section id="view-eam-database" class="view-panel active">
    <h1>{{ t('database.title') }}</h1>
    <p class="subtitle-desc">{{ t('database.subtitle') }}</p>

    <!-- Sub Navigation for Submodules -->
    <div class="subtabs-nav">
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'masterdata' }" @click="activeSubmodule = 'masterdata'">{{ t('database.subtabs.masterdata') }}</button>
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'checklist' }" @click="activeSubmodule = 'checklist'">{{ t('database.subtabs.checklist') }}</button>
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'maintenance' }" @click="activeSubmodule = 'maintenance'">{{ t('database.subtabs.maintenance') }}</button>
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'error' }" @click="activeSubmodule = 'error'">{{ t('database.subtabs.error') }}</button>
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'parameter' }" @click="activeSubmodule = 'parameter'">{{ t('database.subtabs.parameter') }}</button>
    </div>

    <!-- 1. SUBMODULE MASTERDATA EQUIPMENT -->
    <div v-if="activeSubmodule === 'masterdata'" class="submodule-content">
      <h3>{{ t('database.masterdata.title') }}</h3>
      <p>{{ t('database.masterdata.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="masterdata" />

      <h4 style="margin-top: 24px;">{{ t('database.masterdata.bizLogicTitle') }}</h4>
      <ul v-if="!isEn">
        <li><strong>Giải mã QR Code tìm Thiết bị (<code>DecodeQrAndGetEquipmentAction</code>)</strong>: Kỹ sư tải lên file ảnh mã QR -> giải mã thành mã QR văn bản -> truy vấn chính xác thiết bị và load đầy đủ các thông tin quan hệ phụ thuộc (Category, Parameters, State, Images, Errors) để đưa lên giao diện thao tác nhanh.</li>
        <li><strong>Cây phân cấp Thiết bị Cha - Con</strong>: Sử dụng mối liên kết đệ quy <code>parent_id</code> để mô hình hóa toàn bộ dây chuyền sản xuất phức tạp: Nhà máy (Factory) → Khu vực/Dây chuyền (Line) → Cụm máy (Equipment System) → Chi tiết linh kiện máy (Sub-system/Component).</li>
        <li><strong>Dashboard Thống kê (<code>GetDashboardSummaryAction</code>)</strong>: Tổng hợp nhanh số lượng thiết bị theo từng trạng thái vận hành (đang hoạt động, dừng máy, đang sửa chữa...) và cảnh báo các thiết bị đã quá hạn hoặc sắp đến hạn bảo trì định kỳ.</li>
      </ul>
      <ul v-else>
        <li><strong>QR Code Decoding for Equipment Lookup (<code>DecodeQrAndGetEquipmentAction</code>)</strong>: Engineers upload a QR code image -> decoded into text QR code -> queries the exact equipment and eager loads dependent relations (Category, Parameters, State, Images, Errors) for quick UI interactions.</li>
        <li><strong>Parent-Child Equipment Hierarchy</strong>: Uses recursive <code>parent_id</code> self-referencing to model complex production lines: Factory → Area/Line → Equipment System → Machine Sub-system/Component.</li>
        <li><strong>Summary Statistics Dashboard (<code>GetDashboardSummaryAction</code>)</strong>: Aggregates equipment count by operating status (running, stopped, under repair...) and triggers early warnings for overdue or upcoming maintenance schedules.</li>
      </ul>

      <h4 style="margin-top: 24px;">{{ t('database.masterdata.endpointsTitle') }}</h4>
      <table>
        <thead>
          <tr>
            <th>{{ t('database.headers.method') }}</th>
            <th>{{ t('database.headers.endpoint') }}</th>
            <th>{{ t('database.headers.middleware') }}</th>
            <th>{{ t('database.headers.purpose') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/equipment</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.masterdata.purposes.list') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/equipment/dashboard/summary</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.masterdata.purposes.summary') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/equipment/decode-qr</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.masterdata.purposes.decodeQr') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/equipment/{id}</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.masterdata.purposes.show') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/equipment</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.masterdata.purposes.create') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-put">PUT</span></td>
            <td><code>/api/v1/equipment/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.masterdata.purposes.update') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-patch">PATCH</span></td>
            <td><code>/api/v1/equipment/{id}/parent</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.masterdata.purposes.updateParent') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/equipment/{id}/errors</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.masterdata.purposes.assignErrors') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-delete">DELETE</span></td>
            <td><code>/api/v1/equipment/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.masterdata.purposes.delete') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 2. SUBMODULE CHECKLIST MANAGEMENT -->
    <div v-else-if="activeSubmodule === 'checklist'" class="submodule-content">
      <h3>{{ t('database.checklist.title') }}</h3>
      <p>{{ t('database.checklist.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="checklist" />

      <h4 style="margin-top: 24px;">{{ t('database.checklist.coreAlgorithmTitle') }}</h4>
      
      <div class="alert alert-warning">
        <div class="alert-title">{{ t('database.checklist.safetyTitle') }}</div>
        <p>{{ t('database.checklist.safetyDesc1') }}</p>
        <div class="math-formula">
          {{ t('database.checklist.safetyFormula') }}
        </div>
        <p>{{ t('database.checklist.safetyDesc2') }}</p>
      </div>

      <h5>{{ t('database.checklist.calcDateTitle') }}</h5>
      <p>{{ t('database.checklist.calcDateDesc') }}</p>
      <ul>
        <li><strong>daily:</strong> {{ isEn ? 'Adds cycle_interval days.' : 'Cộng thêm cycle_interval ngày.' }}</li>
        <li><strong>weekly:</strong> {{ isEn ? 'Adds cycle_interval weeks.' : 'Cộng thêm cycle_interval tuần.' }}</li>
        <li><strong>monthly:</strong> {{ isEn ? 'Adds cycle_interval months.' : 'Cộng thêm cycle_interval tháng.' }}</li>
        <li><strong>yearly:</strong> {{ isEn ? 'Adds cycle_interval years.' : 'Cộng thêm cycle_interval năm.' }}</li>
      </ul>

      <h5>{{ t('database.checklist.historyProtectTitle') }}</h5>
      <p>{{ t('database.checklist.historyProtectDesc') }}</p>
      <ol>
        <li>{{ t('database.checklist.historyStep1') }}</li>
        <li>{{ t('database.checklist.historyStep2') }}</li>
        <li>{{ t('database.checklist.historyStep3') }}</li>
      </ol>

      <h4 style="margin-top: 24px;">{{ t('database.checklist.endpointsTitle') }}</h4>
      <table>
        <thead>
          <tr>
            <th>{{ t('database.headers.method') }}</th>
            <th>{{ t('database.headers.endpoint') }}</th>
            <th>{{ t('database.headers.middleware') }}</th>
            <th>{{ t('database.headers.purpose') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/checklist-sessions/equipment-status</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.checklist.purposes.equipmentStatus') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/checklist-sessions/daily</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.checklist.purposes.daily') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/checklist-sessions</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.checklist.purposes.listSessions') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/checklist-sessions/{id}</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.checklist.purposes.showSession') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/checklist-schedules/{id}/complete</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.checklist.purposes.completeSchedule') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/checklist-sessions</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.checklist.purposes.createSession') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-put">PUT</span></td>
            <td><code>/api/v1/checklist-sessions/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.checklist.purposes.updateSession') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-delete">DELETE</span></td>
            <td><code>/api/v1/checklist-sessions/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.checklist.purposes.deleteSession') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/checklist-sessions/judge</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.checklist.purposes.judgeSession') }}</td>
          </tr>
        </tbody>
      </table>

      <h4 style="margin-top: 24px;">{{ t('database.checklist.unitTestTitle') }}</h4>
      <p>{{ t('database.checklist.unitTestDesc') }}</p>
      <div class="code-container">
        <div class="code-header">
          <span>Bash</span>
          <button class="btn-copy" @click="handleCopy('code-unit-test-checklist')">{{ t('common.copy') }}</button>
        </div>
        <pre class="code-content" id="code-unit-test-checklist" style="padding: 12px; font-family: var(--font-mono); font-size: 13px; color: #a1a1aa;"><span class="kw">php artisan test</span> <span class="str">--filter=ChecklistScheduleGeneratorTest --compact</span></pre>
      </div>
    </div>

    <!-- 3. SUBMODULE MAINTENANCE MANAGEMENT -->
    <div v-else-if="activeSubmodule === 'maintenance'" class="submodule-content">
      <h3>{{ t('database.maintenance.title') }}</h3>
      <p>{{ t('database.maintenance.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="maintenance" />

      <h4 style="margin-top: 24px;">{{ t('database.maintenance.calcTitle') }}</h4>
      
      <h5>{{ t('database.maintenance.sec1Title') }}</h5>
      <p>{{ t('database.maintenance.sec1Desc') }}</p>
      <div class="math-formula">
        {{ t('database.maintenance.sec1Formula') }}
      </div>
      <p>{{ t('database.maintenance.sec1Note') }}</p>

      <h5>{{ t('database.maintenance.sec2Title') }}</h5>
      <p>{{ t('database.maintenance.sec2Desc') }}</p>
      <div class="math-formula">
        {{ t('database.maintenance.sec2Formula') }}
      </div>
      <p>{{ t('database.maintenance.sec2Note') }}</p>

      <h5>{{ t('database.maintenance.sec3Title') }}</h5>
      <p>{{ t('database.maintenance.sec3Desc') }}</p>
      <ol>
        <li>{{ t('database.maintenance.sec3Step1') }}</li>
        <li>{{ t('database.maintenance.sec3Step2') }}</li>
        <li>{{ t('database.maintenance.sec3Step3') }}</li>
      </ol>

      <h4 style="margin-top: 24px;">{{ t('database.maintenance.endpointsTitle') }}</h4>
      <table>
        <thead>
          <tr>
            <th>{{ t('database.headers.method') }}</th>
            <th>{{ t('database.headers.endpoint') }}</th>
            <th>{{ t('database.headers.middleware') }}</th>
            <th>{{ t('database.headers.purpose') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/maintenance-plans</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.maintenance.purposes.listPlans') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/maintenance-plans/{id}</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.maintenance.purposes.showPlan') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/maintenance-schedules</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.maintenance.purposes.listSchedules') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/maintenance-logs</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.maintenance.purposes.listLogs') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/maintenance-schedules/{id}/complete</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.maintenance.purposes.completeSchedule') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/maintenance-plans</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.maintenance.purposes.createPlan') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-put">PUT</span></td>
            <td><code>/api/v1/maintenance-plans/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.maintenance.purposes.updatePlan') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-delete">DELETE</span></td>
            <td><code>/api/v1/maintenance-plans/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.maintenance.purposes.deletePlan') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-put">PUT</span></td>
            <td><code>/api/v1/maintenance-schedules/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.maintenance.purposes.reschedule') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 4. SUBMODULE ERROR MONITORING & OPERATING TIME -->
    <div v-else-if="activeSubmodule === 'error'" class="submodule-content">
      <h3>{{ t('database.error.title') }}</h3>
      <p>{{ t('database.error.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="error_monitoring" />

      <h4 style="margin-top: 24px;">{{ t('database.error.coreAlgorithmTitle') }}</h4>
      
      <h5>{{ t('database.error.sec1Title') }}</h5>
      <p>{{ t('database.error.sec1Desc') }}</p>
      <ol>
        <li>{{ t('database.error.sec1Step1') }}</li>
        <li>{{ t('database.error.sec1Step2') }}</li>
        <li>{{ t('database.error.sec1Step3') }}
          <div class="math-formula">
            {{ t('database.error.sec1Formula1') }}
          </div>
        </li>
        <li>{{ t('database.error.sec1Step4') }}
          <div class="math-formula">
            {{ t('database.error.sec1Formula2') }}
          </div>
        </li>
        <li>{{ t('database.error.sec1Step5') }}</li>
      </ol>

      <h5>{{ t('database.error.sec2Title') }}</h5>
      <p>{{ t('database.error.sec2Desc') }}</p>

      <h4 style="margin-top: 24px;">{{ t('database.error.endpointsTitle') }}</h4>
      <table>
        <thead>
          <tr>
            <th>{{ t('database.headers.method') }}</th>
            <th>{{ t('database.headers.endpoint') }}</th>
            <th>{{ t('database.headers.middleware') }}</th>
            <th>{{ t('database.headers.purpose') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/equipment/error-monitoring/equipment-error-logs</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.error.purposes.listErrorLogs') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/equipment/error-monitoring/equipment-error-logs</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.error.purposes.createErrorLog') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-put">PUT</span></td>
            <td><code>/api/v1/equipment/error-monitoring/equipment-error-logs/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.error.purposes.updateErrorLog') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/equipment/error-monitoring/operating-times</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.error.purposes.listOperatingTimes') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/equipment/error-monitoring/operating-times/maintenance-status</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.error.purposes.maintenanceStatus') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/equipment/error-monitoring/operating-times</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.error.purposes.createOperatingTime') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/equipment/error-monitoring/operating-times/import</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.error.purposes.importOperatingTimes') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-delete">DELETE</span></td>
            <td><code>/api/v1/equipment/error-monitoring/operating-times/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.error.purposes.deleteOperatingTime') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 5. SUBMODULE PARAMETER LOG -->
    <div v-else-if="activeSubmodule === 'parameter'" class="submodule-content">
      <h3>{{ t('database.parameter.title') }}</h3>
      <p>{{ t('database.parameter.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="parameter_log" />

      <h4 style="margin-top: 24px;">{{ t('database.parameter.bizLogicTitle') }}</h4>
      <ul>
        <li><strong>{{ t('database.parameter.matrixTitle') }}</strong>
          <ol>
            <li><code>$oneWeekAgo = CarbonImmutable::now()->subDays(7)->startOfDay();</code></li>
            <li>{{ isEn ? 'Queries eamo_equipment_parameter_logs records where recorded_at >= $oneWeekAgo.' : 'Truy vấn các bản ghi ghi nhận thông số eamo_equipment_parameter_logs của thiết bị có thời gian đo đạc recorded_at >= $oneWeekAgo.' }}</li>
            <li>{{ isEn ? 'Eager loads relations: equipment, parameter, unit, user to prepare 7-day trend chart rendering on Frontend.' : 'Load các liên kết đối tượng: equipment, parameter, unit, user để chuẩn bị vẽ biểu đồ diễn biến thông số 7 ngày của thiết bị trên Frontend.' }}</li>
          </ol>
        </li>
        <li><strong>{{ t('database.parameter.batchTitle') }}</strong>: {{ t('database.parameter.batchDesc') }}</li>
        <li><strong>{{ t('database.parameter.importTitle') }}</strong>: {{ t('database.parameter.importDesc') }}</li>
      </ul>

      <h4 style="margin-top: 24px;">{{ t('database.parameter.endpointsTitle') }}</h4>
      <table>
        <thead>
          <tr>
            <th>{{ t('database.headers.method') }}</th>
            <th>{{ t('database.headers.endpoint') }}</th>
            <th>{{ t('database.headers.middleware') }}</th>
            <th>{{ t('database.headers.purpose') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/equipment/equipment-parameter/logs</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.parameter.purposes.listLogs') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/equipment/equipment-parameter/logs/weekly/{equipmentId}</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.parameter.purposes.weeklyLogs') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-get">GET</span></td>
            <td><code>/api/v1/equipment/equipment-parameter/logs/overview/{id}</code></td>
            <td><code>engineer</code></td>
            <td>{{ t('database.parameter.purposes.overviewLogs') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/equipment/equipment-parameter/logs</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.parameter.purposes.createLog') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/equipment/equipment-parameter/logs/save</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.parameter.purposes.saveLogs') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-post">POST</span></td>
            <td><code>/api/v1/equipment/equipment-parameter/logs/import</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.parameter.purposes.importLogs') }}</td>
          </tr>
          <tr>
            <td><span class="badge badge-delete">DELETE</span></td>
            <td><code>/api/v1/equipment/equipment-parameter/logs/{id}</code></td>
            <td><code>manager</code></td>
            <td>{{ t('database.parameter.purposes.deleteLog') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.submodule-content {
  animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
