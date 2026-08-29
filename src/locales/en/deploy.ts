export default {
  title: 'Package Deployment Guide',
  subtitle: 'Detailed step-by-step instructions to integrate the package into Laravel host projects and publish required resources:',
  envReqTitle: 'Environment Requirements',
  envReqDesc: 'Ensure your project uses {laravel} and {php}. This Laravel package requires UUID primary keys across all database tables.',
  step1: {
    title: 'Install the Package',
    desc: 'Add the repository declaration and package requirement to your composer.json file:',
    updateDesc: 'Then run the composer update command to install:'
  },
  step2: {
    title: 'Publish Main Configuration File',
    desc: 'The master configuration file will be published from vendor to config/eam.php to manage table whitelists, middlewares, and registered extension classes:'
  },
  step3: {
    title: 'Publish Core Submodule',
    desc: 'The Core Submodule contains the dynamic schema extension tracking table (eamo_extension_requests). This is an essential foundation for system operations and data synchronization:'
  },
  step4: {
    title: 'Publish Masterdata Equipment Module',
    desc: 'Defines base equipment data structures (eamo_equipment, eamo_equipment_categories, eamo_equipment_states, eamo_equipment_images, eamo_equipment_parameters, and eamo_equipment_errors) establishing the relationship foundation for all operations:'
  },
  step5: {
    title: 'Publish Other Business Modules & Submodules',
    desc: 'You can publish all modules and submodules simultaneously, or select specific submodules according to your project requirements:'
  },
  step6: {
    title: 'Execute Database Migrations',
    desc: 'Creates the eamo_* database tables in your database:'
  },
  warningTitle: 'Migration Precaution',
  warningDesc: 'Ensure you have taken a full database backup before executing php artisan migrate in production environments.'
}
