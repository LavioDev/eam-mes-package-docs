<script setup lang="ts">
import { ref, computed } from 'vue'

const apiFilterMethod = ref('ALL')
const apiFilterModule = ref('ALL')
const apiSearchKeyword = ref('')

const apiEndpointsData = [
  { method: 'POST', path: '/eam/api/extensions', description: 'Tạo yêu cầu mở rộng thêm trường thông tin mới cho DB', module: 'Core (Mở rộng Schema)', middleware: 'api (Tùy biến cấu hình)' },
  { method: 'GET', path: '/eam/api/extensions/{id}', description: 'Lấy trạng thái xử lý tiến trình thêm trường (queued/processing/done/failed)', module: 'Core (Mở rộng Schema)', middleware: 'api' },
  { method: 'GET', path: '/v1/checklist-details', description: 'Lấy danh sách các hạng mục kiểm tra chi tiết thiết bị', module: 'Checklist', middleware: 'auth:api (Sanctum/Passport)' },
  { method: 'POST', path: '/v1/checklist-details', description: 'Ghi nhận kết quả kiểm tra từng hạng mục thiết bị đầu ca', module: 'Checklist', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/checklist-sessions', description: 'Truy xuất danh sách các phiên kiểm tra thiết bị', module: 'Checklist', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment/error-monitoring/equipment-error-logs', description: 'Truy xuất nhật ký ghi lỗi dừng máy của máy móc', module: 'Error Monitoring', middleware: 'auth:api' },
  { method: 'POST', path: '/v1/equipment/error-monitoring/equipment-error-logs/save', description: 'Lưu hoặc cập nhật nhanh sự cố (hợp nhất store/update)', module: 'Error Monitoring', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment/error-monitoring/equipment-error-logs/oee', description: 'Phân tích biểu đồ chỉ số OEE của máy móc', module: 'Error Monitoring', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/maintenance-plans', description: 'Danh sách các kế hoạch bảo trì thiết bị tuần hoàn', module: 'Maintenance', middleware: 'auth:api' },
  { method: 'POST', path: '/v1/maintenance-plans', description: 'Đăng ký kế hoạch bảo trì thiết bị mới', module: 'Maintenance', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/maintenance-schedules', description: 'Danh sách chi tiết lịch trình sửa chữa bảo trì phân bổ', module: 'Maintenance', middleware: 'auth:api' },
  { method: 'POST', path: '/v1/equipment/equipment-parameter/logs/save', description: 'Lưu hàng loạt thông số vận hành (áp suất, nhiệt độ...)', module: 'Parameter Log', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment', description: 'Lấy danh sách các thiết bị máy móc', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'POST', path: '/v1/equipment', description: 'Đăng ký thiết bị máy móc mới', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment/{id}', description: 'Lấy chi tiết thông tin thiết bị máy móc', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'PUT', path: '/v1/equipment/{id}', description: 'Cập nhật thông tin thiết bị máy móc', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'DELETE', path: '/v1/equipment/{id}', description: 'Xóa thông tin thiết bị máy móc', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment-categories', description: 'Lấy danh sách các nhóm thiết bị', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'POST', path: '/v1/equipment-categories', description: 'Đăng ký nhóm thiết bị mới', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment-categories/{id}', description: 'Lấy chi tiết thông tin nhóm thiết bị', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'PUT', path: '/v1/equipment-categories/{id}', description: 'Cập nhật thông tin nhóm thiết bị', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'DELETE', path: '/v1/equipment-categories/{id}', description: 'Xóa thông tin nhóm thiết bị', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment-parameters', description: 'Lấy danh sách các thông số thiết bị', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'POST', path: '/v1/equipment-parameters', description: 'Đăng ký thông số thiết bị mới', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment-parameters/{id}', description: 'Lấy chi tiết thông số thiết bị', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'PUT', path: '/v1/equipment-parameters/{id}', description: 'Cập nhật thông số thiết bị', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'DELETE', path: '/v1/equipment-parameters/{id}', description: 'Xóa thông số thiết bị', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment-errors', description: 'Lấy danh sách cấu hình lỗi hệ thống', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'POST', path: '/v1/equipment-errors', description: 'Đăng ký cấu hình lỗi mới', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'GET', path: '/v1/equipment-errors/{id}', description: 'Lấy chi tiết cấu hình lỗi', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'PUT', path: '/v1/equipment-errors/{id}', description: 'Cập nhật cấu hình lỗi', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' },
  { method: 'DELETE', path: '/v1/equipment-errors/{id}', description: 'Xóa cấu hình lỗi', module: 'Masterdata Equipment (Dữ liệu gốc)', middleware: 'auth:api' }
]

const filteredApiEndpoints = computed(() => {
  return apiEndpointsData.filter(api => {
    const matchMethod = apiFilterMethod.value === 'ALL' || api.method === apiFilterMethod.value
    const matchModule = apiFilterModule.value === 'ALL' || api.module.includes(apiFilterModule.value)
    const matchSearch = !apiSearchKeyword.value || 
      api.path.toLowerCase().includes(apiSearchKeyword.value.toLowerCase()) || 
      api.description.toLowerCase().includes(apiSearchKeyword.value.toLowerCase())
    return matchMethod && matchModule && matchSearch
  })
})
</script>

<template>
  <section id="view-eam-apis" class="view-panel active">
      <h1>Danh sách APIs</h1>
      <!-- Interactive Filter Bar -->
      <div class="gen-form-group" style="flex-direction: row; gap: 16px; margin-bottom: 20px; align-items: center; flex-wrap: wrap; background: var(--bg-card);">
          <div style="display: flex; flex-direction: column; gap: 4px; min-width: 140px;">
              <label style="font-size: 11px; font-weight: 600; color: var(--text-muted);">Phương thức (Method):</label>
              <select class="gen-form-control" v-model="apiFilterMethod" style="padding: 6px 10px; font-size: 13px;">
                  <option value="ALL">Tất cả phương thức</option>
                  <option value="POST">POST</option>
                  <option value="GET">GET</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
              </select>
          </div>

          <div style="display: flex; flex-direction: column; gap: 4px; min-width: 220px;">
              <label style="font-size: 11px; font-weight: 600; color: var(--text-muted);">Lọc theo Module:</label>
              <select class="gen-form-control" v-model="apiFilterModule" style="padding: 6px 10px; font-size: 13px;">
                  <option value="ALL">Tất cả Module</option>
                  <option value="Core">Core (Mở rộng Schema)</option>
                  <option value="Checklist">Checklist</option>
                  <option value="Error Monitoring">Error Monitoring</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Parameter Log">Parameter Log</option>
                  <option value="Masterdata">Masterdata Equipment (Dữ liệu gốc)</option>
              </select>
          </div>

          <div style="display: flex; flex-direction: column; gap: 4px; flex-grow: 1; min-width: 200px;">
              <label style="font-size: 11px; font-weight: 600; color: var(--text-muted);">Tìm kiếm Endpoint / Mô tả:</label>
              <input type="text" class="gen-form-control" v-model="apiSearchKeyword" placeholder="Nhập đường dẫn API hoặc từ khóa..." style="padding: 6px 10px; font-size: 13px;">
          </div>
      </div>

      <table>
          <thead>
              <tr>
                  <th style="width: 100px;">Phương thức</th>
                  <th>Đường dẫn API</th>
                  <th>Mô tả chức năng</th>
                  <th>Phân hệ / Module</th>
                  <th style="width: 150px;">Middleware bảo vệ</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(api, idx) in filteredApiEndpoints" :key="idx">
                  <td><span class="badge-method" :class="api.method.toLowerCase()">{{ api.method }}</span></td>
                  <td><code class="api-path">{{ api.path }}</code></td>
                  <td>{{ api.description }}</td>
                  <td>{{ api.module }}</td>
                  <td>{{ api.middleware }}</td>
              </tr>
              <tr v-if="filteredApiEndpoints.length === 0">
                  <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 20px;">
                      Không tìm thấy API nào phù hợp với bộ lọc hiện tại.
                  </td>
              </tr>
          </tbody>
      </table>
  </section>
</template>
