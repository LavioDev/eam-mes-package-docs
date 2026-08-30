<script setup lang="ts">
import { ref, computed } from 'vue'
import { PlusOutlined, DeleteOutlined, CopyOutlined, CodeOutlined, SettingOutlined, CheckOutlined } from '@ant-design/icons-vue'
import { useLocale } from '../composables/useLocale'

const emit = defineEmits<{
  (e: 'copy-text', text: string): void
}>()

const { t, isEn } = useLocale()

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const tableName = ref('eamo_maintenance_plans')
const className = ref('MaintenancePlanExtension')
const priorityVal = ref(10)

const tableOptions = [
  { value: 'eamo_equipment', label: 'eamo_equipment' },
  { value: 'eamo_equipment_categories', label: 'eamo_equipment_categories' },
  { value: 'eamo_equipment_states', label: 'eamo_equipment_states' },
  { value: 'eamo_equipment_images', label: 'eamo_equipment_images' },
  { value: 'eamo_units', label: 'eamo_units' },
  { value: 'eamo_equipment_parameters', label: 'eamo_equipment_parameters' },
  { value: 'eamo_equipment_errors', label: 'eamo_equipment_errors' },
  { value: 'eamo_checklist_sessions', label: 'eamo_checklist_sessions' },
  { value: 'eamo_checklist_details', label: 'eamo_checklist_details' },
  { value: 'eamo_checklist_schedules', label: 'eamo_checklist_schedules' },
  { value: 'eamo_checklist_logs', label: 'eamo_checklist_logs' },
  { value: 'eamo_equipment_parameter_logs', label: 'eamo_equipment_parameter_logs' },
  { value: 'eamo_equipment_error_logs', label: 'eamo_equipment_error_logs' },
  { value: 'eamo_maintenance_categories', label: 'eamo_maintenance_categories' },
  { value: 'eamo_maintenance_items', label: 'eamo_maintenance_items' },
  { value: 'eamo_maintenance_plans', label: 'eamo_maintenance_plans' },
  { value: 'eamo_maintenance_schedules', label: 'eamo_maintenance_schedules' },
  { value: 'eamo_maintenance_schedule_user', label: 'eamo_maintenance_schedule_user' },
  { value: 'eamo_maintenance_logs', label: 'eamo_maintenance_logs' },
  { value: 'eamo_operating_times', label: 'eamo_operating_times' },
  { value: 'eamo_extension_requests', label: 'eamo_extension_requests' }
]

const typeOptions = [
  { value: 'string', label: 'string' },
  { value: 'integer', label: 'integer' },
  { value: 'boolean', label: 'boolean' },
  { value: 'text', label: 'text' },
  { value: 'decimal', label: 'decimal' },
  { value: 'json', label: 'json' },
  { value: 'timestamp', label: 'timestamp' }
]

interface Column {
  name: string;
  type: string;
  length: string;
  nullable: boolean;
  after: string;
}

const colData = ref<Column[]>([
  { name: 'department_id', type: 'string', length: '36', nullable: true, after: 'user_id' },
  { name: 'notes', type: 'text', length: '', nullable: true, after: 'department_id' }
])

const addNewColumnToGenerator = () => {
  const lastCol = colData.value[colData.value.length - 1]
  colData.value.push({
    name: 'custom_field_' + (colData.value.length + 1),
    type: 'string',
    length: '',
    nullable: true,
    after: lastCol ? lastCol.name : ''
  })
}

const removeColumnFromGenerator = (index: number) => {
  if (colData.value.length > 1) {
    colData.value.splice(index, 1)
  }
}

const generatedPHPCodeRaw = computed(() => {
  let colsMarkup = ''
  colData.value.forEach((col, idx) => {
    let code = `            ColumnDefinition::make('${col.name || 'custom_field'}', '${col.type}')`
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

declare(strict_types=1);

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
  html = html.replace(/\b(declare|strict_types|namespace|use|class|implements|public|function|return|string|array|int|bool)\b/g, '<span class="kw">$1</span>')
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
  emit('copy-text', generatedPHPCodeRaw.value)
}
</script>

<template>
  <section id="view-schema-gen" class="view-panel active">
    <div class="gen-header-row">
      <div>
        <h1>{{ t('schema.generator.title') }}</h1>
        <p class="subtitle-desc">{{ t('schema.generator.subtitle') }}</p>
      </div>

      <!-- Button open Modal -->
      <div class="header-action-group">
        <a-button type="primary" @click="openModal" class="btn-config-trigger">
          <template #icon><SettingOutlined /></template>
          {{ isEn ? `Configure Generator (${colData.length} columns)` : `Cấu hình Generator (${colData.length} cột)` }}
        </a-button>
      </div>
    </div>

    <!-- Full-Width IDE Code Box -->
    <div class="code-container full-width-editor">
      <div class="code-header">
        <div class="code-title">
          <CodeOutlined style="margin-right: 6px; color: var(--color-accent);" />
          <span>app/Extensions/{{ className || 'MyTableExtension' }}.php</span>
          <span class="table-badge-indicator">{{ tableName }}</span>
        </div>
        <div class="code-header-actions">
          <a-button size="small" type="default" @click="openModal" class="btn-edit-code">
            <template #icon><SettingOutlined /></template>
            {{ t('schema.generator.btnEditConfig') }}
          </a-button>
          <button type="button" class="btn-copy" @click="triggerCopy">
            <CopyOutlined style="margin-right: 4px;" />
            {{ t('schema.generator.btnCopyCode') }}
          </button>
        </div>
      </div>
      <pre class="code-content" v-html="generatedPHPCode"></pre>
    </div>

    <!-- Vben Minimalist White Modal (Width 1200px) -->
    <a-modal
      v-model:open="isModalOpen"
      :title="t('schema.generator.modalTitle')"
      width="1200px"
      :mask-closable="true"
      @ok="closeModal"
      @cancel="closeModal"
      class="vben-white-modal"
    >
      <template #footer>
        <a-button @click="closeModal">{{ t('schema.generator.modalClose') }}</a-button>
        <a-button type="primary" @click="closeModal">
          <template #icon><CheckOutlined /></template>
          {{ t('schema.generator.modalApply') }}
        </a-button>
      </template>

      <div class="modal-form-wrapper">
        <!-- Top General Config Row -->
        <a-row :gutter="16" class="top-config-row">
          <a-col :xs="24" :sm="8">
            <div class="field-item">
              <label class="field-label">{{ t('schema.generator.targetTable') }}</label>
              <a-select 
                v-model:value="tableName" 
                :options="tableOptions" 
                :placeholder="t('schema.generator.selectTargetTable')"
                style="width: 100%"
              />
            </div>
          </a-col>
          <a-col :xs="24" :sm="10">
            <div class="field-item">
              <label class="field-label">{{ t('schema.generator.className') }}</label>
              <a-input 
                v-model:value="className" 
                placeholder="MaintenancePlanExtension" 
              />
            </div>
          </a-col>
          <a-col :xs="24" :sm="6">
            <div class="field-item">
              <label class="field-label">{{ t('schema.generator.priority') }}</label>
              <a-input-number 
                v-model:value="priorityVal" 
                :min="1" 
                :max="999" 
                style="width: 100%" 
                placeholder="10" 
              />
            </div>
          </a-col>
        </a-row>

        <!-- Columns Section Header -->
        <div class="table-section-header">
          <div class="section-title-group">
            <span class="section-title">{{ t('schema.generator.columnsTitle') }}</span>
            <span class="column-count-tag">{{ isEn ? `${colData.length} columns` : `${colData.length} cột` }}</span>
          </div>
          <a-button type="primary" size="small" ghost @click="addNewColumnToGenerator">
            <template #icon><PlusOutlined /></template>
            {{ t('schema.generator.btnAddColumn') }}
          </a-button>
        </div>

        <!-- Clean Minimalist Table Grid for Columns -->
        <div class="columns-table-container">
          <table class="white-minimal-table">
            <thead>
              <tr>
                <th style="width: 44px; text-align: center;">{{ t('schema.generator.tableHeaders.index') }}</th>
                <th style="width: 28%;">{{ t('schema.generator.tableHeaders.name') }}</th>
                <th style="width: 18%;">{{ t('schema.generator.tableHeaders.type') }}</th>
                <th style="width: 16%;">{{ t('schema.generator.tableHeaders.length') }}</th>
                <th style="width: 18%;">{{ t('schema.generator.tableHeaders.after') }}</th>
                <th style="width: 12%; text-align: center;">{{ t('schema.generator.tableHeaders.nullable') }}</th>
                <th style="width: 50px; text-align: center;">{{ t('schema.generator.tableHeaders.delete') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(col, idx) in colData" :key="idx">
                <td class="index-cell">{{ idx + 1 }}</td>
                <td>
                  <a-input 
                    v-model:value="col.name" 
                    placeholder="vd: department_id" 
                  />
                </td>
                <td>
                  <a-select 
                    v-model:value="col.type" 
                    :options="typeOptions" 
                    style="width: 100%" 
                  />
                </td>
                <td>
                  <a-input 
                    v-model:value="col.length" 
                    placeholder="vd: 36" 
                  />
                </td>
                <td>
                  <a-input 
                    v-model:value="col.after" 
                    placeholder="vd: user_id" 
                  />
                </td>
                <td style="text-align: center;">
                  <a-checkbox v-model:checked="col.nullable" />
                </td>
                <td style="text-align: center;">
                  <a-button 
                    type="text" 
                    danger 
                    :disabled="colData.length === 1"
                    @click="removeColumnFromGenerator(idx)"
                    class="btn-row-delete"
                  >
                    <template #icon><DeleteOutlined /></template>
                  </a-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </a-modal>
  </section>
</template>

<style scoped>
.gen-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  gap: 16px;
}

.header-action-group {
  display: flex;
  gap: 10px;
}

.btn-config-trigger {
  height: 40px;
  font-weight: 600;
  border-radius: var(--radius);
}

.full-width-editor {
  margin-top: 10px;
  box-shadow: var(--shadow-card);
}

.code-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text-primary);
}

.table-badge-indicator {
  font-size: 11px;
  background-color: var(--bg-card-alt);
  color: var(--color-accent);
  border: 1px solid var(--border-color);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: var(--font-mono);
}

.code-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-edit-code {
  font-weight: 500;
  border-radius: var(--radius-sm);
}

/* Modal Form Styles */
.modal-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
}

.top-config-row {
  background-color: var(--bg-card-alt);
  border: 1px solid var(--border-color);
  padding: 16px 16px 8px;
  border-radius: var(--radius);
}

.field-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.table-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}

.section-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
}

.column-count-tag {
  font-size: 11px;
  background-color: var(--bg-muted);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  padding: 1px 7px;
  border-radius: 10px;
  font-weight: 600;
}

.columns-table-container {
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  overflow: hidden;
  max-height: 460px;
  overflow-y: auto;
}

.white-minimal-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
  margin: 0;
}

.white-minimal-table thead {
  background-color: var(--bg-card-alt);
  position: sticky;
  top: 0;
  z-index: 10;
}

.white-minimal-table th {
  padding: 10px 12px;
  font-weight: 650;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
  font-size: 12px;
  white-space: nowrap;
}

.white-minimal-table td {
  padding: 8px 10px;
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle;
}

.white-minimal-table tbody tr:hover {
  background-color: var(--bg-hover);
}

.white-minimal-table tbody tr:last-child td {
  border-bottom: none;
}

.index-cell {
  text-align: center;
  font-weight: 600;
  color: var(--text-muted);
  font-size: 12px;
}

.btn-row-delete {
  padding: 4px 8px;
}

@media (max-width: 768px) {
  .gen-header-row {
    flex-direction: column;
  }
}
</style>
