const env = {};

if (process.env.NODE_ENV === 'production') {
    env.NODE_ENV = '"production"';
} else {
    env.NODE_ENV = '"development"';
}

module.exports = env;
