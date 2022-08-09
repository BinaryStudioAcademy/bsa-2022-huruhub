import { Knex } from 'knex';

enum ColumnName {
  ID = 'id',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  NAME = 'name',
  KEY = 'key',
}

const TABLE_NAME = 'course_categories';

const courseCategories = [
  { name: 'Adobe XD', key: 'adobe_xd' },
  { name: 'After Effects', key: 'after_effects' },
  { name: 'Angular', key: 'angular' },
  { name: 'AngularJS', key: 'angularjs' },
  { name: 'Ansible', key: 'ansible' },
  { name: 'Appium', key: 'appium' },
  { name: 'Atom', key: 'atom' },
  { name: 'AWS', key: 'aws' },
  { name: 'Azure', key: 'azure' },
  { name: 'Babel', key: 'babel' },
  { name: 'barba.js', key: 'barba_js' },
  { name: 'Bash', key: 'bash' },
  { name: 'Blender', key: 'blender' },
  { name: 'C#', key: 'c_sharp' },
  { name: 'Chrome DevTools', key: 'chrome_devtools' },
  { name: 'Cinema 4D', key: 'cinema_4d' },
  { name: 'Core Data', key: 'core_data' },
  { name: 'CorelDRAW', key: 'coreldraw' },
  { name: 'CSS', key: 'css' },
  { name: 'Cypress', key: 'cypress' },
  { name: 'D3.js', key: 'd3_js' },
  { name: 'Dart and Flutter', key: 'dart_and_flutter' },
  { name: 'Deno', key: 'deno' },
  { name: 'Django', key: 'django' },
  { name: 'Docker', key: 'docker' },
  { name: 'Drupal', key: 'drupal' },
  { name: 'Elasticsearch', key: 'elasticsearch' },
  { name: 'Electron', key: 'electron' },
  { name: 'Elixir', key: 'elixir' },
  { name: 'Elm', key: 'elm' },
  { name: 'Ember', key: 'ember' },
  { name: 'Figma', key: 'figma' },
  { name: 'Firebase', key: 'firebase' },
  { name: 'Flux', key: 'flux' },
  { name: 'Gatsby', key: 'gatsby' },
  { name: 'Git', key: 'git' },
  { name: 'GitHub', key: 'github' },
  { name: 'Gitlab', key: 'gitlab' },
  { name: 'Golang (Google Go)', key: 'golang' },
  { name: 'Google Cloud', key: 'google_cloud' },
  { name: 'Grafana', key: 'grafana' },
  { name: 'GraphQL', key: 'graphql' },
  { name: 'Grep', key: 'grep' },
  { name: 'Grunt', key: 'grunt' },
  { name: 'Gulp', key: 'gulp' },
  { name: 'Hibernate ORM', key: 'hibernate_orm' },
  { name: 'HTML', key: 'html' },
  { name: 'Illustrator', key: 'illustrator' },
  { name: 'Ionic', key: 'ionic' },
  { name: 'Java', key: 'java' },
  { name: 'JavaScript', key: 'javascript' },
  { name: 'Jenkins', key: 'jenkins' },
  { name: 'Joomla', key: 'joomla' },
  { name: 'JQuery', key: 'jquery' },
  { name: 'Kubernetes', key: 'kubernetes' },
  { name: 'Laravel', key: 'laravel' },
  { name: 'Lightroom', key: 'lightroom' },
  { name: 'Magento', key: 'magento' },
  { name: 'MODX', key: 'modx' },
  { name: 'MongoDB', key: 'mongodb' },
  { name: 'NativeScript', key: 'nativescript' },
  { name: 'NestJS', key: 'nestjs' },
  { name: 'Next.js', key: 'next_js' },
  { name: 'Node.js', key: 'node_js' },
  { name: 'NPM', key: 'npm' },
  { name: 'OpenCart', key: 'opencart' },
  { name: 'OpenCV', key: 'opencv' },
  { name: 'OpenGL Shading Language (GLSL)', key: 'opengl_shading_language' },
  { name: 'Phoenix', key: 'phoenix' },
  { name: 'Photoshop', key: 'photoshop' },
  { name: 'PHP', key: 'php' },
  { name: 'PhpStorm', key: 'phpstorm' },
  { name: 'Playwright', key: 'playwright' },
  { name: 'Postman', key: 'postman' },
  { name: 'Progressive Web App (PWA)', key: 'progressive_web_app' },
  { name: 'Protractor', key: 'protractor' },
  { name: 'Python', key: 'python' },
  { name: 'React Native', key: 'react_native' },
  { name: 'React.js', key: 'react_js' },
  { name: 'Redis', key: 'redis' },
  { name: 'Ruby', key: 'ruby' },
  { name: 'Ruby on Rails', key: 'ruby_on_rails' },
  { name: 'Rust', key: 'rust' },
  { name: 'RxJS', key: 'rxjs' },
  { name: 'Salt', key: 'salt' },
  { name: 'Scala', key: 'scala' },
  { name: 'Selenium', key: 'selenium' },
  { name: 'SEO', key: 'seo' },
  { name: 'Shopify', key: 'shopify' },
  { name: 'Silex', key: 'silex' },
  { name: 'single-spa', key: 'single_spa' },
  { name: 'Sketch', key: 'sketch' },
  { name: 'Slim', key: 'slim' },
  { name: 'Socket.IO', key: 'socket_io' },
  { name: 'Spring', key: 'spring' },
  { name: 'Spring Boot', key: 'spring_boot' },
  { name: 'Spring Cloud', key: 'spring_cloud' },
  { name: 'Spring Data', key: 'spring_data' },
  { name: 'Spring HATEOAS', key: 'spring_hateoas' },
  { name: 'Spring Integration', key: 'spring_integration' },
  { name: 'Spring MVC', key: 'spring_mvc' },
  { name: 'Spring Security', key: 'spring_security' },
  { name: 'SQL', key: 'sql' },
  { name: 'Svelte', key: 'svelte' },
  { name: 'SVN', key: 'svn' },
  { name: 'Swift', key: 'swift' },
  { name: 'Symfony', key: 'symfony' },
  { name: 'Terraform', key: 'terraform' },
  { name: 'Three.js', key: 'three_js' },
  { name: 'TypeScript', key: 'typescript' },
  { name: 'Unity', key: 'unity' },
  { name: 'Video/3D', key: 'video_3d' },
  { name: 'VIM', key: 'vim' },
  { name: 'Visual Studio Code', key: 'visual_studio_code' },
  { name: 'Vue', key: 'vue' },
  { name: 'WebAssembly', key: 'webassembly' },
  { name: 'WebdriverIO', key: 'webdriverio' },
  { name: 'Webflow', key: 'webflow' },
  { name: 'WebGL', key: 'webgl' },
  { name: 'Webpack', key: 'webpack' },
  { name: 'WebRTC', key: 'webrtc' },
  { name: 'Wordpress', key: 'wordpress' },
  { name: 'Xamarin', key: 'xamarin' },
  { name: 'Yarn', key: 'yarn' },
  { name: 'Yii', key: 'yii' },
  { name: 'ZBrush', key: 'zbrush' },
  { name: 'dApps/Web 3', key: 'dapps_web_3' },
  { name: 'Blockchain', key: 'blockchain' },
  { name: 'Backend', key: 'backend' },
  { name: 'Frontend', key: 'frontend' },
  { name: 'Gamedev', key: 'gamedev' },
  { name: 'Graphic', key: 'graphic' },
  { name: 'Marketing', key: 'marketing' },
  { name: 'QA', key: 'qa' },
  { name: 'System', key: 'system' },
  { name: 'Tools', key: 'tools' },
  { name: 'Mobile apps development', key: 'mobile_apps_development' },
  { name: 'Information security', key: 'information_security' },
  { name: 'Conferences', key: 'conferences' },
  { name: 'Cryptocurrency', key: 'cryptocurrency' },
  { name: 'Data processing and analysis', key: 'data_processing_and_analysis' },
  { name: 'Interview preparation', key: 'interview_preparation' },
  { name: 'Ethical hacking', key: 'ethical_hacking' },
];

async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).unique().notNullable();
    table.string(ColumnName.KEY).unique().notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
  await knex(TABLE_NAME).insert(courseCategories);
}

async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { up, down };
