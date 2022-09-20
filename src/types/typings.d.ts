/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */

export { };
declare global {
  interface Window {
    jQuery: typeof jQuery;
    $: typeof jQuery;
    API: any;
    MSG: any;
  }
}
