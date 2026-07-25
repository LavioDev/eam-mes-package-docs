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
  <section id="view-eam-deploy" class="view-panel active">
      <h1>Quy trình Triển khai Package</h1>
      <p>Hướng dẫn chi tiết quy trình chèn thư viện vào hệ thống Laravel và publish tài nguyên tương ứng:</p>

      <div class="step-timeline" style="margin-top: 24px;">
          <!-- Step 1 -->
          <div class="step-item">
              <div class="step-marker">1</div>
              <div class="step-item-body">
                  <div class="step-item-title">Cài đặt gói Package</div>
                  <p>Thêm khai báo repository và yêu cầu gói vào tệp <code>composer.json</code> của bạn:</p>
                  <div class="code-container">
                      <div class="code-header">
                          <span>composer.json</span>
                          <button class="btn-copy" @click="copySnippet ? copySnippet('code-composer-json') : copySnippetInternal('code-composer-json')">Copy</button>
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
                  <p style="margin-top: 12px; margin-bottom: 8px;">Sau đó chạy lệnh cập nhật để cài đặt:</p>
                  <div class="code-container">
                      <div class="code-header">
                          <span>Bash</span>
                          <button class="btn-copy" @click="copySnippet ? copySnippet('code-composer-update') : copySnippetInternal('code-composer-update')">Copy</button>
                      </div>
                      <div class="code-content" id="code-composer-update"><span class="kw">composer update</span> <span class="str">laviodev/eam-mes-package</span></div>
                  </div>
              </div>
          </div>

          <!-- Step 2 -->
          <div class="step-item">
              <div class="step-marker">2</div>
              <div class="step-item-body">
                  <div class="step-item-title">Publish file cấu hình chính</div>
                  <p>File config chính sẽ được copy từ vendor sang đường dẫn <code>config/eam.php</code> để quản lý whitelist bảng, middleware và danh sách class mở rộng:</p>
                  <div class="code-container">
                      <div class="code-header">
                          <span>Bash</span>
                          <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-config') : copySnippetInternal('code-publish-config')">Copy</button>
                      </div>
                      <div class="code-content" id="code-publish-config"><span class="kw">php artisan</span> <span class="str">vendor:publish --tag="eam-mes-package-config"</span></div>
                  </div>
              </div>
          </div>

          <!-- Step 3 -->
          <div class="step-item">
              <div class="step-marker">3</div>
              <div class="step-item-body">
                  <div class="step-item-title">Publish phân hệ Cốt lõi (Core Submodule)</div>
                  <p>Phân hệ Cốt lõi chứa bảng quản lý yêu cầu mở rộng Schema động (<code>eamo_extension_requests</code>). Đây là nền tảng bắt buộc để hệ thống vận hành và đồng bộ dữ liệu:</p>
                  <div class="code-container">
                      <div class="code-header">
                          <span>Bash</span>
                          <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-core') : copySnippetInternal('code-publish-core')">Copy</button>
                      </div>
                      <div class="code-content" id="code-publish-core"><span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=core</span></div>
                  </div>
              </div>
          </div>

          <!-- Step 4 -->
          <div class="step-item">
              <div class="step-marker">4</div>
              <div class="step-item-body">
                  <div class="step-item-title">Publish module Dữ liệu gốc Thiết bị (Masterdata Equipment Module)</div>
                  <p>Định nghĩa cấu trúc dữ liệu gốc của thiết bị (bảng <code>eamo_equipment</code>, <code>eamo_equipment_categories</code>, <code>eamo_equipment_states</code>, <code>eamo_equipment_images</code>, <code>eamo_equipment_parameters</code>, và <code>eamo_equipment_errors</code>) giúp thiết lập nền tảng liên kết cho mọi nghiệp vụ vận hành:</p>
                  <div class="code-container">
                      <div class="code-header">
                          <span>Bash</span>
                          <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-masterdata') : copySnippetInternal('code-publish-masterdata')">Copy</button>
                      </div>
                      <div class="code-content" id="code-publish-masterdata"><span class="kw">php artisan</span> <span class="str">eam-mes:publish --module=masterdata-equipment</span></div>
                  </div>
              </div>
          </div>

          <!-- Step 5 -->
          <div class="step-item">
              <div class="step-marker">5</div>
              <div class="step-item-body">
                  <div class="step-item-title">Publish các Module nghiệp vụ khác &amp; Submodule</div>
                  <p>Bạn có thể publish toàn bộ các module và submodule cùng lúc, hoặc lựa chọn cụ thể theo nhu cầu của dự án:</p>
                  <div class="code-container">
                      <div class="code-header">
                          <span>Bash</span>
                          <button class="btn-copy" @click="copySnippet ? copySnippet('code-publish-submodules') : copySnippetInternal('code-publish-submodules')">Copy</button>
                      </div>
                      <pre class="code-content" id="code-publish-submodules"><span class="cmt"># Publish TOÀN BỘ các module và submodule cùng lúc</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --all</span>

<span class="cmt"># Hoặc publish toàn bộ module Equipment (bao gồm tất cả các submodule bên dưới)</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --module=equipment</span>

<span class="cmt"># Hoặc chỉ publish từng submodule riêng lẻ của Equipment:</span>
<span class="cmt"># 1. Submodule Management (Quản lý Thiết bị - Seeding lỗi dừng ngắn)</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=management</span>

<span class="cmt"># 2. Submodule Checklist (Kiểm tra đầu ca/định kỳ)</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=checklist</span>

<span class="cmt"># 3. Submodule Error Monitoring (Giám sát lỗi &amp; OEE)</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=error-monitoring</span>

<span class="cmt"># 4. Submodule Maintenance (Kế hoạch &amp; Nhật ký bảo trì)</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=maintenance</span>

<span class="cmt"># 5. Submodule Parameter Log (Ghi thông số cảm biến)</span>
<span class="kw">php artisan</span> <span class="str">eam-mes:publish --submodule=parameter-log</span></pre>
                  </div>
              </div>
          </div>

          <!-- Step 6 -->
          <div class="step-item">
              <div class="step-marker">6</div>
              <div class="step-item-body">
                  <div class="step-item-title">Thực thi migrate cơ sở dữ liệu</div>
                  <p>Tạo các bảng cơ sở dữ liệu <code>eamo_*</code> trong DB:</p>
                  <div class="code-container">
                      <div class="code-header">
                          <span>Bash</span>
                          <button class="btn-copy" @click="copySnippet ? copySnippet('code-migrate') : copySnippetInternal('code-migrate')">Copy</button>
                      </div>
                      <div class="code-content" id="code-migrate"><span class="kw">php artisan</span> <span class="str">migrate</span></div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>
