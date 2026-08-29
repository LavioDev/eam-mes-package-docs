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
  <section id="view-schema-class" class="view-panel active">
    <h1>{{ t('schema.classView.title') }}</h1>
    <p v-if="!isEn">
      Cơ chế này giải quyết bài toán: <strong>Tùy biến thêm trường dữ liệu động cho các bảng dữ liệu lõi của package mà không cần sửa trực tiếp mã nguồn lõi</strong>. Nhà phát triển chỉ cần khai báo mô tả cấu trúc trường thông qua một Class PHP.
    </p>
    <p v-else>
      This mechanism resolves the challenge of <strong>dynamically extending core package database tables without modifying core source code directly</strong>. Developers simply declare the column structure using a PHP Class.
    </p>

    <h2>{{ t('schema.classView.principlesTitle') }}</h2>
    <div class="alert alert-important" style="margin-top: 16px;">
      <div class="alert-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        {{ t('schema.classView.alertImportantTitle') }}
      </div>
      <div class="alert-content" v-if="!isEn">
        Mọi thay đổi cấu trúc DB đều phải thực thi qua file <strong>Migration</strong>. Hệ thống <strong>không bao giờ thực thi ALTER TABLE trực tiếp</strong> trên database để tránh race conditions và mất vết kiểm toán (audit trail).
      </div>
      <div class="alert-content" v-else>
        All DB schema alterations must be executed via physical <strong>Migration</strong> files. The system <strong>never executes direct ALTER TABLE statements</strong> on the database to prevent race conditions and preserve audit trails.
      </div>
    </div>

    <div class="alert alert-note">
      <div class="alert-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        {{ t('schema.classView.alertNoteTitle') }}
      </div>
      <div class="alert-content" v-if="!isEn">
        Sử dụng Class mô tả dạng Value Object (định hình bằng class <code>ColumnDefinition</code>) giúp hệ thống tự động suy diễn cấu trúc để sinh cả phương thức <code>up()</code> (thêm cột) và <code>down()</code> (xóa cột khi rollback) hoàn toàn tự động.
      </div>
      <div class="alert-content" v-else>
        Using Value Object descriptors (patterned via the <code>ColumnDefinition</code> class) enables the system to automatically infer structures and generate both <code>up()</code> (add columns) and <code>down()</code> (drop columns on rollback) methods automatically.
      </div>
    </div>

    <h2>{{ t('schema.classView.stepsTitle') }}</h2>
    
    <h3>{{ t('schema.classView.step1Title') }}</h3>
    <p v-if="!isEn">Tạo một tệp PHP mới nằm trong thư mục <code>app/Extensions/</code> và kế thừa interface <code>Spatie\LaravelPackageTools\Contracts\TableExtension</code>:</p>
    <p v-else>Create a new PHP file in the <code>app/Extensions/</code> directory implementing the <code>Spatie\LaravelPackageTools\Contracts\TableExtension</code> interface:</p>
    <div class="code-container">
      <div class="code-header">
        <span>app/Extensions/MaintenancePlanExtension.php</span>
        <button class="btn-copy" @click="copySnippet ? copySnippet('code-ext-class-example') : copySnippetInternal('code-ext-class-example')">{{ t('common.copy') }}</button>
      </div>
      <pre class="code-content" id="code-ext-class-example"><span class="kw">namespace</span> App\Extensions;

<span class="kw">use</span> Spatie\LaravelPackageTools\Contracts\<span class="cls">TableExtension</span>;
<span class="kw">use</span> Spatie\LaravelPackageTools\Extensions\<span class="cls">ColumnDefinition</span>;

<span class="kw">class</span> <span class="cls">MaintenancePlanExtension</span> <span class="kw">implements</span> <span class="cls">TableExtension</span>
{
    <span class="cmt">// {{ isEn ? 'Specify target whitelist table to extend' : 'Xác định bảng đích được phép mở rộng trong Whitelist' }}</span>
    <span class="kw">public function</span> <span class="fn">targetTable</span>(): <span class="kw">string</span>
    {
        <span class="kw">return</span> <span class="str">'eamo_maintenance_plans'</span>;
    }

    <span class="cmt">// {{ isEn ? 'Define list of columns to add' : 'Định nghĩa danh sách các trường muốn bổ sung thêm' }}</span>
    <span class="kw">public function</span> <span class="fn">columns</span>(): <span class="kw">array</span>
    {
        <span class="kw">return</span> [
            <span class="cls">ColumnDefinition</span>::<span class="fn">make</span>(<span class="str">'department_id'</span>, <span class="str">'string'</span>)
                -&gt;<span class="fn">length</span>(<span class="num">36</span>)
                -&gt;<span class="fn">nullable</span>()
                -&gt;<span class="fn">after</span>(<span class="str">'user_id'</span>),

            <span class="cls">ColumnDefinition</span>::<span class="fn">make</span>(<span class="str">'is_urgent'</span>, <span class="str">'boolean'</span>)
                -&gt;<span class="fn">default</span>(<span class="kw">false</span>),
        ];
    }

    <span class="cmt">// {{ isEn ? 'Execution priority order (lower runs first)' : 'Thứ tự ưu tiên xử lý (nhỏ chạy trước)' }}</span>
    <span class="kw">public function</span> <span class="fn">priority</span>(): <span class="kw">int</span>
    {
        <span class="kw">return</span> <span class="num">10</span>;
    }
}</pre>
    </div>

    <h3>{{ t('schema.classView.step2Title') }}</h3>
    <p v-if="!isEn">Mở file <code>config/eam.php</code> và khai báo Class vừa tạo vào mảng <code>extensions</code>:</p>
    <p v-else>Open <code>config/eam.php</code> and register the newly created class in the <code>extensions</code> array:</p>
    <div class="code-container">
      <div class="code-header">
        <span>config/eam.php</span>
        <button class="btn-copy" @click="copySnippet ? copySnippet('code-ext-reg') : copySnippetInternal('code-ext-reg')">{{ t('common.copy') }}</button>
      </div>
      <pre class="code-content" id="code-ext-reg">// config/eam.php
'extensions' => [
    App\Extensions\MaintenancePlanExtension::class,
],</pre>
    </div>

    <h3>{{ t('schema.classView.step3Title') }}</h3>
    <p v-if="!isEn">Sử dụng Artisan command của package để quét class cấu hình, kiểm tra trùng lặp và ghi file migration vật lý vào thư mục <code>database/migrations/</code>:</p>
    <p v-else>Execute the package Artisan command to scan configured classes, check for duplicates, and generate physical migration files in <code>database/migrations/</code>:</p>
    <div class="code-container">
      <div class="code-header">
        <span>Artisan CLI</span>
        <button class="btn-copy" @click="copySnippet ? copySnippet('code-ext-command') : copySnippetInternal('code-ext-command')">{{ t('common.copy') }}</button>
      </div>
      <pre class="code-content" id="code-ext-command"><span class="cmt"># {{ isEn ? 'Test table schema alterations (dry-run mode without writing files)' : 'Kiểm thử thay đổi cấu trúc bảng (không ghi file thực tế)' }}</span>
<span class="kw">php artisan</span> <span class="str">eam:sync-extensions --dry-run</span>

<span class="cmt"># {{ isEn ? 'Generate physical migration file and execute migration immediately' : 'Sinh tệp tin migration vật lý và chạy migrate cập nhật DB lập tức' }}</span>
<span class="kw">php artisan</span> <span class="str">eam:sync-extensions --migrate</span>

<span class="cmt"># {{ isEn ? 'Force re-generation bypassing duplicate check' : 'Ép buộc sinh lại migration bỏ qua kiểm tra trùng lặp' }}</span>
<span class="kw">php artisan</span> <span class="str">eam:sync-extensions --force</span></pre>
    </div>

    <h2>{{ t('schema.classView.namingTitle') }}</h2>
    <p>{{ t('schema.classView.namingDesc') }}</p>
    <p><code>database/migrations/{Y_m_d_His}_extend_{table_name}_table.php</code></p>
    <p>{{ isEn ? 'Example:' : 'Ví dụ:' }} <code>database/migrations/2026_07_05_120000_extend_eamo_maintenance_plans_table.php</code></p>
  </section>
</template>
