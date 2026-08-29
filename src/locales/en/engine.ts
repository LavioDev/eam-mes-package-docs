export default {
  title: 'Module Engine & Generator CLI',
  subtitle: 'The Module Engine is designed to allow {pkg} to operate completely independently, supporting {autoDiscovery} and providing a {cli} command to generate new modules in one command.',
  autoDiscovery: 'Auto-Discovery',
  cli: 'Generator CLI',
  bodyTitle: 'Module Engine, Auto-Discovery & Generator CLI',
  bodyDesc: 'Internal architecture and operating mechanism of the Module Engine:',
  sec1Title: '1. Independent Architecture & Auto-Discovery',
  abstractProviderDesc: 'All package submodules (such as {submodules}) inherit from this base class. The class automatically loads {routes} and manages migration files via the {method} method without relying on the Host App.',
  moduleRegistryDesc: 'Automatically scans the {dir} directory to register active modules. Supports dynamic module enabling/disabling via {config}.',
  providerHeader: 'Module Provider Declaration (`Register.php`)',
  sec2Title: '2. Generator CLI (`php artisan eam:make-module`)',
  cliDesc: 'Allows developers to quickly scaffold standard modules including Register Provider, routes.php, Eloquent Model, Migration, Form Requests, Services, and CRUD Actions.',
  cliHeader: 'Generator CLI Commands in Terminal',
  sec3Title: '3. Auto-Generated Scaffolding Structure',
  cards: {
    registerTitle: 'Register.php & routes.php',
    registerDesc: 'Automatically inherits from AbstractModuleProvider and defines standard RESTful API endpoints with versioning and authentication middleware.',
    modelTitle: 'Eloquent Model & Migration',
    modelDesc: 'Automatically configures HasUuids, $fillable arrays, casts(), and migration files with the standard eamo_ prefix.',
    actionsTitle: 'Actions & Service Layer (--crud)',
    actionsDesc: 'Pre-generates 5 Single-Action Classes (Index, Store, Show, Update, Delete) using Lorisleiva\\Actions\\Concerns\\AsAction alongside an independent Service layer.'
  }
}
