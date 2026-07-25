<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits<{
  (e: 'copy', text: string): void
}>()

const tableName = ref('eamo_maintenance_plans')
const className = ref('MaintenancePlanExtension')
const priorityVal = ref(10)

interface Column {
  name: string;
  type: string;
  length: string;
  nullable: boolean;
  after: string;
}

const colData = ref<Column[]>([
  { name: 'department_id', type: 'string', length: '36', nullable: true, after: 'user_id' }
])

const addNewColumnToGenerator = () => {
  colData.value.push({
    name: 'new_column_' + (colData.value.length + 1),
    type: 'string',
    length: '',
    nullable: true,
    after: ''
  })
}

const removeColumnFromGenerator = (index: number) => {
  colData.value.splice(index, 1)
}

const generatedPHPCodeRaw = computed(() => {
  let colsMarkup = ''
  colData.value.forEach((col, idx) => {
    let code = `            ColumnDefinition::make('${col.name}', '${col.type}')`
    if (col.type === 'string' && col.length) {
      code += `\n                ->length(${col.length})`
    }
    if (col.nullable) {
      code += `\n                ->nullable()`
    } else {
      code += `\n                ->nullable(false)`
    }
    if (col.after) {
      code += `\n                ->after('${col.after}')`
    }

    if (idx < colData.value.length - 1) {
      code += `,\n\n`
    } else {
      code += `,\n`
    }
    colsMarkup += code
  })

  return `<?php

namespace App\\Extensions;

use Spatie\\LaravelPackageTools\\Contracts\\TableExtension;
use Spatie\\LaravelPackageTools\\Extensions\\ColumnDefinition;

class ${className.value || 'MyTableExtension'} implements TableExtension
{
    public function targetTable(): string
    {
        return '${tableName.value}';
    }

    public function columns(): array
    {
        return [
${colsMarkup}        ];
    }

    public function priority(): int
    {
        return ${priorityVal.value || 10};
    }
}`
})

const highlightPHP = (code: string) => {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  html = html.replace(/\/\/.*/g, '<span class="cmt">$&</span>')
  html = html.replace(/\/\*[\s\S]*?\*\//g, '<span class="cmt">$&</span>')
  html = html.replace(/\b(namespace|use|class|implements|public|function|return|string|array|int|bool)\b/g, '<span class="kw">$1</span>')
  html = html.replace(/\b(TableExtension|ColumnDefinition)\b/g, '<span class="cls">$1</span>')
  html = html.replace(/('([^'\\]|\\.)*')/g, '<span class="str">$1</span>')
  html = html.replace(/\b(\d+)\b/g, '<span class="num">$1</span>')
  html = html.replace(/([a-zA-Z0-9_]+)\(/g, '<span class="fn">$1</span>(')

  return html
}

const generatedPHPCode = computed(() => {
  return highlightPHP(generatedPHPCodeRaw.value)
})

const triggerCopy = () => {
  emit('copy', generatedPHPCodeRaw.value)
}
</script>

<template>
  <section id="view-schema-gen" class="view-panel active">
      <h1>Trình sinh mã nguồn (Code Generator)</h1>
      <p>Cấu hình bảng mục tiêu và thông tin các trường để sinh tự động mã nguồn PHP Class:</p>

      <div class="gen-layout">
          <!-- Left Config Form -->
          <div class="gen-sidebar">
              <div class="gen-form-group">
                  <label for="input-table">Bảng cơ sở dữ liệu đích:</label>
                  <select id="input-table" class="gen-form-control" v-model="tableName">
                      <option value="eamo_maintenance_plans">eamo_maintenance_plans</option>
                      <option value="eamo_maintenance_schedules">eamo_maintenance_schedules</option>
                      <option value="eamo_checklist_sessions">eamo_checklist_sessions</option>
                      <option value="eamo_equipment_error_logs">eamo_equipment_error_logs</option>
                      <option value="eamo_equipment_parameter_logs">eamo_equipment_parameter_logs</option>
                  </select>
              </div>

              <div class="gen-form-group">
                  <label for="input-class">Tên Class PHP:</label>
                  <input type="text" id="input-class" class="gen-form-control" v-model="className">
              </div>

              <div class="gen-form-group">
                  <label for="input-priority">Priority (Thứ tự ưu tiên):</label>
                  <input type="number" id="input-priority" class="gen-form-control" v-model.number="priorityVal">
              </div>

              <hr style="border: 0; border-top: 1px solid var(--border-muted); margin: 12px 0;">
              
              <div style="margin-bottom: 12px; display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size: 11px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Danh sách cột</span>
                  <button class="btn-secondary" style="padding: 4px 8px; margin-bottom: 0;" @click="addNewColumnToGenerator">+ Thêm cột</button>
              </div>

              <div id="gen-columns-list">
                  <div v-for="(col, idx) in colData" :key="idx" class="gen-column-item">
                      <div class="gen-column-header">
                          <span>CỘT ĐỊNH NGHĨA #{{ idx + 1 }}</span>
                          <button class="btn-remove" @click="removeColumnFromGenerator(idx)">XÓA</button>
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
                  <span id="ide-tab-label">{{ className || 'MyTableExtension' }}.php</span>
                  <button class="btn-copy" @click="triggerCopy">Copy PHP Class</button>
              </div>
              <pre class="code-content" id="output-generator-code" style="flex-grow:1; min-height:400px; min-width: 0; box-sizing: border-box;" v-html="generatedPHPCode"></pre>
          </div>
      </div>
  </section>
</template>
