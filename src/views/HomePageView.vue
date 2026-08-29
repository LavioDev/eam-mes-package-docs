<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { useLocale } from '../composables/useLocale'

const { isDark } = useTheme()
const { t } = useLocale()

const email = 'khanhnd05@gmail.com'
const composerCmd = 'composer require lavio/eam-mes-package'

const emailCopied = ref(false)
const composerCopied = ref(false)

const copyText = (text: string, flagRef: { value: boolean }) => {
  navigator.clipboard.writeText(text).then(() => {
    flagRef.value = true
    setTimeout(() => { flagRef.value = false }, 2000)
  })
}
</script>

<template>
  <div class="page">

    <!-- ─── Background decoration ─────────────────────────────────────── -->
    <div class="bg-grid" />
    <div class="glow glow-top" />
    <div class="glow glow-bottom" />

    <!-- ═══════════════════════════════════════════════════════════════════
         HERO
    ════════════════════════════════════════════════════════════════════ -->
    <section class="hero">
      <div class="page-container hero-content">

        <!-- Main headline -->
        <h1 class="headline">
          {{ t('landing.hero.title') }}<br>
          <span class="headline-accent">{{ t('landing.hero.titleHighlight') }}</span>
        </h1>

        <!-- CTA row -->
        <div class="cta-row">
          <RouterLink to="/docs/overview" class="btn-primary">
            {{ t('landing.hero.btnDocs') }}
            <svg viewBox="0 0 20 20" fill="currentColor" class="btn-arrow"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"/></svg>
          </RouterLink>

          <a href="https://github.com/LavioDev/eam-mes-package" target="_blank" rel="noopener noreferrer" class="btn-secondary">
            <svg class="gh-icon" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            {{ t('landing.hero.btnRepo') }}
          </a>
        </div>

        <!-- Install bar -->
        <div class="install-bar">
          <span class="install-dollar">$</span>
          <code class="install-cmd">{{ composerCmd }}</code>
          <button
            class="install-copy"
            :class="{ copied: composerCopied }"
            @click="copyText(composerCmd, composerCopied as any)"
            :title="composerCopied ? t('landing.hero.copied') : t('landing.hero.copy')"
          >
            <svg v-if="!composerCopied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {{ composerCopied ? t('landing.hero.copied') : t('landing.hero.copy') }}
          </button>
        </div>

      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FEATURED PACKAGE
    ════════════════════════════════════════════════════════════════════ -->
    <section class="package-section">
      <div class="page-container">
        <div class="package-card">

          <div class="package-card-header">
            <div class="card-eyebrow-row">
              <span class="chip chip-cyan">{{ t('landing.featured.badge') }}</span>
              <span class="version-tag">{{ t('landing.featured.version') }}</span>
            </div>

            <!-- Product header -->
            <div class="product-row">
              <div>
                <h2 class="product-name">{{ t('landing.featured.title') }}</h2>
                <code class="product-pkg">lavio/eam-mes-package</code>
              </div>
            </div>

            <p class="package-summary">
              {{ t('landing.featured.summary') }}
            </p>
          </div>

          <!-- Feature grid (2x2) -->
          <div class="package-feature-grid">
            <div class="feature-card">
              <div class="feature-icon-box">
                <svg class="check" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg>
              </div>
              <div class="feature-info">
                <h4 class="feature-heading">{{ t('landing.featured.f1Title') }}</h4>
                <p class="feature-text">{{ t('landing.featured.f1Desc') }}</p>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box">
                <svg class="check" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg>
              </div>
              <div class="feature-info">
                <h4 class="feature-heading">{{ t('landing.featured.f2Title') }}</h4>
                <p class="feature-text">{{ t('landing.featured.f2Desc') }}</p>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box">
                <svg class="check" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg>
              </div>
              <div class="feature-info">
                <h4 class="feature-heading">{{ t('landing.featured.f3Title') }}</h4>
                <p class="feature-text">{{ t('landing.featured.f3Desc') }}</p>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-icon-box">
                <svg class="check" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"/></svg>
              </div>
              <div class="feature-info">
                <h4 class="feature-heading">{{ t('landing.featured.f4Title') }}</h4>
                <p class="feature-text">{{ t('landing.featured.f4Desc') }}</p>
              </div>
            </div>
          </div>

          <!-- Bottom bar with chips & CTA links -->
          <div class="package-footer-bar">
            <div class="package-chips">
              <span class="skill-chip">Laravel</span>
              <span class="skill-chip">PHP</span>
              <span class="skill-chip">Vue 3</span>
              <span class="skill-chip">EAM / MES</span>
              <span class="skill-chip">REST API</span>
              <span class="skill-chip">PostgreSQL</span>
            </div>

            <div class="card-actions">
              <a href="https://github.com/LavioDev/eam-mes-package" target="_blank" rel="noopener noreferrer" class="card-link">
                <svg class="gh-icon-sm" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                {{ t('landing.featured.btnGithub') }}
                <svg viewBox="0 0 20 20" fill="currentColor" class="link-arrow"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"/></svg>
              </a>
              <RouterLink to="/docs/overview" class="card-link card-link-docs">
                {{ t('landing.featured.btnDocs') }}
                <svg viewBox="0 0 20 20" fill="currentColor" class="link-arrow"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd"/></svg>
              </RouterLink>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         CONTACT / OUTSOURCE CTA
    ════════════════════════════════════════════════════════════════════ -->
    <section id="contact" class="contact-section">
      <div class="page-container">
        <div class="contact-panel">

          <!-- Header -->
          <div class="contact-head">
            <span class="chip chip-blue">{{ t('landing.contact.badge') }}</span>
            <h2 class="contact-title">
              {{ t('landing.contact.title') }}
            </h2>
            <p class="contact-sub">
              {{ t('landing.contact.sub') }}
              <a href="https://github.com/LavioDev" target="_blank" rel="noopener noreferrer" class="contact-author-link">LavioDev</a>.<br>
              {{ t('landing.contact.subRest') }}
            </p>
          </div>

          <!-- Two service cards -->
          <div class="service-grid">
            <div class="service-card">
              <div class="service-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              </div>
              <h3 class="service-title">{{ t('landing.contact.s1Title') }}</h3>
              <p class="service-desc">
                {{ t('landing.contact.s1Desc') }}
              </p>
            </div>

            <div class="service-card">
              <div class="service-icon-wrap service-icon-cyan">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 class="service-title">{{ t('landing.contact.s2Title') }}</h3>
              <p class="service-desc">
                {{ t('landing.contact.s2Desc') }}
              </p>
            </div>
          </div>

          <!-- Email action bar -->
          <div class="email-bar">
            <div class="email-info">
              <span class="email-label">{{ t('landing.contact.emailLabel') }}</span>
              <div class="email-display">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="email-icon">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span class="email-addr">{{ email }}</span>
              </div>
            </div>

            <div class="email-actions">
              <a
                :href="`mailto:${email}?subject=Inquiry%20%E2%80%94%20EAM%20MES%20Package`"
                class="btn-primary btn-sm"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="send-icon">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                {{ t('landing.contact.btnSendEmail') }}
              </a>
              <a
                href="https://github.com/LavioDev"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary btn-sm"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" class="gh-icon-sm">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                github.com/LavioDev
              </a>
              <button
                class="btn-secondary btn-sm"
                :class="{ 'btn-copied': emailCopied }"
                @click="copyText(email, emailCopied as any)"
              >
                <svg v-if="!emailCopied" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="copy-icon">
                  <rect x="9" y="9" width="13" height="13" rx="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="copy-icon">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {{ emailCopied ? t('landing.contact.btnCopiedEmail') : t('landing.contact.btnCopyEmail') }}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════════════════
         FOOTER
    ════════════════════════════════════════════════════════════════════ -->
    <footer class="site-footer">
      <div class="page-container footer-inner">
        <div class="footer-cols">
          <div class="footer-col">
            <span class="footer-brand">EAM MES PACKAGE</span>
            <p class="footer-copy">
              {{ t('landing.footer.brandDesc') }}
            </p>
          </div>

          <div class="footer-col">
            <h5 class="footer-heading">{{ t('landing.footer.colPackage') }}</h5>
            <ul class="footer-links">
              <li><RouterLink to="/docs/overview">{{ t('landing.footer.linkOverview') }}</RouterLink></li>
              <li><RouterLink to="/docs/database">{{ t('landing.footer.linkDatabase') }}</RouterLink></li>
              <li><RouterLink to="/docs/module-engine">{{ t('landing.footer.linkEngine') }}</RouterLink></li>
              <li><RouterLink to="/docs/apis">{{ t('landing.footer.linkApis') }}</RouterLink></li>
              <li><RouterLink to="/docs/deployment">{{ t('landing.footer.linkDeploy') }}</RouterLink></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5 class="footer-heading">{{ t('landing.footer.colSchema') }}</h5>
            <ul class="footer-links">
              <li><RouterLink to="/docs/schema/class">{{ t('landing.footer.linkSchemaClass') }}</RouterLink></li>
              <li><RouterLink to="/docs/schema/api">{{ t('landing.footer.linkSchemaApi') }}</RouterLink></li>
              <li><RouterLink to="/docs/schema/generator">{{ t('landing.footer.linkSchemaGen') }}</RouterLink></li>
              <li><RouterLink to="/docs/schema/api-generator">{{ t('landing.footer.linkSchemaApiGen') }}</RouterLink></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5 class="footer-heading">{{ t('landing.footer.colContact') }}</h5>
            <ul class="footer-links">
              <li><a href="https://github.com/LavioDev" target="_blank" rel="noopener noreferrer">{{ t('landing.footer.linkLavioProfile') }}</a></li>
              <li><a href="https://github.com/LavioDev/eam-mes-package" target="_blank" rel="noopener noreferrer">{{ t('landing.footer.linkPackageRepo') }}</a></li>
              <li><a :href="`mailto:${email}`">{{ email }}</a></li>
              <li><a href="#contact">{{ t('landing.footer.linkOutsource') }}</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <span class="footer-legal">
            {{ t('landing.footer.builtBy') }} <a href="https://github.com/LavioDev" target="_blank" rel="noopener noreferrer">LavioDev</a>.
            {{ t('landing.footer.commercialLicense') }}
          </span>
          <div class="footer-bottom-links">
            <RouterLink to="/docs/overview">{{ t('landing.footer.docs') }}</RouterLink>
            <a href="https://github.com/LavioDev/eam-mes-package" target="_blank" rel="noopener noreferrer">{{ t('landing.footer.github') }}</a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* ─── Reset & Layout ──────────────────────────────────────────────────── */
.page {
  position: relative;
  width: 100%;
  background: var(--bg-body);
  color: var(--text-primary);
  overflow-x: hidden;
}

.page-container {
  max-width: 1280px; /* 7xl */
  margin: 0 auto;
  padding: 0 32px;
  display: block !important;
}

/* ─── Background decoration ───────────────────────────────────────────── */
.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.07) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
  z-index: 0;
}

.glow {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(120px);
}

.glow-top {
  top: -160px;
  left: 50%;
  transform: translateX(-50%);
  width: 860px;
  height: 500px;
  background: radial-gradient(ellipse, rgba(37, 99, 235, 0.18) 0%, transparent 70%);
}

.glow-bottom {
  bottom: 0;
  right: -200px;
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(14, 165, 233, 0.10) 0%, transparent 70%);
}

/* ─── HERO ────────────────────────────────────────────────────────────── */
.hero {
  position: relative;
  z-index: 1;
  padding: 104px 0 88px;
  text-align: center;
}

.hero-content {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

/* Headline */
.headline {
  font-size: 58px;
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.035em;
  color: var(--text-primary);
  margin: 0 auto 36px;
  max-width: 980px;
}

.headline-accent {
  background: linear-gradient(135deg, #2563eb 0%, #38bdf8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* CTA row */
.cta-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}

/* Install bar */
.install-bar {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px 10px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: var(--shadow-sm);
  max-width: 560px;
  width: 100%;
}

.install-dollar {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
  color: #2563eb;
  user-select: none;
  flex-shrink: 0;
}

.install-cmd {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: none;
  border: none;
  padding: 0;
}

.install-copy {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  background: var(--bg-muted);
  border: 1px solid var(--border-color);
  border-radius: 2px;
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
  white-space: nowrap;
}

.install-copy svg {
  width: 13px;
  height: 13px;
}

.install-copy:hover {
  color: var(--text-primary);
  border-color: var(--border-hover);
  background: var(--bg-hover);
}

.install-copy.copied {
  color: #16a34a;
  border-color: rgba(22, 163, 74, 0.3);
}

/* ─── BUTTONS ─────────────────────────────────────────────────────────── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #2563eb;
  color: #fff;
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.15s ease;
  box-shadow: 0 1px 2px rgba(37, 99, 235, 0.3);
  border: 1px solid #2563eb;
  cursor: pointer;
}

.btn-primary:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
  transform: translateY(-1px);
}

.btn-primary.btn-sm {
  padding: 8px 18px;
  font-size: 13px;
  border-radius: 3px;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: -0.01em;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  text-decoration: none;
  transition: all 0.15s ease;
  cursor: pointer;
}

.btn-secondary:hover {
  background: var(--bg-hover);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.btn-secondary.btn-sm {
  padding: 8px 16px;
  font-size: 13px;
  border-radius: 3px;
}

.btn-secondary.btn-copied {
  color: #16a34a;
  border-color: rgba(22, 163, 74, 0.3);
}

.btn-arrow { width: 16px; height: 16px; transition: transform 0.2s ease; }
.btn-primary:hover .btn-arrow { transform: translateX(2px); }

.gh-icon { width: 16px; height: 16px; }

/* ─── PACKAGE SECTION ─────────────────────────────────────────────────── */
.package-section {
  position: relative;
  z-index: 1;
  padding: 0 0 96px;
}

.package-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 40px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.package-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
}

/* Eyebrow & header */
.package-card-header {
  margin-bottom: 28px;
}

.card-eyebrow-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.chip {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: 2px;
}

.chip-blue {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.25);
}

.chip-cyan {
  color: #0284c7;
  background: rgba(2, 132, 199, 0.08);
  border: 1px solid rgba(2, 132, 199, 0.25);
}

.version-tag {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  font-family: var(--font-mono);
  background: var(--bg-muted);
  padding: 3px 8px;
  border-radius: 2px;
  border: 1px solid var(--border-color);
}

/* Product header internals */
.product-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.product-icon {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.product-icon svg {
  width: 24px;
  height: 24px;
}

.product-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin: 0 0 4px;
  border: none;
  padding: 0;
  line-height: 1.3;
}

.product-pkg {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-muted);
  background: none;
  border: none;
  padding: 0;
}

.package-summary {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
  max-width: 960px;
}

/* Feature grid */
.package-feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
  background: var(--bg-card-alt);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

.feature-card:hover {
  border-color: var(--border-hover);
  background: var(--bg-hover);
}

.feature-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 2px;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #16a34a;
  flex-shrink: 0;
  margin-top: 1px;
}

.feature-icon-box .check {
  width: 15px;
  height: 15px;
}

.feature-info {
  flex: 1;
}

.feature-heading {
  font-size: 14px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 3px;
  line-height: 1.4;
}

.feature-text {
  font-size: 13px;
  line-height: 1.55;
  color: var(--text-secondary);
  margin: 0;
}

/* Footer bar & chips */
.package-footer-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.package-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-muted);
  border: 1px solid var(--border-color);
  padding: 3px 10px;
  border-radius: 2px;
}

/* Card links */
.card-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}

.card-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
  transition: all 0.15s ease;
}

.card-link:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.card-link-docs {
  color: var(--text-secondary);
}

.card-link-docs:hover {
  color: var(--text-primary);
}

.gh-icon-sm { width: 15px; height: 15px; flex-shrink: 0; }
.link-arrow { width: 14px; height: 14px; transition: transform 0.15s ease; }
.card-link:hover .link-arrow { transform: translateX(2px); }

/* ─── CONTACT SECTION ─────────────────────────────────────────────────── */
.contact-section {
  position: relative;
  z-index: 1;
  padding: 0 0 112px;
}

.contact-panel {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 56px 52px;
  box-shadow: var(--shadow-sm);
}

.contact-head {
  text-align: center;
  max-width: 680px;
  margin: 0 auto 48px;
}

.contact-title {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin: 16px 0 16px;
  border: none;
  padding: 0;
  line-height: 1.15;
}

.contact-sub {
  font-size: 15.5px;
  line-height: 1.75;
  color: var(--text-secondary);
  margin: 0 auto;
  max-width: 640px;
}

.contact-author-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.25);
  padding: 1px 7px;
  border-radius: 3px;
  font-family: var(--font-mono);
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
  line-height: 1.4;
  vertical-align: baseline;
  transition: all 0.15s ease;
}

.contact-author-link:hover {
  background: rgba(37, 99, 235, 0.15);
  border-color: #2563eb;
  color: #1d4ed8;
  text-decoration: none;
}

/* Service grid */
.service-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 36px;
}

.service-card {
  background: var(--bg-card-alt);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 24px;
}

.service-icon-wrap {
  width: 38px;
  height: 38px;
  border-radius: 3px;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.2);
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.service-icon-wrap svg {
  width: 18px;
  height: 18px;
}

.service-icon-cyan {
  background: rgba(2, 132, 199, 0.08);
  border-color: rgba(2, 132, 199, 0.2);
  color: #0284c7;
}

.service-title {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
  letter-spacing: -0.01em;
}

.service-desc {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--text-secondary);
  margin: 0;
}

/* Email bar */
.email-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  background: var(--bg-card-alt);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 20px 24px;
}

.email-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.email-label {
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--text-muted);
}

.email-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.email-icon {
  width: 15px;
  height: 15px;
  color: #2563eb;
}

.email-addr {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.email-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.send-icon { width: 14px; height: 14px; }
.copy-icon { width: 14px; height: 14px; }

/* ─── FOOTER ──────────────────────────────────────────────────────────── */
.site-footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--border-color);
  background: var(--bg-card-alt);
  padding: 64px 0 40px;
}

.footer-inner {
  /* inherits .page-container */
}

.footer-cols {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 48px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.footer-brand {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--text-primary);
  display: block;
  margin-bottom: 10px;
}

.footer-copy {
  font-size: 13px;
  line-height: 1.65;
  color: var(--text-muted);
  margin: 0;
}

.footer-heading {
  font-size: 11.5px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.footer-links a,
.footer-links :deep(a) {
  font-size: 13.5px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.15s ease;
  display: inline-block;
}

.footer-links a:hover,
.footer-links :deep(a):hover {
  color: #2563eb;
}

.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.footer-legal {
  font-size: 13px;
  color: var(--text-muted);
}

.footer-legal a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-legal a:hover {
  color: #2563eb;
}

.footer-bottom-links {
  display: flex;
  gap: 20px;
}

.footer-bottom-links a,
.footer-bottom-links :deep(a) {
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-bottom-links a:hover,
.footer-bottom-links :deep(a):hover {
  color: #2563eb;
}

/* ─── RESPONSIVE ──────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
  .headline { font-size: 44px; }
  .footer-cols { grid-template-columns: 1fr 1fr; gap: 28px; }
  .contact-panel { padding: 44px 36px; }
}

@media (max-width: 768px) {
  .page-container { padding: 0 20px; }
  .hero { padding: 88px 0 72px; }
  .headline { font-size: 34px; line-height: 1.32; }
  .subline { font-size: 15.5px; line-height: 1.75; }
  .install-bar { max-width: 100%; }
  .install-cmd { font-size: 11.5px; }
  .package-card { padding: 24px 20px; }
  .package-feature-grid { grid-template-columns: 1fr; }
  .package-footer-bar { flex-direction: column; align-items: flex-start; gap: 16px; }
  .contact-panel { padding: 36px 24px; }
  .contact-title { font-size: 28px; }
  .service-grid { grid-template-columns: 1fr; }
  .email-bar { flex-direction: column; align-items: flex-start; }
  .footer-cols { grid-template-columns: 1fr; gap: 24px; }
  .footer-bottom { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 480px) {
  .headline { font-size: 28px; line-height: 1.35; }
  .cta-row { flex-direction: column; align-items: stretch; }
  .btn-primary, .btn-secondary { justify-content: center; }
}
</style>
