<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

defineProps<{
  copySnippet?: (id: string) => void
}>()

const { t, isEn } = useLocale()

const copySnippetInternal = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return
  const text = element.innerText
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <section id="view-schema-api" class="view-panel active">
    <h1>{{ t('schema.apiView.title') }}</h1>
    <p>{{ t('schema.apiView.subtitle') }}</p>

    <h2>{{ t('schema.apiView.asyncTitle') }}</h2>
    <p>{{ t('schema.apiView.asyncDesc') }}</p>

    <!-- Clean 2-Phase Process Pipeline Component -->
    <div class="process-pipeline-container">
      <div class="pipeline-header">
        <div class="pipeline-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="pipeline-icon">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span>{{ t('schema.apiView.pipelineTitle') }}</span>
        </div>
      </div>

      <div class="pipeline-steps-grid">
        <!-- Giai đoạn 1: HTTP API Request -->
        <div class="pipeline-step-card">
          <div class="step-card-header">
            <div class="step-badge-num">1</div>
            <div class="step-title-group">
              <div class="step-name">{{ t('schema.apiView.step1Name') }}</div>
              <div class="step-sub">{{ t('schema.apiView.step1Sub') }}</div>
            </div>
            <span class="step-timing-tag">{{ t('schema.apiView.step1Timing') }}</span>
          </div>

          <div class="step-actions-list">
            <div class="step-action-item">
              <span class="action-bullet">•</span>
              <span class="action-text" v-if="!isEn">Validate định dạng mảng <code>columns</code> và kiểm tra trùng lặp.</span>
              <span class="action-text" v-else>Validate <code>columns</code> array structure and check for duplicates.</span>
            </div>
            <div class="step-action-item">
              <span class="action-bullet">•</span>
              <span class="action-text" v-if="!isEn">Ghi nhận bản ghi trạng thái <code>queued</code> vào <code>eamo_extension_requests</code>.</span>
              <span class="action-text" v-else>Record a <code>queued</code> status record into <code>eamo_extension_requests</code>.</span>
            </div>
            <div class="step-action-item">
              <span class="action-bullet">•</span>
              <span class="action-text" v-if="!isEn">Dispatch Job <code>GenerateExtensionMigrationJob</code> vào hàng đợi.</span>
              <span class="action-text" v-else>Dispatch <code>GenerateExtensionMigrationJob</code> to the queue.</span>
            </div>
            <div class="step-action-item action-highlight">
              <span class="action-bullet">➔</span>
              <span class="action-text" v-if="!isEn">Trả về HTTP <code>202 Accepted</code> kèm <code>id</code> và <code>check_url</code>.</span>
              <span class="action-text" v-else>Return HTTP <code>202 Accepted</code> with <code>id</code> and <code>check_url</code>.</span>
            </div>
          </div>
        </div>

        <!-- Giai đoạn 2: Queue Worker -->
        <div class="pipeline-step-card">
          <div class="step-card-header">
            <div class="step-badge-num">2</div>
            <div class="step-title-group">
              <div class="step-name">{{ t('schema.apiView.step2Name') }}</div>
              <div class="step-sub">{{ t('schema.apiView.step2Sub') }}</div>
            </div>
            <span class="step-timing-tag">{{ t('schema.apiView.step2Timing') }}</span>
          </div>

          <div class="step-actions-list">
            <div class="step-action-item">
              <span class="action-bullet">•</span>
              <span class="action-text" v-if="!isEn">Worker nhận Job từ queue <code>eam-extensions</code>, chuyển trạng thái sang <code>processing</code>.</span>
              <span class="action-text" v-else>Worker receives Job from queue <code>eam-extensions</code>, changes status to <code>processing</code>.</span>
            </div>
            <div class="step-action-item">
              <span class="action-bullet">•</span>
              <span class="action-text" v-if="!isEn">Tự động sinh file PHP migration vật lý trong thư mục <code>database/migrations/</code>.</span>
              <span class="action-text" v-else>Automatically generates physical PHP migration file in <code>database/migrations/</code>.</span>
            </div>
            <div class="step-action-item">
              <span class="action-bullet">•</span>
              <span class="action-text" v-if="!isEn">Gọi <code>Artisan::call('migrate --force')</code> để thêm cột vào DB.</span>
              <span class="action-text" v-else>Executes <code>Artisan::call('migrate --force')</code> to apply alterations to DB.</span>
            </div>
            <div class="step-action-item action-highlight">
              <span class="action-bullet">➔</span>
              <span class="action-text" v-if="!isEn">Cập nhật trạng thái thành <code>done</code> hoặc ghi log lỗi <code>failed</code>.</span>
              <span class="action-text" v-else>Updates status to <code>done</code> or logs error with <code>failed</code>.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h2>{{ t('schema.apiView.logTableTitle') }}</h2>
    <p>{{ t('schema.apiView.logTableDesc') }}</p>
    <div class="code-container">
      <div class="code-header">
        <span>Bash</span>
        <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-core-ext') : copySnippetInternal('code-publish-core-ext')">{{ t('common.copy') }}</button>
      </div>
      <pre class="code-content" id="code-publish-core-ext"><span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=core</span>
<span class="kw">php artisan</span> <span class="str">migrate</span></pre>
    </div>
    <div class="code-container" style="margin-top: 16px;">
      <div class="code-header">
        <span>Schema: eamo_extension_requests</span>
      </div>
      <pre class="code-content"><span class="kw">Schema</span>::<span class="fn">create</span>(<span class="str">'eamo_extension_requests'</span>, <span class="kw">function</span> (<span class="cls">Blueprint</span> <span class="var">$table</span>) {
    <span class="var">$table</span>-&gt;<span class="fn">id</span>();
    <span class="var">$table</span>-&gt;<span class="fn">string</span>(<span class="str">'table_name'</span>);
    <span class="var">$table</span>-&gt;<span class="fn">json</span>(<span class="str">'columns'</span>);                    <span class="cmt">// {{ isEn ? 'ColumnDefinition structured array' : 'Mảng ColumnDefinition đã định nghĩa' }}</span>
    <span class="var">$table</span>-&gt;<span class="fn">string</span>(<span class="str">'migration_file'</span>)-&gt;<span class="fn">nullable</span>(); <span class="cmt">// {{ isEn ? 'Generated migration file name' : 'Tên file migration được sinh ra' }}</span>
    <span class="var">$table</span>-&gt;<span class="fn">enum</span>(<span class="str">'status'</span>, [
        <span class="str">'queued'</span>,       <span class="cmt">// {{ isEn ? 'Waiting in background queue' : 'Đang chờ trong hàng đợi' }}</span>
        <span class="str">'processing'</span>,   <span class="cmt">// {{ isEn ? 'Generating file and running migrate' : 'Đang tiến hành tạo file và chạy migrate' }}</span>
        <span class="str">'done'</span>,         <span class="cmt">// {{ isEn ? 'Migration completed successfully' : 'Đã hoàn thành migrate thành công' }}</span>
        <span class="str">'failed'</span>        <span class="cmt">// {{ isEn ? 'Encountered execution error' : 'Gặp lỗi trong quá trình thực thi' }}</span>
    ])-&gt;<span class="fn">default</span>(<span class="str">'queued'</span>);
    <span class="var">$table</span>-&gt;<span class="fn">text</span>(<span class="str">'error_message'</span>)-&gt;<span class="fn">nullable</span>();     <span class="cmt">// {{ isEn ? 'Error details if status is failed' : 'Nội dung lỗi nếu status là failed' }}</span>
    <span class="var">$table</span>-&gt;<span class="fn">string</span>(<span class="str">'requested_by'</span>)-&gt;<span class="fn">nullable</span>();    <span class="cmt">// {{ isEn ? 'Requesting IP or User ID' : 'IP hoặc User ID thực hiện yêu cầu' }}</span>
    <span class="var">$table</span>-&gt;<span class="fn">timestamps</span>();

    <span class="cmt">// {{ isEn ? 'Index for fast status lookups' : 'Index hỗ trợ truy vấn nhanh trạng thái xử lý' }}</span>
    <span class="var">$table</span>-&gt;<span class="fn">index</span>([<span class="str">'table_name'</span>, <span class="str">'status'</span>]);
});</pre>
    </div>

    <h2>{{ t('schema.apiView.apiDetailsTitle') }}</h2>

    <h3>{{ t('schema.apiView.postTitle') }}</h3>
    <p>{{ t('schema.apiView.postDesc') }}</p>
    <div class="code-container">
      <div class="code-header">
        <span>POST /eam/api/extensions</span>
        <button class="btn-copy" @click="copySnippet ? copySnippet('code-api-req') : copySnippetInternal('code-api-req')">{{ t('common.copy') }}</button>
      </div>
      <pre class="code-content" id="code-api-req"><span class="kw">POST</span> <span class="str">/eam/api/extensions</span>
Content-Type: application/json
Accept: application/json

{
    <span class="str">"table"</span>: <span class="str">"eamo_maintenance_plans"</span>,
    <span class="str">"columns"</span>: [
        {
            <span class="str">"name"</span>: <span class="str">"department_id"</span>,
            <span class="str">"type"</span>: <span class="str">"string"</span>,
            <span class="str">"length"</span>: 36,
            <span class="str">"nullable"</span>: true,
            <span class="str">"after"</span>: <span class="str">"user_id"</span>
        },
        {
            <span class="str">"name"</span>: <span class="str">"is_urgent"</span>,
            <span class="str">"type"</span>: <span class="str">"boolean"</span>,
            <span class="str">"default"</span>: false
        }
    ]
}</pre>
    </div>

    <h4>{{ t('schema.apiView.colSpecsTitle') }}</h4>
    <table>
      <thead>
        <tr>
          <th>{{ t('schema.apiView.colTable.field') }}</th>
          <th>{{ t('schema.apiView.colTable.type') }}</th>
          <th>{{ t('schema.apiView.colTable.requirement') }}</th>
          <th>{{ t('schema.apiView.colTable.desc') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>name</code></td><td>String</td><td>{{ t('schema.apiView.colTable.required') }}</td><td>{{ t('schema.apiView.colTable.nameDesc') }}</td></tr>
        <tr><td><code>type</code></td><td>String</td><td>{{ t('schema.apiView.colTable.required') }}</td><td>{{ t('schema.apiView.colTable.typeDesc') }}</td></tr>
        <tr><td><code>nullable</code></td><td>Boolean</td><td>{{ t('schema.apiView.colTable.optional') }}</td><td>{{ t('schema.apiView.colTable.nullableDesc') }}</td></tr>
        <tr><td><code>default</code></td><td>Mixed</td><td>{{ t('schema.apiView.colTable.optional') }}</td><td>{{ t('schema.apiView.colTable.defaultDesc') }}</td></tr>
        <tr><td><code>length</code></td><td>Integer</td><td>{{ t('schema.apiView.colTable.optional') }}</td><td>{{ t('schema.apiView.colTable.lengthDesc') }}</td></tr>
        <tr><td><code>after</code></td><td>String</td><td>{{ t('schema.apiView.colTable.optional') }}</td><td>{{ t('schema.apiView.colTable.afterDesc') }}</td></tr>
        <tr><td><code>unsigned</code></td><td>Boolean</td><td>{{ t('schema.apiView.colTable.optional') }}</td><td>{{ t('schema.apiView.colTable.unsignedDesc') }}</td></tr>
      </tbody>
    </table>

    <p v-if="!isEn"><strong>Phản hồi thành công (202 Accepted):</strong> Trả về ngay lập tức mã yêu cầu (Request ID) cùng URL để kiểm tra trạng thái xử lý sau đó.</p>
    <p v-else><strong>Successful Response (202 Accepted):</strong> Immediately returns the Request ID and tracking URL to poll processing status afterwards.</p>
    
    <div class="code-container">
      <div class="code-header">
        <span>JSON Response — 202 Accepted</span>
      </div>
      <pre class="code-content">{
    <span class="str">"message"</span>: <span class="str">"Extension request queued successfully."</span>,
    <span class="str">"id"</span>: 42,
    <span class="str">"status"</span>: <span class="str">"queued"</span>,
    <span class="str">"table"</span>: <span class="str">"eamo_maintenance_plans"</span>,
    <span class="str">"columns"</span>: [<span class="str">"department_id"</span>, <span class="str">"is_urgent"</span>],
    <span class="str">"check_url"</span>: <span class="str">"http://yourdomain.com/eam/api/extensions/42"</span>
}</pre>
    </div>

    <h3>{{ t('schema.apiView.getStatusTitle') }}</h3>
    <p>{{ t('schema.apiView.getStatusDesc') }}</p>
    <div class="code-container">
      <div class="code-header">
        <span>GET /eam/api/extensions/{id}</span>
        <button class="btn-copy" @click="copySnippet ? copySnippet('code-api-get') : copySnippetInternal('code-api-get')">{{ t('common.copy') }}</button>
      </div>
      <div class="code-content" id="code-api-get"><span class="kw">GET</span> <span class="str">/eam/api/extensions/42</span></div>
    </div>
    <p><strong>{{ t('schema.apiView.sampleResponse') }}</strong></p>
    <div class="code-container">
      <div class="code-header">
        <span>JSON Response — 200 OK</span>
      </div>
      <pre class="code-content">{
    <span class="str">"id"</span>: 42,
    <span class="str">"table"</span>: <span class="str">"eamo_maintenance_plans"</span>,
    <span class="str">"status"</span>: <span class="str">"done"</span>,
    <span class="str">"migration_file"</span>: <span class="str">"2026_07_05_120000_extend_eamo_maintenance_plans_table.php"</span>,
    <span class="str">"error_message"</span>: null,
    <span class="str">"created_at"</span>: <span class="str">"2026-07-05T04:15:00.000000Z"</span>,
    <span class="str">"updated_at"</span>: <span class="str">"2026-07-05T04:16:02.000000Z"</span>
}</pre>
    </div>

    <h2>{{ t('schema.apiView.queueJobTitle') }}</h2>
    <p>{{ t('schema.apiView.queueJobDesc') }}</p>
    <ul v-if="!isEn">
      <li><strong>Thiết lập an toàn:</strong> <code>$tries = 1</code> (tránh chạy lại schema migration khi lỗi) và <code>$timeout = 120</code> (đảm bảo đủ thời gian chạy <code>migrate</code>).</li>
      <li><strong>Đổi trạng thái</strong> sang <code>processing</code>.</li>
      <li><strong>Tái cấu trúc</strong> các Object <code>ColumnDefinition</code> từ trường <code>columns</code> (JSON) trong DB.</li>
      <li><strong>Gọi <code>MigrationGenerator::generate()</code></strong> để tạo file migration vật lý.</li>
      <li><strong>Gọi <code>Artisan::call('migrate', ['--force' =&gt; true])</code></strong> để áp dụng cấu trúc mới ngay lập tức.</li>
      <li><strong>Cập nhật trạng thái</strong> sang <code>done</code> kèm tên <code>migration_file</code>. Nếu có lỗi (<code>Throwable</code>), ghi <code>error_message</code> và chuyển sang <code>failed</code>.</li>
    </ul>
    <ul v-else>
      <li><strong>Safety configuration:</strong> <code>$tries = 1</code> (prevents duplicate migration runs on error) and <code>$timeout = 120</code> (ensures ample execution time for <code>migrate</code>).</li>
      <li><strong>Transitions status</strong> to <code>processing</code>.</li>
      <li><strong>Hydrates</strong> <code>ColumnDefinition</code> objects from <code>columns</code> (JSON) in DB.</li>
      <li><strong>Invokes <code>MigrationGenerator::generate()</code></strong> to create the physical migration file.</li>
      <li><strong>Executes <code>Artisan::call('migrate', ['--force' =&gt; true])</code></strong> to apply the schema alteration immediately.</li>
      <li><strong>Updates status</strong> to <code>done</code> with generated <code>migration_file</code> name. If an error occurs (<code>Throwable</code>), captures <code>error_message</code> and transitions to <code>failed</code>.</li>
    </ul>
    
    <div class="code-container">
      <div class="code-header">
        <span>Bash — {{ isEn ? 'Start Queue Worker' : 'Khởi động Queue Worker' }}</span>
        <button class="btn-copy" @click="copySnippet ? copySnippet('code-queue-worker') : copySnippetInternal('code-queue-worker')">{{ t('common.copy') }}</button>
      </div>
      <div class="code-content" id="code-queue-worker"><span class="kw">php artisan</span> <span class="str">queue:work --queue=eam-extensions</span></div>
    </div>

    <h2>{{ t('schema.apiView.securityTitle') }}</h2>
    <div class="grid-cards" style="margin-top: 16px;">
      <div class="card-item">
        <div class="card-title">{{ t('schema.apiView.securityCards.raceConditionTitle') }}</div>
        <p v-if="!isEn">Sử dụng <code>MigrationFileChecker</code> để kiểm tra trùng lặp cả trên file và cấu trúc DB thực tế trước khi tạo record và dispatch job.</p>
        <p v-else>Uses <code>MigrationFileChecker</code> to check for conflicts both on the filesystem and actual DB schema before creating records and dispatching jobs.</p>
      </div>
      <div class="card-item">
        <div class="card-title">{{ t('schema.apiView.securityCards.migrationErrorTitle') }}</div>
        <p v-if="!isEn">Trạng thái <code>failed</code> được ghi vào bảng <code>eamo_extension_requests</code> kèm <code>error_message</code> chi tiết để dễ dàng kiểm tra và xử lý thủ công.</p>
        <p v-else>The <code>failed</code> status is logged in <code>eamo_extension_requests</code> alongside detailed <code>error_message</code> for audit and manual resolution.</p>
      </div>
      <div class="card-item">
        <div class="card-title">{{ t('schema.apiView.securityCards.apiSecurityTitle') }}</div>
        <p v-if="!isEn">Bắt buộc tích hợp Middleware xác thực (<code>auth:sanctum</code> hoặc middleware phân quyền admin) bằng cách cấu hình thuộc tính <code>api_middleware</code> trong file <code>config/eam.php</code>.</p>
        <p v-else>Requires authentication middleware (<code>auth:sanctum</code> or administrative authorization) configured via <code>api_middleware</code> in <code>config/eam.php</code>.</p>
      </div>
      <div class="card-item">
        <div class="card-title">{{ t('schema.apiView.securityCards.auditTrailTitle') }}</div>
        <p v-if="!isEn">Mọi yêu cầu đều được ghi lại đầy đủ trong bảng <code>eamo_extension_requests</code> bao gồm IP/User ID (<code>requested_by</code>) và toàn bộ vòng đời trạng thái xử lý.</p>
        <p v-else>All requests are fully logged in <code>eamo_extension_requests</code> including IP/User ID (<code>requested_by</code>) and complete lifecycle status.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-pipeline-container {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg, 8px);
  background-color: var(--bg-card);
  margin: 18px 0 24px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.pipeline-header {
  padding: 10px 16px;
  background-color: var(--bg-card-alt);
  border-bottom: 1px solid var(--border-color);
}

.pipeline-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}

.pipeline-icon {
  width: 15px;
  height: 15px;
  color: var(--color-accent);
}

.pipeline-steps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 18px;
  background-color: var(--bg-card);
}

.pipeline-step-card {
  border: 1px solid var(--border-color);
  border-radius: var(--radius, 6px);
  padding: 16px;
  background-color: var(--bg-card);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.pipeline-step-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-hover);
}

.step-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-subtle, #f3f4f6);
}

.step-badge-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-title-group {
  flex-grow: 1;
}

.step-name {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.step-sub {
  font-size: 11px;
  color: var(--text-muted);
}

.step-timing-tag {
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-secondary);
  background-color: var(--bg-muted);
  border: 1px solid var(--border-color);
  padding: 2px 7px;
  border-radius: 4px;
  white-space: nowrap;
}

.step-actions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.step-action-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
}

.action-bullet {
  color: var(--text-muted);
  font-weight: 700;
  flex-shrink: 0;
}

.action-text {
  flex-grow: 1;
}

.step-action-item.action-highlight {
  margin-top: 4px;
  padding: 8px 10px;
  background-color: var(--bg-card-alt);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  color: var(--text-primary);
  font-weight: 500;
}

.step-action-item.action-highlight .action-bullet {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .pipeline-steps-grid {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 14px;
  }
}
</style>
