module.exports = () => {
    return {
        tsApp: "./src/app.ts",
        dist: "./dist",
        jsApp: "app.js",
        tsFiles: './src/**/*.ts',
        typings: "./typings/**/*d.ts",
        ngTypings: "./node_modules/@angular/**/*.ts",
        dest: "./src/"
    };
};