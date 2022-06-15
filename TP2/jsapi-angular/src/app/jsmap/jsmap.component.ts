import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jsmap',
  templateUrl: './jsmap.component.html',
  styleUrls: ['./jsmap.component.css'],
})
export class JsmapComponent {
  private map?: H.Map;
  

  constructor(private http: HttpClient) {}

  @ViewChild('map') mapDiv?: ElementRef;

  @Input() public zoom = 2;
  @Input() public lat = 0;
  @Input() public lng = 0;

  private timeoutHandle: any;
  @Output() notify = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => {
      if (this.map) {
        if (changes['zoom'] !== undefined) {
          this.map.setZoom(changes['zoom'].currentValue);
        }
        if (changes['lat'] !== undefined) {
          this.map.setCenter({
            lat: changes['lat'].currentValue,
            lng: this.lng,
          });
        }
        if (changes['lng'] !== undefined) {
          this.map.setCenter({
            lat: this.lat,
            lng: changes['lng'].currentValue,
          });
        }
      }
    }, 100);
  }

  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: '{YOUR_API_KEY}',
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: { lat: -31, lng: -64 },
          zoom: 6,
        }
      );
      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      this.map = map;
      map.getViewPort().resize();
      // Create a marker icon from an image URL:
      const icon = new H.map.Icon('graphics/markerHouse.png');

       this.http
         .get<any>(
           'https://prog3.nhorenstein.com/api/geolocalizacion/GetMarcadores'
         )
         .subscribe((data) => {
           console.log(data.listaMarcadores);
           if (data.listaMarcadores)
             data.listaMarcadores.forEach((element: { latitud: any; longitud: any; }) => {
               // Create a marker using the previously instantiated icon:
               var marker = new H.map.Marker(
                 { lat: element.latitud, lng: element.longitud },
                 { data: icon }
               );

               // Add the marker to the map:
               map.addObject(marker);
             });
         });


      

   
      map.addEventListener('mapviewchange', (ev: H.map.ChangeEvent) => {
        this.notify.emit(ev);
      });
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    }
  }
}
