import XtxSwiper from './XtxSwiper.vue'
import XtxCustomNavbar from './XtxCustomNavbar.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxCustomNavbar: typeof XtxCustomNavbar
  }
}
