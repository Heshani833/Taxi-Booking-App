declare module 'leaflet-routing-machine' {
  import * as L from 'leaflet'

  namespace Routing {
    function control(options?: any): any
    function osrmv1(options?: any): any
  }
}

declare namespace L {
  namespace Routing {
    function control(options?: any): any
    function osrmv1(options?: any): any
  }
}
