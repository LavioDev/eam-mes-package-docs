<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits<{
  (e: 'copy', text: string): void
}>()

const apiTableName = ref('eamo_maintenance_plans')
const apiUrl = ref('http://your-app.test/eam/api/extensions')
const currentApiTab = ref<'json' | 'curl'>('json')

interface Column {
  name: string;
  type: string;
  length: string;
  nullable: boolean;
  after: string;
}

const apiColData = ref<Column[]>([
  { name: 'department_id', type: 'string', length: '36', nullable: true, after: 'user_id' }
])

const switchApiTab = (tab: 'json' | 'curl') => {
  currentApiTab.value = tab
}

const addNewColumnToApiGenerator = () => {
  apiColData.value.push({
    name: 'new_column_' + (apiColData.value.length + 1),
    type: 'string',
    length: '',
    nullable: true,
    after: ''
  })
}

const removeColumnFromApiGenerator = (index: number) => {
  apiColData.value.splice(index, 1)
}

const generatedApiCodeRaw = computed(() => {
  const columnsArr = apiColData.value.map(col => {
    const item: any = {
      name: col.name,
      type: col.type
    }
    if (col.length) item.length = parseInt(col.length) || col.length
    item.nullable = !!col.nullable
    if (col.after) item.after = col.after
    return item
  })

  const payloadObj = {
    table: apiTableName.value,
    columns: columnsArr
  }

  const jsonString = JSON.stringify(payloadObj, null, 4)

  if (currentApiTab.value === 'json') {
    return jsonString
  } else {
    return `curl -X POST "${apiUrl.value}" \\
  -H "Content-Type: application/json" \\
  -d '${jsonString.replace(/'/g, "'\\''")}'`
  }
})

const generatedApiCode = computed(() => {
  const columnsArr = apiColData.value.map(col => {
    const item: any = {
      name: col.name,
      type: col.type
    }
    if (col.length) item.length = parseInt(col.length) || col.length
    item.nullable = !!col.nullable
    if (col.after) item.after = col.after
    return item
  })

  const payloadObj = {
    table: apiTableName.value,
    columns: columnsArr
  }

  const jsonString = JSON.stringify(payloadObj, null, 4)

  if (currentApiTab.value === 'json') {
    let highlightedJson = jsonString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    highlightedJson = highlightedJson.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")/g, '<span class="str">$1</span>')
    highlightedJson = highlightedJson.replace(/\b(\d+)\b/g, '<span class="num">$1</span>')
    highlightedJson = highlightedJson.replace(/\b(true|false)\b/g, '<span class="kw">$1</span>')

    return highlightedJson
  } else {
    const curlCmd = `curl -X POST "${apiUrl.value}" \\
  -H "Content-Type: application/json" \\
  -d '${jsonString.replace(/'/g, "'\\''")}'`

    let highlightedCurl = curlCmd
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    highlightedCurl = highlightedCurl.replace(/\b(curl)\b/g, '<span class="kw">$1</span>')
    highlightedCurl = highlightedCurl.replace(/(-X POST|-H|-d)/g, '<span class="cls">$1</span>')
    highlightedCurl = highlightedCurl.replace(/("Content-Type: application\/json")/g, '<span class="str">$1</span>')
    highlightedCurl = highlightedCurl.replace(/('[^']*')/g, '<span class="str">$1</span>')

    return highlightedCurl
  }
})

const triggerCopy = () => {
  emit('copy', generatedApiCodeRaw.value)
}
</script>

<template>
  <section id="view-schema-api-gen" class="view-panel active">
      <h1>Trình sinh trường qua API (API Request Generator)</h1>
      <p>Cấu hình bảng mục tiêu và các cột mở rộng để tự động sinh Payload JSON hoặc lệnh CURL thực hiện yêu cầu qua API Endpoint:</p>

      <div class="gen-layout">
          <!-- Left Config Form -->
          <div class="gen-sidebar">
              <div class="gen-form-group">
                  <label for="input-api-table">Bảng cơ sở dữ liệu đích:</label>
                  <select id="input-api-table" class="gen-form-control" v-model="apiTableName">
                      <option value="eamo_maintenance_plans">eamo_maintenance_plans</option>
                      <option value="eamo_maintenance_schedules">eamo_maintenance_schedules</option>
                      <option value="eamo_checklist_sessions">eamo_checklist_sessions</option>
                      <option value="eamo_equipment_error_logs">eamo_equipment_error_logs</option>
                      <option value="eamo_equipment_parameter_logs">eamo_equipment_parameter_logs</option>
                  </select>
              </div>

              <div class="gen-form-group">
                  <label for="input-api-url">API Endpoint URL:</label>
                  <input type="text" id="input-api-url" class="gen-form-control" v-model="apiUrl">
              </div>

              <hr style="border: 0; border-top: 1px solid var(--border-muted); margin: 12px 0;">
              
              <div style="margin-bottom: 12px; display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size: 11px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Danh sách cột</span>
                  <button class="btn-secondary" style="padding: 4px 8px; margin-bottom: 0;" @click="addNewColumnToApiGenerator">+ Thêm cột</button>
              </div>

              <div id="gen-api-columns-list">
                  <div v-for="(col, idx) in apiColData" :key="idx" class="gen-column-item">
                      <div class="gen-column-header">
                          <span>CỘT ĐỊNH NGHĨA #{{ idx + 1 }}</span>
                          <button class="btn-remove" @click="removeColumnFromApiGenerator(idx)">XÓA</button>
                      </div>
                      <div class="gen-row-grid">
                          <div class="gen-form-group" style="margin-bottom:0; gap:2px;">
                              <label style="font-size:10px;">Tên trường:</label>
                              <input type="text" class="gen-form-control" style="padding:4px 6px; font-size:12px;" v-model="col.name">
                          </div>
                          <div class="gen-form-group" style="margin-bottom:0; gap:2px;">
                              <label style="font-size:10px;">Kiểu dữ liệu:</label>
                              <select class="gen-form-control" style="padding:4px 6px; font-size:12px;" v-model="col.type">
                                  <option value="string">string</option>
                                  <option value="integer">integer</option>
                                  <option value="boolean">boolean</option>
                                  <option value="text">text</option>
                                  <option value="decimal">decimal</option>
                                  <option value="json">json</option>
                              </select>
                          </div>
                      </div>
                      <div class="gen-row-grid" style="margin-top:6px; margin-bottom:0;">
                          <div class="gen-form-group" style="margin-bottom:0; gap:2px;">
                              <label style="font-size:10px;">Độ dài (nếu có):</label>
                              <input type="text" class="gen-form-control" style="padding:4px 6px; font-size:12px;" v-model="col.length" placeholder="e.g. 36">
                          </div>
                          <div class="gen-form-group" style="margin-bottom:0; gap:2px;">
                              <label style="font-size:10px;">Đặt sau cột:</label>
                              <input type="text" class="gen-form-control" style="padding:4px 6px; font-size:12px;" v-model="col.after" placeholder="e.g. user_id">
                          </div>
                      </div>
                      <div style="margin-top:8px; display:flex; gap:8px; align-items:center;">
                          <label style="font-size:11px; display:flex; align-items:center; gap:4px; cursor:pointer;">
                              <input type="checkbox" v-model="col.nullable"> Nullable
                          </label>
                      </div>
                  </div>
              </div>
          </div>

          <!-- Right IDE Preview -->
          <div class="code-container" style="margin: 0; display:flex; flex-direction:column;">
              <div class="code-header">
                  <div style="display:flex; gap:16px;">
                      <span id="ide-api-tab-json" :class="{ 'active-tab': currentApiTab === 'json' }" style="cursor:pointer; color:#ffffff;" @click="switchApiTab('json')">payload.json</span>
                      <span id="ide-api-tab-curl" :class="{ 'active-tab': currentApiTab === 'curl' }" style="cursor:pointer; color:#a1a1aa;" @click="switchApiTab('curl')">curl_request.sh</span>
                  </div>
                  <button class="btn-copy" @click="triggerCopy">Copy to Clipboard</button>
              </div>
              <pre class="code-content" id="output-api-generator-code" style="flex-grow:1; min-height:400px; min-width: 0; box-sizing: border-box;" v-html="generatedApiCode"></pre>
          </div>
      </div>
  </section>
</template>
