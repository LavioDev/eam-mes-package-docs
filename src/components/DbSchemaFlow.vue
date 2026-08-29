<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { VueFlow, useVueFlow, type Node, type Edge, MarkerType } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { useTheme } from '../composables/useTheme'
import DbTableNode from './DbTableNode.vue'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

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

// Schema Definitions with Generous Spacing & Minimalist Alignment
const schemaDefinitions: Record<string, { nodes: Node[], edges: Edge[] }> = {
  masterdata: {
    nodes: [
      {
        id: 'eamo_equipment_categories',
        type: 'table',
        position: { x: 40, y: 40 },
        data: {
          label: 'eamo_equipment_categories',
          module: 'Masterdata',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'company_id', type: 'UUID' },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'description', type: 'TEXT' }
          ]
        }
      },
      {
        id: 'eamo_equipment_statuses',
        type: 'table',
        position: { x: 40, y: 320 },
        data: {
          label: 'eamo_equipment_statuses',
          module: 'Masterdata',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'color', type: 'VARCHAR(20)' },
            { name: 'is_operational', type: 'BOOLEAN' }
          ]
        }
      },
      {
        id: 'eamo_equipment',
        type: 'table',
        position: { x: 380, y: 40 },
        data: {
          label: 'eamo_equipment',
          module: 'Core Model',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'name', type: 'VARCHAR(150)' },
            { name: 'model', type: 'VARCHAR(100)' },
            { name: 'serial_number', type: 'VARCHAR(100)' },
            { name: 'status_id', type: 'UUID', isFk: true },
            { name: 'category_id', type: 'UUID', isFk: true },
            { name: 'is_active', type: 'BOOLEAN' }
          ]
        }
      },
      {
        id: 'eamo_error_types',
        type: 'table',
        position: { x: 380, y: 360 },
        data: {
          label: 'eamo_error_types',
          module: 'Masterdata',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'severity_level', type: 'VARCHAR(20)' }
          ]
        }
      },
      {
        id: 'eamo_parameters',
        type: 'table',
        position: { x: 740, y: 40 },
        data: {
          label: 'eamo_parameters',
          module: 'Parameters',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'equipment_id', type: 'UUID', isFk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'unit_id', type: 'UUID', isFk: true },
            { name: 'min_value', type: 'DECIMAL' },
            { name: 'max_value', type: 'DECIMAL' }
          ]
        }
      },
      {
        id: 'eamo_units',
        type: 'table',
        position: { x: 1080, y: 40 },
        data: {
          label: 'eamo_units',
          module: 'Masterdata',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(20)' },
            { name: 'name', type: 'VARCHAR(50)' },
            { name: 'symbol', type: 'VARCHAR(10)' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-cat-equip',
        source: 'eamo_equipment_categories',
        target: 'eamo_equipment',
        label: '1 : N (category_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-stat-equip',
        source: 'eamo_equipment_statuses',
        target: 'eamo_equipment',
        label: '1 : N (status_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-equip-param',
        source: 'eamo_equipment',
        target: 'eamo_parameters',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-unit-param',
        source: 'eamo_units',
        target: 'eamo_parameters',
        label: '1 : N (unit_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.5 }
      }
    ]
  },

  checklist: {
    nodes: [
      {
        id: 'eamo_checklist_templates',
        type: 'table',
        position: { x: 40, y: 40 },
        data: {
          label: 'eamo_checklist_templates',
          module: 'Template',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'title', type: 'VARCHAR(150)' },
            { name: 'frequency_type', type: 'VARCHAR(20)' },
            { name: 'is_active', type: 'BOOLEAN' }
          ]
        }
      },
      {
        id: 'eamo_checklist_items',
        type: 'table',
        position: { x: 40, y: 340 },
        data: {
          label: 'eamo_checklist_items',
          module: 'Items',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'template_id', type: 'UUID', isFk: true },
            { name: 'title', type: 'VARCHAR(150)' },
            { name: 'input_type', type: 'VARCHAR(20)' },
            { name: 'order_index', type: 'INTEGER' }
          ]
        }
      },
      {
        id: 'eamo_checklist_schedules',
        type: 'table',
        position: { x: 420, y: 40 },
        data: {
          label: 'eamo_checklist_schedules',
          module: 'Schedule',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'template_id', type: 'UUID', isFk: true },
            { name: 'equipment_id', type: 'UUID', isFk: true },
            { name: 'planned_date', type: 'DATE' },
            { name: 'status', type: 'VARCHAR(20)' },
            { name: 'assigned_to', type: 'UUID', isFk: true }
          ]
        }
      },
      {
        id: 'eamo_checklist_sessions',
        type: 'table',
        position: { x: 800, y: 40 },
        data: {
          label: 'eamo_checklist_sessions',
          module: 'Session',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'schedule_id', type: 'UUID', isFk: true },
            { name: 'equipment_id', type: 'UUID', isFk: true },
            { name: 'inspector_id', type: 'UUID', isFk: true },
            { name: 'started_at', type: 'TIMESTAMP' },
            { name: 'completed_at', type: 'TIMESTAMP' },
            { name: 'overall_status', type: 'VARCHAR(20)' }
          ]
        }
      },
      {
        id: 'eamo_checklist_session_details',
        type: 'table',
        position: { x: 800, y: 340 },
        data: {
          label: 'eamo_checklist_session_details',
          module: 'Detail Log',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'session_id', type: 'UUID', isFk: true },
            { name: 'item_id', type: 'UUID', isFk: true },
            { name: 'result_value', type: 'VARCHAR(255)' },
            { name: 'is_passed', type: 'BOOLEAN' },
            { name: 'attachment_url', type: 'VARCHAR(255)' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-tpl-items',
        source: 'eamo_checklist_templates',
        target: 'eamo_checklist_items',
        label: '1 : N (template_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-tpl-sched',
        source: 'eamo_checklist_templates',
        target: 'eamo_checklist_schedules',
        label: '1 : N (template_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-sched-sess',
        source: 'eamo_checklist_schedules',
        target: 'eamo_checklist_sessions',
        label: '1 : N (schedule_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-sess-dtl',
        source: 'eamo_checklist_sessions',
        target: 'eamo_checklist_session_details',
        label: '1 : N (session_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-item-dtl',
        source: 'eamo_checklist_items',
        target: 'eamo_checklist_session_details',
        label: '1 : N (item_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.5 }
      }
    ]
  },

  maintenance: {
    nodes: [
      {
        id: 'eamo_maintenance_plans',
        type: 'table',
        position: { x: 40, y: 40 },
        data: {
          label: 'eamo_maintenance_plans',
          module: 'Plan',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'title', type: 'VARCHAR(150)' },
            { name: 'plan_type', type: 'VARCHAR(30)' },
            { name: 'trigger_type', type: 'VARCHAR(30)' },
            { name: 'interval_value', type: 'INTEGER' },
            { name: 'is_active', type: 'BOOLEAN' }
          ]
        }
      },
      {
        id: 'eamo_maintenance_plan_items',
        type: 'table',
        position: { x: 40, y: 360 },
        data: {
          label: 'eamo_maintenance_plan_items',
          module: 'Plan Items',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'plan_id', type: 'UUID', isFk: true },
            { name: 'task_name', type: 'VARCHAR(150)' },
            { name: 'estimated_minutes', type: 'INTEGER' },
            { name: 'order_index', type: 'INTEGER' }
          ]
        }
      },
      {
        id: 'eamo_maintenance_schedules',
        type: 'table',
        position: { x: 420, y: 40 },
        data: {
          label: 'eamo_maintenance_schedules',
          module: 'Schedule',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'plan_id', type: 'UUID', isFk: true },
            { name: 'equipment_id', type: 'UUID', isFk: true },
            { name: 'planned_start', type: 'TIMESTAMP' },
            { name: 'planned_end', type: 'TIMESTAMP' },
            { name: 'status', type: 'VARCHAR(30)' }
          ]
        }
      },
      {
        id: 'eamo_maintenance_orders',
        type: 'table',
        position: { x: 800, y: 40 },
        data: {
          label: 'eamo_maintenance_orders',
          module: 'Work Order',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'schedule_id', type: 'UUID', isFk: true },
            { name: 'equipment_id', type: 'UUID', isFk: true },
            { name: 'order_code', type: 'VARCHAR(50)' },
            { name: 'downtime_minutes', type: 'INTEGER' },
            { name: 'total_cost', type: 'DECIMAL' }
          ]
        }
      },
      {
        id: 'eamo_maintenance_order_details',
        type: 'table',
        position: { x: 800, y: 360 },
        data: {
          label: 'eamo_maintenance_order_details',
          module: 'Order Detail',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'order_id', type: 'UUID', isFk: true },
            { name: 'plan_item_id', type: 'UUID', isFk: true },
            { name: 'action_taken', type: 'TEXT' },
            { name: 'is_completed', type: 'BOOLEAN' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-plan-items',
        source: 'eamo_maintenance_plans',
        target: 'eamo_maintenance_plan_items',
        label: '1 : N (plan_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-plan-sched',
        source: 'eamo_maintenance_plans',
        target: 'eamo_maintenance_schedules',
        label: '1 : N (plan_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-sched-ord',
        source: 'eamo_maintenance_schedules',
        target: 'eamo_maintenance_orders',
        label: '1 : 1 (schedule_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-ord-dtl',
        source: 'eamo_maintenance_orders',
        target: 'eamo_maintenance_order_details',
        label: '1 : N (order_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-pitem-dtl',
        source: 'eamo_maintenance_plan_items',
        target: 'eamo_maintenance_order_details',
        label: '1 : N (plan_item_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.5 }
      }
    ]
  },

  error_monitoring: {
    nodes: [
      {
        id: 'eamo_equipment_ref',
        type: 'table',
        position: { x: 40, y: 40 },
        data: {
          label: 'eamo_equipment',
          module: 'Masterdata',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'name', type: 'VARCHAR(150)' }
          ]
        }
      },
      {
        id: 'eamo_error_types_ref',
        type: 'table',
        position: { x: 40, y: 300 },
        data: {
          label: 'eamo_error_types',
          module: 'Masterdata',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'severity_level', type: 'VARCHAR(20)' }
          ]
        }
      },
      {
        id: 'eamo_equipment_error_logs',
        type: 'table',
        position: { x: 420, y: 40 },
        data: {
          label: 'eamo_equipment_error_logs',
          module: 'Error Logs',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'equipment_id', type: 'UUID', isFk: true },
            { name: 'error_type_id', type: 'UUID', isFk: true },
            { name: 'reported_by', type: 'UUID', isFk: true },
            { name: 'occurred_at', type: 'TIMESTAMP' },
            { name: 'resolved_at', type: 'TIMESTAMP' },
            { name: 'downtime_minutes', type: 'INTEGER' },
            { name: 'status', type: 'VARCHAR(20)' }
          ]
        }
      },
      {
        id: 'eamo_equipment_runtime_metrics',
        type: 'table',
        position: { x: 800, y: 40 },
        data: {
          label: 'eamo_equipment_runtime_metrics',
          module: 'Metrics & KPI',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'equipment_id', type: 'UUID', isFk: true },
            { name: 'recorded_date', type: 'DATE' },
            { name: 'total_running_hours', type: 'DECIMAL' },
            { name: 'downtime_hours', type: 'DECIMAL' },
            { name: 'mtbf_hours', type: 'DECIMAL' },
            { name: 'mttr_hours', type: 'DECIMAL' },
            { name: 'availability_percent', type: 'DECIMAL' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-eq-err',
        source: 'eamo_equipment_ref',
        target: 'eamo_equipment_error_logs',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-type-err',
        source: 'eamo_error_types_ref',
        target: 'eamo_equipment_error_logs',
        label: '1 : N (error_type_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.5 }
      },
      {
        id: 'e-eq-metrics',
        source: 'eamo_equipment_ref',
        target: 'eamo_equipment_runtime_metrics',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      }
    ]
  },

  parameter_log: {
    nodes: [
      {
        id: 'eamo_equipment_param_ref',
        type: 'table',
        position: { x: 40, y: 40 },
        data: {
          label: 'eamo_equipment',
          module: 'Masterdata',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'name', type: 'VARCHAR(150)' }
          ]
        }
      },
      {
        id: 'eamo_units_ref',
        type: 'table',
        position: { x: 40, y: 280 },
        data: {
          label: 'eamo_units',
          module: 'Masterdata',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'code', type: 'VARCHAR(20)' },
            { name: 'symbol', type: 'VARCHAR(10)' }
          ]
        }
      },
      {
        id: 'eamo_parameters_ref',
        type: 'table',
        position: { x: 380, y: 40 },
        data: {
          label: 'eamo_parameters',
          module: 'Parameter Def',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'equipment_id', type: 'UUID', isFk: true },
            { name: 'code', type: 'VARCHAR(50)' },
            { name: 'name', type: 'VARCHAR(100)' },
            { name: 'unit_id', type: 'UUID', isFk: true }
          ]
        }
      },
      {
        id: 'eamo_equipment_parameter_logs',
        type: 'table',
        position: { x: 720, y: 40 },
        data: {
          label: 'eamo_equipment_parameter_logs',
          module: 'Timeseries Log',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'equipment_id', type: 'UUID', isFk: true },
            { name: 'parameter_id', type: 'UUID', isFk: true },
            { name: 'value_numeric', type: 'DECIMAL' },
            { name: 'is_abnormal', type: 'BOOLEAN' },
            { name: 'recorded_at', type: 'TIMESTAMP' }
          ]
        }
      },
      {
        id: 'eamo_parameter_alerts',
        type: 'table',
        position: { x: 1060, y: 40 },
        data: {
          label: 'eamo_parameter_alerts',
          module: 'Alerts',
          columns: [
            { name: 'id', type: 'UUID', isPk: true },
            { name: 'parameter_log_id', type: 'UUID', isFk: true },
            { name: 'alert_level', type: 'VARCHAR(20)' },
            { name: 'alert_message', type: 'TEXT' },
            { name: 'is_acknowledged', type: 'BOOLEAN' }
          ]
        }
      }
    ],
    edges: [
      {
        id: 'e-eq-plog',
        source: 'eamo_equipment_param_ref',
        target: 'eamo_parameters_ref',
        label: '1 : N (equipment_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-unit-param',
        source: 'eamo_units_ref',
        target: 'eamo_parameters_ref',
        label: '1 : N (unit_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#64748b', strokeWidth: 1.5 }
      },
      {
        id: 'e-param-plog',
        source: 'eamo_parameters_ref',
        target: 'eamo_equipment_parameter_logs',
        label: '1 : N (parameter_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
      },
      {
        id: 'e-plog-alert',
        source: 'eamo_equipment_parameter_logs',
        target: 'eamo_parameter_alerts',
        label: '1 : N (parameter_log_id)',
        type: 'smoothstep',
        markerEnd: MarkerType.ArrowClosed,
        style: { stroke: '#2563eb', strokeWidth: 1.5 }
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
    fitView({ padding: 0.25 })
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
    fitView({ padding: 0.25 })
  }, 50)
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
        <span>Sơ đồ ERD Cơ sở Dữ liệu</span>
      </div>

      <div class="toolbar-right-actions">
        <div class="toolbar-schema-pills">
          <button 
            type="button" 
            class="schema-pill-btn" 
            :class="{ active: activeSchema === 'masterdata' }"
            @click="handleSchemaChange('masterdata')"
          >
            Masterdata
          </button>
          <button 
            type="button" 
            class="schema-pill-btn" 
            :class="{ active: activeSchema === 'checklist' }"
            @click="handleSchemaChange('checklist')"
          >
            Checklist
          </button>
          <button 
            type="button" 
            class="schema-pill-btn" 
            :class="{ active: activeSchema === 'maintenance' }"
            @click="handleSchemaChange('maintenance')"
          >
            Maintenance
          </button>
          <button 
            type="button" 
            class="schema-pill-btn" 
            :class="{ active: activeSchema === 'error_monitoring' }"
            @click="handleSchemaChange('error_monitoring')"
          >
            Error Monitoring
          </button>
          <button 
            type="button" 
            class="schema-pill-btn" 
            :class="{ active: activeSchema === 'parameter_log' }"
            @click="handleSchemaChange('parameter_log')"
          >
            Parameter Log
          </button>
        </div>

        <button 
          type="button" 
          class="btn-fullscreen-toggle" 
          :class="{ active: isFullscreen }"
          @click="toggleFullscreen"
          :title="isFullscreen ? 'Thu nhỏ (Phím Esc)' : 'Xem toàn màn hình'"
        >
          <svg v-if="!isFullscreen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fs-icon">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="fs-icon">
            <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"></path>
          </svg>
          <span>{{ isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình' }}</span>
        </button>
      </div>
    </div>

    <!-- Vue Flow Canvas with Generous Dimensions -->
    <div class="vue-flow-wrapper">
      <VueFlow 
        :nodes="currentNodes" 
        :edges="currentEdges" 
        :fit-view-on-init="true"
        :min-zoom="0.3"
        :max-zoom="1.8"
        :default-viewport="{ zoom: 0.85, x: 20, y: 20 }"
        class="custom-vue-flow"
      >
        <template #node-table="nodeProps">
          <DbTableNode v-bind="nodeProps" />
        </template>
        <Background :gap="16" :pattern-color="isDark ? '#334155' : '#e5e7eb'" />
        <Controls />
      </VueFlow>
    </div>

    <!-- Minimalist Legend Footer -->
    <div class="flow-footer-legend">
      <div class="legend-item">
        <span class="legend-badge pk">PK</span>
        <span>Khóa chính (Primary Key)</span>
      </div>
      <div class="legend-item">
        <span class="legend-badge fk">FK</span>
        <span>Khóa ngoại (Foreign Key)</span>
      </div>
      <div class="legend-item">
        <span class="legend-line"></span>
        <span>Mối quan hệ liên kết</span>
      </div>
      <div class="legend-hint">
        Kéo thả bảng • Cuộn chuột để Zoom • Giữ chuột để Pan
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

.toolbar-schema-pills {
  display: flex;
  gap: 3px;
  background-color: var(--bg-muted);
  padding: 3px;
  border-radius: 4px;
}

.schema-pill-btn {
  background: none;
  border: none;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-sans);
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.12s ease;
}

.schema-pill-btn:hover {
  color: var(--color-accent);
}

.schema-pill-btn.active {
  background-color: var(--bg-card);
  color: var(--color-accent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
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
  height: 520px;
  width: 100%;
  position: relative;
  background-color: var(--bg-card);
}

.schema-flow-container.is-fullscreen .vue-flow-wrapper {
  flex-grow: 1;
  height: calc(100vh - 80px);
}

.custom-vue-flow {
  width: 100%;
  height: 100%;
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
