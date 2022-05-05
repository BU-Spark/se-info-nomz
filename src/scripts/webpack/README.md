# How to webpack your js files that require external packages:

1. The js file that you are trying to pack should be in the 'se-info-nomz/src/scripts/webpack/src' folder.
2. Edit the 'webpack.config.js' to add an output (if it doesn't already exist), using the code skeleton below. You only need to replace the <filename> in the skeleton below, then paste it at the bottom of the 'webpack.config.js' file (look at the file for exact syntax).

{
    entry: './src/<filename>.js',
    output: {
        filename: '<filename>.js',
        path: path.resolve(__dirname, '..'),
    },
};

3. Finally, run the following command 'npx webpack --config .\webpack.config.js' to pack all of your files and put them into the 'se-info-nomz/src/scripts' folder.