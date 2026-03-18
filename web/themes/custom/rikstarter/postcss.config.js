import postcssImport from 'postcss-import';
import postcssCustomMedia from 'postcss-custom-media';

export default {
  plugins: [
    // Resolve @imports first so @custom-media definitions from
    // _breakpoints.css are visible to every file, including
    // standalone component CSS files.
    postcssImport(),
    postcssCustomMedia(),
  ],
};

