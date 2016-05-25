import gulp from 'gulp';
import gutil from 'gulp-util';
import less from 'gulp-less';
import rename from 'gulp-rename';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import yargs from 'yargs';

const args = yargs
    .options({
        pack: {
            alias: 'min',
            describe: 'uglify code',
            boolean: true
        }
    }).argv;

if (args.pack) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, mangle: false}));
}

const compiler = webpack(webpackConfig);

gulp.task('js', (callback) => {
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


gulp.task('js-watch', () => {
    compiler.watch({
        aggregateTimeout: 300,
        poll: true
    }, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({
            chunks: false,
            colors: true
        }));
    });
});

gulp.task('less', () => {
    const errorHandling = function(err) {
        // Handle less errors, but do not stop watch task
        gutil.log(gutil.colors.red.bold('[Less error]'));
        gutil.log(`${gutil.colors.bgRed('filename:')} ${err.filename}`);
        gutil.log(`${gutil.colors.bgRed('lineNumber:')} ${err.lineNumber}`);
        gutil.log(`${gutil.colors.bgRed('extract:')} ${err.extract.join(' ')}`);
        this.emit('end');
    };

    gulp.src('./source/less/theme-green-leaf.less')
        .pipe(less())
        .on('error', errorHandling)
        .pipe(rename('theme-green-leaf.css'))
        .pipe(gulp.dest('./lib'));

    gulp.src('./source/less/theme-white-bill.less')
        .pipe(less())
        .on('error', errorHandling)
        .pipe(rename('theme-white-bill.css'))
        .pipe(gulp.dest('./lib'));

    gulp.src('./source/less/theme-dark-star.less')
        .pipe(less())
        .on('error', errorHandling)
        .pipe(rename('theme-dark-star.css'))
        .pipe(gulp.dest('./lib'));

    return gulp.src('./source/less/base-style.less')
        .pipe(less())
        .on('error', errorHandling)
        .pipe(rename('chat-ui.css'))
        .pipe(gulp.dest('./lib'));
});

gulp.task('less-watch', () => {
    gulp.watch('./source/less/**/*.less', ['less']);
});

gulp.task('build', ['js', 'less']);
gulp.task('watch', ['js-watch', 'less', 'less-watch']);
