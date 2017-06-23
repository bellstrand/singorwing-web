import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function fontAwesome() {
    return gulp.src(`${project.paths.fa}/css/*.min.css`)
        .pipe(changedInPlace({ firstPass: true }))
        .pipe(build.bundle());
};
