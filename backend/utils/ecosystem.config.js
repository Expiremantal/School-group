module.exports = {
    apps: [{
        name: 'shortlistpro-server',
        script: './index.js',
        instances: 1,
        autorestart: true,
        watch: true,
        max_memory_restart: '500M',
        env: {
            NODE_ENV: 'production',
            PORT: 8000,
        },
        exp_backoff_restart_delay: 100 // Delay restart by 100ms if the process crashes
    }]
};
