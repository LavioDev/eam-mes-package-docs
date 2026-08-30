<script setup lang="ts">
import { ref, computed } from 'vue'
import DbSchemaFlow from '../components/DbSchemaFlow.vue'
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
const activeSubmodule = ref('masterdata')

const submoduleOptions = computed(() => [
  { value: 'masterdata', label: t('database.subtabs.masterdata') },
  { value: 'checklist', label: t('database.subtabs.checklist') },
  { value: 'maintenance', label: t('database.subtabs.maintenance') },
  { value: 'error', label: t('database.subtabs.error') },
  { value: 'parameter', label: t('database.subtabs.parameter') }
])
</script>

<template>
  <section id="view-eam-database" class="view-panel active">
    <h1>{{ t('database.title') }}</h1>
    <p class="subtitle-desc">{{ t('database.subtitle') }}</p>

    <!-- Sub Navigation for Submodules: Pill Tabs on Desktop, Select on Mobile -->
    <div class="subtabs-nav desktop-only">
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'masterdata' }" @click="activeSubmodule = 'masterdata'">{{ t('database.subtabs.masterdata') }}</button>
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'checklist' }" @click="activeSubmodule = 'checklist'">{{ t('database.subtabs.checklist') }}</button>
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'maintenance' }" @click="activeSubmodule = 'maintenance'">{{ t('database.subtabs.maintenance') }}</button>
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'error' }" @click="activeSubmodule = 'error'">{{ t('database.subtabs.error') }}</button>
      <button class="subtab-btn" :class="{ active: activeSubmodule === 'parameter' }" @click="activeSubmodule = 'parameter'">{{ t('database.subtabs.parameter') }}</button>
    </div>

    <!-- Mobile-Only Select Dropdown (Shown when screen shrinks) -->
    <div class="submodule-select-bar mobile-only">
      <div class="select-label-group">
        <svg class="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
        <span class="select-label-text">{{ t('database.selectSubmodule') }}</span>
      </div>
      <a-select
        v-model:value="activeSubmodule"
        :options="submoduleOptions"
        class="submodule-select-control"
        size="large"
      />
    </div>

    <!-- 1. SUBMODULE MASTERDATA EQUIPMENT -->
    <div v-if="activeSubmodule === 'masterdata'" class="submodule-content">
      <h3>{{ t('database.masterdata.title') }}</h3>
      <p>{{ t('database.masterdata.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="masterdata" />

      <h4 style="margin-top: 24px;">{{ t('database.masterdata.endpointsTitle') }}</h4>
      <div class="table-responsive">
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
    </div>

    <!-- 2. SUBMODULE CHECKLIST MANAGEMENT -->
    <div v-else-if="activeSubmodule === 'checklist'" class="submodule-content">
      <h3>{{ t('database.checklist.title') }}</h3>
      <p>{{ t('database.checklist.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="checklist" />

      <h4 style="margin-top: 24px;">{{ t('database.checklist.endpointsTitle') }}</h4>
      <div class="table-responsive">
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
      </div>
    </div>

    <!-- 3. SUBMODULE MAINTENANCE MANAGEMENT -->
    <div v-else-if="activeSubmodule === 'maintenance'" class="submodule-content">
      <h3>{{ t('database.maintenance.title') }}</h3>
      <p>{{ t('database.maintenance.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="maintenance" />

      <h4 style="margin-top: 24px;">{{ t('database.maintenance.endpointsTitle') }}</h4>
      <div class="table-responsive">
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
    </div>

    <!-- 4. SUBMODULE ERROR MONITORING & OPERATING TIME -->
    <div v-else-if="activeSubmodule === 'error'" class="submodule-content">
      <h3>{{ t('database.error.title') }}</h3>
      <p>{{ t('database.error.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="error_monitoring" />

      <h4 style="margin-top: 24px;">{{ t('database.error.endpointsTitle') }}</h4>
      <div class="table-responsive">
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
    </div>

    <!-- 5. SUBMODULE PARAMETER LOG -->
    <div v-else-if="activeSubmodule === 'parameter'" class="submodule-content">
      <h3>{{ t('database.parameter.title') }}</h3>
      <p>{{ t('database.parameter.desc') }}</p>

      <!-- Vue Flow Interactive ERD Schema -->
      <DbSchemaFlow schema-type="parameter_log" />

      <h4 style="margin-top: 24px;">{{ t('database.parameter.endpointsTitle') }}</h4>
      <div class="table-responsive">
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
    </div>
  </section>
</template>

<style scoped>
/* Desktop: Show pills, Hide select */
.subtabs-nav.desktop-only {
  display: inline-flex;
}

.submodule-select-bar.mobile-only {
  display: none;
  align-items: center;
  gap: 12px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 12px 18px;
  margin: 16px 0 24px;
  box-shadow: var(--shadow-card);
  flex-wrap: wrap;
}

.select-label-group {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 13.5px;
  white-space: nowrap;
}

.select-icon {
  width: 17px;
  height: 17px;
  color: var(--color-accent);
}

.submodule-select-control {
  flex-grow: 1;
  min-width: 260px;
}

.submodule-content {
  animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile & Tablet Co Lại (<= 768px): Hide pills, Show select */
@media (max-width: 768px) {
  .subtabs-nav.desktop-only {
    display: none !important;
  }
  
  .submodule-select-bar.mobile-only {
    display: flex !important;
    padding: 10px 12px;
    gap: 8px;
  }
  
  .submodule-select-control {
    width: 100%;
    min-width: 100%;
  }
}
</style>
