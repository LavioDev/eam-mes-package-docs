<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

const props = defineProps<{
  copySnippet?: (id: string) => void
}>()

const { t, isEn } = useLocale()

const handleCopy = (id: string) => {
  if (props.copySnippet) {
    props.copySnippet(id)
  } else {
    const el = document.getElementById(id)
    if (el) {
      navigator.clipboard.writeText(el.innerText)
    }
  }
}
</script>

<template>
  <section id="view-eam-engine" class="view-panel active">
    <h1>{{ t('engine.title') }}</h1>
    <p class="subtitle-desc" v-if="!isEn">
      Phân hệ Module Engine được thiết kế giúp package <code>eam-mes-package</code> hoạt động hoàn toàn độc lập, hỗ trợ <strong>Tự động phát hiện (Auto-Discovery)</strong> và cung cấp lệnh <strong>Generator CLI</strong> tạo module mới chỉ với 1 câu lệnh.
    </p>
    <p class="subtitle-desc" v-else>
      The Module Engine is designed to allow <code>eam-mes-package</code> to operate completely independently, supporting <strong>Auto-Discovery</strong> and providing a <strong>Generator CLI</strong> command to generate new modules in one command.
    </p>

    <div class="content-body">
      <h2>{{ t('engine.bodyTitle') }}</h2>
      <p>{{ t('engine.bodyDesc') }}</p>

      <h3 style="margin-top: 24px;">{{ t('engine.sec1Title') }}</h3>
      <ul v-if="!isEn">
        <li><strong><code>AbstractModuleProvider</code> (Template Method Pattern):</strong> Mọi submodule trong package (như <code>Equipment/Checklist</code>, <code>Equipment/Maintenance</code>) kế thừa lớp cơ sở này. Lớp tự động nạp <code>routes.php</code> và tự quản lý danh sách file migration trong phương thức <code>getMigrations()</code> mà không cần phụ thuộc vào Host App.</li>
        <li><strong><code>ModuleRegistry</code> (Registry Pattern):</strong> Tự động quét thư mục <code>src/Modules/*/*</code> để đăng ký các module hoạt động. Hỗ trợ bật/tắt module linh hoạt qua cấu hình <code>config('eam.modules')</code>.</li>
      </ul>
      <ul v-else>
        <li><strong><code>AbstractModuleProvider</code> (Template Method Pattern):</strong> All package submodules (such as <code>Equipment/Checklist</code>, <code>Equipment/Maintenance</code>) inherit from this base class. The class automatically loads <code>routes.php</code> and manages migration files via the <code>getMigrations()</code> method without relying on the Host App.</li>
        <li><strong><code>ModuleRegistry</code> (Registry Pattern):</strong> Automatically scans the <code>src/Modules/*/*</code> directory to register active modules. Supports dynamic module enabling/disabling via <code>config('eam.modules')</code>.</li>
      </ul>

      <div class="code-container" style="margin-top: 16px;">
        <div class="code-header">
          <span>{{ t('engine.providerHeader') }}</span>
          <button class="btn-copy" @click="handleCopy('code-abstract-provider')">{{ t('common.copy') }}</button>
        </div>
        <pre class="code-content" id="code-abstract-provider" style="color: #a1a1aa; line-height: 1.7; font-family: var(--font-mono); font-size: 13px;">
<span style="color: #f472b6;">namespace</span> Modules\Equipment\Checklist;

<span style="color: #f472b6;">use</span> Spatie\LaravelPackageTools\Modules\AbstractModuleProvider;

<span style="color: #38bdf8;">final class</span> <span style="color: #facc15;">Register</span> <span style="color: #38bdf8;">extends</span> <span style="color: #facc15;">AbstractModuleProvider</span>
{
    <span style="color: #38bdf8;">public function</span> <span style="color: #60a5fa;">getDomain</span>(): <span style="color: #38bdf8;">string</span> { <span style="color: #f472b6;">return</span> <span style="color: #4ade80;">'Equipment'</span>; }
    <span style="color: #38bdf8;">public function</span> <span style="color: #60a5fa;">getName</span>(): <span style="color: #38bdf8;">string</span> { <span style="color: #f472b6;">return</span> <span style="color: #4ade80;">'Checklist'</span>; }

    <span style="color: #38bdf8;">public function</span> <span style="color: #60a5fa;">getMigrations</span>(): <span style="color: #38bdf8;">array</span>
    {
        <span style="color: #f472b6;">return</span> [
            <span style="color: #4ade80;">'2025_08_05_113908_eamo_create_checklist_sessions_table.php'</span>,
            <span style="color: #4ade80;">'2025_08_05_113910_eamo_create_checklist_details_table.php'</span>,
        ];
    }
}</pre>
      </div>

      <h3 style="margin-top: 24px;">{{ t('engine.sec2Title') }}</h3>
      <p v-if="!isEn">
        Cho phép lập trình viên tạo nhanh bộ khung module chuẩn (Scaffolding) bao gồm Register Provider, routes.php, Eloquent Model, Migration, Form Requests, Services và CRUD Actions.
      </p>
      <p v-else>
        Allows developers to quickly scaffold standard modules including Register Provider, routes.php, Eloquent Model, Migration, Form Requests, Services, and CRUD Actions.
      </p>

      <div class="code-container" style="margin-top: 16px;">
        <div class="code-header">
          <span>{{ t('engine.cliHeader') }}</span>
          <button class="btn-copy" @click="handleCopy('code-cli-gen')">{{ t('common.copy') }}</button>
        </div>
        <pre class="code-content" id="code-cli-gen" style="color: #a1a1aa; line-height: 1.7; font-family: var(--font-mono); font-size: 13px;">
<span style="color: #60a5fa;"># {{ isEn ? '1. Generate basic module scaffolding' : '1. Sinh khung module cơ bản' }}</span>
php artisan eam:make-module Equipment Tooling

<span style="color: #60a5fa;"># {{ isEn ? '2. Generate full module with CRUD Actions, Requests and Service' : '2. Sinh khung module hoàn chỉnh kèm CRUD Actions, Requests và Service' }}</span>
php artisan eam:make-module Equipment Tooling --model=ToolingMold --crud

<span style="color: #60a5fa;"># {{ isEn ? '3. Publish module code and migrations to Host App' : '3. Xuất bản code và migration của module mới sang Host App' }}</span>
php artisan eam-mes:publish --submodule=tooling</pre>
      </div>

      <h3 style="margin-top: 24px;">{{ t('engine.sec3Title') }}</h3>
      <div class="stack-cards">
        <div class="card-item">
          <div class="card-title">{{ t('engine.cards.registerTitle') }}</div>
          <p v-if="!isEn">Tự động kế thừa <code>AbstractModuleProvider</code> và định nghĩa các endpoints RESTful API chuẩn có versioning và middleware auth.</p>
          <p v-else>Automatically inherits from <code>AbstractModuleProvider</code> and defines standard RESTful API endpoints with versioning and authentication middleware.</p>
        </div>
        <div class="card-item">
          <div class="card-title">{{ t('engine.cards.modelTitle') }}</div>
          <p v-if="!isEn">Tự động cấu hình <code>HasUuids</code>, mảng <code>$fillable</code>, <code>casts()</code> và file migration có tiền tố chuẩn <code>eamo_</code>.</p>
          <p v-else>Automatically configures <code>HasUuids</code>, <code>$fillable</code> arrays, <code>casts()</code>, and migration files with the standard <code>eamo_</code> prefix.</p>
        </div>
        <div class="card-item">
          <div class="card-title">{{ t('engine.cards.actionsTitle') }}</div>
          <p v-if="!isEn">Sinh sẵn bộ 5 Single-Action Classes (<code>Index</code>, <code>Store</code>, <code>Show</code>, <code>Update</code>, <code>Delete</code>) áp dụng <code>Lorisleiva\Actions\Concerns\AsAction</code> kèm <code>Service</code> layer độc lập.</p>
          <p v-else>Pre-generates 5 Single-Action Classes (<code>Index</code>, <code>Store</code>, <code>Show</code>, <code>Update</code>, <code>Delete</code>) using <code>Lorisleiva\Actions\Concerns\AsAction</code> alongside an independent <code>Service</code> layer.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-body {
  animation: fadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
