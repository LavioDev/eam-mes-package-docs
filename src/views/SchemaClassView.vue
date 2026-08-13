<script setup lang="ts">
defineProps<{
  copySnippet?: (id: string) => void
}>()

const copySnippetInternal = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return
  const text = element.innerText
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <section id="view-schema-class" class="view-panel active">
      <h1>Mở rộng Schema qua Class PHP</h1>
      <p>Cơ chế này giải quyết bài toán: <strong>Tùy biến thêm trường dữ liệu động cho các bảng dữ liệu lõi của package mà không cần sửa trực tiếp mã nguồn lõi</strong>. Nhà phát triển chỉ cần khai báo mô tả cấu trúc trường thông qua một Class PHP.</p>

      <h2>Nguyên lý hoạt động</h2>
      <div class="alert alert-important" style="margin-top: 16px;">
          <div class="alert-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Không thay đổi trực tiếp DB
          </div>
          <div class="alert-content">
              Mọi thay đổi cấu trúc DB đều phải thực thi qua file <strong>Migration</strong>. Hệ thống <strong>không bao giờ thực thi ALTER TABLE trực tiếp</strong> trên database để tránh race conditions và mất vết kiểm toán (audit trail).
          </div>
      </div>

      <div class="alert alert-note">
          <div class="alert-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              Value Object Column Definition
          </div>
          <div class="alert-content">
              Sử dụng Class mô tả dạng Value Object (định hình bằng class <code>ColumnDefinition</code>) giúp hệ thống tự động suy diễn cấu trúc để sinh cả phương thức <code>up()</code> (thêm cột) và <code>down()</code> (xóa cột khi rollback) hoàn toàn tự động.
          </div>
      </div>

      <h2>Hướng dẫn chi tiết các bước triển khai</h2>
      
      <h3>Bước 1: Khai báo Class mở rộng</h3>
      <p>Tạo một tệp PHP mới nằm trong thư mục <code>app/Extensions/</code> và kế thừa interface <code>Spatie\LaravelPackageTools\Contracts\TableExtension</code>:</p>
      <div class="code-container">
          <div class="code-header">
              <span>app/Extensions/MaintenancePlanExtension.php</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-ext-class-example') : copySnippetInternal('code-ext-class-example')">Copy</button>
          </div>
          <pre class="code-content" id="code-ext-class-example"><span class="kw">namespace</span> App\Extensions;

<span class="kw">use</span> Spatie\LaravelPackageTools\Contracts\<span class="cls">TableExtension</span>;
<span class="kw">use</span> Spatie\LaravelPackageTools\Extensions\<span class="cls">ColumnDefinition</span>;

<span class="kw">class</span> <span class="cls">MaintenancePlanExtension</span> <span class="kw">implements</span> <span class="cls">TableExtension</span>
{
    <span class="cmt">// Xác định bảng đích được phép mở rộng trong Whitelist</span>
    <span class="kw">public function</span> <span class="fn">targetTable</span>(): <span class="kw">string</span>
    {
        <span class="kw">return</span> <span class="str">'eamo_maintenance_plans'</span>;
    }

    <span class="cmt">// Định nghĩa danh sách các trường muốn bổ sung thêm</span>
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

    <span class="cmt">// Thứ tự ưu tiên xử lý (nhỏ chạy trước)</span>
    <span class="kw">public function</span> <span class="fn">priority</span>(): <span class="kw">int</span>
    {
        <span class="kw">return</span> <span class="num">10</span>;
    }
}</pre>
      </div>

      <h3>Bước 2: Đăng ký Class trong cấu hình</h3>
      <p>Mở file <code>config/eam.php</code> và khai báo Class vừa tạo vào mảng <code>extensions</code>:</p>
      <div class="code-container">
          <div class="code-header">
              <span>config/eam.php</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-ext-reg') : copySnippetInternal('code-ext-reg')">Copy</button>
          </div>
          <pre class="code-content" id="code-ext-reg">// config/eam.php
'extensions' => [
    App\Extensions\MaintenancePlanExtension::class,
],</pre>
      </div>

      <h3>Bước 3: Chạy Command đồng bộ DB</h3>
      <p>Sử dụng Artisan command của package để quét class cấu hình, kiểm tra trùng lặp và ghi file migration vật lý vào thư mục <code>database/migrations/</code>:</p>
      <div class="code-container">
          <div class="code-header">
              <span>Artisan CLI</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-ext-command') : copySnippetInternal('code-ext-command')">Copy</button>
          </div>
          <pre class="code-content" id="code-ext-command"><span class="cmt"># Kiểm thử thay đổi cấu trúc bảng (không ghi file thực tế)</span>
<span class="kw">php artisan</span> <span class="str">eam:sync-extensions --dry-run</span>

<span class="cmt"># Sinh tệp tin migration vật lý và chạy migrate cập nhật DB lập tức</span>
<span class="kw">php artisan</span> <span class="str">eam:sync-extensions --migrate</span>

<span class="cmt"># Ép buộc sinh lại migration bỏ qua kiểm tra trùng lặp</span>
<span class="kw">php artisan</span> <span class="str">eam:sync-extensions --force</span></pre>
      </div>

      <h2>Vị trí tệp sinh ra &amp; Naming Convention</h2>
      <p>Sau khi thực thi lệnh đồng bộ, hệ thống sẽ sinh ra file migration nằm ở thư mục <code>database/migrations/</code> của host app dưới tên mẫu:</p>
      <p><code>database/migrations/{Y_m_d_His}_extend_{table_name}_table.php</code></p>
      <p>Ví dụ: <code>database/migrations/2026_07_05_120000_extend_eamo_maintenance_plans_table.php</code></p>
  </section>
</template>
