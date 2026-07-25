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
  <section id="view-schema-api" class="view-panel active">
      <h1>Mở rộng Schema qua API Endpoint</h1>
      <p>Trong các kiến trúc Microservices hoặc Headless, việc mở rộng cấu trúc bảng cơ sở dữ liệu có thể được trigger tự động từ một hệ thống quản lý tập trung bên ngoài thông qua API Endpoint. Package sử dụng kiến trúc bất đồng bộ 2 bước để tránh các vấn đề khóa bảng, race condition và timeout.</p>

      <h2>Cơ chế hoạt động bất đồng bộ (Queue Job)</h2>
      <p>Để ngăn chặn lỗi khóa bảng (table lock), race condition khi có nhiều request đồng thời, package sử dụng cơ chế xử lý bất đồng bộ 2 bước:</p>
      <div class="diagram-box">
          <div class="diagram-title">Quy trình xử lý yêu cầu mở rộng qua API</div>
          <div class="arch-flow">
              <div class="arch-block">
                  <div class="arch-block-title">① HTTP Request</div>
                  <div class="arch-block-desc">Validate &amp; kiểm tra trùng lặp → Ghi record <code>queued</code> → Dispatch Job → Trả về <code>202 Accepted</code></div>
              </div>
              <div class="arch-arrow">→</div>
              <div class="arch-block">
                  <div class="arch-block-title">② Queue Worker</div>
                  <div class="arch-block-desc">Lấy Job → Sinh file migration → Chạy <code>migrate</code> → Cập nhật trạng thái <code>done / failed</code></div>
              </div>
          </div>
      </div>

      <h2>Cấu trúc bảng nhật ký <code>eamo_extension_requests</code></h2>
      <p>Bảng này đóng vai trò lưu trữ nhật ký (audit trail), quản lý tiến trình và trạng thái của các yêu cầu mở rộng bảng. Bắt buộc phải publish và migrate bảng này trước khi sử dụng API:</p>
      <div class="code-container">
          <div class="code-header">
              <span>Bash</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-core-ext') : copySnippetInternal('code-publish-core-ext')">Copy</button>
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
    <span class="var">$table</span>-&gt;<span class="fn">json</span>(<span class="str">'columns'</span>);                    <span class="cmt">// Mảng ColumnDefinition đã định nghĩa</span>
    <span class="var">$table</span>-&gt;<span class="fn">string</span>(<span class="str">'migration_file'</span>)-&gt;<span class="fn">nullable</span>(); // Tên file migration được sinh ra
    <span class="var">$table</span>-&gt;<span class="fn">enum</span>(<span class="str">'status'</span>, [
        <span class="str">'queued'</span>,       <span class="cmt">// Đang chờ trong hàng đợi</span>
        <span class="str">'processing'</span>,   <span class="cmt">// Đang tiến hành tạo file và chạy migrate</span>
        <span class="str">'done'</span>,         <span class="cmt">// Đã hoàn thành migrate thành công</span>
        <span class="str">'failed'</span>        <span class="cmt">// Gặp lỗi trong quá trình thực thi</span>
    ])-&gt;<span class="fn">default</span>(<span class="str">'queued'</span>);
    <span class="var">$table</span>-&gt;<span class="fn">text</span>(<span class="str">'error_message'</span>)-&gt;<span class="fn">nullable</span>();     <span class="cmt">// Nội dung lỗi nếu status là 'failed'</span>
    <span class="var">$table</span>-&gt;<span class="fn">string</span>(<span class="str">'requested_by'</span>)-&gt;<span class="fn">nullable</span>();    <span class="cmt">// IP hoặc User ID thực hiện yêu cầu</span>
    <span class="var">$table</span>-&gt;<span class="fn">timestamps</span>();

    <span class="cmt">// Index hỗ trợ truy vấn nhanh trạng thái xử lý</span>
    <span class="var">$table</span>-&gt;<span class="fn">index</span>([<span class="str">'table_name'</span>, <span class="str">'status'</span>]);
});</pre>
      </div>

      <h2>Chi tiết API Endpoints</h2>

      <h3>1. Tạo yêu cầu thêm cột (POST)</h3>
      <p>Gửi payload dạng JSON mô tả các cột cần tạo mới:</p>
      <div class="code-container">
          <div class="code-header">
              <span>POST /eam/api/extensions</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-api-req') : copySnippetInternal('code-api-req')">Copy</button>
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

      <h4>Đặc tả các thuộc tính cột trong <code>columns</code></h4>
      <table>
          <thead>
              <tr>
                  <th>Trường</th>
                  <th>Kiểu dữ liệu</th>
                  <th>Yêu cầu</th>
                  <th>Mô tả</th>
              </tr>
          </thead>
          <tbody>
              <tr><td><code>name</code></td><td>String</td><td>Bắt buộc</td><td>Tên cột cần tạo (regex: <code>/^[a-z][a-z0-9_]*$/</code>)</td></tr>
              <tr><td><code>type</code></td><td>String</td><td>Bắt buộc</td><td>Kiểu dữ liệu: <code>string</code>, <code>integer</code>, <code>boolean</code>, <code>text</code>, <code>json</code>, <code>decimal</code>...</td></tr>
              <tr><td><code>nullable</code></td><td>Boolean</td><td>Tùy chọn</td><td>Cho phép giá trị <code>NULL</code> (mặc định: <code>true</code>)</td></tr>
              <tr><td><code>default</code></td><td>Mixed</td><td>Tùy chọn</td><td>Giá trị mặc định (ví dụ: <code>false</code>, <code>"active"</code>, <code>10</code>...)</td></tr>
              <tr><td><code>length</code></td><td>Integer</td><td>Tùy chọn</td><td>Độ dài cột (chỉ áp dụng khi <code>type</code> là <code>string</code>, mặc định: 255)</td></tr>
              <tr><td><code>after</code></td><td>String</td><td>Tùy chọn</td><td>Đặt cột mới sau tên cột đã chỉ định trong bảng</td></tr>
              <tr><td><code>unsigned</code></td><td>Boolean</td><td>Tùy chọn</td><td>Chỉ định kiểu số không âm (chỉ dùng cho <code>integer</code>, <code>bigInteger</code>...)</td></tr>
          </tbody>
      </table>

      <p><strong>Phản hồi thành công (202 Accepted):</strong> Trả về ngay lập tức mã yêu cầu (Request ID) cùng URL để kiểm tra trạng thái xử lý sau đó.</p>
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

      <h3>2. Kiểm tra trạng thái tiến trình (GET)</h3>
      <p>Gọi API để kiểm tra tiến trình xử lý dưới background:</p>
      <div class="code-container">
          <div class="code-header">
              <span>GET /eam/api/extensions/{id}</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-api-get') : copySnippetInternal('code-api-get')">Copy</button>
          </div>
          <div class="code-content" id="code-api-get"><span class="kw">GET</span> <span class="str">/eam/api/extensions/42</span></div>
      </div>
      <p><strong>Dữ liệu phản hồi mẫu (200 OK):</strong></p>
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

      <h2>Queue Job: <code>GenerateExtensionMigrationJob</code></h2>
      <p>Job này chạy ngầm qua Queue Worker và thực hiện các bước sau:</p>
      <ul>
          <li><strong>Thiết lập an toàn:</strong> <code>$tries = 1</code> (tránh chạy lại schema migration khi lỗi) và <code>$timeout = 120</code> (đảm bảo đủ thời gian chạy <code>migrate</code>).</li>
          <li><strong>Đổi trạng thái</strong> sang <code>processing</code>.</li>
          <li><strong>Tái cấu trúc</strong> các Object <code>ColumnDefinition</code> từ trường <code>columns</code> (JSON) trong DB.</li>
          <li><strong>Gọi <code>MigrationGenerator::generate()</code></strong> để tạo file migration vật lý.</li>
          <li><strong>Gọi <code>Artisan::call('migrate', ['--force' =&gt; true])</code></strong> để áp dụng cấu trúc mới ngay lập tức.</li>
          <li><strong>Cập nhật trạng thái</strong> sang <code>done</code> kèm tên <code>migration_file</code>. Nếu có lỗi (<code>Throwable</code>), ghi <code>error_message</code> và chuyển sang <code>failed</code>.</li>
      </ul>
      <div class="code-container">
          <div class="code-header">
              <span>Bash — Khởi động Queue Worker</span>
              <button class="btn-copy" @click="copySnippet ? copySnippet('code-queue-worker') : copySnippetInternal('code-queue-worker')">Copy</button>
          </div>
          <div class="code-content" id="code-queue-worker"><span class="kw">php artisan</span> <span class="str">queue:work --queue=eam-extensions</span></div>
      </div>

      <h2>Bảo mật &amp; Xử lý rủi ro</h2>
      <ul>
          <li><strong>Race Condition:</strong> Sử dụng <code>MigrationFileChecker</code> để kiểm tra trùng lặp cả trên file và cấu trúc DB thực tế trước khi tạo record và dispatch job.</li>
          <li><strong>Lỗi Migration:</strong> Trạng thái <code>failed</code> được ghi vào bảng <code>eamo_extension_requests</code> kèm <code>error_message</code> chi tiết để dễ dàng kiểm tra và xử lý thủ công.</li>
          <li><strong>Bảo vệ API:</strong> Bắt buộc tích hợp Middleware xác thực (<code>auth:sanctum</code> hoặc middleware phân quyền admin) bằng cách cấu hình thuộc tính <code>api_middleware</code> trong file <code>config/eam.php</code>.</li>
          <li><strong>Audit Trail:</strong> Mọi yêu cầu đều được ghi lại đầy đủ trong bảng <code>eamo_extension_requests</code> bao gồm IP/User ID (<code>requested_by</code>) và toàn bộ vòng đời trạng thái xử lý.</li>
      </ul>
  </section>
</template>
