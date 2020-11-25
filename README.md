# ZZRPER

[![NPM version](https://img.shields.io/npm/v/@jyunzn/zzrper?color=red&style=plastic)](https://www.npmjs.com/package/@jyunzn/zzrper) 
[![GITHUB LICENSE](https://img.shields.io/github/license/jyunzn/zzrper?color=orange&style=plastic)](https://github.com/jyunzn/zzrper/blob/master/LICENSE)
[![NPM size](https://img.shields.io/bundlephobia/min/@jyunzn/zzrper?color=yellow&style=plastic)](https://www.npmjs.com/package/@jyunzn/zzrper)
[![GITHUB issues](https://img.shields.io/github/issues/jyunzn/zzrper?color=green&style=plastic)](https://github.com/jyunzn/zzrper/issues)
[![GITHUB TOP LAN](https://img.shields.io/github/languages/top/jyunzn/zzrper?color=blue&style=plastic)](https://github.com/jyunzn/zzrper)

<p>
  <code>ZZRPER is a plugin of <a href="https://www.npmjs.com/package/@jyunzn/zz">@jyunzn/zz calendar library</a>, its full name is <strong>ZZ Range Picker</strong>, which provides the function of <strong>selecting the range of days</strong>.</code>
</p>


## Installation

This plugin depends on **[@jyunzn/zz](https://www.npmjs.com/package/@jyunzn/zz)**, so **@jyunzn/zz** must also be imported

### npm

```bash
npm install @jyunzn/zz @jyunzn/zzrper
```

- **commonJS**

  ```javascript
  const zz = require('@jyunzn/zz')
  const zzrper = require('@jyunzn/zzrper')
  ```

- **ES module**

  ```javascript
  import zz from '@jyunzn/zz'
  import zzrper from '@jyunzn/zzrper'
  ```

### CDN
- **unpkg**

  ```html
  <script src="https://unpkg.com/@jyunzn/zz"></script>
  <script src="https://unpkg.com/@jyunzn/zzrper"></script>
  ```

- **jsdelivr ( npm )**

  ```html
  <script src="https://cdn.jsdelivr.net/npm/@jyunzn/zz"></script>
  <script src="https://cdn.jsdelivr.net/npm/@jyunzn/zzrper"></script>
  ```

- **jsdelivr ( gh )**

  ```html
  <script src="https://cdn.jsdelivr.net/gh/jyunzn/zz/dist/zz.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/jyunzn/zzrper/dist/zzrper.min.js"></script>
  ```

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- set some style -->
  <link href="https://cdn.jsdelivr.net/gh/jyunzn/zz@0.0.0-alpha.3/examples/default.min.css" rel="stylesheet"/>
  <style>
    .calendar {
      position: relative;
      padding: 50px 30px;
    }

    .zzrp-select-start,.zzrp-select-end{
    	background: #2980b9
    }
    .zzrp-in-range{
    	background: #e74c3c
    }
  </style>

  <!-- step1. import the module -->
  <script src="https://cdn.jsdelivr.net/gh/jyunzn/zz/dist/zz.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/jyunzn/zzrper/dist/zzrper.min.js"></script>
</head>
<body>
  <div class="calendar"></div>
  <script>
    // step2. Install plugin
    zz.use(zzrper)

    // step3. Use plugin (zzrp: true)
    zz({ 
      zzrp: true, /*

      // - set init select date

      zzrp_cmz_initSelectStart: '2020-11-05',
      zzrp_cmz_initSelectEnd: '2021-02-04',

      // - set custom class name

      // zzrp_cls_selectStart: 'start',
      // zzrp_cls_selectEnd: 'end',
      // zzrp_cls_inRange: 'inrange red',

      // - set event

      zzrp_onSelectStart(...args) {
        console.log('start: ', ...args)
      },
      zzrp_onSelectEnd(...args) {
        console.log('end:', ...args)
      }
  	*/}).mount('.calendar')
  </script>
</body>
</html>
```


## Options

| option             | default     | description         |
| ------------------ | ----------- | ------------------- |
| zzrp               | `undefined` | **If your calendar needs to use the zzrper plugin, must set this option to `true`** |
| zzrp_onSelectStart | `undefined` | <ul><li><strong>Timing:</strong> When the user chooses the start date</li><li><p><strong>Parameter:</strong> <code>{ start, end }</code></p></li></ul> |
| zzrp_onSelectEnd   | `undefined` | <ul><li><strong>Timing:</strong> When the user chooses the end date</li><li><p><strong>Parameter:</strong> <code>{ start, end }</code></p></li></ul> |



### class options

- All customizable class name settings
- **If you need to set more than two class names, please separate them with spaces**, such as `'apple banana'`

| option               | default               |
| -------------------- | --------------------- |
| zzrp_cls_selectStart | `'zzrp-select-start'` |
| zzrp_cls_selectEnd   | `'zzrp-select-end'`   |
| zzrp_cls_inRange     | `'zzrp-in-range'`     |


## License

[MIT](LICENSE)