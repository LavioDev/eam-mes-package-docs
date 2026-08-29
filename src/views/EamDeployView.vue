<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

const props = defineProps<{
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
  <section id="view-eam-deploy" class="view-panel active">
    <h1>{{ t('deploy.title') }}</h1>
    <p>{{ t('deploy.subtitle') }}</p>

    <div class="alert alert-note" style="margin-top: 16px;">
      <div class="alert-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        {{ t('deploy.envReqTitle') }}
      </div>
      <div class="alert-content" v-if="!isEn">
        Đảm bảo dự án của bạn sử dụng <strong>Laravel 13</strong> và <strong>PHP 8.4</strong>. Gói Laravel Package này yêu cầu định dạng UUID cho khoá chính (Primary Key) trong toàn bộ cơ sở dữ liệu.
      </div>
      <div class="alert-content" v-else>
        Ensure your project uses <strong>Laravel 13</strong> and <strong>PHP 8.4</strong>. This Laravel package requires UUID primary keys across all database tables.
      </div>
    </div>

    <div class="step-timeline" style="margin-top: 24px;">
      <!-- Step 1 -->
      <div class="step-item">
        <div class="step-marker">1</div>
        <div class="step-item-body">
          <div class="step-item-title">{{ t('deploy.step1.title') }}</div>
          <p>{{ t('deploy.step1.desc') }}</p>
          <div class="code-container">
            <div class="code-header">
              <span>composer.json</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-composer-json') : copySnippetInternal('code-composer-json')">{{ t('common.copy') }}</button>
            </div>
            <pre class="code-content" id="code-composer-json" style="padding: 16px; margin: 0; white-space: pre; font-family: var(--font-mono); font-size: 13px;">{
    <span class="str">"repositories"</span>: [
        {
            <span class="str">"type"</span>: <span class="str">"vcs"</span>,
            <span class="str">"url"</span>: <span class="str">"https://github.com/LavioDev/eam-mes-package"</span>
        }
    ],
    <span class="str">"require"</span>: {
        <span class="str">"laviodev/eam-mes-package"</span>: <span class="str">"dev-main"</span>
    }
}</pre>
          </div>
          <p style="margin-top: 12px; margin-bottom: 8px;">{{ t('deploy.step1.updateDesc') }}</p>
          <div class="code-container">
            <div class="code-header">
              <span>Bash</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-composer-update') : copySnippetInternal('code-composer-update')">{{ t('common.copy') }}</button>
            </div>
            <div class="code-content" id="code-composer-update"><span class="kw">composer update</span> <span class="str">laviodev/eam-mes-package</span></div>
          </div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="step-item">
        <div class="step-marker">2</div>
        <div class="step-item-body">
          <div class="step-item-title">{{ t('deploy.step2.title') }}</div>
          <p v-if="!isEn">File config chính sẽ được copy từ vendor sang đường dẫn <code>config/eam.php</code> để quản lý whitelist bảng, middleware và danh sách class mở rộng:</p>
          <p v-else>The master configuration file will be published from vendor to <code>config/eam.php</code> to manage table whitelists, middlewares, and registered extension classes:</p>
          <div class="code-container">
            <div class="code-header">
              <span>Bash</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-config') : copySnippetInternal('code-publish-config')">{{ t('common.copy') }}</button>
            </div>
            <div class="code-content" id="code-publish-config"><span class="kw">php artisan</span> <span class="str">vendor:publish --tag="eam-mes-package-config"</span></div>
          </div>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="step-item">
        <div class="step-marker">3</div>
        <div class="step-item-body">
          <div class="step-item-title">{{ t('deploy.step3.title') }}</div>
          <p v-if="!isEn">Phân hệ Cốt lõi chứa bảng quản lý yêu cầu mở rộng Schema động (<code>eamo_extension_requests</code>). Đây là nền tảng bắt buộc để hệ thống vận hành và đồng bộ dữ liệu:</p>
          <p v-else>The Core Submodule contains the dynamic schema extension tracking table (<code>eamo_extension_requests</code>). This is an essential foundation for system operations and data synchronization:</p>
          <div class="code-container">
            <div class="code-header">
              <span>Bash</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-core') : copySnippetInternal('code-publish-core')">{{ t('common.copy') }}</button>
            </div>
            <div class="code-content" id="code-publish-core"><span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=core</span></div>
          </div>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="step-item">
        <div class="step-marker">4</div>
        <div class="step-item-body">
          <div class="step-item-title">{{ t('deploy.step4.title') }}</div>
          <p v-if="!isEn">Định nghĩa cấu trúc dữ liệu gốc của thiết bị (bảng <code>eamo_equipment</code>, <code>eamo_equipment_categories</code>, <code>eamo_equipment_states</code>, <code>eamo_equipment_images</code>, <code>eamo_equipment_parameters</code>, và <code>eamo_equipment_errors</code>) giúp thiết lập nền tảng liên kết cho mọi nghiệp vụ vận hành:</p>
          <p v-else>Defines base equipment data structures (<code>eamo_equipment</code>, <code>eamo_equipment_categories</code>, <code>eamo_equipment_states</code>, <code>eamo_equipment_images</code>, <code>eamo_equipment_parameters</code>, and <code>eamo_equipment_errors</code>) establishing the relationship foundation for all operations:</p>
          <div class="code-container">
            <div class="code-header">
              <span>Bash</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-masterdata') : copySnippetInternal('code-publish-masterdata')">{{ t('common.copy') }}</button>
            </div>
            <div class="code-content" id="code-publish-masterdata"><span class="kw">php artisan</span> <span class="str">eam-mes:publish --module=masterdata-equipment</span></div>
          </div>
        </div>
      </div>

      <!-- Step 5 -->
      <div class="step-item">
        <div class="step-marker">5</div>
        <div class="step-item-body">
          <div class="step-item-title">{{ t('deploy.step5.title') }}</div>
          <p>{{ t('deploy.step5.desc') }}</p>
          <div class="code-container">
            <div class="code-header">
              <span>Bash</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-submodules') : copySnippetInternal('code-publish-submodules')">{{ t('common.copy') }}</button>
            </div>
            <pre class="code-content" id="code-publish-submodules"><span class="cmt"># {{ isEn ? 'Publish ALL modules and submodules at once' : 'Publish TOÀN BỘ các module và submodule cùng lúc' }}</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --all</span>

<span class="cmt"># {{ isEn ? 'Or publish entire Equipment module (including all submodules below)' : 'Hoặc publish toàn bộ module Equipment (bao gồm tất cả các submodule bên dưới)' }}</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --module=equipment</span>

<span class="cmt"># {{ isEn ? 'Or publish individual submodules of Equipment:' : 'Hoặc chỉ publish từng submodule riêng lẻ của Equipment:' }}</span>
<span class="cmt"># 1. Submodule Management ({{ isEn ? 'Equipment Management - Short downtime error seeding' : 'Quản lý Thiết bị - Seeding lỗi dừng ngắn' }})</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=management</span>

<span class="cmt"># 2. Submodule Checklist ({{ isEn ? 'Shift-start / Periodic Inspection' : 'Kiểm tra đầu ca/định kỳ' }})</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=checklist</span>

<span class="cmt"># 3. Submodule Error Monitoring ({{ isEn ? 'Error Monitoring & OEE' : 'Giám sát lỗi & OEE' }})</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=error-monitoring</span>

<span class="cmt"># 4. Submodule Maintenance ({{ isEn ? 'Maintenance Planning & Execution Logs' : 'Kế hoạch & Nhật ký bảo trì' }})</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=maintenance</span>

<span class="cmt"># 5. Submodule Parameter Log ({{ isEn ? 'Sensor Parameter Logs' : 'Ghi thông số cảm biến' }})</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=parameter-log</span></pre>
          </div>
        </div>
      </div>

      <!-- Step 6 -->
      <div class="step-item">
        <div class="step-marker">6</div>
        <div class="step-item-body">
          <div class="step-item-title">{{ t('deploy.step6.title') }}</div>
          <p v-if="!isEn">Tạo các bảng cơ sở dữ liệu <code>eamo_*</code> trong DB:</p>
          <p v-else>Creates the <code>eamo_*</code> database tables in your database:</p>
          <div class="code-container">
            <div class="code-header">
              <span>Bash</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-migrate') : copySnippetInternal('code-migrate')">{{ t('common.copy') }}</button>
            </div>
            <div class="code-content" id="code-migrate"><span class="kw">php artisan</span> <span class="str">migrate</span></div>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-warning" style="margin-top: 24px;">
      <div class="alert-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        {{ t('deploy.warningTitle') }}
      </div>
      <div class="alert-content" v-if="!isEn">
        Đảm bảo đã sao lưu cơ sở dữ liệu trước khi chạy lệnh <code>php artisan migrate</code> trên môi trường production.
      </div>
      <div class="alert-content" v-else>
        Ensure you have taken a full database backup before executing <code>php artisan migrate</code> in production environments.
      </div>
    </div>
  </section>
</template>
