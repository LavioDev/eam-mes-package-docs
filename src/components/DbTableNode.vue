<script setup lang="ts">
import { Handle, Position, type NodeProps } from '@vue-flow/core'

interface TableData {
  label: string
  module?: string
  columns: Array<{
    name: string
    type: string
    isPk?: boolean
    isFk?: boolean
    nullable?: boolean
  }>
}

defineProps<NodeProps<TableData>>()
</script>

<template>
  <div class="db-node-card">
    <!-- Anchor Handles for Multi-directional Routing -->
    <Handle type="target" :position="Position.Left" class="node-handle target-handle" />
    <Handle type="source" :position="Position.Right" class="node-handle source-handle" />
    <Handle type="target" :position="Position.Top" id="top-target" class="node-handle top-handle" />
    <Handle type="source" :position="Position.Bottom" id="bottom-source" class="node-handle bottom-handle" />

    <!-- Table Header (Minimalist Vben Style) -->
    <div class="db-node-header">
      <div class="db-node-title-row">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="db-node-icon">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
        <span class="db-node-name">{{ data.label }}</span>
      </div>
      <span v-if="data.module" class="db-node-tag">{{ data.module }}</span>
    </div>

    <!-- Table Columns List -->
    <div class="db-node-columns">
      <div 
        v-for="(col, idx) in data.columns" 
        :key="idx" 
        class="db-node-col-row"
        :class="{ 'is-pk': col.isPk, 'is-fk': col.isFk }"
      >
        <div class="col-left">
          <span v-if="col.isPk" class="key-badge pk">PK</span>
          <span v-else-if="col.isFk" class="key-badge fk">FK</span>
          <span v-else class="key-badge dot">•</span>
          <span class="col-name">{{ col.name }}</span>
        </div>
        <span class="col-type">{{ col.type }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.db-node-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-width: 270px;
  font-family: var(--font-sans, sans-serif);
  overflow: hidden;
  transition: all 0.15s ease;
}

.db-node-card:hover {
  box-shadow: 0 4px 14px rgba(9, 96, 189, 0.18);
  border-color: var(--color-accent);
}

.db-node-header {
  padding: 8px 12px;
  background-color: var(--bg-card-alt);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.db-node-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.db-node-icon {
  width: 13px;
  height: 13px;
  color: var(--color-accent);
  flex-shrink: 0;
}

.db-node-name {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-mono, monospace);
  letter-spacing: -0.01em;
}

.db-node-tag {
  font-size: 9px;
  font-weight: 600;
  color: var(--text-secondary);
  background-color: var(--bg-muted);
  padding: 1px 5px;
  border-radius: 3px;
  letter-spacing: 0.02em;
}

.db-node-columns {
  padding: 3px 0;
  background-color: var(--bg-card);
}

.db-node-col-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 12px;
  font-size: 11px;
  gap: 12px;
  border-bottom: 1px solid var(--border-subtle);
  transition: background-color 0.1s ease;
}

.db-node-col-row:last-child {
  border-bottom: none;
}

.db-node-col-row:hover {
  background-color: var(--bg-hover);
}

.col-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.key-badge {
  font-size: 8.5px;
  font-weight: 800;
  padding: 1px 4px;
  border-radius: 3px;
  font-family: var(--font-mono, monospace);
  min-width: 14px;
  text-align: center;
}

.key-badge.pk {
  background-color: rgba(217, 119, 6, 0.15);
  color: #f59e0b;
  border: 1px solid rgba(217, 119, 6, 0.3);
}

.key-badge.fk {
  background-color: var(--bg-muted);
  color: var(--color-accent);
  border: 1px solid var(--border-color);
}

.key-badge.dot {
  color: var(--text-dim);
  font-size: 12px;
}

.col-name {
  font-weight: 500;
  color: var(--text-secondary);
  font-family: var(--font-mono, monospace);
}

.is-pk .col-name {
  font-weight: 700;
  color: var(--text-primary);
}

.is-fk .col-name {
  font-weight: 600;
  color: var(--color-accent);
}

.col-type {
  font-size: 10px;
  color: var(--text-muted);
  font-family: var(--font-mono, monospace);
}

.node-handle {
  width: 8px;
  height: 8px;
  background-color: var(--color-accent);
  border: 2px solid var(--bg-card);
  border-radius: 50%;
  box-shadow: 0 0 0 1px var(--color-accent);
}
</style>
