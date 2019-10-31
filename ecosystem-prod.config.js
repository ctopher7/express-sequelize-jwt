module.exports = {
    apps : [{
      name: 'API',
      script: 'bin/www',
      instances: 0,
      exec_mode:'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }]
  };
  