import gulp from 'gulp';
import gutil from 'gulp-util';
import less from 'gulp-less';
import rename from 'gulp-rename';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import yargs from 'yargs';

var args = yargs
    .options({
        'pack': {
            alias: 'min',
            describe: 'uglify code',
            boolean: true
        }
    }).argv;

if (args.pack) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, mangle: false}));
}

const compiler = webpack(webpackConfig);

gulp.task('js', function(callback) {
    function report(resolve, err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({
            chunks: false,
            colors: true
        }));

        resolve();
    }

    Promise.all([
        new Promise(function(resolve) {
            compiler.run(report.bind(null, resolve));
        })
    ]).then(function() {
        callback();
    });
});


gulp.task('js-watch', function() {
    compiler.watch({
        aggregateTimeout: 300,
        poll: true
    }, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({
            chunks: false,
            colors: true
        }));
    });
});

gulp.task('less', function() {
    return gulp.src('./source/less/styles.less')
        .pipe(less())
        .on('error', function(err) {
            // Handle less errors, but do not stop watch task
            gutil.log(gutil.colors.red.bold('[Less error]'));
            gutil.log(gutil.colors.bgRed('filename:') +' '+ err.filename);
            gutil.log(gutil.colors.bgRed('lineNumber:') +' '+ err.lineNumber);
            gutil.log(gutil.colors.bgRed('extract:') +' '+ err.extract.join(' '));
            this.emit('end');
        })
        .pipe(rename('chat-ui.css'))
        .pipe(gulp.dest('./lib'));
});

gulp.task('less-watch', () => {
    gulp.watch('./source/less/**/*.less', ['less']);
});

gulp.task('build', ['js', 'less']);
gulp.task('watch', ['js-watch', 'less', 'less-watch']);
