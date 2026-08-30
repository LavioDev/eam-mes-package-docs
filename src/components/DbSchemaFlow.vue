<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { VueFlow, useVueFlow, type Node, type Edge, MarkerType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { useTheme } from '../composables/useTheme'
import DbTableNode from './DbTableNode.vue'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

const { t } = useI18n()
const { isDark } = useTheme()

const props = withDefaults(defineProps<{
  schemaType?: 'masterdata' | 'checklist' | 'maintenance' | 'error_monitoring' | 'parameter_log'
}>(), {
  schemaType: 'masterdata'
})

const activeSchema = ref<string>(props.schemaType)

watch(() => props.schemaType, (newVal) => {
  if (newVal) {
    activeSchema.value = newVal
  }
})

// Schema Definitions with Generous Spacing, Clean Alignment, and No Line Overlaps
const schemaDefinitions: Record<string, { nodes: Node[], edges: Edge[] }> = {
  masterdata: {
    nodes: [
      {
        id: 'eamo_equipment_categories',
        type: 'table',
        position: { x: 50, y: 50 },
        data: {
          label: 'eamo_equipment_categories',
          module: 'Categories',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'code', type: 'VARCHAR(32)' },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_equipment_states',
        type: 'table',
        position: { x: 50, y: 340 },
        data: {
          label: 'eamo_equipment_states',
          module: 'Realtime State',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'state', type: 'VARCHAR(255)', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_equipment_errors',
        type: 'table',
        position: { x: 50, y: 580 },
        data: {
          label: 'eamo_equipment_errors',
          module: 'Error Catalog',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'reason', type: 'TEXT', nullable: true },
            { name: 'fix', type: 'TEXT', nullable: true },
            { name: 'protection_measures', type: 'TEXT', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_equipment',
        type: 'table',
        position: { x: 560, y: 50 },
        data: {
          label: 'eamo_equipment',
          module: 'Core Equipment',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'parent_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'code', type: 'VARCHAR(32)' },
            { name: 'equipment_category_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'name', type: 'VARCHAR(255)', nullable: true },
            { name: 'device_id', type: 'VARCHAR(36)', nullable: true },
            { name: 'maintenance_interval_hours', type: 'INT UNSIGNED', nullable: true },
            { name: 'last_maintenance', type: 'JSON', nullable: true },
            { name: 'is_active', type: 'BOOLEAN' },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_equipment_images',
        type: 'table',
        position: { x: 560, y: 500 },
        data: {
          label: 'eamo_equipment_images',
          module: 'Equipment Images',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'image_id', type: 'VARCHAR(36)' },
            { name: 'path', type: 'VARCHAR(255)', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_equipment_parameters',
        type: 'table',
        position: { x: 1080, y: 50 },
        data: {
          label: 'eamo_equipment_parameters',
          module: 'Standard Parameters',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'code', type: 'VARCHAR(32)' },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'equipment_category_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'product_category_id', type: 'VARCHAR(36)', nullable: true },
            { name: 'unit_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'standard', type: 'DECIMAL(19,4)', nullable: true },
            { name: 'standard_min', type: 'DECIMAL(19,4)', nullable: true },
            { name: 'standard_max', type: 'DECIMAL(19,4)', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_units',
        type: 'table',
        position: { x: 1080, y: 500 },
        data: {
          label: 'eamo_units',
          module: 'Units of Measure',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'code', type: 'VARCHAR(32)' },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'description', type: 'VARCHAR(255)', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-cat-equip',
        source: 'eamo_equipment_categories',
        target: 'eamo_equipment',
        label: '1 : N (equipment_category_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-equip-state',
        source: 'eamo_equipment',
        target: 'eamo_equipment_states',
        label: '1 : 1 (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-equip-img',
        source: 'eamo_equipment',
        target: 'eamo_equipment_images',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-equip-param',
        source: 'eamo_equipment',
        target: 'eamo_equipment_parameters',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-unit-param',
        source: 'eamo_units',
        target: 'eamo_equipment_parameters',
        label: '1 : N (unit_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.6 }
      }
    ]
  },

  checklist: {
    nodes: [
      {
        id: 'eamo_equipment_chk_ref',
        type: 'table',
        position: { x: 50, y: 50 },
        data: {
          label: 'eamo_equipment',
          module: 'Masterdata Ref',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'code', type: 'VARCHAR(32)' },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'is_active', type: 'BOOLEAN' }
          ]
        }
      },
      {
        id: 'users_chk_ref',
        type: 'table',
        position: { x: 50, y: 360 },
        data: {
          label: 'users',
          module: 'Auth Model Ref',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'email', type: 'VARCHAR(255)' }
          ]
        }
      },
      {
        id: 'eamo_checklist_sessions',
        type: 'table',
        position: { x: 540, y: 50 },
        data: {
          label: 'eamo_checklist_sessions',
          module: 'Checklist Session',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'session_date', type: 'DATETIME', nullable: true },
            { name: 'user_id', type: 'UUID', isFk: true, nullable: true },
            { name: 'cycle_type', type: 'VARCHAR(255)', nullable: true },
            { name: 'cycle_interval', type: 'INT', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_checklist_details',
        type: 'table',
        position: { x: 540, y: 440 },
        data: {
          label: 'eamo_checklist_details',
          module: 'Checklist Detail',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'checklist_id', type: 'VARCHAR(36)' },
            { name: 'session_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'description', type: 'VARCHAR(255)', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_checklist_schedules',
        type: 'table',
        position: { x: 1040, y: 50 },
        data: {
          label: 'eamo_checklist_schedules',
          module: 'Schedule Generator',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'checklist_session_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'checklist_detail_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'user_id', type: 'UUID', isFk: true, nullable: true },
            { name: 'date', type: 'DATE' },
            { name: 'is_rescheduled', type: 'BOOLEAN' },
            { name: 'original_date', type: 'DATE', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_checklist_logs',
        type: 'table',
        position: { x: 1540, y: 50 },
        data: {
          label: 'eamo_checklist_logs',
          module: 'Execution Log',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'checklist_schedule_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'user_id', type: 'UUID', isFk: true, nullable: true },
            { name: 'result', type: "ENUM('pass','fail')" },
            { name: 'status', type: "ENUM('pending','completed')" },
            { name: 'checked_at', type: 'TIMESTAMP', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-eq-sess',
        source: 'eamo_equipment_chk_ref',
        target: 'eamo_checklist_sessions',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-usr-sess',
        source: 'users_chk_ref',
        target: 'eamo_checklist_sessions',
        label: '1 : N (user_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.6 }
      },
      {
        id: 'e-sess-dtl',
        source: 'eamo_checklist_sessions',
        target: 'eamo_checklist_details',
        label: '1 : N (session_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-sess-sched',
        source: 'eamo_checklist_sessions',
        target: 'eamo_checklist_schedules',
        label: '1 : N (checklist_session_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-dtl-sched',
        source: 'eamo_checklist_details',
        target: 'eamo_checklist_schedules',
        label: '1 : N (checklist_detail_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-sched-log',
        source: 'eamo_checklist_schedules',
        target: 'eamo_checklist_logs',
        label: '1 : N (checklist_schedule_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      }
    ]
  },

  maintenance: {
    nodes: [
      {
        id: 'eamo_maintenance_categories',
        type: 'table',
        position: { x: 50, y: 50 },
        data: {
          label: 'eamo_maintenance_categories',
          module: 'Categories',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'description', type: 'VARCHAR(255)', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_maintenance_items',
        type: 'table',
        position: { x: 50, y: 380 },
        data: {
          label: 'eamo_maintenance_items',
          module: 'Items',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'maintenance_category_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'description', type: 'VARCHAR(255)', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_maintenance_plans',
        type: 'table',
        position: { x: 540, y: 50 },
        data: {
          label: 'eamo_maintenance_plans',
          module: 'Plans',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'plan_code', type: 'VARCHAR(255)' },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'maintenance_category_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'maintenance_type', type: 'VARCHAR(255)' },
            { name: 'user_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'start_time', type: 'TIME', nullable: true },
            { name: 'end_time', type: 'TIME', nullable: true },
            { name: 'actual_start_time', type: 'TIME', nullable: true },
            { name: 'actual_end_time', type: 'TIME', nullable: true },
            { name: 'date', type: 'DATE', nullable: true },
            { name: 'cycle_type', type: 'VARCHAR(255)', nullable: true },
            { name: 'cycle_interval', type: 'INT', nullable: true },
            { name: 'notes', type: 'TEXT', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_maintenance_schedules',
        type: 'table',
        position: { x: 1040, y: 50 },
        data: {
          label: 'eamo_maintenance_schedules',
          module: 'Schedules',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'equipment_id', type: 'VARCHAR(255)', isFk: true },
            { name: 'maintenance_plan_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'maintenance_item_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'date', type: 'DATE' },
            { name: 'is_rescheduled', type: 'BOOLEAN' },
            { name: 'original_date', type: 'DATE', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_maintenance_schedule_user',
        type: 'table',
        position: { x: 1040, y: 440 },
        data: {
          label: 'eamo_maintenance_schedule_user',
          module: 'Pivot User Assigned',
          columns: [
            { name: 'maintenance_schedule_id', type: 'VARCHAR(36)', isPk: true, isFk: true },
            { name: 'user_id', type: 'UUID', isPk: true, isFk: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' },
            { name: 'deleted_at', type: 'TIMESTAMP', nullable: true }
          ]
        }
      },
      {
        id: 'eamo_maintenance_logs',
        type: 'table',
        position: { x: 1540, y: 50 },
        data: {
          label: 'eamo_maintenance_logs',
          module: 'Execution Log',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'maintenance_schedule_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'log_date', type: 'DATE' },
            { name: 'result', type: 'VARCHAR(255)' },
            { name: 'note', type: 'VARCHAR(255)', nullable: true },
            { name: 'type', type: 'VARCHAR(36)', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-cat-items',
        source: 'eamo_maintenance_categories',
        target: 'eamo_maintenance_items',
        label: '1 : N (maintenance_category_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-cat-plans',
        source: 'eamo_maintenance_categories',
        target: 'eamo_maintenance_plans',
        label: '1 : N (maintenance_category_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.6 }
      },
      {
        id: 'e-plans-sched',
        source: 'eamo_maintenance_plans',
        target: 'eamo_maintenance_schedules',
        label: '1 : N (maintenance_plan_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-items-sched',
        source: 'eamo_maintenance_items',
        target: 'eamo_maintenance_schedules',
        label: '1 : N (maintenance_item_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.6 }
      },
      {
        id: 'e-sched-user',
        source: 'eamo_maintenance_schedules',
        target: 'eamo_maintenance_schedule_user',
        label: '1 : N (maintenance_schedule_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-sched-logs',
        source: 'eamo_maintenance_schedules',
        target: 'eamo_maintenance_logs',
        label: '1 : N (maintenance_schedule_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      }
    ]
  },

  error_monitoring: {
    nodes: [
      {
        id: 'eamo_equipment_err_ref',
        type: 'table',
        position: { x: 50, y: 50 },
        data: {
          label: 'eamo_equipment',
          module: 'Masterdata Ref',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'code', type: 'VARCHAR(32)' },
            { name: 'name', type: 'VARCHAR(255)' }
          ]
        }
      },
      {
        id: 'eamo_equipment_errors_ref',
        type: 'table',
        position: { x: 50, y: 300 },
        data: {
          label: 'eamo_equipment_errors',
          module: 'Catalog Ref',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'reason', type: 'TEXT', nullable: true },
            { name: 'fix', type: 'TEXT', nullable: true },
            { name: 'protection_measures', type: 'TEXT', nullable: true }
          ]
        }
      },
      {
        id: 'users_err_ref',
        type: 'table',
        position: { x: 50, y: 560 },
        data: {
          label: 'users',
          module: 'Auth Handler Ref',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'email', type: 'VARCHAR(255)' }
          ]
        }
      },
      {
        id: 'eamo_equipment_error_logs',
        type: 'table',
        position: { x: 560, y: 50 },
        data: {
          label: 'eamo_equipment_error_logs',
          module: 'Error Logs',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'equipment_error_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'occurred_at', type: 'DATETIME', nullable: true },
            { name: 'restarted_at', type: 'DATETIME', nullable: true },
            { name: 'handled_at', type: 'DATETIME', nullable: true },
            { name: 'handler_id', type: 'VARCHAR(255)', isFk: true, nullable: true },
            { name: 'created_at', type: 'TIMESTAMP', nullable: true },
            { name: 'updated_at', type: 'TIMESTAMP', nullable: true }
          ]
        }
      },
      {
        id: 'eamo_operating_times',
        type: 'table',
        position: { x: 560, y: 460 },
        data: {
          label: 'eamo_operating_times',
          module: 'Operating Times & OEE',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'equipment_name', type: 'VARCHAR(255)', nullable: true },
            { name: 'working_time', type: 'DECIMAL(10,4)' },
            { name: 'planned_stop_time', type: 'DECIMAL(10,4)' },
            { name: 'unplanned_stop_time', type: 'DECIMAL(10,4)' },
            { name: 'planned_operating_time', type: 'DECIMAL(10,4)' },
            { name: 'actual_operating_time', type: 'DECIMAL(10,4)' },
            { name: 'availability_factor', type: 'DECIMAL(5,2)' },
            { name: 'start_time', type: 'TIMESTAMP' },
            { name: 'end_time', type: 'TIMESTAMP' },
            { name: 'date', type: 'DATE', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-eq-errlog',
        source: 'eamo_equipment_err_ref',
        target: 'eamo_equipment_error_logs',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-err-errlog',
        source: 'eamo_equipment_errors_ref',
        target: 'eamo_equipment_error_logs',
        label: '1 : N (equipment_error_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-usr-errlog',
        source: 'users_err_ref',
        target: 'eamo_equipment_error_logs',
        label: '1 : N (handler_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.6 }
      },
      {
        id: 'e-eq-optime',
        source: 'eamo_equipment_err_ref',
        target: 'eamo_operating_times',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      }
    ]
  },

  parameter_log: {
    nodes: [
      {
        id: 'eamo_equipment_param_ref',
        type: 'table',
        position: { x: 50, y: 50 },
        data: {
          label: 'eamo_equipment',
          module: 'Masterdata Ref',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'code', type: 'VARCHAR(32)' },
            { name: 'name', type: 'VARCHAR(255)' }
          ]
        }
      },
      {
        id: 'eamo_units_ref',
        type: 'table',
        position: { x: 50, y: 300 },
        data: {
          label: 'eamo_units',
          module: 'Units Ref',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'code', type: 'VARCHAR(32)' },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'description', type: 'VARCHAR(255)', nullable: true }
          ]
        }
      },
      {
        id: 'eamo_equipment_parameters',
        type: 'table',
        position: { x: 540, y: 50 },
        data: {
          label: 'eamo_equipment_parameters',
          module: 'Parameters Def',
          columns: [
            { name: 'id', type: 'VARCHAR(36)', isPk: true },
            { name: 'code', type: 'VARCHAR(32)' },
            { name: 'name', type: 'VARCHAR(255)' },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'equipment_category_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'product_category_id', type: 'VARCHAR(36)', nullable: true },
            { name: 'unit_id', type: 'VARCHAR(36)', isFk: true, nullable: true },
            { name: 'standard', type: 'DECIMAL(19,4)', nullable: true },
            { name: 'standard_min', type: 'DECIMAL(19,4)', nullable: true },
            { name: 'standard_max', type: 'DECIMAL(19,4)', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_equipment_parameter_logs',
        type: 'table',
        position: { x: 1040, y: 50 },
        data: {
          label: 'eamo_equipment_parameter_logs',
          module: 'Parameter Logs',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'equipment_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'equipment_parameter_id', type: 'VARCHAR(36)', isFk: true },
            { name: 'unit_id', type: 'VARCHAR(36)', nullable: true },
            { name: 'value', type: 'VARCHAR(36)', nullable: true },
            { name: 'user_id', type: 'UUID', nullable: true },
            { name: 'recorded_at', type: 'TIMESTAMP', nullable: true },
            { name: 'created_at', type: 'TIMESTAMP' },
            { name: 'updated_at', type: 'TIMESTAMP' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-eq-param',
        source: 'eamo_equipment_param_ref',
        target: 'eamo_equipment_parameters',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      },
      {
        id: 'e-unit-param',
        source: 'eamo_units_ref',
        target: 'eamo_equipment_parameters',
        label: '1 : N (unit_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.6 }
      },
      {
        id: 'e-param-plog',
        source: 'eamo_equipment_parameters',
        target: 'eamo_equipment_parameter_logs',
        label: '1 : N (equipment_parameter_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#3b82f6', strokeWidth: 1.6 }
      }
    ]
  }
}

const currentNodes = computed<Node[]>(() => {
  const schema = schemaDefinitions[activeSchema.value] || schemaDefinitions['masterdata']
  return schema ? schema.nodes : []
})

const currentEdges = computed<Edge[]>(() => {
  const schema = schemaDefinitions[activeSchema.value] || schemaDefinitions['masterdata']
  return schema ? schema.edges : []
})

const { fitView } = useVueFlow()

const isFullscreen = ref(false)

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isFullscreen.value ? 'hidden' : ''
  }
  setTimeout(() => {
    fitView({ padding: 0.2 })
  }, 100)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen()
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}

const handleSchemaChange = (schema: string) => {
  activeSchema.value = schema
  setTimeout(() => {
    fitView({ padding: 0.2 })
  }, 60)
}
</script>

<template>
  <div class="schema-flow-container" :class="{ 'is-fullscreen': isFullscreen }">
    <!-- Top Bar with Schema Selector & View Controls (Minimalist Vben Style) -->
    <div class="flow-toolbar">
      <div class="toolbar-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="title-icon">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
        <span>{{ t('database.erd.title') }}</span>
      </div>

      <div class="toolbar-right-actions">
        <button 
          type="button" 
          class="btn-fullscreen-toggle" 
          :class="{ active: isFullscreen }"
          @click="toggleFullscreen"
          :title="isFullscreen ? t('database.erd.exitFullscreenTitle') : t('database.erd.fullscreenTitle')"
        >
          <svg v-if="!isFullscreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fs-icon">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fs-icon">
            <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"></path>
          </svg>
          <span>{{ isFullscreen ? t('database.erd.exitFullscreen') : t('database.erd.fullscreen') }}</span>
        </button>
      </div>
    </div>

    <!-- Vue Flow Canvas with Generous Dimensions -->
    <div class="vue-flow-wrapper">
      <VueFlow 
        :nodes="currentNodes" 
        :edges="currentEdges" 
        :fit-view-on-init="true"
        :min-zoom="0.25"
        :max-zoom="1.8"
        :default-viewport="{ zoom: 0.78, x: 30, y: 30 }"
        class="custom-vue-flow"
      >
        <template #node-table="nodeProps">
          <DbTableNode v-bind="nodeProps" />
        </template>
        <Background 
          :gap="20" 
          :size="1.5" 
          :pattern-color="isDark ? 'rgba(96, 165, 250, 0.3)' : 'rgba(100, 116, 139, 0.45)'" 
        />
        <Controls />
      </VueFlow>
    </div>

    <!-- Minimalist Legend Footer -->
    <div class="flow-footer-legend">
      <div class="legend-item">
        <span class="legend-badge pk">PK</span>
        <span>{{ t('database.erd.pk') }}</span>
      </div>
      <div class="legend-item">
        <span class="legend-badge fk">FK</span>
        <span>{{ t('database.erd.fk') }}</span>
      </div>
      <div class="legend-item">
        <span class="legend-line"></span>
        <span>{{ t('database.erd.relationship') }}</span>
      </div>
      <div class="legend-hint">
        {{ t('database.erd.hint') }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.schema-flow-container {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg, 8px);
  background-color: var(--bg-card);
  margin: 18px 0 24px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.schema-flow-container.is-fullscreen {
  position: fixed;
  inset: 0;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  margin: 0;
  border: none;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-card);
}

.flow-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 14px;
  background-color: var(--bg-card-alt);
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap;
  gap: 8px;
}

.toolbar-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--text-primary);
}

.title-icon {
  width: 14px;
  height: 14px;
  color: var(--color-accent);
}

.toolbar-right-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-fullscreen-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 4px 9px;
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-sans);
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.12s ease;
}

.btn-fullscreen-toggle:hover {
  color: var(--color-accent);
  border-color: var(--border-hover);
  background-color: var(--bg-hover);
}

.btn-fullscreen-toggle.active {
  background-color: var(--bg-card);
  color: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.fs-icon {
  width: 13px;
  height: 13px;
}

.vue-flow-wrapper {
  height: 640px;
  width: 100%;
  position: relative;
  background-color: var(--bg-card-alt);
}

.schema-flow-container.is-fullscreen .vue-flow-wrapper {
  flex-grow: 1;
  height: calc(100vh - 80px);
}

.custom-vue-flow {
  width: 100%;
  height: 100%;
}

/* High-Visibility Custom Cursors for Canvas Drag / Pan */
:deep(.vue-flow__pane) {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 26 26'%3E%3Cfilter id='s' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='1' stdDeviation='1.2' flood-color='%23000000' flood-opacity='0.6'/%3E%3C/filter%3E%3Cpath filter='url(%23s)' fill='%232563eb' stroke='%23ffffff' stroke-width='1.5' stroke-linejoin='round' d='M10 3a1.5 1.5 0 0 1 3 0v6h1V1.5a1.5 1.5 0 1 1 3 0v7.5h1V3a1.5 1.5 0 1 1 3 0v9c0 4.5-3.5 8-8 8s-8-3.5-8-8V6a1.5 1.5 0 1 1 3 0v3h1V3z'/%3E%3C/svg%3E") 13 13, grab !important;
}

:deep(.vue-flow__pane.dragging),
:deep(.vue-flow__pane:active) {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 26 26'%3E%3Cfilter id='s' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='1' stdDeviation='1.2' flood-color='%23000000' flood-opacity='0.6'/%3E%3C/filter%3E%3Cpath filter='url(%23s)' fill='%230ea5e9' stroke='%23ffffff' stroke-width='1.5' stroke-linejoin='round' d='M9 6a1.5 1.5 0 0 1 3 0v3h1V6a1.5 1.5 0 1 1 3 0v3h1V7a1.5 1.5 0 1 1 3 0v5.5c0 4.5-3.5 8-8 8s-8-3.5-8-8V8a1.5 1.5 0 1 1 3 0v1h1V6z'/%3E%3C/svg%3E") 13 13, grabbing !important;
}

:deep(.vue-flow__node) {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 26 26'%3E%3Cfilter id='s' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeDropShadow dx='0' dy='1' stdDeviation='1.2' flood-color='%23000000' flood-opacity='0.6'/%3E%3C/filter%3E%3Cpath filter='url(%23s)' fill='%232563eb' stroke='%23ffffff' stroke-width='1.5' stroke-linejoin='round' d='M13 2l3.5 3.5h-2.5v5h5V8l3.5 3.5-3.5 3.5v-2.5h-5v5h2.5L13 21l-3.5-3.5h2.5v-5h-5v2.5L3.5 11.5 7 8v2.5h5v-5H9.5L13 2z'/%3E%3C/svg%3E") 13 13, move !important;
}

.flow-footer-legend {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 6px 14px;
  background-color: var(--bg-card-alt);
  border-top: 1px solid var(--border-color);
  font-size: 11px;
  color: var(--text-secondary);
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-badge {
  font-size: 8.5px;
  font-weight: 800;
  padding: 1px 4px;
  border-radius: 3px;
  font-family: var(--font-mono, monospace);
}

.legend-badge.pk {
  background-color: rgba(217, 119, 6, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(217, 119, 6, 0.3);
}

.legend-badge.fk {
  background-color: var(--bg-muted);
  color: var(--color-accent);
  border: 1px solid var(--border-color);
}

.legend-line {
  width: 14px;
  height: 2px;
  background-color: var(--color-accent);
  display: inline-block;
}

.legend-hint {
  margin-left: auto;
  font-size: 10.5px;
  color: var(--text-muted);
}

/* Vue Flow Controls Dark/Light Theme Integration */
:deep(.vue-flow__controls) {
  background-color: var(--bg-card) !important;
  border: 1px solid var(--border-color) !important;
  border-radius: 6px !important;
  box-shadow: var(--shadow-md) !important;
  overflow: hidden;
}

:deep(.vue-flow__controls-button) {
  background-color: var(--bg-card) !important;
  border-bottom: 1px solid var(--border-color) !important;
  color: var(--text-secondary) !important;
  fill: var(--text-secondary) !important;
  transition: all 0.15s ease;
}

:deep(.vue-flow__controls-button:last-child) {
  border-bottom: none !important;
}

:deep(.vue-flow__controls-button svg) {
  fill: var(--text-secondary) !important;
}

:deep(.vue-flow__controls-button:hover) {
  background-color: var(--bg-hover) !important;
  color: var(--color-accent) !important;
}

:deep(.vue-flow__controls-button:hover svg) {
  fill: var(--color-accent) !important;
}

/* Vue Flow Edge Labels Dark/Light Theme Integration */
:deep(.vue-flow__edge-textbg) {
  fill: var(--bg-card) !important;
  stroke: var(--border-color) !important;
  stroke-width: 1px !important;
  rx: 4px;
  ry: 4px;
}

:deep(.vue-flow__edge-text) {
  fill: var(--text-secondary) !important;
  font-family: var(--font-mono, monospace) !important;
  font-size: 10.5px !important;
  font-weight: 600 !important;
}

@media (max-width: 768px) {
  .legend-hint {
    margin-left: 0;
    width: 100%;
  }
}
</style>
