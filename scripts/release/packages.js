const root = process.cwd();

module.exports = {
    root: `${root}/`,
    release: `${root}/.release/`,
    files: [
        'dist/', 'types/',
        'cronjob.js', 'index.js',
        'CHANGELOG.md', 'LICENSE', 'README.md',
        'package.json'
    ]
};
