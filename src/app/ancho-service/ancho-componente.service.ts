import { Injectable, ElementRef, NgZone } from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';
import { debounceTime, startWith, map, takeUntil, distinctUntilChanged } from 'rxjs/operators';

export interface ComponentSize {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnchoComponenteService {

  constructor(private ngZone: NgZone) { }
  
  // Calcula el tamaño de un componente basado en su referencia
  calculateSize(elementRef: ElementRef | HTMLElement): ComponentSize {
    const element = elementRef instanceof ElementRef ? elementRef.nativeElement : elementRef;
    
    if (!element) {
      console.warn('ComponentSizeService: No se proporcionó un elemento válido');
      return { width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 };
    }
    
    // Obtener las dimensiones del elemento
    const rect = element.getBoundingClientRect();
    
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
      right: rect.right,
      bottom: rect.bottom
    };
  }
  
  //Observa cambios en el tamaño de un elemento usando ResizeObserver
  observeSize( elementRef: ElementRef | HTMLElement, debounceMs: number = 100): Observable<ComponentSize> {
    const element = elementRef instanceof ElementRef ? elementRef.nativeElement : elementRef;
    const sizeSubject = new Subject<ComponentSize>();
    
    if (!element) {
      console.warn('ComponentSizeService: No se proporcionó un elemento válido para observar');
      return sizeSubject.asObservable();
    }
    
    // Usa NgZone para ejecutar fuera de la zona de Angular y evitar ciclos de detección innecesarios
    this.ngZone.runOutsideAngular(() => {
      // Crear ResizeObserver
      const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          const rect = element.getBoundingClientRect();
          
          // Volver a la zona de Angular para emitir el evento
          this.ngZone.run(() => {
            sizeSubject.next({
              width,
              height,
              top: rect.top,
              left: rect.left,
              right: rect.right,
              bottom: rect.bottom
            });
          });
        }
      });
      
      // Comenzar a observar el elemento
      resizeObserver.observe(element);
      
      // Limpiar el observer cuando se complete el subject
      sizeSubject.subscribe({
        complete: () => {
          resizeObserver.disconnect();
        }
      });
    });
    
    // Aplicar debounce para evitar actualizaciones excesivas
    return sizeSubject.pipe(
      debounceTime(debounceMs),
      distinctUntilChanged((prev, curr) => 
        prev.width === curr.width && prev.height === curr.height
      )
    );
  }
  
  /**
   * Observa cambios en el tamaño de la ventana y calcula el tamaño del elemento
   * @param elementRef Referencia al elemento DOM
   * @param debounceMs Tiempo de debounce para evitar actualizaciones excesivas
   * @returns Observable que emite cuando cambia el tamaño de la ventana
   */
  observeSizeOnWindowResize(
    elementRef: ElementRef | HTMLElement, 
    debounceMs: number = 100
  ): Observable<ComponentSize> {
    const element = elementRef instanceof ElementRef ? elementRef.nativeElement : elementRef;
    
    if (!element) {
      console.warn('ComponentSizeService: No se proporcionó un elemento válido');
      return new Observable<ComponentSize>();
    }
    
    // Observar eventos de resize de la ventana
    return fromEvent(window, 'resize').pipe(
      debounceTime(debounceMs),
      startWith(null), // Emitir inmediatamente al suscribirse
      map(() => this.calculateSize(element))
    );
  }
  
  /**
   * Calcula el tamaño de un componente basado en su posición en una cuadrícula
   * @param column Número de columnas que ocupa el componente
   * @param row Número de filas que ocupa el componente
   * @param containerWidth Ancho total del contenedor
   * @param maxColumns Número máximo de columnas en la cuadrícula
   * @param rowHeight Altura de una fila
   * @param gap Espacio entre elementos
   * @returns Dimensiones calculadas
   */
  calculateGridItemSize(
    column: number, 
    row: number, 
    containerWidth: number, 
    maxColumns: number = 6, 
    rowHeight: number = 160, 
    gap: number = 5
  ): {width: number, height: number} {
    // Asegurar que column no exceda maxColumns
    const effectiveColumns = Math.min(column, maxColumns);
    
    // Calcular el ancho de una columna
    const totalGapWidth = gap * (maxColumns - 1);
    const availableWidth = containerWidth - totalGapWidth;
    const columnWidth = availableWidth / maxColumns;
    
    // Calcular dimensiones
    const width = (effectiveColumns * columnWidth) + ((effectiveColumns - 1) * gap);
    const height = (row * rowHeight) + ((row - 1) * gap);
    
    return { width, height };
  }
  
  /**
   * Obtiene el número de columnas responsivas basado en el ancho de la pantalla
   * @param screenWidth Ancho actual de la pantalla
   * @returns Número de columnas a mostrar
   */
  getResponsiveColumnCount(screenWidth: number): number {
    if (screenWidth >= 1600) return 6;
    if (screenWidth >= 1200) return 5;
    if (screenWidth >= 992) return 4;
    if (screenWidth >= 768) return 3;
    if (screenWidth >= 576) return 2;
    return 1;
  }

}
