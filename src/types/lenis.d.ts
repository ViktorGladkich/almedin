declare module 'lenis' {
  export interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    orientation?: 'vertical' | 'horizontal';
    gestureOrientation?: 'vertical' | 'horizontal' | 'both';
    smoothWheel?: boolean;
    syncTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
    wrapper?: HTMLElement | Window;
    content?: HTMLElement;
    [key: string]: any;
  }

  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    start(): void;
    stop(): void;
    destroy(): void;
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
    scroll: number;
    limit: number;
    velocity: number;
    direction: number;
    isStopped: boolean;
    isSmooth: boolean;
  }
}
