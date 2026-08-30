<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '../composables/useLocale'

const { t, isEn } = useLocale()

const apiFilterMethod = ref('ALL')
const apiFilterModule = ref('ALL')
const apiSearchKeyword = ref('')

interface ApiEndpointItem {
  method: string
  path: string
  descKey: string
  module: string
  moduleEn: string
  middlewareKey: string
}

const rawApiEndpoints: ApiEndpointItem[] = [
  { method: 'POST', path: '/eam/api/extensions', descKey: 'postExtensions', module: 'Core (Mở rộng Schema)', moduleEn: 'Core (Schema Extension)', middlewareKey: 'coreApi' },
  { method: 'GET', path: '/eam/api/extensions/{id}', descKey: 'getExtensionsId', module: 'Core (Mở rộng Schema)', moduleEn: 'Core (Schema Extension)', middlewareKey: 'api' },
  { method: 'GET', path: '/v1/checklist-details', descKey: 'getChecklistDetails', module: 'Checklist', moduleEn: 'Checklist', middlewareKey: 'authApi' },
  { method: 'POST', path: '/v1/checklist-details', descKey: 'postChecklistDetails', module: 'Checklist', moduleEn: 'Checklist', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/checklist-sessions', descKey: 'getChecklistSessions', module: 'Checklist', moduleEn: 'Checklist', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment/error-monitoring/equipment-error-logs', descKey: 'getErrorLogs', module: 'Error Monitoring', moduleEn: 'Error Monitoring', middlewareKey: 'auth' },
  { method: 'POST', path: '/v1/equipment/error-monitoring/equipment-error-logs/save', descKey: 'postErrorLogsSave', module: 'Error Monitoring', moduleEn: 'Error Monitoring', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment/error-monitoring/equipment-error-logs/oee', descKey: 'getErrorLogsOee', module: 'Error Monitoring', moduleEn: 'Error Monitoring', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/maintenance-plans', descKey: 'getMaintenancePlans', module: 'Maintenance', moduleEn: 'Maintenance', middlewareKey: 'auth' },
  { method: 'POST', path: '/v1/maintenance-plans', descKey: 'postMaintenancePlans', module: 'Maintenance', moduleEn: 'Maintenance', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/maintenance-schedules', descKey: 'getMaintenanceSchedules', module: 'Maintenance', moduleEn: 'Maintenance', middlewareKey: 'auth' },
  { method: 'POST', path: '/v1/equipment/equipment-parameter/logs/save', descKey: 'postParameterLogsSave', module: 'Parameter Log', moduleEn: 'Parameter Log', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment', descKey: 'getEquipment', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'POST', path: '/v1/equipment', descKey: 'postEquipment', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment/{id}', descKey: 'getEquipmentId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'PUT', path: '/v1/equipment/{id}', descKey: 'putEquipmentId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'DELETE', path: '/v1/equipment/{id}', descKey: 'deleteEquipmentId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment-categories', descKey: 'getEquipmentCategories', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'POST', path: '/v1/equipment-categories', descKey: 'postEquipmentCategories', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment-categories/{id}', descKey: 'getEquipmentCategoriesId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'PUT', path: '/v1/equipment-categories/{id}', descKey: 'putEquipmentCategoriesId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'DELETE', path: '/v1/equipment-categories/{id}', descKey: 'deleteEquipmentCategoriesId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment-parameters', descKey: 'getEquipmentParameters', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'POST', path: '/v1/equipment-parameters', descKey: 'postEquipmentParameters', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment-parameters/{id}', descKey: 'getEquipmentParametersId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'PUT', path: '/v1/equipment-parameters/{id}', descKey: 'putEquipmentParametersId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'DELETE', path: '/v1/equipment-parameters/{id}', descKey: 'deleteEquipmentParametersId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment-errors', descKey: 'getEquipmentErrors', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'POST', path: '/v1/equipment-errors', descKey: 'postEquipmentErrors', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'GET', path: '/v1/equipment-errors/{id}', descKey: 'getEquipmentErrorsId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'PUT', path: '/v1/equipment-errors/{id}', descKey: 'putEquipmentErrorsId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' },
  { method: 'DELETE', path: '/v1/equipment-errors/{id}', descKey: 'deleteEquipmentErrorsId', module: 'Masterdata Equipment (Dữ liệu gốc)', moduleEn: 'Masterdata Equipment', middlewareKey: 'auth' }
]

const apiEndpointsData = computed(() => {
  return rawApiEndpoints.map(api => ({
    method: api.method,
    path: api.path,
    description: t(`apis.descriptions.${api.descKey}`),
    module: isEn.value ? api.moduleEn : api.module,
    moduleRaw: api.module,
    middleware: t(`apis.middlewares.${api.middlewareKey}`)
  }))
})

const filteredApiEndpoints = computed(() => {
  return apiEndpointsData.value.filter(api => {
    const matchMethod = apiFilterMethod.value === 'ALL' || api.method === apiFilterMethod.value
    const matchModule = apiFilterModule.value === 'ALL' || api.moduleRaw.includes(apiFilterModule.value) || api.module.includes(apiFilterModule.value)
    const matchSearch = !apiSearchKeyword.value || 
      api.path.toLowerCase().includes(apiSearchKeyword.value.toLowerCase()) || 
      api.description.toLowerCase().includes(apiSearchKeyword.value.toLowerCase())
    return matchMethod && matchModule && matchSearch
  })
})
</script>

<template>
  <section id="view-eam-apis" class="view-panel active">
    <h1>{{ t('apis.title') }}</h1>
    <p class="subtitle-desc">{{ t('apis.subtitle') }}</p>

    <!-- Interactive Filter Bar -->
    <div class="api-filter-bar">
      <div class="filter-col">
        <label class="filter-label">{{ t('apis.filters.methodLabel') }}</label>
        <select class="gen-form-control" v-model="apiFilterMethod">
          <option value="ALL">{{ t('apis.filters.allMethods') }}</option>
          <option value="POST">POST</option>
          <option value="GET">GET</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      <div class="filter-col">
        <label class="filter-label">{{ t('apis.filters.moduleLabel') }}</label>
        <select class="gen-form-control" v-model="apiFilterModule">
          <option value="ALL">{{ t('apis.filters.allModules') }}</option>
          <option value="Core">{{ t('apis.filters.coreModule') }}</option>
          <option value="Checklist">{{ t('apis.filters.checklistModule') }}</option>
          <option value="Error Monitoring">{{ t('apis.filters.errorModule') }}</option>
          <option value="Maintenance">{{ t('apis.filters.maintenanceModule') }}</option>
          <option value="Parameter Log">{{ t('apis.filters.parameterModule') }}</option>
          <option value="Masterdata">{{ t('apis.filters.masterdataModule') }}</option>
        </select>
      </div>

      <div class="filter-col search-col">
        <label class="filter-label">{{ t('apis.filters.searchLabel') }}</label>
        <input 
          type="text" 
          class="gen-form-control" 
          v-model="apiSearchKeyword" 
          :placeholder="t('apis.filters.searchPlaceholder')"
        >
      </div>
    </div>

    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th style="width: 100px;">{{ t('apis.headers.method') }}</th>
            <th>{{ t('apis.headers.path') }}</th>
            <th>{{ t('apis.headers.description') }}</th>
            <th>{{ t('apis.headers.module') }}</th>
            <th style="width: 150px;">{{ t('apis.headers.middleware') }}</th>
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
              {{ t('apis.filters.noResults') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.api-filter-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  align-items: flex-end;
  flex-wrap: wrap;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  box-shadow: var(--shadow-card);
}

.filter-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 150px;
}

.search-col {
  flex-grow: 1;
  min-width: 220px;
}

.filter-label {
  font-size: 11.5px;
  font-weight: 650;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.api-path {
  font-weight: 600;
}

@media (max-width: 640px) {
  .api-filter-bar {
    padding: 12px 14px;
    gap: 12px;
  }
  .filter-col {
    width: 100%;
    min-width: 100%;
  }
  .search-col {
    width: 100%;
    min-width: 100%;
  }
}
</style>
